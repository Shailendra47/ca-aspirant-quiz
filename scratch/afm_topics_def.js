const fs = require('fs');
const path = require('path');

const AFM_TOPICS = [
  {
    topicId: 1,
    topicTitle: "Capital Budgeting and Investment Decisions Under Risk and Uncertainty",
    shortTitle: "Capital Budgeting & Risk",
    fileName: "topic_1_capital_budgeting.json",
    syllabus: "APV, Certainty Equivalent, Sensitivity & Scenario Analysis, Decision Trees, Real Options (Expand, Abandon, Delay), Capital Rationing & Replacement"
  },
  {
    topicId: 2,
    topicTitle: "Cost of Capital and Capital Structure Decisions",
    shortTitle: "Cost of Capital & Capital Structure",
    fileName: "topic_2_cost_of_capital.json",
    syllabus: "WACC, CAPM Cost of Equity, Cost of Debt & Preference, MM Proposition I & II (Taxes & Arbitrage), Trade-off Theory, Pecking Order & Indifference Points"
  },
  {
    topicId: 3,
    topicTitle: "Dividend Policy and Working Capital Management",
    shortTitle: "Dividend Policy & Working Capital",
    fileName: "topic_3_dividend_working_capital.json",
    syllabus: "Walter's & Gordon's Models, MM Dividend Irrelevance, Lintner Model, Operating Cycle, Baumol & Miller-Orr Cash Models, Factoring & Receivables"
  },
  {
    topicId: 4,
    topicTitle: "Securities Analysis and Portfolio Management, Including CAPM and Modern Portfolio Theory",
    shortTitle: "Portfolio Management & CAPM",
    fileName: "topic_4_portfolio_management.json",
    syllabus: "Markowitz Efficient Frontier, Sharpe Single Index Model, CAPM (SML/CML), APT, Portfolio Evaluation (Sharpe, Treynor, Jensen), Bond Duration & Immunization"
  },
  {
    topicId: 5,
    topicTitle: "Derivatives: Futures, Options, and Swaps",
    shortTitle: "Derivatives: Futures, Options, Swaps",
    fileName: "topic_5_derivatives.json",
    syllabus: "Stock/Index Futures, Cost of Carry, Hedging with Beta, Binomial & Black-Scholes Models, Put-Call Parity, Greeks & Strategies, Interest Rate Swaps & FRAs"
  },
  {
    topicId: 6,
    topicTitle: "Foreign Exchange Exposure and Risk Management",
    shortTitle: "Forex Exposure & Risk Management",
    fileName: "topic_6_forex_risk_management.json",
    syllabus: "Quotes & Cross Rates, PPP, IRP, Covered Interest Arbitrage, Transaction/Translation/Economic Exposure, Money Market & Forward Hedges, VaR"
  },
  {
    topicId: 7,
    topicTitle: "International Financial Management",
    shortTitle: "International Financial Management",
    fileName: "topic_7_international_finance.json",
    syllabus: "Home vs Foreign Currency Capital Budgeting, Sovereign Risk, Transfer Pricing, ADRs/GDRs/FCCBs/Masala Bonds, ECBs, Multilateral Netting & DTAA"
  },
  {
    topicId: 8,
    topicTitle: "Mergers, Acquisitions, and Corporate Restructuring",
    shortTitle: "Mergers, Acquisitions & Restructuring",
    fileName: "topic_8_mergers_acquisitions.json",
    syllabus: "Swap Ratio (EPS, MPS, Book Value), Post-Merger EPS & MPS, Synergy Valuation, Cash vs Stock Offers, LBOs, Demergers, Slump Sale, Takeover Defenses"
  },
  {
    topicId: 9,
    topicTitle: "Business Valuation Methods",
    shortTitle: "Business Valuation Methods",
    fileName: "topic_9_business_valuation.json",
    syllabus: "Asset-Based NAV, Earnings Capitalization, DCF (FCFF & FCFE, Terminal Value), EV Multiples (EV/EBITDA), EVA, MVA, Brand Valuation & Start-up Valuation"
  },
  {
    topicId: 10,
    topicTitle: "Financial Services and Capital Markets",
    shortTitle: "Financial Services & Capital Markets",
    fileName: "topic_10_financial_services_markets.json",
    syllabus: "Securitization (PTCs, Tranching), Lease vs Buy (NAL, BELR), Hire Purchase, Merchant Banking, Underwriting Devolvement, VC/PE Valuation & Ratings"
  },
  {
    topicId: 11,
    topicTitle: "Strategic Financial Decision-Making and Financial Modelling",
    shortTitle: "Strategic Financial Decision-Making",
    fileName: "topic_11_strategic_financial_modelling.json",
    syllabus: "Shareholder Value Creation (SVA, Marakon), Sustainable Growth Rate (SGR), Life Cycle Financial Strategy, Altman Z-Score, Financial Modelling & Simulation"
  }
];

console.log('AFM topics count:', AFM_TOPICS.length);
module.exports = { AFM_TOPICS };

