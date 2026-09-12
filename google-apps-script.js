// ═══════════════════════════════════════════════════════════════════════════
// REET Spaces — Google Apps Script Lead Collector
// ───────────────────────────────────────────────────────────────────────────
// HOW TO DEPLOY:
//   1. Open your Google Sheet → Extensions → Apps Script
//   2. Delete any existing code, paste this entire file
//   3. Save (Ctrl+S), then click Deploy → New Deployment
//   4. Type: Web App
//      Execute as: Me
//      Who has access: Anyone
//   5. Click Deploy → copy the Web App URL
//   6. Paste that URL into src/utils/submitLead.js → VITE_SHEET_WEBHOOK_URL
// ═══════════════════════════════════════════════════════════════════════════

const SHEET_NAME = 'Leads';   // Tab name — change if yours is different
const HEADER_ROW = [
  'Timestamp (IST)',        // A
  'Name',                   // B
  'Mobile',                 // C — always clean 10-digit
  'Email',                  // D
  'Project',                // E
  'Message / Requirement',  // F
  'Source',                 // G — ContactForm | BrochureDownloadPopup | JoinGroupModal | BrochureModal
];

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Strips +91 / 91 prefix and all whitespace/dashes to return a clean
 * 10-digit mobile number.
 * Accepts: "+919876543210", "91 98765 43210", "9876543210", "+91-9876543210"
 */
function sanitizeMobile(raw) {
  if (!raw) return '';
  var cleaned = String(raw).replace(/[\s\-().]/g, ''); // remove spaces, dashes, dots
  cleaned = cleaned.replace(/^\+/, '');                // strip leading +
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);                        // strip country code 91
  }
  return cleaned;
}

/**
 * Returns (and creates if needed) the Leads sheet.
 * Also writes + styles the header row if row 1 is blank.
 */
function getOrCreateSheet() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Write header if row 1, col 1 is empty (handles both new & existing sheets)
  var firstCell = sheet.getRange(1, 1).getValue();
  if (!firstCell || firstCell.toString().trim() === '') {
    sheet.getRange(1, 1, 1, HEADER_ROW.length).setValues([HEADER_ROW]);

    // Style the header
    var headerRange = sheet.getRange(1, 1, 1, HEADER_ROW.length);
    headerRange.setBackground('#1a1a2e');
    headerRange.setFontColor('#d6ab5c');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);

    // Set column widths
    sheet.setColumnWidth(1, 160); // Timestamp
    sheet.setColumnWidth(2, 160); // Name
    sheet.setColumnWidth(3, 120); // Mobile
    sheet.setColumnWidth(4, 200); // Email
    sheet.setColumnWidth(5, 200); // Project
    sheet.setColumnWidth(6, 320); // Message / Requirement
    sheet.setColumnWidth(7, 180); // Source
  }

  return sheet;
}

// ── Main handler — called by the web app ────────────────────────────────────

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    // Accept both 'mobile' and 'phone' keys for compatibility
    var mobile = sanitizeMobile(payload.mobile || payload.phone || '');

    // Basic validation — reject if mobile is not 10 digits
    if (!/^\d{10}$/.test(mobile)) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'error', msg: 'Invalid mobile number: ' + mobile }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = getOrCreateSheet();

    sheet.appendRow([
      payload.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      payload.name      || '',
      mobile,
      payload.email     || '',
      payload.project   || '',
      payload.message   || '',
      payload.source    || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', msg: 'Lead saved', mobile: mobile }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', msg: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── GET handler — handy for testing the deployment is alive ─────────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok', msg: 'REET Spaces Sheet webhook is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── One-time helper — run this manually once from Apps Script editor ─────────
// Select this function in the dropdown and click ▶ Run to insert the header
// into your existing sheet. Safe to run multiple times (only acts if row 1 is empty).
function insertHeaderNow() {
  getOrCreateSheet();
  SpreadsheetApp.getActiveSpreadsheet().toast('Header row written to "' + SHEET_NAME + '"!', 'REET Spaces', 4);
}
