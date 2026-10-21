const fs = require('fs');
const path = require('path');

const frDir = path.join(__dirname, '..', 'data', 'fr');
if (!fs.existsSync(frDir)) fs.mkdirSync(frDir, { recursive: true });

// Helper to make question
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
// TOPIC 1: Conceptual Framework for Financial Reporting (20 Questions)
// =========================================================================
const t1Qs = [
  makeQ(101, 1, "Conceptual Framework for Financial Reporting", "Asset Definition & Economic Resource",
    "Apex Ltd. has signed an exclusive, non-cancellable 5-year concession agreement with the State Port Authority to operate cargo berths. The agreement grants Apex Ltd. exclusive rights to collect cargo handling tariffs from container vessels. However, legal ownership of the berths and land remains with the Government. Evaluating this arrangement under the revised Conceptual Framework for Financial Reporting under Ind AS, which of the following statements correctly evaluates whether Apex Ltd. has an asset?",
    [
      "Apex Ltd. cannot recognize an asset because legal ownership of the underlying berth infrastructure and land vests with the State Port Authority.",
      "Apex Ltd. controls a present economic resource (the exclusive contractual right to operate berths and collect tariffs) arising from past events, which represents an asset irrespective of legal title.",
      "The contractual right represents a contingent asset because the inflow of future cash flows depends entirely on third-party container vessels arriving at the port.",
      "Apex Ltd. may only recognize an asset if it purchases the physical freehold property at the expiry of the concession period."
    ],
    1,
    "Conceptual Framework for Financial Reporting (Chapter 4 - Definition of Asset & Present Economic Resource)",
    "Under Chapter 4 of the revised Conceptual Framework, an asset is defined as 'a present economic resource controlled by the entity as a result of past events. An economic resource is a right that has the potential to produce economic benefits.' Legal ownership is not a prerequisite for control. The exclusive right to operate berths and generate future tariff revenues fulfills the definition of an economic resource controlled by Apex Ltd."
  ),

  makeQ(102, 1, "Conceptual Framework for Financial Reporting", "Liability Definition & Constructive Obligation",
    "BioClean Pharma Ltd. operates a manufacturing facility. While local municipal environmental laws do not mandate remediation of contaminated groundwater, BioClean Pharma Ltd. has published an explicit, widely publicised Corporate Environmental Policy and consistently cleaned up contamination at all its global sites over the past decade. A chemical spill occurred in February 2024. How should the remediation duty be characterized under the Conceptual Framework for Financial Reporting?",
    [
      "It cannot be recognized as a liability because there is no statutory or legal obligation enforceable in a court of law.",
      "It represents a present constructive obligation where the entity has created a valid expectation in other parties that it will discharge the responsibility, leaving no practical ability to avoid it.",
      "It should be disclosed strictly as a contingent liability until the State Pollution Control Board serves a formal legal notice.",
      "It represents a future operating commitment and must be expensed in the financial year when cash payments are actually executed."
    ],
    1,
    "Conceptual Framework (Chapter 4 - Definition of Liability) & Ind AS 37 Paragraph 10",
    "Under the Conceptual Framework, a liability is a present obligation of the entity to transfer an economic resource as a result of past events. An obligation can be legal or constructive. A constructive obligation arises from an established pattern of past practice, published policies, or specific current statements that create a valid expectation in third parties, leaving the entity with no practical ability to avoid the transfer."
  ),

  makeQ(103, 1, "Conceptual Framework for Financial Reporting", "Measurement Bases - Fair Value vs Value in Use",
    "Zenith Engineering Ltd. holds a specialized heavy hydraulic press specifically engineered for its proprietary manufacturing process. Active secondary markets for this customized press do not exist, and market participants would have to incur prohibitive retrofitting costs to use it. Under the Conceptual Framework, what is the primary distinction between Fair Value and Value in Use as measurement bases for this asset?",
    [
      "Fair value reflects entity-specific assumptions, whereas value in use reflects current market participant perspectives.",
      "Fair value is an exit price based on assumptions market participants would use, while value in use is an entity-specific measure reflecting the present value of cash flows the entity expects to derive from the asset's continued use and ultimate disposal.",
      "Value in use must always equal historical cost less accumulated depreciation, whereas fair value must be verified with an active quoted price.",
      "There is no conceptual difference; both measures yield identical valuations under Ind AS 113."
    ],
    1,
    "Conceptual Framework (Chapter 6 - Measurement: Current Value Bases)",
    "Chapter 6 distinguishes between market-based and entity-specific measures: Fair value reflects the perspective of market participants and is not entity-specific. In contrast, value in use reflects entity-specific expectations regarding future cash flows derived from continuing use and ultimate disposal, reflecting entity-specific synergy, tax position, and proprietary utilization."
  ),

  makeQ(104, 1, "Conceptual Framework for Financial Reporting", "Prudence and Neutrality",
    "During the preparation of financial statements, the CFO of Radiant Ltd. contends that 'prudence' mandates that the company should deliberately recognize excess provisions and systematically undervalue assets to ensure financial statements are conservative and shock-proof. Under the revised Conceptual Framework for Financial Reporting under Ind AS, which of the following correctly describes the concept of prudence?",
    [
      "Prudence requires deliberate conservatism, permitting systematic overstatement of liabilities and understatement of assets to safeguard against unforeseen economic downturns.",
      "Prudence is the exercise of caution when making judgements under conditions of uncertainty, and it supports neutrality such that assets and income are not overstated, and liabilities and expenses are not understated, but without deliberate bias or asymmetric distortion.",
      "Prudence has been completely removed from the Conceptual Framework because it was found to conflict with historical cost accounting.",
      "Prudence allows entities to establish secret reserves during profitable years to smooth future earnings volatility."
    ],
    1,
    "Conceptual Framework (Chapter 2 - Qualitative Characteristics of Useful Financial Information: Neutrality & Prudence)",
    "The revised Conceptual Framework explains that neutrality is supported by the exercise of prudence. Prudence is the exercise of caution when making judgements under conditions of uncertainty. Importantly, prudence does not allow for deliberate understatement of assets or income, nor the deliberate overstatement of liabilities or expenses, as such misstatements undermine neutrality and faithful representation."
  ),

  makeQ(105, 1, "Conceptual Framework for Financial Reporting", "Derecognition Principles",
    "Nova FinTech Ltd. transfers a portfolio of receivables with a carrying value of ₹50 Crores to a special purpose vehicle (SPV) for ₹48 Crores cash. However, Nova FinTech Ltd. guarantees full credit loss compensation up to ₹15 Crores (historical credit default rate is 2%). Under the Conceptual Framework derecognition criteria, what is the appropriate accounting treatment?",
    [
      "Derecognize the full portfolio of receivables immediately because legal custody has been transferred to the SPV.",
      "Derecognition is not appropriate for the transferred receivables because Nova FinTech Ltd. has retained substantially all the risks (first-loss credit risk) and continues to control the economic resource; the cash received should be treated as a collateralized financial liability.",
      "Recognize a capital reserve of ₹2 Crores representing the difference between book value and transfer consideration.",
      "Derecognize 70% of the receivables and retain 30% as an equity investment in the SPV."
    ],
    1,
    "Conceptual Framework (Chapter 5 - Derecognition) & Ind AS 109 Paragraph 3.2.6",
    "Derecognition aims to represent faithfully both the assets and liabilities retained after the transaction. When an entity transfers an asset but retains substantially all the risks and rewards of ownership (such as significant first-loss guarantees), the entity continues to control the economic resource and cannot derecognize the asset."
  ),

  makeQ(106, 1, "Conceptual Framework for Financial Reporting", "Unit of Account",
    "A conglomerate acquires 1,000 hectares of contiguous agricultural and residential land. Under the Conceptual Framework, how should management determine the 'unit of account' for financial reporting?",
    [
      "The entire 1,000 hectares must always be accounted for as a single indivisible unit of account regardless of intended economic use.",
      "The unit of account is the level at which rights or obligations are aggregated or disaggregated for recognition and measurement, chosen to provide relevant information and faithful representation of economic reality.",
      "The unit of account is dictated strictly by local municipal tax survey numbers and cannot be altered by financial reporting standards.",
      "Each individual square meter of land must be accounted for as a separate unit of account."
    ],
    1,
    "Conceptual Framework (Chapter 4 - Unit of Account)",
    "Paragraphs 4.48-4.55 state that the unit of account is selected for an asset or liability after considering how the information will provide relevant information that faithfully represents the rights and obligations. Combining or separating items depends on the nature of the economic activities and how rights are exercised or settled."
  ),

  makeQ(107, 1, "Conceptual Framework for Financial Reporting", "Financial vs Physical Capital Maintenance",
    "Pioneer Traders began the year with capital of ₹1,000 representing 100 units of inventory at ₹10 per unit. During the year, all 100 units were sold for ₹15 per unit (cash inflow ₹1,500). At year-end, the replacement cost of inventory has increased to ₹12 per unit. Under the Physical Capital Maintenance concept, what is Pioneer Traders' recognized profit for the year?",
    [
      "₹500 (calculated as ₹1,500 revenue minus historical cost of ₹1,000).",
      "₹300 (calculated as ₹1,500 revenue minus current replacement cost of ₹1,200 to maintain physical operating capacity; the ₹200 increase in replacement cost is credited directly to capital maintenance reserve).",
      "₹200 (calculated as ₹1,200 replacement cost minus ₹1,000 initial capital).",
      "₹0 (because all proceeds must be held in statutory reserve)."
    ],
    1,
    "Conceptual Framework (Chapter 8 - Concepts of Capital and Capital Maintenance)",
    "Under physical capital maintenance, profit is earned only if the physical productive capacity (or operating capacity) of the enterprise exceeds the physical capacity at the beginning of the period. To maintain physical capacity of 100 units at year-end costs ₹1,200. Profit is ₹1,500 - ₹1,200 = ₹300. The ₹200 difference is a capital maintenance adjustment treated as equity, not profit."
  ),

  makeQ(108, 1, "Conceptual Framework for Financial Reporting", "Substance Over Form",
    "Everest Ltd. sells specialized heavy machinery to a financing entity for ₹10 Crores and simultaneously enters into a contract to repurchase the exact same machinery 3 years later for ₹13.31 Crores (which reflects an effective interest rate of 10% per annum). The machinery remains physically situated at Everest Ltd.'s factory and its useful life is 15 years. How must Everest Ltd. account for this contract under the Conceptual Framework?",
    [
      "Record a sale and recognize a disposal gain/loss, followed by an operating lease.",
      "In accordance with substance over form, the transaction represents a secured borrowing of ₹10 Crores rather than a genuine sale; the machinery remains recognized on Everest's balance sheet and finance cost is recognized over 3 years.",
      "Recognize revenue of ₹10 Crores immediately and charge ₹13.31 Crores as an exceptional expense after 3 years.",
      "Record the machinery as off-balance sheet and classify the contract as an unexecuted derivative."
    ],
    1,
    "Conceptual Framework (Faithful Representation & Substance Over Form) & Ind AS 115",
    "Faithful representation requires accounting for transactions in accordance with their economic substance rather than merely their legal form. The repurchase obligation at a fixed price that compensates the counterparty with a financing return demonstrates that control never transferred. The transaction is economically a secured financing."
  ),

  makeQ(109, 1, "Conceptual Framework for Financial Reporting", "Qualitative Characteristics: Relevance vs Faithful Representation",
    "An entity is evaluating whether to recognize a pending patent infringement lawsuit against a competitor where legal experts believe there is a 40% probability of receiving ₹100 Crores, but outcomes could range from ₹0 to ₹250 Crores with extreme measurement uncertainty. How does the Conceptual Framework address the trade-off between relevance and faithful representation?",
    [
      "Relevance is the sole criterion; an item with any potential economic inflow must be recognized on the balance sheet at its maximum possible amount.",
      "Even if an asset or liability is relevant, if measurement uncertainty is exceptionally high, recognizing it might not provide a faithful representation; in such cases, disclosure in the notes may provide more useful information than recognition in the balance sheet.",
      "Measurement uncertainty prevents disclosure of the event entirely until a court judgment is finalized.",
      "Faithful representation requires that only items with 100% certainty can ever be recognized."
    ],
    1,
    "Conceptual Framework (Chapter 5 - Recognition Criteria & Measurement Uncertainty)",
    "Chapter 5 of the Conceptual Framework emphasizes that an asset or liability is recognized only if doing so provides both relevant information and a faithful representation. When measurement uncertainty is exceptionally high, a metric with large estimation dispersion may not faithfully represent the economic phenomenon, making informative note disclosure superior to balance sheet recognition."
  ),

  makeQ(110, 1, "Conceptual Framework for Financial Reporting", "Going Concern Assumption",
    "At the balance sheet date of 31st March 2024, management of SolarTech Ltd. intends to liquidate the company within the next 4 months due to withdrawal of essential government subsidies. How should the financial statements for the year ended 31st March 2024 be prepared?",
    [
      "On the going concern basis, because the company was solvent and fully operational throughout the FY 2023-24 reporting period.",
      "On an alternative liquidation (net realizable value) basis, with full disclosure of the fact that the entity is no longer a going concern, the basis of preparation, and the reason why the entity is not regarded as a going concern.",
      "Financial statements should not be prepared, and only an affidavit should be filed with the Registrar of Companies.",
      "Under the historical cost convention with a footnote stating that liquidation will occur."
    ],
    1,
    "Conceptual Framework (Chapter 3 - Financial Statements and the Reporting Entity: Going Concern Assumption) & Ind AS 1",
    "Financial statements are normally prepared on the assumption that the reporting entity is a going concern and will continue in operation for the foreseeable future. If management intends to liquidate the entity or cease trading, the going concern assumption is invalid, and the financial statements must be prepared on an alternative basis (such as liquidation/net realizable value basis)."
  ),

  makeQ(111, 1, "Conceptual Framework for Financial Reporting", "Executory Contracts",
    "Orion Ltd. enters into an irrevocable purchase order on 1st December 2023 to buy 10,000 metric tonnes of steel at ₹50,000/tonne for delivery on 31st May 2024. As of 31st March 2024, neither party has performed any part of the agreement, and the market spot price of steel is ₹51,000/tonne. How is this executory contract treated under the Conceptual Framework?",
    [
      "Orion Ltd. must recognize an asset of ₹51 Crores and a financial liability of ₹50 Crores on 31st March 2024.",
      "The contract is an executory contract where neither party has performed. Because rights and obligations are combined into a single net asset or net liability, and it is non-onerous, it is generally not recognized on the balance sheet until one party performs.",
      "Orion Ltd. must recognize a derivative gain of ₹1 Crore in Profit & Loss immediately.",
      "The contract is treated as a completed transaction and recorded in inventory at ₹50 Crores."
    ],
    1,
    "Conceptual Framework (Chapter 4 - Executory Contracts, Paragraphs 4.56-4.58)",
    "An executory contract is a contract that is equally unperformed: neither party has fulfilled any of its obligations, or both parties have partially fulfilled their obligations to an equal extent. Under the Conceptual Framework, an unperformed non-onerous executory contract is accounted for as a single net unit of account, and neither an asset nor a liability is recognized until one party performs."
  ),

  makeQ(112, 1, "Conceptual Framework for Financial Reporting", "OCI vs Profit or Loss Classification",
    "Which of the following principles correctly reflects the guidance in the Conceptual Framework regarding the presentation of income and expenses in Other Comprehensive Income (OCI)?",
    [
      "Management possesses unrestricted discretion to route any volatile operating expense through OCI to minimize P&L fluctuations.",
      "The statement of profit or loss is the primary source of information about an entity's financial performance. In exceptional circumstances, the Board may decide that income or expenses arising from changes in current values of assets or liabilities should be included in OCI if doing so provides more relevant information or a more faithful representation.",
      "All foreign exchange gains and losses must be routed through OCI regardless of the underlying transaction.",
      "Items once recognized in OCI can never, under any circumstance, be reclassified to profit or loss."
    ],
    1,
    "Conceptual Framework (Chapter 7 - Presentation and Disclosure: Profit or Loss and OCI)",
    "Paragraphs 7.15-7.19 state that the statement of profit or loss is the primary source of performance information. Only in exceptional circumstances can standard setters mandate OCI presentation for value changes of assets or liabilities, where doing so enhances relevance or faithful representation in a particular reporting period."
  ),

  makeQ(113, 1, "Conceptual Framework for Financial Reporting", "Materiality in Presentation",
    "An item of expenditure amounting to ₹1,50,000 was incurred by a conglomerate with annual turnover of ₹8,000 Crores. The expenditure violates statutory foreign exchange regulations, resulting in an inquiry by regulatory authorities. How should management assess the materiality of this item?",
    [
      "The item is strictly immaterial because ₹1,50,000 represents less than 0.0001% of turnover and cannot influence economic decisions.",
      "Information is material if omitting, misstating, or obscuring it could reasonably be expected to influence decisions of primary users; materiality has both quantitative and qualitative aspects, and an item involving statutory non-compliance and regulatory exposure is qualitatively material regardless of size.",
      "Materiality is determined solely by quantitative percentage thresholds (5% of net profit).",
      "Qualitative factors are excluded from Ind AS materiality assessments."
    ],
    1,
    "Conceptual Framework (Chapter 2 - Materiality) & Ind AS 1 Paragraph 7",
    "Materiality is an entity-specific aspect of relevance based on the nature or magnitude (or both) of the items to which the information relates. An item may be immaterial in absolute quantum, but qualitatively material because of its sensitive nature, legal non-compliance, or potential consequences on governance and regulatory standing."
  ),

  makeQ(114, 1, "Conceptual Framework for Financial Reporting", "Current Cost Measurement",
    "How does the Conceptual Framework define the 'Current Cost' measurement basis for an asset?",
    [
      "The amount of cash or cash equivalents that would have to be paid if the same or an equivalent asset was acquired currently, comprising the consideration that would be paid at the measurement date plus the transaction costs that would be incurred.",
      "The present value of the cash flows that the entity expects to derive from the continuing use of the asset.",
      "The price that would be received to sell an asset in an orderly transaction between market participants at the measurement date minus disposal costs.",
      "The original unadjusted transaction price recorded at initial historical inception."
    ],
    0,
    "Conceptual Framework (Chapter 6 - Measurement: Current Cost, Paragraph 6.21)",
    "Current cost reflects the cost of an equivalent asset at the measurement date, comprising the consideration that would be paid at the measurement date plus transaction costs that would be incurred at that date. Unlike historical cost, it reflects conditions at the measurement date; unlike fair value, it is an entry value rather than an exit value."
  ),

  makeQ(115, 1, "Conceptual Framework for Financial Reporting", "Recognition Gateways",
    "Under the Conceptual Framework, what are the two fundamental criteria that must be satisfied for an element to be recognized in the financial statements?",
    [
      "It must be verifiable by physical inspection and backed by a notarized agreement.",
      "The item must meet the definition of an element (asset, liability, equity, income, or expense), and recognition must provide useful financial information—specifically relevant information and a faithful representation.",
      "It must involve a cash inflow or outflow occurring within the current operating cycle.",
      "It must have received unanimous approval from the Audit Committee and statutory auditors."
    ],
    1,
    "Conceptual Framework (Chapter 5 - Recognition Process, Paragraph 5.6)",
    "Recognition is the process of capturing for inclusion in the statement of financial position or statement of financial performance an item that meets the definition of one of the elements of financial statements. It is recognized only if it meets the definition of an element and recognition provides useful financial information that is both relevant and faithfully represented."
  ),

  makeQ(116, 1, "Conceptual Framework for Financial Reporting", "Economic Resource: Rights that Produce Benefits",
    "Nexus Ltd. holds a quota license granted by the Government to import scarce raw materials. The license cannot be transferred or sold to any other entity. Nexus Ltd. plans to use the raw material in its production. Does this non-transferable license qualify as an economic resource under the Conceptual Framework?",
    [
      "No, because the license cannot be traded or sold on a standalone market, it has no exchange value.",
      "Yes, because an economic resource is a right that has the potential to produce economic benefits, which can arise from using the resource to produce goods or services, not merely from selling or transferring it.",
      "No, government licenses are always classified as equity contributions.",
      "Yes, but only if the license was acquired through a public competitive auction."
    ],
    1,
    "Conceptual Framework (Chapter 4 - Rights that have Potential to Produce Economic Benefits)",
    "Economic benefits can be produced in several ways: receiving contractual cash flows, exchanging resources, or using the resource either to produce goods or services or to enhance the value of other economic resources. A right does not need to be transferable or capable of being sold separately to be an economic resource."
  ),

  makeQ(117, 1, "Conceptual Framework for Financial Reporting", "Reporting Entity Perspective",
    "Under the Conceptual Framework, when an entity prepares consolidated financial statements, from whose perspective is financial information provided?",
    [
      "Exclusively from the perspective of the controlling parent company's legal board of directors.",
      "From the perspective of the parent and its subsidiaries viewed together as a single economic reporting entity, not from the perspective of any particular group of investors or claimants.",
      "From the perspective of tax authorities in the jurisdiction of the parent company.",
      "From the perspective of non-controlling interest shareholders only."
    ],
    1,
    "Conceptual Framework (Chapter 3 - Consolidated and Unconsolidated Financial Statements)",
    "Consolidated financial statements provide information about the assets, liabilities, equity, income, and expenses of both the parent and its subsidiaries as a single economic reporting entity. They do not present information from the perspective of any specific group of primary users, but for the economic entity as a whole."
  ),

  makeQ(118, 1, "Conceptual Framework for Financial Reporting", "Measurement: Historical Cost Conventions",
    "Which of the following statements is true regarding historical cost measurement under the Conceptual Framework?",
    [
      "Historical cost never changes over time and remains rigidly fixed at initial cash consideration forever.",
      "Historical cost is updated over time to depict consumption, depreciation/amortization, impairment, and fulfillment of liabilities, reflecting subsequent events but not changes in current market prices.",
      "Historical cost is completely prohibited for all non-monetary assets under Ind AS.",
      "Historical cost reflects the price at which the asset could be sold in the market on the balance sheet date."
    ],
    1,
    "Conceptual Framework (Chapter 6 - Historical Cost)",
    "The historical cost of an asset is updated over time to depict the consumption of part or all of the economic resource (depreciation or amortization), impairment, and the passage of time (accrual of interest). Similarly, historical cost of a liability is updated for fulfillment or changes in estimates. However, it does not reflect changes in market values."
  ),

  makeQ(119, 1, "Conceptual Framework for Financial Reporting", "Offsetting Criteria",
    "Alpha Ltd. has an accounts receivable of ₹10 Crores due from Beta Ltd. and an accounts payable of ₹8 Crores due to Beta Ltd. Under the Conceptual Framework and Ind AS 1, when is offsetting of these balances permitted on the balance sheet?",
    [
      "Whenever two balances exist with the exact same corporate counterparty.",
      "Only when the entity currently has a legally enforceable right to set off the recognized amounts AND intends either to settle on a net basis or to realize the asset and settle the liability simultaneously.",
      "Whenever offsetting improves the debt-to-equity ratio of the reporting entity.",
      "Offsetting is prohibited in all circumstances without exception under Indian Accounting Standards."
    ],
    1,
    "Conceptual Framework (Presentation and Disclosure) & Ind AS 1 Paragraph 32",
    "Ind AS 1 prohibits offsetting assets and liabilities, or income and expenses, unless required or permitted by an Ind AS. Measuring assets net of valuation allowances (such as allowance for doubtful debts or inventory write-downs) is not offsetting. Offsetting financial assets and liabilities requires both a currently legally enforceable right and intention to settle net."
  ),

  makeQ(120, 1, "Conceptual Framework for Financial Reporting", "Reclassification of Income/Expenses in OCI (Recycling)",
    "Under the Conceptual Framework, what principle governs whether an item accumulated in OCI should subsequently be reclassified ('recycled') to Profit or Loss?",
    [
      "All items in OCI must be recycled to Profit or Loss after exactly 3 financial years.",
      "In principle, items included in OCI are reclassified to P&L in a future period when doing so results in the statement of profit or loss providing more relevant information or a more faithful representation of the entity's performance for that period; if there is no clear basis for identifying that period, the item is not recycled.",
      "No item recognized in OCI is ever allowed to be recycled under Ind AS.",
      "Recycling is determined by the annual general meeting (AGM) vote of shareholders."
    ],
    1,
    "Conceptual Framework (Chapter 7 - Paragraph 7.19: Reclassification of Items of OCI)",
    "In principle, income and expenses included in OCI are reclassified to profit or loss when doing so results in the statement of profit or loss providing more relevant information or a more faithful representation of performance in that future period. When there is no clear basis for identifying that period, the standard mandates no subsequent reclassification (e.g., remeasurements of defined benefit plans or equity instruments at FVOCI)."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_1_conceptual_framework.json'), JSON.stringify(t1Qs, null, 2), 'utf8');
console.log('Saved Topic 1: 20 Questions');

// =========================================================================
// TOPIC 2: Ind AS for General and Specialised Entities (Ind AS 1, 2, 7, 8) (20 Questions)
// =========================================================================
const t2Qs = [
  makeQ(201, 2, "Ind AS for General and Specialised Entities", "Ind AS 1: Current vs Non-Current Refinancing",
    "Titan Heavy Industries Ltd. had a long-term borrowing of ₹100 Crores due for repayment on 31st December 2023. On 15th January 2024 (prior to the approval of financial statements for the year ended 31st March 2024), the company finalized an agreement with the lending bank to refinance the loan for an additional period of 5 years. As of 31st March 2024, how should the loan be classified in the balance sheet?",
    [
      "Non-Current Liability, because refinancing was executed before the financial statements were approved by the Board of Directors.",
      "Current Liability, because as of the reporting date (31st March 2024), the loan was already overdue since December 2023 and the refinancing was not executed on or before the end of the reporting period.",
      "Equity, because long-term bank borrowings are part of permanent capital under Ind AS 1.",
      "Disclosed strictly as a contingent liability in the notes without balance sheet presentation."
    ],
    1,
    "Ind AS 1 (Presentation of Financial Statements) - Paragraphs 69-73: Refinancing Post Balance Sheet Date",
    "Under Ind AS 1 Paragraph 73, an entity classifies its liabilities as non-current only if it has an unconditional right to defer settlement for at least 12 months after the reporting period at the end of the reporting period. If refinancing occurs between the end of the reporting period and the date of approval of financial statements, it is an event after the reporting period under Ind AS 10 that requires disclosure, but does not alter the Current Liability classification on the balance sheet."
  ),

  makeQ(202, 2, "Ind AS for General and Specialised Entities", "Ind AS 1: Breach of Loan Covenants & Grace Period",
    "Bharat Petrochemicals Ltd. breached a financial leverage covenant on a ₹200 Crores bank loan on 31st December 2023. As a consequence, the loan became payable on demand. On 15th March 2024 (before the year-end of 31st March 2024), the lender agreed to provide a grace period ending on 30th June 2025 during which it cannot demand immediate repayment. How should the liability be classified on 31st March 2024?",
    [
      "Current Liability, because a breach occurred during the financial year.",
      "Non-Current Liability, because the lender agreed on or before the end of the reporting period to provide a period of grace of at least 12 months after the reporting period, during which the lender cannot demand immediate repayment.",
      "Contingent Liability of ₹200 Crores.",
      "Bifurcated 50% Current and 50% Non-Current."
    ],
    1,
    "Ind AS 1 - Paragraph 74: Rectification of Covenant Breach Before Reporting Date",
    "Under Ind AS 1 Paragraph 74, when an entity breaches a provision of a long-term loan agreement on or before the end of the reporting period with the effect that the liability becomes payable on demand, it is classified as non-current if the lender agreed on or before the end of the reporting period to provide a period of grace of at least twelve months after the reporting period, within which the entity can rectify the breach and the lender cannot demand immediate repayment."
  ),

  makeQ(203, 2, "Ind AS for General and Specialised Entities", "Ind AS 2: Valuation of By-Products & Joint Products",
    "Kaveri Chemicals Ltd. manufactures a primary chemical 'Alpha' and generates a by-product 'Beta' during the synthesis process. During FY 2023-24, total joint manufacturing costs amounted to ₹50,00,000. 10,000 litres of Alpha (market value ₹800/litre) and 1,000 kg of Beta (market value ₹50/kg, with further processing costs of ₹10/kg) were produced. Under Ind AS 2, how should the by-product Beta be accounted for?",
    [
      "Allocate joint costs between Alpha and Beta strictly based on relative sales value at split-off point.",
      "Measure by-product Beta at net realizable value (₹40,000 = ₹50,000 - ₹10,000) and deduct this amount from the total joint production costs of primary product Alpha.",
      "Recognize Beta at zero value and credit its full sale proceeds to Other Operating Income when sold.",
      "Value Beta at its historical manufacturing cost based on weight."
    ],
    1,
    "Ind AS 2 (Inventories) - Paragraph 14: By-Products Accounting",
    "Ind AS 2 Paragraph 14 states that most by-products, by their nature, are immaterial. When this is the case, they are often measured at net realizable value and this value is deducted from the cost of the main product. As a result, the carrying amount of the main product is not materially different from its cost."
  ),

  makeQ(204, 2, "Ind AS for General and Specialised Entities", "Ind AS 2: Net Realizable Value with Firm Sales Commitments",
    "Apex Commodities Ltd. holds 50,000 kg of specialty resin. Historical cost is ₹120 per kg. As of 31st March 2024, general market spot selling price has plummeted to ₹90 per kg with selling expenses of ₹5 per kg. However, Apex Commodities Ltd. holds a firm, non-cancellable sales contract for 30,000 kg with an approved credit customer at ₹140 per kg. At what carrying amount should the inventory be presented on 31st March 2024?",
    [
      "50,000 kg at ₹85/kg = ₹42,50,000 based on general spot market net realizable value.",
      "30,000 kg at cost ₹120/kg (as contract price ₹140 exceeds cost) + 20,000 kg at NRV ₹85/kg (₹90 - ₹5) = ₹36,00,000 + ₹17,00,000 = ₹53,00,000.",
      "50,000 kg at historical cost ₹120/kg = ₹60,00,000.",
      "50,000 kg at contract price ₹140/kg = ₹70,00,000."
    ],
    1,
    "Ind AS 2 - Paragraph 31: NRV for Quantities Held to Satisfy Firm Sales Contracts",
    "Under Ind AS 2 Paragraph 31, the net realizable value of the quantity of inventory held to satisfy firm sales contracts is based on the contract price. If the sales contract is for less than the inventory quantity held, the net realizable value of the excess quantity is based on general market prices. Thus, 30,000 kg is valued at lower of cost (₹120) and contract NRV (₹140) = ₹120 (₹36L); remaining 20,000 kg is valued at NRV of ₹85 (₹17L). Total = ₹53,00,000."
  ),

  makeQ(205, 2, "Ind AS for General and Specialised Entities", "Ind AS 2: Fixed Production Overhead Allocation",
    "Precision Castings Ltd. incurs fixed production overheads of ₹60,00,000 annually. The normal operating capacity of the plant is 1,00,000 units. In FY 2023-24, due to a general economic slowdown, actual production was only 60,000 units. Under Ind AS 2, how should fixed overheads be allocated to inventory?",
    [
      "Allocate fixed overheads at ₹100 per unit (₹60,00,000 / 60,000 units) so that all actual overheads are capitalized into inventory.",
      "Allocate fixed overheads at the normal capacity rate of ₹60 per unit (₹60,00,000 / 1,00,000 units), capitalising ₹36,00,000 into inventory and expensing the unallocated ₹24,00,000 directly to Profit or Loss as an idle capacity loss.",
      "Capitalize all unallocated overheads into Property, Plant and Equipment.",
      "Defer the unallocated overheads to be absorbed in future years when production recovers."
    ],
    1,
    "Ind AS 2 - Paragraph 13: Allocation of Fixed Production Overheads Based on Normal Capacity",
    "Under Ind AS 2 Paragraph 13, the allocation of fixed production overheads to the costs of conversion is based on the normal capacity of the production facilities. The amount of fixed overhead allocated to each unit of production is not increased as a consequence of low production. Unallocated overheads are recognized as an expense in profit or loss in the period in which they are incurred."
  ),

  makeQ(206, 2, "Ind AS for General and Specialised Entities", "Ind AS 7: Cash Equivalents & Bank Overdrafts",
    "Ganga Infrastructure Ltd. holds the following items on 31st March 2024: (i) 3-month Treasury Bills maturing in 20 days; (ii) Equity shares in a listed blue-chip firm; (iii) Bank overdraft repayable on demand which fluctuates from positive balance to overdrawn balance as an integral part of cash management. Under Ind AS 7, which components form part of 'Cash and Cash Equivalents'?",
    [
      "Only the 3-month Treasury Bills.",
      "The 3-month Treasury Bills and the Bank Overdraft (as a negative deduction), while the listed equity shares are excluded because they are subject to significant risk of changes in value.",
      "All three items including the listed equity shares.",
      "None of the items qualify as cash and cash equivalents."
    ],
    1,
    "Ind AS 7 (Statement of Cash Flows) - Paragraphs 7-9: Bank Overdrafts & Cash Equivalents",
    "Ind AS 7 defines cash equivalents as short-term, highly liquid investments readily convertible to known amounts of cash and subject to an insignificant risk of changes in value. Equity investments are excluded unless they are in substance cash equivalents (e.g. redeemable preferred shares with short maturity). Bank overdrafts repayable on demand that fluctuate from positive to negative as an integral part of cash management are included as a component of cash and cash equivalents."
  ),

  makeQ(207, 2, "Ind AS for General and Specialised Entities", "Ind AS 7: Non-Cash Investing Transactions",
    "During the financial year, Zenith Ltd. acquired a commercial building valued at ₹25 Crores by issuing 25,00,000 equity shares of ₹10 each at a premium of ₹90 per share. How should this transaction be reported in the Statement of Cash Flows under Ind AS 7?",
    [
      "Report ₹25 Crores as cash outflow under Investing Activities and ₹25 Crores as cash inflow under Financing Activities.",
      "Exclude the transaction entirely from the body of the Statement of Cash Flows, and disclose it in the notes to financial statements as a major non-cash investing and financing transaction.",
      "Report ₹25 Crores under Operating Activities.",
      "Disclose only the face value of shares issued (₹2.5 Crores) in Financing Activities."
    ],
    1,
    "Ind AS 7 - Paragraphs 43-44: Non-Cash Transactions Exclusion",
    "Ind AS 7 Paragraph 43 states that investing and financing transactions that do not require the use of cash or cash equivalents shall be excluded from the statement of cash flows. Such transactions shall be disclosed elsewhere in the financial statements in a way that provides all the relevant information about these investing and financing activities."
  ),

  makeQ(208, 2, "Ind AS for General and Specialised Entities", "Ind AS 8: Change in Accounting Policy vs Estimate",
    "In FY 2023-24, Delta Ltd. changed its method of depreciating heavy transport fleet from the Straight-Line Method (SLM) to the Written Down Value (WDV) method, reflecting a change in the expected pattern of consumption of future economic benefits. How must this change be accounted for under Ind AS 8 and Ind AS 16?",
    [
      "As a change in accounting policy, requiring full retrospective restatement of prior period financial statements and opening retained earnings adjustment.",
      "As a change in an accounting estimate, accounted for prospectively in profit or loss in the current and future periods, with no adjustment to opening retained earnings or prior periods.",
      "As a prior period error, requiring restatement under Ind AS 8.",
      "By recognizing the cumulative catch-up impact directly in Other Comprehensive Income (OCI)."
    ],
    1,
    "Ind AS 8 & Ind AS 16 Paragraph 61: Change in Depreciation Method is a Change in Estimate",
    "Under Ind AS 16 Paragraph 61 and Ind AS 8, a change in depreciation method is treated as a change in an accounting estimate because it reflects a change in the expected pattern of consumption of the future economic benefits embodied in the asset. Changes in accounting estimates are accounted for prospectively, not retrospectively."
  ),

  makeQ(209, 2, "Ind AS for General and Specialised Entities", "Ind AS 8: Correction of Prior Period Errors",
    "During FY 2023-24, the internal audit team of Sigma Ltd. discovered that inventory valued at ₹15 Crores was inadvertently double-counted on 31st March 2022 (two years prior), resulting in an overstatement of profit for FY 2021-22. Under Ind AS 8, how must this error be rectified?",
    [
      "Expense ₹15 Crores as an exceptional operating item in the Statement of Profit and Loss for FY 2023-24.",
      "Retrospectively correct the material prior period error by restating the comparative amounts for the prior period (FY 2021-22 and FY 2022-23) and adjusting the opening balance of retained earnings in the earliest comparative period presented.",
      "Adjust the error prospectively over the remaining useful life of the company's operating assets.",
      "Credit Other Comprehensive Income with ₹15 Crores in FY 2023-24."
    ],
    1,
    "Ind AS 8 (Accounting Policies, Changes in Accounting Estimates and Errors) - Paragraphs 41-49",
    "Ind AS 8 mandates that material prior period errors must be corrected retrospectively in the first set of financial statements approved for issue after their discovery by restating the comparative amounts for the prior period(s) presented in which the error occurred, or if the error occurred before the earliest prior period presented, by restating the opening balances of assets, liabilities, and equity for the earliest prior period presented."
  ),

  makeQ(210, 2, "Ind AS for General and Specialised Entities", "Ind AS 1: Frequency of Reporting & Operating Cycle",
    "A commercial aircraft manufacturer enters into contracts where the period between the procurement of titanium materials and the delivery of the completed wide-body aircraft averages 42 months. When presenting working capital on the balance sheet, what is the operating cycle and how are inventories of aircraft-in-progress classified under Ind AS 1?",
    [
      "The operating cycle is fixed at 12 months by law; work-in-progress beyond 12 months must be classified as Non-Current Assets.",
      "The operating cycle is 42 months; inventories and trade receivables that will be realized within this 42-month operating cycle are classified as Current Assets even when they are not expected to be realized within 12 months after the reporting period.",
      "The entire enterprise must be classified as an investment entity.",
      "All work-in-progress must be classified as Financial Instruments at Fair Value."
    ],
    1,
    "Ind AS 1 - Paragraphs 66 & 68: Current Assets and Normal Operating Cycle",
    "Ind AS 1 Paragraph 66 specifies that an asset is classified as current when it is expected to be realized or consumed in the entity's normal operating cycle. When the entity's normal operating cycle is not clearly identifiable, it is assumed to be 12 months. Where it is clearly identifiable and exceeds 12 months (e.g. 42 months in shipbuilding or aerospace), inventories and receivables realized within that cycle are classified as current."
  ),

  makeQ(211, 2, "Ind AS for General and Specialised Entities", "Ind AS 1: Third Balance Sheet Requirement",
    "When an entity applies an accounting policy retrospectively, makes a retrospective restatement of items, or reclassifies items in its financial statements that has a material effect on information in the balance sheet at the beginning of the preceding period, what additional statement is mandatory under Ind AS 1?",
    [
      "An additional Cash Flow Statement covering the last 5 years.",
      "A third Balance Sheet (Statement of Financial Position) as at the beginning of the preceding period (the opening balance sheet of the earliest comparative period).",
      "A complete audit report from the National Financial Reporting Authority (NFRA).",
      "An actuarial valuation certificate for all current assets."
    ],
    1,
    "Ind AS 1 - Paragraph 10(f) & Paragraph 40A: Requirement for Third Balance Sheet",
    "Under Ind AS 1 Paragraph 40A, an entity shall present a third balance sheet as at the beginning of the preceding period if: (a) it applies an accounting policy retrospectively, makes a retrospective restatement, or reclassifies items; and (b) the retrospective application has a material effect on the information in the balance sheet at the beginning of the preceding period."
  ),

  makeQ(212, 2, "Ind AS for General and Specialised Entities", "Ind AS 2: Cost Formulas for Non-Interchangeable Items",
    "Custom Jewels Ltd. manufactures bespoke, custom-designed diamond necklaces where each piece is unique and commissioned by individual clients. The CFO proposes using the Weighted Average Cost formula under Ind AS 2 to value the year-end inventory of finished custom pieces. Is this permissible?",
    [
      "Yes, Weighted Average is always permissible for any class of inventory under Ind AS 2.",
      "No, Ind AS 2 explicitly mandates that the cost of inventories of items that are not ordinarily interchangeable, as well as goods or services produced and segregated for specific projects, must be assigned by using specific identification of their individual costs.",
      "No, LIFO (Last-In, First-Out) must be applied for custom luxury goods.",
      "Yes, provided FIFO is used for tax purposes."
    ],
    1,
    "Ind AS 2 - Paragraph 23: Specific Identification Method",
    "Ind AS 2 Paragraph 23 states that the cost of inventories of items that are not ordinarily interchangeable and goods or services produced and segregated for specific projects shall be assigned by using specific identification of their individual costs. FIFO or weighted average can only be used for inventories consisting of large numbers of interchangeable items."
  ),

  makeQ(213, 2, "Ind AS for General and Specialised Entities", "Ind AS 7: Direct vs Indirect Method of Cash Flows",
    "Which of the following statements correctly states the requirements and recommendations of Ind AS 7 regarding the method of reporting cash flows from operating activities?",
    [
      "Entities are strictly prohibited from using the direct method.",
      "Entities may report cash flows from operating activities using either the direct method or the indirect method; however, Ind AS 7 explicitly encourages entities to report operating cash flows using the direct method.",
      "Listed entities must use the indirect method, while unlisted entities must use the direct method.",
      "The direct method is mandatory for banking companies only."
    ],
    1,
    "Ind AS 7 - Paragraph 19: Direct Method Encouraged",
    "Ind AS 7 Paragraph 19 states that entities are encouraged to report cash flows from operating activities using the direct method because the direct method provides information which may be useful in estimating future cash flows and which is not available under the indirect method."
  ),

  makeQ(214, 2, "Ind AS for General and Specialised Entities", "Ind AS 7: Cash Flows from Interest & Dividends",
    "Under Ind AS 7, for an entity other than a financial institution, how should interest paid and dividends paid be classified in the Statement of Cash Flows?",
    [
      "Interest paid and dividends paid must both be classified exclusively as Operating Activities.",
      "Dividends paid should be classified as Financing Activities because they are a cost of obtaining financial resources; interest paid may be classified as Financing Cash Flows (cost of finance) or Operating Cash Flows (to assist users in assessing entity's ability to pay dividends out of operating flows), applied consistently.",
      "Interest paid must be classified as Investing Activities.",
      "Both items must be omitted from the Cash Flow Statement."
    ],
    1,
    "Ind AS 7 - Paragraphs 31-34: Reporting Interest and Dividends",
    "Under Ind AS 7, for non-financial entities, interest paid is commonly classified as financing cash flows because it represents a cost of obtaining financial resources, or as operating cash flows. Dividends paid are classified as financing cash flows because they are a cost of obtaining financial resources."
  ),

  makeQ(215, 2, "Ind AS for General and Specialised Entities", "Ind AS 8: Impracticability of Retrospective Application",
    "When it is impracticable for an entity to determine the cumulative effect of applying a new accounting policy to all prior periods, how should the entity apply the new policy under Ind AS 8?",
    [
      "The entity should revert to its previous accounting policy indefinitely.",
      "The entity shall apply the new policy prospectively from the start of the earliest period for which retrospective application is practicable (which may be the current period).",
      "The entity must seek permission from the Ministry of Corporate Affairs before publishing results.",
      "The entity must recognize a balancing figure in the Securities Premium Account."
    ],
    1,
    "Ind AS 8 - Paragraphs 24-27: Limitations on Retrospective Application",
    "When it is impracticable to determine the cumulative effect at the beginning of the current period of applying a new accounting policy to all prior periods, the entity adjusts the comparative information to apply the new policy prospectively from the earliest date practicable."
  ),

  makeQ(216, 2, "Ind AS for General and Specialised Entities", "Ind AS 1: Offsetting in Statement of Profit and Loss",
    "Sunrise Power Ltd. incurred an insurance claim expenditure of ₹4 Crores repairing turbine damages and received a corresponding insurance reimbursement of ₹3.8 Crores from United India Insurance Co. Under Ind AS 1, can Sunrise Power present the net expense of ₹0.2 Crores in its Statement of Profit and Loss?",
    [
      "No, Ind AS 1 strictly mandates gross presentation of all income and expenses without exception.",
      "Yes, gains and losses arising from a group of similar transactions (or reimbursements where permitted by another Ind AS such as Ind AS 37) may be reported on a net basis, provided the presentation reflects the substance of the transaction and is not material to obscure analysis.",
      "Yes, but only if the insurance company is an associate company.",
      "No, insurance claims must be credited directly to Retained Earnings."
    ],
    1,
    "Ind AS 1 - Paragraphs 33-35 & Ind AS 37 Paragraph 54",
    "Ind AS 1 Paragraph 34 permits reporting on a net basis when an Ind AS requires or permits it. Under Ind AS 37 Paragraph 54, the expense relating to a provision may be presented net of the amount recognized for a reimbursement in the statement of profit and loss."
  ),

  makeQ(217, 2, "Ind AS for General and Specialised Entities", "Ind AS 2: Trade Discounts vs Cash Discounts in Inventory Cost",
    "Pinnacle Retail Ltd. purchases 1,000 laptops at a list price of ₹50,000 each. The supplier grants a 10% trade discount on the invoice. Additionally, the invoice terms offer a 2% settlement discount if paid within 10 days. Pinnacle Retail pays on day 5 and avails the 2% discount. What is the unit cost of each laptop to be included in inventory under Ind AS 2?",
    [
      "₹50,000 (list price).",
      "₹45,000 (list price ₹50,000 minus 10% trade discount ₹5,000); the ₹900 cash discount is treated as finance income or deducted based on entity policy under Ind AS principles.",
      "₹44,100 (list price minus trade discount minus settlement discount deducted from purchase cost).",
      "₹40,000."
    ],
    2,
    "Ind AS 2 - Paragraph 11: Costs of Purchase & Trade Discounts/Rebates",
    "Ind AS 2 Paragraph 11 states that trade discounts, rebates and other similar items are deducted in determining the costs of purchase. Under Ind AS, trade discounts, rebates and settlement discounts that are in substance price reductions are deducted in determining the cost of inventories."
  ),

  makeQ(218, 2, "Ind AS for General and Specialised Entities", "Ind AS 7: Foreign Currency Cash Flows",
    "An Indian entity with INR functional currency holds a USD bank account. During the year, no withdrawals were made, but due to USD appreciation against INR, the closing rupee equivalent of the USD balance increased by ₹5,00,000. How should this unrealized exchange gain be reported in the Statement of Cash Flows under Ind AS 7?",
    [
      "As an Operating Cash Inflow of ₹5,00,000.",
      "As an Investing Cash Inflow of ₹5,00,000.",
      "Reported as a reconciling line item at the bottom of the statement ('Effect of exchange rate changes on cash and cash equivalents held in foreign currency') to reconcile cash and cash equivalents at the beginning and end of the period, not as an operating, investing, or financing cash flow.",
      "Omitted completely because it is unrealized."
    ],
    2,
    "Ind AS 7 - Paragraph 28: Effect of Exchange Rate Changes on Cash Equivalents",
    "Unrealized gains and losses arising from changes in foreign currency exchange rates are not cash flows. However, the effect of exchange rate changes on cash and cash equivalents held or due in a foreign currency is reported in the statement of cash flows in order to reconcile cash and cash equivalents at the beginning and the end of the period, presented separately from operating, investing, and financing cash flows."
  ),

  makeQ(219, 2, "Ind AS for General and Specialised Entities", "Ind AS 1: Material Uncertainties Relating to Going Concern",
    "Management of JetWings Ltd. concludes that although the company remains a going concern, there are significant material uncertainties regarding debt covenant renegotiations that cast significant doubt upon the entity's ability to continue as a going concern. Under Ind AS 1, what is the mandatory financial reporting treatment?",
    [
      "Switch immediately to the liquidation basis of accounting.",
      "Prepare financial statements on a going concern basis, but explicitly and prominently disclose the material uncertainties and the events or conditions casting significant doubt in the notes.",
      "Withhold financial statements until all debts are fully restructured.",
      "Classify all assets as assets held for sale."
    ],
    1,
    "Ind AS 1 - Paragraph 25: Disclosure of Material Uncertainties Regarding Going Concern",
    "Under Ind AS 1 Paragraph 25, when management is aware of material uncertainties related to events or conditions that may cast significant doubt upon the entity's ability to continue as a going concern, the entity shall disclose those uncertainties, even while continuing to prepare the financial statements on a going concern basis."
  ),

  makeQ(220, 2, "Ind AS for General and Specialised Entities", "Ind AS 2: Reversal of Inventory Write-Down",
    "In FY 2022-23, Zenith Steel wrote down its iron ore inventory from cost of ₹80 Crores to net realizable value of ₹60 Crores (recognizing ₹20 Crores write-down in P&L). In FY 2023-24, global commodity prices surged, and the NRV of the exact same unsold iron ore reached ₹95 Crores. Under Ind AS 2, how much reversal of write-down can be recognized in FY 2023-24?",
    [
      "₹35 Crores (from ₹60 Crores to ₹95 Crores) recognized as a gain in P&L.",
      "Reversal is strictly capped at the original write-down amount of ₹20 Crores, increasing inventory carrying amount back to historical cost of ₹80 Crores, recognized as a reduction in raw material consumption in P&L.",
      "No reversal is permitted once an inventory write-down is recognized.",
      "₹15 Crores credited to Revaluation Reserve."
    ],
    1,
    "Ind AS 2 - Paragraphs 33-34: Limitation on Reversal of Inventory Write-Down",
    "Under Ind AS 2 Paragraph 33, when the circumstances that previously caused inventories to be written down below cost no longer exist, the amount of the write-down is reversed so that the new carrying amount is the lower of the cost and the revised net realizable value. The reversal is limited to the amount of the original write-down (inventory cannot be carried above original cost)."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_2_general_presentation_inventories.json'), JSON.stringify(t2Qs, null, 2), 'utf8');
console.log('Saved Topic 2: 20 Questions');

// =========================================================================
// TOPIC 3: Property, Plant and Equipment, Intangible Assets, and Impairment (Ind AS 16, 38, 36) (20 Questions)
// =========================================================================
const t3Qs = [
  makeQ(301, 3, "PPE, Intangibles, and Impairment", "Ind AS 16: Decommissioning Provision & Initial Cost",
    "Adani Green Energy Ltd. constructs an offshore wind turbine on 1st April 2023 for ₹50 Crores. Under the 20-year seabed lease, the company has a statutory obligation to dismantle the turbine and restore the seabed at the end of year 20. The estimated dismantling cost in 20 years is ₹10 Crores. The risk-adjusted risk-free discount rate is 8% per annum (Present Value Factor for year 20 at 8% = 0.21455). How should the initial carrying amount of the wind turbine be measured on 1st April 2023 under Ind AS 16?",
    [
      "₹50 Crores; dismantling costs are expensed as incurred at the end of 20 years.",
      "₹60 Crores; adding the full undiscounted dismantling cost of ₹10 Crores to construction cost.",
      "₹52.1455 Crores (₹50 Crores construction cost + ₹2.1455 Crores present value of decommissioning obligation capitalized as part of PPE).",
      "₹47.8545 Crores (construction cost minus present value of restoration)."
    ],
    2,
    "Ind AS 16 (Property, Plant and Equipment) - Paragraph 16(c) & Ind AS 37",
    "Under Ind AS 16 Paragraph 16(c), the initial cost of an item of PPE includes the initial estimate of the costs of dismantling and removing the item and restoring the site on which it is located. The present value of ₹10 Crores at 8% over 20 years is ₹10 Crores × 0.21455 = ₹2.1455 Crores. Initial PPE = ₹50 + ₹2.1455 = ₹52.1455 Crores."
  ),

  makeQ(302, 3, "PPE, Intangibles, and Impairment", "Ind AS 16: Component Accounting & Major Inspection Costs",
    "Airways Express Ltd. operates a passenger jet aircraft with a total cost of ₹300 Crores and an estimated useful life of 20 years. The aircraft engine (cost ₹80 Crores) requires a complete overhaul/replacement every 5 years, while a mandatory fuselage airworthiness safety inspection costing ₹15 Crores must be conducted every 3 years. Under Ind AS 16, how must depreciation and major inspection costs be accounted for?",
    [
      "Depreciate the entire ₹300 Crores as a single composite asset over 20 years using the straight-line method.",
      "Each part of an item of PPE with a cost that is significant in relation to the total cost must be depreciated separately (component accounting); the airframe over 20 years, the engine over 5 years, and the major inspection over 3 years.",
      "Charge the major inspection cost of ₹15 Crores directly to maintenance expense in year 1.",
      "Amortize the engine over the life of the fuselage (20 years)."
    ],
    1,
    "Ind AS 16 - Paragraphs 43-47: Component Depreciation & Inspection Replacement",
    "Ind AS 16 Paragraph 43 mandates that each part of an item of property, plant, and equipment with a cost that is significant in relation to the total cost of the item shall be depreciated separately. Furthermore, when a major inspection is performed, its cost is recognized in the carrying amount of the item of PPE as a replacement if the recognition criteria are satisfied, and any remaining carrying amount of the cost of the previous inspection is derecognized."
  ),

  makeQ(303, 3, "PPE, Intangibles, and Impairment", "Ind AS 16: Revaluation Model & Subsequent Depreciation",
    "On 1st April 2021, Royal Towers Ltd. acquired an office building for ₹100 Crores with a useful life of 50 years (residual value nil). On 1st April 2023, the building was revalued to ₹120 Crores. Management elects to use the revaluation model under Ind AS 16. What is the annual depreciation for FY 2023-24 following revaluation?",
    [
      "₹2.00 Crores based on original historical cost (₹100 Crores / 50 years).",
      "₹2.50 Crores (revalued amount of ₹120 Crores divided by the remaining useful life of 48 years).",
      "₹2.40 Crores (₹120 Crores / 50 years).",
      "₹0, because revalued assets are not depreciated."
    ],
    1,
    "Ind AS 16 - Paragraphs 31-42: Revaluation Model & Prospective Depreciation",
    "Original cost = ₹100 Cr, depreciation for 2 years (FY 21-22 & FY 22-23) = ₹2 Cr × 2 = ₹4 Cr. Carrying amount prior to revaluation on 1st April 2023 = ₹96 Cr. Revalued to ₹120 Cr (Revaluation surplus of ₹24 Cr credited to OCI). Remaining useful life = 50 - 2 = 48 years. Subsequent annual depreciation = ₹120 Cr / 48 years = ₹2.50 Crores per annum."
  ),

  makeQ(304, 3, "PPE, Intangibles, and Impairment", "Ind AS 38: Research vs Development Phase Criteria",
    "Biovita Ltd. spent ₹12 Crores between April and September 2023 conducting laboratory trials to identify alternative formulations for a new vaccine (Phase 1). On 1st October 2023, technical feasibility was established, commercial production was approved, resources were secured, and future economic benefits were demonstrated under Ind AS 38 criteria. Between October 2023 and March 2024, the company spent ₹18 Crores developing prototypes and conducting final human trials (Phase 2). How should the ₹30 Crores total expenditure be accounted for?",
    [
      "Capitalize all ₹30 Crores as an Intangible Asset under development.",
      "Expense ₹12 Crores (Research Phase) to Statement of Profit and Loss; capitalize ₹18 Crores (Development Phase) as an Intangible Asset under development.",
      "Expense all ₹30 Crores immediately in accordance with conservatism.",
      "Capitalize ₹12 Crores in PPE and expense ₹18 Crores in P&L."
    ],
    1,
    "Ind AS 38 (Intangible Assets) - Paragraphs 54-60: Research vs Development Phase",
    "Ind AS 38 Paragraph 54 states that no intangible asset arising from research (or from the research phase of an internal project) shall be recognized. Expenditure on research shall be recognized as an expense when it is incurred. Under Paragraph 57, an intangible asset arising from development shall be recognized if, and only if, the entity can demonstrate all 6 strict criteria (technical feasibility, intention to complete, ability to use/sell, future economic benefits, availability of resources, and ability to measure expenditure reliably)."
  ),

  makeQ(305, 3, "PPE, Intangibles, and Impairment", "Ind AS 38: Internally Generated Intangibles Prohibition",
    "A prestigious publishing conglomerate spends ₹25 Crores on advertising, branding, and customer engagement to establish a world-class masthead, brand title, and customer publishing list. The marketing director seeks to capitalize this ₹25 Crores as an Intangible Brand Asset. Is this permissible under Ind AS 38?",
    [
      "Yes, provided an independent valuation agency values the brand at greater than ₹25 Crores.",
      "No, Ind AS 38 explicitly prohibits the recognition of internally generated brands, mastheads, publishing titles, customer lists, and items similar in substance as intangible assets.",
      "Yes, if the brand is registered with the Controller General of Patents, Designs and Trade Marks.",
      "Permissible only under the revaluation model."
    ],
    1,
    "Ind AS 38 - Paragraph 63: Internally Generated Brands Prohibition",
    "Ind AS 38 Paragraph 63 explicitly states: 'Internally generated brands, mastheads, publishing titles, customer lists and items similar in substance shall not be recognized as intangible assets.' This is because expenditure on internally generated brands cannot be distinguished from the cost of developing the business as a whole."
  ),

  makeQ(306, 3, "PPE, Intangibles, and Impairment", "Ind AS 36: Recoverable Amount & Value in Use",
    "GVK Power Ltd. evaluates a thermal power plant for impairment. The carrying amount of the plant is ₹250 Crores. The plant's fair value less costs of disposal is estimated at ₹220 Crores. The value in use, calculated as the present value of estimated future operating cash flows over its remaining life, is ₹235 Crores. What is the impairment loss to be recognized under Ind AS 36?",
    [
      "₹30 Crores (carrying amount ₹250 Cr minus fair value less costs of disposal ₹220 Cr).",
      "₹15 Crores (carrying amount ₹250 Cr minus recoverable amount of ₹235 Cr, which is higher of fair value less costs of disposal ₹220 Cr and value in use ₹235 Cr).",
      "No impairment loss, because both values exceed ₹200 Crores.",
      "₹15 Crores recognized in OCI."
    ],
    1,
    "Ind AS 36 (Impairment of Assets) - Paragraphs 18 & 59: Recoverable Amount Definition",
    "Recoverable amount is the higher of an asset's fair value less costs of disposal and its value in use. Here, Recoverable Amount = Higher of (₹220 Cr and ₹235 Cr) = ₹235 Crores. Impairment loss = Carrying amount (₹250 Cr) - Recoverable amount (₹235 Cr) = ₹15 Crores recognized immediately in profit or loss."
  ),

  makeQ(307, 3, "PPE, Intangibles, and Impairment", "Ind AS 36: Allocation of Impairment Loss to CGU & Goodwill",
    "Cash Generating Unit (CGU) 'Alpha' has the following carrying amounts: Goodwill = ₹20 Crores; Building = ₹50 Crores; Plant & Machinery = ₹30 Crores (Total Carrying Amount = ₹100 Crores). An impairment test indicates that the recoverable amount of CGU Alpha is ₹70 Crores (total impairment loss = ₹30 Crores). How must the ₹30 Crores impairment loss be allocated under Ind AS 36?",
    [
      "Pro-rata across Goodwill (₹6 Cr), Building (₹15 Cr), and Plant (₹9 Cr).",
      "First reduce Goodwill in full by ₹20 Crores (reducing it to Nil); allocate the remaining ₹10 Crores pro-rata to Building (₹50/80 × ₹10 Cr = ₹6.25 Cr) and Plant & Machinery (₹30/80 × ₹10 Cr = ₹3.75 Cr).",
      "Allocate entire ₹30 Crores to Building.",
      "Impairment loss cannot exceed the value of Goodwill."
    ],
    1,
    "Ind AS 36 - Paragraph 104: Order of Impairment Loss Allocation in a CGU",
    "Under Ind AS 36 Paragraph 104, an impairment loss recognized for a CGU shall be allocated to reduce the carrying amount of the assets of the unit in the following order: (a) first, to reduce the carrying amount of any goodwill allocated to the CGU; and (b) then, to the other assets of the unit pro rata on the basis of the carrying amount of each asset in the unit. Goodwill is reduced to nil (₹20 Cr), and the remaining ₹10 Cr is split 50:30 between Building (₹6.25 Cr) and Plant (₹3.75 Cr)."
  ),

  makeQ(308, 3, "PPE, Intangibles, and Impairment", "Ind AS 36: Reversal of Goodwill Impairment Prohibition",
    "In FY 2021-22, MegaCorp Ltd. recognized an impairment loss of ₹40 Crores against goodwill allocated to its retail operations CGU due to severe economic disruptions. In FY 2023-24, retail demand rebounded strongly and the recoverable amount of the CGU surged well beyond its original acquisition value. Can the ₹40 Crores goodwill impairment loss be reversed under Ind AS 36?",
    [
      "Yes, full reversal of ₹40 Crores is credited to Profit or Loss.",
      "Yes, reversal is credited to Other Comprehensive Income (OCI).",
      "No, Ind AS 36 Paragraph 124 explicitly prohibits the reversal of an impairment loss recognized for goodwill under any circumstances.",
      "Reversal is permitted only up to 50% with Board approval."
    ],
    2,
    "Ind AS 36 - Paragraph 124: Reversal of Goodwill Impairment Absolute Prohibition",
    "Ind AS 36 Paragraph 124 states unequivocally: 'An impairment loss recognized for goodwill shall not be reversed in a subsequent period.' Any increase in the recoverable amount of goodwill in periods following the recognition of an impairment loss is likely to be an internally generated goodwill rather than a reversal of the acquired goodwill impairment."
  ),

  makeQ(309, 3, "PPE, Intangibles, and Impairment", "Ind AS 16: Incidental Operating Income During Construction",
    "While constructing a multi-specialty hospital, Metro Health Ltd. used an empty paved portion of the site as a commercial pay-and-park facility for 6 months, generating parking fee revenue of ₹25 Lakhs (operating costs were ₹5 Lakhs, net income ₹20 Lakhs). How should this net parking income be treated under Ind AS 16?",
    [
      "Deduct ₹20 Lakhs from the capitalized construction cost of the hospital building.",
      "Recognize ₹25 Lakhs revenue and ₹5 Lakhs operating expenses in the Statement of Profit and Loss, because the parking operation was not necessary to bring the hospital to its working condition for intended use.",
      "Credit ₹20 Lakhs to Revaluation Reserve.",
      "Credit ₹20 Lakhs to Capital Redemption Reserve."
    ],
    1,
    "Ind AS 16 - Paragraph 21: Incidental Operations Before or During Construction",
    "Ind AS 16 Paragraph 21 states that some operations occur in connection with the construction or development of an item of PPE, but are not necessary to bring the item to the condition necessary for it to be capable of operating in the manner intended by management (e.g. income earned through using a building site as a car park until construction starts). Because incidental operations are not necessary, the income and related expenses are recognized in profit or loss and included in their respective classifications of income and expense."
  ),

  makeQ(310, 3, "PPE, Intangibles, and Impairment", "Ind AS 38: Intangible Asset with Indefinite Useful Life",
    "Starlight Media Ltd. acquires a prestigious regional television broadcasting license for ₹80 Crores. The license is renewable every 10 years at a negligible administrative cost, and historical evidence confirms licenses have been renewed indefinitely without substantial modifications. Under Ind AS 38, how should the broadcasting license be amortized and tested for impairment?",
    [
      "Amortized over a mandatory ceiling of 20 years with straight-line amortization.",
      "The license has an indefinite useful life; it is NOT amortized, but must be tested for impairment annually (and whenever there is an indication of impairment) under Ind AS 36.",
      "Amortized over 10 years matching the legal renewal cycle.",
      "Expensed in full in the year of acquisition."
    ],
    1,
    "Ind AS 38 - Paragraphs 107-108 & Ind AS 36 Paragraph 10: Indefinite Life Intangibles",
    "Ind AS 38 states that an intangible asset with an indefinite useful life shall not be amortized. In accordance with Ind AS 36, the entity is required to test an intangible asset with an indefinite useful life for impairment by comparing its recoverable amount with its carrying amount annually, and whenever there is an indication that the intangible asset may be impaired."
  ),

  makeQ(311, 3, "PPE, Intangibles, and Impairment", "Ind AS 16: Exchange of Assets with Commercial Substance",
    "Titan Motors Ltd. exchanges an old assembly robot (carrying amount ₹40 Lakhs, fair value ₹65 Lakhs) plus pays cash of ₹15 Lakhs to acquire a laser welding machine from an unrelated vendor. The fair value of the laser welding machine is reliably determinable at ₹80 Lakhs, and the transaction has commercial substance. What is the initial carrying amount of the laser welding machine and the gain on exchange recognized in P&L?",
    [
      "Carrying amount = ₹55 Lakhs (₹40L + ₹15L); Gain = Nil.",
      "Carrying amount = ₹80 Lakhs; Gain on disposal of old robot = ₹25 Lakhs (Fair value ₹65L minus carrying amount ₹40L) recognized in Profit & Loss.",
      "Carrying amount = ₹65 Lakhs; Gain = ₹10 Lakhs.",
      "Carrying amount = ₹95 Lakhs; Gain = Nil."
    ],
    1,
    "Ind AS 16 - Paragraphs 24-26: Exchange of Assets with Commercial Substance",
    "When an exchange transaction has commercial substance and fair value is reliably measurable, the cost of the acquired asset is measured at fair value. The acquired asset is recorded at ₹80 Lakhs (fair value of asset given up ₹65L + cash paid ₹15L). The difference between the fair value of the asset given up (₹65L) and its carrying amount (₹40L) = ₹25 Lakhs gain recognized in Profit or Loss."
  ),

  makeQ(312, 3, "PPE, Intangibles, and Impairment", "Ind AS 36: Corporate Assets Impairment Allocation",
    "A manufacturing enterprise has two operating CGUs (CGU 1 carrying amount ₹200 Crores; CGU 2 carrying amount ₹300 Crores) and a Headquarters Building (corporate asset with carrying amount of ₹100 Crores). The corporate asset can be allocated to the CGUs on a reasonable and consistent basis (based on weighted carrying amounts). When testing CGU 1 for impairment, what carrying amount of the corporate asset is allocated to CGU 1?",
    [
      "₹0, corporate assets are never allocated to CGUs.",
      "₹40 Crores (₹200 / (₹200 + ₹300) × ₹100 Crores).",
      "₹50 Crores (split equally between the two CGUs).",
      "₹100 Crores fully to CGU 1."
    ],
    1,
    "Ind AS 36 - Paragraph 102: Allocation of Corporate Assets to CGUs",
    "Under Ind AS 36 Paragraph 102, if the carrying amount of a corporate asset can be allocated on a reasonable and consistent basis to a CGU under test, the entity allocates the corporate asset pro rata to the carrying amounts of the CGUs. CGU 1 represents 200/500 = 40% of operating assets; hence 40% of ₹100 Cr = ₹40 Crores is allocated to CGU 1."
  ),

  makeQ(313, 3, "PPE, Intangibles, and Impairment", "Ind AS 16: Elimination of Accumulated Depreciation on Revaluation",
    "Prior to revaluation, Plant & Machinery has a gross cost of ₹200 Crores and accumulated depreciation of ₹60 Crores (net carrying amount ₹140 Crores). The asset is revalued to its current fair value of ₹210 Crores. Management adopts the elimination method under Ind AS 16 Paragraph 35(b). How are the accounting entries formulated?",
    [
      "Credit Plant & Machinery ₹60 Cr, Debit Accumulated Depreciation ₹60 Cr (eliminating depreciation against gross book value), then Debit Plant & Machinery ₹70 Cr and Credit Revaluation Surplus (OCI) ₹70 Cr to bring net carrying amount from ₹140 Cr to ₹210 Cr.",
      "Increase gross book value by 50% and increase accumulated depreciation by 50%.",
      "Debit Revaluation Reserve ₹70 Cr and Credit Profit & Loss ₹70 Cr.",
      "No entry is made until the asset is sold."
    ],
    0,
    "Ind AS 16 - Paragraph 35(b): Elimination Method on Revaluation",
    "Under Ind AS 16 Paragraph 35(b), the accumulated depreciation is eliminated against the gross carrying amount of the asset and the net amount restated to the revalued amount of the asset. First, Debit Accumulated Depreciation ₹60 Cr and Credit Gross Plant ₹60 Cr (reducing gross carrying amount to ₹140 Cr). Then Debit Plant ₹70 Cr and Credit Revaluation Surplus ₹70 Cr (net asset = ₹210 Cr)."
  ),

  makeQ(314, 3, "PPE, Intangibles, and Impairment", "Ind AS 38: Software for In-House Use vs Hardware Bundle",
    "FinTech Solutions Ltd. purchases 100 enterprise server hardware racks for ₹10 Crores and simultaneously purchases specialized database operating software for ₹2 Crores without which the server hardware cannot operate. Additionally, the company purchases application ERP software for ₹5 Crores to manage payroll and HR. How should these items be classified under Ind AS 16 and Ind AS 38?",
    [
      "All ₹17 Crores must be classified as Intangible Assets under Ind AS 38.",
      "Server hardware (₹10 Cr) plus integral operating software (₹2 Cr) = ₹12 Crores classified as PPE under Ind AS 16; application ERP software (₹5 Cr) classified as an Intangible Asset under Ind AS 38.",
      "All ₹17 Crores must be classified as PPE under Ind AS 16.",
      "Operating software is expensed immediately; ERP is capitalized under PPE."
    ],
    1,
    "Ind AS 38 - Paragraph 4 & Ind AS 16: Software Integral to Hardware",
    "Ind AS 38 Paragraph 4 states that in determining whether an asset that incorporates both intangible and tangible elements should be treated under Ind AS 16 or Ind AS 38, the entity uses judgement to assess which element is more significant. Software that is an integral part of the related hardware (such as an operating system for computer hardware) is treated as Property, Plant and Equipment. Non-integral application software (like standalone ERP/payroll) is treated as an intangible asset."
  ),

  makeQ(315, 3, "PPE, Intangibles, and Impairment", "Ind AS 36: Reversal of Impairment Loss for Non-Goodwill Assets",
    "In FY 2021-22, an item of plant (cost ₹100 Crores, useful life 10 years, straight-line depreciation) was impaired from carrying amount ₹80 Crores (after 2 years) to recoverable amount of ₹48 Crores. In FY 2023-24 (after 2 further years of depreciation at ₹48 Cr / 8 = ₹6 Cr/year, carrying amount = ₹36 Crores), market conditions improved dramatically and recoverable amount jumped to ₹75 Crores. What is the maximum permitted reversal of impairment loss under Ind AS 36?",
    [
      "₹39 Crores (from ₹36 Crores to ₹75 Crores).",
      "₹24 Crores (the increased carrying amount cannot exceed the carrying amount that would have been determined, net of depreciation, had no impairment loss been recognized in prior years: ₹100 Cr - (4 years × ₹10 Cr) = ₹60 Crores; Reversal = ₹60 Cr - ₹36 Cr = ₹24 Crores).",
      "₹0, reversals are prohibited for all long-term assets.",
      "₹48 Crores credited to OCI."
    ],
    1,
    "Ind AS 36 - Paragraphs 117-118: Ceiling on Reversal of Impairment Loss",
    "Ind AS 36 Paragraph 117 states that the increased carrying amount of an asset attributable to a reversal of an impairment loss shall not exceed the carrying amount that would have been determined (net of amortization or depreciation) had no impairment loss been recognized for the asset in prior years. Without impairment, carrying amount at end of year 4 would be ₹100 Cr - 4 × ₹10 Cr = ₹60 Crores. Current carrying amount = ₹36 Crores. Maximum reversal = ₹60 Cr - ₹36 Cr = ₹24 Crores recognized in P&L."
  ),

  makeQ(316, 3, "PPE, Intangibles, and Impairment", "Ind AS 16: Bearer Plants Classification",
    "Highland Agro Ltd. operates an estate consisting of tea bushes (mature tea plants used solely to harvest tea leaves for 30 years, with scrap wood value at end of life) and timber trees grown solely for felling and sale as lumber. How are the tea bushes and timber trees classified under Ind AS?",
    [
      "Both are classified as Biological Assets at fair value less costs to sell under Ind AS 41.",
      "Tea bushes are classified as 'Bearer Plants' and accounted for as Property, Plant and Equipment under Ind AS 16 (cost or revaluation model), while the timber trees are biological assets governed by Ind AS 41.",
      "Both are classified as Inventories under Ind AS 2.",
      "Both are classified as Investment Property under Ind AS 40."
    ],
    1,
    "Ind AS 16 - Paragraphs 3 & 6 & Ind AS 41: Definition of Bearer Plant",
    "Ind AS 16 defines a bearer plant as a living plant that: (a) is used in the production or supply of agricultural produce; (b) is expected to bear produce for more than one period; and (c) has a remote likelihood of being sold as agricultural produce, except for incidental scrap sales. Tea bushes qualify as bearer plants and fall within the scope of Ind AS 16. Plants grown solely to be harvested as agricultural produce (e.g. timber trees) remain biological assets under Ind AS 41."
  ),

  makeQ(317, 3, "PPE, Intangibles, and Impairment", "Ind AS 38: Subsequent Expenditure on Intangible Assets",
    "Pharma Innovations Ltd. acquired an approved pharmaceutical patent 3 years ago. During the current year, the company spent ₹8 Crores on clinical trials to defend the patent against legal challenges from generic drug makers and maintain its originally assessed efficacy. How must this ₹8 Crores be accounted for under Ind AS 38?",
    [
      "Capitalized to the cost of the Patent Intangible Asset.",
      "Expensed in Profit and Loss as incurred, because subsequent expenditure on an intangible asset after its purchase or completion is almost always recognized as an expense unless it increases the future economic benefits beyond the original standard of performance.",
      "Recognized in OCI as a revaluation reserve adjustment.",
      "Treated as an advance payment in current assets."
    ],
    1,
    "Ind AS 38 - Paragraph 20: Subsequent Expenditure on Intangible Assets",
    "Ind AS 38 Paragraph 20 states that the nature of intangible assets is such that in many cases there are no additions to such an asset or replacements of part of it. Most subsequent expenditures are likely to maintain the expected future economic benefits embodied in an existing intangible asset rather than meet the definition of an intangible asset and the recognition criteria. Legal defense costs maintain existing rights and are expensed."
  ),

  makeQ(318, 3, "PPE, Intangibles, and Impairment", "Ind AS 16: Decommissioning Obligation Change in Estimates",
    "Coastal Refineries Ltd. measures its oil refinery using the Cost Model under Ind AS 16. In year 5, due to advanced green technology, the estimated present value of the decommissioning liability decreases by ₹8 Crores. How is this ₹8 Crores decrease accounted for under Appendix A of Ind AS 16 (Ind AS equivalent of IFRIC 1)?",
    [
      "Recognized immediately as a gain in Profit or Loss.",
      "Deducted from the cost of the refinery asset in the current period; if the decrease exceeds the carrying amount of the asset, the excess is recognized immediately in profit or loss.",
      "Credited directly to General Reserve.",
      "Ignored until the refinery is finally decommissioned."
    ],
    1,
    "Ind AS 16 - Appendix A (Changes in Existing Decommissioning, Restoration and Similar Liabilities)",
    "Under Appendix A Paragraph 4, changes in the measurement of an existing decommissioning, restoration and similar liability that result from changes in the estimated timing or amount of the outflow of resources are added to, or deducted from, the cost of the related asset under the cost model. However, the amount deducted from the cost of the asset shall not exceed its carrying amount."
  ),

  makeQ(319, 3, "PPE, Intangibles, and Impairment", "Ind AS 36: Indicators of Impairment",
    "Which of the following is considered an external source of information indicating that an asset may be impaired under Ind AS 36?",
    [
      "Evidence is available of obsolescence or physical damage of an asset.",
      "Significant changes with an adverse effect on the entity have taken place during the period, or are expected to take place in the near future, in the technological, market, economic, or legal environment in which the entity operates.",
      "Internal reporting indicates that the economic performance of an asset is, or will be, worse than expected.",
      "Significant restructuring plans for the division using the asset have been approved by management."
    ],
    1,
    "Ind AS 36 - Paragraph 12(b): External Sources of Information for Impairment",
    "Ind AS 36 Paragraph 12 divides indicators into external and internal sources. External sources include: significant unexpected declines in market value; significant adverse changes in technological, market, economic or legal environment; increases in market interest rates; and carrying amount of net assets exceeding market capitalization. Physical damage and internal reporting of poor performance are internal sources."
  ),

  makeQ(320, 3, "PPE, Intangibles, and Impairment", "Ind AS 16: Cessation of Capitalisation of Borrowing Costs and Overheads",
    "A commercial hotel building is structurally complete, fully furnished, licensed, and ready for occupancy on 30th November 2023. However, due to the upcoming tourist season in March 2024, management delays the grand opening until 1st March 2024. During this 3-month idle interval, management incurred security, staff training, and promotional expenses of ₹50 Lakhs. Can these costs be capitalized into the hotel PPE under Ind AS 16?",
    [
      "Yes, capitalization continues until the asset starts generating operating revenue from customers.",
      "No, recognition of costs in the carrying amount of an item of PPE ceases when the item is in the location and condition necessary for it to be capable of operating in the manner intended by management; costs incurred while using or redeploying an item, initial operating losses, and promotional costs are expensed.",
      "Yes, promotional expenses are mandatory components of initial cost.",
      "Only the security costs can be capitalized."
    ],
    1,
    "Ind AS 16 - Paragraph 20: Cessation of Capitalisation",
    "Ind AS 16 Paragraph 20 states explicitly: 'Recognition of costs in the carrying amount of an item of property, plant and equipment ceases when the item is in the location and condition necessary for it to be capable of operating in the manner intended by management.' Costs incurred while an item capable of operating in the manner intended by management has yet to be brought into use, initial operating losses, and costs of introducing a new service are recognized in profit or loss."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_3_ppe_intangibles_impairment.json'), JSON.stringify(t3Qs, null, 2), 'utf8');
console.log('Saved Topic 3: 20 Questions');

// =========================================================================
// TOPIC 4: Revenue Recognition and Construction Contracts (Ind AS 115) (20 Questions)
// =========================================================================
const t4Qs = [
  makeQ(401, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: 5-Step Model - Step 2 Distinct Performance Obligations",
    "CloudTech Solutions Ltd. signs a single contract with a bank to: (i) grant a perpetual software license for core banking software; (ii) provide extensive custom code modifications so the software integrates with legacy payment switches; and (iii) provide 3 years of routine technical support. The custom modification significantly modifies the software code, and the software cannot function without this bespoke integration. How many performance obligations exist under Ind AS 115?",
    [
      "Three separate performance obligations: the software license, the custom modification service, and the technical support.",
      "Two performance obligations: a combined performance obligation comprising the software license and custom modification service (because the software and customization are highly interrelated and represent a combined output), and a separate performance obligation for the 3-year technical support.",
      "One single performance obligation comprising all three deliverables.",
      "No performance obligation exists until technical support expires."
    ],
    1,
    "Ind AS 115 (Revenue from Contracts with Customers) - Paragraphs 27-30: Distinct Goods or Services",
    "Under Ind AS 115 Paragraph 29, a good or service is not distinct within the context of the contract if the entity provides a significant service of integrating the good or service with other goods or services into a bundle of goods or services that represent the combined output. Because the software is significantly modified and integrated, the license and customization are bundled into a single performance obligation. Technical support is distinct and forms a second performance obligation."
  ),

  makeQ(402, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Variable Consideration & Constraint",
    "InfraBuild Ltd. enters into a contract to build a municipal flyover for a fixed price of ₹100 Crores with completion due on 31st December 2024. The contract includes an incentive bonus of ₹10 Crores if completed by 30th November 2024. Historical analysis indicates a 75% probability of early completion. However, ongoing monsoon flooding and geotechnical approvals create significant uncertainty outside management's control. Under Ind AS 115, how should the variable consideration be estimated and recognized as of 31st March 2024?",
    [
      "Include the full ₹10 Crores incentive bonus in the transaction price based on the 75% probability.",
      "Include ₹7.5 Crores (expected value: 75% of ₹10 Crores) in the transaction price.",
      "Exclude the ₹10 Crores bonus from the transaction price under the 'variable consideration constraint', because it is not highly probable that a significant reversal in cumulative revenue will not occur once uncertainty is resolved.",
      "Recognize the ₹10 Crores incentive in OCI."
    ],
    2,
    "Ind AS 115 - Paragraphs 56-58: Constraining Estimates of Variable Consideration",
    "Ind AS 115 Paragraph 56 states that an entity shall include in the transaction price some or all of an amount of variable consideration only to the extent that it is 'highly probable' that a significant reversal in the amount of cumulative revenue recognized will not occur when the uncertainty is subsequently resolved. Factors such as susceptibility to factors outside the entity's influence (weather, regulatory approvals) require the variable incentive to be fully constrained until resolution."
  ),

  makeQ(403, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Significant Financing Component",
    "Solar EPC Ltd. agrees to construct a solar power plant for CleanEnergy Ltd. for ₹121 Crores payable 2 years after plant commissioning and operational handover. The cash selling price of an equivalent plant paid upon handover is ₹100 Crores. The customer's market borrowing rate is 10% per annum. How should Solar EPC Ltd. account for this contract under Ind AS 115 upon handover and over the 2-year credit period?",
    [
      "Recognize revenue of ₹121 Crores on handover date; no financing income.",
      "Recognize revenue of ₹100 Crores on handover date (the cash selling price/present value) and recognize finance income of ₹10 Crores in Year 1 (10% of ₹100 Cr) and ₹11 Crores in Year 2 (10% of ₹110 Cr) in Profit & Loss using the effective interest method.",
      "Recognize revenue of ₹60.5 Crores in each of the two years.",
      "Recognize revenue of ₹121 Crores only after cash is received at the end of year 2."
    ],
    1,
    "Ind AS 115 - Paragraphs 60-65: Significant Financing Component in a Contract",
    "Under Ind AS 115, when the contract contains a significant financing component, the transaction price is adjusted to reflect the time value of money. The entity recognizes revenue at the cash selling price of ₹100 Crores at the point when control of the plant is transferred. The ₹21 Crores difference is recognized as finance income over the 2-year deferred settlement period using the effective interest method."
  ),

  makeQ(404, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Standalone Selling Price Allocation",
    "Telecom Pioneer Ltd. sells a bundled mobile package comprising a high-end smartphone and a 12-month voice/data service contract for a total upfront consideration of ₹60,000. Standalone selling prices are: Smartphone = ₹48,000; 12-month service contract = ₹32,000 (Total standalone price = ₹80,000). How should the ₹60,000 transaction price be allocated to the performance obligations under Ind AS 115?",
    [
      "Allocate ₹48,000 to the smartphone upon delivery, and remaining ₹12,000 to the 12-month service contract.",
      "Allocate pro-rata based on relative standalone selling prices: Smartphone = (₹48,000 / ₹80,000) × ₹60,000 = ₹36,000 recognized on delivery; Service = (₹32,000 / ₹80,000) × ₹60,000 = ₹24,000 recognized ratably over 12 months (₹2,000/month).",
      "Split 50:50 (₹30,000 each) between the smartphone and service.",
      "Recognize entire ₹60,000 on delivery of the smartphone."
    ],
    1,
    "Ind AS 115 - Paragraphs 73-76: Allocation Based on Relative Standalone Selling Prices",
    "Ind AS 115 Paragraph 73 states that an entity shall allocate the transaction price to each performance obligation on a relative standalone selling price basis. The total standalone price is ₹48,000 + ₹32,000 = ₹80,000. The discount of 25% (₹20,000 / ₹80,000) is allocated proportionately to both obligations: Phone = ₹48,000 × 75% = ₹36,000; Service = ₹32,000 × 75% = ₹24,000."
  ),

  makeQ(405, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Input Method for Construction Contracts",
    "MegaStructure Ltd. enters into a fixed-price construction contract for ₹500 Crores. Total estimated contract costs are ₹400 Crores. During Year 1, actual costs incurred were ₹100 Crores (which includes ₹20 Crores for specialized architectural steel delivered to site but not yet fabricated or installed). MegaStructure measures progress using the input method (costs incurred). What is the percentage of completion and revenue recognized in Year 1 under Ind AS 115?",
    [
      "Cost incurred ₹100 Cr / ₹400 Cr = 25%; Revenue = ₹125 Crores.",
      "Uninstalled material (₹20 Cr) must be excluded from progress measurement. Incurred operational costs = ₹80 Cr; Total estimated costs = ₹400 Cr; Progress = ₹80 / ₹400 = 20%; Revenue recognized = 20% of ₹500 Cr = ₹100 Crores (or ₹80 Cr + ₹20 Cr uninstalled materials at zero profit).",
      "Revenue recognized is zero until the building structure is finished.",
      "Recognize revenue equal to customer billings of ₹150 Crores."
    ],
    1,
    "Ind AS 115 - Paragraph B19: Uninstalled Materials Adjustment in Input Method",
    "Under Ind AS 115 Paragraph B19, an entity shall exclude from an input measure of progress any costs incurred that do not contribute to the entity's progress in satisfying the performance obligation (such as uninstalled materials). When uninstalled materials are significant, the entity recognizes revenue only to the extent of the cost incurred for those materials with zero profit margin, or excludes them from the progress calculation."
  ),

  makeQ(406, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Contract Modifications - Prospective vs Cumulative Catch-Up",
    "BuildCon Ltd. has a contract to construct 100 identical prefabricated modular classrooms for a school district for ₹100 Crores (₹1 Crore each). After delivering 60 classrooms (revenue recognized ₹60 Crores), the client requests 20 additional classrooms. The price for the additional 20 classrooms is negotiated at ₹80 Lakhs each, which does NOT reflect their standalone selling price. How should this contract modification be accounted for under Ind AS 115?",
    [
      "As a separate contract.",
      "As a termination of the existing contract and creation of a new contract (prospective treatment), because the remaining 40 original classrooms and 20 new classrooms are distinct, but the additional price does not reflect standalone selling price; total remaining consideration of ₹56 Crores (₹40 Cr + ₹16 Cr) is allocated over 60 remaining classrooms at ₹93.33 Lakhs each.",
      "As a cumulative catch-up adjustment against already recognized revenue of ₹60 Crores.",
      "Revenue for the 20 new classrooms must be deferred until all 120 are completed."
    ],
    1,
    "Ind AS 115 - Paragraph 21(a): Contract Modification as Prospective Replacement",
    "Under Ind AS 115 Paragraph 21(a), an entity accounts for a contract modification as if it were a termination of the existing contract and the creation of a new contract if the remaining goods are distinct from those transferred on or before the modification date, but the additional goods are not priced at their standalone selling prices. The remaining consideration (₹40 Cr + ₹16 Cr = ₹56 Cr) is allocated prospectively to the 60 remaining distinct classrooms."
  ),

  makeQ(407, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Principal vs Agent Assessment",
    "TicketFlyer Ltd. operates an online portal for airline bookings. The portal displays flights, processes passenger payments of ₹10,000 per ticket, remits ₹9,200 to the airline, and retains an ₹800 commission. TicketFlyer does not control the seat inventory before transfer, does not set flight schedules, and bears no inventory or flight operational risk. How should TicketFlyer Ltd. recognize revenue under Ind AS 115?",
    [
      "Recognize gross revenue of ₹10,000 and cost of sales of ₹9,200 as a Principal.",
      "Recognize net revenue of ₹800 as an Agent, because TicketFlyer does not obtain control of the flight service before it is transferred to the customer.",
      "Recognize no revenue until the passenger completes the flight.",
      "Recognize ₹10,000 in Other Comprehensive Income."
    ],
    1,
    "Ind AS 115 - Paragraphs B34-B38: Principal versus Agent Considerations",
    "Ind AS 115 Paragraph B34 states that when another party is involved in providing goods or services to a customer, the entity must determine whether it is a principal (controlling the specified good or service before transfer) or an agent (arranging for the good or service to be provided by the other party). Because TicketFlyer does not control the service before it is provided, it is an agent and recognizes revenue net at ₹800."
  ),

  makeQ(408, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Non-Refundable Upfront Fees",
    "Club Royale charges new members an upfront non-refundable joining fee of ₹1,20,000 plus an annual membership fee of ₹24,000. The upfront fee does not transfer any distinct good or service to the member, but provides an ongoing right to access club amenities over an estimated average membership life of 5 years. How should the upfront fee be recognized under Ind AS 115?",
    [
      "Recognize full ₹1,20,000 as revenue immediately on receipt, because it is non-refundable.",
      "Recognize the ₹1,20,000 upfront fee as a contract liability and amortize it as revenue ratably over the estimated 5-year customer relationship period (₹24,000 per year).",
      "Credit the upfront fee directly to Equity Share Capital.",
      "Recognize the upfront fee in OCI."
    ],
    1,
    "Ind AS 115 - Paragraph B49: Non-Refundable Upfront Fees",
    "Under Ind AS 115 Paragraph B49, non-refundable upfront fees (such as joining fees or setup fees) that do not transfer a distinct good or service to the customer are treated as an advance payment for future goods or services. Therefore, the fee is recognized as revenue over the period during which those future goods or services are expected to be provided (the expected customer relationship period)."
  ),

  makeQ(409, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Warranties - Assurance vs Service Type",
    "ElectroTech Ltd. sells an industrial laser for ₹20 Lakhs. The purchase price includes: (i) a statutory 1-year warranty assuring that the laser complies with agreed specifications and is free from defects; and (ii) a customer option to purchase an additional 2-year extended preventative maintenance warranty for ₹2 Lakhs. How are these two warranties treated under Ind AS 115?",
    [
      "Both warranties are separate performance obligations requiring transaction price allocation.",
      "The 1-year statutory warranty is an assurance-type warranty accounted for as a provision under Ind AS 37; the optional 2-year extended warranty is a service-type warranty that represents a distinct performance obligation, with revenue recognized over the 2-year service period.",
      "Both warranties are accounted for under Ind AS 37.",
      "All warranty proceeds are deferred until all 3 years expire."
    ],
    1,
    "Ind AS 115 - Paragraphs B28-B33: Customer Warranties",
    "Under Ind AS 115, if a customer does not have the option to purchase a warranty separately and the warranty only provides assurance that the product complies with agreed specifications, it is an assurance-type warranty accounted for under Ind AS 37. If the customer can purchase the warranty separately or it provides a service beyond basic assurance, it is a service-type warranty and accounted for as a separate performance obligation."
  ),

  makeQ(410, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Performance Obligation Satisfied Over Time Criteria",
    "Which of the following conditions mandates that a performance obligation is satisfied over time (rather than at a point in time) under Ind AS 115?",
    [
      "The contract price exceeds ₹100 Crores.",
      "Any one of the following three criteria is met: (a) customer simultaneously receives and consumes benefits as entity performs; (b) entity's performance creates or enhances an asset customer controls; or (c) entity's performance does not create an asset with an alternative use to entity AND entity has an enforceable right to payment for performance completed to date.",
      "The customer inspects the asset at the entity's premises prior to shipment.",
      "The contract contains a penalty clause for delayed delivery."
    ],
    1,
    "Ind AS 115 - Paragraph 35: Criteria for Satisfaction of Performance Obligations Over Time",
    "Ind AS 115 Paragraph 35 defines three distinct criteria where control transfers over time: (a) simultaneous receipt and consumption (routine services); (b) asset created/enhanced under customer control (building on customer land); or (c) no alternative use to the entity and an enforceable right to payment for performance completed to date (custom asset with cost-plus-margin enforceable right)."
  ),

  makeQ(411, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Incremental Costs of Obtaining a Contract",
    "RealEstate Developers Ltd. pays sales commission of ₹5 Lakhs to an external broker upon the successful signing of an enforceable apartment sale contract. The apartment will be constructed over 3 years. Additionally, the company incurred ₹1 Lakh on legal fees drafting standard tender templates (incurred regardless of whether the contract was won). How should these costs be treated under Ind AS 115?",
    [
      "Expense both the ₹5 Lakhs commission and ₹1 Lakh legal fees immediately in Profit or Loss.",
      "Capitalize the ₹5 Lakhs sales commission as an asset (incremental cost of obtaining a contract) and amortize it over the 3-year construction period; expense the ₹1 Lakh legal fees as incurred because they would have been incurred regardless of contract award.",
      "Capitalize both costs into property inventory.",
      "Deduct ₹6 Lakhs directly from equity."
    ],
    1,
    "Ind AS 115 - Paragraphs 91-94: Incremental Costs of Obtaining a Contract",
    "Under Ind AS 115 Paragraph 91, an entity shall recognize as an asset the incremental costs of obtaining a contract with a customer if the entity expects to recover those costs. Incremental costs are those that would not have been incurred if the contract had not been obtained (e.g. sales commission). Costs incurred regardless of whether the contract was obtained (like bid preparation and legal fees) are expensed as incurred."
  ),

  makeQ(412, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Right of Return and Refund Liability",
    "Fashion Trendz Ltd. sells 1,000 designer dresses at ₹5,000 each (cost ₹3,000 each) in March 2024. Customers have an unconditional 30-day right of return for full cash refund. Historical data establishes that 8% of dresses will be returned. As of 31st March 2024, how should this sale be recorded under Ind AS 115?",
    [
      "Recognize revenue of ₹50,00,000 and cost of sales of ₹30,00,000.",
      "Recognize revenue of ₹46,00,000 (920 dresses), a refund liability of ₹4,00,000 (80 dresses × ₹5,000), cost of sales of ₹27,60,000 (920 dresses × ₹3,000), and an asset for recovery of products of ₹2,40,000 (80 dresses × ₹3,000).",
      "Defer all revenue until the 30-day return window lapses.",
      "Recognize revenue of ₹50,00,000 and a warranty provision of ₹4,00,000 under Ind AS 37."
    ],
    1,
    "Ind AS 115 - Paragraphs B20-B27: Sale with a Right of Return",
    "For sales with a right of return, an entity recognizes: (a) revenue for the transferred products in the amount of consideration to which the entity expects to be entitled (92% = ₹46L); (b) a refund liability for amounts expected to be refunded (8% = ₹4L); (c) cost of sales for goods expected not to be returned (92% = ₹27.6L); and (d) an asset for its right to recover products from customers on settling the refund liability (8% = ₹2.4L)."
  ),

  makeQ(413, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Licensing - Right to Access vs Right to Use",
    "MovieMagic Studios grants a streaming platform a 3-year license to stream a finished 1995 blockbuster movie. The studio has no obligation to undertake any activities that significantly affect the intellectual property of the film. Is this license a 'Right to Access' (revenue over time) or a 'Right to Use' (revenue at point in time) under Ind AS 115?",
    [
      "Right to Access, recognized ratably over the 3-year streaming license window.",
      "Right to Use, recognized in full at the point in time when the customer is able to use and benefit from the license (the effective commencement date), because the intellectual property has significant standalone functionality and the licensor undertakes no activities affecting it.",
      "A financial lease under Ind AS 116.",
      "Recognized based on viewer streaming hours only."
    ],
    1,
    "Ind AS 115 - Paragraphs B56-B61: Licensing of Intellectual Property",
    "Ind AS 115 distinguishes between: (a) a right to access IP (dynamic license where the licensor's ongoing activities significantly affect the IP, recognized over time); and (b) a right to use IP (static license where the IP has standalone functionality and the licensor's activities do not change it, recognized at the point in time when the license is transferred and operational)."
  ),

  makeQ(414, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Bill-and-Hold Arrangements",
    "On 28th March 2024, Machinery Corp sells custom equipment to a client for ₹50 Lakhs. The client requests in writing that Machinery Corp retain physical custody in its warehouse until the client's new factory site is ready in May 2024. The equipment is complete, identified separately, ready for physical delivery, and cannot be redirected to any other customer. Can Machinery Corp recognize revenue in March 2024 under Ind AS 115?",
    [
      "No, revenue recognition is strictly prohibited until physical delivery occurs.",
      "Yes, all four bill-and-hold criteria under Ind AS 115 Paragraph B81 are met (substantive reason for request, separately identified as customer's, ready for physical transfer, entity cannot use or redirect the product), allowing control to transfer and revenue to be recognized.",
      "Only 50% revenue can be recognized.",
      "Revenue is recognized under Ind AS 116 as a lease."
    ],
    1,
    "Ind AS 115 - Paragraphs B79-B82: Bill-and-Hold Arrangements",
    "Under Ind AS 115 Paragraph B81, for a customer to have obtained control in a bill-and-hold arrangement, all of the following criteria must be met: (a) reason for bill-and-hold must be substantive (customer requested); (b) product must be identified separately; (c) product must be ready for physical transfer; and (d) entity cannot have the ability to use the product or direct it to another customer."
  ),

  makeQ(415, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Customer Options for Additional Goods (Material Right)",
    "Retail Store Ltd. launches a customer loyalty program: for every ₹1,000 spent on groceries, the customer receives 10 reward points. Each point entitles the customer to a ₹10 discount on future purchases. Management expects 80% of points to be redeemed. During the month, customers spend ₹1,00,000 and earn 1,000 points (fair value of points expected to be redeemed = 800 × ₹10 = ₹8,000). How should the ₹1,00,000 transaction price be allocated under Ind AS 115?",
    [
      "Recognize full ₹1,00,000 as revenue immediately and provide for ₹8,000 as an expense under Ind AS 37.",
      "Allocate the ₹1,00,000 consideration between the groceries delivered (₹1,00,000 / ₹1,08,000 × ₹1,00,000 = ₹92,593 recognized immediately) and the performance obligation for loyalty points (₹8,000 / ₹1,08,000 × ₹1,00,000 = ₹7,407 recognized as a contract liability until points are redeemed or expire).",
      "Defer all revenue until points are redeemed.",
      "Recognize points in OCI."
    ],
    1,
    "Ind AS 115 - Paragraphs B39-B43: Customer Options for Additional Goods or Services (Loyalty Points)",
    "If in a contract an entity grants a customer the option to acquire additional goods or services, that option gives rise to a performance obligation if the option provides a material right to the customer. The entity allocates the transaction price to the performance obligations on a relative standalone selling price basis. Revenue allocated to points is recognized as a contract liability until points are redeemed or expire."
  ),

  makeQ(416, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Consignment Arrangements",
    "Auto Components Ltd. ships 500 gearboxes to a nationwide dealer network. The agreement specifies that the dealer takes no inventory risk, Auto Components Ltd. may recall or transfer gearboxes to another dealer at any time, and the dealer has no obligation to pay until a gearbox is sold to an end consumer. How should Auto Components Ltd. recognize revenue?",
    [
      "Recognize revenue upon shipment of gearboxes to the dealer's warehouse.",
      "No revenue is recognized upon shipment; revenue is recognized only when the dealer sells the gearbox to an end customer, because control remains with Auto Components Ltd. in a consignment arrangement.",
      "Recognize revenue at 50% upon shipment and 50% upon final sale.",
      "Recognize revenue under Ind AS 109 as a financial asset."
    ],
    1,
    "Ind AS 115 - Paragraphs B77-B78: Consignment Arrangements",
    "Under Ind AS 115 Paragraph B77, when an entity delivers a product to another party for sale to end customers, the entity must evaluate whether that other party has obtained control. In a consignment arrangement (where the entity controls the product until a specified event occurs, can require return or transfer, and dealer has no unconditional obligation to pay), revenue is not recognized on delivery to the dealer."
  ),

  makeQ(417, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Onerous Contracts under Ind AS 115 / Ind AS 37",
    "BridgeTech Ltd. is executing a fixed-price construction contract for ₹80 Crores. By the end of Year 1, costs incurred were ₹40 Crores and estimated costs to complete are ₹60 Crores (total expected costs = ₹100 Crores). Progress is 40% (₹40 Cr / ₹100 Cr). Revenue recognized to date is ₹32 Crores (40% of ₹80 Cr). How should the expected total contract loss of ₹20 Crores (₹80 Cr - ₹100 Cr) be treated under Ind AS 115 and Ind AS 37?",
    [
      "Recognize the ₹20 Crores loss ratably over the remaining construction period.",
      "Recognize an immediate provision for the entire remaining onerous contract loss of ₹12 Crores in Profit & Loss (after reflecting the current period operating loss of ₹8 Crores: ₹32 Cr revenue minus ₹40 Cr costs), ensuring the entire ₹20 Crores expected contract loss is recognized immediately.",
      "Capitalize the ₹20 Crores loss as an intangible asset.",
      "Defer recognition of the loss until final handover."
    ],
    1,
    "Ind AS 115 & Ind AS 37: Onerous Construction Contracts",
    "When a construction contract becomes onerous (total contract costs exceed total contract revenues), the entire expected loss must be recognized immediately in profit or loss in accordance with Ind AS 37. Current year P&L reflects ₹32 Cr revenue - ₹40 Cr costs = -₹8 Cr loss, plus an onerous contract provision of ₹12 Cr = total ₹20 Cr recognized immediately."
  ),

  makeQ(418, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Non-Cash Consideration Measurement",
    "TechGlobal Ltd. agrees to develop an automated inventory management app for a corporate client. In exchange, the client transfers 1,00,000 equity shares of its own company to TechGlobal Ltd. The fair value of the shares at contract inception is ₹50 per share (₹50 Lakhs). At the date of app completion and handover, the share price has risen to ₹65 per share (₹65 Lakhs). Under Ind AS 115, at what amount is transaction revenue measured?",
    [
      "₹65 Lakhs (fair value of non-cash consideration at the date of delivery).",
      "₹50 Lakhs (measured at fair value of the non-cash consideration at contract inception).",
      "₹10 Lakhs (nominal face value of shares).",
      "Zero revenue; shares are treated as capital reserve."
    ],
    1,
    "Ind AS 115 - Paragraphs 66-69: Measurement of Non-Cash Consideration",
    "Under Ind AS 115 Paragraph 66, to determine the transaction price for contracts in which a customer promises consideration in a form other than cash, an entity shall measure the non-cash consideration at fair value. Under Ind AS guidance, fair value of non-cash consideration is measured at contract inception and subsequent changes in fair value due to the form of the consideration (share price fluctuation) are not recognized as revenue."
  ),

  makeQ(419, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Contract Asset vs Trade Receivable",
    "What is the fundamental distinction between a 'Contract Asset' and a 'Trade Receivable' under Ind AS 115?",
    [
      "There is no distinction; both terms are interchangeable.",
      "A Trade Receivable represents an unconditional right to consideration (only the passage of time is required before payment is due), whereas a Contract Asset represents an entity's right to consideration in exchange for goods/services transferred to the customer conditioned on something other than the passage of time (e.g. future performance or milestone certification).",
      "A Contract Asset is always classified as Non-Current, while a Trade Receivable is Current.",
      "Contract Assets carry no credit risk, while Trade Receivables do."
    ],
    1,
    "Ind AS 115 - Paragraphs 107-108: Contract Asset vs Trade Receivable",
    "Ind AS 115 Paragraph 107 states that an entity shall present a contract asset when it has performed by transferring goods or services before the customer pays consideration, conditioned on something other than the passage of time. A receivable is an entity's right to consideration that is unconditional—only the passage of time is required before payment becomes due."
  ),

  makeQ(420, 4, "Revenue Recognition and Construction Contracts", "Ind AS 115: Presentation of Contract Liabilities",
    "SmartTech Ltd. receives an advance payment of ₹25 Crores from a client on 15th March 2024 for specialized industrial robotics to be manufactured and delivered in November 2024. As of 31st March 2024, manufacturing has not commenced. How must the ₹25 Crores be presented on SmartTech Ltd.'s balance sheet?",
    [
      "Revenue in the Statement of Profit and Loss for FY 2023-24.",
      "Contract Liability (Deferred Revenue) under Current Liabilities, representing the entity's obligation to transfer goods to the customer for which consideration has been received.",
      "Other Comprehensive Income.",
      "Deduction from Inventory."
    ],
    1,
    "Ind AS 115 - Paragraph 106: Presentation of Contract Liabilities",
    "Ind AS 115 Paragraph 106 states: 'If a customer pays consideration, or an entity has a right to an amount of consideration that is unconditional, before the entity transfers a good or service to the customer, the entity shall present the contract as a contract liability when the payment is made or the payment is due (whichever is earlier).' A contract liability is an entity's obligation to transfer goods or services."
  )
];

fs.writeFileSync(path.join(frDir, 'topic_4_revenue_recognition.json'), JSON.stringify(t4Qs, null, 2), 'utf8');
console.log('Saved Topic 4: 20 Questions');
console.log('--- Part 1 complete: Topics 1 to 4 generated (80 questions total) ---');

