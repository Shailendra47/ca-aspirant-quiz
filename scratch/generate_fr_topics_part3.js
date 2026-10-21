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
// TOPIC 9: Associates and Joint Arrangements (Ind AS 28, 111) (20 Questions)
// =========================================================================
const t9Qs = [
  makeQ(901, 9, "Associates and Joint Arrangements", "Ind AS 28: Significant Influence - 20% Presumption & Qualitative Factors",
    "Investor Ltd. holds 18% of the voting equity shares in Associate Ltd. However, under a contractual agreement, Investor Ltd. has appointed 2 out of 7 directors to the Board, actively participates in policy-making processes regarding dividends, and routinely exchanges technical management personnel. Does Investor Ltd. have significant influence under Ind AS 28?",
    [
      "No, significant influence legally requires holding at least 20% of the voting power.",
      "Yes, although Investor Ltd. holds less than 20% of voting power, significant influence is clearly demonstrated by representation on the board of directors, participation in policy-making, and interchange of managerial personnel.",
      "Investor Ltd. has control and must consolidate 100% of Associate Ltd.",
      "The investment must be accounted for at FVTPL under Ind AS 109."
    ],
    1,
    "Ind AS 28 (Investments in Associates and Joint Ventures) - Paragraphs 5-6: Indicators of Significant Influence",
    "Ind AS 28 Paragraph 5 states that holding 20% or more creates a rebuttable presumption of significant influence. Conversely, if the investor holds less than 20%, it is presumed not to have significant influence unless such influence can be clearly demonstrated. Paragraph 6 lists key indicators: (a) representation on the board of directors; (b) participation in policy-making processes; (c) material transactions between entities; (d) interchange of managerial personnel; or (e) provision of essential technical information."
  ),

  makeQ(902, 9, "Associates and Joint Arrangements", "Ind AS 28: Downstream Transaction Unrealized Profit Elimination",
    "Investor Ltd. owns a 30% equity interest in Associate Ltd. During FY 2023-24, Investor Ltd. sells goods costing ₹70 Lakhs to Associate Ltd. for ₹1,00,00,000 (profit ₹30 Lakhs). At the end of the year, all of these goods remain unsold in Associate Ltd.'s warehouse. How is the unrealized intra-group profit eliminated in Investor Ltd.'s financial statements under Ind AS 28?",
    [
      "Eliminate 100% of the profit (₹30 Lakhs) against the investment carrying amount.",
      "Eliminate Investor Ltd.'s share of the unrealized profit: 30% of ₹30 Lakhs = ₹9 Lakhs is eliminated by debiting Profit or Loss (reducing revenue/profit) and crediting the Investment in Associate carrying amount.",
      "No elimination is required because an associate is an independent corporate entity.",
      "Eliminate ₹9 Lakhs against Non-Controlling Interest."
    ],
    1,
    "Ind AS 28 - Paragraph 28: Downstream Transactions & Elimination of Profits",
    "Under Ind AS 28 Paragraph 28, gains and losses resulting from 'upstream' and 'downstream' transactions between an entity (including its consolidated subsidiaries) and its associate or joint venture are recognized in the entity's financial statements only to the extent of unrelated investors' interests in the associate or joint venture. Investor Ltd.'s share in the associate's gains or losses resulting from these transactions is eliminated."
  ),

  makeQ(903, 9, "Associates and Joint Arrangements", "Ind AS 28: Upstream Transaction Unrealized Profit Elimination",
    "Associate Ltd. sells specialized components to Investor Ltd. (which holds 25% equity in Associate Ltd.) for ₹80 Lakhs at a profit of ₹20 Lakhs. At year-end, the entire inventory remains unsold in Investor Ltd.'s warehouse. How is the unrealized profit eliminated in Investor Ltd.'s consolidated financial statements under Ind AS 28?",
    [
      "Eliminate ₹20 Lakhs from consolidated inventory.",
      "Eliminate Investor Ltd.'s share of unrealized profit (25% of ₹20 Lakhs = ₹5 Lakhs) by debiting Share of Profit of Associate and crediting Consolidated Inventory by ₹5 Lakhs.",
      "Eliminate ₹5 Lakhs against Investment in Associate.",
      "No elimination is permitted for upstream transactions."
    ],
    1,
    "Ind AS 28 - Paragraph 28: Upstream Transactions",
    "In an upstream transaction (associate to investor), the unrealized profit resides inside the investor's ending inventory. Therefore, the investor eliminates its share of the unrealized profit (25% × ₹20L = ₹5 Lakhs) by debiting Share of Profit of Associate in P&L and crediting the carrying amount of Inventory on the consolidated balance sheet."
  ),

  makeQ(904, 9, "Associates and Joint Arrangements", "Ind AS 28: Cumulative Losses Exceeding Investment Carrying Amount",
    "Investor Ltd. holds a 40% equity interest in Associate Ltd. with a carrying amount of ₹10 Crores. In Year 1, Associate Ltd. incurs a total comprehensive loss of ₹40 Crores (Investor's 40% share = ₹16 Crores). Investor Ltd. has also granted an unsecured long-term loan of ₹4 Crores to Associate Ltd. (which forms part of the net investment). Investor Ltd. has no legal or constructive obligation to fund further losses. What is the loss recognized by Investor Ltd. under Ind AS 28?",
    [
      "Recognize full loss of ₹16 Crores and establish a provision of ₹2 Crores under liabilities.",
      "Recognize loss of ₹14 Crores: reducing the equity investment of ₹10 Crores to Nil, and reducing the long-term loan of ₹4 Crores to Nil; the remaining unabsorbed loss of ₹2 Crores is discontinued and disclosed off-balance sheet.",
      "Recognize loss strictly up to the equity investment of ₹10 Crores, leaving the loan untouched.",
      "Zero loss recognized until Associate is liquidated."
    ],
    1,
    "Ind AS 28 - Paragraph 38: Losses in Excess of Investment",
    "Under Ind AS 28 Paragraph 38, if an entity's share of losses of an associate equals or exceeds its interest in the associate, the entity discontinues recognizing its share of further losses. The interest in an associate is the carrying amount of the investment under the equity method together with any long-term interests that, in substance, form part of the entity's net investment (such as long-term loans). Losses are recognized until the net investment is reduced to zero."
  ),

  makeQ(905, 9, "Associates and Joint Arrangements", "Ind AS 111: Joint Arrangement Classification - Joint Operation vs Joint Venture",
    "PetroIndia Ltd. and GasCorp Ltd. establish an unincorporated consortium 'DeepSea Joint Venture' to explore an offshore gas block. The legal contract specifies that the parties have joint control, each party has rights to the underlying pipeline and drilling assets in a 50:50 ratio, obligations for the liabilities incurred are borne directly 50:50, and gas output is shared in kind. How is this arrangement classified under Ind AS 111?",
    [
      "Joint Venture, accounted for using the equity method under Ind AS 28.",
      "Joint Operation, because the parties have direct rights to the assets and direct obligations for the liabilities relating to the arrangement; each party recognizes its share of assets, liabilities, revenues, and expenses directly on its balance sheet.",
      "Subsidiary of PetroIndia Ltd.",
      "Financial Instrument under Ind AS 109."
    ],
    1,
    "Ind AS 111 (Joint Arrangements) - Paragraphs 14-16 & Appendix B",
    "Ind AS 111 classifies a joint arrangement as either a joint operation or a joint venture based on the rights and obligations of the parties. A joint operation is a joint arrangement whereby the parties that have joint control of the arrangement have rights to the assets, and obligations for the liabilities, relating to the arrangement. Parties recognize their share of assets, liabilities, revenues and expenses line-by-line."
  ),

  makeQ(906, 9, "Associates and Joint Arrangements", "Ind AS 111: Joint Venture Accounting Method",
    "How does Ind AS 111 and Ind AS 28 mandate the accounting treatment for an investment in a 'Joint Venture' in an entity's consolidated financial statements?",
    [
      "Proportionate Consolidation (line-by-line consolidation of 50% assets and liabilities).",
      "Equity Method in accordance with Ind AS 28 (single line-item on balance sheet and single line-item in P&L for share of profit/loss).",
      "Fair Value Through Profit or Loss under Ind AS 109.",
      "Cost Model under Ind AS 27."
    ],
    1,
    "Ind AS 111 - Paragraph 24 & Ind AS 28: Equity Method for Joint Ventures",
    "Ind AS 111 Paragraph 24 states: 'A joint venturer shall recognize its interest in a joint venture as an investment and shall account for that investment using the equity method in accordance with Ind AS 28.' Proportionate consolidation is prohibited under Ind AS."
  ),

  makeQ(907, 9, "Associates and Joint Arrangements", "Ind AS 28: Discontinuation of Equity Method",
    "Parent Ltd. owns 35% of Associate Ltd. On 1st October 2023, Parent Ltd. sells 25% of Associate Ltd. for ₹50 Crores, retaining a 10% equity holding (fair value ₹20 Crores). Carrying amount of the 35% holding prior to sale was ₹42 Crores. With the 10% holding, Parent Ltd. loses significant influence. How should the transaction be accounted for under Ind AS 28?",
    [
      "The retained 10% is carried forward at historical cost of ₹12 Crores.",
      "An entity shall discontinue the use of the equity method from the date when its investment ceases to be an associate; it measures the retained 10% interest at fair value (₹20 Cr); the total gain recognized in Profit or Loss is ₹28 Crores (Consideration ₹50 Cr + Retained fair value ₹20 Cr - Carrying amount ₹42 Cr).",
      "All proceeds are credited to Capital Reserve.",
      "No gain or loss is recognized until the remaining 10% is sold."
    ],
    1,
    "Ind AS 28 - Paragraph 22: Discontinuance of the Equity Method",
    "Under Ind AS 28 Paragraph 22, an entity shall discontinue the use of the equity method from the date when its investment ceases to be an associate. On the loss of significant influence, the investor shall measure at fair value any investment the investor retains in the former associate. The investor recognizes in profit or loss the difference between: (a) the fair value of any retained interest plus proceeds from disposal; and (b) the carrying amount of the investment at the date the equity method was discontinued."
  ),

  makeQ(908, 9, "Associates and Joint Arrangements", "Ind AS 111: Operator of a Joint Operation Accounting",
    "Alpha Ltd. is the operator of a 50:50 Joint Operation with Beta Ltd. Alpha Ltd. purchases materials of ₹10 Crores on behalf of the joint operation and bills Beta Ltd. for its ₹5 Crores share. Alpha Ltd. does not charge a management fee or margin. How does Alpha Ltd. present this transaction in its statement of profit and loss?",
    [
      "Alpha Ltd. records ₹10 Crores as revenue and ₹10 Crores as cost of sales.",
      "Alpha Ltd. recognizes only its own 50% share of costs (₹5 Crores) as an expense; the ₹5 Crores reimbursement from Beta Ltd. is not treated as revenue, because Alpha Ltd. acts as an agent in billing the co-venturer.",
      "Alpha Ltd. records ₹5 Crores as other operating revenue.",
      "Alpha Ltd. recognizes the full ₹10 Crores as inventory."
    ],
    1,
    "Ind AS 111 - Paragraphs 20-22 & B34-B37: Accounting for Joint Operations",
    "Under Ind AS 111, a joint operator accounts for its own share of assets, liabilities, revenues, and expenses. When an operator acts on behalf of the joint operation and receives reimbursements for costs incurred without margin, the operator acts as an agent; it does not report gross revenues and costs, but reflects only its net contractual share of expenses."
  ),

  makeQ(909, 9, "Associates and Joint Arrangements", "Ind AS 28: Impairment of Investment in Associate",
    "Investor Ltd. holds an associate with a carrying amount of ₹100 Crores (which includes implicit goodwill of ₹25 Crores determined at initial acquisition). The associate suffers an economic downturn. How is the investment tested for impairment under Ind AS 28 and Ind AS 36?",
    [
      "Goodwill of ₹25 Crores must be tested separately for impairment every year.",
      "Because implicit goodwill forms part of the carrying amount of the net investment in the associate, it is NOT tested separately for impairment; instead, the entire carrying amount of the investment is tested for impairment as a single asset under Ind AS 36 by comparing its recoverable amount (higher of value in use and fair value less costs of disposal) with its carrying amount.",
      "Associates are exempt from impairment testing under Ind AS.",
      "Impairment is allocated strictly to implicit goodwill first."
    ],
    1,
    "Ind AS 28 - Paragraphs 40-42: Impairment Testing of Associates",
    "Ind AS 28 Paragraph 42 states: 'Because goodwill that forms part of the carrying amount of an investment in an associate or a joint venture is not separately recognized, it is not tested for impairment separately by applying the requirements for impairment testing goodwill in Ind AS 36. Instead, the entire carrying amount of the investment is tested for impairment in accordance with Ind AS 36 as a single asset.'"
  ),

  makeQ(910, 9, "Associates and Joint Arrangements", "Ind AS 28: Differences in Reporting Dates",
    "The financial statements of an associate are prepared to 31st December each year, whereas the investor's reporting date is 31st March. Under Ind AS 28, what are the requirements regarding the time lag and adjustments?",
    [
      "The associate must change its statutory financial year to 31st March immediately.",
      "The difference between the reporting date of the associate and that of the investor shall be no more than three months; adjustments must be made for the effects of significant transactions or events that occur between that date and the date of the investor's financial statements.",
      "A time lag of up to 12 months is permissible without adjustments.",
      "The investor must consolidate the associate using budgeted numbers."
    ],
    1,
    "Ind AS 28 - Paragraphs 33-34: Difference in Reporting Dates",
    "Under Ind AS 28 Paragraph 34, when the financial statements of an associate or joint venture used in applying the equity method are prepared as of a date different from that used by the entity, the difference between the end of the reporting period of the associate and that of the entity shall be no more than three months. The length of reporting periods and any difference between the ends of the reporting periods shall be the same from period to period."
  ),

  makeQ(911, 9, "Associates and Joint Arrangements", "Ind AS 111: Separate Legal Vehicle Assessment",
    "When a joint arrangement is structured through a separate legal entity (e.g. a private limited company incorporated under the Companies Act 2013), what is the primary consideration in determining whether it is a Joint Venture or a Joint Operation?",
    [
      "The presence of a separate legal vehicle automatically makes it a Joint Operation.",
      "The separate vehicle provides a legal separation between the vehicle and its owners, causing the assets and liabilities to be those of the separate vehicle; it is classified as a Joint Venture unless the legal form, contractual terms, or other facts and circumstances give the parties direct rights to the assets and obligations for the liabilities.",
      "All incorporated entities are treated as subsidiaries under Ind AS 110.",
      "Classification depends solely on the capital contribution percentage."
    ],
    1,
    "Ind AS 111 - Paragraph B16-B33: Assessing Joint Arrangement Structure",
    "When a joint arrangement is structured through a separate vehicle, the legal form initially confers rights to net assets (Joint Venture). However, the parties must assess whether contractual terms or other facts and circumstances (e.g. parties taking all output and financing debt) override the legal form to give direct rights to assets and obligations for liabilities (Joint Operation)."
  ),

  makeQ(912, 9, "Associates and Joint Arrangements", "Ind AS 28: Inter-Company Dividends from Associate",
    "Associate Ltd. declares and pays a cash dividend of ₹10 Crores to its shareholders. Investor Ltd. holds a 30% equity stake (receiving ₹3 Crores). How should Investor Ltd. record this ₹3 Crores cash dividend under the equity method in its consolidated financial statements?",
    [
      "Recognize ₹3 Crores as Dividend Income in the Statement of Profit and Loss.",
      "Debit Cash ₹3 Crores and Credit Investment in Associate ₹3 Crores (reducing the carrying amount of the investment, because distributions received from an investee reduce the carrying amount of the investment under the equity method).",
      "Credit Other Comprehensive Income ₹3 Crores.",
      "Credit Retained Earnings directly."
    ],
    1,
    "Ind AS 28 - Paragraph 10: Distributions Under the Equity Method",
    "Under the equity method defined in Ind AS 28 Paragraph 10, the investment in an associate or a joint venture is initially recognized at cost and adjusted thereafter for the post-acquisition change in the investor's share of the investee's net assets. Distributions (dividends) received from an investee reduce the carrying amount of the investment."
  ),

  makeQ(913, 9, "Associates and Joint Arrangements", "Ind AS 28: Potential Voting Rights in Assessing Significant Influence",
    "Investor Ltd. holds 15% voting equity shares in Target Ltd., but also holds currently exercisable share warrants that, if exercised, would immediately increase its holding to 25%. How do these potential voting rights affect significant influence under Ind AS 28?",
    [
      "Potential voting rights are not considered under Ind AS 28.",
      "Currently exercisable potential voting rights that are substantive are considered when assessing whether an entity has significant influence; because the warrants are currently exercisable and substantive, they demonstrate that Investor Ltd. has significant influence.",
      "Investor Ltd. must recognize control.",
      "Warrants must be exercised before significant influence can be claimed."
    ],
    1,
    "Ind AS 28 - Paragraphs 7-8: Potential Voting Rights",
    "Ind AS 28 Paragraph 7 states: 'An entity may own share warrants, share call options, debt or equity instruments that are convertible into ordinary shares... The existence and effect of potential voting rights that are currently exercisable or convertible, including potential voting rights held by other entities, are considered when assessing whether an entity has significant influence.'"
  ),

  makeQ(914, 9, "Associates and Joint Arrangements", "Ind AS 111: Accounting for Sales/Contributions of Assets to Joint Operation",
    "A joint operator enters into a transaction with a joint operation to sell an item of machinery (cost ₹40 Lakhs) for ₹60 Lakhs (gain ₹20 Lakhs). The joint operator holds a 40% interest in the joint operation. At year-end, the machinery is still held by the joint operation. What gain on sale does the joint operator recognize in its profit or loss?",
    [
      "Full gain of ₹20 Lakhs.",
      "₹12 Lakhs (the operator recognizes gains and losses resulting from such a transaction only to the extent of the other parties' interests in the joint operation: 60% of ₹20 Lakhs = ₹12 Lakhs; its own 40% share of ₹8 Lakhs is eliminated).",
      "Zero gain until the machinery is sold to an independent third party.",
      "₹8 Lakhs."
    ],
    1,
    "Ind AS 111 - Paragraph B34: Sales of Assets to a Joint Operation",
    "Under Ind AS 111 Paragraph B34, when an entity enters into a transaction with a joint operation in which it is a joint operator, such as a sale or contribution of assets, it is conducting the transaction with the other parties to the joint operation. The joint operator shall recognize gains and losses resulting from such a transaction only to the extent of the other parties' interests in the joint operation."
  ),

  makeQ(915, 9, "Associates and Joint Arrangements", "Ind AS 28: Other Comprehensive Income of an Associate",
    "During the year, Associate Ltd. recognizes a revaluation gain on land of ₹10 Crores in Other Comprehensive Income (OCI). Investor Ltd. holds a 25% stake in Associate Ltd. How does Investor Ltd. record its 25% share (₹2.5 Crores) in its consolidated financial statements?",
    [
      "Recognized as operating revenue in Profit or Loss.",
      "Recognized in Other Comprehensive Income (OCI) as Investor's share of OCI of associate, and added to the carrying amount of the Investment in Associate.",
      "Deferred as a liability on the balance sheet.",
      "Deducted from goodwill."
    ],
    1,
    "Ind AS 28 - Paragraph 10: Share of OCI of an Associate",
    "Ind AS 28 Paragraph 10 states: 'The investor's share of the investee's profit or loss is recognized in the investor's profit or loss. The investor's share of the investee's other comprehensive income is recognized in the investor's other comprehensive income.' The entry debits Investment in Associate and credits Share of OCI of Associate."
  ),

  makeQ(916, 9, "Associates and Joint Arrangements", "Ind AS 111: Reclassification from Joint Venture to Joint Operation",
    "If contractual terms of a joint arrangement are amended such that the parties now have direct rights to the assets and direct obligations for the liabilities of the arrangement, how is the transition from Joint Venture to Joint Operation accounted for?",
    [
      "The entity continues using the equity method under grandfathering rules.",
      "The entity derecognizes the investment in the joint venture and recognizes its share of each asset and liability of the joint operation, recognizing any difference in Profit or Loss.",
      "The entity consolidates the arrangement as a subsidiary.",
      "Accounted for as a prior period error."
    ],
    1,
    "Ind AS 111 - Transition and Reclassification Rules",
    "When an arrangement changes from a joint venture to a joint operation, the entity ceases applying the equity method and begins recognizing its proportionate share of assets, liabilities, revenues, and expenses. Any difference between the net carrying amount of the derecognized investment and the net identifiable assets recognized is recognized in profit or loss."
  ),

  makeQ(917, 9, "Associates and Joint Arrangements", "Ind AS 28: Investment in Associate Held for Sale (Ind AS 105)",
    "On 1st January 2024, the Board of Directors of Investor Ltd. committed to a plan to sell its entire 30% investment in Associate Ltd. within 6 months. The criteria for classification as 'Held for Sale' under Ind AS 105 are met. How should the investment in the associate be accounted for from 1st January 2024?",
    [
      "Continue applying the equity method until the sale is completed.",
      "Discontinue the equity method; measure the investment at the lower of its carrying amount under equity method at classification date and fair value less costs to sell, and present it separately as a Non-Current Asset Held for Sale under current assets.",
      "Write off the investment immediately to Profit or Loss.",
      "Transfer the investment to FVTPL."
    ],
    1,
    "Ind AS 28 - Paragraph 20 & Ind AS 105: Associates Held for Sale",
    "Under Ind AS 28 Paragraph 20, an entity shall apply Ind AS 105 to an investment, or a portion of an investment, in an associate or a joint venture that meets the criteria to be classified as held for sale. The equity method ceases on the date of classification as held for sale, and the asset is measured under Ind AS 105 at the lower of carrying amount and fair value less costs to sell."
  ),

  makeQ(918, 9, "Associates and Joint Arrangements", "Ind AS 111: Joint Operator Acquiring an Interest in a Joint Operation Constituting a Business",
    "Alpha Ltd. acquires a 30% interest in a Joint Operation whose activity constitutes a business as defined in Ind AS 103. How must Alpha Ltd. account for the acquisition of this interest under Ind AS 111?",
    [
      "Account for it strictly at historical cash paid without purchase price allocation.",
      "Apply all of the principles on business combinations accounting in Ind AS 103 (recognizing identifiable assets and liabilities at fair value, measuring transaction costs as expenses, and recognizing goodwill or bargain purchase gain).",
      "Account for it as an associate under Ind AS 28.",
      "Exclude it from financial statements."
    ],
    1,
    "Ind AS 111 - Paragraph 21A & Paragraph B33A: Joint Operation Constituting a Business",
    "Ind AS 111 Paragraph 21A states: 'When an entity acquires an interest in a joint operation in which the activity of the joint operation constitutes a business, as defined in Ind AS 103, it shall apply, to the extent of its share, all of the principles on business combinations accounting in Ind AS 103, and other Ind ASs that do not conflict with the guidance in this Ind AS.' Goodwill is recognized on the acquisition."
  ),

  makeQ(919, 9, "Associates and Joint Arrangements", "Ind AS 28: Presentation in Separate Financial Statements",
    "In its Separate Financial Statements (prepared under Ind AS 27), how may an entity account for its investments in associates and joint ventures?",
    [
      "Exclusively using proportionate consolidation.",
      "Either: (a) at cost; (b) in accordance with Ind AS 109 (at FVTPL or FVOCI); or (c) using the equity method as described in Ind AS 28.",
      "Only at net realizable value.",
      "Separate financial statements cannot include investments in associates."
    ],
    1,
    "Ind AS 27 (Separate Financial Statements) - Paragraph 10",
    "Under Ind AS 27 Paragraph 10, when an entity prepares separate financial statements, it shall account for investments in subsidiaries, joint ventures and associates either: (a) at cost; (b) in accordance with Ind AS 109; or (c) using the equity method as described in Ind AS 28. The entity shall apply the same accounting for each category of investments."
  ),

  makeQ(920, 9, "Associates and Joint Arrangements", "Ind AS 28: Goodwill Included in Investment in Associate",
    "Investor Ltd. acquires a 25% stake in Target Ltd. for ₹50 Crores. The fair value of Target Ltd.'s identifiable net assets is ₹160 Crores (Investor's 25% share = ₹40 Crores). The excess ₹10 Crores represents implicit goodwill. How is this ₹10 Crores presented on Investor Ltd.'s balance sheet?",
    [
      "Presented separately as a distinct Goodwill line item under Intangible Assets.",
      "Included in the carrying amount of the investment in the associate (total investment presented as ₹50 Crores); separate presentation of goodwill and amortization of goodwill are both prohibited.",
      "Expensed immediately in Profit or Loss.",
      "Deducted from Other Equity."
    ],
    1,
    "Ind AS 28 - Paragraph 32(a): Implicit Goodwill in Associate",
    "Ind AS 28 Paragraph 32(a) states: 'Goodwill relating to an associate or a joint venture is included in the carrying amount of the investment. Amortization of that goodwill is not permitted.' Goodwill is not recognized as a separate asset on the balance sheet, but remains embedded within the single line-item 'Investment in Associates'."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_9_associates_joint_arrangements.json'), JSON.stringify(t9Qs, null, 2), 'utf8');
console.log('Saved Topic 9: 20 Questions');

// =========================================================================
// TOPIC 10: Foreign Currency Transactions and Hyperinflation (Ind AS 21, 29) (20 Questions)
// =========================================================================
const t10Qs = [
  makeQ(1001, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Determination of Functional Currency - Primary vs Secondary Factors",
    "Global Exports Ltd. is incorporated in India. 85% of its sales revenues are invoiced and collected in US Dollars (USD). Labor, materials, and local compliance costs are incurred and settled in Indian Rupees (INR). Financing was raised in USD bonds on the Singapore exchange. Under Ind AS 21, what are the primary factors in determining the functional currency?",
    [
      "The currency of the country in which the registered corporate office is situated (INR).",
      "The currency that mainly influences sales prices for goods and services, and the currency of the country whose competitive forces and regulations mainly determine the sales prices, along with the currency that mainly influences labor, material, and other operating costs.",
      "The currency chosen by the Board of Directors.",
      "The presentation currency of the parent company."
    ],
    1,
    "Ind AS 21 (The Effects of Changes in Foreign Exchange Rates) - Paragraphs 9-10: Primary Factors for Functional Currency",
    "Ind AS 21 Paragraph 9 states that the primary factors are: (a) the currency that mainly influences sales prices for goods and services; and (b) the currency of the country whose competitive forces and regulations determine sales prices; and (c) the currency that mainly influences labor, material and other costs of providing goods or services. Secondary factors include financing and operating cash flow retention."
  ),

  makeQ(1002, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Monetary vs Non-Monetary Items at Reporting Date",
    "On 31st March 2024, an Indian entity (functional currency INR) holds the following foreign currency items denominated in USD: (i) Trade Receivables of $100,000; (ii) Foreign equity investment at FVOCI of $50,000; (iii) Inventory acquired for $40,000 carried at cost; and (iv) Trade Payables of $80,000. Which of these are 'monetary items' to be translated at the closing spot exchange rate under Ind AS 21?",
    [
      "All four items.",
      "Trade Receivables ($100,000) and Trade Payables ($80,000) are monetary items translated at the closing rate with exchange differences to P&L; Inventory (cost) and Equity at FVOCI are non-monetary items.",
      "Only the equity investment.",
      "Only Trade Receivables."
    ],
    1,
    "Ind AS 21 - Paragraphs 16 & 23: Monetary vs Non-Monetary Items",
    "Ind AS 21 defines monetary items as units of currency held and assets and liabilities to be received or paid in a fixed or determinable number of units of currency (e.g. receivables, cash, payables). Non-monetary items have the absence of a right to receive or deliver a fixed number of units of currency (inventory, PPE, equity investments). Monetary items are translated at the closing rate with exchange differences recognized in profit or loss."
  ),

  makeQ(1003, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Non-Monetary Item Carried at Fair Value",
    "An entity holds an investment property in London denominated in British Pounds (GBP). It measures the property at Fair Value under Ind AS 40 / Ind AS 113. On 31st March 2024, the fair value is determined in GBP. At what exchange rate should the property be translated into INR, and where is the resulting foreign exchange difference recognized?",
    [
      "Historical exchange rate at the date of original acquisition; gain to P&L.",
      "Exchange rate at the date when the fair value was determined (closing rate); the exchange difference is recognized in the Statement of Profit and Loss (in the same manner as the fair value gain or loss under Ind AS 40).",
      "Average exchange rate for the year; difference to OCI.",
      "Historical cost rate without any translation."
    ],
    1,
    "Ind AS 21 - Paragraphs 23(c) & 30: Non-Monetary Items Measured at Fair Value",
    "Ind AS 21 Paragraph 23(c) states that non-monetary items that are measured at fair value in a foreign currency shall be translated using the exchange rates at the date when the fair value was measured. Under Paragraph 30, when a gain or loss on a non-monetary item is recognized in profit or loss, any exchange component of that gain or loss shall be recognized in profit or loss."
  ),

  makeQ(1004, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Translation of Foreign Operation to Presentation Currency",
    "Indian Parent Ltd. (INR presentation currency) consolidates its 100% US subsidiary (USD functional currency). In translating the US subsidiary's balance sheet and P&L into INR under Ind AS 21, what exchange rates must be applied?",
    [
      "All assets, liabilities, income, and expenses are translated at the closing exchange rate.",
      "Assets and liabilities (both monetary and non-monetary) are translated at the closing rate at the date of that balance sheet; income and expenses are translated at exchange rates at the dates of the transactions (or an appropriate average rate); all resulting exchange differences are recognized in Other Comprehensive Income (Foreign Currency Translation Reserve - FCTR).",
      "All items translated at historical rates.",
      "Assets at historical rate, liabilities at closing rate."
    ],
    1,
    "Ind AS 21 - Paragraphs 39-40: Translation to Presentation Currency",
    "Under Ind AS 21 Paragraph 39: (a) assets and liabilities for each balance sheet presented shall be translated at the closing rate at the date of that balance sheet; (b) income and expenses for each statement of profit and loss shall be translated at exchange rates at the dates of the transactions (average rate); and (c) all resulting exchange differences shall be recognized in Other Comprehensive Income (accumulated in FCTR)."
  ),

  makeQ(1005, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Recycling of Foreign Currency Translation Reserve (FCTR)",
    "Indian Parent Ltd. sells its entire 100% equity stake in its US subsidiary. Over the 5-year holding period, cumulative foreign currency translation gains of ₹50 Crores had been recognized in OCI and accumulated in FCTR. How is the accumulated FCTR treated upon full disposal of the foreign operation under Ind AS 21?",
    [
      "Retained permanently in equity without reclassification.",
      "Reclassified ('recycled') in full from Other Comprehensive Income (FCTR) to the Statement of Profit and Loss as a reclassification adjustment within the total gain or loss on disposal of the foreign operation.",
      "Transferred directly to Securities Premium.",
      "Written off against goodwill."
    ],
    1,
    "Ind AS 21 - Paragraph 48: Disposal of a Foreign Operation and Recycling of FCTR",
    "Ind AS 21 Paragraph 48 states: 'On the disposal of a foreign operation, the cumulative amount of the exchange differences relating to that foreign operation, recognized in other comprehensive income and accumulated in the separate component of equity, shall be reclassified from equity to profit or loss (as a reclassification adjustment) when the gain or loss on disposal is recognized.'"
  ),

  makeQ(1006, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Net Investment in a Foreign Operation",
    "Indian Parent Ltd. extends an interest-free loan of $10,000,000 to its wholly-owned UK subsidiary. The loan agreement specifies that repayment is neither planned nor likely to occur in the foreseeable future. In substance, the loan forms part of Parent Ltd.'s net investment in the UK subsidiary. In the consolidated financial statements of the group, where are the foreign exchange differences on this loan recognized under Ind AS 21?",
    [
      "Recognized in the Consolidated Statement of Profit and Loss.",
      "Recognized in Other Comprehensive Income (OCI) and accumulated in the Foreign Currency Translation Reserve (FCTR), to be reclassified to profit or loss on disposal of the net investment.",
      "Recognized as an addition to share capital.",
      "Eliminated against inter-company revenue."
    ],
    1,
    "Ind AS 21 - Paragraphs 15 & 32: Monetary Item Forming Part of Net Investment",
    "Ind AS 21 Paragraph 15 defines an item for which settlement is neither planned nor likely to occur in the foreseeable future as, in substance, part of the entity's net investment in that foreign operation. Under Paragraph 32, exchange differences arising on such monetary items in consolidated financial statements shall be recognized initially in Other Comprehensive Income and reclassified to profit or loss on disposal."
  ),

  makeQ(2901, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 29: Indicators of Hyperinflation",
    "Which of the following economic conditions is a key characteristic of a hyperinflationary economy under Ind AS 29?",
    [
      "Annual GDP growth exceeds 10%.",
      "The cumulative inflation rate over a three-year period is approaching, or exceeds, 100%, and the general population prefers to keep its wealth in non-monetary assets or in a relatively stable foreign currency.",
      "The central bank increases interest rates by 25 basis points.",
      "Stock market valuations decline for two consecutive quarters."
    ],
    1,
    "Ind AS 29 (Financial Reporting in Hyperinflationary Economies) - Paragraph 3: Indicators of Hyperinflation",
    "Ind AS 29 Paragraph 3 lists characteristics of hyperinflation: (a) general population prefers wealth in non-monetary assets or stable foreign currency; (b) prices quoted in foreign currency; (c) credit sales compensate for expected loss of purchasing power; (d) interest rates and wages linked to a price index; and (e) the cumulative inflation rate over three years is approaching, or exceeds, 100%."
  ),

  makeQ(2902, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 29: Restatement of Financial Statements",
    "Under Ind AS 29, when an entity's functional currency is the currency of a hyperinflationary economy, how are its financial statements stated?",
    [
      "Stated in terms of the measuring unit current at the end of the reporting period by applying a General Price Index to non-monetary items, with the gain or loss on the net monetary position recognized in Profit or Loss.",
      "Translated into USD at the historical exchange rate of 10 years ago.",
      "Prepared strictly on a cash basis.",
      "Non-monetary items are frozen at book value."
    ],
    0,
    "Ind AS 29 - Paragraphs 8-9: Restatement in Constant Currency",
    "Under Ind AS 29, the financial statements of an entity whose functional currency is hyperinflationary are stated in terms of the measuring unit current at the end of the reporting period. Balance sheet non-monetary items not already expressed in current measuring units are restated using a general price index. The gain or loss on the net monetary position is recognized in profit or loss."
  ),

  makeQ(1007, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Advance Payments for Non-Monetary Assets (Appendix B / IFRIC 22)",
    "On 1st February 2024, Indian Importer Ltd. pays a non-refundable advance of $100,000 (exchange rate $1 = ₹82) to a US machine vendor for customized equipment. On 31st March 2024, the exchange rate is $1 = ₹84. On 15th April 2024 (when $1 = ₹85), the machinery is delivered. Under Appendix B of Ind AS 21, what is the initial cost of the machinery capitalized on 15th April 2024?",
    [
      "₹85,00,000 ($100,000 × delivery spot rate ₹85).",
      "₹82,00,000 ($100,000 × advance payment transaction date rate ₹82), because the date of the transaction for the purpose of determining the exchange rate on initial recognition of the non-monetary asset is the date on which the entity initially recognized the non-monetary advance asset.",
      "₹84,00,000 ($100,000 × year-end rate ₹84).",
      "Average rate of ₹83.50."
    ],
    1,
    "Ind AS 21 - Appendix B (Foreign Currency Transactions and Advance Consideration)",
    "Appendix B Paragraph 8 states that the date of the transaction for the purpose of determining the exchange rate to use on initial recognition of the related asset, expense, or income is the date on which an entity initially recognizes the non-monetary asset or non-monetary liability arising from the payment or receipt of advance consideration. Because the advance was paid on 1st February at ₹82, that historical rate applies to the machinery."
  ),

  makeQ(1008, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Exchange Differences on Borrowing Costs",
    "An entity borrows USD 10,000,000 on 1st April 2023 at 5% interest per annum to construct a qualifying manufacturing plant. Local INR borrowings would have carried interest at 10% per annum. During the year, the exchange rate moved from $1 = ₹80 to $1 = ₹83 (exchange loss ₹3 Crores). How much of the ₹3 Crores exchange loss can be capitalized under Ind AS 23 and Ind AS 21 as an adjustment to borrowing costs?",
    [
      "The entire ₹3 Crores exchange loss is capitalized.",
      "The exchange difference is capitalized only to the extent that it represents an adjustment to interest costs (the difference between local borrowing costs of 10% on ₹80 Cr = ₹8 Cr, and foreign borrowing costs of 5% on ₹80 Cr = ₹4 Cr, meaning up to ₹4 Crores of exchange difference can be treated as borrowing cost); here, the full ₹3 Crores exchange loss is capitalized as borrowing cost.",
      "Zero; all exchange differences are expensed to P&L under Ind AS 21.",
      "Recognized in OCI."
    ],
    1,
    "Ind AS 23 - Paragraph 6(e) & Ind AS 21: Exchange Differences as Borrowing Costs",
    "Ind AS 23 Paragraph 6(e) states that borrowing costs include exchange differences arising from foreign currency borrowings to the extent that they are regarded as an adjustment to interest costs. The equivalent local borrowing cost is ₹80 Cr × 10% = ₹8 Cr. Foreign interest paid = $500,000 × ₹83 (approx ₹4.15 Cr). Since foreign interest + ₹3 Cr exchange loss = ₹7.15 Cr < ₹8 Cr, the entire ₹3 Cr exchange loss is treated as an adjustment to borrowing costs."
  ),

  makeQ(1009, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Change in Functional Currency",
    "Due to a fundamental shift in business model, Star India Ltd.'s functional currency changed from INR to USD on 1st October 2023. Under Ind AS 21, how is a change in functional currency accounted for?",
    [
      "Retrospectively, restating all prior years as if USD had always been the functional currency.",
      "Prospectively from the date of the change: the entity translates all items into the new functional currency using the exchange rate at the date of the change; the resulting translated amounts for non-monetary items are treated as their historical cost.",
      "The change is prohibited under Indian Company Law.",
      "Recognized directly in Retained Earnings."
    ],
    1,
    "Ind AS 21 - Paragraphs 35-37: Accounting for a Change in Functional Currency",
    "Ind AS 21 Paragraph 35 states that when there is a change in an entity's functional currency, the entity shall apply the translation procedures applicable to the new functional currency prospectively from the date of the change. All items are translated into the new functional currency at the spot rate on the date of change, and non-monetary items are treated as their new historical cost."
  ),

  makeQ(1010, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Foreign Currency Dividend Received from Subsidiary",
    "Indian Parent receives a cash dividend of USD 1,000,000 from its US subsidiary. At the date of dividend receipt, the exchange rate is $1 = ₹83. In Parent Ltd.'s standalone financial statements, at what amount is dividend income recognized?",
    [
      "₹8,30,00,000 (USD 1,000,000 translated at the spot exchange rate on the date of receipt/entitlement).",
      "Historical exchange rate at which the initial share capital was invested.",
      "Average exchange rate of the financial year.",
      "Zero, because intra-group dividends are eliminated in standalone accounts."
    ],
    0,
    "Ind AS 21 - Paragraph 21: Initial Recognition of Foreign Currency Transactions",
    "A foreign currency transaction shall be recorded, on initial recognition in the functional currency, by applying to the foreign currency amount the spot exchange rate between the functional currency and the foreign currency at the date of the transaction. The dividend is recognized at $1M × ₹83 = ₹8.3 Crores."
  ),

  makeQ(1011, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Goodwill of a Foreign Operation",
    "Indian Parent Ltd. acquired a French subsidiary whose functional currency is the Euro (EUR). In the purchase price allocation, goodwill of €10,000,000 arose on acquisition. Under Ind AS 21, how is this goodwill treated at each subsequent balance sheet date?",
    [
      "Treated as an asset of the Indian Parent and fixed permanently at the historical acquisition INR rate.",
      "Treated as an asset of the foreign operation (Euro-denominated asset); it is expressed in the functional currency of the foreign operation and translated at the closing exchange rate at each reporting date, with exchange differences recognized in OCI (FCTR).",
      "Amortized over 5 years.",
      "Expensed in full in P&L."
    ],
    1,
    "Ind AS 21 - Paragraph 47: Goodwill Arising on Acquisition of a Foreign Operation",
    "Ind AS 21 Paragraph 47 states explicitly: 'Any goodwill arising on the acquisition of a foreign operation and any fair value adjustments to the carrying amounts of assets and liabilities arising on the acquisition of that foreign operation shall be treated as assets and liabilities of the foreign operation. Thus, they shall be expressed in the functional currency of the foreign operation and shall be translated at the closing rate.'"
  ),

  makeQ(1012, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Long-Term Foreign Currency Monetary Item Exemption (FCMITDA)",
    "Under Companies (Ind AS) Rules, Paragraph 46A of Ind AS 21 provides a transitional relief for long-term foreign currency monetary items recognized before 1st April 2016. Which option did it grant?",
    [
      "Mandatory hedging of all foreign debt.",
      "The option to accumulate exchange differences relating to long-term foreign currency monetary items in a 'Foreign Currency Monetary Item Translation Difference Account' (FCMITDA) and amortize it over the life of the monetary item, or add/deduct it from the cost of depreciable capital assets.",
      "Complete exemption from financial reporting.",
      "Option to revalue monetary assets."
    ],
    1,
    "Ind AS 21 - Paragraph 46A: Transitional Relief on Long-Term Foreign Currency Monetary Items",
    "Paragraph 46A was inserted into Ind AS 21 in India to provide continuity for companies that had elected the option under AS 11 (Paragraph 46/46A). It permitted capitalizing foreign exchange differences on long-term foreign currency borrowings into the cost of depreciable assets or accumulating them in FCMITDA."
  ),

  makeQ(1013, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 29: Monetary Loss Calculation",
    "At the start of the year, an enterprise in a hyperinflationary economy holds cash and trade receivables of 1,00,000 local currency units (LCU) and bank debt of 40,000 LCU (net monetary asset = 60,000 LCU). The general price index doubles (100% inflation) during the year. What is the impact on the net monetary position?",
    [
      "A purchasing power gain of 60,000 LCU.",
      "A net purchasing power loss on monetary assets of 60,000 LCU recognized in the Statement of Profit and Loss, because holding monetary assets during inflation results in a loss of purchasing power.",
      "No gain or loss arises on monetary items.",
      "Recognized in OCI."
    ],
    1,
    "Ind AS 29 - Paragraph 9 & Paragraph 28: Gain or Loss on Net Monetary Position",
    "In a period of inflation, an entity holding an excess of monetary assets over monetary liabilities loses purchasing power, and an entity with an excess of monetary liabilities over monetary assets gains purchasing power to the extent the obligations are not linked to a price level. The resulting gain or loss on the net monetary position is recognized in profit or loss."
  ),

  makeQ(1014, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Foreign Currency Borrowings Fair Value Adjustment",
    "An entity issues bonds denominated in Euro. The bond carries a fixed interest rate. When translating the foreign currency bond at the balance sheet date under Ind AS 21 (carried at amortized cost), how are the changes in exchange rate recognized?",
    [
      "In Other Comprehensive Income.",
      "In the Statement of Profit and Loss as foreign exchange fluctuation gain or loss.",
      "Deferred as a discount on bonds.",
      "Adjusted against equity share capital."
    ],
    1,
    "Ind AS 21 - Paragraph 28: Recognition of Exchange Differences on Monetary Items",
    "Ind AS 21 Paragraph 28 specifies that exchange differences arising on the settlement of monetary items or on translating monetary items at rates different from those at which they were translated on initial recognition or in previous financial statements shall be recognized in profit or loss in the period in which they arise."
  ),

  makeQ(1015, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Presentation Currency Choice",
    "An Indian corporate entity has INR as its functional currency. The Board of Directors wishes to present its consolidated financial statements in US Dollars (USD) to attract international institutional investors. Is this permissible under Ind AS 21?",
    [
      "No, Indian entities must always present their financial statements in Indian Rupees by law.",
      "Yes, Ind AS 21 Paragraph 38 states that an entity may present its financial statements in any currency (or currencies); if the presentation currency differs from the functional currency, the entity translates its results and financial position into the presentation currency using standard translation procedures.",
      "Permissible only if approved by the Reserve Bank of India.",
      "Permissible only if turnover exceeds ₹10,000 Crores."
    ],
    1,
    "Ind AS 21 - Paragraph 38: Choice of Presentation Currency",
    "Ind AS 21 Paragraph 38 explicitly states: 'An entity may present its financial statements in any currency (or currencies).' If the presentation currency differs from the entity's functional currency, its results and financial position are translated into the presentation currency in accordance with paragraphs 39-43."
  ),

  makeQ(1016, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Partial Disposal of Subsidiary with FCTR Allocation",
    "Parent Ltd. sells a 20% stake in its wholly-owned foreign subsidiary for ₹30 Crores, reducing its ownership from 100% to 80% without losing control. Cumulative FCTR relating to the subsidiary is ₹10 Crores. How is FCTR treated on this partial disposal?",
    [
      "₹2 Crores (20% of FCTR) is recycled to Profit or Loss.",
      "No FCTR is reclassified to Profit or Loss; instead, the proportionate share of cumulative exchange differences (20% of ₹10 Cr = ₹2 Crores) is reattributed to the Non-Controlling Interest (NCI) within equity.",
      "The entire ₹10 Crores FCTR is recycled to P&L.",
      "FCTR is transferred to Capital Reserve."
    ],
    1,
    "Ind AS 21 - Paragraph 48A: Partial Disposal of a Subsidiary Without Loss of Control",
    "Ind AS 21 Paragraph 48A specifies: 'On the partial disposal of a subsidiary that includes a foreign operation, the entity shall re-attribute the proportionate share of the cumulative amount of the exchange differences recognized in other comprehensive income to the non-controlling interests in that foreign operation.' It is an equity transaction; no recycling to P&L occurs."
  ),

  makeQ(1017, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Cumulative Translation Differences in Inter-Company Eliminations",
    "Parent Ltd. sells goods to foreign subsidiary Sub Ltd. Sub Ltd. owes Parent Ltd. $5,000,000. In Parent's books (INR functional), an exchange gain of ₹2 Crores arises on this monetary balance. When preparing consolidated financial statements, how is this exchange gain treated?",
    [
      "The exchange gain is eliminated in full against consolidated profit.",
      "Because the monetary item represents a commitment to convert one currency into another, it exposes the group to a currency fluctuation risk; therefore, in consolidated financial statements, the exchange difference is NOT eliminated, but continues to be recognized in consolidated Profit or Loss (unless it forms part of a net investment under Paragraph 15).",
      "Recognized in OCI.",
      "Transferred to NCI."
    ],
    1,
    "Ind AS 21 - Paragraph 45: Intra-Group Foreign Exchange Differences in Consolidation",
    "Ind AS 21 Paragraph 45 explains that an intra-group monetary asset or liability cannot be eliminated without showing the results of currency fluctuations in the consolidated financial statements. This is because the monetary item represents a commitment to convert one currency into another and exposes the group to a currency risk. Accordingly, such an exchange difference continues to be recognized in profit or loss."
  ),

  makeQ(1018, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 29: Economy Ceasing to be Hyperinflationary",
    "When an economy ceases to be hyperinflationary and an entity discontinues the preparation of financial statements in accordance with Ind AS 29, what is the accounting treatment for carrying amounts?",
    [
      "All assets must be restated back to original historical costs before hyperinflation.",
      "The entity shall treat the amounts expressed in the measuring unit current at the end of the previous reporting period as the basis for the carrying amounts in its subsequent financial statements.",
      "All reserves must be capitalized into equity shares.",
      "The entity must liquidate its operating divisions."
    ],
    1,
    "Ind AS 29 - Paragraph 38: Cessation of Hyperinflation",
    "Ind AS 29 Paragraph 38 states: 'When an economy ceases to be hyperinflationary and an entity discontinues the preparation and presentation of financial statements in accordance with this Standard, it shall treat the amounts expressed in the measuring unit current at the end of the previous reporting period as the basis for the carrying amounts in its subsequent financial statements.'"
  ),

  makeQ(1019, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Foreign Currency Forward Contract Designated as Net Investment Hedge",
    "An Indian parent hedges its net investment in a US subsidiary using a USD forward contract. The hedge is 100% effective. Under Ind AS 109 and Ind AS 21, how is the foreign exchange gain on the forward contract accounted for in the consolidated accounts?",
    [
      "Recognized in Profit or Loss.",
      "Recognized in Other Comprehensive Income (OCI) to the extent of hedge effectiveness, offsetting the foreign currency translation gains/losses arising on the translation of the subsidiary's net assets.",
      "Recognized as a liability in the balance sheet.",
      "Deducted from the subsidiary's share capital."
    ],
    1,
    "Ind AS 109 - Paragraph 6.5.13: Hedges of a Net Investment in a Foreign Operation",
    "Under Ind AS 109 Paragraph 6.5.13, hedges of a net investment in a foreign operation are accounted for similarly to cash flow hedges: (a) the portion of the gain or loss on the hedging instrument that is determined to be an effective hedge is recognized in Other Comprehensive Income; and (b) the ineffective portion is recognized in profit or loss."
  ),

  makeQ(1020, 10, "Foreign Currency Transactions and Hyperinflation", "Ind AS 21: Functional Currency of a Foreign Operation Closely Linked to Parent",
    "Global Trade Ltd. (India) sets up a sales branch in Dubai solely to collect orders from Middle East clients and remit 100% of the proceeds to India weekly. The Dubai branch has no autonomy, its activities are a direct extension of the Indian parent, and it relies entirely on the Indian parent for funding. What is the functional currency of the Dubai branch under Ind AS 21?",
    [
      "UAE Dirham (AED), because it is physically located in Dubai.",
      "Indian Rupee (INR), because its activities are carried out as an extension of the reporting entity rather than being carried out with a significant degree of autonomy.",
      "US Dollar (USD).",
      "Euro (EUR)."
    ],
    1,
    "Ind AS 21 - Paragraph 11(a): Functional Currency of a Foreign Operation",
    "Ind AS 21 Paragraph 11 states that an additional factor in determining whether the functional currency of a foreign operation is the same as that of the reporting entity is whether the activities of the foreign operation are carried out as an extension of the reporting entity, rather than being carried out with a significant degree of autonomy. Because the branch is a direct extension with zero autonomy, its functional currency is INR."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_10_forex_hyperinflation.json'), JSON.stringify(t10Qs, null, 2), 'utf8');
console.log('Saved Topic 10: 20 Questions');

// =========================================================================
// TOPIC 11: Accounting for Government Grants and Borrowing Costs (Ind AS 20, 23) (20 Questions)
// =========================================================================
const t11Qs = [
  makeQ(1101, 11, "Government Grants and Borrowing Costs", "Ind AS 20: Capital Grant Presentation Options",
    "GreenEnergy Ltd. receives a Government Grant of ₹20 Crores towards the purchase of a pollution control plant costing ₹100 Crores (useful life 10 years, residual value nil). Under Ind AS 20, what are the two permissible methods of presenting this grant on the balance sheet?",
    [
      "Option 1: Credit directly to Equity Share Capital; Option 2: Recognize as immediate revenue in P&L.",
      "Option 1: Present the grant as Deferred Income (which is recognized in profit or loss on a systematic basis over the 10-year useful life of the plant); Option 2: Deduct the grant in arriving at the carrying amount of the asset (reducing initial plant cost to ₹80 Crores, depreciated at ₹8 Crores/year).",
      "Option 1: Credit to Revaluation Reserve; Option 2: Treat as an off-balance sheet item.",
      "Government grants for capital assets cannot be recognized under Ind AS."
    ],
    1,
    "Ind AS 20 (Accounting for Government Grants and Disclosure of Government Assistance) - Paragraph 24: Grants Related to Assets",
    "Ind AS 20 Paragraph 24 provides two methods of presenting grants related to assets in the balance sheet: (a) setting up the grant as deferred income, which is recognized in profit or loss on a systematic basis over the useful life of the asset; or (b) deducting the grant in calculating the carrying amount of the asset (depreciation is charged on the reduced carrying amount)."
  ),

  makeQ(1102, 11, "Government Grants and Borrowing Costs", "Ind AS 20: Below-Market Interest Rate Government Loans",
    "On 1st April 2023, BioPharma Ltd. receives an interest-free loan of ₹10 Crores from the Department of Biotechnology repayable in full after 5 years. The market borrowing rate for an equivalent commercial loan is 10% per annum (PV factor for 5 years at 10% = 0.6209). How should this loan and government assistance be recorded on 1st April 2023 under Ind AS 109 and Ind AS 20?",
    [
      "Record loan liability at full ₹10 Crores with zero government grant recognition.",
      "Measure the financial liability at fair value of ₹6.209 Crores under Ind AS 109; the difference of ₹3.791 Crores between initial cash proceeds and fair value is recognized as a Government Grant (Deferred Income) under Ind AS 20 to be recognized in profit or loss over the period of the loan.",
      "Recognize ₹3.791 Crores immediately as an exceptional gain in P&L.",
      "Record the loan in Other Comprehensive Income."
    ],
    1,
    "Ind AS 20 - Paragraph 10A & Ind AS 109: Below-Market Government Loans",
    "Ind AS 20 Paragraph 10A states: 'The benefit of a government loan at a below-market rate of interest is treated as a government grant. The loan shall be recognized and measured in accordance with Ind AS 109. The benefit of the below-market rate of interest shall be measured as the difference between the initial carrying value of the loan determined in accordance with Ind AS 109 and the proceeds received.' The ₹3.791 Cr benefit is accounted for under Ind AS 20."
  ),

  makeQ(1103, 11, "Government Grants and Borrowing Costs", "Ind AS 20: Repayment of Government Grants",
    "Four years ago, Apex Textiles received a government grant of ₹5 Crores towards a factory facility, which was accounted for by deducting the grant from the asset carrying amount. In FY 2023-24, due to a breach of employment covenants, the Government demanded full repayment of the ₹5 Crores grant. How should this repayment be accounted for under Ind AS 20?",
    [
      "Recognize full ₹5 Crores as an extraordinary prior period error.",
      "Repayment of a grant related to an asset shall be recognized by increasing the carrying amount of the asset; the cumulative additional depreciation that would have been recognized in profit or loss to date in the absence of the grant shall be recognized immediately in profit or loss.",
      "Deducted directly from retained earnings.",
      "Treated as an expense in OCI."
    ],
    1,
    "Ind AS 20 - Paragraph 32: Repayment of Grants Related to an Asset",
    "Ind AS 20 Paragraph 32 states: 'Repayment of a grant related to an asset shall be recognized by increasing the carrying amount of the asset or reducing the deferred income balance by the amount repayable. The cumulative additional depreciation that would have been recognized in profit or loss to date in the absence of the grant shall be recognized immediately in profit or loss.'"
  ),

  makeQ(1104, 11, "Government Grants and Borrowing Costs", "Ind AS 20: Grant Given as Immediate Financial Support for Past Losses",
    "During an economic crisis, the State Government issues an unconditional cash grant of ₹10 Crores to AgroMills Ltd. to provide immediate financial relief for severe drought losses incurred in the preceding agricultural season. Under Ind AS 20, how should this grant be recognized?",
    [
      "Deferred and recognized over the next 5 years.",
      "Recognized in the Statement of Profit and Loss of the period in which it becomes receivable as an item of income, because it was given as immediate financial support with no future related costs.",
      "Credited directly to Capital Reserve in Equity.",
      "Recognized in OCI."
    ],
    1,
    "Ind AS 20 - Paragraph 20: Grant as Immediate Financial Relief",
    "Ind AS 20 Paragraph 20 states: 'A government grant that becomes receivable as compensation for expenses or losses already incurred or for the purpose of giving immediate financial support to the entity with no future related costs shall be recognized in profit or loss of the period in which it becomes receivable.'"
  ),

  makeQ(1105, 11, "Government Grants and Borrowing Costs", "Ind AS 23: Definition of a Qualifying Asset",
    "Which of the following assets qualifies as a 'Qualifying Asset' eligible for capitalization of borrowing costs under Ind AS 23?",
    [
      "Inventories that are routinely manufactured or produced in large quantities on a repetitive basis over a few hours.",
      "An asset that necessarily takes a substantial period of time to get ready for its intended use or sale (such as a toll bridge taking 3 years to construct or aging single-malt whiskey requiring 12 years of maturation).",
      "Financial assets measured at fair value under Ind AS 109.",
      "Assets that are ready for their intended use or sale when acquired."
    ],
    1,
    "Ind AS 23 (Borrowing Costs) - Paragraph 5: Definition of Qualifying Asset",
    "Ind AS 23 Paragraph 5 defines a qualifying asset as 'an asset that necessarily takes a substantial period of time to get ready for its intended use or sale.' Examples include manufacturing plants, power generation facilities, intangible assets under development, and investment properties under construction. Financial assets and inventories produced over a short period are explicitly excluded."
  ),

  makeQ(1106, 11, "Government Grants and Borrowing Costs", "Ind AS 23: Commencement of Capitalisation Criteria",
    "Which three criteria must ALL be satisfied simultaneously for an entity to commence capitalising borrowing costs as part of the cost of a qualifying asset under Ind AS 23?",
    [
      "Loan agreement signed, bank disburses funds, and interest is paid.",
      "(a) It incurs expenditures for the asset; (b) it incurs borrowing costs; and (c) it undertakes activities that are necessary to prepare the asset for its intended use or sale.",
      "Board passes a resolution, architectural drawings are finalized, and building permits are applied for.",
      "Statutory auditor inspects the construction site."
    ],
    1,
    "Ind AS 23 - Paragraph 17: Commencement of Capitalisation",
    "Ind AS 23 Paragraph 17 specifies: 'An entity shall begin capitalising borrowing costs as part of the cost of a qualifying asset on the commencement date. The commencement date for capitalisation is the date when the entity first meets all of the following conditions: (a) it incurs expenditures for the asset; (b) it incurs borrowing costs; and (c) it undertakes activities that are necessary to prepare the asset for its intended use or sale.'"
  ),

  makeQ(1107, 11, "Government Grants and Borrowing Costs", "Ind AS 23: Temporary Investment Income on Specific Borrowings",
    "InfraCorp Ltd. borrows ₹50 Crores specifically to construct a marine drydock on 1st April 2023 at 10% interest. Construction begins immediately. During the first 6 months, ₹20 Crores of surplus borrowed funds not yet needed for site payments were temporarily invested in money market mutual funds, earning interest income of ₹80 Lakhs. What is the net borrowing cost capitalized for the year ended 31st March 2024?",
    [
      "₹5.0 Crores (gross interest of 10% on ₹50 Crores), with ₹80 Lakhs recognized as finance income in P&L.",
      "₹4.2 Crores (Gross borrowing costs incurred of ₹5.0 Crores minus temporary investment income earned of ₹80 Lakhs on specific borrowings).",
      "Zero, because borrowing costs on specific borrowings cannot be capitalized.",
      "₹5.8 Crores."
    ],
    1,
    "Ind AS 23 - Paragraph 12: Specific Borrowings & Temporary Investment Income",
    "Ind AS 23 Paragraph 12 states: 'To the extent that an entity borrows funds specifically for the purpose of obtaining a qualifying asset, the entity shall determine the amount of borrowing costs eligible for capitalisation as the actual borrowing costs incurred on that borrowing during the period less any investment income on the temporary investment of those borrowings.' Eligible = ₹5.0 Cr - ₹0.8 Cr = ₹4.2 Crores."
  ),

  makeQ(1108, 11, "Government Grants and Borrowing Costs", "Ind AS 23: Capitalisation Rate for General Borrowings",
    "Titan Ltd. incurs capital expenditure of ₹40 Crores on a qualifying asset during the year, financed through general corporate borrowings. Its general borrowing pool consists of: (i) ₹60 Crores bank loan at 8% p.a. (interest ₹4.8 Cr); and (ii) ₹40 Crores debentures at 10% p.a. (interest ₹4.0 Cr). What is the weighted average capitalization rate and borrowing cost capitalized for the year under Ind AS 23?",
    [
      "Rate = 9.0%; Borrowing cost capitalized = ₹3.6 Crores.",
      "Rate = 8.8% (Total interest ₹8.8 Crores / Total general borrowings ₹100 Crores); Borrowing cost capitalized = 8.8% × ₹40 Crores = ₹3.52 Crores.",
      "Rate = 10%; Borrowing cost capitalized = ₹4.0 Crores.",
      "Rate = 8%; Borrowing cost capitalized = ₹3.2 Crores."
    ],
    1,
    "Ind AS 23 - Paragraph 14: Capitalisation Rate on General Borrowings",
    "Under Ind AS 23 Paragraph 14, the capitalization rate shall be the weighted average of the borrowing costs applicable to all borrowings of the entity that are outstanding during the period, other than borrowings made specifically for the purpose of obtaining a qualifying asset. Capitalization rate = ₹8.8 Cr / ₹100 Cr = 8.8%. Capitalized borrowing cost = ₹40 Cr × 8.8% = ₹3.52 Crores."
  ),

  makeQ(1109, 11, "Government Grants and Borrowing Costs", "Ind AS 23: Suspension of Capitalisation During Extended Interruption",
    "Construction of a hydroelectric dam is halted for 6 months due to a violent local labor strike and environmental litigation (abnormal stoppage not necessary for the engineering process). How should the borrowing costs incurred during this 6-month idle period be treated under Ind AS 23?",
    [
      "Continue capitalising borrowing costs without interruption.",
      "An entity shall suspend capitalisation of borrowing costs during extended periods in which it suspends active development of a qualifying asset; borrowing costs incurred during the 6 months are expensed in Profit or Loss.",
      "Capitalize 50% and expense 50%.",
      "Recognize in OCI."
    ],
    1,
    "Ind AS 23 - Paragraphs 20-21: Suspension of Capitalisation",
    "Ind AS 23 Paragraph 20 states: 'An entity shall suspend capitalisation of borrowing costs during extended periods in which it suspends active development of a qualifying asset.' Paragraph 21 clarifies that capitalisation is not suspended when a temporary delay is a necessary part of the process of getting an asset ready (e.g. high water levels during rainy season in bridge building), but strikes and disputes require suspension."
  ),

  makeQ(1110, 11, "Government Grants and Borrowing Costs", "Ind AS 23: Cessation of Capitalisation for Parts Completed in Stages",
    "A commercial real estate park consists of 5 standalone office towers. Tower 1 is structurally finished, air-conditioned, licensed, and ready for commercial leasing on 31st December 2023, while Towers 2 to 5 are still under construction. Can borrowing costs continue to be capitalized on Tower 1 after 31st December 2023?",
    [
      "Yes, capitalization continues until all 5 towers of the entire business park are completed.",
      "No, when an entity completes the construction of a qualifying asset in parts and each part is capable of being used while construction continues on other parts, the entity shall cease capitalising borrowing costs when it completes substantially all the activities necessary to prepare that part for its intended use or sale.",
      "Capitalization ceases only when tenants sign lease deeds.",
      "Borrowing costs on Tower 1 must be reversed retrospectively."
    ],
    1,
    "Ind AS 23 - Paragraph 24: Cessation of Capitalisation for Assets Completed in Parts",
    "Ind AS 23 Paragraph 24 specifies: 'When an entity completes the construction of a qualifying asset in parts and each part is capable of being used while construction continues on other parts, the entity shall cease capitalising borrowing costs when it completes substantially all the activities necessary to prepare that part for its intended use or sale.' Capitalization on Tower 1 ceases on 31st December."
  ),

  makeQ(1111, 11, "Government Grants and Borrowing Costs", "Ind AS 20: Non-Monetary Government Grants",
    "The State Government allocates 50 acres of prime industrial land to GreenTech Ltd. free of cost to establish a semiconductor wafer fabrication plant. The nominal stamp registration fee paid was ₹10,000. The fair value of the land is appraised at ₹25 Crores by government approved valuers. Under Ind AS 20, how may GreenTech Ltd. account for this non-monetary government grant?",
    [
      "Only at the nominal value of ₹10,000.",
      "Under Ind AS 20 Paragraph 23, the entity may account for both the asset and the grant either at the fair value of the non-monetary asset (₹25 Crores land with a corresponding ₹25 Crores deferred government grant) or at a nominal amount (₹10,000).",
      "At ₹25 Crores with a credit to Share Capital.",
      "Non-monetary grants cannot be recognized on the balance sheet."
    ],
    1,
    "Ind AS 20 - Paragraph 23: Non-Monetary Government Grants",
    "Ind AS 20 Paragraph 23 states: 'A government grant may take the form of a transfer of a non-monetary asset, such as land or other resources, for the use of the entity. In these circumstances it is usual to assess the fair value of the non-monetary asset and to account for both grant and asset at that fair value. An alternative course that is sometimes followed is to record both asset and grant at a nominal amount.'"
  ),

  makeQ(1112, 11, "Government Grants and Borrowing Costs", "Ind AS 20: Matching Principle for Grants Related to Income",
    "SkillIndia Ltd. receives a Government Grant of ₹30 Lakhs in March 2024 to reimburse training costs for underprivileged apprentices. The training program will run across FY 2024-25 and FY 2025-26 (training costs projected at ₹20 Lakhs in Year 1 and ₹40 Lakhs in Year 2). How should the grant be recognized in profit or loss under Ind AS 20?",
    [
      "Recognize entire ₹30 Lakhs as income in March 2024 when cash is received.",
      "Recognized in profit or loss on a systematic basis over the periods in which the entity recognizes as expenses the related costs for which the grant is intended to compensate: ₹10 Lakhs in Year 1 (₹20L/₹60L × ₹30L) and ₹20 Lakhs in Year 2 (₹40L/₹60L × ₹30L).",
      "Split equally at ₹15 Lakhs per year.",
      "Credited directly to general reserve."
    ],
    1,
    "Ind AS 20 - Paragraph 12: Recognition of Grants Related to Income",
    "Ind AS 20 Paragraph 12 states: 'Government grants shall be recognized in profit or loss on a systematic basis over the periods in which the entity recognizes as expenses the related costs for which the grants are intended to compensate.' The grant is recognized pro-rata to the incurred training costs."
  ),

  makeQ(1113, 11, "Government Grants and Borrowing Costs", "Ind AS 23: Land Acquisition as Qualifying Asset",
    "Urban Developers Ltd. purchases vacant freehold land for ₹100 Crores using bank borrowings. The land is intended to be held for long-term capital appreciation, with no active site development or construction planned in the foreseeable future. Are the borrowing costs on this land loan eligible for capitalization under Ind AS 23?",
    [
      "Yes, land is always a qualifying asset under Ind AS 23.",
      "No, borrowing costs incurred on land acquired without any associated development activities are NOT eligible for capitalisation, because the land was ready for its intended use (holding for capital appreciation) when acquired and does not undergo activities necessary to prepare it for intended use.",
      "Yes, up to 10% of land value.",
      "Capitalized only if land is revalued."
    ],
    1,
    "Ind AS 23 - Paragraphs 5 & 19: Land without Development is Not a Qualifying Asset",
    "Ind AS 23 states that an asset is a qualifying asset only if it takes a substantial period of time to get ready for its intended use. Land acquired without development is ready for its intended use when acquired. However, land that is acquired for development (e.g. where substantial earthworks, roads, and utilities are being developed) qualifies while the development activities are ongoing."
  ),

  makeQ(1114, 11, "Government Grants and Borrowing Costs", "Ind AS 20: Forgivable Loans",
    "Under a rural industrialization scheme, the Government grants a loan of ₹2 Crores to SmallCrafts Ltd. The terms state that the loan will be forgiven in full if the company maintains continuous operations and employs at least 50 rural artisans for 3 consecutive years. Under Ind AS 20, how is a forgivable loan treated?",
    [
      "Treated as permanent equity from day 1.",
      "A forgivable loan from government is treated as a government grant when there is reasonable assurance that the entity will meet the terms for forgiveness of the loan.",
      "Accounted for as a contingent liability.",
      "Ignored until the 3 years elapse."
    ],
    1,
    "Ind AS 20 - Paragraph 10: Forgivable Loans as Government Grants",
    "Ind AS 20 Paragraph 10 states: 'A forgivable loan from government is treated as a government grant when there is reasonable assurance that the entity will meet the terms for forgiveness of the loan.' When reasonable assurance exists, it is accounted for as a grant."
  ),

  makeQ(1115, 11, "Government Grants and Borrowing Costs", "Ind AS 23: Excess Carrying Amount of Qualifying Asset Over Recoverable Amount",
    "When the carrying amount or the expected ultimate cost of a qualifying asset (including capitalized borrowing costs) exceeds its recoverable amount or net realizable value, what is the mandatory requirement under Ind AS 23?",
    [
      "Capitalization of borrowing costs must be increased to match fair value.",
      "The carrying amount is written down or written off in accordance with the requirements of other Standards (such as Ind AS 36 Impairment of Assets or Ind AS 2 Inventories).",
      "Borrowing costs are moved to Other Comprehensive Income.",
      "Capitalization continues unaffected."
    ],
    1,
    "Ind AS 23 - Paragraph 16: Impairment of Qualifying Assets",
    "Ind AS 23 Paragraph 16 states: 'When the carrying amount or the expected ultimate cost of the qualifying asset exceeds its recoverable amount or net realizable value, the carrying amount is written down or written off in accordance with the requirements of other Standards. In certain circumstances, the amount of the write-down or write-off is written back in accordance with those other Standards.'"
  ),

  makeQ(1116, 11, "Government Grants and Borrowing Costs", "Ind AS 20: Government Assistance without Quantifiable Value",
    "The Ministry of Heavy Industries provides free technical advisory assistance and sanitary quarantine consultation to automotive exporters, but the service cannot reasonably have a value placed upon it. Under Ind AS 20, how should this government assistance be treated?",
    [
      "Valued at management's best estimate and recorded as revenue.",
      "Excluded from financial values on the balance sheet and P&L, but disclosed in the notes to financial statements, specifying the nature, extent, and duration of the government assistance.",
      "Omitted completely with zero disclosure.",
      "Recorded in equity."
    ],
    1,
    "Ind AS 20 - Paragraphs 34-36: Government Assistance Disclosures",
    "Ind AS 20 Paragraph 34 notes that government assistance may take forms which cannot reasonably have a value placed upon them (e.g. free technical or marketing advice). Such assistance is disclosed in the notes so that the financial statements are not misleading."
  ),

  makeQ(1117, 11, "Government Grants and Borrowing Costs", "Ind AS 23: Group Borrowings and Subsidiary Capitalisation Rate",
    "Parent Ltd. raises general borrowings at 8% and passes the funds to its subsidiary Sub Ltd. at 10% to construct a qualifying asset. In Sub Ltd.'s separate financial statements and in the group's consolidated financial statements, what interest rate is used to capitalize borrowing costs?",
    [
      "10% in both separate and consolidated financial statements.",
      "In Sub Ltd.'s separate financial statements, 10% (the actual borrowing cost incurred by the subsidiary); in the group's consolidated financial statements, 8% (the actual external borrowing cost incurred by the economic entity).",
      "8% in both separate and consolidated statements.",
      "Borrowing costs between group entities cannot be capitalized."
    ],
    1,
    "Ind AS 23 - Group Financial Statements & Borrowing Costs",
    "In separate financial statements, the borrowing cost to the subsidiary is its contractual cost (10%). In consolidated financial statements, intercompany interest is eliminated, and the borrowing cost capitalized cannot exceed the actual borrowing cost incurred by the group from external lenders (8%)."
  ),

  makeQ(1118, 11, "Government Grants and Borrowing Costs", "Ind AS 20: Export Incentive Scrips (RoDTEP / MEIS)",
    "An exporter earns Remission of Duties and Taxes on Exported Products (RoDTEP) scrips from the Directorate General of Foreign Trade (DGFT) upon exporting goods. When should the government grant scrips be recognized under Ind AS 20?",
    [
      "Only when the scrips are physically utilized to clear import customs duty.",
      "When there is reasonable assurance that the entity will comply with the conditions attached to them (export of eligible goods) and the grants will be received (assessed at the date of export).",
      "When the scrips are sold to a third party for cash.",
      "At the end of the financial year."
    ],
    1,
    "Ind AS 20 - Paragraph 7: Recognition on Reasonable Assurance",
    "Under Ind AS 20 Paragraph 7, government grants, including non-monetary grants, shall not be recognized until there is reasonable assurance that: (a) the entity will comply with the conditions attaching to them; and (b) the grants will be received. For export incentives, recognition occurs upon completion of export performance."
  ),

  makeQ(1119, 11, "Government Grants and Borrowing Costs", "Ind AS 23: Exchange Rate Gains Exceeding Actual Borrowing Costs",
    "An entity borrows USD at 4% interest to construct a plant. During the year, INR appreciates sharply against USD, resulting in a foreign exchange gain of ₹2 Crores. Total interest paid was ₹1.5 Crores. Can the net negative borrowing cost of ₹0.5 Crores be credited to the cost of the asset under Ind AS 23?",
    [
      "Yes, reducing asset cost below actual construction expenditures.",
      "No, borrowing costs eligible for capitalisation cannot be negative; exchange gains can offset foreign currency interest expense up to the amount of interest incurred, and any excess exchange gain is recognized in profit or loss under Ind AS 21.",
      "Yes, credited to revaluation reserve.",
      "Deferred to the next financial year."
    ],
    1,
    "Ind AS 23 & Ind AS 21: Exchange Differences as Borrowing Costs Limitation",
    "Exchange differences are treated as borrowing costs only to the extent they are an adjustment to interest costs. An exchange gain can reduce the foreign currency borrowing cost to zero, but cannot turn the borrowing cost negative to reduce the physical cost of the asset below zero interest."
  ),

  makeQ(1120, 11, "Government Grants and Borrowing Costs", "Ind AS 20: Presentation of Revenue Grants",
    "Sun Pharma receives a ₹5 Crores government grant as an operational wage subsidy for hiring local apprentices. Under Ind AS 20, how can this grant related to income be presented in the Statement of Profit and Loss?",
    [
      "Only as a credit to Retained Earnings.",
      "Either presented separately under 'Other Operating Income' (or 'Other Income'), or deducted in reporting the related employee benefit expense.",
      "Must be deducted from sales turnover.",
      "Presented in Other Comprehensive Income."
    ],
    1,
    "Ind AS 20 - Paragraphs 29-31: Presentation of Grants Related to Income",
    "Ind AS 20 Paragraph 29 states that grants related to income are presented as part of profit or loss, either separately or under a general heading such as 'Other Income'; alternatively, they are deducted in reporting the related expense. Both methods are regarded as acceptable."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_11_grants_borrowing_costs.json'), JSON.stringify(t11Qs, null, 2), 'utf8');
console.log('Saved Topic 11: 20 Questions');

// =========================================================================
// TOPIC 12: Interim and Segment Reporting (Ind AS 34, 108) (20 Questions)
// =========================================================================
const t12Qs = [
  makeQ(1201, 12, "Interim and Segment Reporting", "Ind AS 108: Management Approach & Chief Operating Decision Maker (CODM)",
    "Under Ind AS 108, how is an 'Operating Segment' identified, and who constitutes the Chief Operating Decision Maker (CODM)?",
    [
      "Identified based on statutory tax reporting circles; CODM is always the statutory auditor.",
      "Identified using the 'Management Approach' based on internal organizational units whose operating results are regularly reviewed by the CODM (a function, not necessarily a title, which allocates resources and assesses performance of segments).",
      "Identified strictly by physical geographic pin codes.",
      "Identified based on products with identical gross profit margins."
    ],
    1,
    "Ind AS 108 (Operating Segments) - Paragraphs 5-7: Definition of Operating Segment & CODM",
    "Ind AS 108 Paragraph 5 defines an operating segment as a component of an entity: (a) that engages in business activities from which it may earn revenues and incur expenses; (b) whose operating results are regularly reviewed by the entity's Chief Operating Decision Maker (CODM) to make decisions about resources and assess performance; and (c) for which discrete financial information is available. The CODM is a function that allocates resources."
  ),

  makeQ(1202, 12, "Interim and Segment Reporting", "Ind AS 108: Quantitative Thresholds (10% Tests)",
    "A conglomerate has 6 internal operating divisions. Under Ind AS 108 Paragraph 13, which of the following quantitative thresholds mandates that an operating segment must be reported separately?",
    [
      "Its reported revenue (including both internal and external sales) is 10% or more of the combined revenue of all operating segments.",
      "The absolute amount of its reported profit or loss is 10% or more of the greater, in absolute amount, of: (i) the combined reported profit of all operating segments that did not report a loss; and (ii) the combined reported loss of all operating segments that reported a loss.",
      "Its assets are 10% or more of the combined assets of all operating segments.",
      "Meeting ANY ONE of the three 10% criteria (Revenue, Profit/Loss, or Assets) makes the segment reportable."
    ],
    3,
    "Ind AS 108 - Paragraph 13: The 10% Quantitative Thresholds",
    "Ind AS 108 Paragraph 13 specifies that an entity shall report separately information about an operating segment that meets any of the following quantitative thresholds: (a) revenue (internal + external) >= 10% of combined revenue; (b) profit/loss >= 10% of the greater of combined profitable segments and combined loss segments; or (c) assets >= 10% of combined assets."
  ),

  makeQ(1203, 12, "Interim and Segment Reporting", "Ind AS 108: The 75% External Revenue Sufficiency Rule",
    "After applying the 10% quantitative thresholds, a conglomerate's reportable segments account for only 60% of total consolidated external revenue. What action is required under Ind AS 108 Paragraph 15?",
    [
      "No action; remaining 40% is omitted.",
      "Additional operating segments must be identified as reportable segments (even if they do not meet the 10% thresholds) until at least 75% of the entity's total external revenue is included in reportable segments.",
      "The entity must prepare financial statements on a single-segment basis.",
      "The threshold is relaxed to 50% for Indian entities."
    ],
    1,
    "Ind AS 108 - Paragraph 15: The 75% External Revenue Threshold",
    "Ind AS 108 Paragraph 15 explicitly mandates: 'If the total external revenue reported by operating segments constitutes less than 75% of the entity's revenue, additional operating segments shall be identified as reportable segments (even if they do not meet the criteria in paragraph 13) until at least 75% of the entity's revenue is included in reportable segments.'"
  ),

  makeQ(1204, 12, "Interim and Segment Reporting", "Ind AS 108: Major Customer Disclosure Threshold",
    "Under Ind AS 108, when is an entity required to disclose information about its reliance on major customers?",
    [
      "When any single customer accounts for more than 1% of total revenues.",
      "If revenues from transactions with a single external customer amount to 10% or more of an entity's total revenues, the entity shall disclose that fact, the total amount of revenues from each such customer, and the identity of the segment(s) reporting the revenues (the name of the customer need not be disclosed).",
      "Only when the customer is a government ministry.",
      "Major customer disclosures are prohibited for confidentiality."
    ],
    1,
    "Ind AS 108 - Paragraph 34: Information About Major Customers",
    "Ind AS 108 Paragraph 34 states: 'If revenues from transactions with a single external customer amount to 10 per cent or more of an entity's revenues, the entity shall disclose that fact, the total amount of revenues from each such customer, and the identity of the segment or segments reporting the revenues. The entity need not disclose the identity of a major customer or the amount of revenues that each segment reports from that customer.'"
  ),

  makeQ(1205, 12, "Interim and Segment Reporting", "Ind AS 34: Effective Annual Tax Rate in Interim Reporting",
    "Under Ind AS 34, how should interim income tax expense be measured and recognized?",
    [
      "Calculated by applying statutory tax slabs to the actual profit of each individual interim quarter without regard to annual forecasts.",
      "Measured using the best estimate of the weighted average annual effective income tax rate expected for the full financial year applied to the pre-tax income of the interim period.",
      "Income tax is recognized only in the fourth quarter when the final tax return is filed.",
      "Measured as a flat 25% of interim EBITDA."
    ],
    1,
    "Ind AS 34 (Interim Financial Reporting) - Paragraphs 30(c) & Appendix B Paragraph B12",
    "Ind AS 34 states that interim period income tax expense is accrued using the tax rate that would be applicable to expected total annual earnings, that is, the estimated average annual effective income tax rate applied to the pre-tax income of the interim period. This reflects the principle that taxes are assessed on an annual basis."
  ),

  makeQ(1206, 12, "Interim and Segment Reporting", "Ind AS 34: Uneven and Seasonal Revenues in Interim Periods",
    "A ski resort and winter clothing manufacturer earns 85% of its annual sales revenues in Quarter 3 (October to December). How should revenue be recognized in interim financial statements under Ind AS 34?",
    [
      "Anticipated annual revenues must be averaged and smoothed equally across all 4 quarters.",
      "Revenues that are received seasonally, cyclically, or occasionally within a financial year shall NOT be anticipated or deferred for interim reporting purposes unless anticipation or deferral would also be appropriate at the end of the financial year (revenues are recognized when earned in Quarter 3).",
      "Quarter 1 and 2 revenues must be boosted by a management estimate.",
      "Interim reporting is prohibited for seasonal businesses."
    ],
    1,
    "Ind AS 34 - Paragraph 37: Revenues Received Seasonally, Cyclically, or Occasionally",
    "Ind AS 34 Paragraph 37 explicitly specifies: 'Revenues that are received seasonally, cyclically, or occasionally within a financial year shall not be anticipated or deferred for interim reporting purposes if anticipation or deferral would not be appropriate at the end of the entity's financial year.' Seasonal revenues are recognized when they occur."
  ),

  makeQ(1207, 12, "Interim and Segment Reporting", "Ind AS 34: Uneven Costs Incurred in Interim Periods",
    "In Quarter 1, an enterprise incurs its entire annual advertising campaign expenditure of ₹12 Crores. Management proposes deferring ₹9 Crores to Quarters 2, 3, and 4 on the grounds that advertising benefits sales throughout the year. Is this permitted under Ind AS 34?",
    [
      "Yes, advertising must be matched with future quarterly sales.",
      "No, costs that are incurred unevenly during an entity's financial year shall be anticipated or deferred for interim reporting purposes if, and only if, it is also appropriate to anticipate or defer that type of cost at the end of the financial year; advertising costs cannot be deferred under Ind AS 38 and must be expensed in Quarter 1.",
      "Permitted only if approved by SEBI.",
      "Advertising is recognized in OCI."
    ],
    1,
    "Ind AS 34 - Paragraph 39: Costs Incurred Unevenly During the Financial Year",
    "Ind AS 34 Paragraph 39 states that an entity applies the same recognition criteria in its interim financial statements as in its annual financial statements. Because advertising costs cannot be capitalized as assets under Ind AS 38 at year-end, they cannot be deferred at an interim reporting date."
  ),

  makeQ(1208, 12, "Interim and Segment Reporting", "Ind AS 108: Aggregation Criteria for Operating Segments",
    "Two operating segments produce consumer goods. Under Ind AS 108 Paragraph 12, when may two or more operating segments be aggregated into a single reportable operating segment?",
    [
      "Whenever their combined revenues exceed ₹1,000 Crores.",
      "Only if aggregation is consistent with the core principle of Ind AS 108, the segments have similar economic characteristics (e.g. similar long-term average gross margins), and they are similar in all of: (a) nature of products/services; (b) nature of production processes; (c) type of customer; (d) distribution methods; and (e) regulatory environment.",
      "Whenever the CODM decides to streamline presentation.",
      "Aggregation is never permitted under Ind AS 108."
    ],
    1,
    "Ind AS 108 - Paragraph 12: Aggregation Criteria",
    "Ind AS 108 Paragraph 12 permits two or more operating segments to be aggregated into a single operating segment if aggregation is consistent with the core principle of the standard, the segments have similar economic characteristics, and the segments are similar in each of the five specified respects (products, production, customers, distribution, and regulatory environment)."
  ),

  makeQ(1209, 12, "Interim and Segment Reporting", "Ind AS 34: Year-to-Date vs Quarter Comparatives",
    "For an entity whose financial year ends on 31st March, what comparative periods are required for the Statement of Profit and Loss in its interim financial report for the second quarter (30th September 2023) under Ind AS 34?",
    [
      "Only the current quarter (Q2) and previous quarter (Q1).",
      "Statement of profit and loss for the current interim period (3 months ending 30th Sept 2023) and cumulatively for the current financial year to date (6 months ending 30th Sept 2023), with comparative statements of profit and loss for the comparable interim periods (3 months and 6 months ending 30th Sept 2022).",
      "Only the preceding full financial year.",
      "Comparison with the projected annual budget."
    ],
    1,
    "Ind AS 34 - Paragraph 20(b): Comparative Periods for Statement of Profit and Loss",
    "Under Ind AS 34 Paragraph 20(b), an interim financial report shall include statements of profit and loss for: the current interim period and cumulatively for the current financial year to date, with comparative statements of profit and loss for the comparable interim periods (current and year-to-date) of the immediately preceding financial year."
  ),

  makeQ(1210, 12, "Interim and Segment Reporting", "Ind AS 108: Measurement of Segment Assets and Liabilities",
    "Under Ind AS 108, what accounting policies and measurement bases govern the reported amounts of segment profit or loss, segment assets, and segment liabilities?",
    [
      "They must strictly conform to Ind AS measurement rules applied in consolidated financial statements.",
      "The amount of each segment item reported shall be the measure reported to the Chief Operating Decision Maker (CODM) for the purposes of allocating resources to the segment and assessing its performance, accompanied by reconciliations to consolidated totals.",
      "They must be measured at historical cost.",
      "They are measured under tax accounting rules."
    ],
    1,
    "Ind AS 108 - Paragraphs 25-28: Measurement of Segment Information",
    "Ind AS 108 follows a strict management approach: the amount of each segment item reported is the measure reported to the CODM. If the CODM uses non-Ind AS measures (e.g. operating EBITDA or management transfer pricing) to evaluate performance, those exact figures are reported in the segment note, with a formal reconciliation to consolidated financial statements under Paragraph 28."
  ),

  makeQ(1211, 12, "Interim and Segment Reporting", "Ind AS 34: Impairment Loss Recognized in an Interim Period",
    "In Quarter 1 of FY 2023-24, an entity recognized an impairment loss of ₹10 Crores on Goodwill under Ind AS 36. By Quarter 4, economic recovery occurred, and the recoverable amount surpassed original book value. Can the goodwill impairment loss recognized in Quarter 1 be reversed in Quarter 4 of the same financial year under Ind AS 34 / Appendix A?",
    [
      "Yes, because interim reports are merely working drafts of the full annual report.",
      "No, Appendix A of Ind AS 34 (IFRIC 10) explicitly states that an entity shall not reverse an impairment loss recognized in a previous interim period in respect of goodwill.",
      "Reversal is permitted up to 50%.",
      "Reversal is credited to OCI."
    ],
    1,
    "Ind AS 34 - Appendix A (Interim Financial Reporting and Impairment) - Paragraphs 8-9",
    "Appendix A to Ind AS 34 addresses the interaction between Ind AS 34 and Ind AS 36 regarding goodwill. It states unequivocally: 'An entity shall not reverse an impairment loss recognized in a previous interim period in respect of goodwill.' The frequency of reporting does not affect the measurement at year-end."
  ),

  makeQ(1212, 12, "Interim and Segment Reporting", "Ind AS 108: Geographical Disclosures",
    "An Indian multinational entity operates globally. Under Ind AS 108 Paragraph 32, what entity-wide geographical information must be disclosed, regardless of segment organization?",
    [
      "List of every country where products are sold.",
      "(a) Revenues from external customers: (i) attributed to the entity's country of domicile; and (ii) attributed to all foreign countries in total; and (b) Non-current assets (other than financial instruments, deferred tax assets, and post-employment benefit assets) located in domicile vs foreign countries.",
      "Exchange rates used in all export invoices.",
      "Passports of international directors."
    ],
    1,
    "Ind AS 108 - Paragraph 32: Geographical Information Disclosures",
    "Ind AS 108 Paragraph 32 mandates entity-wide geographical disclosures: external revenues attributed to the country of domicile vs foreign countries in total (with separate disclosure of any individual material foreign country); and non-current assets located in domicile vs foreign countries."
  ),

  makeQ(1213, 12, "Interim and Segment Reporting", "Ind AS 34: Employer Year-End Bonuses",
    "An entity pays an annual incentive bonus to managers based on achieving annual turnover targets. In Quarter 2, half-yearly performance demonstrates that achieving the annual turnover target is probable, and management has a constructive obligation. How should the bonus be accounted for in the Quarter 2 interim report?",
    [
      "Recognize zero bonus until the annual target is officially audited at year-end.",
      "A bonus is anticipated for interim reporting purposes if, and only if: (a) the bonus is a legal or constructive obligation and a reliable estimate can be made; and (b) achieving target is probable; the estimated annual bonus is accrued pro-rata over the quarters.",
      "Charge 100% of the annual bonus in Quarter 2.",
      "Recognize bonus in OCI."
    ],
    1,
    "Ind AS 34 - Appendix B Paragraph B6: Year-End Bonuses",
    "Under Appendix B of Ind AS 34, a bonus is anticipated for interim reporting purposes if, and only if, the bonus is a legal obligation or past practice makes the bonus a constructive obligation for which the entity has no realistic alternative but to make the payments, and a reliable estimate of the obligation can be made."
  ),

  makeQ(1214, 12, "Interim and Segment Reporting", "Ind AS 108: Discontinued Operations in Segment Reporting",
    "If an operating segment meets the criteria to be classified as a Discontinued Operation under Ind AS 105, how is it presented in the segment note under Ind AS 108?",
    [
      "It must be completely removed from all segment disclosures.",
      "It continues to be reported in segment disclosures if its information is regularly reviewed by the CODM, but must be reconciled to the continuing operations presented on the face of the financial statements.",
      "It is presented in a separate column labeled 'Liquidated'.",
      "All segment reporting is suspended."
    ],
    1,
    "Ind AS 108 & Ind AS 105: Discontinued Operations in Segment Disclosures",
    "Segment reporting reflects how the CODM views the business. If the CODM continues to monitor the discontinued segment until final disposal, it is reported in segment disclosures, accompanied by appropriate reconciliations reconciling segment totals to continuing operations."
  ),

  makeQ(1215, 12, "Interim and Segment Reporting", "Ind AS 34: Inventory Market Declines and Recoveries",
    "In Quarter 2, commodity inventory was written down by ₹5 Crores to net realizable value under Ind AS 2. In Quarter 4, spot market prices surged. Can the ₹5 Crores inventory write-down be reversed in Quarter 4?",
    [
      "No, interim write-downs can never be reversed.",
      "Yes, unlike goodwill, inventory write-downs are required to be reversed under Ind AS 2 when circumstances change, and this applies equally between interim periods of the same financial year (up to original cost).",
      "Reversed only up to 50%.",
      "Reversed into OCI."
    ],
    1,
    "Ind AS 34 - Appendix B Paragraph B17 & Ind AS 2",
    "Ind AS 34 Appendix B Paragraph B17 states that inventory is measured for interim reporting by the same principles as at year-end. If an inventory write-down to net realizable value is recognized in an interim period and that NRV subsequently increases in a later interim period, the write-down is reversed in accordance with Ind AS 2."
  ),

  makeQ(1216, 12, "Interim and Segment Reporting", "Ind AS 108: Practical Limit on Number of Reportable Segments",
    "Under Ind AS 108 Paragraph 19, what is the practical upper limit on the number of reportable segments beyond which segment information may become overly detailed and lose usefulness?",
    [
      "5 segments.",
      "Approximately 10 reportable segments; when the number of reportable segments increases above 10, the entity should consider whether a practical limit has been reached and whether segments should be aggregated.",
      "25 segments.",
      "No limit exists."
    ],
    1,
    "Ind AS 108 - Paragraph 19: Practical Limit of Ten Segments",
    "Ind AS 108 Paragraph 19 states: 'There may be a practical limit to the number of reportable segments that an entity discloses... When the number of reportable segments increases above ten, the entity should consider whether a practical limit has been reached.'"
  ),

  makeQ(1217, 12, "Interim and Segment Reporting", "Ind AS 34: Materiality in Interim Reports",
    "Under Ind AS 34, how is materiality assessed when deciding how to recognize, measure, classify, or disclose an item for interim financial reporting?",
    [
      "Assessed exclusively in relation to projected annual financial data.",
      "Assessed in relation to the interim period financial data itself; while interim measurements may rely more on estimates than annual data, materiality is evaluated in the context of the interim period to ensure interim statements are not misleading.",
      "Materiality is fixed at 1% of equity.",
      "Materiality rules do not apply to interim reports."
    ],
    1,
    "Ind AS 34 - Paragraphs 23-25: Materiality in Interim Reporting",
    "Ind AS 34 Paragraph 23 states: 'In deciding how to recognize, measure, classify, or disclose an item for interim financial reporting purposes, materiality shall be assessed in relation to the interim period financial data.' It recognizes that interim measurements may involve greater use of estimates than annual reports."
  ),

  makeQ(1218, 12, "Interim and Segment Reporting", "Ind AS 108: Restatement of Previously Reported Segments",
    "In FY 2023-24, an entity reorganizes its internal management structure, altering the composition of its reportable segments. Under Ind AS 108 Paragraph 29, how should comparative segment information for prior periods be presented?",
    [
      "Comparative information is not required for segment changes.",
      "The entity shall restate the comparative information for earlier periods (including interim periods) unless the information is not available and the cost to develop it would be excessive.",
      "Comparative information must use statutory tax circles.",
      "Prior years must be re-audited by NFRA."
    ],
    1,
    "Ind AS 108 - Paragraph 29: Restatement of Previously Reported Segment Information",
    "Ind AS 108 Paragraph 29 states that if an entity changes the structure of its internal organization in a manner that causes the composition of its reportable segments to change, the corresponding information for earlier periods shall be restated unless the information is not available and the cost to develop it would be excessive."
  ),

  makeQ(1219, 12, "Interim and Segment Reporting", "Ind AS 34: Component Accounting and Interim Depreciation",
    "During Quarter 1, an enterprise acquires an item of plant. In calculating depreciation for the Quarter 1 interim report, should depreciation be calculated on a full-year basis or based on the fraction of the year the asset was operational?",
    [
      "Full annual depreciation must be recognized in Quarter 1.",
      "Depreciation is recognized based on the period during which the asset was available for use during the interim period (apportioned for the 3 months or relevant active fraction).",
      "No depreciation is recognized in interim quarters.",
      "Depreciation is recognized only in Quarter 4."
    ],
    1,
    "Ind AS 34 - Principles of Interim Recognition",
    "Depreciation in an interim period reflects the consumption of economic benefits during that specific interim timeframe. Assets acquired during the interim period are depreciated from the date they are available for use over the fraction of the interim period."
  ),

  makeQ(1220, 12, "Interim and Segment Reporting", "Ind AS 108: Symmetrical Allocation of Assets and Expenses",
    "Under Ind AS 108 Paragraph 27, if a segment expense (such as depreciation) is included in the measure of segment profit or loss reported to the CODM, must the related asset also be included in segment assets?",
    [
      "No, assets and expenses can be completely mismatched.",
      "Yes, segment assets shall include those assets used by a segment and either allocated to, or used by, that segment in its operations; if depreciation is allocated to a segment, the related asset is symmetrically included in segment assets unless management reports them asymmetrically to the CODM.",
      "Assets are never reported in operating segments.",
      "Only cash can be allocated."
    ],
    1,
    "Ind AS 108 - Paragraph 27: Symmetrical Allocation",
    "Under Ind AS 108 Paragraph 27, the allocation of assets and liabilities to segments must be consistent with the allocation of related income and expenses (symmetrical allocation). If an item of depreciation is included in segment profit or loss, the underlying asset is typically included in segment assets."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_12_interim_segment_reporting.json'), JSON.stringify(t12Qs, null, 2), 'utf8');
console.log('Saved Topic 12: 20 Questions');

// =========================================================================
// TOPIC 13: Accounting for Insurance, Banking, and NBFC Entities (20 Questions)
// =========================================================================
const t13Qs = [
  makeQ(1301, 13, "Insurance, Banking, and NBFC Entities", "Banking & Ind AS: RBI Guidelines on ECL vs IRAC Norms",
    "Commercial banks in India currently prepare financial statements under RBI Prudential Norms on Income Recognition, Asset Classification and Provisioning (IRAC). In transitioning to Ind AS 109, what is the primary fundamental difference between the IRAC framework and the Ind AS 109 ECL framework?",
    [
      "IRAC is a forward-looking expected loss model, while Ind AS 109 is an incurred loss model.",
      "IRAC relies on rule-based, formulaic days-past-due provisioning (e.g. 90-day NPA threshold with fixed percentage provisioning like 15% Sub-standard, 25-40% Doubtful), whereas Ind AS 109 is a principle-based forward-looking Expected Credit Loss (ECL) model requiring provisioning based on Probability of Default (PD), Loss Given Default (LGD), and Exposure at Default (EAD) from Day 1.",
      "IRAC prohibits any provisions on standard assets.",
      "Ind AS 109 allows banks to ignore credit risk until legal recovery is complete."
    ],
    1,
    "RBI Discussion Paper on ECL Framework for Banks & Ind AS 109",
    "The traditional RBI IRAC framework relies on rule-based backward-looking triggers (90 days past due for NPA classification with prescribed percentage provisions). Ind AS 109 introduces a forward-looking 3-stage Expected Credit Loss (ECL) model incorporating macroeconomic forecasts, probability of default (PD), loss given default (LGD), and exposure at default (EAD)."
  ),

  makeQ(1302, 13, "Insurance, Banking, and NBFC Entities", "NBFC: RBI Scale-Based Regulation (SBR) & Ind AS 109 Implementation",
    "Under the Reserve Bank of India (RBI) Scale-Based Regulation (SBR) framework and circulars for Non-Banking Financial Companies (NBFCs) preparing Ind AS financial statements, what must an NBFC do if the impairment allowance calculated under Ind AS 109 (ECL) is LESS than the provision required under traditional prudential IRAC norms?",
    [
      "The NBFC can ignore the IRAC shortfall and distribute the difference as dividends.",
      "The NBFC shall appropriate the shortfall (excess of IRAC provision over Ind AS 109 ECL allowance) from net profit after tax to a separate 'Impairment Reserve' within equity, which is NOT available for distribution as dividend.",
      "The NBFC must switch back to Indian GAAP.",
      "The shortfall is recognized as an intangible asset."
    ],
    1,
    "RBI Circular on Implementation of Ind AS for NBFCs (DOR.ACC.REC.No.91/21.02.067/2019-20) - Impairment Reserve",
    "Under RBI guidelines, NBFCs apply Ind AS 109 for financial reporting, but must calculate provisions required under prudential IRAC norms. If the impairment allowance under Ind AS 109 is lower than the provision required under IRAC norms (including standard asset provisioning), the difference must be appropriated to an 'Impairment Reserve' from retained earnings. No withdrawal is permitted from this reserve without prior RBI approval."
  ),

  makeQ(1303, 13, "Insurance, Banking, and NBFC Entities", "Insurance: Ind AS 104 / Ind AS 117 - Definition of Insurance Contract",
    "How does Ind AS 104 / Ind AS 117 define an 'Insurance Contract'?",
    [
      "Any contract entered into by a company registered with the Insurance Regulatory and Development Authority of India (IRDAI).",
      "A contract under which one party (the insurer) accepts significant insurance risk from another party (the policyholder) by agreeing to compensate the policyholder if a specified uncertain future event (the insured event) adversely affects the policyholder.",
      "Any investment contract with guaranteed financial returns.",
      "A derivative contract settled strictly in cash."
    ],
    1,
    "Ind AS 104 / Ind AS 117 (Insurance Contracts) - Appendix A: Definition of Insurance Contract",
    "An insurance contract is defined as a contract under which one party (the insurer) accepts significant insurance risk from another party (the policyholder) by agreeing to compensate the policyholder if a specified uncertain future event adversely affects the policyholder. Significant insurance risk exists only if an insured event could cause the insurer to pay significant additional benefits in any scenario."
  ),

  makeQ(1304, 13, "Insurance, Banking, and NBFC Entities", "Insurance: Unbundling of Deposit Components",
    "A life insurance policy combines a pure term insurance cover (death benefit) and an investment savings deposit component. The investment deposit component can be measured separately and the insurer's accounting policies do not otherwise require it to recognize all obligations arising from the deposit component. Under Ind AS 104, when is 'unbundling' mandatory?",
    [
      "Never, insurance contracts must always be accounted for as an indivisible whole.",
      "Unbundling is mandatory if the insurer can measure the deposit component separately AND the insurer's accounting policies do not otherwise require it to recognize all rights and obligations arising from the deposit component; if unbundled, the insurance component is under Ind AS 104/117 and the deposit component is under Ind AS 109.",
      "Unbundling is required only for marine insurance.",
      "Unbundling is at the discretion of the policyholder."
    ],
    1,
    "Ind AS 104 - Paragraphs 10-12: Unbundling of Deposit Components",
    "Ind AS 104 Paragraph 10 states that unbundling is required if: (a) the insurer can measure the deposit component separately; and (b) the insurer's accounting policies do not otherwise require it to recognize all rights and obligations arising from the deposit component. The deposit component is accounted for under Ind AS 109 (Financial Instruments)."
  ),

  makeQ(1305, 13, "Insurance, Banking, and NBFC Entities", "Insurance: Liability Adequacy Test (LAT)",
    "Under Ind AS 104 Paragraph 15, what is the 'Liability Adequacy Test' (LAT) that an insurer must perform at each reporting date?",
    [
      "A solvency ratio check against statutory IRDAI limits.",
      "An assessment of whether its recognized insurance liabilities are adequate, using current estimates of future cash flows under its insurance contracts; if the test shows that the carrying amount of insurance liabilities is inadequate in light of estimated future cash flows, the entire shortfall is recognized in Profit or Loss.",
      "An inspection of physical insurance policy bonds.",
      "A test of policyholder credit scores."
    ],
    1,
    "Ind AS 104 - Paragraphs 15-19: Liability Adequacy Test",
    "Ind AS 104 Paragraph 15 requires an insurer to assess at the end of each reporting period whether its recognized insurance liabilities are adequate, using current estimates of future cash flows under its insurance contracts. If the carrying amount of insurance liabilities is inadequate (after deducting related deferred acquisition costs), the entire deficiency is recognized immediately in profit or loss."
  ),

  makeQ(1306, 13, "Insurance, Banking, and NBFC Entities", "Banking: Effective Interest Rate on Stressed Loan Restructuring",
    "A commercial bank restructures a stressed corporate loan of ₹100 Crores by waiving ₹10 Crores of principal, reducing the interest rate, and extending the maturity. The restructuring does not result in derecognition under the 10% test of Ind AS 109. How does the bank account for this loan modification under Ind AS 109?",
    [
      "The ₹10 Crores waiver is capitalized into future loan interest.",
      "The bank recalculates the gross carrying amount of the financial asset as the present value of the renegotiated or modified contractual cash flows discounted at the financial asset's original effective interest rate (EIR), and recognizes a modification gain or loss immediately in the Statement of Profit and Loss.",
      "No accounting entry is made until cash is received.",
      "Recognized in Other Comprehensive Income."
    ],
    1,
    "Ind AS 109 - Paragraph 5.4.3: Modification of Financial Assets",
    "Under Ind AS 109 Paragraph 5.4.3, when the contractual cash flows of a financial asset are renegotiated or otherwise modified and the modification does not result in derecognition, an entity shall recalculate the gross carrying amount of the financial asset and shall recognize a modification gain or loss in profit or loss. The gross carrying amount is recalculated as the present value of modified cash flows discounted at the original EIR."
  ),

  makeQ(1307, 13, "Insurance, Banking, and NBFC Entities", "NBFC: Definition of Scale-Based Regulation Layers",
    "Under the RBI's Scale-Based Regulation (SBR) framework for NBFCs, which layer encompasses non-deposit taking NBFCs with asset size of ₹1,000 Crores and above, as well as all deposit-taking NBFCs (irrespective of asset size)?",
    [
      "Base Layer (NBFC-BL).",
      "Middle Layer (NBFC-ML).",
      "Upper Layer (NBFC-UL).",
      "Top Layer (NBFC-TL)."
    ],
    1,
    "RBI Framework on Scale Based Regulation (SBR) for NBFCs",
    "Under RBI SBR guidelines: (a) Base Layer consists of non-deposit taking NBFCs below ₹1,000 Cr asset size; (b) Middle Layer consists of all deposit-taking NBFCs irrespective of asset size, non-deposit taking NBFCs with asset size >= ₹1,000 Cr, Standalone Primary Dealers, and Core Investment Companies; (c) Upper Layer consists of top 10-15 systemic NBFCs; (d) Top Layer remains vacant unless specific risk warrants."
  ),

  makeQ(1308, 13, "Insurance, Banking, and NBFC Entities", "Banking: Off-Balance Sheet Exposures (Letter of Credit & Bank Guarantees) ECL",
    "Under Ind AS 109, how must a commercial bank measure credit loss allowances for irrevocable loan commitments, financial guarantees, and Letters of Credit (LCs)?",
    [
      "They are off-balance sheet items and require zero provision until legally invoked.",
      "They are subject to the Ind AS 109 Expected Credit Loss (ECL) impairment requirements; the bank applies a Credit Conversion Factor (CCF) to estimate Exposure at Default (EAD) and recognizes a provision under liabilities on the balance sheet with a charge to Profit or Loss.",
      "Provisioned at a flat 0.40% under statutory rules.",
      "Recognized in OCI."
    ],
    1,
    "Ind AS 109 - Paragraphs 5.5.1 & B5.5.30-B5.5.32: ECL on Loan Commitments and Financial Guarantees",
    "Ind AS 109 Paragraph 5.5.1 explicitly brings loan commitments and financial guarantee contracts within its impairment scope. Banks apply a Credit Conversion Factor (CCF) based on historical drawdown data to determine EAD and apply PD and LGD to recognize an expected credit loss provision in liabilities."
  ),

  makeQ(1309, 13, "Insurance, Banking, and NBFC Entities", "Insurance: Catastrophe and Equalisation Reserves Prohibition",
    "Under Ind AS 104 Paragraph 14(a), can a general insurance company recognize a 'Catastrophe Reserve' or 'Equalisation Reserve' as a liability for possible future claims arising from disasters that have not occurred at the reporting date?",
    [
      "Yes, conservatism encourages building catastrophe reserves during profitable years.",
      "No, Ind AS 104 Paragraph 14(a) explicitly prohibits the recognition as a liability of any provisions for possible future claims, if those claims arise under insurance contracts that are not in existence at the end of the reporting period (such as catastrophe and equalisation reserves).",
      "Permissible if approved by IRDAI.",
      "Recognized as a deduction from premium income."
    ],
    1,
    "Ind AS 104 - Paragraph 14(a): Catastrophe and Equalisation Reserves Prohibition",
    "Ind AS 104 Paragraph 14(a) states unequivocally that an insurer shall not recognize as a liability any provisions for possible future claims, if those claims arise under insurance contracts that are not in existence at the end of the reporting period (such as catastrophe reserves and equalisation reserves). They do not meet the definition of a liability."
  ),

  makeQ(1310, 13, "Insurance, Banking, and NBFC Entities", "NBFC: 90-Day Overdue Norm for Stage 3 Classification",
    "Under Ind AS 109 and RBI harmonization guidelines for NBFCs, when does a loan asset classified by an NBFC mandatorily transition to Stage 3 (Credit-Impaired)?",
    [
      "When payments are overdue by 30 days.",
      "When contractual payments of principal or interest are overdue for more than 90 days (harmonized NPA threshold), or where objective evidence of default exists (such as borrower insolvency or debt restructuring due to financial difficulty).",
      "When payments are overdue for 180 days.",
      "Only after filing a suit under the SARFAESI Act."
    ],
    1,
    "RBI Circular on Prudential Norms on Income Recognition & Asset Classification (IRAC) & Ind AS 109 Stage 3",
    "Under RBI's harmonized norms and Ind AS 109 rebuttable presumption (Paragraph B5.5.37), default does not occur later than when a financial asset is 90 days past due. A loan that is overdue for more than 90 days is classified as Stage 3 (credit-impaired), requiring lifetime ECL."
  ),

  makeQ(1311, 13, "Insurance, Banking, and NBFC Entities", "Banking: Fair Valuation of Priority Sector Lending (PSL) Certificates",
    "Commercial banks in India buy and sell Priority Sector Lending Certificates (PSLCs) to achieve mandated priority sector targets without transferring underlying loans. How should an investing bank account for purchased PSLCs under Ind AS?",
    [
      "Classify as an equity investment under Ind AS 109.",
      "Classified as other assets (intangible or financial asset) and recognized at transaction cost/fair value, with fee income or expense recognized in profit or loss over the validity period matching the regulatory compliance year.",
      "Capitalized into loan advances.",
      "Recognized in OCI."
    ],
    1,
    "RBI Guidelines on Priority Sector Lending Certificates (PSLCs) & Ind AS",
    "PSLCs do not involve any transfer of loan assets or risks; they are market-driven instruments that allow banks to purchase regulatory compliance. The fee paid is recognized as an operating/regulatory expense in Profit or Loss over the period of validity."
  ),

  makeQ(1312, 13, "Insurance, Banking, and NBFC Entities", "Insurance: Deferred Acquisition Costs (DAC) Shadow Accounting",
    "Under Ind AS 104, when an insurer recognizes unrealized gains or losses on its debt securities portfolio in Other Comprehensive Income (FVOCI), how does 'Shadow Accounting' operate for Deferred Acquisition Costs (DAC) and policyholder liabilities?",
    [
      "Shadow accounting is strictly prohibited under Ind AS.",
      "An insurer is permitted to change its accounting policies so that an unrecognized gain or loss on an asset affects the measurement of insurance liabilities or deferred acquisition costs (DAC) in OCI in the same way that a realized gain or loss does, mitigating artificial volatility.",
      "All DAC must be written off immediately.",
      "Shadow accounting applies only to motor insurance."
    ],
    1,
    "Ind AS 104 - Paragraphs 28-30: Shadow Accounting",
    "Ind AS 104 Paragraph 28 permits shadow accounting: when unrealized gains or losses on assets are recognized in Other Comprehensive Income, the related adjustment to the insurance liability (or deferred acquisition costs or intangible assets) may also be recognized in OCI so that the accounting reflects the economic sharing of gains with policyholders."
  ),

  makeQ(1313, 13, "Insurance, Banking, and NBFC Entities", "NBFC: Treatment of Processing Fees on Loans Disbursed",
    "FinLease NBFC originates personal loans of ₹100 Crores with average tenure of 3 years. It collects upfront, non-refundable loan processing and origination fees of ₹2 Crores from borrowers. How should FinLease NBFC recognize this processing fee under Ind AS 109?",
    [
      "Recognize the full ₹2 Crores as upfront fee income in Profit or Loss on the disbursement date.",
      "The loan origination fee is an integral part of generating an effective interest rate (EIR) on the financial asset; it must be deducted from the initial loan disbursement and amortized as interest income over the 3-year loan tenure using the Effective Interest Rate method.",
      "Credit the fee to a statutory reserve.",
      "Recognize the fee in OCI."
    ],
    1,
    "Ind AS 109 - Paragraphs 5.1.1 & B5.4.1: Fees Integral to Effective Interest Rate",
    "Ind AS 109 Paragraph B5.4.1 states that fees that are an integral part of the effective interest rate of a financial instrument include origination fees received by the entity relating to the creation or acquisition of a financial asset. Such fees are treated as an adjustment to the effective interest rate and recognized as interest income over the expected life of the loan."
  ),

  makeQ(1314, 13, "Insurance, Banking, and NBFC Entities", "Banking: Reverse Repo Transactions Accounting",
    "A commercial bank enters into a Reverse Repo transaction with RBI: the bank lends ₹100 Crores cash for 7 days against Government Securities (G-Secs) pledged as collateral. How should the bank record this transaction on its balance sheet under Ind AS 109?",
    [
      "Record an acquisition of Government Securities in its trading portfolio.",
      "The bank does NOT recognize the underlying G-Secs as an asset because control and substantial risks/rewards remain with RBI; the bank records a collateralized financial asset (Loan / Lending under Reverse Repo) of ₹100 Crores at amortized cost and recognizes repo interest income over 7 days.",
      "Recognize an equity investment.",
      "Record as an off-balance sheet commitment."
    ],
    1,
    "Ind AS 109 - Derecognition and Collateralized Reverse Repurchase Agreements",
    "Under Ind AS 109, in a reverse repo transaction, the lender provides cash collateralized by securities. Because the transferor (borrower) retains substantially all risks and rewards of the securities (interest and price risk), the transferee (lender) does not recognize the securities. The cash outflow is recorded as a loan asset at amortized cost."
  ),

  makeQ(1315, 13, "Insurance, Banking, and NBFC Entities", "Insurance: Ind AS 117 - Contractual Service Margin (CSM)",
    "Under Ind AS 117 (Insurance Contracts, corresponding to IFRS 17), what does the 'Contractual Service Margin' (CSM) represent at initial recognition of a group of insurance contracts?",
    [
      "The statutory margin of solvency required by the insurance regulator.",
      "The unearned profit in a group of insurance contracts that the entity will recognize as it provides insurance contract services in the future (ensuring that no day-one gain is recognized at inception of profitable contracts).",
      "The commission paid to insurance agents.",
      "The claims provision for incurred but not reported (IBNR) losses."
    ],
    1,
    "Ind AS 117 (Insurance Contracts) - Paragraphs 38-44: Contractual Service Margin (CSM)",
    "Under Ind AS 117, the Contractual Service Margin (CSM) is a component of the carrying amount of the asset or liability for a group of insurance contracts representing the unearned profit the entity will recognize as it provides services under the insurance contracts in the group. If contracts are profitable at inception, no day-one gain is recognized; profit is deferred as CSM and recognized over the coverage period."
  ),

  makeQ(1316, 13, "Insurance, Banking, and NBFC Entities", "NBFC: Revolving Credit Facilities (Credit Cards) ECL Measurement",
    "A retail NBFC issues credit cards to 50,000 customers. Credit cards have no fixed repayment date and include both a drawn balance and an undrawn credit line. Under Ind AS 109 Paragraph 5.5.20, over what period must expected credit losses be measured for such revolving credit facilities?",
    [
      "Strictly over the contractual notice period of 1 day.",
      "Over the period that the entity is exposed to credit risk and credit losses would not be mitigated by credit risk management actions (even if that period extends beyond the maximum contractual period), estimated using behavioral repayment patterns and credit limit review cycles.",
      "Fixed at exactly 12 months for all revolving facilities.",
      "ECL is not measured on credit cards."
    ],
    1,
    "Ind AS 109 - Paragraph 5.5.20 & Paragraph B5.5.38: Revolving Credit Facilities",
    "Ind AS 109 Paragraph 5.5.20 addresses financial instruments that include both a loan and an undrawn commitment component where the entity's contractual ability to demand repayment and cancel the commitment does not limit the entity's exposure to credit losses to the contractual notice period. ECL is measured over the behavioral period during which the entity is exposed to credit risk."
  ),

  makeQ(1317, 13, "Insurance, Banking, and NBFC Entities", "Banking: Restructured Advances - Upgrade from NPA to Standard",
    "Under RBI circulars governing the Prudential Framework for Resolution of Stressed Assets, when can a restructured commercial bank account upgraded from NPA (Stage 3) to Standard Asset (Stage 1/2) status?",
    [
      "Immediately upon signing the restructuring resolution plan.",
      "Only after the expiry of the 'Monitoring Period' (at least 1 year from the date of commencement of first payment of interest or principal under the revised terms) AND provided the borrower has demonstrated satisfactory performance during that entire period (no payment overdue for more than 30 days).",
      "After 3 months of regular payments.",
      "Upgrade is prohibited under Indian banking law."
    ],
    1,
    "RBI Prudential Framework for Resolution of Stressed Assets - Paragraph 19 (Upgrading of Accounts)",
    "Under RBI norms, an account upgraded to standard asset must be monitored for a minimum period of one year ('Monitoring Period'). The account can be upgraded from NPA to Standard only when all outstanding dues have been serviced regularly and the borrower demonstrates satisfactory performance during the entire monitoring period."
  ),

  makeQ(1318, 13, "Insurance, Banking, and NBFC Entities", "Insurance: Incurred But Not Reported (IBNR) Claims",
    "In general and health insurance accounting, what does the 'Incurred But Not Reported' (IBNR) provision represent, and how is it determined?",
    [
      "Claims that policyholders have formally registered with the claims processing department.",
      "An actuarially estimated provision for claims arising from insured events that have already occurred on or before the balance sheet date, but which have not yet been notified or reported to the insurer, estimated using mathematical techniques such as the Chain Ladder Method.",
      "Future claims arising from policies to be issued in the next financial year.",
      "Unpaid agent commissions."
    ],
    1,
    "Ind AS 104 & IRDAI Actuarial Reporting Norms: IBNR Provisioning",
    "IBNR represents provisions for claims relating to insured events that occurred prior to the reporting date, but which have not yet been reported to the insurer due to reporting lags. Actuaries compute IBNR (along with Incurred But Not Enough Reported - IBNER) using run-off triangles and statistical techniques like the Chain Ladder or Bornhuetter-Ferguson method."
  ),

  makeQ(1319, 13, "Insurance, Banking, and NBFC Entities", "NBFC: Write-Off of Stressed Loans - Technical vs Actual Write-Off",
    "An NBFC decides to perform a 'Technical Write-Off' (prudential write-off) of a non-performing loan portfolio of ₹50 Crores where 100% ECL provisions have already been recognized. What is the impact of a technical write-off on the financial statements and legal recovery?",
    [
      "The borrower is legally forgiven from debt, and no recovery can be pursued.",
      "The loan is derecognized from the balance sheet by offsetting the gross loan against the accumulated ECL provision, reducing gross advances and gross NPAs, but without waiving the legal right of recovery against the borrower; any subsequent cash recovery is recognized as bad debt recovery in Profit or Loss.",
      "An immediate loss of ₹50 Crores is charged to P&L.",
      "Technical write-off is prohibited under Ind AS."
    ],
    1,
    "Ind AS 109 - Paragraph 5.4.4: Write-Off of Financial Assets & RBI Guidelines",
    "Ind AS 109 Paragraph 5.4.4 states: 'An entity shall directly reduce the gross carrying amount of a financial asset when the entity has no reasonable expectations of recovering a financial asset in its entirety or a portion thereof. A write-off constitutes a derecognition event.' Technical write-off clears the loan and provision from the balance sheet while recovery actions proceed off-balance sheet."
  ),

  makeQ(1320, 13, "Insurance, Banking, and NBFC Entities", "Banking: Day 1 Loss on Off-Market Concessional Loans to Employees",
    "A scheduled commercial bank provides home loans to its permanent employees at a subsidized interest rate of 4% per annum (prevailing market lending rate for third-party home loans is 9% per annum). Total loans disbursed amounted to ₹100 Crores. How should the bank account for this concessional employee loan under Ind AS 109 and Ind AS 19?",
    [
      "Record loan at ₹100 Crores; recognize interest income at 4% annually.",
      "Measure the loan at fair value at inception by discounting cash flows at the market rate of 9% (e.g. ₹70 Crores); the Day 1 difference of ₹30 Crores represents an employee benefit (prepaid employee benefit expense) under Ind AS 19, amortized to Profit or Loss over the remaining employee service/vesting period, while interest income on the loan is recognized at 9% EIR.",
      "Charge the ₹30 Crores difference to equity reserves.",
      "Concessional employee loans are illegal under banking regulations."
    ],
    1,
    "Ind AS 109 - Paragraph B5.1.1 & Ind AS 19: Employee Concessional Loans",
    "Under Ind AS 109 and Ind AS 19, when an entity grants an off-market below-interest loan to an employee, the loan is recognized initially at fair value. The difference between the cash advanced and fair value represents remuneration for employee services (prepaid staff benefit). The prepaid asset is expensed over the service period, while interest income is accreted at the market effective interest rate."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_13_insurance_banking_nbfc.json'), JSON.stringify(t13Qs, null, 2), 'utf8');
console.log('Saved Topic 13: 20 Questions');
console.log('--- Part 3 complete: Topics 9 to 13 generated (100 questions total) ---');

