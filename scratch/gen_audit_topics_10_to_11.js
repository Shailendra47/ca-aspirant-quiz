const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'data', 'audit');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// =========================================================================
// TOPIC 10: Corporate Governance and Quality Control (20 Qs)
// ID: 31001 - 31020
// =========================================================================
const topic10Questions = [
  {
    id: 31001,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SEBI (LODR) Regulation 18 - Audit Committee Constitution",
    question: "Under Regulation 18 of SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015, what are the mandatory constitution requirements for the Audit Committee of a listed entity?",
    options: [
      "Minimum three directors as members, at least two-thirds of the members shall be independent directors, all members shall be financially literate, and at least one member shall have accounting or related financial management expertise, with an independent director as Chairperson.",
      "Minimum two directors, both being executive whole-time directors.",
      "Minimum five directors, all of whom must be government nominees.",
      "The Managing Director must be the Chairperson of the Audit Committee."
    ],
    correct: 0,
    ref: "SEBI (LODR) Regulations, 2015 - Regulation 18(1) Constitution of Audit Committee",
    explanation: "Under Regulation 18(1) of SEBI (LODR): (a) The audit committee shall have minimum 3 directors as members; (b) At least two-thirds of the members shall be independent directors; (c) All members of audit committee shall be financially literate and at least one member shall have accounting or related financial management expertise; (d) The Chairperson shall be an independent director and present at AGM.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31002,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SQC 1 - Six Elements of Quality Control System",
    question: "Under Standard on Quality Control (SQC) 1 'Quality Control for Firms that Perform Audits and Reviews of Historical Financial Information', which of the following lists the SIX essential elements of a firm's system of quality control?",
    options: [
      "Leadership Responsibilities for Quality within the Firm, Ethical Requirements, Acceptance and Continuance of Client Relationships and Specific Engagements, Human Resources, Engagement Performance, and Monitoring.",
      "Marketing, Billing, Collection, Tax Planning, Litigation, and Arbitration.",
      "Statutory Audit, Internal Audit, Forensic Audit, Tax Audit, GST Audit, and Stock Audit.",
      "Managing Partner, Senior Partner, Junior Partner, Audit Manager, Article Trainee, and Office Peon."
    ],
    correct: 0,
    ref: "SQC 1, Paragraph 6 - Elements of a System of Quality Control",
    explanation: "Under SQC 1.6, the firm's system of quality control must include policies and procedures addressing six elements: (1) Leadership responsibilities for quality within the firm; (2) Ethical requirements; (3) Acceptance and continuance of client relationships and specific engagements; (4) Human resources; (5) Engagement performance; and (6) Monitoring.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31003,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SEBI (LODR) Regulation 18(2) - Audit Committee Quorum & Meetings",
    question: "Under Regulation 18(2) of SEBI (LODR) Regulations, 2015, how many times must the Audit Committee meet in a year, what is the maximum permissible gap between meetings, and what is the quorum?",
    options: [
      "The audit committee shall meet at least 4 times in a year and not more than 120 days shall elapse between two meetings; quorum shall be either 2 members or one-third of the members (whichever is greater), with at least 2 independent directors present.",
      "Meet at least 12 times a year (monthly) with quorum of 5 independent directors.",
      "Meet once every 2 years with no quorum requirement.",
      "Meet only when summoned by the stock exchange."
    ],
    correct: 0,
    ref: "SEBI (LODR) Regulations, 2015 - Regulation 18(2) Meetings and Quorum of Audit Committee",
    explanation: "Under Regulation 18(2) of SEBI (LODR): (a) The audit committee shall meet at least four times in a year and not more than 120 days shall elapse between two meetings; (b) The quorum for audit committee meeting shall either be two members or one-third of the members of the audit committee, whichever is greater, with at least two independent directors.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31004,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] Section 132 - Penal Powers of NFRA for Professional Misconduct",
    question: "Under Section 132(4)(c) of the Companies Act, 2013, what penalties can the National Financial Reporting Authority (NFRA) impose on an individual auditor or an audit firm if professional or other misconduct is proved?",
    options: [
      "For an individual: fine of not less than ₹1 Lakh (extendable to 5 times fees); For a firm: fine of not less than ₹5 Lakhs (extendable to 10 times fees); AND debarring the member/firm from engaging in audit practice for a minimum period of 6 months up to a maximum period of 10 years.",
      "Strictly a written reprimand with zero monetary penalty.",
      "Suspension of the auditor's passport for 50 years.",
      "NFRA has no power to impose penalties; it can only write letters to ICAI."
    ],
    correct: 0,
    ref: "Section 132(4)(c) of Companies Act, 2013 - Penal Powers of NFRA",
    explanation: "Under Section 132(4)(c), where professional or other misconduct is proved, NFRA has the power to make order imposing penalty: (i) Not less than ₹1 Lakh which may extend to 5 times the fees received in case of individuals; (ii) Not less than ₹5 Lakhs which may extend to 10 times fees in case of firms; and (B) Debarring the member or firm from being appointed as an auditor for a minimum of 6 months up to 10 years.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31005,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] Section 177 - Audit Committee Mandatory Review of Information",
    question: "Under Section 177 of the Companies Act, 2013 and SEBI (LODR) Part C of Schedule II, which of the following is MANDATORILY reviewed by the Audit Committee?",
    options: [
      "Management Discussion and Analysis (MD&A), statement of significant related party transactions, management letters/letters of internal control weaknesses issued by statutory auditors, internal audit reports relating to internal control weaknesses, appointment/removal/remuneration of Chief Internal Auditor, and statement of deviations in use of IPO/rights issue proceeds.",
      "Personal leave records and holiday plans of marketing executives.",
      "Canteen food menu and office decoration invoices.",
      "Political donations made by individual shareholders in their personal capacities."
    ],
    correct: 0,
    ref: "SEBI (LODR) Schedule II, Part C & Section 177 of Companies Act, 2013 - Mandatory Review by Audit Committee",
    explanation: "Under SEBI (LODR) Schedule II, Part C, the Audit Committee must mandatorily review: (1) MD&A of financial condition; (2) Statement of significant related party transactions; (3) Management letters issued by statutory auditors; (4) Internal audit reports relating to internal control weaknesses; (5) Appointment, removal, and remuneration of Chief Internal Auditor; and (6) Statement of deviations under Reg 32.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31006,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SQC 1 - Engagement Quality Control Review (EQCR) Criteria",
    question: "Under SQC 1 and SA 220, for which types of engagements is an Engagement Quality Control Review (EQCR) MANDATORY prior to the issuance of the audit report?",
    options: [
      "Mandatory for all audits of financial statements of listed entities, and for those other audit engagements meeting criteria established by the firm (e.g. public interest entities, high-risk or unusual regulatory profile).",
      "Only for small proprietary businesses.",
      "Only if requested by the local income tax assessing officer.",
      "EQCR is optional and never mandatory for any firm."
    ],
    correct: 0,
    ref: "SQC 1, Paragraph 60 & SA 220, Paragraph 19 - Mandatory EQCR for Listed Entities",
    explanation: "SQC 1.60 and SA 220 mandate that the firm shall establish policies and procedures requiring, for appropriate engagements, an engagement quality control review. Such review is explicitly mandatory for all audits of financial statements of listed entities. For other engagements, the firm establishes objective criteria based on risk, public interest, and regulatory scrutiny.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31007,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SEBI (LODR) Regulation 17 - Board Composition & Independent Directors",
    question: "Under Regulation 17(1) of SEBI (LODR) Regulations, 2015, if the Chairperson of the Board of Directors of a listed entity is a Non-Executive Director who is a PROMOTER or related to a promoter, what minimum proportion of the Board must consist of Independent Directors?",
    options: [
      "At least half (50%) of the Board of Directors shall consist of independent directors.",
      "At least one-third (33.33%) of the Board.",
      "Only one independent director is required.",
      "Independent directors are not permitted on the board."
    ],
    correct: 0,
    ref: "SEBI (LODR) Regulations, 2015 - Regulation 17(1)(b) Board Composition",
    explanation: "Under Regulation 17(1)(b) of SEBI (LODR), where the chairperson of the board of directors is a non-executive director, at least one-third of the board shall comprise independent directors. However, where the regular non-executive chairperson is a promoter of the listed entity or is related to any promoter or person occupying high management positions, at least half (50%) of the board shall consist of independent directors.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31008,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SQC 1 - Differences of Opinion Resolution",
    question: "Under SQC 1, when differences of opinion arise within the engagement team, with those consulted, or between the engagement partner and the engagement quality control reviewer, what policy must the firm follow before issuing the audit report?",
    options: [
      "The firm's policies must ensure that differences of opinion are resolved through documented consultation/mediation, conclusions reached are documented and implemented, and the report is NOT released until the matter is resolved.",
      "The engagement partner can unilaterally override all objections and release the report immediately without documentation.",
      "The firm must refer the dispute to the local police station.",
      "The youngest article trainee's vote decides the dispute."
    ],
    correct: 0,
    ref: "SQC 1, Paragraphs 56-59 - Differences of Opinion in Quality Control",
    explanation: "Under SQC 1.56-59, the firm shall establish policies and procedures for dealing with and resolving differences of opinion within the engagement team, with those consulted and between the engagement partner and the engagement quality control reviewer. Such policies shall require that conclusions reached be documented and implemented, and the report shall not be issued until the difference of opinion is resolved.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31009,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SEBI (LODR) Regulation 27 - Corporate Governance Quarterly Compliance",
    question: "Under Regulation 27(2) of SEBI (LODR) Regulations, 2015, what is the mandatory quarterly compliance filing deadline for listed entities regarding Corporate Governance?",
    options: [
      "Submit a quarterly compliance report on corporate governance in the format specified by the Board to the recognized stock exchange(s) within 21 days from the end of each quarter.",
      "Within 90 days of the Annual General Meeting.",
      "Annually within 6 months of fiscal year-end.",
      "Filing is required only once every 5 years."
    ],
    correct: 0,
    ref: "SEBI (LODR) Regulations, 2015 - Regulation 27(2) Quarterly Corporate Governance Report",
    explanation: "Under Regulation 27(2)(a) of SEBI (LODR), the listed entity shall submit a quarterly compliance report on corporate governance in the format specified by SEBI to the recognized stock exchange(s) within 21 days from the end of each quarter. The report details board composition, committee meetings, and related party transactions.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31010,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SQC 1 - Monitoring of Firm's Quality Control Policies",
    question: "Under SQC 1, what does the 'Monitoring' element require a chartered accountancy firm to do on an ongoing basis?",
    options: [
      "Conduct an ongoing consideration and evaluation of the firm's system of quality control, including periodic inspection of a selection of completed engagements (at least one completed engagement for each engagement partner on a cyclical basis) to obtain reasonable assurance that quality controls are operating effectively.",
      "Monitor the stock prices of client companies daily.",
      "Install CCTV cameras over every audit trainee's laptop.",
      "Require partners to submit their personal bank statements to clients."
    ],
    correct: 0,
    ref: "SQC 1, Paragraphs 74-78 - Monitoring Quality Control Policies and Procedures",
    explanation: "Under SQC 1.74-78, the firm shall establish a monitoring process designed to provide it with reasonable assurance that policies and procedures relating to the system of quality control are relevant, adequate, and operating effectively. This process includes an ongoing evaluation of the system and a periodic inspection of a selection of completed engagements (at least one per partner over an inspection cycle).",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31011,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] Section 149(10) - Term of Office of Independent Director",
    question: "Under Section 149(10) and 149(11) of the Companies Act, 2013, what is the maximum permissible tenure of an Independent Director in a company?",
    options: [
      "An independent director shall hold office for a term up to 5 consecutive years, eligible for reappointment on passing of a special resolution for another term of up to 5 consecutive years; no independent director shall hold office for more than 2 consecutive terms (total 10 years), after which a cooling-off period of 3 years applies.",
      "One term of 10 years without any cooling-off period.",
      "Life tenure until age 75.",
      "Maximum 1 year with annual approval by the High Court."
    ],
    correct: 0,
    ref: "Section 149(10) & (11) of Companies Act, 2013 - Tenure of Independent Directors",
    explanation: "Under Section 149(10) and (11), an independent director can be appointed for up to 5 consecutive years, and re-appointed for a second term of up to 5 consecutive years by special resolution. After two consecutive terms (total 10 years), the director cannot be appointed for a 3-year cooling-off period, during which they cannot be associated with the company in any capacity.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31012,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SQC 1 - Independence Confirmation Frequency",
    question: "Under SQC 1, at least how often must a firm obtain written confirmation of compliance with its policies and procedures on independence from all firm personnel required to be independent?",
    options: [
      "At least annually.",
      "Every 5 years.",
      "Only upon joining the firm as an article trainee.",
      "Whenever the firm changes its office address."
    ],
    correct: 0,
    ref: "SQC 1, Paragraph 23 - Written Confirmation of Independence",
    explanation: "Under SQC 1.23, at least annually, the firm shall obtain written confirmation of compliance with its policies and procedures on independence from all firm personnel required to be independent by relevant ethical requirements. This ensures ongoing monitoring of personal investments, relationships, and conflicts.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31013,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] Section 178 - Nomination and Remuneration Committee (NRC)",
    question: "Under Section 178 of the Companies Act, 2013, what is the mandatory composition of the Nomination and Remuneration Committee (NRC)?",
    options: [
      "Three or more non-executive directors, out of which not less than one-half shall be independent directors; the Chairperson of the company may be appointed as a member, but shall NOT chair the committee.",
      "Two executive directors and one independent director.",
      "The Managing Director, CFO, and Company Secretary.",
      "Exclusively all independent directors with no non-executive directors."
    ],
    correct: 0,
    ref: "Section 178(1) of Companies Act, 2013 - Nomination and Remuneration Committee",
    explanation: "Under Section 178(1), the Nomination and Remuneration Committee shall consist of three or more non-executive directors out of which not less than one-half shall be independent directors. Provided that the chairperson of the company (whether executive or non-executive) may be appointed as a member of the NRC, but shall not chair such committee.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31014,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SEBI (LODR) Regulation 23 - Material Related Party Transactions",
    question: "Under Regulation 23 of SEBI (LODR) Regulations, 2015, what transaction threshold defines a 'Material Related Party Transaction' requiring prior approval of shareholders by ordinary resolution?",
    options: [
      "A transaction with a related party if the transaction(s) to be entered into individually or taken together with previous transactions during a financial year exceeds ₹1,000 Crores OR 10% of the annual consolidated turnover of the listed entity as per latest audited financial statements, whichever is LOWER.",
      "Exceeds ₹100 Crores or 50% of net worth.",
      "Any transaction above ₹1 Lakh.",
      "Materiality is defined by the Managing Director in consultation with the statutory auditor."
    ],
    correct: 0,
    ref: "SEBI (LODR) Regulations, 2015 - Regulation 23(1) Material Related Party Transactions",
    explanation: "Under amended Regulation 23(1) of SEBI (LODR), a transaction with a related party shall be considered material if the transaction(s) to be entered into individually or taken together with previous transactions during a financial year exceeds ₹1,000 Crores or 10% of the annual consolidated turnover of the listed entity, whichever is lower. (For brand usage/royalty: exceeds 5% of turnover).",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31015,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SQM 1 / SQM 2 - Modern Quality Management Standards",
    question: "Under the new IAASB / ICAI Quality Management Framework (SQM 1 replacing SQC 1), what is the core shift in approach regarding firm quality management?",
    options: [
      "A shift from a reactive, compliance-based quality control model to a proactive, iterative, and risk-based 'System of Quality Management' (SOQM) tailored to the firm's nature and circumstances, requiring leadership to establish quality objectives, identify and assess quality risks, and design responsive controls.",
      "Quality management is outsourced entirely to artificial intelligence algorithms.",
      "Firms are no longer required to document audit procedures.",
      "Quality standards apply only to firms with over 1,000 partners."
    ],
    correct: 0,
    ref: "ICAI Standard on Quality Management (SQM) 1 - Risk-Based System of Quality Management",
    explanation: "SQM 1 transitions the profession from the static, linear policies of SQC 1 to an integrated, proactive Risk-Based System of Quality Management (SOQM). Firms must systematically: (1) Establish quality objectives; (2) Identify and assess risks to achieving those objectives; and (3) Design and implement responses to address assessed quality risks.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31016,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SEBI (LODR) - Auditor Certificate on Corporate Governance",
    question: "Under Part E of Schedule V of SEBI (LODR) Regulations, 2015, what must the listed entity obtain and annex to the directors' report regarding Corporate Governance compliance?",
    options: [
      "A certificate from either the statutory auditors or practicing company secretaries regarding compliance of conditions of corporate governance.",
      "A clearance certificate from the local police commissioner.",
      "An affidavit from every shareholder approving the company's ethics.",
      "Corporate governance certification was made voluntary in 2021."
    ],
    correct: 0,
    ref: "SEBI (LODR) Schedule V, Part E - Compliance Certificate on Corporate Governance",
    explanation: "Under Schedule V, Part E of SEBI (LODR), the listed entity shall obtain a certificate from either the statutory auditors or a practicing company secretary regarding compliance of conditions of corporate governance and annex this certificate with the directors' report sent to shareholders and stock exchanges.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31017,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] Section 177(9) - Vigil Mechanism / Whistle-Blower Framework",
    question: "Under Section 177(9) of the Companies Act, 2013 and Rule 7 of Companies (Meetings of Board and its Powers) Rules, 2014, which companies are MANDATORILY required to establish a Vigil Mechanism?",
    options: [
      "Every listed company, companies that accept deposits from the public, and companies that have borrowed money from banks and public financial institutions in excess of ₹50 Crores.",
      "Only companies with more than 10,000 employees.",
      "Only foreign airlines operating in India.",
      "All partnership firms and sole proprietorships."
    ],
    correct: 0,
    ref: "Section 177(9) of Companies Act, 2013 & Rule 7 - Vigil Mechanism Applicability",
    explanation: "Under Section 177(9) and Rule 7, a vigil mechanism for directors and employees to report genuine concerns shall be established by: (1) Every listed company; (2) Companies which accept deposits from the public; and (3) Companies which have borrowed money from banks and public financial institutions in excess of fifty crore rupees.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31018,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SQC 1 - Partner Rotation for Listed Audits",
    question: "Under SQC 1 and the Revised Code of Ethics, what is the mandatory rotation requirement for the Engagement Partner of a listed entity audit engagement?",
    options: [
      "The engagement partner shall be rotated after a pre-defined period, normally not more than seven years, followed by a cooling-off period of at least two years (or five years under Section 139(2) statutory auditor firm rotation for individual auditors).",
      "Rotation is required every 12 months.",
      "An engagement partner can never be rotated under ICAI bylaws.",
      "Rotation applies only if the partner turns 60 years old."
    ],
    correct: 0,
    ref: "SQC 1, Paragraph 27 & Revised Code of Ethics - Partner Rotation",
    explanation: "Under SQC 1.27, for audits of financial statements of listed entities, the engagement partner should be rotated after a pre-defined period, normally not more than seven years. Under Section 139(2) of the Companies Act, an individual auditor cannot serve more than 1 term of 5 consecutive years, and an audit firm cannot serve more than 2 terms of 5 consecutive years (10 years) followed by a 5-year cooling off.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31019,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] Section 149(6) - Criteria of Independence of Independent Director",
    question: "Under Section 149(6) of the Companies Act, 2013, which of the following individuals is DISQUALIFIED from being appointed as an Independent Director of a company?",
    options: [
      "A person who, neither himself nor any of his relatives, holds or has held the position of key managerial personnel (KMP) or been employee of the company or its holding/subsidiary in any of the 3 preceding financial years, or who has had pecuniary relationship (other than director remuneration) exceeding 10% of total income with the group.",
      "A person who holds 10 equity shares of the company.",
      "A person who lives in the same city as the corporate office.",
      "A person who has read the company's annual report."
    ],
    correct: 0,
    ref: "Section 149(6) of Companies Act, 2013 - Qualifications and Disqualifications of Independent Directors",
    explanation: "Under Section 149(6), an independent director must be a person of integrity with relevant expertise who is not a promoter and has no material pecuniary relationship with the company, its holding, subsidiary, or associate company during the current or 2 preceding financial years, and whose relatives do not hold KMP roles or substantial pecuniary relationships.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31020,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 10,
    topicTitle: "Corporate Governance and Quality Control",
    tag: "[ICAI CA Final PYQ] SQC 1 - Client Acceptance and Continuance Integrity Verification",
    question: "Under SQC 1, before accepting a new audit client, what must the firm evaluate regarding the 'Integrity of the Client'?",
    options: [
      "The identity and business reputation of principal owners, key management, related parties, and TCWG; the nature of operations; information concerning attitude towards aggressive accounting interpretation; whether management is aggressively concerned with maintaining firm fees as low as possible; and indications of money laundering or criminal activities.",
      "Whether the client provides free air tickets to the audit team.",
      "Whether the client's corporate logo matches the audit firm's colors.",
      "Whether the client pays its municipal property taxes in cash."
    ],
    correct: 0,
    ref: "SQC 1, Paragraphs 28-35 - Acceptance and Continuance of Client Relationships",
    explanation: "Under SQC 1.28-35, the firm shall obtain information considered necessary in the circumstances before accepting an engagement with a new client, when deciding whether to continue an existing engagement, and when considering acceptance of a new engagement with an existing client. Evaluating client integrity (reputation, litigation history, attitude toward controls and financial reporting) is foundational.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  }
];

