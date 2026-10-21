const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

// ==========================================
// GROUP 1 - PAPER 1: FINANCIAL REPORTING (FR)
// 20 Difficult Case-Based Previous Year Questions (PYQs)
// ==========================================
const paper1_fr_questions = [
  {
    "id": 1001,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final May 2024 PYQ] Ind AS 115 - Revenue & Financing Component",
    "question": "Vardhman Infotech Ltd. enters into a contract with a customer on 1st April 2023 to supply customized enterprise software and support services. The contract specifies a fixed consideration of ₹120 Crores payable in two years (on 31st March 2025). The standalone selling price of the software delivered on 1st April 2023 is ₹99.17 Crores. The market borrowing rate for customers of similar credit standing is 10% per annum (compounded annually). How should Vardhman Infotech recognize revenue and financing income for FY 2023-24 under Ind AS 115?",
    "options": [
      "Recognize revenue of ₹120 Crores on 1st April 2023; no interest income is recognized as consideration is fixed.",
      "Recognize revenue of ₹99.17 Crores on 1st April 2023 and finance income (interest) of ₹9.92 Crores in Profit & Loss for FY 2023-24 at 10% effective interest rate.",
      "Recognize revenue equally at ₹60 Crores each on 31st March 2024 and 31st March 2025; no finance income.",
      "Recognize revenue of ₹109.09 Crores on 31st March 2024 and ₹10.91 Crores on 31st March 2025 as performance obligations are satisfied over time."
    ],
    "correct": 1,
    "ref": "Ind AS 115 (Revenue from Contracts with Customers) - Paragraphs 60-65: Significant Financing Component",
    "explanation": "Under Ind AS 115, when the timing of payments agreed to by the parties provides the customer with a significant benefit of financing the transfer of goods/services to the customer, the entity must adjust the promised amount of consideration for the effects of the time value of money. Revenue is recognized at the cash selling price (present value) of ₹99.17 Crores on 1st April 2023. Interest income for FY 2023-24 is recognized at 10% on ₹99.17 Crores = ₹9.92 Crores under effective interest method.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1002,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Ind AS 103 - Reverse Acquisition",
    "question": "Legal parent entity P Ltd. (unlisted) acquires listed entity S Ltd. through a share exchange where S Ltd. issues 2.5 shares for every 1 share of P Ltd. Post-acquisition, former shareholders of P Ltd. hold 65% of the combined voting power of legal acquirer S Ltd. S Ltd.'s quoted market share price is ₹140, whereas P Ltd.'s unquoted estimated fair value per share is ₹350. Under Ind AS 103 Appendix B, which entity is the accounting acquirer, and how is the purchase consideration measured?",
    "options": [
      "S Ltd. is the accounting acquirer; purchase consideration is measured using the fair value of S Ltd.'s net assets.",
      "P Ltd. is the accounting acquirer (Reverse Acquisition); consideration is measured as the notional fair value of the number of equity interests legal subsidiary (P Ltd.) would have had to issue to give legal parent (S Ltd.) owners the same percentage of equity interests (35%).",
      "P Ltd. is the accounting acquirer; purchase consideration is measured strictly based on the historical book value of S Ltd.'s identifiable assets.",
      "Joint acquisition where both entities recognize goodwill pro-rata to their relative market capitalization."
    ],
    "correct": 1,
    "ref": "Ind AS 103 (Business Combinations) - Appendix B: Reverse Acquisitions (Paragraphs B19-B22)",
    "explanation": "In a reverse acquisition under Ind AS 103, the legal acquiree (P Ltd.) is the accounting acquirer because its former shareholders gain voting control (65%) of the combined entity. The acquisition-date consideration transferred is measured at the fair value of the number of equity interests that P Ltd. would have had to issue to the legal parent's shareholders to give them the same percentage ownership interest (35%) in the combined entity.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1003,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final May 2023 PYQ] Ind AS 103 - Contingent Consideration",
    "question": "On 1st October 2023, Titan Ltd. acquires 80% equity shares of Zenith Ltd. The purchase agreement requires Titan Ltd. to pay an additional cash consideration of ₹30 Crores on 30th September 2025 if Zenith Ltd.'s EBITDA exceeds ₹100 Crores in FY 2024-25. On acquisition date, the fair value of this contingent consideration is assessed at ₹18 Crores (discount rate 12%). On 31st March 2024, due to unexpected surge in demand, the revised fair value of the contingent liability increases to ₹24 Crores. How should Titan Ltd. account for the ₹6 Crore change in fair value under Ind AS 103 / Ind AS 109?",
    "options": [
      "Adjust against Goodwill recognized on acquisition date as a measurement period adjustment.",
      "Recognize the ₹6 Crore increase directly as an expense in Profit & Loss, as contingent consideration classified as a financial liability must be remeasured through P&L.",
      "Recognize the ₹6 Crore increase in Other Comprehensive Income (OCI) under remeasurements.",
      "Retrospectively adjust retained earnings as of the acquisition date."
    ],
    "correct": 1,
    "ref": "Ind AS 103 (Business Combinations) Paragraph 58 & Ind AS 109: Subsequent Measurement of Contingent Consideration",
    "explanation": "Contingent consideration classified as a financial liability is measured at fair value on acquisition date and included in purchase consideration for goodwill computation. Subsequent changes in fair value that are not measurement period adjustments (i.e. resulting from post-acquisition events like demand surge) must be recognized in Profit & Loss under Ind AS 109 and cannot be adjusted against Goodwill.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1004,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Ind AS 110 - Step Acquisition",
    "question": "Apex Ltd. held a 25% equity interest in Orbit Ltd. carried as an associate under Ind AS 28 at ₹45 Crores (original cost ₹30 Crores, cumulative equity profit share ₹15 Crores). On 1st July 2023, Apex Ltd. acquires an additional 45% stake for ₹120 Crores in cash, securing control (70% total). On this date, the fair value of Orbit Ltd.'s identifiable net assets is ₹210 Crores, and the fair value of Apex Ltd.'s original 25% stake is ₹60 Crores. Apex elects to measure Non-Controlling Interest (NCI) at fair value (assessed at ₹72 Crores). What is the gain/loss recognized on remeasuring the original 25% stake and the resulting Goodwill on acquisition?",
    "options": [
      "Gain on remeasurement ₹15 Crores recognized in P&L; Goodwill of ₹42 Crores.",
      "Gain on remeasurement ₹30 Crores recognized in OCI; Goodwill of ₹30 Crores.",
      "No gain on remeasurement; Goodwill of ₹57 Crores.",
      "Gain on remeasurement ₹15 Crores recognized in P&L; Goodwill of ₹22 Crores."
    ],
    "correct": 0,
    "ref": "Ind AS 110 (Consolidated Financial Statements) & Ind AS 103 (Business Combinations) - Step Acquisitions (Paragraph 42)",
    "explanation": "In a business combination achieved in stages, the acquirer must remeasure its previously held equity interest at its acquisition-date fair value and recognize the resulting gain or loss in Profit & Loss. Gain on remeasurement = Fair Value (₹60 Cr) - Carrying Value under equity method (₹45 Cr) = ₹15 Crores in P&L. Total Consideration = ₹120 Cr (new) + ₹60 Cr (previously held) = ₹180 Cr. Full Goodwill = Total Consideration (₹180 Cr) + NCI at FV (₹72 Cr) - Identifiable Net Assets at FV (₹210 Cr) = ₹252 Cr - ₹210 Cr = ₹42 Crores.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1005,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final May 2024 PYQ] Ind AS 109 / Ind AS 32 - Compound Financial Instruments",
    "question": "Kaveri Infra Ltd. issues 50,000 7% Compulsorily Convertible Debentures (CCDs) of face value ₹1,000 each on 1st April 2023 for ₹5 Crores. The CCDs are convertible into equity shares after 3 years. Annual coupon of 7% is payable at the end of each year. The prevailing market rate of interest for similar debentures without conversion rights is 11% per annum. Present value factors at 11% are: Year 1 = 0.9009, Year 2 = 0.8116, Year 3 = 0.7312. How should Kaveri Infra Ltd. bifurcate the instrument on initial recognition under Ind AS 32?",
    "options": [
      "Liability component = ₹5.00 Crores; Equity component = ₹0.",
      "Liability component (PV of 3 years coupon of ₹35 Lakhs/yr) = ₹85.53 Lakhs; Equity component (Residual) = ₹414.47 Lakhs (₹4.145 Crores).",
      "Liability component = ₹2.50 Crores; Equity component = ₹2.50 Crores split equally.",
      "Liability component = ₹5.00 Crores + Present value of conversion premium."
    ],
    "correct": 1,
    "ref": "Ind AS 32 (Financial Instruments: Presentation) - Paragraphs 28-32: Compound Financial Instruments (Split Accounting)",
    "explanation": "Since conversion into equity shares is mandatory after 3 years, the principal is not repayable in cash. The only contractual cash outflow is the mandatory annual interest of ₹35 Lakhs (7% of ₹5 Cr) for 3 years. The liability component equals the present value of the contractual interest payments discounted at the market rate of 11%: ₹35 Lakhs × (0.9009 + 0.8116 + 0.7312) = ₹35 Lakhs × 2.4437 = ₹85.53 Lakhs. The equity conversion option is the residual: ₹500 Lakhs - ₹85.53 Lakhs = ₹414.47 Lakhs.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1006,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Ind AS 109 - Expected Credit Loss (ECL) Model",
    "question": "A commercial bank holds a corporate loan portfolio of ₹1,000 Crores. At initial recognition, the loans were categorized as Stage 1 (12-month ECL of ₹12 Crores). At the reporting date, loans totaling ₹250 Crores have suffered a Significant Increase in Credit Risk (SICR) due to 45-day overdue status and severe industry downturn, but are not credit-impaired. The lifetime Probability of Default (PD) for these Stage 2 loans is 14%, and Loss Given Default (LGD) is 40%. The remaining ₹750 Crores remain in Stage 1 with 12-month PD of 1.5% and LGD of 40%. What is the total ECL impairment allowance under Ind AS 109?",
    "options": [
      "Total ECL = ₹12.00 Crores (maintained from initial recognition).",
      "Total ECL = ₹18.50 Crores [Stage 1: ₹750 Cr × 1.5% × 40% = ₹4.5 Cr; Stage 2: ₹250 Cr × 14% × 40% = ₹14.0 Cr].",
      "Total ECL = ₹25.00 Crores based on general provisioning norms.",
      "Total ECL = ₹100.00 Crores (10% of portfolio)."
    ],
    "correct": 1,
    "ref": "Ind AS 109 (Financial Instruments) - Section 5.5: Impairment of Financial Assets (Three-Stage ECL Model)",
    "explanation": "Under Ind AS 109, when a financial asset experiences a significant increase in credit risk (SICR) since initial recognition, it moves from Stage 1 to Stage 2, requiring recognition of Lifetime Expected Credit Losses instead of 12-month ECL. Stage 1 ECL = ₹750 Cr × 1.5% × 40% = ₹4.5 Crores. Stage 2 ECL = ₹250 Cr × 14% × 40% = ₹14.0 Crores. Total ECL Impairment Allowance = ₹4.5 Cr + ₹14.0 Cr = ₹18.50 Crores.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1007,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final May 2023 PYQ] Ind AS 116 - Sale and Leaseback",
    "question": "On 1st April 2023, Delta Ltd. sells an office building with a carrying amount of ₹60 Crores to an investment fund for ₹100 Crores (its fair value), and simultaneously leases it back for 15 years. The transfer satisfies the performance obligation criteria of Ind AS 115. The present value of the annual lease payments discounted at Delta's incremental borrowing rate of 8% is ₹40 Crores. What is the gain on sale to be recognized in Profit & Loss by Delta Ltd. under Ind AS 116?",
    "options": [
      "₹40.00 Crores (Total Fair Value ₹100 Cr - Carrying Amount ₹60 Cr).",
      "₹24.00 Crores [Gain relating to the rights transferred to the buyer-lessor: ₹40 Cr total gain × (₹100 Cr - ₹40 Cr) / ₹100 Cr].",
      "₹16.00 Crores deferred over 15 years.",
      "Zero gain recognized; entire difference adjusted against the Right-of-Use asset."
    ],
    "correct": 1,
    "ref": "Ind AS 116 (Leases) - Paragraphs 98-103: Sale and Leaseback Transactions",
    "explanation": "In a sale and leaseback meeting Ind AS 115 criteria, the seller-lessee measures the Right-of-Use (ROU) asset arising from the leaseback at the proportion of the previous carrying amount that relates to the rights retained: ₹60 Cr × (₹40 Cr / ₹100 Cr) = ₹24 Crores. The seller-lessee recognizes only the amount of any gain or loss that relates to the rights transferred to the buyer-lessor: Total Gain = ₹100 Cr - ₹60 Cr = ₹40 Crores. Gain recognized = Total Gain × (Rights transferred / Fair Value) = ₹40 Cr × (₹60 Cr / ₹100 Cr) = ₹24.00 Crores.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1008,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Ind AS 116 - Lease Modification",
    "question": "A lessee entered into a 10-year lease for 5,000 sq. meters of office space. At the beginning of Year 6, the lease is amended to decrease the leased space to 3,000 sq. meters (a 40% reduction in scope) and reduce annual lease payments proportionately. Immediately before the modification, the carrying amount of the ROU asset is ₹80 Lakhs and the lease liability is ₹90 Lakhs. How should the 40% reduction in scope be accounted for under Ind AS 116?",
    "options": [
      "Derecognize 40% of both ROU Asset (₹32 Lakhs) and Lease Liability (₹36 Lakhs), recognizing the net difference of ₹4 Lakhs as a gain in Profit & Loss.",
      "Adjust the entire reduction of ₹36 Lakhs against the remaining ROU asset with zero impact on Profit & Loss.",
      "Recognize an impairment loss of ₹32 Lakhs in Profit & Loss.",
      "Treat as a new separate lease with retrospective restatement."
    ],
    "correct": 0,
    "ref": "Ind AS 116 (Leases) - Paragraph 45: Lease Modifications Decreasing Scope of Lease",
    "explanation": "Under paragraph 45(a) of Ind AS 116, for a lease modification that decreases the scope of the lease, the lessee must decrease the carrying amount of the ROU asset to reflect the partial termination (40% of ₹80L = ₹32L) and decrease the lease liability (40% of ₹90L = ₹36L). The net difference between the derecognized liability and derecognized asset (₹36L - ₹32L = ₹4 Lakhs) is recognized in Profit & Loss as a gain on lease termination.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1009,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final May 2024 PYQ] Ind AS 12 - Deferred Tax on Business Combinations",
    "question": "On 1st January 2024, Sun Ltd. acquires Moon Ltd. in a business combination. Moon Ltd.'s identifiable plant has a carrying amount (tax base) of ₹100 Crores, but its fair value on acquisition date is ₹160 Crores. Applicable income tax rate is 25%. Moon Ltd. also has unrecorded research intangibles of fair value ₹40 Crores with zero tax base. How should the deferred tax consequences be recognized in accounting for the business combination under Ind AS 12 and Ind AS 103?",
    "options": [
      "Recognize a Deferred Tax Asset of ₹25 Crores directly in Equity.",
      "Recognize a Deferred Tax Liability of ₹25 Crores [25% on taxable temporary difference of ₹60 Cr (Plant) + ₹40 Cr (Intangibles) = ₹100 Cr total difference] with a corresponding increase in Goodwill.",
      "Do not recognize any deferred tax because initial recognition exemption applies to all acquisition assets.",
      "Recognize Deferred Tax Liability of ₹15 Crores only on plant; intangibles are exempt."
    ],
    "correct": 1,
    "ref": "Ind AS 12 (Income Taxes) Paragraph 66 & Ind AS 103: Deferred Tax on Business Combinations",
    "explanation": "Under Ind AS 12.66, temporary differences arise when the identifiable assets acquired are recognized at their fair values but no equivalent adjustment is made for tax purposes. The initial recognition exemption does NOT apply to business combinations. Taxable temporary differences: Plant uplift (₹160 Cr - ₹100 Cr) = ₹60 Cr; Intangible asset (₹40 Cr - ₹0) = ₹40 Cr. Total taxable temporary differences = ₹100 Cr. Deferred Tax Liability = 25% of ₹100 Cr = ₹25 Crores. Recognizing this DTL reduces net identifiable assets, thereby increasing Goodwill by ₹25 Crores.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1010,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Ind AS 19 - Defined Benefit Plans & Remeasurements",
    "question": "At 1st April 2023, Zenith Ltd.'s Defined Benefit Obligation (DBO) is ₹500 Crores and Plan Assets at fair value are ₹460 Crores (Net Defined Benefit Liability = ₹40 Crores). Discount rate is 8%. For FY 2023-24: Current Service Cost is ₹35 Crores, actual return on plan assets is ₹48 Crores, and benefits paid during the year are ₹30 Crores. At 31st March 2024, the actuarially determined present value of DBO is ₹542 Crores. How should the net interest, service cost, and remeasurement gains/losses be presented under Ind AS 19?",
    "options": [
      "Total net expense of ₹38.2 Crores recognized entirely in Profit & Loss.",
      "Service cost ₹35 Cr + Net Interest ₹3.2 Cr (8% on ₹40 Cr net liability) = ₹38.2 Cr in P&L; Remeasurement net gain of ₹7.8 Cr recognized in Other Comprehensive Income (OCI) not reclassified to P&L.",
      "Current service cost in P&L and all interest in OCI.",
      "Net defined benefit liability changes recognized in retained earnings."
    ],
    "correct": 1,
    "ref": "Ind AS 19 (Employee Benefits) - Paragraphs 120-130: Recognition of Components of Defined Benefit Cost",
    "explanation": "Under Ind AS 19, defined benefit cost has 3 distinct components: (1) Service Cost (₹35 Cr) recognized in P&L; (2) Net Interest on Net Defined Benefit Liability = 8% × ₹40 Cr = ₹3.2 Cr recognized in P&L (Total P&L charge = ₹38.2 Cr); (3) Remeasurements: Return on plan assets excluding net interest (₹48 Cr - [8% of ₹460 Cr = ₹36.8 Cr]) = ₹11.2 Cr gain, less actuarial loss on DBO of ₹3.4 Cr = Net Remeasurement Gain of ₹7.8 Crores recognized in OCI and never reclassified to P&L.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1011,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final May 2023 PYQ] Ind AS 33 - Diluted EPS with Ranking of Potential Shares",
    "question": "A company has Basic EPS of ₹10.00 based on net profit of ₹100 Crores and 10 Crore equity shares. It has two potential dilutive instruments: (A) 50,00,000 8% Convertible Preference Shares of ₹100 each (dividend ₹4 Cr), convertible into 80,00,000 equity shares (incremental EPS = ₹5.00); (B) 10,00,000 12% Convertible Debentures of ₹1,000 each (post-tax interest saved ₹8.4 Cr), convertible into 70,00,000 equity shares (incremental EPS = ₹12.00). Under Ind AS 33.44, what is the Diluted EPS?",
    "options": [
      "₹10.00 (neither instrument is dilutive).",
      "₹9.63 per share [Only Preference Shares are included because their incremental EPS (₹5.00) is dilutive, whereas Debentures (₹12.00) are anti-dilutive].",
      "₹10.20 per share (both instruments included).",
      "₹8.50 per share."
    ],
    "correct": 1,
    "ref": "Ind AS 33 (Earnings Per Share) - Paragraphs 41-44: Order of Ranking Dilutive Potential Ordinary Shares",
    "explanation": "Under Ind AS 33.44, potential ordinary shares are ranked from most dilutive to least dilutive based on their incremental EPS. Instrument A (Preference shares) has incremental EPS of ₹4 Cr / 80 Lakh shares = ₹5.00 (most dilutive). Including Instrument A: New EPS = (₹100 Cr + ₹4 Cr) / (10 Cr + 0.8 Cr) = ₹104 Cr / 10.8 Cr shares = ₹9.63. Now test Instrument B: Its incremental EPS is ₹8.4 Cr / 70 Lakh shares = ₹12.00. Since ₹12.00 is greater than ₹9.63, Instrument B is ANTI-DILUTIVE and must be excluded. Diluted EPS = ₹9.63.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1012,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Ind AS 36 - Impairment of CGU with Goodwill",
    "question": "A Cash Generating Unit (CGU) has the following carrying amounts: Goodwill = ₹40 Crores, Building = ₹120 Crores, Plant & Equipment = ₹80 Crores (Total Carrying Amount = ₹240 Crores). The recoverable amount of the CGU is determined to be ₹170 Crores. The fair value less costs of disposal for the Building is independently assessed at ₹115 Crores. How should the impairment loss of ₹70 Crores be allocated under Ind AS 36?",
    "options": [
      "Goodwill ₹40 Crores; Building ₹5 Crores; Plant & Equipment ₹25 Crores.",
      "Goodwill ₹40 Crores; remaining ₹30 Crores allocated pro-rata between Building (₹18 Cr) and Plant (₹12 Cr).",
      "Goodwill ₹0; Building ₹35 Crores; Plant ₹35 Crores.",
      "Goodwill ₹70 Crores entirely."
    ],
    "correct": 0,
    "ref": "Ind AS 36 (Impairment of Assets) - Paragraphs 104-105: Allocation of Impairment Loss to CGU Assets",
    "explanation": "Under Ind AS 36.104, impairment loss of ₹70 Crores is first allocated to reduce Goodwill to zero (₹40 Crores). The remaining loss of ₹30 Crores is allocated pro-rata to other assets based on relative carrying amounts. However, under Paragraph 105, the carrying amount of an asset cannot be reduced below the highest of its fair value less costs of disposal (₹115 Cr for Building), value in use, or zero. Thus, Building can only absorb ₹5 Crores (₹120 Cr - ₹115 Cr). The unallocated balance of ₹25 Crores (₹30 Cr - ₹5 Cr) must be absorbed entirely by Plant & Equipment.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1013,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final May 2024 PYQ] Ind AS 102 - Share-Based Payment Modification",
    "question": "On 1st April 2022, an entity granted 100 Share Appreciation Rights (SARs) to each of its 500 employees, conditional on 3 years of service (vesting date 31st March 2025). On 1st April 2023, the entity modifies the scheme: it cancels the SARs and in their place grants 100 equity-settled share options with the same remaining 2-year vesting period. At modification date, the fair value of each SAR is ₹45 (total liability recognized at that date = ₹7.5 Lakhs based on Year 1 service), and the fair value of each replacement share option is ₹55. How is this modification accounted for under Ind AS 102?",
    "options": [
      "Derecognize the liability of ₹7.5 Lakhs and credit Equity for ₹7.5 Lakhs; recognize the incremental fair value of ₹10 per option pro-rata over the remaining 2-year vesting period in P&L and Equity.",
      "Charge the entire ₹55 fair value immediately to Profit & Loss as an acceleration of vesting.",
      "Continue accounting for the scheme as a cash-settled plan until final settlement.",
      "Recognize no further expense as the plan is treated as an equity exchange."
    ],
    "correct": 0,
    "ref": "Ind AS 102 (Share-based Payment) - Paragraph B44A: Modification from Cash-Settled to Equity-Settled",
    "explanation": "Under Ind AS 102.B44A, when a cash-settled share-based payment is modified to equity-settled: (a) the equity-settled award is measured at its modification-date fair value (₹55); (b) the liability is derecognized at its modification-date carrying value (₹7.5 Lakhs) and reclassified to equity; (c) the difference between the fair value of the equity award for past service (₹55 × 1/3 × 50,000 = ₹9.17 Lakhs) and the liability derecognized (₹7.5 Lakhs) is recognized in P&L immediately, and the remaining fair value is recognized over the remaining 2-year vesting period.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1014,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Ind AS 113 - Highest and Best Use",
    "question": "Ganga Properties Ltd. holds a parcel of land in an industrial park with an existing warehouse. The land and warehouse have a fair value of ₹25 Crores if used in its current industrial operation. However, municipal authorities have recently rezoned the area for high-density luxury residential development. If redeveloped for residential use, the land would have a gross fair value of ₹55 Crores, but demolition and redevelopment costs are ₹12 Crores, and a regulatory conversion fee of ₹5 Crores must be paid. Under Ind AS 113, what is the fair value of the land?",
    "options": [
      "₹25.00 Crores based on current use as an active industrial facility.",
      "₹38.00 Crores [Highest and best use: ₹55 Cr gross value - ₹12 Cr demolition - ₹5 Cr conversion fee = ₹38 Crores].",
      "₹55.00 Crores without deduction of redevelopment costs.",
      "₹40.00 Crores based on discounted cash flow of residential sales."
    ],
    "correct": 1,
    "ref": "Ind AS 113 (Fair Value Measurement) - Paragraphs 27-31: Highest and Best Use for Non-Financial Assets",
    "explanation": "Under Ind AS 113.27, a fair value measurement of a non-financial asset takes into account a market participant's ability to generate economic benefits by using the asset in its highest and best use. The residential redevelopment is physically possible, legally permissible, and financially feasible. The fair value under highest and best use is ₹55 Crores less the costs to market participants to convert the property (demolition ₹12 Cr + conversion fee ₹5 Cr) = ₹38.00 Crores.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1015,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final May 2023 PYQ] Ind AS 21 - Functional Currency & Translation",
    "question": "An Indian parent company (INR functional currency) has an overseas subsidiary in Dubai (UAE). The subsidiary sells goods imported from the Indian parent (priced in USD), its day-to-day operating expenses are paid in AED, but 85% of its sales proceeds are invoiced in USD and remitted directly to the parent in INR without local reinvestment. Management contends AED is the functional currency because it is incorporated in UAE. Evaluating this under Ind AS 21, which statement is correct?",
    "options": [
      "AED must be the functional currency because local statutory records are maintained in AED.",
      "USD/INR is the functional currency because the subsidiary operates as an extension of the parent rather than with significant local autonomy, and the currency that primarily influences sales prices and cash flows is USD/INR.",
      "The entity can choose any currency as its functional currency as long as it is applied consistently.",
      "Euro must be used as an international benchmark."
    ],
    "correct": 1,
    "ref": "Ind AS 21 (The Effects of Changes in Foreign Exchange Rates) - Paragraphs 9-11: Functional Currency Indicators",
    "explanation": "Under Ind AS 21.9-11, functional currency is determined based on the primary economic environment in which the entity operates (the currency that mainly influences sales prices, labor, and material costs). When a foreign operation's activities are carried out as an extension of the reporting entity rather than with significant autonomy (e.g. sales proceeds are predominantly in USD and remitted to the parent), its functional currency is that of the parent or the currency influencing its pricing (USD/INR), regardless of the country of incorporation.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1016,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Ind AS 101 - First-Time Adoption Deemed Cost",
    "question": "Pioneer Ltd. transitions to Ind AS with a transition date of 1st April 2023. Under previous Indian GAAP, its factory building was carried at ₹80 Crores (historical cost ₹50 Crores, revaluation reserve ₹30 Crores). On 1st April 2023, the fair value of the factory building is ₹110 Crores. Pioneer elects to use the fair value as deemed cost under Ind AS 101.D5. How should the transition adjustment be recognized?",
    "options": [
      "Credit Revaluation Reserve for ₹30 Crores in Equity.",
      "Recognize the factory building at ₹110 Crores, derecognize the previous GAAP Revaluation Reserve of ₹30 Crores, and credit the entire net surplus of ₹60 Crores (₹110 Cr - ₹50 Cr historical cost) to Retained Earnings on transition date.",
      "Recognize a gain of ₹30 Crores in Profit & Loss for the transition year.",
      "Retain previous GAAP carrying amount of ₹80 Crores without adjustment."
    ],
    "correct": 1,
    "ref": "Ind AS 101 (First-Time Adoption of Ind AS) - Paragraph D5 & D7: Fair Value as Deemed Cost",
    "explanation": "Under Ind AS 101.D5, a first-time adopter may elect to measure an item of property, plant, and equipment at the date of transition to Ind AS at its fair value and use that fair value as its deemed cost. All transition adjustments arising from the difference between the carrying amount under previous GAAP and Ind AS are recognized directly in Retained Earnings (or another category of equity) at the date of transition. Previous GAAP revaluation reserve is reversed to Retained Earnings.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1017,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final May 2024 PYQ] Ind AS 37 - Decommissioning Provision & Unwinding",
    "question": "On 1st April 2023, Bharat Petroleum Ltd. commissions an offshore oil drilling rig at a construction cost of ₹400 Crores. The company has a statutory obligation to dismantle and restore the seabed at the end of its 20-year operational life. Estimated decommissioning cost in 20 years is ₹100 Crores. The risk-adjusted discount rate is 8% per annum (PV factor for 20 years at 8% = 0.2145). What is the total depreciation and finance expense to be recognized for FY 2023-24 under Ind AS 16 / Ind AS 37?",
    "options": [
      "Depreciation = ₹20.00 Crores; Finance Expense = ₹0.",
      "Depreciation = ₹21.07 Crores [(₹400 Cr + ₹21.45 Cr provision) / 20 yrs]; Finance Expense (unwinding of discount) = ₹1.72 Crores [8% of ₹21.45 Cr provision] recognized in Profit & Loss.",
      "Depreciation = ₹20.00 Crores; Decommissioning cost of ₹100 Crores charged directly to P&L in Year 20.",
      "Finance expense = ₹8.00 Crores; Depreciation = ₹25.00 Crores."
    ],
    "correct": 1,
    "ref": "Ind AS 37 (Provisions) & Ind AS 16 (Property, Plant and Equipment) - Paragraph 16(c): Decommissioning Liabilities",
    "explanation": "Under Ind AS 16.16(c), the initial estimate of the costs of dismantling and restoring the site is included in the cost of the asset. Present value of decommissioning obligation = ₹100 Cr × 0.2145 = ₹21.45 Crores. Total initial cost of rig = ₹400 Cr + ₹21.45 Cr = ₹421.45 Crores. Straight-line depreciation for Year 1 = ₹421.45 Cr / 20 = ₹21.07 Crores. Under Ind AS 37.60, the increase in the carrying amount of a provision resulting from the passage of time is recognized as a finance expense: 8% × ₹21.45 Cr = ₹1.72 Crores.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1018,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Ind AS 20 - Government Below-Market Rate Loan",
    "question": "On 1st April 2023, Green Energy Ltd. receives an interest-free loan of ₹50 Crores from the Government for 3 years to set up a solar manufacturing unit. The market interest rate for similar corporate borrowings is 10% per annum (PV factor of ₹1 at 10% for 3 years = 0.7513; Annuity factor = 2.4869). How should Green Energy Ltd. recognize the loan and the government grant under Ind AS 20 and Ind AS 109?",
    "options": [
      "Recognize loan at ₹50 Crores; no government grant is recorded as interest rate is zero.",
      "Recognize financial liability at present value of ₹37.57 Crores (₹50 Cr × 0.7513); recognize Government Grant of ₹12.43 Crores as deferred income to be recognized in P&L on a systematic basis over the loan period matching finance cost.",
      "Recognize Government Grant of ₹50 Crores immediately in P&L.",
      "Credit ₹12.43 Crores to capital reserve under Equity."
    ],
    "correct": 1,
    "ref": "Ind AS 20 (Accounting for Government Grants) Paragraph 10A & Ind AS 109: Below-Market Rate Government Loans",
    "explanation": "Under Ind AS 20.10A and Ind AS 109, the benefit of a government loan at a below-market rate of interest is treated as a government grant. The loan is recognized and measured at fair value under Ind AS 109 = Present value of ₹50 Crores at 10% market rate for 3 years = ₹50 Cr × 0.7513 = ₹37.57 Crores. The benefit of the below-market rate (₹50 Cr - ₹37.57 Cr = ₹12.43 Crores) is recognized as a government grant (deferred income) and amortized to P&L over the 3 years to offset the 10% effective interest expense.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1019,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final May 2023 PYQ] Ind AS 108 - Operating Segments 75% Rule",
    "question": "A diversified conglomerate has 8 operating segments. Management identifies 3 reportable segments under the 10% quantitative thresholds, whose external revenues are: Segment A = ₹350 Cr, Segment B = ₹200 Cr, Segment C = ₹150 Cr (Total reportable external revenue = ₹700 Cr). The total consolidated external revenue of the entire entity is ₹1,000 Crores. Under the 75% external revenue rule of Ind AS 108.15, what action is mandatory for management?",
    "options": [
      "No action needed as the 3 segments satisfy the 10% quantitative test.",
      "Management must identify additional operating segments as reportable segments (even if they do not meet the 10% thresholds) until at least 75% (₹750 Crores) of the entity's consolidated external revenue is included in reportable segments.",
      "Management must merge Segments A, B, and C into one mega segment.",
      "The remaining segments must be disclosed under Other Comprehensive Income."
    ],
    "correct": 1,
    "ref": "Ind AS 108 (Operating Segments) - Paragraph 15: The 75% External Revenue Test",
    "explanation": "Under Ind AS 108.15, if the total external revenue reported by operating segments constitutes less than 75% of the entity's total revenue, additional operating segments must be identified as reportable segments (even if they do not meet the 10% quantitative thresholds in paragraph 13) until at least 75% of the entity's revenue is included in reportable segments. Here ₹700 Cr is only 70% (<75%), so additional segments must be designated as reportable.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 1020,
    "chapter": 1,
    "chapterTitle": "Paper 1: Financial Reporting (Ind AS)",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Ind AS 115 - Principal versus Agent Consideration",
    "question": "CloudSoft Ltd. operates an online marketplace for business software. Under the contract with software developer DevCorp, customers purchase software licenses on CloudSoft's portal for ₹10,000. CloudSoft remits ₹8,500 to DevCorp and retains a commission of ₹1,500. DevCorp is responsible for software functionality, bug fixes, and customer fulfillment, while CloudSoft provides payment processing and website hosting. Evaluating this under Ind AS 115 Paragraphs B34-B38, how should CloudSoft present revenue?",
    "options": [
      "Gross revenue of ₹10,000 as Principal, with ₹8,500 recorded as software cost of sales.",
      "Net revenue of ₹1,500 as Agent, because CloudSoft does not control the software license before it is transferred to the customer and does not bear primary fulfillment risk or inventory risk.",
      "Gross revenue of ₹10,000 in P&L and ₹1,500 in OCI.",
      "Deferred revenue of ₹10,000 amortized over the software life."
    ],
    "correct": 1,
    "ref": "Ind AS 115 (Revenue from Contracts with Customers) - Paragraphs B34-B38: Principal versus Agent Considerations",
    "explanation": "Under Ind AS 115.B34-B38, an entity is an agent if its performance obligation is to arrange for the provision of the specified good or service by another party. Because CloudSoft does not control the software license before transfer, does not bear primary responsibility for fulfillment, and does not have inventory risk, it acts as an Agent. Therefore, CloudSoft must recognize revenue on a NET basis equal to the commission of ₹1,500.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  }
];

// Write Paper 1 FR questions
const p1Path = path.join(dataDir, 'group1_paper1_fr_pyq.json');
fs.writeFileSync(p1Path, JSON.stringify(paper1_fr_questions, null, 2), 'utf8');
console.log(`Created: ${p1Path} (20 questions)`);

