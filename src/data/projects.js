// Dataset for REET Spaces Group-Buy Projects in Hyderabad (Exact Match to Original Source)
import cinqImg from '../assets/cinq.webp';
import theCascadesImg from '../assets/the-cascades.webp';
import aviraImg from '../assets/avira.webp';
import altusImg from '../assets/altus.webp';
import linqImg from '../assets/linq.webp';
import haloImg from '../assets/halo.webp';
import acasaImg from '../assets/acasa.webp';

export const PROJECTS_DATA = [
  {
    id: 'cinq-by-raghava',
    title: 'CINQ by Raghava',
    location: 'Financial District, Nanakramguda',
    builder: '4 BHK + staff room · 3,600 sq.ft · Raghava Projects',
    builderPrice: '₹3.66 to 4.3 Cr',
    builderPriceMin: 3.66,
    builderPriceMax: 4.30,
    groupPrice: '₹3.5 to 4.2 Cr',
    groupPriceMin: 3.50,
    groupPriceMax: 4.20,
    minGroupPill: 'Min. group: 4 buyers',
    image: '/CINQ by Raghava.webp',
    brochurePdf: 'https://drive.google.com/file/d/1YIjsqqlxG2GlabBiXCdSdKOnwdyYge1m/view?usp=sharing'
  },
  {
    id: 'the-cascades-neopolis',
    title: 'The Cascades, Neopolis',
    location: 'Neopolis, Kokapet',
    builder: '3 & 4 BHK · GHR Infra / Lakshmi Infra / Urbanblocks',
    builderPrice: '₹2.81 to 5.30 Cr',
    builderPriceMin: 2.81,
    builderPriceMax: 5.30,
    groupPrice: '₹2.64 to 5.1 Cr',
    groupPriceMin: 2.64,
    groupPriceMax: 5.10,
    minGroupPill: 'Min. group: 4 buyers',
    image: theCascadesImg,
    brochurePdf: 'https://drive.google.com/file/d/1Qu_E5v9dxlZnk9WVDfJYDXUnaTNEGZc1/view?usp=sharing'
  },
  {
    id: 'avira-by-avr',
    title: 'Avira by AVR',
    location: 'Narsingi',
    builder: '3 BHK · 2,292 to 2,680 sq.ft · AVR Builders',
    builderPrice: '₹1.94 to 2.39 Cr',
    builderPriceMin: 1.94,
    builderPriceMax: 2.39,
    groupPrice: '₹1.85 to 2.25 Cr',
    groupPriceMin: 1.85,
    groupPriceMax: 2.25,
    minGroupPill: 'Min. group: 4 buyers',
    image: aviraImg,
    brochurePdf: 'https://drive.google.com/file/d/1aJAN1TjZwE3ihDPfprn3QfLu90M8U5FD/view?usp=sharing'
  },
  {
    id: 'altus-by-hallmark',
    title: 'Altus by Hallmark',
    location: 'Kondapur',
    builder: '3 & 4 BHK · 1,760 to 4,685 sq.ft · Hallmark Builders',
    builderPrice: '₹1.46 to 5.3 Cr',
    builderPriceMin: 1.46,
    builderPriceMax: 5.30,
    groupPrice: '₹1.39 to 5.1 Cr',
    groupPriceMin: 1.39,
    groupPriceMax: 5.10,
    minGroupPill: 'Min. group: 4 buyers',
    image: altusImg,
    brochurePdf: 'https://drive.google.com/file/d/1f59I9fCrx0u5WJNJbeCp7auiC_TZqG8Y/view?usp=drive_link'
  },
  {
    id: 'linq-by-raghava',
    title: 'Linq by Raghava',
    location: 'Kokapet',
    builder: '3 BHK · 1,798 to 2,388 sq.ft · Raghava Projects',
    builderPrice: '₹1.8 to 2.5 Cr',
    builderPriceMin: 1.80,
    builderPriceMax: 2.50,
    groupPrice: '₹1.65 to 2.3 Cr',
    groupPriceMin: 1.65,
    groupPriceMax: 2.30,
    minGroupPill: 'Min. group: 4 buyers',
    image: linqImg,
    brochurePdf: 'https://drive.google.com/file/d/1VmCd4WBJ1zQKY1-siwb1f7eJ2NeansQl/view?usp=sharing'
  },
  {
    id: 'halo-by-raghava',
    title: 'Halo by Raghava',
    location: 'Serilingampally',
    builder: '3 BHK · 1,905 to 2,454 sq.ft · Raghava Projects',
    builderPrice: '₹1.5 to 2.15 Cr',
    builderPriceMin: 1.50,
    builderPriceMax: 2.15,
    groupPrice: '₹1.4 to 2 Cr',
    groupPriceMin: 1.40,
    groupPriceMax: 2.00,
    minGroupPill: 'Min. group: 4 buyers',
    image: haloImg,
    brochurePdf: 'https://drive.google.com/file/d/11Q2_d7HFjzky3PEUKDM5pDhG1ZKuNfY1/view?usp=sharing'
  },
  {
    id: 'globus-luxury-villas',
    title: 'Globus Luxury Villas',
    location: 'Tukkuguda',
    builder: 'Triplex villas · 61-acre gated township · Globus Developers',
    builderPrice: '₹2.35 Cr',
    builderPriceMin: 2.35,
    builderPriceMax: 2.35,
    groupPrice: '₹1.49 Cr',
    groupPriceMin: 1.49,
    groupPriceMax: 1.49,
    minGroupPill: 'Min. group: 4 villas',
    image: '/Globus Luxury Villas.webp'
  },
  {
    id: 'acasa-by-simchah',
    title: 'Acasa by Simchah',
    location: 'Kokapet',
    builder: '3 BHK · 3,520 to 3,720 sq.ft · Simchah Estates Pvt Ltd',
    builderPrice: '₹4 to 4.65 Cr',
    builderPriceMin: 4.00,
    builderPriceMax: 4.65,
    groupPrice: '₹3.9 to 4.55 Cr',
    groupPriceMin: 3.90,
    groupPriceMax: 4.55,
    minGroupPill: 'Min. group: 4 buyers',
    image: acasaImg,
    brochurePdf: 'https://drive.google.com/file/d/1Vv4ezR_tFA8gsqg1ka4RDFpNc9tG3T9l/view?usp=drive_link'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Shortlist the project',
    desc: "Pick from REET's live group-buy list above, filtered to projects where we already hold strong developer terms."
  },
  {
    step: '02',
    title: 'Site visit, RM assigned',
    desc: 'A REET relationship manager walks you through unit options, tower, and floor before you commit to a group.'
  },
  {
    step: '03',
    title: 'Join the buying group',
    desc: 'Once 4 verified buyers commit to the same project, REET locks the group-negotiated slab with the developer.'
  },
  {
    step: '04',
    title: 'Buy directly from the builder',
    desc: 'Every buyer signs and registers individually with the developer. REET only facilitates the group and the price.'
  }
];

