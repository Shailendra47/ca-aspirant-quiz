const fs = require('fs');
const path = require('path');

const AUDIT_TOPICS = [
  {
    topicId: 1,
    topicTitle: "Standards on Auditing (SA) and the Audit Process",
    shortTitle: "Standards on Auditing & Audit Process",
    fileName: "topic_1_standards_on_auditing.json",
    syllabus: "SA 200, 210, 220, 240 (Fraud), 250 (Laws & Regs), 260/265 (TCWG), 299 (Joint Audit), 500, 505 (Confirmations), 510, 520, 530, 540 (Estimates), 550 (Related Parties), 560, 570 (Going Concern), 580"
  },
  {
    topicId: 2,
    topicTitle: "Audit Planning, Risk Assessment, and Internal Control Evaluation",
    shortTitle: "Audit Planning & Risk Assessment",
    fileName: "topic_2_audit_planning_risk_assessment.json",
    syllabus: "SA 300, 315 (Risk Identification & System Understanding), SA 320 (Materiality & Performance Materiality), SA 330, SA 402, SA 450, Internal Financial Controls (IFC u/s 143(3)(i)), COSO, Substantive Testing"
  },
  {
    topicId: 3,
    topicTitle: "Audit of Specific Entities: Banks, Insurance Companies, and Government Bodies",
    shortTitle: "Audit of Specific Entities",
    fileName: "topic_3_audit_specific_entities.json",
    syllabus: "Banking Regulation Act, RBI Prudential Norms (NPA Substandard/Doubtful/Loss, Provisioning, CRAR, LFAR), Insurance (IRDAI, Solvency Margin, UPR), Government Audit (C&AG Mandate Art 148-151, Proprietary, Supplementary Audit u/s 143(5)-(7))"
  },
  {
    topicId: 4,
    topicTitle: "Group Audits and the Work of Other Auditors",
    shortTitle: "Group Audits & Other Auditors",
    fileName: "topic_4_group_audits.json",
    syllabus: "SA 600 (Principal Auditor vs Component Auditor, ISA 600 alignment), Group Financial Statements Reporting u/s 143(3), SA 610 (Using Work of Internal Auditors & Direct Assistance prohibitions), SA 620 (Auditor's Expert Competence & Scope)"
  },
  {
    topicId: 5,
    topicTitle: "Audit Documentation, Reporting, and Modified Audit Opinions",
    shortTitle: "Audit Documentation & Reporting",
    fileName: "topic_5_documentation_reporting_opinions.json",
    syllabus: "SA 230, SA 700, SA 701 (KAM vs Modified Opinions), SA 705 (Qualified, Adverse, Disclaimer), SA 706 (EOM & OM), SA 710, SA 720, CARO 2020 (All 21 Clauses: Whistle-blower, Benami, Wilful Defaulter, Cash Losses, Title Deeds)"
  },
  {
    topicId: 6,
    topicTitle: "Assurance Engagements and Attestation Services",
    shortTitle: "Assurance & Attestation Services",
    fileName: "topic_6_assurance_attestation.json",
    syllabus: "Framework for Assurance Engagements (Reasonable vs Limited), SRE 2400 & SRE 2410 (Interim Reviews), SAE 3400 (Prospective Financial Info: Forecasts vs Projections), SAE 3402 (Type 1 & Type 2 SOC Reports), SAE 3420 (Pro Forma), SRS 4400 (AUP), SRS 4410 (Compilation)"
  },
  {
    topicId: 7,
    topicTitle: "Internal Audit and Forensic Audit",
    shortTitle: "Internal Audit & Forensic Audit",
    fileName: "topic_7_internal_forensic_audit.json",
    syllabus: "Companies Act Sec 138 (Mandatory Internal Audit Limits), Standards on Internal Audit (SIA), Forensic Accounting & Investigation Standards (FAIS), Digital Evidence, Fraud Triangle, Benford's Law, Sec 143(12) Reporting (Form ADT-4 to Central Govt)"
  },
  {
    topicId: 8,
    topicTitle: "Due Diligence and Special Purpose Audits",
    shortTitle: "Due Diligence & Special Audits",
    fileName: "topic_8_due_diligence_special_audits.json",
    syllabus: "Financial Due Diligence (Quality of Earnings, Hidden Liabilities, Normalized EBITDA, Contingencies), Investigation vs Audit, Income Tax Special Audit u/s 142(2A), GST Department Audit Assistance, Peer Review Board & Quality Review Board (QRB)"
  },
  {
    topicId: 9,
    topicTitle: "Digital Auditing and Computer-Assisted Audit Techniques (CAATs)",
    shortTitle: "Digital Auditing & CAATs",
    fileName: "topic_9_digital_auditing_caats.json",
    syllabus: "Audit in Automated Environment, GITC & Application Controls, IT Dependent Controls, CAATs & Generalized Audit Software (GAS), Continuous Auditing, AI/ML in Audit Sampling, Rule 11(g) Audit Trail & Edit Log Compliance (Books preservation 8 years)"
  },
  {
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    shortTitle: "Corporate Governance & Quality Control",
    fileName: "topic_10_corporate_governance_quality_control.json",
    syllabus: "SEBI (LODR) Reg 17 (Board), Reg 18 (Audit Committee Quorum & Mandatory Review), Reg 27, Companies Act Sec 177 & 178, SQC 1 (6 Elements of Quality Control), SQM 1/2, Engagement Quality Review (EQCR), NFRA Authority u/s 132 (Jurisdiction & Penalties)"
  },
  {
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    shortTitle: "Code of Ethics & Misconduct",
    fileName: "topic_11_code_of_ethics_professional_misconduct.json",
    syllabus: "Chartered Accountants Act 1949: First Schedule (Part I Practice Clauses 1-12, Part II Service, Part III, Part IV), Second Schedule (Part I Practice Clauses 1-10, Part II General Clauses 1-4, Part III Other), Revised Code of Ethics 2020: NOCLAR, PIE Fees >15%, Sec 144 Prohibited Services"
  }
];

console.log('Advanced Auditing (AAAPE) topics count:', AUDIT_TOPICS.length);
module.exports = { AUDIT_TOPICS };
