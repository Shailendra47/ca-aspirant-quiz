const fs = require('fs');
const path = require('path');

// Master topics data with in-depth academic content
const TOPIC_NOTES_DATA = [
  // ==================== GROUP I: FINANCIAL REPORTING ====================
  {
    id: "g1-fr-framework",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Financial Reporting (FR)",
    paperCode: "Paper 1",
    topic: "Ind AS and AS Framework",
    studyTime: "15 Mins",
    marksWeight: "8–12 Marks",
    syllabusRef: "Conceptual Framework for Financial Reporting under Ind AS, Ind AS 1 & Ind AS 8",
    sections: [
      {
        heading: "1. Conceptual Framework & Ind AS Roadmap",
        content: `
          <p class="leading-relaxed mb-3">The <strong>Conceptual Framework for Financial Reporting under Ind AS</strong> (aligned with IFRS Conceptual Framework) sets out the fundamental concepts for preparation and presentation of financial statements. It assists the ICAI in developing standards, preparers in formulating consistent accounting policies when no specific Ind AS applies, and all parties in understanding and interpreting Ind AS.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200">
              <h5 class="font-bold text-xs text-icai-navy mb-1 uppercase tracking-wider font-sans">Qualitative Characteristics of Useful Information</h5>
              <ul class="list-disc pl-4 space-y-1 text-xs text-stone-700">
                <li><strong>Fundamental:</strong> Relevance (predictive & confirmatory value) and Faithful Representation (complete, neutral, free from error).</li>
                <li><strong>Enhancing:</strong> Comparability, Verifiability, Timeliness, and Understandability.</li>
              </ul>
            </div>
            <div class="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200">
              <h5 class="font-bold text-xs text-icai-navy mb-1 uppercase tracking-wider font-sans">Measurement Bases</h5>
              <ul class="list-disc pl-4 space-y-1 text-xs text-stone-700">
                <li><strong>Historical Cost:</strong> Reflects transaction consideration at acquisition date minus depreciation/impairment.</li>
                <li><strong>Current Value:</strong> Fair Value (Ind AS 113), Value in Use (Ind AS 36), Current Cost, and Fulfilment Value for liabilities.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        heading: "2. Ind AS 1: Presentation of Financial Statements",
        content: `
          <p class="leading-relaxed mb-3">Ind AS 1 prescribes the basis for presentation of general-purpose financial statements to ensure comparability with both the entity's prior periods and other entities. Key requirements include:</p>
          <ul class="list-disc pl-5 space-y-2 text-xs text-stone-700 mb-3">
            <li><strong>Complete Set of Financial Statements:</strong> Balance Sheet, Statement of Profit and Loss (including Other Comprehensive Income - OCI), Statement of Changes in Equity (SOCIE), Statement of Cash Flows (Ind AS 7), and Notes comprising accounting policies.</li>
            <li><strong>Fair Presentation & Compliance:</strong> Explicit and unreserved statement of compliance with Ind AS. Departure from Ind AS is permitted only in extremely rare circumstances where compliance would conflict with the objective.</li>
            <li><strong>Going Concern & Accrual Basis:</strong> Management must assess the entity's ability to continue as a going concern for at least 12 months from the reporting date. Financial statements must be prepared on accrual basis (except cash flows).</li>
            <li><strong>Materiality and Aggregation:</strong> Each material class of similar items must be presented separately. Offsetting of assets and liabilities or income and expenses is prohibited unless required/permitted by an Ind AS.</li>
          </ul>
        `
      },
      {
        heading: "3. Ind AS 8: Accounting Policies, Estimates & Errors",
        content: `
          <div class="overflow-x-auto my-3">
            <table class="w-full text-xs text-left border border-stone-300 rounded-lg overflow-hidden font-serif">
              <thead class="bg-icai-navy text-amber-200 font-sans">
                <tr>
                  <th class="p-2.5 border-b border-stone-300">Aspect</th>
                  <th class="p-2.5 border-b border-stone-300">Nature of Change</th>
                  <th class="p-2.5 border-b border-stone-300">Accounting Treatment</th>
                  <th class="p-2.5 border-b border-stone-300">Prior Period Restatement</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-200 bg-white">
                <tr>
                  <td class="p-2 font-bold text-icai-navy">Change in Policy</td>
                  <td class="p-2">Required by standard or results in more reliable/relevant presentation</td>
                  <td class="p-2"><strong>Retrospective Application</strong> (adjust opening retained earnings of earliest prior period presented)</td>
                  <td class="p-2 text-emerald-800 font-bold">Mandatory (unless impracticable)</td>
                </tr>
                <tr class="bg-stone-50">
                  <td class="p-2 font-bold text-icai-navy">Change in Estimate</td>
                  <td class="p-2">Revision of useful life, residual value, warranty obligations, bad debt rates</td>
                  <td class="p-2"><strong>Prospective Application</strong> (recognise in current and future periods of change)</td>
                  <td class="p-2 text-rose-800 font-bold">Prohibited</td>
                </tr>
                <tr>
                  <td class="p-2 font-bold text-icai-navy">Prior Period Error</td>
                  <td class="p-2">Mathematical mistakes, misapplication of policies, fraud, oversight</td>
                  <td class="p-2"><strong>Retrospective Restatement</strong> in comparative financial statements</td>
                  <td class="p-2 text-emerald-800 font-bold">Mandatory</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    examinerTips: "ICAI frequently tests whether a change in depreciation method is an estimate or policy change. Under Ind AS 16 and Ind AS 8, changing the depreciation method (e.g. WDV to SLM) is strictly accounted for prospectively as a CHANGE IN ACCOUNTING ESTIMATE, never retrospectively.",
    mnemonics: "Mnemonic for OCI Reclassifiable vs Non-reclassifiable items: FVTOCI Debt & Cash Flow Hedge = Reclassifiable; FVTOCI Equity & Revaluation Surplus = Non-Reclassifiable to P&L."
  },
  {
    id: "g1-fr-consolidation",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Financial Reporting (FR)",
    paperCode: "Paper 1",
    topic: "Consolidation (Ind AS 110)",
    studyTime: "20 Mins",
    marksWeight: "16–20 Marks",
    syllabusRef: "Ind AS 110 Consolidated Financial Statements, Ind AS 28 & Ind AS 111",
    sections: [
      {
        heading: "1. The Single Control Model under Ind AS 110",
        content: `
          <p class="leading-relaxed mb-3">An investor controls an investee if and only if the investor possesses <strong>all three of the following cumulative elements</strong>:</p>
          <div class="space-y-2 text-xs">
            <div class="p-3 bg-white rounded-lg border-l-4 border-icai-navy shadow-2xs">
              <span class="font-bold text-icai-navy">1. Power over the Investee:</span> Existing rights that give the current ability to direct relevant activities (activities that significantly affect investee's returns, e.g. operating and financing policies).
            </div>
            <div class="p-3 bg-white rounded-lg border-l-4 border-emerald-600 shadow-2xs">
              <span class="font-bold text-emerald-900">2. Exposure to Variable Returns:</span> Rights to variable returns from its involvement with the investee (dividends, interest, economies of scale, tax benefits).
            </div>
            <div class="p-3 bg-white rounded-lg border-l-4 border-amber-600 shadow-2xs">
              <span class="font-bold text-amber-900">3. Link between Power and Returns:</span> The ability to use its power over the investee to affect the amount of the investor's returns (Principal vs Agent analysis).
            </div>
          </div>
        `
      },
      {
        heading: "2. Consolidation Workings & Non-Controlling Interest (NCI)",
        content: `
          <p class="leading-relaxed mb-3">At acquisition date, the parent company consolidates 100% of the subsidiary's identifiable assets and liabilities at fair value. Non-Controlling Interest (NCI) is measured at either:</p>
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-stone-700 mb-3">
            <li><strong>Method 1 (Proportionate Share Method):</strong> NCI = Proportionate share of the acquiree's identifiable net assets at fair value. (Results in Partial Goodwill).</li>
            <li><strong>Method 2 (Fair Value Method / Full Goodwill):</strong> NCI = Fair value of non-controlling shares on acquisition date (market price or valuation technique). (Results in Full Goodwill attributable to both Parent and NCI).</li>
          </ul>
          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-mono text-stone-800">
            <strong>Basic Consolidation Equation:</strong><br/>
            Goodwill / Capital Reserve = Purchase Consideration + Fair Value of NCI + FV of Previously Held Interest - Fair Value of Net Identifiable Assets Acquired
          </div>
        `
      },
      {
        heading: "3. Intra-Group Adjustments & Foreign Currency Translation (Ind AS 21)",
        content: `
          <p class="leading-relaxed mb-3">Mandatory consolidation adjustments during line-by-line consolidation:</p>
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-stone-700">
            <li><strong>Unrealized Profits on Inventories:</strong> Eliminate full unrealized profit against Consolidated Retained Earnings (if Downstream sale by Parent) or allocate between Retained Earnings and NCI in profit-sharing ratio (if Upstream sale by Subsidiary).</li>
            <li><strong>Intra-Group Loans & Dividends:</strong> Eliminate intra-group balances (debtors/creditors, loans, interest) in full. Eliminate subsidiary dividends from Parent P&L.</li>
            <li><strong>Foreign Subsidiary Translation:</strong> Assets & liabilities translated at closing rate; Income & expenses at average rate; Resulting exchange differences recognized in OCI (Foreign Currency Translation Reserve - FCTR).</li>
          </ul>
        `
      }
    ],
    examinerTips: "In step-acquisitions (achieving control in stages), the previously held equity interest MUST be remeasured to fair value at acquisition date, with any resulting gain or loss recognized in Profit or Loss (Ind AS 103/110). Do not carry forward the historical cost!",
    mnemonics: "Control Trio Mnemonic: P-R-L (Power, Returns, Link). If any one is missing, consolidation is prohibited."
  },
  {
    id: "g1-fr-business-combinations",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Financial Reporting (FR)",
    paperCode: "Paper 1",
    topic: "Business Combinations (Ind AS 103)",
    studyTime: "20 Mins",
    marksWeight: "14–16 Marks",
    syllabusRef: "Ind AS 103 Business Combinations & Appendix C (Common Control)",
    sections: [
      {
        heading: "1. The Acquisition Method Framework",
        content: `
          <p class="leading-relaxed mb-3">All business combinations (other than common control combinations) must be accounted for using the <strong>Acquisition Method</strong>, requiring four mandatory steps:</p>
          <ol class="list-decimal pl-5 space-y-2 text-xs text-stone-700">
            <li><strong>Identifying the Acquirer:</strong> The entity that obtains control over the acquiree. In reverse acquisitions, the legal acquiree becomes the accounting acquirer.</li>
            <li><strong>Determining the Acquisition Date:</strong> The date on which the acquirer legally obtains control over the acquiree.</li>
            <li><strong>Recognising and Measuring Identifiable Assets & Liabilities:</strong> Recognise at fair value on acquisition date. Unrecorded intangibles (brands, customer lists, patents) meeting separability or contractual criteria must be recognized at fair value.</li>
            <li><strong>Recognising Goodwill or Gain on Bargain Purchase:</strong> Comparison of consideration transferred plus NCI against net identifiable assets.</li>
          </ol>
        `
      },
      {
        heading: "2. Consideration Transferred & Contingent Consideration",
        content: `
          <p class="leading-relaxed mb-3">Consideration transferred is measured at <strong>fair value on acquisition date</strong>, comprising cash, assets transferred, liabilities incurred, and equity instruments issued by the acquirer.</p>
          <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
            <div><strong>Acquisition-Related Costs:</strong> Advisory, legal, accounting, valuation and finder fees are expensed in Profit or Loss in the period incurred, NOT capitalized into Goodwill. Debt/equity issue costs are adjusted against liability or equity under Ind AS 109 / Ind AS 32.</div>
            <div><strong>Contingent Consideration:</strong> Fair valued at acquisition date. If classified as Equity, it is NOT remeasured subsequently. If classified as a Liability, subsequent changes in fair value are recognized in Profit or Loss.</div>
          </div>
        `
      },
      {
        heading: "3. Common Control Transactions (Appendix C)",
        content: `
          <p class="leading-relaxed mb-3">Business combinations involving entities under common control (e.g. group reorganizations, merger of parent's subsidiaries) are accounted for using the <strong>Pooling of Interest Method</strong>:</p>
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-stone-700">
            <li>Assets and liabilities of combining entities are reflected at their existing carrying amounts (book values), NOT fair value.</li>
            <li>No new goodwill is recognized. The difference between consideration transferred and net assets acquired is adjusted directly in <strong>Capital Reserve</strong> in Equity.</li>
            <li>Financial statements of prior periods are restated as if the combination had occurred from the beginning of the preceding period.</li>
          </ul>
        `
      }
    ],
    examinerTips: "Deferred tax on fair value adjustments on acquisition date MUST be calculated (Ind AS 12). If an asset's fair value exceeds tax base, a Deferred Tax Liability (DTL) is created, which increases Goodwill. If a liability exceeds tax base, a Deferred Tax Asset (DTA) reduces Goodwill.",
    mnemonics: "Mnemonic: 4 Steps of Ind AS 103 = I-D-R-G (Identify acquirer, Date determination, Recognition at Fair Value, Goodwill/Bargain purchase)."
  },
  {
    id: "g1-fr-financial-instruments",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Financial Reporting (FR)",
    paperCode: "Paper 1",
    topic: "Financial Instruments (Ind AS 32 & 109)",
    studyTime: "25 Mins",
    marksWeight: "16–20 Marks",
    syllabusRef: "Ind AS 32 (Presentation), Ind AS 109 (Recognition & Measurement), Ind AS 107",
    sections: [
      {
        heading: "1. Classification of Financial Assets under Ind AS 109",
        content: `
          <p class="leading-relaxed mb-3">Financial assets are classified based on two objective tests: (1) <strong>The Business Model Test</strong> and (2) <strong>The SPPI Test</strong> (Solely Payments of Principal and Interest on specified dates):</p>
          <div class="overflow-x-auto my-3">
            <table class="w-full text-xs text-left border border-stone-300 rounded-lg overflow-hidden font-serif">
              <thead class="bg-icai-navy text-amber-200 font-sans">
                <tr>
                  <th class="p-2 border-b">Classification</th>
                  <th class="p-2 border-b">Business Model Objective</th>
                  <th class="p-2 border-b">SPPI Test</th>
                  <th class="p-2 border-b">Subsequent Measurement & Gain/Loss</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-200 bg-white">
                <tr>
                  <td class="p-2 font-bold text-icai-navy">Amortised Cost</td>
                  <td class="p-2">Hold contractual assets to collect cash flows</td>
                  <td class="p-2 text-emerald-800 font-bold">Passes SPPI</td>
                  <td class="p-2">Effective Interest Rate (EIR) method; Impairment to P&L</td>
                </tr>
                <tr class="bg-stone-50">
                  <td class="p-2 font-bold text-icai-navy">FVTOCI (Debt)</td>
                  <td class="p-2">Both collecting contractual cash flows AND selling assets</td>
                  <td class="p-2 text-emerald-800 font-bold">Passes SPPI</td>
                  <td class="p-2">Fair value changes to OCI; Interest & Impairment to P&L; Recycles to P&L on derecognition</td>
                </tr>
                <tr>
                  <td class="p-2 font-bold text-icai-navy">FVTOCI (Equity)</td>
                  <td class="p-2">Irrevocable election at initial recognition (not held for trading)</td>
                  <td class="p-2 text-stone-500">N/A (Equity)</td>
                  <td class="p-2">Fair value changes to OCI; NEVER recycles to P&L; Dividends to P&L</td>
                </tr>
                <tr class="bg-stone-50">
                  <td class="p-2 font-bold text-icai-navy">FVTPL</td>
                  <td class="p-2">Held for trading or fails both above models</td>
                  <td class="p-2 text-rose-800 font-bold">Fails SPPI</td>
                  <td class="p-2">All fair value changes recognized in Profit or Loss directly</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "2. Compound Financial Instruments (Ind AS 32 Split Accounting)",
        content: `
          <p class="leading-relaxed mb-3">Instruments with both liability and equity components (e.g. optionally convertible debentures) must be separated at inception:</p>
          <ol class="list-decimal pl-5 space-y-1.5 text-xs text-stone-700">
            <li><strong>Step 1:</strong> Calculate Fair Value of Liability Component by discounting all contractual cash flows (interest and principal) at market discount rate for equivalent non-convertible debt.</li>
            <li><strong>Step 2:</strong> Equity Component = Total Issue Proceeds minus Fair Value of Liability Component.</li>
            <li><strong>Step 3:</strong> The equity component is never remeasured subsequently. The liability component is accreted to face value over tenure using Effective Interest Rate (EIR) charged to P&L.</li>
          </ol>
        `
      },
      {
        heading: "3. Expected Credit Loss (ECL) 3-Stage Impairment Model",
        content: `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 text-xs">
            <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-300">
              <span class="font-bold text-emerald-900 block font-sans">Stage 1: Performing</span>
              <p class="text-stone-700 mt-1">No significant increase in credit risk since initial recognition. Impairment loss allowance = <strong>12-Month ECL</strong>. Interest revenue computed on Gross Carrying Amount.</p>
            </div>
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-300">
              <span class="font-bold text-amber-900 block font-sans">Stage 2: Under-Performing</span>
              <p class="text-stone-700 mt-1">Significant increase in credit risk (SICR) since initial recognition, but no objective credit impairment. Impairment allowance = <strong>Lifetime ECL</strong>. Interest on Gross Carrying Amount.</p>
            </div>
            <div class="p-3 bg-rose-50 rounded-xl border border-rose-300">
              <span class="font-bold text-rose-900 block font-sans">Stage 3: Credit-Impaired</span>
              <p class="text-stone-700 mt-1">Objective evidence of impairment (default). Impairment allowance = <strong>Lifetime ECL</strong>. Interest revenue computed on Net Carrying Amount (Gross minus allowance).</p>
            </div>
          </div>
        `
      }
    ],
    examinerTips: "Under Ind AS 109, transaction costs directly attributable to acquisition of FVTPL instruments must be charged immediately to P&L. For Amortised Cost and FVTOCI instruments, transaction costs are capitalized into initial carrying value.",
    mnemonics: "ECL Stages Mnemonic: 1-L-L (12M ECL for Stage 1, Lifetime ECL for Stages 2 & 3). Interest changes from Gross to Net only at Stage 3."
  },

  // ==================== GROUP I: STRATEGIC FINANCIAL MANAGEMENT ====================
  {
    id: "g1-sfm-capital-budgeting",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Strategic Financial Management (SFM)",
    paperCode: "Paper 2",
    topic: "Capital Budgeting Under Risk & Uncertainty",
    studyTime: "18 Mins",
    marksWeight: "10–14 Marks",
    syllabusRef: "Investment Decisions, RADR, Certainty Equivalent, APV & Real Options",
    sections: [
      {
        heading: "1. Risk-Adjustment Techniques in Project Appraisal",
        content: `
          <p class="leading-relaxed mb-3">When cash flows are subject to volatility, conventional NPV at risk-free rate is insufficient. Two primary analytical methods resolve project uncertainty:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
            <div class="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <h5 class="font-bold text-icai-navy uppercase tracking-wider font-sans mb-1">Risk-Adjusted Discount Rate (RADR)</h5>
              <p class="text-stone-700 font-serif leading-relaxed">Adjusts the denominator. Formula: <span class="font-mono font-bold">RADR = R_f + Risk Premium</span>. Higher risk projects use higher discount rates. Cash flows are discounted at this inflated hurdle rate.</p>
              <span class="mt-2 text-[10px] text-stone-500 block italic">Limitation: Assumes risk compounds exponentially over time.</span>
            </div>
            <div class="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <h5 class="font-bold text-icai-navy uppercase tracking-wider font-sans mb-1">Certainty Equivalent (CE) Approach</h5>
              <p class="text-stone-700 font-serif leading-relaxed">Adjusts the numerator. Formula: <span class="font-mono font-bold">CE_t = \\alpha_t \\times Expected Cash Flow_t</span>, where <span class="font-mono">\\alpha_t \\le 1</span>. Certain cash flows are then discounted at the <strong>Risk-Free Rate (R_f)</strong>.</p>
              <span class="mt-2 text-[10px] text-emerald-700 block font-bold">Conceptually superior because it separates time value from risk.</span>
            </div>
          </div>
        `
      },
      {
        heading: "2. Adjusted Present Value (APV) Model",
        content: `
          <p class="leading-relaxed mb-3">Proposed by Stewart Myers, APV separates operational value from financing side effects:</p>
          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 font-mono text-xs text-stone-900 leading-relaxed">
            <strong>APV Formula:</strong><br/>
            APV = Base-Case NPV (All-Equity Financed at $K_e$ un-levered) + Present Value of Financing Side Effects<br/>
            PV of Financing Effects = PV of Tax Shield on Debt ($T_c \\times D$) - PV of Issue Costs - PV of Financial Distress Costs
          </div>
        `
      },
      {
        heading: "3. Real Options in Investment Evaluation",
        content: `
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-stone-700">
            <li><strong>Option to Delay / Wait (Call Option):</strong> Opportunity to postpone investment until market conditions clarify. Exercise price = Capital Outlay; Underlying asset = PV of operating cash flows.</li>
            <li><strong>Option to Expand (Call Option):</strong> Ability to build extra capacity if early demand proves robust.</li>
            <li><strong>Option to Abandon (Put Option):</strong> Ability to exit the project and recover salvage value if operations underperform.</li>
          </ul>
        `
      }
    ],
    examinerTips: "In Certainty Equivalent problems, students often mistakenly discount the certain cash flows at RADR. NEVER do that! Certain cash flows contain zero risk, so they must ALWAYS be discounted strictly at the Risk-Free Rate ($R_f$).",
    mnemonics: "Mnemonic: APV = Base NPV + Debt Tax Shield - Floatation Costs."
  },
  {
    id: "g1-sfm-cost-of-capital",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Strategic Financial Management (SFM)",
    paperCode: "Paper 2",
    topic: "Cost of Capital & Capital Structure",
    studyTime: "15 Mins",
    marksWeight: "10–12 Marks",
    syllabusRef: "WACC, Cost of Equity, Capital Structure Theories & MM Arbitrage",
    sections: [
      {
        heading: "1. Weighted Average Cost of Capital (WACC)",
        content: `
          <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono mb-3">
            <strong>Formula:</strong> WACC ($K_o$) = $W_e \\times K_e + W_p \\times K_p + W_d \\times K_d(1 - t)$<br/>
            Where $K_e = R_f + \\beta_e [E(R_m) - R_f]$ (under CAPM) OR $K_e = \\frac{D_1}{P_0} + g$ (under Gordon Model)
          </div>
          <p class="text-xs text-stone-700 leading-relaxed"><strong>Book Value vs Market Value Weights:</strong> Market value weights are theoretically superior because they reflect current economic costs demanded by the market. However, if market prices fluctuate erratically, target capital structure weights are preferred.</p>
        `
      },
      {
        heading: "2. Capital Structure Theories Overview",
        content: `
          <div class="overflow-x-auto my-3">
            <table class="w-full text-xs text-left border border-stone-300 rounded-lg overflow-hidden font-serif">
              <thead class="bg-icai-navy text-amber-200 font-sans">
                <tr>
                  <th class="p-2 border-b">Theory</th>
                  <th class="p-2 border-b">Proponent</th>
                  <th class="p-2 border-b">Key Proposition</th>
                  <th class="p-2 border-b">Effect of Leverage on Value & WACC</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-200 bg-white">
                <tr>
                  <td class="p-2 font-bold text-icai-navy">Net Income (NI)</td>
                  <td class="p-2">David Durand</td>
                  <td class="p-2">Debt is cheaper than equity; $K_e$ and $K_d$ remain constant</td>
                  <td class="p-2 text-emerald-800 font-bold">Higher leverage increases Total Value ($V$) and lowers overall WACC ($K_o$)</td>
                </tr>
                <tr class="bg-stone-50">
                  <td class="p-2 font-bold text-icai-navy">Net Operating Income (NOI)</td>
                  <td class="p-2">David Durand</td>
                  <td class="p-2">Overall cost of capital $K_o$ remains constant; $K_e$ increases linearly with leverage</td>
                  <td class="p-2 text-stone-600 font-bold">Capital structure is completely irrelevant. Value remains unchanged</td>
                </tr>
                <tr>
                  <td class="p-2 font-bold text-icai-navy">Modigliani-Miller (No Tax)</td>
                  <td class="p-2">Franco Modigliani & Merton Miller</td>
                  <td class="p-2">Arbitrage process ensures $V_L = V_U$; Home-made leverage replicates firm leverage</td>
                  <td class="p-2 text-stone-600 font-bold">Capital structure irrelevant in perfect capital markets</td>
                </tr>
                <tr class="bg-stone-50">
                  <td class="p-2 font-bold text-icai-navy">MM (With Corporate Tax)</td>
                  <td class="p-2">MM (1963)</td>
                  <td class="p-2">Interest expense is tax deductible, creating a perpetual tax shield</td>
                  <td class="p-2 text-emerald-800 font-bold">$V_L = V_U + (D \\times T_c)$. 100% debt financing maximizes value</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "3. Modigliani-Miller Arbitrage Mechanism",
        content: `
          <p class="leading-relaxed text-xs text-stone-700">If two identical firms differ only in leverage and the levered firm ($L$) is overvalued compared to unlevered firm ($U$): An investor sells shares in overvalued firm $L$, borrows money on personal account (home-made leverage equal to firm $L$'s debt ratio), and invests the proceeds in unlevered firm $U$. The investor earns the EXACT same rupee return with surplus cash left over, driving prices to parity.</p>
        `
      }
    ],
    examinerTips: "In MM arbitrage proofs, always show the 3 steps: (1) Current position and income from Firm L; (2) Disinvestment and home-made borrowing; (3) Reinvestment in Firm U and calculation of surplus funds.",
    mnemonics: "MM with Tax Rule: $V_L = V_U + D \\times T_c$ (Value of levered firm equals unlevered value plus debt tax shield)."
  },
  {
    id: "g1-sfm-derivatives",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Strategic Financial Management (SFM)",
    paperCode: "Paper 2",
    topic: "Derivatives: Futures, Options & Swaps",
    studyTime: "25 Mins",
    marksWeight: "16–22 Marks",
    syllabusRef: "Futures, Hedging Beta, BSM Option Model, Greeks & Interest Rate Swaps",
    sections: [
      {
        heading: "1. Futures Pricing & Portfolio Beta Hedging",
        content: `
          <div class="space-y-2 text-xs font-mono">
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <strong>Cost of Carry Futures Price:</strong> $F = S_0 \\times e^{(r - q) \\times T}$ OR $F = S_0 \\times (1 + r - q)^T$<br/>
              Where $S_0$ = Spot Price, $r$ = Risk-free rate, $q$ = Dividend yield, $T$ = Time to maturity.
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <strong>Hedging / Modifying Portfolio Beta:</strong><br/>
              Number of Futures Contracts ($N$) = $\\frac{(\\beta_{Target} - \\beta_{Current}) \\times \\text{Portfolio Value}}{\\text{Futures Contract Multiplier} \\times \\text{Index Futures Price}}$<br/>
              <em>To hedge completely ($\beta_{Target} = 0$), $N = - \\beta_{Current} \\times \\frac{V_P}{F_P}$.</em>
            </div>
          </div>
        `
      },
      {
        heading: "2. Black-Scholes-Merton (BSM) Options Model & Greeks",
        content: `
          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-mono mb-3">
            <strong>European Call Price:</strong> $C = S_0 \\times N(d_1) - X \\times e^{-rT} \\times N(d_2)$<br/>
            <strong>European Put Price:</strong> $P = X \\times e^{-rT} \\times N(-d_2) - S_0 \\times N(-d_1)$<br/>
            Where: $d_1 = \\frac{\\ln(S_0 / X) + (r + \\sigma^2/2)T}{\\sigma \\sqrt{T}}$ and $d_2 = d_1 - \\sigma \\sqrt{T}$
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-sans">
            <div class="p-2 bg-white rounded-lg border border-stone-200 text-center"><span class="font-bold text-icai-navy block">Delta (Δ)</span>$\\frac{\\partial C}{\\partial S} = N(d_1)$</div>
            <div class="p-2 bg-white rounded-lg border border-stone-200 text-center"><span class="font-bold text-icai-navy block">Gamma (Γ)</span>Rate of change of Delta</div>
            <div class="p-2 bg-white rounded-lg border border-stone-200 text-center"><span class="font-bold text-icai-navy block">Theta (Θ)</span>Time decay of option</div>
            <div class="p-2 bg-white rounded-lg border border-stone-200 text-center"><span class="font-bold text-icai-navy block">Vega (ν)</span>Sensitivity to Volatility $\\sigma$</div>
            <div class="p-2 bg-white rounded-lg border border-stone-200 text-center"><span class="font-bold text-icai-navy block">Rho (ρ)</span>Sensitivity to Risk-free rate $r$</div>
          </div>
        `
      },
      {
        heading: "3. Interest Rate Swaps (Plain Vanilla & Comparative Advantage)",
        content: `
          <p class="leading-relaxed text-xs text-stone-700">In an Interest Rate Swap (IRS), two parties exchange fixed and floating rate interest cash flows on a notional principal without exchanging principal. Under Comparative Advantage Theory, Total Gain to be shared = Difference in Fixed Spreads minus Difference in Floating Spreads.</p>
        `
      }
    ],
    examinerTips: "Remember Put-Call Parity equation: $C + X e^{-rT} = P + S_0$. If market prices deviate from Put-Call Parity, an immediate arbitrage opportunity exists (Synthetic Long Call vs Actual Call).",
    mnemonics: "Delta Range Mnemonic: Call Delta is between 0 and +1; Put Delta is between -1 and 0."
  },
  {
    id: "g1-sfm-portfolio",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Strategic Financial Management (SFM)",
    paperCode: "Paper 2",
    topic: "Portfolio Management & Modern Portfolio Theory",
    studyTime: "20 Mins",
    marksWeight: "14–18 Marks",
    syllabusRef: "Markowitz Model, Efficient Frontier, CAPM, SML & Risk Metrics",
    sections: [
      {
        heading: "1. Two-Asset Portfolio Return & Risk (Markowitz)",
        content: `
          <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono space-y-1 mb-3">
            <div><strong>Expected Portfolio Return:</strong> $E(R_p) = w_1 R_1 + w_2 R_2$</div>
            <div><strong>Portfolio Variance:</strong> $\\sigma_p^2 = w_1^2 \\sigma_1^2 + w_2^2 \\sigma_2^2 + 2 w_1 w_2 \\text{Cov}(1, 2) = w_1^2 \\sigma_1^2 + w_2^2 \\sigma_2^2 + 2 w_1 w_2 \\rho_{1,2} \\sigma_1 \\sigma_2$</div>
            <div><strong>Minimum Variance Portfolio Weight ($w_1^*$):</strong> $w_1^* = \\frac{\\sigma_2^2 - \\text{Cov}(1, 2)}{\\sigma_1^2 + \\sigma_2^2 - 2 \\text{Cov}(1, 2)}$</div>
          </div>
          <p class="text-xs text-stone-700 leading-relaxed">Diversification achieves maximum benefit when correlation coefficient $\\rho = -1$ (risk can be eliminated completely). If $\\rho = +1$, risk cannot be reduced below the weighted average of individual standard deviations.</p>
        `
      },
      {
        heading: "2. CML vs SML & Capital Asset Pricing Model (CAPM)",
        content: `
          <div class="overflow-x-auto my-3">
            <table class="w-full text-xs text-left border border-stone-300 rounded-lg overflow-hidden font-serif">
              <thead class="bg-icai-navy text-amber-200 font-sans">
                <tr>
                  <th class="p-2 border-b">Feature</th>
                  <th class="p-2 border-b">Capital Market Line (CML)</th>
                  <th class="p-2 border-b">Security Market Line (SML)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-200 bg-white">
                <tr>
                  <td class="p-2 font-bold text-icai-navy">Measure of Risk</td>
                  <td class="p-2"><strong>Total Risk (Standard Deviation $\\sigma$)</strong></td>
                  <td class="p-2 font-bold text-emerald-800"><strong>Systematic Risk (Beta $\\beta$)</strong></td>
                </tr>
                <tr class="bg-stone-50">
                  <td class="p-2 font-bold text-icai-navy">Applicability</td>
                  <td class="p-2">Only Efficient Portfolios</td>
                  <td class="p-2">All Securities and Any Portfolios (efficient or inefficient)</td>
                </tr>
                <tr>
                  <td class="p-2 font-bold text-icai-navy">Governing Formula</td>
                  <td class="p-2 font-mono">$E(R_p) = R_f + \\frac{E(R_m) - R_f}{\\sigma_m} \\times \\sigma_p$</td>
                  <td class="p-2 font-mono font-bold text-icai-navy">$E(R_i) = R_f + \\beta_i [E(R_m) - R_f]$</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "3. Portfolio Performance Evaluation Ratios",
        content: `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs font-mono">
            <div class="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs">
              <strong class="text-icai-navy block font-sans">Sharpe Ratio</strong>
              $S = \\frac{R_p - R_f}{\\sigma_p}$<br/>
              <span class="text-[10px] text-stone-500 font-serif">Excess return per unit of Total Risk. Best for non-diversified portfolios.</span>
            </div>
            <div class="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs">
              <strong class="text-icai-navy block font-sans">Treynor Ratio</strong>
              $T = \\frac{R_p - R_f}{\\beta_p}$<br/>
              <span class="text-[10px] text-stone-500 font-serif">Excess return per unit of Systematic Risk. Best for well-diversified portfolios.</span>
            </div>
            <div class="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs">
              <strong class="text-icai-navy block font-sans">Jensen's Alpha ($\alpha$)</strong>
              $\\alpha = R_p - [R_f + \\beta_p (R_m - R_f)]$<br/>
              <span class="text-[10px] text-stone-500 font-serif">Abnormal return generated beyond CAPM benchmark. Higher positive $\\alpha$ = Outperformance.</span>
            </div>
          </div>
        `
      }
    ],
    examinerTips: "If a security's expected return lies ABOVE the SML, it is UNDERVALUED (buy recommendation, positive alpha). If it lies BELOW the SML, it is OVERVALUED (sell recommendation, negative alpha).",
    mnemonics: "Hamada Equation: $\\beta_L = \\beta_U [1 + (1 - T)(D / E)]$. Unlever first to isolate business risk, then relever for target debt ratio."
  },
  {
    id: "g1-sfm-valuation",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Strategic Financial Management (SFM)",
    paperCode: "Paper 2",
    topic: "Business Valuation Methods & M&A Restructuring",
    studyTime: "22 Mins",
    marksWeight: "16–20 Marks",
    syllabusRef: "FCFF, FCFE, Relative Valuation, EVA & M&A Share Exchange Ratios",
    sections: [
      {
        heading: "1. Discounted Cash Flow (DCF): FCFF vs FCFE",
        content: `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
            <div class="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <h5 class="font-bold text-icai-navy uppercase tracking-wider font-sans mb-1">Free Cash Flow to Firm (FCFF)</h5>
              <div class="font-mono text-[11px] leading-relaxed text-stone-800 space-y-0.5">
                EBIT × (1 - Tax Rate)<br/>
                + Non-Cash Charges (Depreciation & Amortization)<br/>
                - Capital Expenditures (Capex)<br/>
                - Change in Non-Cash Working Capital (ΔNWC)<br/>
                = <strong>FCFF</strong><br/>
                <em>Discount at: WACC ($K_o$) → Gives Enterprise Value (EV). EV - Debt = Equity Value.</em>
              </div>
            </div>
            <div class="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <h5 class="font-bold text-icai-navy uppercase tracking-wider font-sans mb-1">Free Cash Flow to Equity (FCFE)</h5>
              <div class="font-mono text-[11px] leading-relaxed text-stone-800 space-y-0.5">
                Net Profit After Tax (PAT)<br/>
                + Depreciation & Non-Cash Charges<br/>
                - Capital Expenditures (Capex)<br/>
                - Change in Working Capital (ΔNWC)<br/>
                + Net Borrowings (New Debt Issued - Debt Repaid)<br/>
                = <strong>FCFE</strong><br/>
                <em>Discount at: Cost of Equity ($K_e$) → Gives Equity Value directly.</em>
              </div>
            </div>
          </div>
        `
      },
      {
        heading: "2. Economic Value Added (EVA) Formulation",
        content: `
          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-mono space-y-1 mb-3">
            <div><strong>EVA Formula:</strong> $\\text{EVA} = \\text{NOPAT} - (\\text{WACC} \\times \\text{Invested Capital})$</div>
            <div><strong>Alternative Formula:</strong> $\\text{EVA} = (\\text{ROIC} - \\text{WACC}) \\times \\text{Invested Capital}$</div>
            <div>Where NOPAT = Operating Profit After Tax; Invested Capital = Net Fixed Assets + Net Working Capital (or Total Debt + Equity).</div>
          </div>
        `
      },
      {
        heading: "3. M&A Share Exchange Ratios (Swap Ratios)",
        content: `
          <p class="leading-relaxed text-xs text-stone-700 mb-2">When Acquirer ($A$) acquires Target ($T$) via share swap, the share exchange ratio ($ER$) bounds are:</p>
          <ul class="list-disc pl-5 space-y-1 text-xs text-stone-700">
            <li><strong>Minimum Exchange Ratio (Target Shareholders' indifference):</strong> $ER_{min} = \\frac{P_T}{P_A}$ (based on market price) or $\\frac{EPS_T}{EPS_A}$ (based on earnings).</li>
            <li><strong>Maximum Exchange Ratio (Acquirer Shareholders' zero-dilution bound):</strong> $ER_{max} = \\frac{V_T + \\text{Synergies}}{P_A \\times N_T}$.</li>
          </ul>
        `
      }
    ],
    examinerTips: "In DCF Terminal Value calculations, Terminal Value $TV = \\frac{FCF_{n+1}}{WACC - g}$. Remember to discount the Terminal Value back to Year 0 using the Year $n$ discount factor! Forgetting to discount $TV$ to present value is the single most common error in CA Final valuation problems.",
    mnemonics: "EV Bridge: Enterprise Value = Equity Value + Debt + Minority Interest - Cash and Cash Equivalents."
  },

  // ==================== GROUP I: ADVANCED AUDITING & PROFESSIONAL ETHICS ====================
  {
    id: "g1-aud-process",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Advanced Auditing & Professional Ethics",
    paperCode: "Paper 3",
    topic: "The Audit Process & Risk Assessment",
    studyTime: "18 Mins",
    marksWeight: "12–16 Marks",
    syllabusRef: "SA 210, SA 300, SA 315, SA 320, SA 330 & Audit Evidence",
    sections: [
      {
        heading: "1. Pre-Engagement & Audit Strategy (SA 210 & SA 300)",
        content: `
          <ul class="list-disc pl-5 space-y-2 text-xs text-stone-700 mb-3">
            <li><strong>SA 210 (Agreeing the Terms of Audit Engagements):</strong> Establish pre-conditions for audit (acceptable financial reporting framework, management acknowledgement of responsibilities for preparation of financial statements and internal controls). Send engagement letter before commencement.</li>
            <li><strong>SA 300 (Planning an Audit of Financial Statements):</strong> Develop an Overall Audit Strategy (sets the scope, timing and direction of the audit, guides the audit plan) and Detailed Audit Plan (nature, timing and extent of risk assessment procedures and further audit procedures at assertion level).</li>
          </ul>
        `
      },
      {
        heading: "2. Identifying and Assessing Risks of Material Misstatement (SA 315)",
        content: `
          <p class="leading-relaxed text-xs text-stone-700 mb-2">Auditor must perform Risk Assessment Procedures (RAP) to understand: (1) Industry and regulatory environment; (2) Nature of entity and accounting policies; (3) Objectives and strategies; (4) Measurement of financial performance; (5) Internal Control components (Control Environment, Entity's Risk Assessment Process, Information System, Control Activities, Monitoring of Controls).</p>
          <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs font-mono">
            <strong>Audit Risk Model:</strong> Audit Risk (AR) = Inherent Risk (IR) × Control Risk (CR) × Detection Risk (DR)<br/>
            Risk of Material Misstatement (RMM) = IR × CR. Lower RMM allows higher DR; higher RMM requires lower DR (more extensive substantive testing).
          </div>
        `
      },
      {
        heading: "3. Materiality & Performance Materiality (SA 320)",
        content: `
          <p class="leading-relaxed text-xs text-stone-700"><strong>Overall Materiality:</strong> Threshold below which misstatements are not expected to influence economic decisions of users.<br/><strong>Performance Materiality:</strong> The amount set by the auditor at less than materiality for financial statements as a whole to reduce to an appropriately low level the probability that the aggregate of uncorrected and undetected misstatements exceeds overall materiality.</p>
        `
      }
    ],
    examinerTips: "Under SA 315, the auditor must treat the risk of management override of controls as a SIGNIFICANT RISK across all entities, requiring mandatory testing of journal entries, accounting estimates, and significant unusual transactions (SA 240).",
    mnemonics: "5 Components of Internal Control: CRIME (Control Environment, Risk assessment, Information system, Monitoring, Existing control activities)."
  },
  {
    id: "g1-aud-standards",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Advanced Auditing & Professional Ethics",
    paperCode: "Paper 3",
    topic: "Standards on Auditing (SA) Framework & Reporting",
    studyTime: "22 Mins",
    marksWeight: "16–20 Marks",
    syllabusRef: "SQC 1, SA 240, SA 700, SA 701 (KAM) & SA 705 (Modified Opinions)",
    sections: [
      {
        heading: "1. Fraud Responsibilities & Statutory Reporting (SA 240 & Sec 143(12))",
        content: `
          <div class="space-y-2 text-xs">
            <div class="p-3 bg-white rounded-lg border border-stone-200">
              <strong class="text-icai-navy">SA 240 Fraud Triangle:</strong> (1) Incentive / Pressure; (2) Opportunity (poor internal controls); (3) Attitude / Rationalization.
            </div>
            <div class="p-3 bg-amber-50 rounded-lg border border-amber-300">
              <strong class="text-amber-900">Section 143(12) Companies Act, 2013 Reporting:</strong><br/>
              If an auditor has reason to believe that an offence of fraud involving <strong>₹1 Crore or more</strong> is being or has been committed against the company by its officers/employees, report to the Central Government (Ministry of Corporate Affairs) in <strong>Form ADT-4 within 60 days</strong> (after seeking Board/Audit Committee reply within 45 days). Fraud below ₹1 Crore is reported to Audit Committee/Board within 2 days and disclosed in Board's Report.
            </div>
          </div>
        `
      },
      {
        heading: "2. Key Audit Matters (SA 701 KAM)",
        content: `
          <p class="leading-relaxed text-xs text-stone-700 mb-2">Mandatory for audits of complete sets of general purpose financial statements of <strong>listed entities</strong>. Key Audit Matters are those matters that, in the auditor's professional judgment, were of most significance in the audit of financial statements of the current period, selected from matters communicated with Those Charged With Governance (TCWG).</p>
          <div class="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
            <strong>KAM Filtering Hierarchy:</strong> Matters Communicated with TCWG → Matters Requiring Significant Auditor Attention → Most Significance in Current Period Audit = <strong>KAM</strong>.<br/>
            <em>Note: KAM is NOT a substitute for a modified opinion under SA 705 or Going Concern disclosure under SA 570.</em>
          </div>
        `
      },
      {
        heading: "3. Types of Modified Audit Opinions (SA 705)",
        content: `
          <div class="overflow-x-auto my-3">
            <table class="w-full text-xs text-left border border-stone-300 rounded-lg overflow-hidden font-serif">
              <thead class="bg-icai-navy text-amber-200 font-sans">
                <tr>
                  <th class="p-2 border-b">Nature of Matter</th>
                  <th class="p-2 border-b">Material but NOT Pervasive</th>
                  <th class="p-2 border-b">Material AND Pervasive</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-200 bg-white">
                <tr>
                  <td class="p-2 font-bold text-icai-navy">Financial Statements are Materially Misstated</td>
                  <td class="p-2 font-bold text-amber-800">Qualified Opinion ("Except for...")</td>
                  <td class="p-2 font-bold text-rose-800">Adverse Opinion ("Do not give true and fair view")</td>
                </tr>
                <tr class="bg-stone-50">
                  <td class="p-2 font-bold text-icai-navy">Inability to Obtain Sufficient Appropriate Audit Evidence</td>
                  <td class="p-2 font-bold text-amber-800">Qualified Opinion ("Except for...")</td>
                  <td class="p-2 font-bold text-purple-900">Disclaimer of Opinion ("Do not express an opinion")</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    ],
    examinerTips: "If an auditor issues a Disclaimer of Opinion on the financial statements as a whole, SA 701 explicitly prohibits the inclusion of a Key Audit Matters section in the audit report, unless required by law.",
    mnemonics: "Form ADT-4 Timeline: 2 days to Board → 45 days for reply → 15 days to MCA = Total 60 Days."
  },
  {
    id: "g1-aud-ethics",
    group: "Group I (CA Final)",
    groupCode: "G1",
    subject: "Advanced Auditing & Professional Ethics",
    paperCode: "Paper 3",
    topic: "Code of Ethics & Professional Misconduct",
    studyTime: "25 Mins",
    marksWeight: "16–20 Marks",
    syllabusRef: "CA Act 1949, 1st & 2nd Schedules, SAFIS Threats & Council Guidelines",
    sections: [
      {
        heading: "1. The Five Fundamental Principles & SAFIS Threats",
        content: `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
            <div class="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <strong class="font-bold text-icai-navy uppercase tracking-wider block font-sans mb-1.5">5 Fundamental Ethical Principles</strong>
              <ul class="list-disc pl-4 space-y-1 text-stone-700">
                <li><strong>Integrity:</strong> Straightforward and honest in all professional relationships.</li>
                <li><strong>Objectivity:</strong> Not compromising professional judgment due to bias or conflict of interest.</li>
                <li><strong>Professional Competence & Due Care:</strong> Attaining and maintaining professional knowledge.</li>
                <li><strong>Confidentiality:</strong> Respecting confidentiality of information acquired.</li>
                <li><strong>Professional Behavior:</strong> Complying with relevant laws and avoiding discreditable acts.</li>
              </ul>
            </div>
            <div class="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <strong class="font-bold text-rose-900 uppercase tracking-wider block font-sans mb-1.5">5 Threats to Independence (SAFIS)</strong>
              <ul class="list-disc pl-4 space-y-1 text-stone-700">
                <li><strong>Self-Interest Threat:</strong> Financial interest in client (shares, contingent fees, loan).</li>
                <li><strong>Self-Review Threat:</strong> Evaluating previous judgment prepared by the auditor itself (bookkeeping).</li>
                <li><strong>Advocacy Threat:</strong> Promoting client's position (representing client before tax tribunal).</li>
                <li><strong>Familiarity Threat:</strong> Sympathetic relationship due to long association (close relative).</li>
                <li><strong>Intimidation Threat:</strong> Deterred from acting objectively by actual or perceived threats.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        heading: "2. Key Clauses of First Schedule Misconduct (CAs in Practice)",
        content: `
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-stone-700">
            <li><strong>Clause 1 (Sharing Fees):</strong> Cannot share fees with any person other than a member of the Institute, partner, or recognized professional bodies.</li>
            <li><strong>Clause 2 (Accepting Referral Commission):</strong> Cannot accept any part of profits/commission from lawyer, auctioneer or broker.</li>
            <li><strong>Clause 6 (Soliciting Clients):</strong> Cannot solicit clients or professional work directly or indirectly by circular, advertisement, personal communication (Exceptions: applying for tenders meeting ICAI guidelines, writing books/articles).</li>
            <li><strong>Clause 7 (Advertising Professional Attainments):</strong> Cannot advertise professional attainments (visiting cards, signboards, letterheads must conform to Council specifications).</li>
            <li><strong>Clause 8 (Communication with Preceding Auditor):</strong> Mandatory written communication with previous auditor before accepting appointment under section 139.</li>
            <li><strong>Clause 10 (Contingent Fees):</strong> Prohibition of charging fees based on percentage of profits or contingent on results (Exceptions: liquidator fees, valuer under direct tax, debt recovery consultancy).</li>
          </ul>
        `
      },
      {
        heading: "3. Second Schedule Misconduct & Prohibited Services (Sec 144)",
        content: `
          <p class="leading-relaxed text-xs text-stone-700 mb-2"><strong>Section 144 of Companies Act, 2013:</strong> A statutory auditor cannot provide directly or indirectly to the company or its holding/subsidiary: (i) Accounting & book keeping services; (ii) Internal audit; (iii) Design and implementation of financial information systems; (iv) Actuarial services; (v) Investment advisory/banking; (vi) Outsourced financial services; (vii) Management services.</p>
          <div class="p-2.5 bg-amber-50 rounded-lg border border-amber-300 text-xs text-stone-800">
            <strong>Unique Document Identification Number (UDIN):</strong> Mandatory 18-digit system-generated number for all certificates, GST audits, tax audits, and financial statements signed by a practicing CA.
          </div>
        `
      }
    ],
    examinerTips: "Under Clause 8 of Part I of First Schedule, mere sending of a letter via registered post is not sufficient if the letter is returned undelivered; the auditor must ensure verifiable proof of delivery before accepting appointment.",
    mnemonics: "SAFIS = Self-Interest, Advocacy, Familiarity, Intimidation, Self-Review."
  },

  // ==================== GROUP II: CORPORATE AND ECONOMIC LAWS ====================
  {
    id: "g2-law-companies-act",
    group: "Group II (CA Final)",
    groupCode: "G2",
    subject: "Corporate and Economic Laws (CEL)",
    paperCode: "Paper 4",
    topic: "Companies Act, 2013: Management, Meetings & Compliance",
    studyTime: "25 Mins",
    marksWeight: "25–30 Marks",
    syllabusRef: "Directors (Sec 149-172), Meetings (Sec 173-195), NCLT/NCLAT & Oppression (Sec 241-246)",
    sections: [
      {
        heading: "1. Board of Directors & Independent Directors (Sec 149-152)",
        content: `
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-stone-700 mb-3">
            <li><strong>Minimum & Maximum Directors:</strong> Public Company min 3, Private min 2, OPC min 1. Maximum 15 directors (can exceed 15 by passing Special Resolution). Every company must have at least 1 Resident Director (stayed in India $\\ge 182$ days in financial year).</li>
            <li><strong>Woman Director (Sec 149(1)):</strong> Mandatory for every listed company, and public unlisted company with Paid-up capital $\\ge$ ₹100 Cr OR Turnover $\\ge$ ₹300 Cr.</li>
            <li><strong>Independent Directors (Sec 149(4)):</strong> Mandatory for all listed public companies (at least 1/3rd of total directors). For unlisted public companies: Paid-up Capital $\\ge$ ₹10 Cr, OR Turnover $\\ge$ ₹100 Cr, OR Outstanding Loans/Debentures/Deposits exceeding ₹50 Cr $\\rightarrow$ at least 2 Independent Directors. Max tenure: 2 consecutive terms of up to 5 years each (requires 3-year cooling-off period before re-appointment).</li>
          </ul>
        `
      },
      {
        heading: "2. Board Meetings, Quorum & Committees (Sec 173, 177, 178)",
        content: `
          <div class="space-y-2 text-xs">
            <div class="p-3 bg-white rounded-lg border border-stone-200">
              <strong>Board Meetings (Sec 173):</strong> First meeting within 30 days of incorporation. At least 4 meetings every year with gap of not more than 120 days between two consecutive meetings. Notice: Min 7 days in writing. Quorum: 1/3rd of total strength or 2 directors, whichever is higher.
            </div>
            <div class="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <strong>Audit Committee (Sec 177):</strong> Mandatory for listed companies and unlisted public companies meeting threshold (PUC ₹10 Cr, TO ₹100 Cr, Debt > ₹50 Cr). Constitution: Minimum 3 directors with independent directors forming a majority.
            </div>
            <div class="p-3 bg-amber-50 rounded-lg border border-amber-300">
              <strong>Related Party Transactions (Sec 188):</strong> Board approval required for specified transactions. Prior approval by Ordinary Resolution in general meeting if transaction exceeds prescribed limits (e.g. sale/purchase of goods $\\ge 10\\%$ of annual turnover). Interested members cannot vote on the resolution.
            </div>
          </div>
        `
      },
      {
        heading: "3. Prevention of Oppression & Mismanagement and NCLT (Sec 241-246)",
        content: `
          <p class="leading-relaxed text-xs text-stone-700 mb-2"><strong>Eligibility to Apply (Sec 244):</strong> In case of company having share capital, not less than 100 members OR not less than 1/10th of total number of members, OR any member(s) holding not less than 1/10th of issued share capital. In company without share capital, not less than 1/5th of total members.</p>
          <div class="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs">
            <strong>NCLT & NCLAT Appeals:</strong> Any person aggrieved by NCLT order may appeal to NCLAT within <strong>45 days</strong> (extendable by 45 days on sufficient cause). Appeal from NCLAT lies to the <strong>Supreme Court within 60 days</strong> on question of law.
          </div>
        `
      }
    ],
    examinerTips: "Under Section 185 (Loans to Directors), loans to full-time Managing/Whole-time Directors are permissible ONLY as part of conditions of service extended to all employees or pursuant to a scheme approved by special resolution.",
    mnemonics: "Independent Director Unlisted Threshold: 10 - 100 - 50 (Capital 10 Cr, Turnover 100 Cr, Debt > 50 Cr)."
  },
  {
    id: "g2-law-sebi",
    group: "Group II (CA Final)",
    groupCode: "G2",
    subject: "Corporate and Economic Laws (CEL)",
    paperCode: "Paper 4",
    topic: "SEBI Act, 1992 & Key SEBI Regulations",
    studyTime: "18 Mins",
    marksWeight: "10–14 Marks",
    syllabusRef: "SEBI Act 1992, SEBI (LODR) Regulations 2015 & SEBI (PIT) Regulations 2015",
    sections: [
      {
        heading: "1. Powers and Functions of SEBI & SAT Appeals",
        content: `
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-stone-700 mb-3">
            <li><strong>Triple Functions of SEBI:</strong> Quasi-legislative (drafts regulations), Quasi-judicial (passes orders and penalties), and Quasi-executive (conducts investigations and inspections).</li>
            <li><strong>Key Powers:</strong> Call for information, inspect books of accounts of intermediaries and listed companies, suspend trading of securities, impound and retain proceeds under investigation.</li>
            <li><strong>Securities Appellate Tribunal (SAT):</strong> Aggrieved person may appeal against SEBI order to SAT within <strong>45 days</strong>. Appeal against SAT order lies to Supreme Court within <strong>60 days</strong> on questions of law.</li>
          </ul>
        `
      },
      {
        heading: "2. SEBI (LODR) Regulations, 2015 Corporate Governance Norms",
        content: `
          <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
            <div><strong>Board Composition (Reg 17):</strong> Optimum combination of executive and non-executive directors with at least one independent woman director for top 500/1000 listed entities. If Chairman is Non-Executive, at least 1/3rd of Board must be Independent; if Chairman is Executive/Promoter, at least 1/2 of Board must be Independent.</div>
            <div><strong>Audit Committee (Reg 18):</strong> Minimum 3 directors, two-thirds must be independent directors. Quorum: 2 members or 1/3rd, with minimum 2 independent directors.</div>
            <div><strong>Risk Management Committee (Reg 21):</strong> Mandatory for top 1000 listed entities.</div>
          </div>
        `
      },
      {
        heading: "3. SEBI (Prohibition of Insider Trading) Regulations, 2015",
        content: `
          <p class="leading-relaxed text-xs text-stone-700 mb-2"><strong>Unpublished Price Sensitive Information (UPSI):</strong> Any information relating directly or indirectly to a company or its securities that is not generally available and upon becoming available is likely to materially affect securities' prices (financial results, dividends, M&A, capital restructuring).</p>
          <ul class="list-disc pl-5 space-y-1 text-xs text-stone-700">
            <li><strong>Trading Window Closure:</strong> Trading window is closed from end of every quarter till 48 hours after declaration of financial results.</li>
            <li><strong>Pre-Clearance of Trades:</strong> Required for trades exceeding threshold set by Board. Must execute within 7 trading days of pre-clearance.</li>
          </ul>
        `
      }
    ],
    examinerTips: "Under SEBI LODR, an Independent Director who resigns must state detailed reasons to the stock exchanges, confirming there are no other material reasons other than those provided.",
    mnemonics: "Appeals Sequence: SEBI Order → SAT (45 days) → Supreme Court (60 days)."
  },
  {
    id: "g2-law-fema",
    group: "Group II (CA Final)",
    groupCode: "G2",
    subject: "Corporate and Economic Laws (CEL)",
    paperCode: "Paper 4",
    topic: "Foreign Exchange Management Act (FEMA), 1999",
    studyTime: "20 Mins",
    marksWeight: "10–14 Marks",
    syllabusRef: "Section 2(v) Residential Status, Current vs Capital Account, FDI & ECB",
    sections: [
      {
        heading: "1. Residential Status Criteria under FEMA (Sec 2(v))",
        content: `
          <p class="leading-relaxed text-xs text-stone-700 mb-2">A person is a <strong>Person Resident in India (PRI)</strong> if residing in India for <strong>more than 182 days</strong> during the preceding financial year. However, this DOES NOT include:</p>
          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-stone-800 space-y-1">
            <div>(A) A person who has gone out of India or stays outside India for: (i) taking up employment outside India, (ii) carrying on business/vocation outside India, or (iii) any other purpose indicating intention to stay outside India for an uncertain period.</div>
            <div>(B) A person who has come to or stays in India OTHERWISE than: (i) for employment in India, (ii) carrying on business in India, or (iii) with intention to stay in India for an uncertain period.</div>
          </div>
        `
      },
      {
        heading: "2. Current vs Capital Account Transactions (Sec 5 & 6)",
        content: `
          <ul class="list-disc pl-5 space-y-2 text-xs text-stone-700 mb-3">
            <li><strong>Current Account Transactions (Sec 5):</strong> Any transaction other than a capital account transaction. Free unless restricted by Current Account Transaction Rules:
              <br/>• <em>Schedule I:</em> Prohibited (e.g. remittance out of lottery winnings, football pools).
              <br/>• <em>Schedule II:</em> Requires prior approval of Central Government (e.g. cultural tours, advertisement in foreign print media).
              <br/>• <em>Schedule III:</em> Requires prior approval of RBI beyond specified limits (e.g. LRS limit of USD 250,000 per financial year).
            </li>
            <li><strong>Capital Account Transactions (Sec 6):</strong> Transactions that alter the assets or liabilities (including contingent liabilities) outside India of persons resident in India, or in India of persons resident outside India. Prohibited unless explicitly permitted by RBI regulations.</li>
          </ul>
        `
      },
      {
        heading: "3. Foreign Direct Investment (FDI) & External Commercial Borrowings (ECB)",
        content: `
          <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
            <div><strong>FDI Entry Routes:</strong> Automatic Route (no prior approval of Govt or RBI required) vs Government Route (prior approval of concerned Ministry required). Prohibited sectors: Lottery, gambling, atomic energy, chit funds, Nidhi companies, real estate business (except townships/construction).</div>
            <div><strong>ECB Limits:</strong> Eligible borrowers can raise ECBs up to USD 750 million per financial year under the automatic route. Minimum Average Maturity Period (MAMP) is typically 3 years.</div>
          </div>
        `
      }
    ],
    examinerTips: "Do not confuse FEMA residential status with Income Tax residential status. In FEMA, the 182-day rule looks at the PRECEDING financial year, whereas in Income Tax it looks at the CURRENT financial year.",
    mnemonics: "Liberalised Remittance Scheme (LRS) Cap = USD 250,000 per financial year per resident individual."
  },
  {
    id: "g2-law-competition",
    group: "Group II (CA Final)",
    groupCode: "G2",
    subject: "Corporate and Economic Laws (CEL)",
    paperCode: "Paper 4",
    topic: "Competition Act, 2002",
    studyTime: "15 Mins",
    marksWeight: "8–10 Marks",
    syllabusRef: "Anti-Competitive Agreements, Abuse of Dominant Position, Combinations & CCI",
    sections: [
      {
        heading: "1. Anti-Competitive Agreements (Section 3)",
        content: `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
            <div class="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <strong class="text-icai-navy font-bold uppercase tracking-wider block font-sans mb-1">Horizontal Agreements (Cartels)</strong>
              <p class="text-stone-700 leading-relaxed font-serif">Agreements between competitors at the same level of production/trade. Presumed to have an Appreciable Adverse Effect on Competition (AAEC) — <strong>Per Se Void</strong>. Includes price fixing, limiting supply, market allocation, bid rigging.</p>
            </div>
            <div class="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs">
              <strong class="text-icai-navy font-bold uppercase tracking-wider block font-sans mb-1">Vertical Agreements</strong>
              <p class="text-stone-700 leading-relaxed font-serif">Agreements between enterprises at different stages of production chain (tie-in arrangement, exclusive supply/distribution, refusal to deal, resale price maintenance). Evaluated under the <strong>Rule of Reason</strong> (only void if proven to cause AAEC).</p>
            </div>
          </div>
        `
      },
      {
        heading: "2. Abuse of Dominant Position (Section 4)",
        content: `
          <p class="leading-relaxed text-xs text-stone-700">Dominance itself is NOT prohibited; only its <strong>ABUSE</strong> is prohibited. Abuse includes: (a) Imposing unfair or discriminatory conditions or prices (including predatory pricing below cost); (b) Limiting or restricting production or technical development; (c) Denial of market access in any manner; (d) Making conclusion of contracts subject to supplementary obligations; (e) Using dominance in one relevant market to enter/protect another market.</p>
        `
      },
      {
        heading: "3. Regulation of Combinations (Sections 5 & 6)",
        content: `
          <p class="leading-relaxed text-xs text-stone-700">Acquisition, merger or amalgamation exceeding prescribed asset or turnover thresholds constitutes a Combination. Any person proposing to enter into a combination must give notice to the <strong>Competition Commission of India (CCI) within 30 days</strong> of approval of proposal by Board. The combination cannot take effect until <strong>210 days</strong> pass or CCI approves it, whichever is earlier.</p>
        `
      }
    ],
    examinerTips: "Joint ventures that increase efficiency in production, supply, distribution or technical development are an EXCEPTION to the per se rule on horizontal agreements.",
    mnemonics: "CCI Combination Standstill Period = 210 Days."
  },
  {
    id: "g2-law-ibc",
    group: "Group II (CA Final)",
    groupCode: "G2",
    subject: "Corporate and Economic Laws (CEL)",
    paperCode: "Paper 4",
    topic: "Insolvency and Bankruptcy Code (IBC), 2016",
    studyTime: "22 Mins",
    marksWeight: "12–16 Marks",
    syllabusRef: "CIRP, CoC Constitution, Resolution Plans & Section 53 Waterfall",
    sections: [
      {
        heading: "1. Corporate Insolvency Resolution Process (CIRP)",
        content: `
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-stone-700 mb-3">
            <li><strong>Default Threshold:</strong> Minimum default of <strong>₹1 Crore</strong> (raised from ₹1 Lakh).</li>
            <li><strong>Initiation:</strong> Financial Creditor under Section 7; Operational Creditor under Section 9 (mandatory 10-day demand notice under Section 8); Corporate Debtor under Section 10.</li>
            <li><strong>Time Limit (Sec 12):</strong> CIRP must be completed within <strong>180 days</strong> from admission date. Adjudicating Authority (NCLT) may grant a one-time extension of up to 90 days. Total timeline including litigation cannot exceed <strong>330 days</strong>.</li>
            <li><strong>Moratorium (Sec 14):</strong> Prohibits institution/continuation of suits, transfer of assets, enforcement of security interest, recovery of property by owners/lessors.</li>
          </ul>
        `
      },
      {
        heading: "2. Committee of Creditors (CoC) & Resolution Plan Approval",
        content: `
          <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
            <div><strong>CoC Composition:</strong> Comprises all financial creditors (except related parties). Operational creditors with aggregate dues $\ge 10\%$ may attend meetings without voting rights.</div>
            <div><strong>Voting Thresholds:</strong> Approval of Resolution Plan requires <strong>66% majority</strong> of voting share of financial creditors. Routine administrative decisions require 51% majority.</div>
          </div>
        `
      },
      {
        heading: "3. Priority of Claims / Waterfall Mechanism on Liquidation (Sec 53)",
        content: `
          <div class="p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs text-stone-900 font-mono space-y-1">
            <strong>Order of Priority under Section 53:</strong><br/>
            1. CIRP costs and liquidation costs paid in full.<br/>
            2. Workmen's dues (for 24 months) and Secured Creditors who relinquished security interest (Pari-Passu).<br/>
            3. Wages and unpaid dues owed to employees other than workmen (for 12 months).<br/>
            4. Financial debts owed to Unsecured Creditors.<br/>
            5. Government dues (Crown debts for 2 years) and remaining unpaid secured creditors (Pari-Passu).<br/>
            6. Any remaining debts and dues (Operational Creditors).<br/>
            7. Preference Shareholders.<br/>
            8. Equity Shareholders.
          </div>
        `
      }
    ],
    examinerTips: "Secured creditors have two choices under liquidation: (1) Relinquish security to liquidation estate and claim Priority #2 under Section 53; or (2) Realise security interest independently outside liquidation under Section 52.",
    mnemonics: "IBC Waterfall Mnemonic: Costs → Workmen/Secured → Employees → Unsecured → Govt → Others → Preference → Equity."
  },

  // ==================== GROUP II: STRATEGIC COST MANAGEMENT & PERFORMANCE EVALUATION ====================
  {
    id: "g2-scm-abc",
    group: "Group II (CA Final)",
    groupCode: "G2",
    subject: "Strategic Cost Management and Performance Evaluation (SCMPE)",
    paperCode: "Paper 5",
    topic: "Activity-Based Costing & Activity-Based Management",
    studyTime: "18 Mins",
    marksWeight: "12–16 Marks",
    syllabusRef: "Cost Drivers, Activity Hierarchy, Operational vs Strategic ABM & Whale Curve",
    sections: [
      {
        heading: "1. Activity-Based Costing (ABC) vs Traditional Costing",
        content: `
          <p class="leading-relaxed text-xs text-stone-700 mb-2">Traditional costing pools overheads into departments and allocates them using volume-based drivers (direct labor hours, machine hours), causing product cross-subsidization (high-volume standard products over-costed, low-volume complex products under-costed). ABC assigns costs to activities first, and then to cost objects based on consumption of cost drivers.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs my-2">
            <div class="p-3 bg-white rounded-lg border border-stone-200">
              <strong class="text-icai-navy block font-sans">Hierarchy of Activities</strong>
              <ul class="list-disc pl-4 space-y-1 text-stone-700 mt-1">
                <li><strong>Unit-Level:</strong> Performed each time a unit is produced (power, machine run).</li>
                <li><strong>Batch-Level:</strong> Performed each time a batch is processed (machine setups, purchase orders, inspections).</li>
                <li><strong>Product-Sustaining:</strong> Supports specific product lines (product design, engineering change orders).</li>
                <li><strong>Facility-Sustaining:</strong> Supports general manufacturing plant (factory rent, plant security, CEO salary).</li>
              </ul>
            </div>
            <div class="p-3 bg-white rounded-lg border border-stone-200">
              <strong class="text-icai-navy block font-sans">Cost Driver Types</strong>
              <ul class="list-disc pl-4 space-y-1 text-stone-700 mt-1">
                <li><strong>Transaction Drivers:</strong> Count how often an activity is performed (number of setups, receipts).</li>
                <li><strong>Duration Drivers:</strong> Measure time required to perform activity (setup hours, inspection hours).</li>
                <li><strong>Intensity Drivers:</strong> Directly charge resources used every time activity is performed.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        heading: "2. Customer Profitability Analysis & The Whale Curve",
        content: `
          <p class="leading-relaxed text-xs text-stone-700 mb-2">Customer Profitability Analysis reveals that customers generating high gross margin may consume excessive non-manufacturing resources (expedited shipping, frequent small orders, customization, post-sales support).</p>
          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-mono">
            <strong>The Whale Curve of Cumulative Customer Profitability:</strong><br/>
            Typically, the top 20% of customers generate 150% to 200% of total company profits. The middle 60% to 70% break even. The bottom 10% to 20% of customers erode 50% to 100% of profits due to high cost-to-serve demands.
          </div>
        `
      }
    ],
    examinerTips: "In ABC case studies, facility-sustaining costs should NOT be arbitrarily allocated to products if there is no causal relationship. Treat facility-sustaining overheads as period costs.",
    mnemonics: "Activity Hierarchy Mnemonic: U-B-P-F (Unit, Batch, Product, Facility)."
  },
  {
    id: "g2-scm-target-costing",
    group: "Group II (CA Final)",
    groupCode: "G2",
    subject: "Strategic Cost Management and Performance Evaluation (SCMPE)",
    paperCode: "Paper 5",
    topic: "Target Costing, Kaizen & Life-Cycle Costing",
    studyTime: "18 Mins",
    marksWeight: "10–14 Marks",
    syllabusRef: "Target Costing Equation, Value Engineering, Kaizen Costing & LCC",
    sections: [
      {
        heading: "1. Target Costing Process & Cost Gap",
        content: `
          <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono space-y-1 mb-3">
            <div><strong>Target Costing Formula:</strong> $\\text{Target Cost} = \\text{Target Selling Price} - \\text{Desired Profit Margin}$</div>
            <div><strong>Cost Gap:</strong> $\\text{Cost Gap} = \\text{Estimated Current Product Cost} - \\text{Target Cost}$</div>
          </div>
          <p class="text-xs text-stone-700 leading-relaxed">Unlike traditional cost-plus pricing (Cost + Desired Margin = Price), Target Costing is customer-centric and market-driven. 80% to 90% of product lifecycle costs are locked in during the design and development phase.</p>
        `
      },
      {
        heading: "2. Value Engineering (VE) vs Value Analysis (VA)",
        content: `
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-stone-700">
            <li><strong>Value Engineering (VE):</strong> Systematic evaluation during the <em>design phase</em> to eliminate non-value-added features before production begins.</li>
            <li><strong>Value Analysis (VA):</strong> Applied to <em>existing products already in production</em> to examine whether components can be redesigned, standardized or replaced with cheaper alternatives without impairing performance.</li>
            <li><strong>Kaizen Costing:</strong> Continuous, small incremental improvements during the <em>manufacturing phase</em> focusing on waste reduction (Muda).</li>
          </ul>
        `
      },
      {
        heading: "3. Life-Cycle Costing (LCC)",
        content: `
          <p class="leading-relaxed text-xs text-stone-700">Tracks costs from cradle to grave: (1) Research & Development; (2) Design; (3) Manufacturing; (4) Marketing & Distribution; (5) Customer Service; (6) Decommissioning & Disposal. Maximizes life-cycle profit by optimizing trade-offs between initial R&D expenditure and subsequent operating/maintenance costs.</p>
        `
      }
    ],
    examinerTips: "In Value Engineering questions, calculate the Value Index: $VI = \\frac{\\text{Relative Importance of Function}}{\\text{Percentage of Cost Allocated}}$. If $VI < 1$, the component is over-engineered and cost must be cut. If $VI > 1$, quality may be enhanced.",
    mnemonics: "Value Equation: $\\text{Value} = \\frac{\\text{Functionality}}{\\text{Cost}}$."
  },
  {
    id: "g2-scm-decision-tools",
    group: "Group II (CA Final)",
    groupCode: "G2",
    subject: "Strategic Cost Management and Performance Evaluation (SCMPE)",
    paperCode: "Paper 5",
    topic: "Decision-Making Tools & Relevant Costing",
    studyTime: "22 Mins",
    marksWeight: "16–20 Marks",
    syllabusRef: "Relevant Costing, Limiting Factors, CVP Analysis & Pricing Strategies",
    sections: [
      {
        heading: "1. Relevant Costing Rules for Decision-Making",
        content: `
          <div class="overflow-x-auto my-2">
            <table class="w-full text-xs text-left border border-stone-300 rounded-lg overflow-hidden font-serif">
              <thead class="bg-icai-navy text-amber-200 font-sans">
                <tr>
                  <th class="p-2 border-b">Resource Item</th>
                  <th class="p-2 border-b">Availability / Condition</th>
                  <th class="p-2 border-b">Relevant Cost Treatment</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-200 bg-white">
                <tr>
                  <td class="p-2 font-bold text-icai-navy">Raw Material</td>
                  <td class="p-2">In stock, has no alternative use</td>
                  <td class="p-2 font-bold text-emerald-800">Scrap / Realisable Value</td>
                </tr>
                <tr class="bg-stone-50">
                  <td class="p-2 font-bold text-icai-navy">Raw Material</td>
                  <td class="p-2">In stock, can be used in regular production</td>
                  <td class="p-2 font-bold text-emerald-800">Current Replacement Cost</td>
                </tr>
                <tr>
                  <td class="p-2 font-bold text-icai-navy">Direct Labor</td>
                  <td class="p-2">Idle capacity / under-utilized staff</td>
                  <td class="p-2 font-bold text-stone-500">Zero (NIL incremental cost)</td>
                </tr>
                <tr class="bg-stone-50">
                  <td class="p-2 font-bold text-icai-navy">Direct Labor</td>
                  <td class="p-2">Full capacity, diverted from another profitable product</td>
                  <td class="p-2 font-bold text-emerald-800">Direct Wages + Lost Contribution</td>
                </tr>
                <tr>
                  <td class="p-2 font-bold text-icai-navy">Sunk Costs</td>
                  <td class="p-2">Already incurred historical costs (past R&D, market study)</td>
                  <td class="p-2 font-bold text-rose-800">IRRELEVANT (Zero)</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "2. Optimum Product Mix under Single & Multi-Constraints",
        content: `
          <ul class="list-disc pl-5 space-y-1 text-xs text-stone-700">
            <li><strong>Single Limiting Factor:</strong> Rank products based on <strong>Contribution per Unit of Limiting Factor</strong> (e.g. Contribution per machine hour). Allocate scarce resource to highest-ranking product first.</li>
            <li><strong>Multiple Limiting Factors:</strong> Formulate Linear Programming Problem (LPP) with Objective Function (Maximize $Z = \\sum c_i x_i$) subject to resource constraints. Use Simplex or graphical method. Shadow price represents the maximum premium payable for one additional unit of scarce resource.</li>
          </ul>
        `
      },
      {
        heading: "3. Strategic Pricing Policies",
        content: `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs my-2">
            <div class="p-3 bg-white rounded-lg border border-stone-200">
              <strong class="text-icai-navy block font-sans">Market Skimming</strong>
              <p class="text-stone-700 font-serif mt-1">Charging a high initial price to skim premium buyers with inelastic demand before gradually lowering price as competitors enter (e.g. innovative tech products, pharmaceuticals with patent protection).</p>
            </div>
            <div class="p-3 bg-white rounded-lg border border-stone-200">
              <strong class="text-icai-navy block font-sans">Penetration Pricing</strong>
              <p class="text-stone-700 font-serif mt-1">Setting low initial price to capture mass market share quickly, build brand loyalty, and achieve economies of scale (e.g. FMCG products, telecom services).</p>
            </div>
          </div>
        `
      }
    ],
    examinerTips: "In Make or Buy decisions, fixed overheads that will continue regardless of decision are completely IRRELEVANT. Only specific incremental fixed overheads avoidable by buying outside are included.",
    mnemonics: "Relevant Cost Criterion: Future, Incremental, Cash Flow (FIC)."
  },
  {
    id: "g2-scm-performance",
    group: "Group II (CA Final)",
    groupCode: "G2",
    subject: "Strategic Cost Management and Performance Evaluation (SCMPE)",
    paperCode: "Paper 5",
    topic: "Performance Measurement & Transfer Pricing",
    studyTime: "22 Mins",
    marksWeight: "16–20 Marks",
    syllabusRef: "Balanced Scorecard, Building Block Model & Divisional Transfer Pricing",
    sections: [
      {
        heading: "1. The Balanced Scorecard (Kaplan & Norton)",
        content: `
          <p class="leading-relaxed text-xs text-stone-700 mb-2">Complements traditional financial measures with three operational perspectives, tied together through cause-and-effect strategy maps:</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-stone-800">
            <div class="p-2.5 bg-blue-50 rounded-lg border border-blue-200"><strong class="text-blue-900 block font-sans">1. Financial</strong>"How do we look to shareholders?" Metrics: ROI, EVA, Cash Flow, Revenue Growth.</div>
            <div class="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200"><strong class="text-emerald-900 block font-sans">2. Customer</strong>"How do customers see us?" Metrics: Retention rate, Net Promoter Score (NPS), Delivery time.</div>
            <div class="p-2.5 bg-amber-50 rounded-lg border border-amber-200"><strong class="text-amber-900 block font-sans">3. Internal Process</strong>"What must we excel at?" Metrics: Cycle time, defect rate, manufacturing lead time.</div>
            <div class="p-2.5 bg-purple-50 rounded-lg border border-purple-200"><strong class="text-purple-900 block font-sans">4. Learning & Growth</strong>"Can we continue to improve?" Metrics: Employee training hours, patent filings, retention.</div>
          </div>
        `
      },
      {
        heading: "2. Fitzgerald & Moon Building Block Model for Services",
        content: `
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-stone-700">
            <li><strong>Dimensions (What to measure):</strong> Financial performance, Competitiveness, Quality of service, Flexibility, Resource utilization, Innovation.</li>
            <li><strong>Standards (Benchmark targets):</strong> Ownership (employees participate in setting goals), Achievability (realistic and motivating), Equity (fair comparison across business units).</li>
            <li><strong>Rewards (Motivation):</strong> Clarity (transparent bonus criteria), Motivation (meaningful rewards), Controllability (managers rewarded only for factors under their control).</li>
          </ul>
        `
      },
      {
        heading: "3. Divisional Transfer Pricing Rules",
        content: `
          <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono space-y-1 mb-2">
            <div><strong>General Transfer Pricing Rule:</strong></div>
            <div>$\\text{Minimum Transfer Price (Supplying Division)} = \\text{Incremental Marginal Cost} + \\text{Opportunity Cost (Lost Contribution)}$</div>
            <div>$\\text{Maximum Transfer Price (Buying Division)} = \\text{Lower of External Market Price or Net Marginal Revenue}$</div>
          </div>
          <p class="text-xs text-stone-700"><strong>Dual Pricing:</strong> Supplying division credited with Market Price (incentivizes production), Buying division debited with Marginal Cost (promotes optimum company output). The variance is eliminated at corporate headquarters.</p>
        `
      }
    ],
    examinerTips: "If the supplying division has IDLE CAPACITY, Opportunity Cost = ZERO. Therefore, Minimum Transfer Price = Variable Cost. If supplying division is at FULL CAPACITY, Opportunity Cost = Lost Contribution from outside sale.",
    mnemonics: "Building Block Framework: D-S-R (Dimensions, Standards, Rewards)."
  }
];

fs.writeFileSync(path.join(__dirname, '..', 'data', 'notes', 'topical_notes_rich_content.json'), JSON.stringify(TOPIC_NOTES_DATA, null, 2), 'utf8');
console.log('✅ Generated data/notes/topical_notes_rich_content.json with all 21 comprehensive topic notes!');