export const TRUST_ADVANTAGES = [
  {
    title: 'Channel Partner Leverage',
    desc: 'Developers reserve bulk volume slabs for top channel partners. REET pools individual buyers to pass that exact institutional margin directly to you.',
    icon: 'TrendingDown'
  },
  {
    title: '100% Direct Developer Contracts',
    desc: 'No middleman agreements. Your sales agreement, RERA registration, and payment schedule are executed directly with the builder in your name.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Zero Buyer Brokerage',
    desc: 'REET is compensated directly by developers as an authorized institutional channel partner. Buyers never pay a rupee in consultation or facilitation fees.',
    icon: 'BadgePercent'
  },
  {
    title: 'Dedicated Senior RM Support',
    desc: 'From initial floor-plan scrutiny and Vastu inspection to bank loan sanction and final registration, our experienced team manages the entire journey.',
    icon: 'UserCheck'
  }
];

export const FAQ_DATA = [
  {
    q: 'How does group buying work without a middleman contract?',
    a: 'REET Spaces operates as an authorized institutional channel partner. When 4 or more buyers agree on a project, we present the combined intent to the developer to lock the group price slab. Each buyer receives their own independent builder-buyer agreement and registers directly with the developer.'
  },
  {
    q: 'Do I have to buy the exact same floor or unit size as other group members?',
    a: 'No! You can choose any available unit, floor, facing, or configuration in the project. The group discount applies across all units within the pre-agreed developer slab.'
  },
  {
    q: 'What happens if a group is currently 3/4 full and I want to join?',
    a: 'Joining an active group with 3 committed buyers immediately closes the group of 4! REET then activates the developer pricing lock for all 4 members within 48 hours.'
  },
  {
    q: 'Are all projects listed here RERA approved?',
    a: 'Yes, 100% of the projects on REET Spaces have active Telangana RERA registrations with clear land titles and approvals from top financial institutions (HDFC, SBI, ICICI, etc.).'
  },
  {
    q: 'What if I need bank home loan financing?',
    a: 'All listed projects are pre-approved with leading public and private sector banks. Our desk assists you with end-to-end loan processing at the lowest market rates.'
  }
];
