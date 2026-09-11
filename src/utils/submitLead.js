// ─────────────────────────────────────────────────────────────────────────────
// Lead submission utility
// Fires Tranquil CRM (GET) + Google Sheets (POST) concurrently.
// Either call failing will NOT block the other.
// ─────────────────────────────────────────────────────────────────────────────

const TRANQUIL_BASE     = import.meta.env.VITE_TRANQUIL_BASE_URL;
const TRANQUIL_API_KEY  = import.meta.env.VITE_TRANQUIL_API_KEY;
const SHEET_WEBHOOK_URL = import.meta.env.VITE_SHEET_WEBHOOK_URL;

/**
 * Maps a project title (from PROJECTS_DATA) to the Tranquil project_id.
 * Falls back to 1 (generic "Reet") if no match found.
 */
const PROJECT_ID_MAP = {
  'CINQ by Raghava':          12, // closest match → Raghava Linq family; update if Tranquil adds CINQ
  'The Cascades, Neopolis':   5,  // GHR CASCADES
  'Avira by AVR':             15, // Standalone Apartments (no exact match – update if added)
  'Altus by Hallmark':        15,
  'Linq by Raghava':          12, // Raghava Linq
  'Halo by Raghava':          12,
  'Globus Luxury Villas':     2,  // Villa
  'Acasa by Simchah':         15,
};

/**
 * Strips country code prefix (+91 / 91) from a phone string and
 * returns only the 10-digit mobile number.
 * Accepts: "+919876543210", "919876543210", "9876543210", "+91 98765 43210"
 */
export function sanitizeMobile(raw) {
  // Remove all spaces, dashes, dots
  let cleaned = raw.replace(/[\s\-().]/g, '');
  // Strip leading + sign
  cleaned = cleaned.replace(/^\+/, '');
  // Strip country code 91 if present and remaining length is 12 digits
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  }
  return cleaned; // 10-digit string
}

/**
 * Main submit function.
 *
 * @param {Object} lead
 * @param {string} lead.name          - Full name
 * @param {string} lead.phone         - Raw phone (with or without +91)
 * @param {string} [lead.email]       - Email (optional)
 * @param {string} [lead.message]     - Remark / requirement (optional)
 * @param {string} [lead.projectTitle]- Project title string from PROJECTS_DATA
 * @param {string} [lead.source]      - 'ContactForm' | 'JoinGroupModal'
 *
 * @returns {Promise<{crmOk: boolean, sheetOk: boolean}>}
 */
export async function submitLead({ name, phone, email = '', message = '', projectTitle = '', source = 'WebForm' }) {
  const mobile = sanitizeMobile(phone);
  const projectId = PROJECT_ID_MAP[projectTitle] ?? 1;

  // ── 1. Tranquil CRM — GET request ────────────────────────────────────────
  const crmParams = new URLSearchParams({
    api_key:      TRANQUIL_API_KEY,
    country_code: '91',
    mobile_number: mobile,
    project_id:   projectId,
    project_id_type: 'id',
    source_type:  '3',
    sub_source:   source,
    customer_name: name,
    email:        email,
    remark:       message,
    campaign_name: 'WebsiteOrganic',
    lead_type:    '0',
  });

  const crmFetch = fetch(`${TRANQUIL_BASE}?${crmParams.toString()}`, {
    method: 'GET',
    keepalive: true,
  })
    .then((r) => r.json())
    .then((json) => {
      console.info('[CRM]', json);
      return json?.status === true;
    })
    .catch((err) => {
      console.error('[CRM] failed', err);
      return false;
    });

  // ── 2. Google Sheets — POST request ──────────────────────────────────────
  const sheetPayload = {
    timestamp:    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name,
    mobile,           // always 10-digit clean number
    email,
    message,
    project:      projectTitle,
    source,
  };

  const sheetFetch = fetch(SHEET_WEBHOOK_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'text/plain' }, // text/plain avoids CORS preflight
    body:    JSON.stringify(sheetPayload),
    keepalive: true,
  })
    .then((r) => r.json())
    .then((json) => {
      console.info('[Sheet]', json);
      return json?.result === 'success';
    })
    .catch((err) => {
      console.error('[Sheet] failed', err);
      return false;
    });

  // ── Fire both concurrently; neither failure blocks the other ─────────────
  const [crmOk, sheetOk] = await Promise.allSettled([crmFetch, sheetFetch])
    .then((results) => results.map((r) => (r.status === 'fulfilled' ? r.value : false)));

  return { crmOk, sheetOk };
}
