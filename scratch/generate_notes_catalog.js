const fs = require('fs');
const path = require('path');

const notesCatalog = {
  version: "1.0.0",
  lastUpdated: new Date().toISOString(),
  groups: [
    {
      group: "Group I (CA Final)",
      groupCode: "G1",
      badge: "Group I • 3 Core Subjects",
      subjects: [
        {
          subject: "Financial Reporting",
          subjectCode: "FR",
          paperCode: "Paper 1",
          description: "Ind AS and AS framework, consolidation, business combinations, and financial instruments",
          topics: [
            {
              id: "g1-fr-framework",
              title: "Ind AS and AS Framework",
              subject: "Financial Reporting",
              group: "Group I",
              groupCode: "G1",
              studyTime: "15 Mins",
              coreConcepts: [
                "Roadmap & Applicability of Ind AS vs AS",
                "Conceptual Framework for Financial Reporting under Ind AS",
                "Ind AS 1: Presentation of Financial Statements & Schedule III",
                "Ind AS 8: Accounting Policies, Changes in Estimates & Errors",
                "Major Carve-Outs and Carve-Ins from IFRS"
              ]
            },
            {
              id: "g1-fr-consolidation",
              title: "Consolidation (Ind AS 110)",
              subject: "Financial Reporting",
              group: "Group I",
              groupCode: "G1",
              studyTime: "20 Mins",
              coreConcepts: [
                "Single Control Model (Power, Variable Returns, Link)",
                "Uniform Accounting Policies & Consolidation Adjustments",
                "Non-Controlling Interest (NCI) Proportionate vs Fair Value",
                "Elimination of Intra-Group Balances & Unrealized Profits",
                "Translation of Foreign Operations (Ind AS 21)"
              ]
            },
            {
              id: "g1-fr-business-combinations",
              title: "Business Combinations (Ind AS 103)",
              subject: "Financial Reporting",
              group: "Group I",
              groupCode: "G1",
              studyTime: "20 Mins",
              coreConcepts: [
                "Acquisition Method: Identifying Acquirer & Acquisition Date",
                "Measuring Consideration Transferred & Contingent Consideration",
                "Fair Valuation of Identifiable Net Assets & Contingent Liabilities",
                "Goodwill Computation vs Gain on Bargain Purchase (Capital Reserve)",
                "Common Control Transactions (Appendix C Pooling of Interests)"
              ]
            },
            {
              id: "g1-fr-financial-instruments",
              title: "Financial Instruments (Ind AS 32 & 109)",
              subject: "Financial Reporting",
              group: "Group I",
              groupCode: "G1",
              studyTime: "25 Mins",
              coreConcepts: [
                "Classification of Financial Assets: Business Model & SPPI Test",
                "Measurement Bases: Amortised Cost, FVTOCI, FVTPL",
                "Compound Financial Instruments & Split Accounting (Ind AS 32)",
                "Expected Credit Loss (ECL) 3-Stage Impairment Model",
                "Hedge Accounting: Fair Value, Cash Flow & Net Investment Hedges"
              ]
            }
          ]
        },
        {
          subject: "Strategic Financial Management",
          subjectCode: "SFM",
          paperCode: "Paper 2",
          description: "Capital budgeting, cost of capital, derivatives, portfolio management, and valuation",
          topics: [
            {
              id: "g1-sfm-capital-budgeting",
              title: "Capital Budgeting Under Risk & Uncertainty",
              subject: "Strategic Financial Management",
              group: "Group I",
              groupCode: "G1",
              studyTime: "18 Mins",
              coreConcepts: [
                "Sensitivity Analysis vs Scenario Analysis in Project Appraisal",
                "Certainty Equivalent (CE) Approach & Risk-Adjusted Discount Rate (RADR)",
                "Decision Tree Analysis & Sequential Investment Decisions",
                "Adjusted Present Value (APV) Model",
                "Real Options Framework (Option to Delay, Expand, Abandon)"
              ]
            },
            {
              id: "g1-sfm-cost-of-capital",
              title: "Cost of Capital & Capital Structure Decisions",
              subject: "Strategic Financial Management",
              group: "Group I",
              groupCode: "G1",
              studyTime: "15 Mins",
              coreConcepts: [
                "Weighted Average Cost of Capital (WACC) & Marginal Cost of Capital",
                "Cost of Equity: CAPM, Dividend Growth, Bond Yield Plus Risk Premium",
                "Net Income (NI) & Net Operating Income (NOI) Theories",
                "Modigliani-Miller (MM) Propositions I & II With & Without Taxes",
                "Arbitrage Proofs & Home-Made Leverage Mechanics"
              ]
            },
            {
              id: "g1-sfm-derivatives",
              title: "Derivatives: Futures, Options & Swaps",
              subject: "Strategic Financial Management",
              group: "Group I",
              groupCode: "G1",
              studyTime: "25 Mins",
              coreConcepts: [
                "Futures Pricing, Basis, Contango & Hedging Portfolio Beta",
                "Black-Scholes-Merton (BSM) Model & Binomial Option Pricing",
                "Option Greeks: Delta, Gamma, Theta, Vega, Rho",
                "Options Trading Strategies: Bull Call Spread, Straddle, Strangle",
                "Interest Rate Swaps (IRS) & Comparative Advantage Theory"
              ]
            },
            {
              id: "g1-sfm-portfolio",
              title: "Portfolio Management & Modern Portfolio Theory",
              subject: "Strategic Financial Management",
              group: "Group I",
              groupCode: "G1",
              studyTime: "20 Mins",
              coreConcepts: [
                "Markowitz Efficient Frontier & 2-Asset Portfolio Variance",
                "Capital Market Line (CML) vs Security Market Line (SML)",
                "Capital Asset Pricing Model (CAPM) & Security Under/Overvaluation",
                "Unlevering & Relevering Beta (Hamada Equation)",
                "Performance Evaluation: Sharpe, Treynor, Jensen's Alpha"
              ]
            },
            {
              id: "g1-sfm-valuation",
              title: "Business Valuation Methods & Corporate Restructuring",
              subject: "Strategic Financial Management",
              group: "Group I",
              groupCode: "G1",
              studyTime: "22 Mins",
              coreConcepts: [
                "Discounted Cash Flow (DCF): FCFF vs FCFE Models",
                "Terminal Value Calculations (Gordon Growth & Exit Multiple)",
                "Relative Valuation: P/E, P/B, EV/EBITDA, EV/Sales",
                "Economic Value Added (EVA) & Market Value Added (MVA)",
                "Mergers & Acquisitions: Swap Ratios, Synergy Valuation, EPS Dilution"
              ]
            }
          ]
        },
        {
          subject: "Advanced Auditing and Professional Ethics",
          subjectCode: "AAAPE",
          paperCode: "Paper 3",
          description: "Audit process, standards on auditing, and the Code of Ethics",
          topics: [
            {
              id: "g1-aud-process",
              title: "The Audit Process & Risk Assessment",
              subject: "Advanced Auditing and Professional Ethics",
              group: "Group I",
              groupCode: "G1",
              studyTime: "18 Mins",
              coreConcepts: [
                "Pre-Engagement Formalities & Engagement Letter (SA 210)",
                "Audit Planning, Strategy & Execution (SA 300)",
                "Risk Assessment Procedures & Internal Controls (SA 315)",
                "Materiality in Planning & Performance Materiality (SA 320)",
                "Responses to Assessed Risks & Substantive Testing (SA 330)"
              ]
            },
            {
              id: "g1-aud-standards",
              title: "Standards on Auditing (SA) Framework",
              subject: "Advanced Auditing and Professional Ethics",
              group: "Group I",
              groupCode: "G1",
              studyTime: "22 Mins",
              coreConcepts: [
                "Standard on Quality Control (SQC 1)",
                "Auditor's Responsibilities Relating to Fraud (SA 240 & Sec 143(12))",
                "Joint Audit (SA 299) & Using the Work of Internal Auditors (SA 610)",
                "Key Audit Matters (SA 701 KAM) Determination & Reporting",
                "Modified Audit Opinions: Qualified, Adverse, Disclaimer (SA 705)"
              ]
            },
            {
              id: "g1-aud-ethics",
              title: "Code of Ethics & Professional Misconduct",
              subject: "Advanced Auditing and Professional Ethics",
              group: "Group I",
              groupCode: "G1",
              studyTime: "25 Mins",
              coreConcepts: [
                "The Chartered Accountants Act, 1949 & 2020 Code of Ethics",
                "5 Fundamental Principles & 5 Threats to Independence (SAFIS)",
                "First Schedule Misconduct: Clauses 1-12 for CAs in Practice",
                "Second Schedule Misconduct: Gross Negligence & Confidentiality",
                "Council General Guidelines: UDIN, Website, Prohibited Services Sec 144"
              ]
            }
          ]
        }
      ]
    },
    {
      group: "Group II (CA Final)",
      groupCode: "G2",
      badge: "Group II • 2 Core Subjects",
      subjects: [
        {
          subject: "Corporate and Economic Laws",
          subjectCode: "CEL",
          paperCode: "Paper 4",
          description: "Companies Act 2013, SEBI and securities laws, FEMA, Competition Act, and IBC",
          topics: [
            {
              id: "g2-law-companies-act",
              title: "Companies Act, 2013: Management, Meetings & Compliance",
              subject: "Corporate and Economic Laws",
              group: "Group II",
              groupCode: "G2",
              studyTime: "25 Mins",
              coreConcepts: [
                "Appointment & Qualification of Directors (Sec 149-152)",
                "Board Meetings (Sec 173), Audit Committee (Sec 177), NRC (Sec 178)",
                "Loans to Directors (Sec 185) & Related Party Transactions (Sec 188)",
                "Oppression & Mismanagement (Sec 241-246) & Class Actions (Sec 245)",
                "Winding Up & Role of NCLT / NCLAT Jurisdiction (Sec 271-303, 408-434)"
              ]
            },
            {
              id: "g2-law-sebi",
              title: "SEBI Act, 1992 & Key SEBI Regulations",
              subject: "Corporate and Economic Laws",
              group: "Group II",
              groupCode: "G2",
              studyTime: "18 Mins",
              coreConcepts: [
                "SEBI Act: Powers, Functions, Investigation & Penalties",
                "Securities Appellate Tribunal (SAT) Jurisdiction & Appeals",
                "SEBI (LODR) Regulations, 2015: Corporate Governance Norms",
                "SEBI (PIT) Regulations, 2015: UPSI, Trading Window & Code of Conduct",
                "Prohibition of Fraudulent & Unfair Trade Practices (FUTP)"
              ]
            },
            {
              id: "g2-law-fema",
              title: "Foreign Exchange Management Act (FEMA), 1999",
              subject: "Corporate and Economic Laws",
              group: "Group II",
              groupCode: "G2",
              studyTime: "20 Mins",
              coreConcepts: [
                "Residential Status Criteria under Section 2(v)",
                "Current Account Transactions (Sec 5 & Schedules I, II, III)",
                "Capital Account Transactions (Sec 6 Permissible Classes)",
                "Foreign Direct Investment (FDI) Automatic vs Approval Routes",
                "External Commercial Borrowings (ECB) Framework & Realisation (Sec 8)"
              ]
            },
            {
              id: "g2-law-competition",
              title: "Competition Act, 2002",
              subject: "Corporate and Economic Laws",
              group: "Group II",
              groupCode: "G2",
              studyTime: "15 Mins",
              coreConcepts: [
                "Anti-Competitive Agreements (Sec 3: Horizontal Cartels vs Vertical)",
                "Abuse of Dominant Position (Sec 4: Predatory Pricing & Denial of Access)",
                "Regulation of Combinations (Sec 5 & 6 Asset/Turnover Thresholds)",
                "Filing Notice with Competition Commission of India (CCI)",
                "Powers, Inquiries & Penalties of CCI"
              ]
            },
            {
              id: "g2-law-ibc",
              title: "Insolvency and Bankruptcy Code (IBC), 2016",
              subject: "Corporate and Economic Laws",
              group: "Group II",
              groupCode: "G2",
              studyTime: "22 Mins",
              coreConcepts: [
                "Corporate Insolvency Resolution Process (CIRP): Default Threshold ₹1 Cr",
                "Filing by Financial Creditor (Sec 7) & Operational Creditor (Sec 8 & 9)",
                "Moratorium (Sec 14) & Role of IRP / Resolution Professional",
                "Committee of Creditors (CoC) Constitution & 66% Voting Threshold",
                "Resolution Plan Criteria (Sec 30(2)) & Priority Waterfall Mechanism (Sec 53)"
              ]
            }
          ]
        },
        {
          subject: "Strategic Cost Management and Performance Evaluation",
          subjectCode: "SCMPE",
          paperCode: "Paper 5",
          description: "ABC, target costing, decision-making tools, and performance measurement",
          topics: [
            {
              id: "g2-scm-abc",
              title: "Activity-Based Costing & Activity-Based Management",
              subject: "Strategic Cost Management and Performance Evaluation",
              group: "Group II",
              groupCode: "G2",
              studyTime: "18 Mins",
              coreConcepts: [
                "Cost Pools & Cost Drivers (Transaction, Duration, Intensity)",
                "Hierarchy of Activities: Unit, Batch, Product, Facility Level",
                "ABC vs Traditional Volume-Based Overhead Allocation",
                "Operational ABM vs Strategic ABM",
                "Customer Profitability Analysis & The Whale Curve"
              ]
            },
            {
              id: "g2-scm-target-costing",
              title: "Target Costing, Kaizen & Life-Cycle Costing",
              subject: "Strategic Cost Management and Performance Evaluation",
              group: "Group II",
              groupCode: "G2",
              studyTime: "18 Mins",
              coreConcepts: [
                "Target Costing Formula: Target Price - Target Margin = Target Cost",
                "Cost Gap Identification & Closing the Gap",
                "Value Engineering (VE) vs Value Analysis (VA)",
                "Kaizen Costing (Continuous Incremental Manufacturing Reductions)",
                "Life-Cycle Costing (LCC: R&D, Design, Manufacturing, Disposal)"
              ]
            },
            {
              id: "g2-scm-decision-tools",
              title: "Decision-Making Tools & Relevant Costing",
              subject: "Strategic Cost Management and Performance Evaluation",
              group: "Group II",
              groupCode: "G2",
              studyTime: "22 Mins",
              coreConcepts: [
                "Relevant Costing Principles: Opportunity, Incremental & Avoidable Costs",
                "Short-Term Decisions: Make or Buy, Special Order Acceptance",
                "Optimum Product Mix under Limiting Factors & Key Constraints",
                "Pricing Strategies: Market Skimming, Penetration, Peak-Load, Bundling",
                "Cost-Volume-Profit (CVP) Analysis, Break-Even Point & Margin of Safety"
              ]
            },
            {
              id: "g2-scm-performance",
              title: "Performance Measurement & Transfer Pricing",
              subject: "Strategic Cost Management and Performance Evaluation",
              group: "Group II",
              groupCode: "G2",
              studyTime: "22 Mins",
              coreConcepts: [
                "Financial Measures: ROI vs Residual Income (RI) vs EVA",
                "Balanced Scorecard (Kaplan & Norton 4 Perspectives & Strategy Maps)",
                "Fitzgerald & Moon Building Block Model (Dimensions, Standards, Rewards)",
                "Transfer Pricing Methods: Market, Cost-Plus, Two-Part Tariff, Dual Pricing",
                "Divisional Goal Congruence & International Transfer Pricing"
              ]
            }
          ]
        }
      ]
    }
  ]
};

const dir = path.join(__dirname, '..', 'data', 'notes');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'textbook_notes_catalog.json'), JSON.stringify(notesCatalog, null, 2), 'utf8');
console.log('✅ Generated data/notes/textbook_notes_catalog.json successfully with 21 structured topics across Group I & Group II!');

