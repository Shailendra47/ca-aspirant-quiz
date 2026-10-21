const fs = require('fs');
const path = require('path');

const CEL_TOPICS = [
  {
    topicId: 1,
    topicTitle: "Companies Act, 2013: incorporation, management, meetings, and compliance",
    shortTitle: "Companies Act: Incorporation, Management & Meetings",
    fileName: "topic_1_companies_act_incorporation_management.json",
    syllabus: "Sec. 3-22 (Incorporation, MOA/AOA, Ultra Vires, Pre-incorporation contracts), Sec. 149-172 (Directors: Appointment, Independent Directors, DIN, Disqualifications Sec 164, Resignation & Removal), Sec. 173-195 (Board Meetings, Quorum, Committees - Audit & NRC, Loans to Directors Sec 185, Related Party Transactions Sec 188), Sec. 196-205 (Managerial Remuneration Sec 197/Schedule V, KMP)"
  },
  {
    topicId: 2,
    topicTitle: "Winding up, and the role of the NCLT and NCLAT",
    shortTitle: "Winding Up & Role of NCLT/NCLAT",
    fileName: "topic_2_winding_up_nclt_nclat.json",
    syllabus: "Sec. 270-365 (Winding Up by Tribunal, Grounds, Petitioners Sec 272, Official Liquidator & Company Liquidator, Powers, Liquidator Report Sec 281, Preferential Payments Sec 327, Fraudulent Preference Sec 328), Sec. 407-434 (Constitution & Jurisdiction of NCLT/NCLAT, Powers, Orders, Injunctions, Appeals to Supreme Court Sec 423, Special Courts Sec 435-446)"
  },
  {
    topicId: 3,
    topicTitle: "Limited Liability Partnership Act, 2008",
    shortTitle: "Limited Liability Partnership Act, 2008",
    fileName: "topic_3_llp_act_2008.json",
    syllabus: "LLP Act 2008: Nature & Characteristics, Partners & Designated Partners (DPIN & Sec 7), Incorporation Document & Statement (Sec 11-12), LLP Agreement & Mutual Rights (Sec 23-24), Extent and Limitation of Liability of LLP & Partners (Sec 26-28), Holding Out (Sec 29), Unlimited Liability in case of Fraud (Sec 30), Conversion from Firm/Private Co. to LLP (Schedules II, III, IV), Winding Up and Dissolution (Sec 63-65)"
  },
  {
    topicId: 4,
    topicTitle: "Insolvency and Bankruptcy Code, 2016",
    shortTitle: "Insolvency and Bankruptcy Code, 2016",
    fileName: "topic_4_ibc_2016.json",
    syllabus: "IBC 2016: Objectives & Architecture, CIRP (Sec 6-32), Default Threshold (₹1 Cr), Initiation by Financial Creditor (Sec 7), Operational Creditor (Sec 8-9 with Demand Notice), Corporate Applicant (Sec 10), Moratorium (Sec 14), IRP & RP Duties, Committee of Creditors (CoC Composition & Voting 66%), Resolution Plan Approval (Sec 30-31), Liquidation Waterfall (Sec 53), Fast Track CIRP & Pre-packaged Insolvency Process (PPIRP for MSMEs)"
  },
  {
    topicId: 5,
    topicTitle: "SEBI Act and key SEBI regulations",
    shortTitle: "SEBI Act & Key SEBI Regulations",
    fileName: "topic_5_sebi_act_regulations.json",
    syllabus: "SEBI Act 1992: Establishment, Powers & Functions (Sec 11/11B), Prohibition of Manipulative & Deceptive Devices/Insider Trading (Sec 12A), Penalties & Adjudication (Sec 15A-15HB), Securities Appellate Tribunal (SAT Sec 15K-15Z), SEBI (LODR) Regulations 2015 (Reg 17 Board, Reg 18 Audit Committee, Reg 23 Related Party Transactions, Reg 30 Material Events Disclosure), SEBI (PIT) Regulations 2015 (UPSI, Trading Window, Code of Conduct, Pre-clearance)"
  },
  {
    topicId: 6,
    topicTitle: "Foreign Exchange Management Act (FEMA), 1999",
    shortTitle: "Foreign Exchange Management Act (FEMA), 1999",
    fileName: "topic_6_fema_1999.json",
    syllabus: "FEMA 1999: Definitions (Person Resident in India Sec 2(v), Foreign Exchange, Foreign Security), Current Account Transactions (Sec 5 & FEM Current Account Rules - Prohibited, Prior Approval, Liberalised Remittance Scheme LRS $250k), Capital Account Transactions (Sec 6 & Permissible classes), Inward/Outward Remittance, Foreign Direct Investment (FDI Automatic vs Approval Route), Overseas Direct Investment (ODI Rules 2022), External Commercial Borrowings (ECB Framework), Compounding of Contraventions (Sec 15)"
  },
  {
    topicId: 7,
    topicTitle: "Competition Act, 2002",
    shortTitle: "Competition Act, 2002",
    fileName: "topic_7_competition_act_2002.json",
    syllabus: "Competition Act 2002 (as amended): Anti-Competitive Agreements (Sec 3: Horizontal vs Vertical, Cartels, Bid Rigging, Tie-in, Exclusive Supply, Resale Price Maintenance), Abuse of Dominant Position (Sec 4: Predatory Pricing, Unfair/Discriminatory Conditions, Denial of Market Access), Regulation of Combinations (Sec 5 & 6: Thresholds Assets/Turnover, Deal Value Threshold DVT ₹2000 Cr, CCI Approval Timeline 150/210 days), Competition Commission of India (CCI Powers & Penalties Sec 27)"
  },
  {
    topicId: 8,
    topicTitle: "Indian Contract Act, 1872, and related economic laws",
    shortTitle: "Indian Contract Act & Special Contracts",
    fileName: "topic_8_contract_act_economic_laws.json",
    syllabus: "Indian Contract Act 1872: Essential elements, Void & Voidable contracts, Free Consent, Legality of Object, Quasi-Contracts (Sec 68-72), Breach & Damages (Sec 73-75: Hadley v Baxendale, Liquidated vs Penalty), Special Contracts: Indemnity & Guarantee (Sec 124-147: Rights of Surety, Discharge of Surety), Bailment & Pledge (Sec 148-181: Duties of Bailee, Rights of Pawnee), Contract of Agency (Sec 182-238: Creation, Ratification, Agent's Authority, Personal Liability of Agent, Irrevocable Agency)"
  },
  {
    topicId: 9,
    topicTitle: "Consumer protection and other economic legislation",
    shortTitle: "Consumer Protection & Other Economic Legislation",
    fileName: "topic_9_consumer_protection_economic_legislation.json",
    syllabus: "Consumer Protection Act 2019: Consumer Definition (Commercial exclusion), Central Consumer Protection Authority (CCPA Mandate), 3-Tier Redressal Commissions (District up to ₹50 Lakh, State ₹50 Lakh to ₹2 Cr, National above ₹2 Cr), Product Liability (Sec 82-87: Manufacturer, Service Provider & Seller), Unfair Trade Practices & Misleading Advertisements (Celebrity Endorsement liability), Prevention of Money Laundering Act (PMLA 2002: Offence of Money Laundering Sec 3-4, Attachment Sec 5, Reporting Entities Sec 12)"
  }
];

console.log('Corporate and Economic Laws (CEL) topics count:', CEL_TOPICS.length);
module.exports = { CEL_TOPICS };

