const fs = require('fs');
const path = require('path');

const frDir = path.join(__dirname, '..', 'data', 'fr');

function makeQ(id, topicId, topicTitle, tag, question, options, correct, ref, explanation) {
  return {
    id,
    subject: "Financial Reporting",
    paper: 1,
    topicId,
    topicTitle,
    tag: tag.startsWith('[ICAI') ? tag : `[ICAI CA Final FR PYQ] ${tag}`,
    question,
    options,
    correct,
    ref,
    explanation,
    difficulty: "Difficult",
    type: "Case-Based PYQ",
    isCaseBased: true,
    timeLimitMinutes: 15,
    marks: 2
  };
}

// =========================================================================
// TOPIC 5: Leases, Employee Benefits, Share-Based Payments, and Income Taxes (20 Questions)
// =========================================================================
const t5Qs = [
  makeQ(501, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 116: Initial Measurement of Lease Liability & ROU Asset",
    "On 1st April 2023, Retail Hub Ltd. enters into a 5-year lease for commercial space with annual lease payments of ₹20,00,000 payable at the end of each financial year. The lessee's incremental borrowing rate is 10% per annum (Cumulative PV Factor for 5 years at 10% = 3.7908). Retail Hub Ltd. incurs initial direct costs of ₹2,00,000, receives a lease incentive of ₹1,00,000 from the lessor, and estimates site restoration costs of ₹3,00,000 (present value at 10% = ₹1,86,300). What are the initial carrying amounts of the Lease Liability and the Right-of-Use (ROU) Asset on 1st April 2023?",
    [
      "Lease Liability = ₹1,00,00,000; ROU Asset = ₹1,00,00,000.",
      "Lease Liability = ₹75,81,600 (PV of lease payments); ROU Asset = ₹78,67,900 (Lease liability ₹75,81,600 + Initial direct costs ₹2,00,000 - Lease incentive ₹1,00,000 + PV of restoration obligation ₹1,86,300).",
      "Lease Liability = ₹75,81,600; ROU Asset = ₹75,81,600.",
      "Lease Liability = ₹78,67,900; ROU Asset = ₹80,00,000."
    ],
    1,
    "Ind AS 116 (Leases) - Paragraphs 23-28: Initial Measurement of ROU Asset & Lease Liability",
    "Under Ind AS 116 Paragraph 26, the lease liability is measured at the present value of the lease payments that are not paid at the commencement date (₹20,00,000 × 3.7908 = ₹75,81,600). Under Paragraph 24, the cost of the ROU asset comprises: (a) initial measurement of lease liability (₹75,81,600); (b) lease payments made at or before commencement date less lease incentives received (-₹1,00,000); (c) initial direct costs incurred (₹2,00,000); and (d) estimated dismantling/restoration costs (₹1,86,300). Total ROU Asset = ₹78,67,900."
  ),

  makeQ(502, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 116: Sale and Leaseback Transaction",
    "Apex Logistics Ltd. sells its warehouse (carrying amount ₹40 Crores, fair value ₹60 Crores) to an institutional buyer for ₹60 Crores cash, and simultaneously leases it back for 10 years at market rental. The transfer of the warehouse qualifies as a sale under Ind AS 115. The present value of the annual lease payments is ₹20 Crores. What is the initial carrying amount of the ROU Asset retained by Apex Logistics and the gain on sale recognized in Profit or Loss under Ind AS 116?",
    [
      "ROU Asset = ₹20 Crores; Gain on sale = ₹20 Crores.",
      "ROU Asset = ₹13.33 Crores (Carrying amount ₹40 Cr × PV of leaseback ₹20 Cr / Fair value ₹60 Cr); Gain on sale recognized in P&L = ₹13.33 Crores (Total gain ₹20 Cr × Proportion relating to rights transferred: (₹60 Cr - ₹20 Cr) / ₹60 Cr = 66.67%).",
      "ROU Asset = ₹40 Crores; Gain on sale = Nil.",
      "ROU Asset = ₹60 Crores; Gain on sale = ₹20 Crores."
    ],
    1,
    "Ind AS 116 - Paragraphs 98-102: Sale and Leaseback Transactions",
    "Under Ind AS 116 Paragraph 100, if the transfer of an asset by the seller-lessee satisfies the requirements of Ind AS 115 to be accounted for as a sale, the seller-lessee shall measure the ROU asset arising from the leaseback at the proportion of the previous carrying amount of the asset that relates to the right of use retained by the seller-lessee: ₹40 Cr × (₹20 Cr / ₹60 Cr) = ₹13.33 Crores. The seller-lessee recognizes only the amount of any gain or loss that relates to the rights transferred to the buyer-lessor: (₹60 Cr - ₹40 Cr) × [(₹60 Cr - ₹20 Cr) / ₹60 Cr] = ₹20 Cr × 2/3 = ₹13.33 Crores in P&L."
  ),

  makeQ(503, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 19: Defined Benefit Plans - Actuarial Gains and Losses",
    "During FY 2023-24, Zenith Ltd. obtained an actuarial valuation for its employee gratuity scheme under Ind AS 19. The valuation showed: Current Service Cost = ₹15 Crores; Net Interest Expense on Defined Benefit Liability = ₹5 Crores; Past Service Cost arising from plan amendment = ₹3 Crores; and Actuarial Loss arising from changes in demographic and financial assumptions = ₹8 Crores. Where should these components be recognized?",
    [
      "All ₹31 Crores must be recognized in the Statement of Profit and Loss.",
      "Service cost (₹15 Cr Current + ₹3 Cr Past = ₹18 Cr) and Net Interest (₹5 Cr) totaling ₹23 Crores are recognized in Profit and Loss; the Actuarial Loss of ₹8 Crores (remeasurement) is recognized in Other Comprehensive Income (OCI) and cannot be reclassified to profit or loss in subsequent periods.",
      "All ₹31 Crores must be recognized in Other Comprehensive Income.",
      "Actuarial loss is amortized over the remaining average service life using the corridor approach."
    ],
    1,
    "Ind AS 19 (Employee Benefits) - Paragraphs 57, 120-122: Remeasurements in OCI",
    "Ind AS 19 Paragraph 120 mandates that an entity shall recognize the components of defined benefit cost as follows: (a) service cost (current service cost, past service cost, and gain/loss on settlement) in profit or loss; (b) net interest on the net defined benefit liability (asset) in profit or loss; and (c) remeasurements (actuarial gains and losses, return on plan assets excluding amounts in net interest) in Other Comprehensive Income. Remeasurements recognized in OCI shall not be reclassified to profit or loss."
  ),

  makeQ(504, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 19: Projected Unit Credit Method",
    "Which actuarial valuation method is mandatorily required under Ind AS 19 to determine the present value of defined benefit obligations and the related current service cost?",
    [
      "Entry Age Normal Method.",
      "Projected Unit Credit (PUC) Method (sometimes known as the accrued benefit method prorated on service or as the benefit/years of service method).",
      "Attained Age Normal Method.",
      "Aggregate Cost Method."
    ],
    1,
    "Ind AS 19 - Paragraph 67: Projected Unit Credit Method",
    "Ind AS 19 Paragraph 67 states explicitly: 'An entity shall use the projected unit credit method to determine the present value of its defined benefit obligations and the related current service cost and, where applicable, past service cost.' This method sees each period of service as giving rise to an additional unit of benefit entitlement and measures each unit separately."
  ),

  makeQ(505, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 102: Equity-Settled vs Cash-Settled Share-Based Payments",
    "What is the fundamental difference in measurement and balance sheet presentation between an Equity-Settled Share-Based Payment (e.g. ESOP) and a Cash-Settled Share-Based Payment (e.g. Share Appreciation Rights - SARs) under Ind AS 102?",
    [
      "Equity-settled awards are measured at fair value on each reporting date and presented as liabilities; cash-settled awards are measured at grant date and presented in equity.",
      "Equity-settled awards are measured at fair value at grant date and recognized in equity without subsequent remeasurement for share price changes; cash-settled awards are measured at fair value at each reporting date until settlement, with changes in fair value recognized in profit or loss and presented as a financial liability.",
      "Both are recognized strictly when shares or cash are physically distributed to employees.",
      "Cash-settled awards are expensed only if market conditions are satisfied."
    ],
    1,
    "Ind AS 102 (Share-based Payment) - Paragraphs 10-13 & 30-33",
    "Under Ind AS 102, for equity-settled transactions, the fair value of goods or services received is measured by reference to the fair value of equity instruments granted at grant date, credited to Equity, and never subsequently remeasured for changes in market prices. For cash-settled transactions, the entity measures the goods or services acquired and the liability incurred at the fair value of the liability at each reporting date until settlement, with changes in fair value recognized in profit or loss."
  ),

  makeQ(506, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 102: Non-Market vs Market Performance Conditions",
    "On 1st April 2023, TechNova Ltd. grants 10,000 share options to its VP. The options vest in 3 years provided: (Condition A) company EPS grows by 12% per annum (non-market condition); and (Condition B) company stock price reaches ₹500 on the National Stock Exchange (market condition). How are market and non-market vesting conditions factored into accounting under Ind AS 102?",
    [
      "Both conditions are ignored until the 3-year vesting date arrives.",
      "Market conditions (stock price target) are taken into account when estimating the grant-date fair value of the options and are not subsequently adjusted whether the condition is met or not; non-market conditions (EPS growth) are NOT taken into account in estimating grant-date fair value, but are taken into account by adjusting the number of equity instruments expected to vest.",
      "Non-market conditions are factored into fair value, while market conditions are adjusted in number of options.",
      "If the market condition fails, all previously recognized compensation expense is reversed."
    ],
    1,
    "Ind AS 102 - Paragraphs 19-21: Market and Non-Market Vesting Conditions",
    "Under Ind AS 102 Paragraph 19, vesting conditions other than market conditions (such as service conditions and performance conditions like EPS/profit targets) shall not be taken into account when estimating the fair value of the shares or options at the measurement date. Instead, they are taken into account by adjusting the number of equity instruments included in the measurement. Under Paragraph 21, market conditions (such as a target share price) shall be taken into account when estimating the fair value of the equity instruments granted."
  ),

  makeQ(507, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 12: Tax Base of Depreciable Asset & Temporary Difference",
    "On 1st April 2023, Bharat Forgings Ltd. acquired machinery for ₹100 Crores. For financial accounting, the machinery is depreciated over 5 years on a straight-line basis (depreciation ₹20 Crores/year). For income tax purposes, tax depreciation is 30% on written down value (tax depreciation ₹30 Crores for Year 1). The applicable income tax rate is 25%. What is the deferred tax position as of 31st March 2024 under Ind AS 12?",
    [
      "Carrying amount = ₹80 Cr; Tax base = ₹70 Cr; Taxable temporary difference = ₹10 Cr; Deferred Tax Liability (DTL) = ₹2.5 Crores.",
      "Carrying amount = ₹80 Cr; Tax base = ₹70 Cr; Deductible temporary difference = ₹10 Cr; Deferred Tax Asset (DTA) = ₹2.5 Crores.",
      "No deferred tax arises because both books and tax will eventually equalize.",
      "Deferred Tax Liability = ₹10 Crores."
    ],
    0,
    "Ind AS 12 (Income Taxes) - Paragraphs 5-15: Taxable Temporary Differences and DTL",
    "Carrying amount of machine in financial statements = ₹100 Cr - ₹20 Cr = ₹80 Crores. Tax base of machine (amount deductible for tax purposes in future periods) = ₹100 Cr - ₹30 Cr = ₹70 Crores. Because carrying amount exceeds tax base (₹80 Cr > ₹70 Cr), it gives rise to a taxable temporary difference of ₹10 Crores. Deferred Tax Liability = ₹10 Crores × 25% = ₹2.5 Crores recognized in Profit or Loss as deferred tax expense."
  ),

  makeQ(508, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 12: Unused Tax Losses and Recognition of DTA",
    "SolarTech Ltd. incurred an operating tax loss of ₹40 Crores in FY 2023-24 which can be carried forward for 8 years under the Income Tax Act. Management forecasts show that due to guaranteed power purchase agreements (PPAs), future taxable profits of ₹60 Crores are probable over the next 3 years against which the losses can be utilized. Applicable tax rate is 30%. Under Ind AS 12, can a Deferred Tax Asset (DTA) be recognized?",
    [
      "No, DTA can never be recognized on unused tax losses under Ind AS.",
      "Yes, a Deferred Tax Asset of ₹12 Crores (₹40 Crores × 30%) should be recognized to the extent that it is probable that future taxable profit will be available against which the unused tax losses can be utilized.",
      "A DTA of ₹18 Crores (₹60 Crores × 30%) should be recognized.",
      "The tax loss must be recognized directly in OCI."
    ],
    1,
    "Ind AS 12 - Paragraphs 34-36: Recognition of Deferred Tax Assets for Unused Tax Losses",
    "Ind AS 12 Paragraph 34 states: 'A deferred tax asset shall be recognized for the carryforward of unused tax losses and unused tax credits to the extent that it is probable that future taxable profit will be available against which the unused tax losses and unused tax credits can be utilized.' Here, probable future taxable profits of ₹60 Cr easily absorb the ₹40 Cr loss; hence full DTA of ₹40 Cr × 30% = ₹12 Crores is recognized."
  ),

  makeQ(509, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 116: Short-Term Lease & Low-Value Asset Exemptions",
    "Which of the following leases qualifies for the optional recognition exemption under Ind AS 116, permitting the lessee to recognize lease payments as an operating expense on a straight-line basis without recognizing an ROU Asset and Lease Liability?",
    [
      "A 5-year lease of commercial headquarters building.",
      "A 9-month lease of heavy earthmoving machinery with an option to purchase at an attractive price which the lessee is reasonably certain to exercise.",
      "A 10-month lease of warehouse space with no purchase option (short-term lease) or a lease of IT tablets/laptops with brand-new value under ₹3.5 Lakhs (low-value assets).",
      "A 3-year vehicle fleet lease."
    ],
    2,
    "Ind AS 116 - Paragraphs 5-8: Recognition Exemptions for Leases",
    "Under Ind AS 116 Paragraph 5, a lessee may elect not to apply the standard ROU model to: (a) short-term leases (lease term of 12 months or less and containing no purchase option); and (b) leases for which the underlying asset is of low value (e.g. personal computers, office furniture). If an entity elects either exemption, lease payments are recognized as an expense on either a straight-line basis over the lease term or another systematic basis."
  ),

  makeQ(510, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 12: Substantively Enacted Tax Rates",
    "On 31st March 2024, the prevailing corporate income tax rate is 30%. On 15th March 2024, the Parliament passed the Finance Act 2024, which received Presidential assent on 28th March 2024, lowering the tax rate to 25% effective for all future tax years beginning 1st April 2024. At what tax rate should temporary differences existing on 31st March 2024 be measured for deferred tax under Ind AS 12?",
    [
      "30%, because the 30% rate applied throughout the financial year 2023-24.",
      "25%, because deferred tax assets and liabilities are measured at the tax rates that are expected to apply to the period when the asset is realized or the liability is settled, based on tax rates (and tax laws) that have been enacted or substantively enacted by the end of the reporting period.",
      "Average rate of 27.5%.",
      "Deferred tax should not be recognized until 1st April 2024."
    ],
    1,
    "Ind AS 12 - Paragraph 47: Measurement of Deferred Tax at Enacted Tax Rates",
    "Ind AS 12 Paragraph 47 specifies: 'Deferred tax assets and liabilities shall be measured at the tax rates that are expected to apply to the period when the asset is realized or the liability is settled, based on tax rates (and tax laws) that have been enacted or substantively enacted by the end of the reporting period.' Because the 25% rate was enacted by 31st March 2024 for future periods when temporary differences reverse, it must be used."
  ),

  makeQ(511, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 116: Lease Modification Decreasing Scope",
    "A lessee leases 2,000 sq. meters of office space for 10 years. In Year 6, the lessee and lessor agree to amend the contract to reduce the leased space to 1,000 sq. meters (50% reduction in scope) and proportionately reduce lease payments. How does the lessee account for this lease modification under Ind AS 116?",
    [
      "Account for it as a brand-new separate lease.",
      "Decrease the carrying amounts of both the ROU asset and lease liability by 50% to reflect the partial termination, and recognize any resulting difference as a gain or loss in Profit or Loss; then remeasure the remaining lease liability using a revised discount rate at the effective modification date with a corresponding adjustment to the remaining ROU asset.",
      "Recognize the entire remaining ROU asset as an impairment loss.",
      "No accounting entry is made until the end of year 10."
    ],
    1,
    "Ind AS 116 - Paragraph 45: Lease Modification Decreasing the Scope of a Lease",
    "Under Ind AS 116 Paragraph 45, for a lease modification that decreases the scope of a lease, the lessee shall decrease the carrying amount of the right-of-use asset to reflect the partial or full termination of the lease, and recognize in profit or loss any gain or loss relating to the partial or full termination. The remaining lease liability is then remeasured using a revised discount rate with an adjustment to the ROU asset."
  ),

  makeQ(512, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 19: Past Service Cost Recognition",
    "On 1st October 2023, Delta Ltd. improved its retirement pension plan by increasing employee pension multipliers retroactively for past service completed prior to 1st October 2023. The present value of the resulting increase in defined benefit obligation for unvested benefits is ₹10 Crores (vesting period 5 years), and for vested benefits is ₹15 Crores. How must Delta Ltd. recognize this past service cost under Ind AS 19?",
    [
      "Expense ₹15 Crores (vested) immediately and amortize ₹10 Crores (unvested) over 5 years.",
      "Recognize the entire ₹25 Crores (both vested and unvested past service costs) immediately as an expense in Profit or Loss at the earlier of when the plan amendment occurs and when the entity recognizes related restructuring costs.",
      "Amortize all ₹25 Crores over the remaining working life of employees.",
      "Recognize all ₹25 Crores in Other Comprehensive Income."
    ],
    1,
    "Ind AS 19 - Paragraphs 102-103: Immediate Recognition of Past Service Cost",
    "Under Ind AS 19, past service cost (whether vested or unvested) must be recognized as an expense in profit or loss at the earlier of: (a) when the plan amendment or curtailment occurs; and (b) when the entity recognizes related restructuring costs under Ind AS 37 or termination benefits. Amortization of unvested past service cost is completely prohibited."
  ),

  makeQ(513, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 102: Cancellation and Settlement of Share Options",
    "During FY 2023-24, an entity cancels 5,000 equity-settled share options previously granted to directors (remaining unamortized grant-date fair value is ₹12 Lakhs). In compensation for the cancellation, the entity pays ₹15 Lakhs cash to the directors. The fair value of the options at the cancellation date was ₹14 Lakhs. How should this cancellation and cash settlement be accounted for under Ind AS 102?",
    [
      "Expense ₹15 Lakhs in P&L and credit Retained Earnings ₹12 Lakhs.",
      "Account for the cancellation as an acceleration of vesting: immediately recognize the remaining unamortized grant-date fair value of ₹12 Lakhs in Profit & Loss; the cash payment up to the cancellation-date fair value of ₹14 Lakhs is treated as a repurchase of an equity interest (deducted from equity), while the excess ₹1 Lakh (₹15L - ₹14L) is recognized as an additional expense in Profit & Loss.",
      "Credit ₹15 Lakhs to Share Capital.",
      "Reverse all past compensation expense recognized in prior years."
    ],
    1,
    "Ind AS 102 - Paragraph 28: Cancellations and Settlements of Equity-Settled Awards",
    "Ind AS 102 Paragraph 28 states that if a grant of equity instruments is cancelled or settled during the vesting period: (a) the entity shall account for the cancellation or settlement as an acceleration of vesting, recognizing immediately the amount that otherwise would have been recognized for services over the remainder of the vesting period; and (b) any payment made shall be accounted for as the repurchase of an equity interest (deducted from equity), except that the extent that the payment exceeds the fair value of the equity instruments at repurchase date shall be recognized as an expense."
  ),

  makeQ(514, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 12: Initial Recognition Exemption",
    "Under Ind AS 12, when is an entity prohibited from recognizing a deferred tax asset or liability on the initial recognition of an asset or liability (the 'Initial Recognition Exemption')?",
    [
      "Whenever the asset is acquired using borrowed funds.",
      "In a transaction that: (1) is not a business combination; (2) at the time of the transaction, affects neither accounting profit nor taxable profit (tax loss); and (3) does not give rise to equal taxable and deductible temporary differences at the time of the transaction.",
      "Only for transactions involving foreign currency exchange.",
      "Whenever the applicable tax rate is zero."
    ],
    1,
    "Ind AS 12 - Paragraphs 15 & 24: Initial Recognition Exemption",
    "Ind AS 12 prohibits recognizing a DTL/DTA on the initial recognition of an asset or liability in a transaction which: (a) is not a business combination; (b) at the time of the transaction, affects neither accounting profit nor taxable profit; and (c) at the time of the transaction, does not give rise to equal taxable and deductible temporary differences (narrow-scope amendment for leases and decommissioning)."
  ),

  makeQ(515, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 116: Variable Lease Payments Dependent on an Index vs Sales",
    "A retail chain leases an anchor shop in a mall. The lease agreement requires: (i) an annual base rental of ₹50 Lakhs adjusted annually for changes in the Consumer Price Index (CPI); and (ii) a turnover rent equal to 3% of the shop's monthly gross sales revenue. How are these two variable payments included in the initial measurement of the Lease Liability under Ind AS 116?",
    [
      "Both variable payments must be estimated based on 5-year sales and inflation forecasts and capitalized into the lease liability.",
      "Only variable lease payments that depend on an index or a rate (the CPI-linked base rent, measured using the index at commencement date) are included in the lease liability; variable payments based on sales/turnover are excluded from the lease liability and recognized as an expense in Profit or Loss in the period in which the triggering event or condition occurs.",
      "Both are excluded from the lease liability.",
      "Turnover rent is recognized in OCI."
    ],
    1,
    "Ind AS 116 - Paragraphs 27(b) & 38: Variable Lease Payments",
    "Ind AS 116 Paragraph 27(b) specifies that lease payments included in the measurement of the lease liability comprise variable lease payments that depend on an index or a rate, initially measured using the index or rate as at the commencement date. Variable lease payments linked to future sales or usage do not meet the definition of a liability until the sales occur, and are expensed in profit or loss as incurred."
  ),

  makeQ(516, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 19: Asset Ceiling in Defined Benefit Plans",
    "On 31st March 2024, an entity's defined benefit plan has plan assets with a fair value of ₹120 Crores and a present value of defined benefit obligation of ₹90 Crores (gross surplus = ₹30 Crores). The present value of available future refunds from the plan plus reductions in future employer contributions is ₹18 Crores (the asset ceiling). Under Ind AS 19, what net defined benefit asset should be presented on the balance sheet?",
    [
      "₹30 Crores (full gross surplus).",
      "₹18 Crores (net defined benefit asset is measured at the lower of the surplus in the defined benefit plan ₹30 Cr and the asset ceiling ₹18 Cr; the ₹12 Cr excess is recognized in OCI as an effect of the asset ceiling).",
      "₹0, defined benefit assets are never recognized.",
      "₹108 Crores."
    ],
    1,
    "Ind AS 19 - Paragraph 64: Asset Ceiling for Defined Benefit Asset",
    "Under Ind AS 19 Paragraph 64, when an entity has a surplus in a defined benefit plan, it shall measure the net defined benefit asset at the lower of: (a) the surplus in the defined benefit plan; and (b) the asset ceiling, determined using the discount rate. Any reduction in the net asset due to the asset ceiling is recognized in Other Comprehensive Income."
  ),

  makeQ(517, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 102: Graded Vesting Attribution",
    "On 1st April 2023, an entity grants 90,000 share options to its managers. The grant vests in three equal tranches: 30,000 options after 1 year, 30,000 options after 2 years, and 30,000 options after 3 years. Under Ind AS 102, can the entity recognize the total compensation expense straight-line over the full 3-year period?",
    [
      "Yes, straight-line spreading over the maximum 3-year term is mandatory.",
      "No, Ind AS 102 explicitly mandates that each tranche must be treated as a separate share option grant with its own distinct vesting period and fair value; compensation expense for each tranche must be recognized separately over its respective service period (graded vesting attribution).",
      "Yes, provided it is disclosed in the Director's Report.",
      "Expense is recognized only when the third tranche vests."
    ],
    1,
    "Ind AS 102 - Paragraphs 15 & IG11: Graded Vesting Schedule",
    "Under Ind AS 102, where options vest in tranches (graded vesting), each tranche must be treated as a separate share-based payment award because each tranche has a different vesting period (1 year, 2 years, 3 years). An entity cannot treat the entire award as a single grant and spread the expense on a straight-line basis over 3 years; front-loaded graded vesting attribution is mandatory."
  ),

  makeQ(518, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 12: Business Combinations & Deferred Taxes",
    "Acquirer Ltd. acquires 100% of Target Ltd. in a business combination. In the purchase price allocation under Ind AS 103, an item of brand name is recognized at fair value of ₹50 Crores. For tax purposes, the tax base of the brand name is Nil (tax deductions are not available for brand amortization). Applicable tax rate is 30%. How should the deferred tax on this brand name be accounted for at acquisition date?",
    [
      "Recognize a Deferred Tax Liability of ₹15 Crores (₹50 Cr × 30%) with a corresponding debit to Profit or Loss.",
      "Recognize a Deferred Tax Liability of ₹15 Crores (₹50 Cr × 30%) with a corresponding debit to Goodwill (or credit to capital reserve) in the business combination accounting, because the initial recognition exemption does NOT apply to business combinations.",
      "No deferred tax is recognized under the initial recognition exemption.",
      "Recognize a Deferred Tax Asset of ₹15 Crores."
    ],
    1,
    "Ind AS 12 - Paragraphs 19 & 66: Deferred Taxes in Business Combinations",
    "Ind AS 12 Paragraph 19 states that taxable temporary differences arise in a business combination when the fair values of identifiable assets acquired exceed their tax bases. Because the initial recognition exemption explicitly excludes business combinations, the entity recognizes a Deferred Tax Liability of ₹15 Crores with a corresponding increase to Goodwill (or reduction of bargain purchase gain)."
  ),

  makeQ(519, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 116: Sublease Classification by Intermediate Lessor",
    "Prime Properties Ltd. leases a commercial floor for 10 years (head lease). 2 years later, Prime Properties subleases the exact same floor to another corporate tenant for the remaining 8 years of the head lease. How should Prime Properties Ltd. (as the intermediate lessor) classify the sublease under Ind AS 116?",
    [
      "By reference to the underlying physical real estate property (which has an economic life of 60 years).",
      "By reference to the Right-of-Use (ROU) asset arising from the head lease (not by reference to the underlying physical asset); since the 8-year sublease is for the entire remaining term of the ROU asset, it is classified as a Finance Sublease, resulting in derecognition of the ROU asset and recognition of a Lease Receivable.",
      "Always as an operating lease.",
      "As an investment in property."
    ],
    1,
    "Ind AS 116 - Paragraph B58: Sublease Classification by Intermediate Lessor",
    "Under Ind AS 116 Paragraph B58, in classifying a sublease, an intermediate lessor shall classify the sublease as a finance lease or an operating lease by reference to the right-of-use asset arising from the head lease, rather than by reference to the underlying asset. Because the sublease covers the major part (100% of the remaining 8 years) of the ROU asset's life, it is a finance lease."
  ),

  makeQ(520, 5, "Leases, Employee Benefits, Share-Based Payments, and Income Taxes", "Ind AS 12: Current vs Non-Current Presentation of Deferred Taxes",
    "How does Ind AS 1 mandate the presentation of Deferred Tax Assets and Deferred Tax Liabilities on the Balance Sheet?",
    [
      "They must be bifurcated into Current and Non-Current portions based on expected reversal within 12 months.",
      "An entity shall NOT classify deferred tax assets (or deferred tax liabilities) as current assets (or current liabilities); they must always be presented as Non-Current Assets or Non-Current Liabilities.",
      "They must be presented under Cash and Cash Equivalents.",
      "They must be presented in the Statement of Changes in Equity."
    ],
    1,
    "Ind AS 1 - Paragraph 56: Mandatory Non-Current Presentation of Deferred Taxes",
    "Ind AS 1 Paragraph 56 states unequivocally: 'When an entity presents current and non-current assets, and current and non-current liabilities, as separate classifications in its balance sheet, it shall not classify deferred tax assets (liabilities) as current assets (liabilities).' Deferred tax assets and liabilities are strictly classified as non-current."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_5_leases_employee_sharebased_tax.json'), JSON.stringify(t5Qs, null, 2), 'utf8');
console.log('Saved Topic 5: 20 Questions');

// =========================================================================
// TOPIC 6: Provisions, Contingent Liabilities, and Events After the Reporting Period (Ind AS 37, 10) (20 Questions)
// =========================================================================
const t6Qs = [
  makeQ(601, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Restructuring Provision Criteria",
    "On 15th December 2023, the Board of Directors of AutoParts Ltd. resolved to shut down its unprofitable brake-shoe manufacturing division. Prior to 31st March 2024, the company prepared a detailed formal restructuring plan, identified the locations and affected 400 employees, and sent individual redundancy and termination letters to employees with severance compensation terms. How should this restructuring be accounted for in the financial statements for the year ended 31st March 2024?",
    [
      "Disclose strictly as a contingent liability in the notes, because no severance cash has been disbursed before year-end.",
      "Recognize a restructuring provision on 31st March 2024 for the direct expenditures arising from the restructuring (e.g. employee severance compensation), because the detailed formal plan and communication to affected employees created a valid constructive obligation.",
      "Recognize a provision for both employee severance and anticipated future operating losses until complete closure.",
      "No provision or disclosure is permitted until operations cease."
    ],
    1,
    "Ind AS 37 (Provisions, Contingent Liabilities and Contingent Assets) - Paragraphs 70-83: Restructuring Provisions",
    "Under Ind AS 37 Paragraph 72, a constructive obligation to restructure arises only when an entity: (a) has a detailed formal plan; and (b) has raised a valid expectation in those affected that it will carry out the restructuring by starting to implement that plan or announcing its main features to those affected. However, under Paragraph 81, a restructuring provision shall include only the direct expenditures arising from restructuring, and excludes costs associated with ongoing activities and future operating losses."
  ),

  makeQ(602, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Exclusion of Future Operating Losses",
    "Due to the introduction of advanced competitive technology, management of Heritage Mills Ltd. projects that its traditional spinning division will incur operating losses of ₹15 Crores during FY 2024-25. Can management establish a provision for future operating losses of ₹15 Crores in the financial statements for FY 2023-24 under Ind AS 37?",
    [
      "Yes, prudence mandates recognizing anticipated future operating losses immediately.",
      "No, Ind AS 37 Paragraph 63 explicitly states that provisions shall not be recognized for future operating losses, because they do not meet the definition of a liability (no past event creating a present obligation) and the general recognition criteria.",
      "Yes, if approved by the Audit Committee.",
      "Permissible if credited to General Reserve."
    ],
    1,
    "Ind AS 37 - Paragraphs 63-65: Future Operating Losses",
    "Ind AS 37 Paragraph 63 states unequivocally: 'Provisions shall not be recognized for future operating losses.' Future operating losses do not meet the definition of a liability under the Conceptual Framework or Ind AS 37 because there is no present obligation resulting from a past event. An expectation of future operating losses is an indicator that certain assets of the operation may be impaired under Ind AS 36."
  ),

  makeQ(603, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Onerous Contract - Incremental Cost vs Cost of Fulfilling",
    "BuildFast Ltd. enters into a non-cancellable operating supply contract to supply 10,000 units of components at ₹100 each (total revenue ₹10,00,000). Due to raw material inflation, the direct incremental cost to manufacture the units is ₹12,00,000, and allocated factory overheads are ₹2,00,000 (total cost of fulfilling ₹14,00,000). The contractual penalty for terminating the contract without performance is ₹3,00,000. Under the revised Ind AS 37 amendments on onerous contracts, what is the provision for onerous contract to be recognized?",
    [
      "₹4,00,000 (Cost of fulfilling ₹14,00,000 minus revenue ₹10,00,000).",
      "₹3,00,000 (measured at the lower of the net cost of fulfilling the contract ₹4,00,000 and the penalty arising from failure to fulfill ₹3,00,000).",
      "₹2,00,000 (incremental cost ₹12,00,000 minus revenue ₹10,00,000).",
      "Zero provision because revenue is still positive."
    ],
    1,
    "Ind AS 37 - Paragraphs 66-69: Onerous Contracts & Definition of Cost of Fulfilling",
    "Ind AS 37 defines an onerous contract as a contract in which the unavoidable costs of meeting the obligations under the contract exceed the economic benefits expected to be received. The unavoidable costs under a contract reflect the least net cost of exiting from the contract, which is the lower of the cost of fulfilling it and any compensation or penalties arising from failure to fulfill it. Here, least net cost = Lower of (₹4,00,000 net fulfillment cost and ₹3,00,000 termination penalty) = ₹3,00,000."
  ),

  makeQ(604, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Reimbursements & Third-Party Claims",
    "Chemicals India Ltd. faces a product liability claim of ₹10 Crores on 31st March 2024. Legal experts confirm it is probable (70% likelihood) that the entity will be held liable for ₹10 Crores. Chemicals India Ltd. holds a comprehensive insurance policy with New India Assurance, and the insurer has formally confirmed in writing that it will reimburse 80% of any court-awarded damages up to ₹8 Crores. How should the provision and reimbursement be presented under Ind AS 37?",
    [
      "Present a net provision of ₹2 Crores in the balance sheet, with no other disclosure.",
      "Recognize a gross provision of ₹10 Crores under liabilities on the balance sheet, and recognize a separate reimbursement asset of ₹8 Crores under assets (virtually certain of receipt); in the statement of profit and loss, the expense may be presented net of the reimbursement (₹2 Crores net expense).",
      "No provision is recognized because the insurance coverage covers the majority of the risk.",
      "Recognize an asset of ₹10 Crores and liability of ₹8 Crores."
    ],
    1,
    "Ind AS 37 - Paragraphs 53-54: Reimbursements by Third Parties",
    "Under Ind AS 37 Paragraph 53, where some or all of the expenditure required to settle a provision is expected to be reimbursed by another party, the reimbursement shall be recognized when, and only when, it is virtually certain that reimbursement will be received if the entity settles the obligation. The reimbursement shall be treated as a separate asset on the balance sheet (not exceeding provision amount). In the statement of profit and loss, the expense relating to a provision may be presented net of the amount recognized for a reimbursement."
  ),

  makeQ(605, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Contingent Assets Recognition Threshold",
    "Pharma Innovations Ltd. sued a competitor for patent infringement, claiming ₹50 Crores in damages. On 15th March 2024, the High Court ruled in Pharma Innovations' favour, awarding ₹40 Crores damages. On 25th March 2024, the competitor filed an appeal in the Supreme Court, and legal counsel advises that an inflow of economic benefits is 'probable' (65% likelihood) but not yet virtually certain until final disposal. How should Pharma Innovations Ltd. treat this matter on 31st March 2024 under Ind AS 37?",
    [
      "Recognize an asset and income of ₹40 Crores in Profit and Loss.",
      "Do NOT recognize an asset in the balance sheet; disclose the contingent asset in the notes to financial statements, because the inflow of economic benefits is probable.",
      "Recognize ₹40 Crores as Other Comprehensive Income.",
      "Omit all disclosures until the Supreme Court final judgment."
    ],
    1,
    "Ind AS 37 - Paragraphs 31-35: Contingent Assets",
    "Ind AS 37 Paragraph 31 states: 'An entity shall not recognize a contingent asset.' Contingent assets are not recognized in financial statements since this may result in the recognition of income that may never be realized. However, when the inflow of economic benefits is probable, an entity discloses a brief description of the contingent asset in the notes. Only when the realization of income is virtually certain is the related asset no longer a contingent asset and its recognition appropriate."
  ),

  makeQ(606, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 10: Adjusting Event - Insolvency of Customer Post Balance Sheet Date",
    "On 31st March 2024, Delta Traders had a trade receivable of ₹15 Lakhs due from retail customer Horizon Ltd. Horizon Ltd. had been operating normally. On 20th April 2024 (prior to the approval of financial statements by the Board on 25th May 2024), Horizon Ltd. was declared insolvent by the NCLT due to financial deterioration that had been worsening over the past year. Is this an adjusting or non-adjusting event under Ind AS 10?",
    [
      "Non-adjusting event, because insolvency was formally declared after 31st March 2024.",
      "Adjusting event, because the bankruptcy of a customer that occurs after the reporting period usually confirms that the customer was in financial distress and credit-impaired at the end of the reporting period; Delta Traders must adjust the carrying amount of the trade receivable on 31st March 2024 by recognizing an expected credit loss/bad debt provision.",
      "Adjusting event only if Horizon Ltd. is a related party.",
      "Disclosed as a contingent asset."
    ],
    1,
    "Ind AS 10 (Events After the Reporting Period) - Paragraph 9(b)(i): Bankruptcy of Customer as Adjusting Event",
    "Ind AS 10 Paragraph 9(b)(i) explicitly cites as an example of an adjusting event: 'The bankruptcy of a customer that occurs after the reporting period usually confirms that the customer was credit-impaired at the end of the reporting period, and that the entity needs to adjust the carrying amount of the trade receivable.' Financial statements for FY 2023-24 must be adjusted."
  ),

  makeQ(607, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 10: Non-Adjusting Event - Fire / Destruction of Plant",
    "On 10th April 2024 (after the reporting date of 31st March 2024, but before approval of financial statements by the Board on 20th May 2024), an accidental fire completely destroyed a major manufacturing warehouse of Zenith Ltd., causing an uninsured inventory loss of ₹20 Crores. The going concern of Zenith Ltd. is NOT impaired. How should this fire loss be reported in the financial statements for the year ended 31st March 2024?",
    [
      "Adjust the balance sheet as of 31st March 2024 by writing down inventory by ₹20 Crores.",
      "It is a Non-Adjusting Event, because the fire occurred after the reporting period and does not relate to conditions that existed on 31st March 2024; no adjustment is made to the balance sheet, but details and estimated financial effect must be disclosed in the notes to financial statements.",
      "Ignore completely in FY 2023-24 financial statements.",
      "Recognize an exceptional expense in OCI for FY 2023-24."
    ],
    1,
    "Ind AS 10 - Paragraph 10 & Paragraph 22(d): Non-Adjusting Events",
    "Under Ind AS 10, non-adjusting events are those that are indicative of conditions that arose after the reporting period. Paragraph 22(d) explicitly provides 'the destruction of a major production plant by a fire after the reporting period' as an example of a non-adjusting event. If material, non-adjusting events do not alter balance sheet figures, but require disclosure of the nature of the event and an estimate of its financial effect."
  ),

  makeQ(608, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 10: Dividends Declared After Reporting Period",
    "On 15th May 2024, the Board of Directors of Infosys Ltd. proposed a final dividend of ₹15 per equity share (total payout ₹600 Crores) for the financial year ended 31st March 2024. The dividend is subject to approval by shareholders at the forthcoming Annual General Meeting (AGM) in July 2024. How should the proposed dividend be accounted for in the financial statements for the year ended 31st March 2024 under Ind AS 10 and Ind AS 1?",
    [
      "Recognized as a Current Liability on the balance sheet as of 31st March 2024.",
      "Not recognized as a liability on the balance sheet as of 31st March 2024 because no obligation existed at the reporting date; disclosed in the notes to financial statements in accordance with Ind AS 1.",
      "Deducted directly from Cash and Cash Equivalents on 31st March 2024.",
      "Recognized in Other Comprehensive Income."
    ],
    1,
    "Ind AS 10 - Paragraphs 12-13 & Ind AS 1 Paragraph 137: Dividends Declared After Reporting Period",
    "Ind AS 10 Paragraph 12 states: 'If an entity declares dividends to holders of equity instruments after the reporting period, the entity shall not recognize those dividends as a liability at the end of the reporting period.' Because they do not meet the criteria of a present obligation on the balance sheet date, proposed dividends are disclosed in the notes."
  ),

  makeQ(609, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 10: Deterioration in Operating Results and Going Concern",
    "Between 31st March 2024 and 10th May 2024 (prior to the signing of the audit report), global commodity prices crashed by 80%, causing the sole operating refinery of Petroworks Ltd. to become unviable. The Board resolved to cease operations and liquidate the company in June 2024. How does this event affect the financial statements for the year ended 31st March 2024 under Ind AS 10?",
    [
      "It is a non-adjusting event because the market price collapse occurred in April/May 2024; disclose in notes only.",
      "It overrides the normal non-adjusting classification: Ind AS 10 mandates that an entity shall NOT prepare its financial statements on a going concern basis if management determines after the reporting period that it intends to liquidate the entity or cease trading; financial statements for FY 2023-24 must be prepared on a non-going concern (liquidation/realizable value) basis.",
      "Prepare financial statements on a going concern basis with a qualified audit report.",
      "Defer financial reporting indefinitely."
    ],
    1,
    "Ind AS 10 - Paragraphs 14-16: Going Concern Overrides Normal Rules",
    "Ind AS 10 Paragraph 14 states: 'An entity shall not prepare its financial statements on a going concern basis if management determines after the reporting period either that it intends to liquidate the entity or to cease trading, or that it has no realistic alternative but to do so.' A deterioration in operating results and financial position after the reporting period that causes the going concern assumption to fail requires a fundamental change in the basis of accounting."
  ),

  makeQ(610, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Environmental Clean-Up Constructive Obligation",
    "EcoMining Ltd. causes river pollution during FY 2023-24 in a remote jurisdiction where environmental laws do not penalize river siltation. However, EcoMining has a widely published Global Environmental Charter stating 'We restore 100% of riverbeds impacted by our mining', and has established a track record of cleaning every mine site for the last 15 years. Environmental consultants estimate cleanup will cost ₹12 Crores in 3 years (present value ₹9.5 Crores). Should a provision be recognized on 31st March 2024?",
    [
      "No, because there is no legal obligation enforceable in local courts.",
      "Yes, a provision of ₹9.5 Crores must be recognized because the published charter and past conduct have created a valid constructive obligation, leaving the entity with no realistic alternative but to settle the obligation.",
      "Disclose strictly as a contingent liability.",
      "Recognize an expense when the ₹12 Crores cash is spent in Year 3."
    ],
    1,
    "Ind AS 37 - Paragraphs 14, 17 & Appendix A Example 2B",
    "Ind AS 37 states that an obligating event is an event that creates a legal or constructive obligation that results in an entity having no realistic alternative to settling that obligation. A constructive obligation arises from published policies and past practice that create a valid expectation in third parties. The present value of ₹9.5 Crores must be recognized as a provision."
  ),

  makeQ(611, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Measurement of Provision - Large Population vs Single Obligation",
    "Star Consumer Electronics sells 1,00,000 television sets with a 1-year warranty. Based on past experience: 80% have zero defects; 15% develop minor defects (repair cost ₹1,000 each = ₹1.5 Crores); and 5% develop major defects (repair cost ₹5,000 each = ₹2.5 Crores). How should the warranty provision be measured under Ind AS 37?",
    [
      "₹0, because the individual probability of defect for any single TV set is only 20%.",
      "₹4.0 Crores, measured using the 'Expected Value' method (weighting all possible outcomes by their associated probabilities: (80% × 0) + (15% × ₹1,000 × 1,00,000) + (5% × ₹5,000 × 1,00,000) = ₹1.5 Cr + ₹2.5 Cr = ₹4.0 Crores).",
      "₹2.5 Crores (the single most likely outcome).",
      "₹5.0 Crores (maximum possible exposure)."
    ],
    1,
    "Ind AS 37 - Paragraph 39: Expected Value Method for a Large Population of Items",
    "Ind AS 37 Paragraph 39 states that where the provision being measured involves a large population of items, the obligation is estimated by weighting all possible outcomes by their associated probabilities. The name for this statistical method of estimation is 'expected value'. The provision is (15,000 × ₹1,000) + (5,000 × ₹5,000) = ₹1.5 Cr + ₹2.5 Cr = ₹4.0 Crores."
  ),

  makeQ(612, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Contingent Liability Definition & Disclosure",
    "On 31st March 2024, Tax Authorities issued an income tax assessment order demanding ₹50 Crores on an alleged disallowance. Legal counsel and senior tax experts advise that the tax demand is unjustifiable and the likelihood of having to pay is 'remote' (less than 5%). How should this tax demand be treated under Ind AS 37?",
    [
      "Recognize a full provision of ₹50 Crores in the balance sheet.",
      "Disclose as a contingent liability in the notes to financial statements.",
      "No provision and NO disclosure is required, because the possibility of an outflow of resources embodying economic benefits is remote.",
      "Record a deferred tax asset of ₹50 Crores."
    ],
    2,
    "Ind AS 37 - Paragraph 28: Exemption for Remote Contingent Liabilities",
    "Ind AS 37 Paragraph 28 states explicitly: 'An entity shall not recognize a contingent liability. An entity shall disclose a contingent liability, as required by paragraph 86, unless the possibility of an outflow of resources embodying economic benefits is remote.' When the possibility of an outflow is remote, even note disclosure is not required."
  ),

  makeQ(613, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 10: Adjusting Event - Settlement of Court Case",
    "On 31st March 2024, an ongoing lawsuit against Beta Pharma had an existing provision of ₹5 Crores based on earlier legal estimates. On 28th April 2024 (before approval of the financial statements on 20th May 2024), the High Court pronounced a final non-appealable judgment directing Beta Pharma to pay ₹9 Crores in damages. How should this court judgment be accounted for under Ind AS 10?",
    [
      "It is a non-adjusting event; disclose the ₹9 Crores settlement in the notes for FY 2023-24 and expense the extra ₹4 Crores in FY 2024-25.",
      "It is an adjusting event, because the settlement of the court case confirms that the entity had a present obligation at the end of the reporting period; Beta Pharma must adjust the provision on 31st March 2024 from ₹5 Crores to ₹9 Crores (recognizing an additional ₹4 Crores expense in FY 2023-24 P&L).",
      "Treat as a prior period error in FY 2024-25.",
      "Recognize ₹4 Crores in Other Comprehensive Income."
    ],
    1,
    "Ind AS 10 - Paragraph 9(a): Settlement of Court Case as Adjusting Event",
    "Ind AS 10 Paragraph 9(a) explicitly provides: 'The settlement after the reporting period of a court case that confirms that the entity had a present obligation at the end of the reporting period. The entity adjusts any previously recognized provision in respect of this court case in accordance with Ind AS 37 or recognizes a new provision.' The provision must be adjusted to ₹9 Crores."
  ),

  makeQ(614, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Discounting and Unwinding of Discount",
    "An entity recognized a decommissioning provision of ₹10 Crores on 1st April 2023, discounted at an annual risk-free rate of 10% (the liability is due for cash settlement in 5 years). During FY 2023-24, what is the accounting entry for the passage of time (unwinding of discount) of ₹1.0 Crore (10% of ₹10 Crores)?",
    [
      "Debit Property, Plant and Equipment ₹1.0 Cr and Credit Provision ₹1.0 Cr.",
      "Debit Finance Cost (Profit & Loss) ₹1.0 Cr and Credit Provision ₹1.0 Cr (recognizing the unwinding of the discount as a finance cost).",
      "Debit Other Comprehensive Income ₹1.0 Cr and Credit Provision ₹1.0 Cr.",
      "Debit Retained Earnings ₹1.0 Cr and Credit Cash ₹1.0 Cr."
    ],
    1,
    "Ind AS 37 - Paragraph 60: Unwinding of Discount Recognized as Finance Cost",
    "Ind AS 37 Paragraph 60 states: 'Where a provision is discounted, the carrying amount of a provision increases in each period to reflect the passage of time. This increase is recognized as borrowing cost (finance cost).' It is recognized in Profit or Loss as part of finance costs and is not capitalized into asset cost."
  ),

  makeQ(615, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 10: Non-Adjusting Event - Major Share Capital Restructuring / M&A",
    "On 15th April 2024 (prior to the financial statement approval on 25th May 2024), MegaCorp Ltd. signed an agreement to acquire 100% of TargetCo for ₹500 Crores cash and announced a rights issue of ₹300 Crores. How should this M&A and rights issue be reflected in the financial statements for the year ended 31st March 2024?",
    [
      "Adjust the balance sheet as of 31st March 2024 by consolidating TargetCo retrospectively.",
      "It is a Non-Adjusting Event under Ind AS 10; no adjustments are made to the 31st March 2024 balance sheet or P&L, but the nature of the acquisition, financial effect, and rights issue terms must be disclosed in the notes because non-disclosure could influence user decisions.",
      "Treat as an adjusting event and recognize ₹500 Crores goodwill in FY 2023-24.",
      "Omit all references until the rights issue closes."
    ],
    1,
    "Ind AS 10 - Paragraph 22(a): Major Business Combination as Non-Adjusting Event",
    "Ind AS 10 Paragraph 22(a) explicitly identifies 'a major business combination after the reporting period or disposing of a major subsidiary' as an example of a non-adjusting event. Because the acquisition occurred after the reporting period, it does not relate to conditions at 31st March 2024 and is disclosed in the notes."
  ),

  makeQ(616, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Prejudicing the Position of the Entity (Extremely Rare Exemption)",
    "In a high-profile industrial dispute, disclosing the detailed assumptions, probabilities, and sensitivity of a provision would, in the opinion of the Board, seriously prejudice the position of the entity in ongoing confidential arbitration with the counterparty. Under Ind AS 37, what is permitted in such extremely rare cases?",
    [
      "The entity does not need to recognize any provision or make any disclosure at all.",
      "In extremely rare cases, an entity need not disclose the information required by paragraphs 84-89; however, it must disclose the general nature of the dispute, together with the fact that, and reason why, the information has not been disclosed.",
      "The entity must obtain an exemption certificate from the Ministry of Corporate Affairs before skipping disclosure.",
      "The provision must be recognized secretly in the reserves."
    ],
    1,
    "Ind AS 37 - Paragraph 92: Serious Prejudice Exemption",
    "Ind AS 37 Paragraph 92 states: 'In extremely rare cases, disclosure of some or all of the information required by paragraphs 84-89 can be expected to prejudice seriously the position of the entity in a dispute with other parties on the subject matter of the provision, contingent liability or contingent asset. In such cases, an entity need not disclose the information, but shall disclose the general nature of the dispute, along with the fact that, and reason why, the information has not been disclosed.'"
  ),

  makeQ(617, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Levies under Appendix C (IFRIC 21)",
    "A state municipal corporation levies an annual property development fee of ₹50 Lakhs on commercial properties operating on 1st January of each calendar year. An entity operates its commercial property throughout FY 2023-24. Under Appendix C of Ind AS 37 (Levies), when does the obligating event that gives rise to a liability to pay the levy occur?",
    [
      "Pro-rata across all 365 days of the calendar year.",
      "Progressively as revenue is generated from the property.",
      "Progressively or point-in-time strictly on 1st January, because the obligating event that gives rise to a liability to pay a levy is the activity that triggers the payment of the levy as identified by the legislation (operating on 1st January).",
      "Only when the municipal corporation serves a final recovery warrant."
    ],
    2,
    "Ind AS 37 - Appendix C (Levies) - Paragraph 8",
    "Under Appendix C to Ind AS 37, the obligating event that gives rise to a liability to pay a levy is the activity that triggers the payment of the levy, as identified by the legislation. If the trigger is operating on a specific date (1st January), the liability is recognized in full on that specific date. Operating in the previous period does not create a present obligation."
  ),

  makeQ(618, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 10: Date of Approval for Issue",
    "The financial statements of Sun Ltd. for the year ended 31st March 2024 were completed by management on 30th April 2024. The Board of Directors reviewed and authorized them for issue on 15th May 2024. The financial statements were submitted to the shareholders and approved at the Annual General Meeting (AGM) on 25th July 2024. What is the 'date of approval for issue' for determining events after the reporting period under Ind AS 10?",
    [
      "30th April 2024 (when management completed preparation).",
      "15th May 2024 (the date when the Board of Directors authorized the financial statements for issue).",
      "25th July 2024 (the date of approval by shareholders at the AGM).",
      "31st March 2024."
    ],
    1,
    "Ind AS 10 - Paragraphs 4-6: Date of Authorization for Issue",
    "Ind AS 10 Paragraph 4 states that the process involved in authorizing the financial statements for issue will vary depending upon the management structure. In India, under the Companies Act 2013, the financial statements are authorized for issue when the Board of Directors approves them. The period for events after the reporting period runs between the end of the reporting period and the date when the financial statements are approved by the Board of Directors."
  ),

  makeQ(619, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 37: Provision vs Other Liabilities",
    "How does Ind AS 37 distinguish a 'Provision' from other liabilities such as 'Trade Payables' and 'Accruals'?",
    [
      "Provisions are legally binding, while trade payables are informal agreements.",
      "Provisions can be distinguished from trade payables and accruals because there is uncertainty about the timing or amount of the future expenditure required in settlement; in contrast, trade payables are liabilities to pay for goods/services invoiced or formally agreed, and accruals have much lower uncertainty.",
      "Provisions are presented in equity, while accruals are presented in liabilities.",
      "Trade payables require discounting, while provisions do not."
    ],
    1,
    "Ind AS 37 - Paragraph 11: Distinction Between Provisions and Other Liabilities",
    "Ind AS 37 Paragraph 11 explains that provisions can be distinguished from other liabilities such as trade payables and accruals because there is uncertainty about the timing or amount of the future expenditure required in settlement. Trade payables are liabilities to pay for goods or services that have been received and invoiced. Accruals have much less uncertainty than provisions."
  ),

  makeQ(620, 6, "Provisions, Contingent Liabilities, and Events After the Reporting Period", "Ind AS 10: Discovery of Fraud After Reporting Date",
    "On 2nd May 2024 (prior to the Board approval of financial statements for the year ended 31st March 2024), an internal whistleblower revealed that the Chief Financial Officer had embezzled ₹15 Crores during FY 2023-24 by manipulating fictitious vendor payments. How should this discovery be accounted for under Ind AS 10?",
    [
      "As a non-adjusting event, disclosed in the notes for FY 2023-24 and recorded as an expense in FY 2024-25.",
      "As an adjusting event: Ind AS 10 Paragraph 9(e) explicitly states that the discovery of fraud or errors that show that the financial statements are incorrect is an adjusting event; financial statements for the year ended 31st March 2024 must be adjusted to correct the fraud.",
      "Report the matter to the police, with no changes to the accounting numbers.",
      "Record an insurance receivable in OCI."
    ],
    1,
    "Ind AS 10 - Paragraph 9(e): Discovery of Fraud or Errors as Adjusting Event",
    "Ind AS 10 Paragraph 9(e) explicitly lists 'the discovery of fraud or errors that show that the financial statements are incorrect' as an adjusting event. Because the embezzlement occurred during FY 2023-24, its discovery prior to authorization for issue confirms conditions that existed during the reporting period, requiring financial statements for the year ended 31st March 2024 to be adjusted."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_6_provisions_contingencies_events.json'), JSON.stringify(t6Qs, null, 2), 'utf8');
console.log('Saved Topic 6: 20 Questions');

// =========================================================================
// TOPIC 7: Financial Instruments: Recognition, Measurement, and Classification (Ind AS 109, 32, 107) (20 Questions)
// =========================================================================
const t7Qs = [
  makeQ(701, 7, "Financial Instruments", "Ind AS 109: Business Model & SPPI Test for Debt Instruments",
    "On 1st April 2023, Sovereign Bank invests ₹100 Crores in 8% corporate bonds. The contractual cash flows consist solely of payments of principal and interest (SPPI) on specified dates. Sovereign Bank's business model objective is to hold the bonds to collect contractual cash flows, but also to sell them whenever attractive market liquidity opportunities arise. How should this debt instrument be classified under Ind AS 109?",
    [
      "Amortised Cost.",
      "Fair Value Through Other Comprehensive Income (FVOCI) with recycling of cumulative gains/losses to Profit or Loss on derecognition.",
      "Fair Value Through Profit or Loss (FVTPL).",
      "Irrevocable FVOCI without recycling."
    ],
    1,
    "Ind AS 109 (Financial Instruments) - Paragraphs 4.1.2A & 5.7.10: Debt Instruments at FVOCI",
    "Under Ind AS 109 Paragraph 4.1.2A, a financial asset is measured at FVOCI if both: (a) the financial asset is held within a business model whose objective is achieved by both collecting contractual cash flows and selling financial assets; and (b) its contractual terms give rise on specified dates to cash flows that are solely payments of principal and interest on the principal amount outstanding (SPPI test). For debt instruments at FVOCI, interest, impairment, and foreign exchange gains/losses go to P&L, while fair value changes go to OCI and are recycled to P&L upon derecognition."
  ),

  makeQ(702, 7, "Financial Instruments", "Ind AS 109: Equity Instruments Irrevocable FVOCI Option",
    "Alpha Capital Ltd. purchases 1,00,000 equity shares in a listed enterprise for strategic long-term collaboration (not held for trading). At initial recognition, Alpha Capital makes an irrevocable election under Ind AS 109 Paragraph 5.7.5 to present subsequent changes in fair value in Other Comprehensive Income (FVOCI). Two years later, Alpha Capital sells the entire equity holding at a gain of ₹25 Lakhs. How is this ₹25 Lakhs gain treated upon derecognition?",
    [
      "Recycled from OCI to Profit and Loss as realized gain on sale.",
      "The cumulative gain recognized in OCI is NEVER recycled/reclassified to Profit or Loss; it may be transferred directly within equity from OCI (revaluation reserve) to Retained Earnings.",
      "Credited to Capital Redemption Reserve.",
      "Charged to securities premium."
    ],
    1,
    "Ind AS 109 - Paragraphs 5.7.5 & B5.7.1: Equity Instruments at FVOCI No Recycling",
    "Ind AS 109 permits an irrevocable election at initial recognition for non-trading equity investments to present fair value changes in OCI. Under Paragraph B5.7.1, amounts recognized in OCI are not subsequently transferred to profit or loss (no recycling). However, the entity may transfer the cumulative gain or loss within equity (e.g. from OCI reserve to retained earnings)."
  ),

  makeQ(703, 7, "Financial Instruments", "Ind AS 32: Compound Financial Instruments (Split Accounting)",
    "On 1st April 2023, Delta Ltd. issues 10,000 6% Compulsorily Convertible Debentures (CCDs) of ₹1,000 each (total proceeds ₹1,00,00,000) for a term of 3 years. Interest is payable annually at 6%. At the end of year 3, each debenture is convertible into 20 equity shares. The prevailing market interest rate for similar debentures without conversion rights is 9% per annum (PV factor for annuity of ₹1 for 3 years at 9% = 2.5313; PV factor of ₹1 at end of Year 3 at 9% = 0.7722). What are the initial values of the Liability Component and Equity Component under Ind AS 32?",
    [
      "Liability Component = ₹1,00,00,000; Equity Component = Nil.",
      "Liability Component = ₹92,40,780 (PV of annual interest: ₹6,00,000 × 2.5313 = ₹15,18,780 + PV of principal: ₹1,00,00,000 × 0.7722 = ₹77,22,000); Equity Component = ₹7,59,220 (Residual: ₹1,00,00,000 - ₹92,40,780).",
      "Liability Component = ₹50,00,000; Equity Component = ₹50,00,000.",
      "Liability Component = Nil; Equity Component = ₹1,00,00,000."
    ],
    1,
    "Ind AS 32 (Financial Instruments: Presentation) - Paragraphs 28-32: Compound Financial Instruments",
    "Under Ind AS 32, a compound financial instrument is split into its liability component and equity component. The liability component is measured first by calculating the present value of contractual cash flows (interest and principal) discounted at the market rate for an equivalent instrument without an equity feature: (₹6L × 2.5313) + (₹100L × 0.7722) = ₹15,18,780 + ₹77,22,000 = ₹92,40,780. The equity component is assigned the residual amount: ₹1,00,00,000 - ₹92,40,780 = ₹7,59,220, credited to Other Equity."
  ),

  makeQ(704, 7, "Financial Instruments", "Ind AS 109: Expected Credit Loss (ECL) - 3-Stage Model",
    "Under Ind AS 109, when does a financial asset transition from Stage 1 to Stage 2 of the Expected Credit Loss (ECL) impairment model, and what is the difference in loss allowance measurement?",
    [
      "When a formal bankruptcy petition is admitted; loss allowance increases to 100%.",
      "When there has been a Significant Increase in Credit Risk (SICR) since initial recognition; the loss allowance transitions from a 12-month ECL (Stage 1) to Lifetime Expected Credit Losses (Stage 2).",
      "When payments are overdue by exactly 1 day; loss allowance transitions to fair value.",
      "Transition occurs solely at the discretion of the statutory auditor."
    ],
    1,
    "Ind AS 109 - Paragraphs 5.5.3-5.5.5: General Impairment Model (Stages 1 and 2)",
    "Under Ind AS 109 Paragraph 5.5.3, an entity shall measure the loss allowance for a financial instrument at an amount equal to the lifetime expected credit losses if the credit risk on that financial instrument has increased significantly since initial recognition (Stage 2). If credit risk has not increased significantly, the loss allowance is measured at an amount equal to 12-month expected credit losses (Stage 1)."
  ),

  makeQ(705, 7, "Financial Instruments", "Ind AS 109: Simplified Approach for Trade Receivables",
    "Ind AS 109 provides a 'Simplified Approach' for trade receivables, contract assets, and lease receivables. Which of the following statements correctly describes this approach?",
    [
      "Entities must track whether a significant increase in credit risk has occurred since initial recognition for every individual invoice.",
      "For trade receivables or contract assets that do not contain a significant financing component, an entity is mandatorily required to measure the loss allowance at an amount equal to Lifetime Expected Credit Losses at all times, commonly using a provision matrix.",
      "The simplified approach allows entities to ignore credit losses until bad debts are legally written off.",
      "Loss allowances are capped at 1% of total invoice value."
    ],
    1,
    "Ind AS 109 - Paragraph 5.5.15: Simplified Approach for Trade Receivables",
    "Ind AS 109 Paragraph 5.5.15 mandates that for trade receivables or contract assets that do not contain a significant financing component (under Ind AS 115), the entity shall always measure the loss allowance at an amount equal to lifetime expected credit losses. The entity is not required to track changes in credit risk or establish whether a significant increase in credit risk has occurred."
  ),

  makeQ(706, 7, "Financial Instruments", "Ind AS 109: Transaction Costs Treatment",
    "On 1st April 2023, Pioneer Finance Ltd. originates a ₹50 Crores loan to an enterprise at an annual coupon of 9%. The loan is classified at Amortised Cost. Pioneer Finance pays ₹1.5 Crores as professional legal and underwriting loan syndication fees to third-party consultants. How should the ₹1.5 Crores transaction costs be accounted for under Ind AS 109?",
    [
      "Expensed immediately in Profit or Loss as administrative costs.",
      "Added to the initial carrying amount of the financial asset (initial recognition at ₹51.5 Crores) and amortized over the loan tenure by recalculating the Effective Interest Rate (EIR).",
      "Deducted directly from equity.",
      "Deferred as an intangible asset under Ind AS 38."
    ],
    1,
    "Ind AS 109 - Paragraph 5.1.1: Transaction Costs on Financial Assets",
    "Under Ind AS 109 Paragraph 5.1.1, at initial recognition, an entity shall measure a financial asset or financial liability (other than at FVTPL) at its fair value plus or minus transaction costs that are directly attributable to the acquisition or issue of the financial asset or financial liability. The transaction costs are incorporated into the effective interest rate calculation."
  ),

  makeQ(707, 7, "Financial Instruments", "Ind AS 32: Redeemable Preference Shares Classification",
    "Beta Ltd. issues 50,00,000 8% Cumulative Non-Convertible Redeemable Preference Shares of ₹100 each. The shares are mandatorily redeemable by Beta Ltd. at par after 5 years. How must these preference shares and their annual dividend payments be classified under Ind AS 32 and Ind AS 109?",
    [
      "Presented as part of Equity Share Capital; dividend presented as an appropriation of profit.",
      "Presented as a Financial Liability on the balance sheet (because Beta Ltd. has a contractual obligation to deliver cash to settle the redemption); the annual dividend is classified as Finance Cost (Interest Expense) in the Statement of Profit and Loss.",
      "Presented as a Hybrid Instrument split 50% Equity and 50% Liability.",
      "Presented in Other Comprehensive Income."
    ],
    1,
    "Ind AS 32 - Paragraphs 18(a) & AG25: Mandatorily Redeemable Preference Shares",
    "Under Ind AS 32, a preference share that provides for mandatory redemption by the issuer for a fixed or determinable amount at a fixed or determinable future date gives rise to a contractual obligation to deliver cash. Therefore, the instrument meets the definition of a financial liability. Distributions to holders of a financial liability are recognized as finance costs in profit or loss in the same way as interest on a bond."
  ),

  makeQ(708, 7, "Financial Instruments", "Ind AS 109: Embedded Derivatives Bifurcation",
    "Sigma Corp (INR functional currency) leases heavy machinery from a German supplier. The lease payments are denominated in Japanese Yen (JPY). JPY is neither the functional currency of either counterparty, nor is it the currency in which machinery leases are routinely denominated in international commerce. Under Ind AS 109, how is the foreign currency embedded derivative treated for financial liabilities / host contracts?",
    [
      "It is an embedded derivative that is not closely related to the host lease contract; it must be separated from the host contract and accounted for as a standalone derivative at Fair Value Through Profit or Loss (FVTPL).",
      "No bifurcation is permitted; the entire lease liability is accounted for at amortized cost.",
      "Bifurcation is optional and left to management discretion.",
      "The entire contract is void under Ind AS."
    ],
    0,
    "Ind AS 109 - Paragraphs 4.3.1-4.3.3: Embedded Derivatives in Financial Liabilities",
    "Under Ind AS 109, an embedded derivative in a financial liability or host contract that is not a financial asset within the scope of Ind AS 109 must be separated from the host contract if: (a) the economic characteristics and risks of the embedded derivative are not closely related to the host; (b) a separate instrument with the same terms would meet the definition of a derivative; and (c) the hybrid contract is not measured at FVTPL. Foreign currency payments in an unrelated currency must be bifurcated and marked to market through P&L."
  ),

  makeQ(709, 7, "Financial Instruments", "Ind AS 109: Fair Value Option (Accounting Mismatch)",
    "An entity issues fixed-rate bonds (financial liability) and simultaneously enters into an interest rate swap (derivative at FVTPL) to convert fixed interest to floating. Without using hedge accounting, the entity designates the bonds upon initial recognition at Fair Value Through Profit or Loss (FVTPL) under the 'Fair Value Option'. When is this designation permissible under Ind AS 109?",
    [
      "Only when the entity has suffered operating losses in the preceding year.",
      "When the designation eliminates or significantly reduces a measurement or recognition inconsistency ('accounting mismatch') that would otherwise arise from measuring assets or liabilities or recognizing the gains and losses on them on different bases.",
      "At any time during the life of the bond.",
      "Only for liabilities maturing within 6 months."
    ],
    1,
    "Ind AS 109 - Paragraph 4.2.2(a): Fair Value Option to Eliminate Accounting Mismatch",
    "Ind AS 109 Paragraph 4.2.2 permits an entity at initial recognition to irrevocably designate a financial liability as measured at fair value through profit or loss if doing so eliminates or significantly reduces an accounting mismatch that would otherwise arise from measuring the liability at amortized cost while the related swap is measured at FVTPL."
  ),

  makeQ(710, 7, "Financial Instruments", "Ind AS 109: Own Credit Risk in Financial Liabilities at FVTPL",
    "A commercial bank issues structured notes designated at FVTPL under the fair value option. During the year, the bank's own credit spread widens significantly due to credit rating downgrades, causing the fair value of its structured note liabilities to decrease by ₹20 Crores. Under Ind AS 109, where should this ₹20 Crores fair value gain attributable to changes in own credit risk be recognized?",
    [
      "In the Statement of Profit and Loss as operating income.",
      "In Other Comprehensive Income (OCI), unless presenting it in OCI would create or enlarge an accounting mismatch in profit or loss (in which case it is recognized in P&L).",
      "Credited to Capital Reserve.",
      "Deducted directly from loans and advances."
    ],
    1,
    "Ind AS 109 - Paragraph 5.7.7: Own Credit Risk in OCI",
    "Ind AS 109 Paragraph 5.7.7 states that an entity shall present a gain or loss on a financial liability that is designated at fair value through profit or loss as follows: (a) the amount of change in fair value attributable to changes in the credit risk of that liability shall be presented in Other Comprehensive Income; and (b) the remaining amount of change in fair value shall be presented in profit or loss."
  ),

  makeQ(711, 7, "Financial Instruments", "Ind AS 109: Cash Flow Hedge Accounting",
    "A manufacturing exporter enters into a forward exchange contract to hedge highly probable forecasted USD sales 6 months in the future. The hedge qualifies for cash flow hedge accounting. During the period, the effective portion of the gain on the forward contract is ₹5 Crores, and the ineffective portion is ₹0.5 Crores. How should these amounts be recognized under Ind AS 109?",
    [
      "All ₹5.5 Crores recognized in Profit or Loss.",
      "The effective portion of ₹5 Crores is recognized in Other Comprehensive Income (Cash Flow Hedge Reserve); the ineffective portion of ₹0.5 Crores is recognized immediately in Profit or Loss.",
      "All ₹5.5 Crores recognized in OCI.",
      "Both portions deferred in inventory."
    ],
    1,
    "Ind AS 109 - Paragraph 6.5.11: Accounting for Cash Flow Hedges",
    "Under Ind AS 109 Paragraph 6.5.11, as long as a cash flow hedge meets the qualifying criteria, the separate component of equity associated with the hedged item (cash flow hedge reserve) is adjusted to the lesser of the cumulative gain or loss on the hedging instrument and the cumulative change in fair value of the hedged item. The effective portion goes to OCI; any remaining gain or loss on the hedging instrument represents hedge ineffectiveness recognized in profit or loss."
  ),

  makeQ(712, 7, "Financial Instruments", "Ind AS 109: Substantial Modification of Financial Liabilities (10% Test)",
    "Alpha Ltd. renegotiates the terms of its ₹100 Crores term loan with lender bank. The revised terms alter the interest rate, maturity, and covenants. Under Ind AS 109, when is an exchange of debt instruments or modification of terms treated as an 'extinguishment' of the original financial liability rather than a modification?",
    [
      "Whenever the interest rate changes by more than 0.5%.",
      "When the terms are substantially different—which is met if the discounted present value of cash flows under the new terms (including net fees paid/received) discounted using the original effective interest rate is at least 10% different from the discounted present value of the remaining cash flows of the original financial liability (the '10% Test').",
      "Whenever the maturity is extended by more than 12 months.",
      "Only when the lender files a formal debt waiver with the DRT."
    ],
    1,
    "Ind AS 109 - Paragraph B3.3.6: The 10% Test for Substantial Modification",
    "Ind AS 109 Paragraph B3.3.6 states that terms are substantially different if the discounted present value of the cash flows under the new terms, including any fees paid net of any fees received and discounted using the original effective interest rate, is at least 10% different from the discounted present value of the remaining cash flows of the original financial liability. If the 10% test is met, the old liability is derecognized (extinguished) and the new liability recognized at fair value with any difference recognized in P&L."
  ),

  makeQ(713, 7, "Financial Instruments", "Ind AS 109: Reclassification of Financial Assets",
    "When an entity reclassifies financial assets between amortized cost, FVOCI, and FVTPL under Ind AS 109, which of the following conditions is required, and what is the effective date of reclassification?",
    [
      "Reclassification is permitted at management's quarterly discretion whenever share prices fluctuate.",
      "An entity shall reclassify financial assets if and only if the entity changes its business model for managing financial assets (which is expected to be very infrequent, determined by executive management as a result of external/internal changes significant to operations); reclassification is applied prospectively from the reclassification date (the first day of the first reporting period following the change).",
      "Reclassifications must be applied retrospectively for the past 5 years.",
      "Financial liabilities can be reclassified freely."
    ],
    1,
    "Ind AS 109 - Paragraphs 4.4.1-4.4.3 & 5.6.1: Reclassification of Financial Assets",
    "Under Ind AS 109 Paragraph 4.4.1, when, and only when, an entity changes its business model for managing financial assets shall it reclassify all affected financial assets. Financial liabilities are never reclassified. Under Paragraph 5.6.1, if an entity reclassifies financial assets, it shall apply the reclassification prospectively from the reclassification date (the first day of the first reporting period following the change in business model). Prior periods are not restated."
  ),

  makeQ(714, 7, "Financial Instruments", "Ind AS 32: Settlement in Entity's Own Equity Instruments (Fixed-for-Fixed Rule)",
    "A contract requires TechCorp Ltd. to deliver a variable number of its own equity shares equal in value to a fixed sum of ₹10 Crores on 31st December 2024. How is this contract classified under Ind AS 32?",
    [
      "Equity instrument, because it will be settled in the entity's own equity shares.",
      "Financial Liability, because the contract will be settled by delivering a variable number of the entity's own equity instruments to satisfy a fixed monetary amount (failing the 'fixed-for-fixed' equity condition).",
      "Derivative at FVOCI.",
      "Contingent equity."
    ],
    1,
    "Ind AS 32 - Paragraphs 16 & 21: The Fixed-for-Fixed Criterion",
    "Ind AS 32 Paragraph 16 specifies that a contract that will be settled in the entity's own equity instruments is an equity instrument only if it is a derivative that will be settled only by the issuer exchanging a fixed amount of cash or another financial asset for a fixed number of its own equity instruments ('fixed-for-fixed' rule). A contract settled by delivering a variable number of shares equal to a fixed amount is a financial liability because the shares are used merely as currency."
  ),

  makeQ(715, 7, "Financial Instruments", "Ind AS 109: Day 1 Gain or Loss Recognition",
    "On 1st April 2023, an enterprise receives an interest-free loan of ₹10 Crores from its parent company repayable in 5 years. Market interest rate for comparable standalone loans is 10% per annum (PV factor for 5 years at 10% = 0.6209). Fair value of the loan at inception is ₹6.209 Crores. How should the difference of ₹3.791 Crores between cash received (₹10 Cr) and fair value (₹6.209 Cr) be accounted for in the subsidiary's standalone financial statements?",
    [
      "Recognized immediately as a Day 1 Gain in the Statement of Profit and Loss.",
      "Recognized as an Equity Contribution from Parent (Capital Contribution / Other Equity) of ₹3.791 Crores, with a Financial Liability recognized at fair value of ₹6.209 Crores (subsequently accreted to ₹10 Crores over 5 years using the effective interest method).",
      "Deferred as unearned revenue in Current Liabilities.",
      "Credited to General Reserve."
    ],
    1,
    "Ind AS 109 - Paragraph B5.1.1 & Ind AS 32: Below-Market Loans Between Group Entities",
    "When an entity receives a below-market or interest-free loan from its parent, the transaction is in substance a capital contribution by the shareholder acting in its capacity as owner. The loan liability is recognized initially at fair value (present value of ₹10 Cr at 10% = ₹6.209 Cr). The ₹3.791 Cr difference is credited to Other Equity as a capital contribution from parent."
  ),

  makeQ(716, 7, "Financial Instruments", "Ind AS 109: Fair Value Measurement Hierarchy for Financial Assets",
    "Under Ind AS 113 / Ind AS 109, what constitutes a 'Level 1' input in the fair value hierarchy for a financial instrument?",
    [
      "Inputs other than quoted prices that are observable for the asset, either directly or indirectly.",
      "Quoted prices (unadjusted) in active markets for identical assets or liabilities that the entity can access at the measurement date.",
      "Internal discounted cash flow models using unobservable management estimates.",
      "Valuations certified by statutory auditors."
    ],
    1,
    "Ind AS 113 (Fair Value Measurement) - Paragraphs 76-80: Level 1 Inputs",
    "Level 1 inputs are quoted prices (unadjusted) in active markets for identical assets or liabilities that the entity can access at the measurement date. Level 1 inputs provide the most reliable evidence of fair value and must be used without adjustment whenever available."
  ),

  makeQ(717, 7, "Financial Instruments", "Ind AS 109: Financial Guarantee Contracts",
    "Parent Ltd. issues a financial guarantee to a commercial bank guaranteeing the bank loan of its subsidiary Sub Ltd. Parent Ltd. does not charge Sub Ltd. any guarantee commission. How should Parent Ltd. initially and subsequently measure the financial guarantee contract under Ind AS 109?",
    [
      "Disclose solely as a contingent liability in the notes with zero balance sheet recognition.",
      "Initially measured at Fair Value (credit to Equity as investment in subsidiary); subsequently measured at the higher of: (a) the amount of loss allowance determined under the ECL model of Ind AS 109; and (b) the amount initially recognized less, when appropriate, the cumulative amount of income recognized under Ind AS 115.",
      "Measured at the full face value of the subsidiary's bank loan.",
      "Recorded in OCI."
    ],
    1,
    "Ind AS 109 - Paragraph 5.1.1 & Paragraph 4.2.1(c): Financial Guarantee Contracts",
    "Under Ind AS 109 Paragraph 4.2.1(c), an issuer of a financial guarantee contract shall initially measure it at fair value. Subsequently, it is measured at the higher of: (i) the amount of the loss allowance determined in accordance with Section 5.5 (ECL); and (ii) the amount initially recognized less, when appropriate, the cumulative amount of income recognized in accordance with the principles of Ind AS 115."
  ),

  makeQ(718, 7, "Financial Instruments", "Ind AS 109: Impairment of Debt Instruments at FVOCI",
    "Omega Ltd. holds a portfolio of corporate bonds classified as Fair Value Through Other Comprehensive Income (FVOCI). During the year, expected credit losses increase by ₹2 Crores. How is this ₹2 Crores impairment loss accounted for under Ind AS 109?",
    [
      "Debit Impairment Loss (Profit & Loss) ₹2 Crores, Credit Financial Asset (reducing bond carrying amount) ₹2 Crores.",
      "Debit Impairment Loss (Profit & Loss) ₹2 Crores, Credit Other Comprehensive Income (accumulated in the fair value reserve) ₹2 Crores, without reducing the carrying amount of the financial asset on the balance sheet (which remains at fair value).",
      "Debit OCI ₹2 Crores, Credit Profit & Loss ₹2 Crores.",
      "No impairment loss is recognized for financial assets measured at fair value."
    ],
    1,
    "Ind AS 109 - Paragraph 5.5.2 & Paragraph J4: Impairment of Financial Assets at FVOCI",
    "Under Ind AS 109 Paragraph 5.5.2, for financial assets measured at FVOCI, the asset is presented on the balance sheet at fair value. Therefore, the loss allowance does not reduce the carrying amount of the financial asset. Instead, the loss allowance is recognized in Other Comprehensive Income and does not reduce the carrying amount on the balance sheet; the corresponding charge is recognized in Profit or Loss."
  ),

  makeQ(719, 7, "Financial Instruments", "Ind AS 32: Treasury Shares Accounting",
    "A company buys back 10,00,000 of its own equity shares from the open market for ₹25 Crores and cancels them (face value ₹10 per share = ₹1 Crore). How should this buy-back be accounted for under Ind AS 32?",
    [
      "Recognize an investment in treasury shares of ₹25 Crores under Non-Current Assets.",
      "No gain or loss is recognized in Profit or Loss; the ₹25 Crores purchase consideration is deducted directly from equity (Share capital reduced by ₹1 Cr face value, and remaining ₹24 Cr deducted from Securities Premium / Free Reserves).",
      "Recognize an exceptional loss of ₹24 Crores in Profit & Loss.",
      "Recognize the buy-back in OCI."
    ],
    1,
    "Ind AS 32 - Paragraph 33: Treasury Shares Deducted Directly from Equity",
    "Ind AS 32 Paragraph 33 states: 'If an entity reacquires its own equity instruments, those instruments (treasury shares) shall be deducted from equity. No gain or loss shall be recognized in profit or loss on the purchase, sale, issue or cancellation of an entity's own equity instruments.' Consideration paid is recognized directly in equity."
  ),

  makeQ(720, 7, "Financial Instruments", "Ind AS 109: Fair Value Hedge Accounting Mechanics",
    "Sun Pharma holds an inventory of specialty active pharmaceutical ingredients (APIs) with a carrying amount of ₹50 Crores. To hedge against falling spot commodity prices, Sun Pharma enters into a derivative futures contract. The relationship is designated as a Fair Value Hedge. During the period, the derivative gains ₹4 Crores, while the hedged inventory fair value falls by ₹3.8 Crores. How is this accounted for under Ind AS 109?",
    [
      "Both gains and losses are deferred in the Cash Flow Hedge Reserve in OCI.",
      "The gain on the derivative of ₹4 Crores is recognized in Profit or Loss; the carrying amount of the inventory is adjusted by the ₹3.8 Crores fair value loss, with the loss recognized in Profit or Loss (resulting in net P&L ineffectiveness of ₹0.2 Crores).",
      "Derivative gain is recognized in P&L, but inventory carrying amount is not adjusted.",
      "Inventory is written down under Ind AS 2 with derivative gain in OCI."
    ],
    1,
    "Ind AS 109 - Paragraph 6.5.8: Fair Value Hedge Mechanics",
    "Under Ind AS 109 Paragraph 6.5.8, in a fair value hedge: (a) the hedging gain or loss on the hedging instrument is recognized in profit or loss; and (b) the hedging gain or loss on the hedged item adjusts the carrying amount of the hedged item and is recognized in profit or loss. Both components offset in P&L, leaving only net ineffectiveness."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_7_financial_instruments.json'), JSON.stringify(t7Qs, null, 2), 'utf8');
console.log('Saved Topic 7: 20 Questions');

// =========================================================================
// TOPIC 8: Business Combinations and Consolidated Financial Statements (Ind AS 103, 110) (20 Questions)
// =========================================================================
const t8Qs = [
  makeQ(801, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 103: Definition of a Business (Optional Concentration Test)",
    "Titan Holdings Ltd. acquires 100% equity in an unlisted entity whose sole asset is an operating commercial office tower leased to corporate tenants. The gross asset value is ₹100 Crores, of which the office building represents ₹98 Crores (including fair value of leases), and other assets (cash and receivables) represent ₹2 Crores. Management elects to apply the optional concentration test under Ind AS 103. What is the conclusion?",
    [
      "The acquisition is automatically classified as a business combination requiring goodwill calculation.",
      "The concentration test is met because substantially all (98%) of the fair value of the gross assets acquired is concentrated in a single identifiable asset (the building); therefore, the set of activities and assets is NOT a business, and the transaction is accounted for as an Asset Acquisition (no goodwill recognized).",
      "The concentration test fails and mandatory purchase price allocation must be performed.",
      "All real estate acquisitions are treated as joint ventures."
    ],
    1,
    "Ind AS 103 (Business Combinations) - Appendix B Paragraphs B7A-B7C: Optional Concentration Test",
    "Under the revised Ind AS 103, an entity may elect to apply an optional concentration test to assess whether an acquired set of activities and assets is not a business. The concentration test is met if substantially all of the fair value of the gross assets acquired is concentrated in a single identifiable asset (or a group of similar identifiable assets). When met, the acquisition is an asset acquisition, and goodwill is not recognized."
  ),

  makeQ(802, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 103: Contingent Consideration Classification & Remeasurement",
    "On 1st April 2023, Acquirer Ltd. acquires 100% of Target Ltd. The purchase agreement requires Acquirer Ltd. to pay an additional ₹10 Crores cash to the former owners if Target Ltd.'s revenue exceeds ₹100 Crores in Year 2. At acquisition date, the fair value of this contingent consideration is ₹6 Crores. On 31st March 2024, revised forecasts indicate revenue will surge, increasing the fair value of the contingent obligation to ₹8.5 Crores. How should the contingent consideration and its subsequent change be accounted for under Ind AS 103?",
    [
      "Classified as Equity; subsequent fair value change of ₹2.5 Crores is recognized in OCI.",
      "Classified as a Financial Liability (an obligation to deliver cash); at acquisition date, ₹6 Crores is included in consideration transferred (increasing Goodwill); subsequent increase of ₹2.5 Crores is recognized as a fair value loss in the Statement of Profit and Loss (not adjusted against Goodwill).",
      "Goodwill is adjusted retrospectively by ₹2.5 Crores on 31st March 2024.",
      "Omitted until Year 2 when cash is paid."
    ],
    1,
    "Ind AS 103 - Paragraphs 39-40 & 58: Contingent Consideration Classification and Subsequent Measurement",
    "Contingent consideration that gives rise to an obligation to deliver cash is classified as a financial liability under Ind AS 32 and measured at fair value at acquisition date (included in purchase consideration). Under Ind AS 103 Paragraph 58, subsequent changes in fair value that are not measurement period adjustments are recognized in profit or loss, and cannot adjust Goodwill."
  ),

  makeQ(803, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 103: NCI Measurement - Fair Value vs Proportionate Share",
    "Parent Ltd. acquires 80% of Subsidiary Ltd. for ₹80 Crores cash. The fair value of Subsidiary Ltd.'s identifiable net assets is ₹70 Crores. The fair value of the 20% Non-Controlling Interest (NCI) is ₹18 Crores. Compare the Goodwill recognized under Method 1 (NCI at Fair Value - Full Goodwill) and Method 2 (NCI at Proportionate Share of Net Identifiable Assets - Partial Goodwill) under Ind AS 103:",
    [
      "Method 1 Goodwill = ₹28 Crores; Method 2 Goodwill = ₹24 Crores.",
      "Method 1 (Full Goodwill): Consideration (₹80 Cr) + NCI at Fair Value (₹18 Cr) - Net Assets (₹70 Cr) = ₹28 Crores; Method 2 (Partial Goodwill): Consideration (₹80 Cr) + NCI at 20% of Net Assets (₹14 Cr) - Net Assets (₹70 Cr) = ₹24 Crores.",
      "Both methods yield identical goodwill of ₹10 Crores.",
      "Goodwill under Method 2 is negative (bargain purchase)."
    ],
    1,
    "Ind AS 103 - Paragraph 19 & Paragraph 32: Measurement of Non-Controlling Interest",
    "Ind AS 103 Paragraph 19 allows the acquirer to measure NCI at the acquisition date either at fair value (Method 1: Full Goodwill = ₹80 + ₹18 - ₹70 = ₹28 Cr) or at the NCI's proportionate share of the acquiree's identifiable net assets (Method 2: Partial Goodwill = ₹80 + 20% of ₹70 - ₹70 = ₹80 + ₹14 - ₹70 = ₹24 Cr)."
  ),

  makeQ(804, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 103: Bargain Purchase Gain (Capital Reserve)",
    "On 1st April 2023, Acquirer Ltd. acquires 100% of Target Ltd. for ₹40 Crores cash in a distressed sale. The fair value of identifiable net assets acquired is ₹50 Crores. Acquirer Ltd. conducts a thorough reassessment under Ind AS 103 Paragraph 36 and confirms all assets and liabilities were correctly identified and measured. How should the resulting ₹10 Crores excess be recognized under Ind AS 103?",
    [
      "Recognized immediately in Profit or Loss as an exceptional operating profit.",
      "Recognized in Other Comprehensive Income (OCI) on acquisition date and accumulated in Equity as Capital Reserve; however, if there is no clear evidence of the underlying reason for the bargain purchase, it is recognized directly in equity as Capital Reserve without routing through OCI.",
      "Credited to General Reserve.",
      "Deferred as a liability in the balance sheet."
    ],
    1,
    "Ind AS 103 - Paragraphs 34-36A: Bargain Purchase Gain & Capital Reserve",
    "Under Ind AS 103 (which differs from IFRS 3), a bargain purchase gain is recognized in Other Comprehensive Income and accumulated in equity as capital reserve, provided there is clear evidence of the underlying reason for the bargain purchase (such as a distressed sale). If there is no clear evidence, it is recognized directly in equity as Capital Reserve."
  ),

  makeQ(805, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 103: Acquisition-Related Costs Treatment",
    "In executing the acquisition of Target Ltd., Acquirer Ltd. incurred: (i) ₹3 Crores in fees paid to investment bankers, legal advisors, and accountants for due diligence; and (ii) ₹2 Crores in stamp duty and registration fees for issuing new equity shares as purchase consideration. How should these costs be accounted for under Ind AS 103?",
    [
      "All ₹5 Crores capitalized as part of Goodwill.",
      "Advisory, due diligence, and legal fees of ₹3 Crores are recognized as an expense in Profit or Loss in the period incurred; share issue costs of ₹2 Crores are deducted directly from equity (Securities Premium) under Ind AS 32.",
      "All ₹5 Crores deducted from Securities Premium.",
      "All ₹5 Crores expensed in P&L."
    ],
    1,
    "Ind AS 103 - Paragraph 53: Acquisition-Related Costs",
    "Ind AS 103 Paragraph 53 states that acquisition-related costs (finder's fees, advisory, legal, accounting, valuation and other professional fees) are expensed in the periods in which the costs are incurred and the services are received. Costs to issue debt or equity securities are recognized in accordance with Ind AS 32 and Ind AS 109 (deducted from equity proceeds)."
  ),

  makeQ(806, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 110: Definition of Control - Three Core Elements",
    "Which of the following sets of elements must ALL be present simultaneously for an investor to control an investee under Ind AS 110?",
    [
      "Ownership of more than 50% equity shares, board majority, and debt ownership.",
      "(a) Power over the investee; (b) exposure, or rights, to variable returns from its involvement with the investee; and (c) the ability to use its power over the investee to affect the amount of the investor's returns.",
      "Power of attorney, joint venture agreement, and equity participation.",
      "Holding at least 20% voting rights with significant influence."
    ],
    1,
    "Ind AS 110 (Consolidated Financial Statements) - Paragraph 7: Definition of Control",
    "Under Ind AS 110 Paragraph 7, an investor controls an investee if and only if the investor has all the following: (a) power over the investee (existing rights that give it the current ability to direct relevant activities); (b) exposure, or rights, to variable returns from its involvement with the investee; and (c) the ability to use its power over the investee to affect the amount of the investor's returns."
  ),

  makeQ(807, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 110: De Facto Control (Substantive vs Potential Rights)",
    "PQR Ltd. holds 42% of the voting rights in XYZ Ltd. The remaining 58% is widely dispersed among 25,000 retail shareholders, none of whom holds more than 0.1%. At the last three Annual General Meetings, only 60% of total voting rights were cast in person or by proxy, and PQR Ltd.'s 42% represented 70% of the votes cast, allowing it to unilaterally appoint the entire Board of Directors. Does PQR Ltd. control XYZ Ltd. under Ind AS 110?",
    [
      "No, control requires a minimum statutory threshold of 50.01% equity voting rights.",
      "Yes, PQR Ltd. has 'de facto control' because its voting rights are sufficient to give it power over the investee when evaluated in conjunction with the size of its holding relative to the dispersion of other holdings and historical shareholder attendance patterns at general meetings.",
      "PQR Ltd. has significant influence only and must use the equity method under Ind AS 28.",
      "XYZ Ltd. must be accounted for as an associate."
    ],
    1,
    "Ind AS 110 - Paragraphs B41-B45: De Facto Control and Voting Rights Dispersion",
    "Ind AS 110 clarifies that an investor can have power even if it holds less than a majority of the voting rights (de facto control). An investor considers all facts and circumstances, including the size of its holding relative to the dispersion of other vote holders, attendance patterns, and potential voting rights. The widely dispersed retail base enables PQR Ltd. to direct relevant activities unilaterally."
  ),

  makeQ(808, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 110: Elimination of Intra-Group Unrealized Profit on Inventory",
    "Parent Ltd. owns 75% of Subsidiary Ltd. During FY 2023-24, Subsidiary Ltd. sells inventory to Parent Ltd. for ₹40 Crores at a profit margin of 25% on selling price (profit ₹10 Crores). At year-end, 50% of this inventory remains unsold in Parent Ltd.'s warehouse. How is the unrealized intra-group profit eliminated in the consolidated financial statements?",
    [
      "Eliminate ₹10 Crores fully from Parent Ltd.'s retained earnings.",
      "Eliminate unrealized profit of ₹5 Crores (50% of ₹10 Cr) by reducing consolidated inventory by ₹5 Crores; because this is an 'upstream' sale by the subsidiary, the ₹5 Crores profit elimination is allocated between Parent's share (75% = ₹3.75 Cr) and Non-Controlling Interest (25% = ₹1.25 Cr).",
      "No elimination is needed if the transfer was executed at fair market value.",
      "Eliminate ₹5 Crores against Goodwill."
    ],
    1,
    "Ind AS 110 - Paragraph B86(c): Elimination of Intra-Group Profits & Upstream Allocation",
    "Ind AS 110 Paragraph B86(c) requires elimination in full of intra-group assets, liabilities, equity, income, expenses and cash flows relating to transactions between entities of the group. For an upstream sale (subsidiary to parent), unrealized profit in ending inventory (₹5 Cr) is eliminated against the subsidiary's profit, thereby reducing both the parent's share of consolidated profit and the Non-Controlling Interest pro rata."
  ),

  makeQ(809, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 110: Changes in Ownership Interest Without Loss of Control",
    "Parent Ltd. owns 80% of Subsidiary Ltd. (carrying amount of NCI is ₹30 Crores). Parent Ltd. acquires an additional 10% equity stake from non-controlling shareholders for ₹18 Crores cash, increasing its holding to 90%. How should this transaction be recorded in the consolidated financial statements under Ind AS 110?",
    [
      "Calculate additional Goodwill of ₹3 Crores in the consolidated balance sheet.",
      "Accounted for as an equity transaction: NCI is reduced by its proportionate carrying amount of ₹15 Crores (10%/20% of ₹30 Cr), and the difference of ₹3 Crores between consideration paid (₹18 Cr) and the adjustment to NCI (₹15 Cr) is recognized directly in Equity (Retained Earnings) attributable to the parent; NO goodwill or P&L gain/loss is recognized.",
      "Recognize an impairment loss of ₹3 Crores in Profit or Loss.",
      "Recognize ₹3 Crores in OCI."
    ],
    1,
    "Ind AS 110 - Paragraphs 23 & B96: Changes in Proportion Held by Non-Controlling Interests",
    "Ind AS 110 Paragraph 23 states that changes in a parent's ownership interest in a subsidiary that do not result in a loss of control are accounted for as equity transactions (transactions with owners in their capacity as owners). Any difference between the amount by which NCI is adjusted and the fair value of consideration paid or received is recognized directly in equity."
  ),

  makeQ(810, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 110: Loss of Control and Retained Investment Fair Valuation",
    "Parent Ltd. owns 100% of Subsidiary Ltd. with net assets of ₹80 Crores and goodwill of ₹20 Crores (total carrying amount ₹100 Crores). Parent Ltd. sells a 70% stake for ₹105 Crores cash, losing control. The fair value of the retained 30% investment is ₹45 Crores. Parent Ltd. will account for the retained 30% as an associate under Ind AS 28. What is the total gain on loss of control recognized in Profit or Loss under Ind AS 110?",
    [
      "₹5 Crores (₹105 Crores sale proceeds minus ₹100 Crores carrying amount).",
      "₹50 Crores (Aggregate of consideration received ₹105 Cr + fair value of retained 30% investment ₹45 Cr = ₹150 Cr, minus derecognition of net assets and goodwill ₹100 Cr = ₹50 Crores gain recognized in Profit or Loss).",
      "₹35 Crores recognized in OCI.",
      "Zero gain; proceeds are credited to capital reserve."
    ],
    1,
    "Ind AS 110 - Paragraph 25 & Paragraph B98: Gain or Loss on Loss of Control",
    "Under Ind AS 110 Paragraph B98, if a parent loses control of a subsidiary, it shall: (a) derecognize the assets (including goodwill) and liabilities of the subsidiary; (b) recognize the fair value of consideration received; (c) recognize any retained investment at its fair value at the date control is lost; and (d) recognize the resulting difference as a gain or loss in profit or loss attributable to the parent."
  ),

  makeQ(811, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 103: Measurement Period Adjustments",
    "Acquirer Ltd. acquired Target Ltd. on 1st November 2023. At acquisition date, an environmental cleanup liability was provisionally measured at ₹5 Crores. On 15th July 2024 (within the 12-month measurement period), new expert hydrological reports obtained based on facts and circumstances that existed at the acquisition date reveal that the actual cleanup liability was ₹9 Crores. How should this ₹4 Crores increase be accounted for under Ind AS 103?",
    [
      "Recognize an expense of ₹4 Crores in Profit or Loss for FY 2024-25.",
      "Retrospectively adjust the provisional accounting: increase the environmental liability by ₹4 Crores and increase Goodwill by ₹4 Crores as a measurement period adjustment, as if the accounting had been completed at the acquisition date.",
      "Recognize ₹4 Crores in Other Comprehensive Income.",
      "Measurement period adjustments are prohibited after 6 months."
    ],
    1,
    "Ind AS 103 - Paragraphs 45-50: Measurement Period Adjustments",
    "Under Ind AS 103 Paragraph 45, if the initial accounting for a business combination is incomplete by the end of the reporting period, the acquirer reports provisional amounts. During the measurement period (not exceeding one year from acquisition date), the acquirer shall retrospectively adjust provisional amounts recognized at the acquisition date to reflect new information obtained about facts and circumstances that existed as of the acquisition date, adjusting Goodwill accordingly."
  ),

  makeQ(812, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 103: Step Acquisition (Business Combination Achieved in Stages)",
    "Alpha Ltd. held a 20% equity investment in Beta Ltd. carried at fair value of ₹25 Crores (cost was ₹20 Crores, with cumulative fair value gain of ₹5 Crores recognized in OCI). On 1st April 2023, Alpha Ltd. acquires an additional 60% stake in Beta Ltd. for ₹90 Crores cash, gaining control. At acquisition date, the fair value of Alpha Ltd.'s initial 20% stake is ₹30 Crores. How is the initial 20% stake treated under Ind AS 103?",
    [
      "Carried forward at historical cost of ₹20 Crores.",
      "Remeasured to its acquisition-date fair value of ₹30 Crores; the resulting gain of ₹10 Crores (or reclassification of prior OCI amounts) is recognized in Profit or Loss, and total consideration transferred for the 80% stake is ₹120 Crores (₹90 Cr cash + ₹30 Cr fair value of previous holding).",
      "Credited directly to Securities Premium.",
      "No remeasurement is permitted."
    ],
    1,
    "Ind AS 103 - Paragraphs 41-42: Business Combination Achieved in Stages",
    "In a business combination achieved in stages, the acquirer shall remeasure its previously held equity interest in the acquiree at its acquisition-date fair value and recognize the resulting gain or loss in profit or loss. Any amounts previously recognized in other comprehensive income in respect of that interest are accounted for on the same basis as would be required if the acquirer had disposed directly of the previously held interest."
  ),

  makeQ(813, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 110: Investment Entity Exemption from Consolidation",
    "Ventures Fund Ltd. meets all criteria of an 'Investment Entity' under Ind AS 110 (it obtains funds from investors, its business purpose is investing solely for capital appreciation and investment income, and it measures all investments at fair value). Ventures Fund Ltd. owns 80% of an operating tech startup. How should Ventures Fund Ltd. account for this subsidiary in its financial statements?",
    [
      "It must prepare consolidated financial statements and consolidate the subsidiary line-by-line.",
      "It is exempt from consolidating the subsidiary; instead, it must measure the investment in the subsidiary at Fair Value Through Profit or Loss (FVTPL) in accordance with Ind AS 109.",
      "Account for it using the equity method under Ind AS 28.",
      "Account for it at historical cost under Ind AS 27."
    ],
    1,
    "Ind AS 110 - Paragraphs 31-33: Investment Entity Exemption",
    "Ind AS 110 Paragraph 31 provides an explicit exception to consolidation: an investment entity shall not consolidate its subsidiaries or apply Ind AS 103 when it obtains control of another entity. Instead, an investment entity shall measure an investment in a subsidiary at fair value through profit or loss in accordance with Ind AS 109 (except for subsidiaries that provide investment-related services to the investment entity)."
  ),

  makeQ(814, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 110: Uniform Accounting Policies in Consolidation",
    "Parent Ltd. measures its manufacturing plant using the Cost Model under Ind AS 16. Its subsidiary, Sub Ltd., measures its manufacturing plant using the Revaluation Model under Ind AS 16. When preparing the Consolidated Financial Statements of the group under Ind AS 110, how must this difference be handled?",
    [
      "Parent Ltd. can simply aggregate the figures without any adjustments because each company is an independent legal entity.",
      "Consolidated financial statements must be prepared using uniform accounting policies for like transactions and other events in similar circumstances; Sub Ltd.'s plant must be adjusted to the Cost Model in the consolidation worksheets to conform with the parent's group accounting policy.",
      "Parent Ltd. must switch to the Revaluation Model across all group companies.",
      "The subsidiary must be excluded from consolidation."
    ],
    1,
    "Ind AS 110 - Paragraph B87: Uniform Accounting Policies",
    "Ind AS 110 Paragraph B87 specifies: 'If a member of the group uses accounting policies other than those adopted in the consolidated financial statements for like transactions and events in similar circumstances, appropriate adjustments are made to that group member's financial statements in preparing the consolidated financial statements to ensure conformity with the group's accounting policies.'"
  ),

  makeQ(815, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 103: Pre-Existing Relationships Settlement",
    "Prior to acquisition, Acquirer Ltd. and Target Ltd. were in litigation where Acquirer Ltd. was suing Target Ltd. for breach of supply contract. On 1st April 2023, Acquirer Ltd. acquires 100% of Target Ltd. for ₹100 Crores. At acquisition date, the fair value of the pending lawsuit was ₹10 Crores. How is this pre-existing relationship accounted for under Ind AS 103?",
    [
      "Included entirely in the purchase consideration for Target Ltd.",
      "Treated as a separate transaction from the business combination; Acquirer Ltd. recognizes a settlement of the pre-existing legal relationship (debiting/crediting P&L for any gain/loss on settlement) and allocates only the remaining consideration of ₹90 Crores to the business combination.",
      "Ignored and written off to General Reserve.",
      "Recognized as an impairment of goodwill."
    ],
    1,
    "Ind AS 103 - Paragraphs 51-52 & Paragraphs B51-B53: Settlement of Pre-Existing Relationships",
    "Ind AS 103 requires an acquirer to determine whether a transaction is part of the business combination or a separate transaction. A pre-existing relationship (such as a contract or lawsuit) between the acquirer and acquiree that is settled in connection with the combination is accounted for separately. Any settlement gain or loss is recognized in profit or loss and excluded from consideration transferred."
  ),

  makeQ(816, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 110: Elimination of Intra-Group Fixed Asset Transfer",
    "On 1st April 2023, Parent Ltd. sells an item of plant to its 80% subsidiary for ₹50 Lakhs (carrying amount in Parent's books was ₹30 Lakhs; profit ₹20 Lakhs). Subsidiary Ltd. depreciates the plant over its remaining useful life of 5 years on a straight-line basis (depreciation ₹10 Lakhs/year). On 31st March 2024, how is this intra-group plant transfer adjusted in the consolidated financial statements?",
    [
      "Eliminate ₹20 Lakhs profit against Plant; eliminate ₹4 Lakhs excess depreciation (₹20L / 5 years) by crediting depreciation expense; net reduction in consolidated plant carrying amount is ₹16 Lakhs, with net reduction in consolidated profit of ₹16 Lakhs.",
      "Eliminate full ₹20 Lakhs permanently without depreciation adjustments.",
      "No adjustment is made because the subsidiary paid market price.",
      "Eliminate ₹20 Lakhs against NCI."
    ],
    0,
    "Ind AS 110 - Paragraph B86: Elimination of Intra-Group Profits on Depreciable Assets",
    "In consolidated financial statements, the plant must appear as if the transfer never occurred: carrying amount = ₹30L - (1/5 × ₹30L) = ₹24 Lakhs. Subsidiary's book value = ₹50L - ₹10L = ₹40 Lakhs. Elimination entry reduces Plant by ₹16 Lakhs (₹40L - ₹24L), reduces Parent profit by ₹20L, and reduces depreciation expense by ₹4 Lakhs (net impact on consolidated profit = -₹16 Lakhs)."
  ),

  makeQ(817, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 103: Indemnification Assets",
    "In a business combination, the seller provides a contractual indemnity to Acquirer Ltd. to reimburse up to ₹15 Crores for any unfavorable outcome arising from a pre-acquisition tax litigation of Target Ltd. At acquisition date, Acquirer recognizes a tax litigation provision of ₹10 Crores under Ind AS 37. How should Acquirer Ltd. recognize the indemnification asset under Ind AS 103?",
    [
      "At maximum indemnity cap of ₹15 Crores.",
      "At the same time and on the same measurement basis as the indemnified item: an indemnification asset of ₹10 Crores is recognized on acquisition date, subject to any contractual limitations or collectibility assessment.",
      "Recognized in OCI as a reserve.",
      "Indemnification assets are not recognized under Ind AS."
    ],
    1,
    "Ind AS 103 - Paragraphs 27-28: Indemnification Assets",
    "Ind AS 103 Paragraph 27 states that the acquirer shall recognize an indemnification asset at the same time and measured on the same basis as the indemnified item, subject to the need for a valuation allowance for uncollectible amounts. If the indemnified liability is measured at ₹10 Crores, the indemnification asset is recognized at ₹10 Crores."
  ),

  makeQ(818, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 110: Potential Voting Rights in Assessing Control",
    "Alpha Ltd. holds 40% of the voting shares of Beta Ltd. Gamma Ltd. holds 60%. However, Alpha Ltd. holds currently exercisable call options to acquire an additional 25% voting shares from Gamma Ltd. at a deep discount to market price. How do these potential voting rights impact the assessment of control under Ind AS 110?",
    [
      "Potential voting rights are completely ignored until they are legally exercised and registered.",
      "Currently exercisable substantive potential voting rights must be considered; because the call options are currently exercisable and deeply in the money (giving Alpha Ltd. the practical ability to direct relevant activities), Alpha Ltd. has power over Beta Ltd. and controls Beta Ltd.",
      "Control is split 50:50 between Alpha and Gamma.",
      "Potential voting rights require consolidation only if Gamma consents."
    ],
    1,
    "Ind AS 110 - Paragraphs B47-B50: Substantive Potential Voting Rights",
    "Ind AS 110 states that when assessing whether an investor has power, the investor considers its potential voting rights as well as potential voting rights held by other parties. Potential voting rights are considered only if the rights are substantive (i.e. the holder has the practical ability to exercise them, such as when options are currently exercisable and in the money)."
  ),

  makeQ(819, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 103: Intangible Assets Not Recognized in Acquiree's Separate Books",
    "In acquiring Target Software Ltd., Acquirer Ltd. identifies an unpatented proprietary source code algorithm and an active customer relationship contract portfolio. Neither item was recognized on Target Software Ltd.'s historical balance sheet because they were internally generated. Can Acquirer Ltd. recognize these items as Intangible Assets in the business combination under Ind AS 103?",
    [
      "No, only assets that were previously recognized on the acquiree's balance sheet can be recognized.",
      "Yes, the acquirer recognizes separately from goodwill the identifiable intangible assets acquired in a business combination if they meet either the 'separability criterion' or the 'contractual-legal criterion', regardless of whether they were recognized by the acquiree prior to the combination.",
      "They must be subsumed into Goodwill.",
      "Recognized in Other Comprehensive Income."
    ],
    1,
    "Ind AS 103 - Paragraphs B31-B34: Identifiable Intangible Assets in Business Combinations",
    "Ind AS 103 Paragraph B31 states that the acquirer recognizes separately from goodwill the identifiable intangible assets acquired in a business combination. An intangible asset is identifiable if it meets either the contractual-legal criterion (customer contracts) or the separability criterion (unpatented software/code capable of being sold or licensed), even if not recognized by the acquiree prior to acquisition."
  ),

  makeQ(820, 8, "Business Combinations and Consolidated Financial Statements", "Ind AS 110: Allocation of Comprehensive Income to NCI",
    "Subsidiary Ltd. incurs a total comprehensive loss of ₹40 Crores during the year. Non-Controlling Interest (NCI) holds a 20% stake. Historically, NCI's carrying amount was ₹5 Crores. If the 20% share of current losses (₹8 Crores) is allocated to NCI, its balance will become negative (-₹3 Crores). Under Ind AS 110, can NCI have a deficit (negative) balance?",
    [
      "No, NCI can never be negative; any loss exceeding NCI's carrying amount must be absorbed 100% by the parent.",
      "Yes, profit or loss and each component of Other Comprehensive Income shall be attributed to the owners of the parent and to non-controlling interests even if this results in the non-controlling interests having a deficit balance.",
      "The subsidiary must be liquidated immediately.",
      "NCI is reset to zero and the excess is recorded in a suspense account."
    ],
    1,
    "Ind AS 110 - Paragraph B94: Attribution of Losses to NCI Resulting in Deficit Balance",
    "Ind AS 110 Paragraph B94 explicitly states: 'Profit or loss and each component of other comprehensive income are attributed to the owners of the parent and to the non-controlling interests. Total comprehensive income is attributed to the owners of the parent and to the non-controlling interests even if this results in the non-controlling interests having a deficit balance.' NCI can be negative."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_8_business_combinations_consolidation.json'), JSON.stringify(t8Qs, null, 2), 'utf8');
console.log('Saved Topic 8: 20 Questions');
console.log('--- Part 2 complete: Topics 5 to 8 generated (80 questions total) ---');