// =========================================================================
// TOPIC 11: Code of Ethics and Professional Misconduct Under the Chartered Accountants Act (20 Qs)
// ID: 31101 - 31120
// =========================================================================
const topic11Questions = [
  {
    id: 31101,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] First Schedule, Part I, Clause 6 - Solicitation of Professional Work",
    question: "CA Vikram issued a circular letter to 500 manufacturing companies across Gujarat who were not his existing clients, describing the specialized tax advisory capabilities of his firm and inviting them to appoint his firm for GST litigation. Under the First Schedule to the Chartered Accountants Act, 1949, is CA Vikram guilty of professional misconduct?",
    options: [
      "Yes, guilty under Clause (6) of Part I of the First Schedule for soliciting client or professional work either directly or indirectly by circular, advertisement, personal communication, or interview, or by any other means.",
      "No, because Chartered Accountants have a fundamental right under the Constitution to advertise commercial services.",
      "No, provided Vikram did not mention his professional fees in the circular.",
      "Only if another Chartered Accountant files an injunction in the High Court."
    ],
    correct: 0,
    ref: "First Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (6)",
    explanation: "Under Clause (6) of Part I of the First Schedule, a Chartered Accountant in practice is deemed to be guilty of professional misconduct if he solicits clients or professional work either directly or indirectly by circular, advertisement, personal communication or interview or by any other means. Sending circulars to non-clients directly violates Clause 6.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31102,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] First Schedule, Part I, Clause 8 - Prior Communication with Previous Auditor",
    question: "CA Neha accepts appointment as statutory auditor of Zenith Steels Ltd. without first communicating in writing with the retiring previous auditor, CA Prakash. She states that since the company's AGM passed a valid resolution appointing her and ROC filings were completed, prior communication with the retiring auditor was a mere formality. Is Neha guilty of professional misconduct?",
    options: [
      "Yes, guilty under Clause (8) of Part I of the First Schedule for accepting a position as auditor previously held by another chartered accountant without first communicating with him in writing.",
      "No, because the shareholder resolution in AGM is supreme over professional bylaws.",
      "No, provided Neha sends an email 3 months after accepting the audit.",
      "No, because prior communication is voluntary under the New Scheme of ICAI."
    ],
    correct: 0,
    ref: "First Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (8)",
    explanation: "Under Clause (8) of Part I of the First Schedule, a CA in practice is deemed guilty of professional misconduct if he accepts a position as auditor previously held by another chartered accountant without first communicating with him in writing. Such communication must be in writing (via registered post with acknowledgement due, speed post, or verifiable digital means) prior to acceptance.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31103,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] Revised Code of Ethics - NOCLAR (Non-Compliance with Laws & Regulations)",
    question: "Under the Revised ICAI Code of Ethics (2020), what is the scope and mandatory applicability of NOCLAR (Responding to Non-Compliance with Laws and Regulations)?",
    options: [
      "Applies to audit engagements of listed entities for senior professional accountants in practice; requires the professional accountant who encounters or becomes aware of non-compliance or suspected non-compliance with laws affecting financial statements or operating integrity to understand the matter, address it with management/TCWG, and determine whether disclosure to appropriate public authorities is required in the public interest.",
      "Applies only to criminal defamation cases.",
      "Requires all CAs to disclose every client transaction to the local police weekly.",
      "NOCLAR is purely voluntary and has zero ethical standing in India."
    ],
    correct: 0,
    ref: "ICAI Revised Code of Ethics (2020) - Section 260 & Section 360 (NOCLAR)",
    explanation: "NOCLAR sets out the framework for professional accountants when encountering illegal acts or suspected non-compliance. In India, it currently applies to audits of listed entities. When serious non-compliance (fraud, corruption, money laundering, environmental crime) is identified, the auditor must engage management/TCWG, and if they fail to take appropriate rectifying steps, evaluate whether overriding client confidentiality to disclose to regulatory authorities is required in the public interest.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31104,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] Second Schedule, Part I, Clause 7 - Gross Negligence in Professional Duties",
    question: "CA Rohan audited the financial statements of a finance company having assets of ₹400 Crores. He signed an unmodified audit report without verifying the existence of cash balances of ₹85 Crores or checking whether loan securities were registered with ROC. The company subsequently collapsed due to non-existent cash and unbacked loans. Under which provision is CA Rohan liable?",
    options: [
      "Guilty under Clause (7) of Part I of the Second Schedule for being grossly negligent in the conduct of his professional duties.",
      "Guilty under Clause (1) of Part I of the First Schedule for sharing fees with an advocate.",
      "Guilty under Clause (2) of Part II of the First Schedule for failing to pay Council fees.",
      "Rohan is not liable because the auditor is a watchdog, not a bloodhound."
    ],
    correct: 0,
    ref: "Second Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (7)",
    explanation: "Under Clause (7) of Part I of the Second Schedule, a member in practice is deemed to be guilty of professional misconduct if he does not exercise due diligence, or is grossly negligent in the conduct of his professional duties. Failing to perform fundamental verification of 21% of total balance sheet assets (cash and securities) constitutes gross professional negligence.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31105,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] First Schedule, Part I, Clause 10 - Contingent Fees & Percentage of Profits",
    question: "CA Arvind agrees to represent a corporate client before the Income Tax Appellate Tribunal (ITAT) on the terms that his professional fee will be calculated strictly as '15% of the total tax demand deleted by the Tribunal'. Under the Chartered Accountants Act, is CA Arvind guilty of professional misconduct?",
    options: [
      "Yes, guilty under Clause (10) of Part I of the First Schedule for charging or accepting fees which are based on a percentage of profits or which are contingent upon the findings or results of such employment (unless permitted under Regulation 192, which does not exempt tax litigation percentage fees).",
      "No, because charging contingent fees for court representation is standard commercial practice.",
      "No, provided the agreement is executed on judicial stamp paper.",
      "Only if the tax demand deleted exceeds ₹10 Crores."
    ],
    correct: 0,
    ref: "First Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (10) & Regulation 192",
    explanation: "Under Clause (10) of Part I of the First Schedule, a member in practice is guilty of misconduct if he charges or accepts fees which are based on a percentage of profits or contingent upon findings. While Regulation 192 provides narrow exceptions (e.g. liquidator fees, debt recovery percentage for non-audit clients, valuer fees in certain cases), charging a percentage of tax relief deleted in litigation is strictly prohibited.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31106,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] Revised Code of Ethics - Fee Dependence on Public Interest Entities (>15%)",
    question: "Under Section 410 of the Revised ICAI Code of Ethics (2020), what mandatory safeguard must an audit firm implement if the gross fees received from a single Public Interest Entity (PIE) audit client exceed 15% of the firm's total gross fee revenue for two consecutive years?",
    options: [
      "The firm must disclose the fee dependence to TCWG and arrange for an Engagement Quality Review by an external professional accountant (either pre-issuance EQR before opinion is signed, or post-issuance review); if fee dependence continues beyond 5 consecutive years, the firm CANNOT continue as auditor.",
      "The firm must refund the excess fee above 15% to the Central Government.",
      "The firm must immediately surrender its ICAI firm registration.",
      "No safeguards are required because fee dependence only applies at 50%."
    ],
    correct: 0,
    ref: "ICAI Revised Code of Ethics (2020) - Section 410: Fees and Public Interest Entity Dependence",
    explanation: "Under Section 410 of the revised Code of Ethics, where fees from a Public Interest Entity (PIE) exceed 15% of the firm's total fees for two consecutive years, the firm must disclose this to TCWG and apply safeguards: pre-issuance review by external accountant or post-issuance review. If dependence continues for 5 consecutive years, the firm must cease acting as auditor.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31107,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] First Schedule, Part I, Clause 11 - Engaging in Other Business or Occupation",
    question: "CA Gaurav, holding a full-time Certificate of Practice (COP), starts a partnership business with his brother to run a restaurant and acts as a working partner drawing monthly salary and profit share without obtaining prior permission of the Council of ICAI. Under which clause is CA Gaurav guilty of professional misconduct?",
    options: [
      "Guilty under Clause (11) of Part I of the First Schedule for engaging in any business or occupation other than the profession of chartered accountants unless permitted by the Council.",
      "Guilty under Clause (2) of Part I of the Second Schedule for certifying accounts in which he has substantial interest.",
      "Guilty under Clause (5) of Part I of the First Schedule for securing business through unauthorized means.",
      "Gaurav is not guilty because food businesses are exempt under Council general guidelines."
    ],
    correct: 0,
    ref: "First Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (11) & Regulation 190A",
    explanation: "Under Clause (11) of Part I of the First Schedule, a CA in practice is guilty of misconduct if he engages in any business or occupation other than the profession of chartered accountancy unless permitted by the Council. While Regulation 190A grants general permission for certain activities (e.g. authorship of books, teaching up to specified hours, sleeping partner in family firm), acting as an active working partner in a commercial restaurant requires specific prior permission of Council.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31108,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] Second Schedule, Part I, Clause 4 - Substantial Interest in Client Entity",
    question: "CA Deepa is the statutory auditor of Surya Power Ltd. Her husband holds 22% of the paid-up equity share capital of Surya Power Ltd. Deepa signs the statutory audit report certifying the financial statements as presenting a true and fair view. Under which provision is CA Deepa guilty of professional misconduct?",
    options: [
      "Guilty under Clause (4) of Part I of the Second Schedule for expressing an opinion on financial statements of an enterprise in which she, her firm, or a partner in her firm has a substantial interest.",
      "Guilty under Clause (1) of Part I of the First Schedule.",
      "Guilty under Clause (3) of Part II of the Second Schedule.",
      "Deepa is not guilty because her husband's shareholding cannot affect her professional independence."
    ],
    correct: 0,
    ref: "Second Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (4) & Council Guidelines",
    explanation: "Under Clause (4) of Part I of the Second Schedule, a member in practice is guilty of misconduct if he expresses an opinion on financial statements of any business or enterprise in which he, his firm, or a partner in his firm has a substantial interest. Under Council guidelines, 'substantial interest' includes interest held by relatives (spouse, parents, siblings, children). 22% voting power held by husband constitutes substantial interest.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31109,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] Second Schedule, Part I, Clause 8 - Failure to Obtain Sufficient Audit Evidence",
    question: "Under Clause (8) of Part I of the Second Schedule to the Chartered Accountants Act, 1949, when is a member in practice deemed to be guilty of professional misconduct regarding audit evidence?",
    options: [
      "If he fails to obtain sufficient information which is necessary for expression of an opinion or its exceptions are sufficiently material to negate the expression of an opinion.",
      "If he asks more than 10 questions to the CFO.",
      "If he fails to retain audit documentation for 50 years.",
      "If he charges audit fees below the ICAI recommended minimum scale."
    ],
    correct: 0,
    ref: "Second Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (8)",
    explanation: "Under Clause (8) of Part I of the Second Schedule, a member in practice is deemed to be guilty of professional misconduct if he fails to obtain sufficient information which is necessary for expression of an opinion or its exceptions are sufficiently material to negate the expression of an opinion. Expressing a clean opinion without obtaining SAAE breaches Clause 8.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31110,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] First Schedule, Part I, Clause 7 - Designations and Self-Praise on Letterheads",
    question: "CA Manas prints his visiting cards and stationery using the designation: 'CA Manas, Income Tax Specialist, Mergers & Corporate Restructuring Guru, Gold Medallist'. Under the First Schedule to the Chartered Accountants Act, is CA Manas guilty of professional misconduct?",
    options: [
      "Yes, guilty under Clause (7) of Part I of the First Schedule for using any designation or description other than Chartered Accountant on professional documents, visiting cards, letterheads, or signboards, and for advertising professional attainments.",
      "No, because mentioning true university medals and professional specializations is encouraged.",
      "No, provided Manas does not print his mobile phone number.",
      "Only if the letterhead is printed in red ink."
    ],
    correct: 0,
    ref: "First Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (7) & Section 7 of the Act",
    explanation: "Under Clause (7) of Part I of the First Schedule read with Section 7 of the CA Act, a member in practice is prohibited from using any designation or description other than that of 'Chartered Accountant' on professional documents, letterheads, or visiting cards. Using self-laudatory descriptions like 'Specialist' or 'Guru' directly breaches Clause 7.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31111,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] First Schedule, Part I, Clause 1 - Sharing Fees with Non-Members",
    question: "CA Pradeep enters into a partnership agreement with a software engineer to provide IT consultancy services and agrees to share 40% of his firm's gross audit fees with the engineer in exchange for client referrals. Under which provision is CA Pradeep guilty of professional misconduct?",
    options: [
      "Guilty under Clause (1) of Part I of the First Schedule for paying or allowing or agreeing to pay or allow, directly or indirectly, any share, commission, or brokerage in the fees or profits of professional business to any person other than a member of the Institute or partner.",
      "Guilty under Clause (9) of Part I of the Second Schedule.",
      "Guilty under Clause (3) of Part IV of the First Schedule.",
      "Pradeep is not guilty because software engineers are recognized professionals."
    ],
    correct: 0,
    ref: "First Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (1)",
    explanation: "Under Clause (1) of Part I of the First Schedule, a member in practice is deemed to be guilty of professional misconduct if he pays or allows or agrees to pay or allow, directly or indirectly, any share, commission, or brokerage in the fees or profits of professional business, to any person other than a member of the Institute or a partner (or recognized professional under Section 53B). Sharing fees with an engineer violates Clause 1.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31112,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] Second Schedule, Part I, Clause 1 - Disclosing Confidential Information",
    question: "During the audit of a pharmaceutical company, the auditor discovers confidential clinical trial formulations for a breakthrough cancer drug. The auditor leaks this formulation to a competitor for a monetary reward of ₹25 Lakhs. Under which provision is the auditor guilty of professional misconduct?",
    options: [
      "Guilty under Clause (1) of Part I of the Second Schedule for disclosing information acquired in the course of his professional engagement to any person other than his client, without the consent of his client, or otherwise than as required by any law.",
      "Guilty under Clause (4) of Part I of the First Schedule.",
      "Guilty under Clause (2) of Part II of the First Schedule.",
      "The auditor is not guilty because scientific formulas belong to humanity."
    ],
    correct: 0,
    ref: "Second Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (1)",
    explanation: "Under Clause (1) of Part I of the Second Schedule, a member in practice is guilty of misconduct if he discloses information acquired in the course of his professional engagement to any person other than his client, without the consent of his client, or otherwise than as required by any law for the time being in force. Breach of client confidentiality is a severe offence under Part I of the Second Schedule.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31113,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] Second Schedule, Part I, Clause 2 - Certifying Future Financial Forecasts",
    question: "CA Rahul signs an official certification statement on his letterhead certifying that: 'The financial forecast of Apex Builders Ltd. showing net profits of ₹150 Crores for FY 2026-27 is guaranteed to be accurate and will be achieved.' Under which clause is CA Rahul guilty of professional misconduct?",
    options: [
      "Guilty under Clause (2) of Part I of the Second Schedule for certifying or submitting in his name or that of his firm a report of an examination of financial statements unless the examination has been made by him or by a partner/employee, or for vouching for the accuracy of forecasts.",
      "Guilty under Clause (6) of Part I of the First Schedule.",
      "Guilty under Clause (3) of Part III of the First Schedule.",
      "Rahul is not guilty because engineers certify building stability similarly."
    ],
    correct: 0,
    ref: "Second Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (2) & Council Guidelines on PFI",
    explanation: "Under Clause (2) of Part I of the Second Schedule read with Council directions, a CA can participate in the preparation of prospective financial information and review assumptions under SAE 3400, but he is strictly prohibited from vouching for the accuracy of forecasts or expressing an opinion that the results will be achieved.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31114,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] First Schedule, Part I, Clause 2 - Accepting Share of Profits from Non-Members",
    question: "Under Clause (2) of Part I of the First Schedule to the Chartered Accountants Act, 1949, when is a member in practice deemed guilty of professional misconduct?",
    options: [
      "If he accepts or agrees to accept any part of the profits of the professional work of a person who is not a member of the Institute.",
      "If he accepts a fee from an audit client through bank transfer.",
      "If he accepts a scholarship from a foreign university.",
      "If he accepts a trophy for winning a marathon."
    ],
    correct: 0,
    ref: "First Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (2)",
    explanation: "Under Clause (2) of Part I of the First Schedule, a member in practice is deemed to be guilty of professional misconduct if he accepts or agrees to accept any part of the profits of the professional work of a person who is not a member of the Institute (subject to specified reciprocal arrangements with recognized foreign institutes under Section 53B).",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31115,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] First Schedule, Part II - Professional Misconduct for Members in Service",
    question: "CA Shilpa is employed as a Senior Finance Manager in an IT multinational. She accepts a secret kickback of ₹5 Lakhs from a vendor in exchange for clearing disputed software invoices. Under which schedule and clause of the Chartered Accountants Act is CA Shilpa guilty of professional misconduct?",
    options: [
      "Guilty under Clause (2) of Part II of the First Schedule for accepting or agreeing to accept any part of fees, profits, or gains from a lawyer, chartered accountant, or broker engaged by the company, or any person who will benefit from employment.",
      "Guilty under Clause (1) of Part I of the First Schedule.",
      "Guilty under Clause (7) of Part I of the Second Schedule.",
      "Shilpa is not liable under the CA Act because she is in employment, not in practice."
    ],
    correct: 0,
    ref: "First Schedule to the Chartered Accountants Act, 1949 - Part II (Members in Service), Clause (2)",
    explanation: "Part II of the First Schedule applies specifically to members of the Institute in service (employment). Under Clause (2) of Part II, a member in service is guilty of misconduct if she accepts or agrees to accept any part of fees, profits, or gains by way of commission, kickback, or gratification from any person dealing with the employer.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31116,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] Second Schedule, Part I, Clause 5 - Failure to Disclose Material Fact in Financial Statements",
    question: "Under Clause (5) of Part I of the Second Schedule, when is a Chartered Accountant in practice guilty of professional misconduct?",
    options: [
      "If he fails to disclose a material fact known to him which is not disclosed in a financial statement, but disclosure of which is necessary in making such financial statement where he is concerned with that financial statement in a professional capacity, so that financial statements are not misleading.",
      "If he fails to disclose his home address to the client.",
      "If he fails to disclose his personal income tax return to the Managing Director.",
      "If he fails to attend the company's annual sports day."
    ],
    correct: 0,
    ref: "Second Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (5)",
    explanation: "Under Clause (5) of Part I of the Second Schedule, a member in practice is guilty of misconduct if he fails to disclose a material fact known to him which is not disclosed in a financial statement, but disclosure of which is necessary in making such financial statement where he is concerned with that financial statement in a professional capacity, so that the financial statements are not misleading.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31117,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] Second Schedule, Part I, Clause 6 - Failure to Report Material Misstatement",
    question: "During the audit of a trading company, the auditor discovers that physical inventory worth ₹20 Crores was destroyed in a flood and has zero value, but management continues to show it at full cost. The auditor issues an unmodified clean report without mentioning the loss. Under which clause is the auditor guilty?",
    options: [
      "Guilty under Clause (6) of Part I of the Second Schedule for failing to report a material misstatement known to him to appear in a financial statement with which he is concerned in a professional capacity.",
      "Guilty under Clause (8) of Part I of the First Schedule.",
      "Guilty under Clause (1) of Part II of the Second Schedule.",
      "The auditor is not guilty because inventory valuation is management's sole concern."
    ],
    correct: 0,
    ref: "Second Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (6)",
    explanation: "Under Clause (6) of Part I of the Second Schedule, a member in practice is guilty of professional misconduct if he fails to report a material misstatement known to him to appear in a financial statement with which he is concerned in a professional capacity. Signing an unmodified report while aware of a ₹20 Crore unrecorded write-down violates Clause 6.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31118,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] First Schedule, Part IV & Second Schedule, Part III - 'Other Misconduct'",
    question: "Under the Chartered Accountants Act, 1949, what constitutes 'Other Misconduct' (Part IV of First Schedule vs Part III of Second Schedule)?",
    options: [
      "Conduct that brings disrepute to the profession or Institute whether or not related to professional work; if an offence is punishable with imprisonment for a term not exceeding 6 months, it falls under Part IV of First Schedule (Board of Discipline); if punishable with imprisonment exceeding 6 months, it falls under Part III of Second Schedule (Disciplinary Committee).",
      "Other misconduct applies only to traffic fines.",
      "Other misconduct is abolished in the New Scheme.",
      "Other misconduct applies only to sports betting."
    ],
    correct: 0,
    ref: "Section 21, 21A & 21B of the Chartered Accountants Act, 1949 - Other Misconduct",
    explanation: "Under the CA Act, 'Other Misconduct' covers actions that bring disrepute to the profession even outside professional practice (e.g. criminal fraud, tax evasion, bouncing cheques dishonestly). If the offence is punishable with imprisonment up to 6 months, it is dealt with by the Board of Discipline under Part IV of First Schedule; if punishable with imprisonment exceeding 6 months, it is dealt with by the Disciplinary Committee under Part III of Second Schedule.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31119,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] Second Schedule, Part I, Clause 10 - Defalcation of Client Money",
    question: "A client deposits ₹15 Lakhs in cash with CA Mayur specifically for payment of advance income tax on March 15. CA Mayur deposits the cash into his personal bank account and utilizes the money to purchase personal luxury jewelry, failing to pay the tax. Under which provision is CA Mayur guilty of professional misconduct?",
    options: [
      "Guilty under Clause (10) of Part I of the Second Schedule for failing to keep monies of his client other than fees or remitted expenses in a separate banking account or for using such monies for purposes other than they were intended.",
      "Guilty under Clause (4) of Part I of the First Schedule.",
      "Guilty under Clause (1) of Part II of the First Schedule.",
      "Mayur is not guilty because money is fungible."
    ],
    correct: 0,
    ref: "Second Schedule to the Chartered Accountants Act, 1949 - Part I, Clause (10)",
    explanation: "Under Clause (10) of Part I of the Second Schedule, a member in practice is guilty of professional misconduct if he fails to keep monies of his client other than fees or remitted expenses in a separate banking account or uses such monies for purposes other than they were intended for. Misappropriating client tax money violates Clause 10.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  },
  {
    id: 31120,
    subject: "Advanced Auditing, Assurance and Professional Ethics",
    paper: "Paper 3",
    topicId: 11,
    topicTitle: "Code of Ethics and Professional Misconduct Under the Chartered Accountants Act",
    tag: "[ICAI CA Final PYQ] Revised Code of Ethics - Inducements and Gifts",
    question: "Under Section 340 of the Revised ICAI Code of Ethics (2020), can a statutory auditor accept an expensive foreign luxury vacation package worth ₹8 Lakhs offered by an audit client's Managing Director as a 'token of personal appreciation'?",
    options: [
      "No. Acceptance of inducements or gifts that are not trivial and inconsequential creates self-interest and familiarity threats that cannot be reduced to an acceptable level; the auditor must refuse the offer.",
      "Yes, provided the vacation is taken after the audit report is signed.",
      "Yes, provided the auditor pays for his own airfare.",
      "Only if authorized by the Audit Committee."
    ],
    correct: 0,
    ref: "ICAI Revised Code of Ethics (2020) - Section 340: Inducements, Including Gifts and Hospitality",
    explanation: "Under Section 340 of the revised Code of Ethics, a professional accountant shall not accept an inducement (gifts, hospitality, travel) that is made with an intent to improperly influence behaviour, or where a reasonable and informed third party would conclude that the inducement creates significant self-interest or familiarity threats. Only gifts that are clearly trivial and inconsequential may be accepted.",
    difficulty: "Difficult",
    type: "Case-Scenario MCQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  }
];

fs.writeFileSync(path.join(outDir, 'topic_10_corporate_governance_quality_control.json'), JSON.stringify(topic10Questions, null, 2));
console.log('✅ Topic 10 generated: 20 Questions');

fs.writeFileSync(path.join(outDir, 'topic_11_code_of_ethics_professional_misconduct.json'), JSON.stringify(topic11Questions, null, 2));
console.log('✅ Topic 11 generated: 20 Questions');
