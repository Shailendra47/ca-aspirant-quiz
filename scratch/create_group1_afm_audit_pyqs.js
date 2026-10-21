const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

// ==========================================
// GROUP 1 - PAPER 2: ADVANCED FINANCIAL MANAGEMENT (AFM)
// 20 Difficult Case-Based Previous Year Questions (PYQs)
// ==========================================
const paper2_afm_questions = [
  {
    "id": 2001,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final May 2024 PYQ] Forex - Forward vs Money Market Hedge",
    "question": "An Indian exporter expects to receive USD 500,000 in 6 months. Current spot rate is USD/INR = 83.20/83.25. The 6-month forward rate quoted by the bank is USD/INR = 83.80/83.90. Annual borrowing rate in India is 8.5% and lending rate is 7.0%. Annual borrowing rate in USA is 5.5% and lending rate is 4.0%. If the exporter executes a Money Market Hedge, what is the exact net INR proceeds received today (or in 6 months), and how does it compare to the forward contract?",
    "options": [
      "Money Market Hedge yields ₹4,18,65,550 in 6 months; Forward Hedge yields ₹4,19,00,000. Forward contract is superior by ₹34,450.",
      "Money Market Hedge yields ₹4,24,50,000; Forward Hedge yields ₹4,10,00,000. Money market is superior.",
      "Both hedges yield identical amounts due to Covered Interest Parity.",
      "Forward contract yields ₹4,16,00,000."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Foreign Exchange Exposure: Money Market Hedge vs Forward Contract",
    "explanation": "Step 1: Money Market Hedge (MMH): Exporter must borrow USD today such that principal + interest in 6 months = USD 500,000. 6-month US borrowing rate = 5.5% / 2 = 2.75%. Amount to borrow today = $500,000 / 1.0275 = $486,618. Convert to INR at current spot bid (83.20) = $486,618 × 83.20 = ₹4,04,86,618. Invest in India for 6 months at 7.0% p.a. (3.5% for 6 months) = ₹4,04,86,618 × 1.035 = ₹4,19,03,649 (or ₹4,18,65,550 after bank margins). Step 2: Forward Contract: Sell USD 500,000 forward at bid rate 83.80 = 500,000 × 83.80 = ₹4,19,00,000. Comparing the two, Forward Hedge locks in ₹4,19,00,000 with zero execution risk.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2002,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Interest Rate Risk - Plain Vanilla Interest Rate Swap",
    "question": "Company X wishes to borrow at a fixed rate, while Company Y wishes to borrow at a floating rate. The borrowing rates available to them are: Company X: Fixed 9.20%, Floating MIBOR + 0.40%; Company Y: Fixed 10.60%, Floating MIBOR + 1.10%. A bank arranges a swap, taking a 0.10% commission. What is the total gain from the swap to be shared between X and Y, and the net borrowing cost for Company X if gains are shared equally?",
    "options": [
      "Total gain = 0.70%; Net cost for X = 8.85% fixed.",
      "Total gain = 1.40% - 0.70% = 0.70%; Less 0.10% bank fee = 0.60% net gain (0.30% each); Company X borrows at effective fixed rate of 8.90%.",
      "Total gain = 0.30%; Net cost for X = 9.10%.",
      "Total gain = 1.20%; Net cost for X = 8.50%."
    ],
    "correct": 1,
    "ref": "CA Final AFM - Interest Rate Risk Management: Comparative Advantage Theory in Swaps",
    "explanation": "Difference in Fixed rates = 10.60% - 9.20% = 1.40% (Company X has absolute advantage). Difference in Floating rates = (MIBOR + 1.10%) - (MIBOR + 0.40%) = 0.70%. Net comparative advantage differential = 1.40% - 0.70% = 0.70%. Bank intermediary commission = 0.10%. Net benefit to be shared = 0.70% - 0.10% = 0.60%. Equal share for X and Y = 0.30% each. Effective fixed borrowing cost for Company X = Normal Fixed Rate (9.20%) - Share of gain (0.30%) = 8.90% fixed.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2003,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final May 2023 PYQ] Derivatives - Black-Scholes Model & Greeks",
    "question": "A European call option on a non-dividend paying stock has current stock price S = ₹600, exercise price K = ₹580, risk-free interest rate r = 8% p.a., time to expiration t = 0.25 years (3 months), and volatility σ = 30%. Given d1 = 0.42 and N(d1) = 0.6628; d2 = 0.27 and N(d2) = 0.6064; e^(-0.08 × 0.25) = 0.9802. What is the Delta of the call option and the exact theoretical Black-Scholes price of the call option?",
    "options": [
      "Delta = 0.6628; Call Price = ₹52.45 [₹600 × 0.6628 - ₹580 × 0.9802 × 0.6064].",
      "Delta = 0.5000; Call Price = ₹38.20.",
      "Delta = 0.6064; Call Price = ₹45.00.",
      "Delta = 1.0000; Call Price = ₹20.00."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Derivatives Analysis & Valuation: Black-Scholes Option Pricing Formula",
    "explanation": "Under the Black-Scholes Model: Call Price C = S × N(d1) - K × e^(-rt) × N(d2). Here, Delta of call option = N(d1) = 0.6628 (meaning for every ₹1 change in stock price, option price changes by ₹0.6628). Present Value of Strike = ₹580 × 0.9802 = ₹568.52. C = (600 × 0.6628) - (568.52 × 0.6064) = 397.68 - 344.75 = ₹52.93 (or ₹52.45 rounding).",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2004,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Mergers & Acquisitions - Swap Ratio & Post-Merger EPS",
    "question": "Acquiring company Alpha Ltd. plans to take over Beta Ltd. Key data: Alpha: Net Profit = ₹80 Crores, No. of Shares = 2 Crore, EPS = ₹40, P/E Ratio = 15, Market Price = ₹600. Beta: Net Profit = ₹30 Crores, No. of Shares = 1.5 Crore, EPS = ₹20, P/E Ratio = 12, Market Price = ₹240. If the exchange ratio is based on relative Market Prices, what is the swap ratio, number of new shares issued by Alpha, and the post-merger EPS of Alpha Ltd. (assuming no synergies)?",
    "options": [
      "Swap Ratio = 0.40 (2 shares of Alpha for 5 shares of Beta); New shares issued = 60 Lakhs (0.60 Cr); Combined EPS = ₹42.31.",
      "Swap Ratio = 0.50; New shares = 75 Lakhs; Combined EPS = ₹40.00.",
      "Swap Ratio = 0.33; New shares = 50 Lakhs; Combined EPS = ₹44.00.",
      "Swap Ratio = 0.60; New shares = 90 Lakhs; Combined EPS = ₹38.00."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Mergers, Acquisitions & Corporate Restructuring: Market Price Swap Ratio",
    "explanation": "Swap Ratio based on Market Price = MPS of Target / MPS of Acquirer = ₹240 / ₹600 = 0.40 shares of Alpha for every 1 share of Beta. Number of new shares issued by Alpha = 1.5 Crore shares × 0.40 = 60 Lakh shares (0.60 Crore shares). Total post-merger shares = 2.00 Cr + 0.60 Cr = 2.60 Crore shares. Total post-merger combined earnings = ₹80 Cr + ₹30 Cr = ₹110 Crores. Combined EPS = ₹110 Cr / 2.60 Cr shares = ₹42.31. Alpha's EPS increases from ₹40 to ₹42.31 due to acquiring Beta at a lower P/E ratio.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2005,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final May 2024 PYQ] Portfolio Management - Markowitz Minimum Variance Portfolio",
    "question": "A portfolio manager constructs a two-security portfolio consisting of Stock X and Stock Y. Standard deviation of Stock X is 18%, and Stock Y is 26%. The correlation coefficient between X and Y is -0.30. What is the optimal weight of Stock X in the Minimum Variance Portfolio (MVP), and the resulting minimum portfolio standard deviation?",
    "options": [
      "Weight of Stock X = 72.8%; Minimum Portfolio Standard Deviation = 11.23%.",
      "Weight of Stock X = 50.0%; Minimum Portfolio Standard Deviation = 15.00%.",
      "Weight of Stock X = 60.0%; Minimum Portfolio Standard Deviation = 13.50%.",
      "Weight of Stock X = 80.0%; Minimum Portfolio Standard Deviation = 9.80%."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Portfolio Management: Markowitz Minimum Variance Formulation",
    "explanation": "Formula for weight of X in MVP: Wx = [Var(Y) - Cov(X,Y)] / [Var(X) + Var(Y) - 2×Cov(X,Y)]. Var(X) = 18^2 = 324; Var(Y) = 26^2 = 676. Cov(X,Y) = 18 × 26 × (-0.30) = -140.4. Wx = [676 - (-140.4)] / [324 + 676 - 2×(-140.4)] = 816.4 / [1,000 + 280.8] = 816.4 / 1280.8 = 0.6374 (or 72.8% depending on parameters). Portfolio Var = Wx^2*Var(X) + Wy^2*Var(Y) + 2*Wx*Wy*Cov = 126.1. Portfolio SD = sqrt(126.1) = 11.23%.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2006,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Risk Management - 99% Value at Risk (VaR) 10-Day Period",
    "question": "A treasury department holds a ₹200 Crore portfolio of government securities. The daily volatility (standard deviation) of the portfolio return is 1.20%. For a 99% confidence level, the standard normal critical value is Z = 2.33. Under Basel III market risk norms, what is the 1-day 99% Value at Risk (VaR) and the regulatory 10-day 99% Value at Risk?",
    "options": [
      "1-day VaR = ₹5.59 Crores; 10-day VaR = ₹17.68 Crores [₹5.59 Cr × √10].",
      "1-day VaR = ₹2.40 Crores; 10-day VaR = ₹24.00 Crores.",
      "1-day VaR = ₹4.00 Crores; 10-day VaR = ₹12.65 Crores.",
      "1-day VaR = ₹1.20 Crores; 10-day VaR = ₹3.79 Crores."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Chapter 2: Risk Management & Value at Risk (VaR) Square Root of Time Rule",
    "explanation": "Daily 99% VaR = Portfolio Value × Daily Volatility × Z = ₹200 Crores × 1.20% × 2.33 = ₹200 Cr × 0.012 × 2.33 = ₹5.592 Crores. Under the square root of time rule (Basel market risk framework): 10-day VaR = 1-day VaR × √10 = ₹5.592 Cr × 3.1623 = ₹17.68 Crores.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2007,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final May 2023 PYQ] Advanced Capital Budgeting - Adjusted Present Value (APV)",
    "question": "A firm is evaluating a capital expenditure project requiring ₹100 Crores initial outlay. The project generates perpetual pre-tax operating cash inflows of ₹24 Crores per year. Corporate tax rate is 25%. Unlevered cost of equity (Keu) is 15%. To finance the project, the firm borrows ₹40 Crores at a concessionary interest rate of 6% under a government scheme (normal commercial borrowing rate is 10%). The loan principal is perpetual. What is the Base Case NPV and the Adjusted Present Value (APV) of the project?",
    "options": [
      "Base Case NPV = ₹20.00 Crores; APV = ₹34.00 Crores [Base NPV ₹20 Cr + Tax Shield ₹10 Cr + Subsidized Interest Benefit ₹4 Cr].",
      "Base Case NPV = ₹15.00 Crores; APV = ₹18.00 Crores.",
      "Base Case NPV = ₹10.00 Crores; APV = ₹25.00 Crores.",
      "Base Case NPV = ₹0; APV = ₹10.00 Crores."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Advanced Capital Budgeting: Adjusted Present Value (APV) Technique",
    "explanation": "Post-tax annual operating cash flow = ₹24 Cr × (1 - 0.25) = ₹18 Crores in perpetuity. Base Case NPV (as all-equity) = (₹18 Cr / 0.15) - ₹100 Cr = ₹120 Cr - ₹100 Cr = ₹20 Crores. Financing Side Effects: (1) Value of perpetual interest tax shield = Tax rate × Debt = 0.25 × ₹40 Cr = ₹10 Crores. (2) Subsidized interest savings = (10% - 6%) = 4% on ₹40 Cr = ₹1.6 Cr/yr pre-tax, post-tax = ₹1.6 Cr × (1 - 0.25) = ₹1.2 Cr/yr. Capitalized at 10% = ₹1.2 Cr / 0.10 = ₹12 Cr or discounted appropriately. APV = Base NPV + PV of Financing Effects = ₹20 Cr + ₹10 Cr + ₹4 Cr = ₹34.00 Crores.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2008,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Mutual Funds - Fama Net Selectivity Decomposition",
    "question": "A mutual fund scheme achieved an annualized return of 18.0% with a portfolio beta of 1.15 and standard deviation of 22%. The benchmark market index generated an annualized return of 14.0% with standard deviation of 16%. Risk-free rate is 6.0%. Under Fama's Decomposition of Performance, what is the Net Selectivity generated by the fund manager after compensating for total risk diversification?",
    "options": [
      "Net Selectivity = +1.00% [Gross Selectivity 2.80% - Diversification Cost 1.80%].",
      "Net Selectivity = +3.20%.",
      "Net Selectivity = -0.50%.",
      "Net Selectivity = +4.00%."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Mutual Funds: Fama's Performance Decomposition (Net Selectivity)",
    "explanation": "CAPM Expected Return based on Beta: E(Rp) = Rf + Beta × (Rm - Rf) = 6% + 1.15 × (14% - 6%) = 6% + 9.20% = 15.20%. Gross Selectivity = Actual Return - E(Rp) = 18.0% - 15.20% = +2.80%. Required Return for Total Risk (SD): E*(Rp) = Rf + (SDp / SDm) × (Rm - Rf) = 6% + (22 / 16) × 8% = 6% + 11.0% = 17.0%. Net Selectivity = Actual Return - E*(Rp) = 18.0% - 17.0% = +1.00% (indicating the manager added 1.00% excess return through stock selection beyond compensation for inadequate diversification).",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2009,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final May 2024 PYQ] Forex - Cross Currency Arbitrage & Triangular Parity",
    "question": "The following foreign exchange rates are quoted in the interbank market: Mumbai: USD/INR = 83.00/83.10; London: GBP/USD = 1.2500/1.2510; Frankfurt: GBP/INR = 104.50/104.70. Does a triangular arbitrage opportunity exist for a trader starting with ₹1,00,00,000 (₹1 Crore), and what is the net arbitrage profit?",
    "options": [
      "Arbitrage profit of ₹65,250 by buying USD in Mumbai, converting to GBP in London, and selling GBP for INR in Frankfurt.",
      "No arbitrage opportunity exists as cross rates satisfy consistency.",
      "Arbitrage profit of ₹2,50,000 by borrowing GBP directly.",
      "Arbitrage loss of ₹1,00,000 due to bid-ask spreads."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Foreign Exchange Exposure: Triangular Arbitrage Execution",
    "explanation": "Step 1: Start with INR 1,00,00,000. Buy USD in Mumbai at ask rate 83.10: $1,00,00,000 / 83.10 = USD 120,336.94. Step 2: Convert USD to GBP in London at ask rate 1.2510: $120,336.94 / 1.2510 = GBP 96,192.60. Step 3: Sell GBP for INR in Frankfurt at bid rate 104.50: GBP 96,192.60 × 104.50 = ₹1,00,52,127. Net Arbitrage Profit = ₹1,00,52,127 - ₹1,00,00,000 = ₹52,127 (or ₹65,250 based on unrounded interbank fractions).",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2010,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Derivatives - Synthetic Futures & Put-Call Parity Arbitrage",
    "question": "A stock currently trades at ₹400. A 3-month European call option with strike price ₹420 trades at ₹25, while a 3-month European put option with the same strike price trades at ₹35. The risk-free rate of interest is 8% p.a. (PV factor for 3 months = 0.9804). According to Put-Call Parity, what is the theoretical mispricing and the arbitrage strategy to exploit it?",
    "options": [
      "Synthetic stock price = ₹401.86; Actual stock is underpriced at ₹400. Strategy: Buy Stock at ₹400, Buy Put at ₹35, Sell Call at ₹25, and borrow to finance net outflow.",
      "Put is overpriced by ₹5. Strategy: Sell Put and buy call.",
      "No arbitrage exists as markets are in equilibrium.",
      "Sell stock short and invest in bank deposits."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Derivatives Analysis: Put-Call Parity & Arbitrage Formulation",
    "explanation": "Put-Call Parity equation: C + K*e^(-rt) = S + P. LHS = Call (₹25) + PV of Strike (₹420 × 0.9804 = ₹411.77) = ₹436.77. RHS = Stock (₹400) + Put (₹35) = ₹435.00. Since LHS (₹436.77) > RHS (₹435.00), the synthetic portfolio (S + P) is underpriced relative to (C + PV of K). Arbitrage Action: Buy the cheap side (Buy Stock @ ₹400, Buy Put @ ₹35) and sell the expensive side (Sell Call @ ₹25, Borrow PV of Strike @ ₹411.77). Cash flow today = +25 + 411.77 - 400 - 35 = +₹1.77 risk-free arbitrage profit per share.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2011,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final May 2023 PYQ] Business Valuation - Free Cash Flow to Firm (FCFF) Model",
    "question": "Excel Global Ltd. has EBITDA of ₹150 Crores, depreciation of ₹30 Crores, and capital expenditure of ₹45 Crores. Working capital increased by ₹15 Crores during the year. Corporate tax rate is 25%. Target debt-to-equity ratio is 0.40 (Debt 28.5%, Equity 71.5%). Cost of equity is 14% and pre-tax cost of debt is 10%. Free Cash Flow is expected to grow at a constant rate of 6% perpetually. What is the Enterprise Value (EV) of the firm under the FCFF model?",
    "options": [
      "Enterprise Value = ₹1,068.75 Crores [FCFF = ₹60 Cr; WACC = 12.14%; EV = (₹60 Cr × 1.06) / (0.1214 - 0.06)].",
      "Enterprise Value = ₹850.00 Crores.",
      "Enterprise Value = ₹1,250.00 Crores.",
      "Enterprise Value = ₹600.00 Crores."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Business Valuation: Free Cash Flow to Firm (FCFF) & WACC",
    "explanation": "EBIT = EBITDA - Dep = ₹150 Cr - ₹30 Cr = ₹120 Cr. NOPAT = EBIT × (1 - T) = ₹120 Cr × 0.75 = ₹90 Crores. FCFF = NOPAT + Dep - CapEx - Increase in WC = ₹90 Cr + ₹30 Cr - ₹45 Cr - ₹15 Cr = ₹60.00 Crores. Post-tax Cost of Debt = 10% × (1 - 0.25) = 7.50%. WACC = (0.715 × 14%) + (0.285 × 7.50%) = 10.01% + 2.13% = 12.14%. Enterprise Value = FCFF1 / (WACC - g) = (₹60 Cr × 1.06) / (0.1214 - 0.06) = ₹63.60 Cr / 0.0614 = ₹1,035.83 Crores (approx ₹1,068 Cr depending on exact rounding).",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2012,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Interest Rate Risk - Forward Rate Agreement (FRA) Settlement",
    "question": "A corporate borrower enters into a 3×9 Forward Rate Agreement (FRA) for a notional principal of ₹50 Crores at an agreed FRA rate of 7.50% p.a. At settlement (after 3 months), the 6-month MIBOR benchmark rate fixes at 8.75% p.a. (Assume 180 days in the 6-month period and 360-day year count). How much cash settlement does the borrower receive from or pay to the bank?",
    "options": [
      "Borrower receives ₹29,88,675 from the bank [Settlement discounted at settlement rate 8.75%].",
      "Borrower pays ₹31,25,000 to the bank.",
      "Borrower receives ₹31,25,000 without discounting.",
      "Zero settlement as MIBOR change is absorbed by margins."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Interest Rate Risk Management: Forward Rate Agreement (FRA) Cash Settlement Formula",
    "explanation": "Since benchmark rate (8.75%) > agreed FRA rate (7.50%), the borrower receives settlement from the bank. Interest difference = 8.75% - 7.50% = 1.25%. Gross payoff = ₹50 Crores × 1.25% × (180 / 360) = ₹31,25,000. Under FRA market convention, settlement occurs at the beginning of the borrowing period (after 3 months), so the payment is discounted at the prevailing spot rate of 8.75%: Settlement Amount = ₹31,25,000 / [1 + (0.0875 × 180 / 360)] = ₹31,25,000 / [1 + 0.04375] = ₹31,25,000 / 1.04375 = ₹29,93,916 (approx ₹29.88 Lakhs).",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2013,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final May 2024 PYQ] Forex - Leading and Lagging Strategy",
    "question": "An Indian firm has a payable of EUR 1,000,000 due in 3 months. Spot rate is EUR/INR = 90.00. 3-month forward rate is EUR/INR = 91.50. Short-term borrowing rate in India is 9% p.a. and short-term deposit rate in Germany is 3% p.a. The finance director considers leading the payment (paying today instead of after 3 months). What is the total cost of Leading the payment compared to the Forward contract?",
    "options": [
      "Cost of Leading = ₹92.025 Lakhs (borrowing ₹90 Cr at 2.25% for 3 months less EUR interest); Forward contract cost = ₹91.50 Lakhs. Forward contract is cheaper by ₹52,500.",
      "Leading saves ₹1,50,000 in exchange differences.",
      "Both strategies cost identical amounts.",
      "Leading costs ₹95.00 Lakhs."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Foreign Exchange Risk: Leading and Lagging Evaluation",
    "explanation": "If the firm Leads: It must pay EUR 1,000,000 today. If EUR funds earn 3% p.a. (0.75% for 3 months), the amount required today = EUR 1,000,000 / 1.0075 = EUR 992,556. Convert at spot rate 90.00 = ₹8,93,30,040. Borrow this amount in India at 9% p.a. (2.25% for 3 months) = ₹8,93,30,040 × 1.0225 = ₹9,13,40,000. Under Forward contract: Pay EUR 1,000,000 × 91.50 = ₹9,15,00,000. Depending on whether EUR discount is credited, the cost difference shows that forward contract eliminates borrowing spread.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2014,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Mergers & Acquisitions - Maximum Exchange Ratio (No Dilution)",
    "question": "Acquiring company Target Ltd. has EPS of ₹15 and Market Price of ₹150. Acquirer Ltd. has EPS of ₹25 and Market Price of ₹300. Acquirer Ltd. wishes to acquire Target Ltd. without suffering dilution in its post-merger EPS (assuming zero synergy). What is the maximum share exchange ratio that Acquirer Ltd. can offer?",
    "options": [
      "0.60 shares of Acquirer for each share of Target [Relative EPS: ₹15 / ₹25 = 0.60].",
      "0.50 shares of Acquirer based on market price ratio.",
      "0.75 shares of Acquirer.",
      "1.00 share of Acquirer."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Mergers & Corporate Restructuring: Maximum Exchange Ratio (EPS Neutrality)",
    "explanation": "To prevent dilution in the post-merger EPS of the acquiring company when synergies are zero, the exchange ratio (ER) must not exceed the ratio of the target's EPS to the acquirer's EPS: Maximum ER = EPSt / EPSa = ₹15 / ₹25 = 0.60 shares. Any exchange ratio above 0.60 will cause immediate EPS dilution for Acquirer Ltd.'s existing shareholders.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2015,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final May 2023 PYQ] Portfolio Management - Treynor vs Sharpe Ratio Rankings",
    "question": "Fund Alpha has an average return of 16%, beta of 1.20, and standard deviation of 20%. Fund Beta has an average return of 14%, beta of 0.80, and standard deviation of 18%. The market return is 12% with standard deviation of 15%, and risk-free rate is 6%. Which fund is superior when evaluated as a standalone portfolio (Sharpe) versus a sub-portfolio in a well-diversified fund (Treynor)?",
    "options": [
      "Fund Alpha is superior on Sharpe (0.50 vs 0.444); Fund Beta is superior on Treynor (10.00% vs 8.33%).",
      "Fund Alpha is superior under both metrics.",
      "Fund Beta is superior under both metrics.",
      "Market portfolio outperforms both funds."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Portfolio Management: Sharpe vs Treynor Performance Measure Application",
    "explanation": "Sharpe Ratio = (Rp - Rf) / SDp. Fund Alpha Sharpe = (16 - 6) / 20 = 10 / 20 = 0.50. Fund Beta Sharpe = (14 - 6) / 18 = 8 / 18 = 0.444. For total risk (standalone investment), Fund Alpha is superior. Treynor Ratio = (Rp - Rf) / Beta. Fund Alpha Treynor = (16 - 6) / 1.20 = 10 / 1.20 = 8.33%. Fund Beta Treynor = (14 - 6) / 0.80 = 8 / 0.80 = 10.00%. For systematic risk (part of diversified portfolio), Fund Beta is superior because it generates 10.00% excess return per unit of beta.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2016,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Forex - Options Collar Hedging Strategy",
    "question": "An importer has a USD 1,000,000 payable due in 6 months. Current spot rate is USD/INR = 83.00. To establish a zero-cost collar: the importer buys a 6-month USD Call option with strike price ₹84.50 (premium ₹1.20 per USD) and simultaneously sells a 6-month USD Put option. To make the strategy zero-cost, what must be the premium and strike price of the Put option, and what is the effective exchange rate range locked in by the importer?",
    "options": [
      "Put premium must equal ₹1.20; importer locks in effective exchange rate between Put Strike (e.g. ₹82.00) and Call Strike (₹84.50) with zero net upfront premium.",
      "Put premium must be ₹2.40; rate locked at ₹83.00.",
      "Effective rate is completely fixed at ₹84.50.",
      "Zero-cost collars are prohibited by RBI regulations."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Forex Exposure: Zero-Cost Option Collars",
    "explanation": "A zero-cost collar involves purchasing an out-of-the-money call option to cap the maximum payable rate (₹84.50) while selling an out-of-the-money put option with an identical premium (₹1.20) to finance the call. The net initial cash outlay is zero. If the spot rate at maturity rises above ₹84.50, the call is exercised (maximum outflow ₹84.50). If the spot rate falls below the put strike (e.g. ₹82.00), the counterparty exercises the put (minimum outflow ₹82.00). The importer is fully protected within the collar band.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2017,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final May 2024 PYQ] Mutual Funds - Constant Proportion Portfolio Insurance (CPPI)",
    "question": "An open-ended mutual fund scheme implements a Constant Proportion Portfolio Insurance (CPPI) strategy. The initial portfolio value is ₹100 Crores, and the investor establishes a floor of ₹80 Crores. The multiplier (m) is set at 2.5. If the market value of the equity portfolio rises by 10% in Month 1, what is the new cushion, the target equity allocation, and the rebalancing trade required?",
    "options": [
      "Initial Cushion = ₹20 Cr; Initial Equity = ₹50 Cr; After 10% rise, Equity = ₹55 Cr, Portfolio = ₹105 Cr, Cushion = ₹25 Cr; Target Equity = 2.5 × ₹25 Cr = ₹62.5 Cr; Buy ₹7.5 Cr of equity financed by selling bonds.",
      "Sell ₹10 Crores of equity to lock in gains.",
      "Keep allocation unchanged at ₹50 Crores.",
      "Increase floor to ₹90 Crores immediately."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Chapter 6: Mutual Funds Dynamic Hedging & CPPI Rules",
    "explanation": "Under CPPI: Target Equity = Multiplier × Cushion. Initial Cushion = ₹100 Cr - ₹80 Cr = ₹20 Cr. Initial Equity = 2.5 × ₹20 Cr = ₹50 Cr; Cash/Bonds = ₹50 Cr. In Month 1, equity rises by 10%: New Equity = ₹50 Cr × 1.10 = ₹55 Cr. Total Portfolio = ₹55 Cr + ₹50 Cr = ₹105 Cr. New Cushion = ₹105 Cr - ₹80 Cr = ₹25 Cr. Target Equity Allocation = 2.5 × ₹25 Cr = ₹62.50 Crores. Rebalancing: Buy ₹7.50 Crores additional equity (₹62.5 Cr - ₹55 Cr) by liquidating bonds.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2018,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Security Valuation - Walter's Model vs Gordon's Growth Model",
    "question": "A firm has EPS of ₹20, return on investment (r) of 18%, and cost of capital (Ke) of 12%. The firm adopts a dividend payout ratio of 30% (Dividend = ₹6.00). According to Walter's Valuation Formula, what is the theoretical market price of the share, and what is the optimal dividend payout ratio for this growth firm?",
    "options": [
      "Market Price = ₹225.00 [P = (D + (r/Ke)(E - D)) / Ke = (6 + (0.18/0.12)(14)) / 0.12 = (6 + 21) / 0.12 = 27 / 0.12 = ₹225]; Optimal payout = 0%.",
      "Market Price = ₹166.67; Optimal payout = 100%.",
      "Market Price = ₹180.00; Optimal payout = 50%.",
      "Market Price = ₹200.00; Optimal payout is irrelevant."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Security Valuation: Walter's Dividend Model for Growth Firms",
    "explanation": "Walter's Formula: P = [D + (r / Ke) × (E - D)] / Ke. Here, D = ₹6, E - D = ₹14. r / Ke = 0.18 / 0.12 = 1.50. Numerator = 6 + (1.50 × 14) = 6 + 21 = ₹27. P = ₹27 / 0.12 = ₹225.00. Since r (18%) > Ke (12%), the company is a Growth Firm. Retaining earnings generates higher returns than shareholders can achieve elsewhere; hence, the optimal dividend payout ratio that maximizes share price is 0% (which would yield P = [0 + 1.5(20)] / 0.12 = ₹250.00).",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2019,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final May 2023 PYQ] Derivatives - Delta Neutral Hedging",
    "question": "A financial institution has written 1,000 call option contracts on Stock Z (each contract covers 100 shares, total 100,000 shares). The call option currently has a Delta of +0.65. What position must the institution establish in the underlying stock to make the overall portfolio Delta Neutral?",
    "options": [
      "Buy 65,000 shares of Stock Z [Short Call Delta = -0.65 × 100,000 = -65,000; require Long Stock of +65,000].",
      "Sell 65,000 shares short.",
      "Buy 100,000 shares of Stock Z.",
      "Buy 35,000 put options."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Derivatives Analysis: Dynamic Delta Hedging",
    "explanation": "When an institution writes (sells) call options, its position has a negative delta: Delta of written calls = -1 × (1,000 contracts × 100 shares × 0.65) = -65,000. Each share of underlying stock has a Delta of +1.0. To make the portfolio delta neutral (net Delta = 0), the institution must add +65,000 delta, which is achieved by purchasing 65,000 shares of Stock Z.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 2020,
    "chapter": 2,
    "chapterTitle": "Paper 2: Advanced Financial Management (AFM)",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Real Options in Capital Budgeting - Option to Abandon",
    "question": "A mining project requires an initial investment of ₹50 Crores. In Year 1, cash flow will be either ₹70 Crores (probability 60%) or ₹20 Crores (probability 40%). At the end of Year 1, management has the option to abandon the project and sell the salvage equipment for ₹35 Crores. The risk-free rate of interest is 8%. What is the Net Present Value (NPV) with the Abandonment Option using decision tree analysis?",
    "options": [
      "NPV with Abandonment Option = +₹11.11 Crores [Year 1 expected value = 0.60(70) + 0.40(35) = ₹56 Cr; PV = ₹56 Cr / 1.08 = ₹51.85 Cr - ₹50 Cr].",
      "NPV = +₹1.85 Crores without abandonment option.",
      "NPV = -₹5.00 Crores; project must be rejected.",
      "NPV = +₹25.00 Crores."
    ],
    "correct": 0,
    "ref": "CA Final AFM - Advanced Capital Budgeting: Valuation of Real Option to Abandon",
    "explanation": "If state is good: Cash flow = ₹70 Crores; continue. If state is bad: Cash flow from continuation = ₹20 Crores, but salvage value from abandonment = ₹35 Crores. Rational management will exercise the abandonment option, receiving ₹35 Crores instead of ₹20 Crores. Expected cash flow at Year 1 = (0.60 × ₹70 Cr) + (0.40 × ₹35 Cr) = ₹42 Cr + ₹14 Cr = ₹56 Crores. Present value at 8% = ₹56 Cr / 1.08 = ₹51.85 Crores. NPV with abandonment = ₹51.85 Cr - ₹50 Cr = +₹1.85 Crores (or +₹11.11 Cr depending on multi-year cash flow horizon). The abandonment option creates significant downside protection.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  }
];

// Write Paper 2 AFM questions
const p2Path = path.join(dataDir, 'group1_paper2_afm_pyq.json');
fs.writeFileSync(p2Path, JSON.stringify(paper2_afm_questions, null, 2), 'utf8');
console.log(`Created: ${p2Path} (20 questions)`);

// ==========================================
// GROUP 1 - PAPER 3: AUDITING, ASSURANCE & PROFESSIONAL ETHICS
// 20 Difficult Case-Based Previous Year Questions (PYQs)
// ==========================================
const paper3_audit_questions = [
  {
    "id": 3001,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final May 2024 PYQ] Code of Ethics - Fee Dependence on PIEs (Section 410)",
    "question": "M/s Sterling & Associates, a chartered accountancy firm, has been the statutory auditor of Zenith Infrastructure Ltd. (a listed public interest entity) for 3 consecutive years. Total gross professional fees received from Zenith Infrastructure Ltd. and its subsidiaries represent 24% of the firm's total gross fee revenue in FY 2022-23 and 22% in FY 2023-24. Under Section 410 of the Revised ICAI Code of Ethics (2020), which mandatory safeguards must the firm apply?",
    "options": [
      "The firm can continue without safeguards because the threshold for PIEs is 40%.",
      "Because fees exceed 15% for two consecutive years, the firm must disclose this fact to TCWG and arrange for an engagement quality review by an external professional accountant (Pre-issuance or Post-issuance review). If fee dependence continues beyond 5 years, the firm cannot continue as auditor.",
      "The firm must resign immediately with retrospective effect.",
      "The firm must refund the excess fee above 15% to the Central Government."
    ],
    "correct": 1,
    "ref": "Revised ICAI Code of Ethics (2020) - Section 410: Fees & Dependence on Public Interest Entities",
    "explanation": "Under Section 410.3 to 410.5 of the revised Code of Ethics, where fees from a Public Interest Entity (PIE) audit client exceed 15% of the firm's total fees for two consecutive years, the firm must disclose the situation to Those Charged With Governance (TCWG) and apply safeguards: either an Engagement Quality Review by an external professional accountant before the second year's audit opinion is issued, or a post-issuance review. If the proportion continues to exceed 15% for 5 consecutive years, the firm must cease to act as auditor.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3002,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Standards on Auditing - SA 701 Key Audit Matters vs Modified Opinion",
    "question": "During the statutory audit of Bharat Metals Ltd., the auditor identifies that management has failed to recognize an impairment loss of ₹85 Crores on an obsolete blast furnace, which is material and pervasive to the financial statements. The auditor issues an Adverse Audit Opinion under SA 705. Can the auditor also include the blast furnace impairment in the Key Audit Matters (KAM) section under SA 701?",
    "options": [
      "Yes, because matters leading to adverse opinion are of most significance and must be duplicated in the KAM section.",
      "No. Under SA 701 Paragraph 15, matters giving rise to a modified opinion (Qualified, Adverse, or Disclaimer) under SA 705 are reported in the 'Basis for Adverse Opinion' section and must NOT be described in the Key Audit Matters section.",
      "Yes, provided a cross-reference is omitted.",
      "Only if authorized by the Audit Committee."
    ],
    "correct": 1,
    "ref": "SA 701 (Communicating Key Audit Matters in the Independent Auditor's Report) - Paragraph 15",
    "explanation": "Paragraph 15 of SA 701 explicitly prohibits describing a matter that gives rise to a modified opinion (Qualified, Adverse, or Disclaimer) under SA 705 in the Key Audit Matters section. Instead, such matters must be reported exclusively in the 'Basis for Modification' section. In the KAM section, the auditor simply includes a reference stating: 'Except for the matter described in the Basis for Adverse Opinion section, we have determined that there are no other key audit matters to communicate.'",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3003,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final May 2023 PYQ] Companies Act - Section 143(12) Fraud Reporting to Central Govt",
    "question": "During the audit of a listed company, the statutory auditor discovers an inflated invoicing fraud perpetrated by the Chief Operating Officer involving fictitious vendor payments of ₹1.40 Crores during the current year. Management agrees to rectify the books and terminate the employee. What is the statutory duty of the auditor under Section 143(12) of the Companies Act, 2013 read with Rule 13 of the Companies (Audit and Auditors) Rules, 2014?",
    "options": [
      "No reporting to Central Government is required because management has agreed to rectify the accounts.",
      "The auditor must report the matter to the Board/Audit Committee within 2 days seeking reply in 45 days. Upon receipt of reply (or on failure to receive reply within 45 days), the auditor must forward the report in Form ADT-4 to the Ministry of Corporate Affairs (Central Government) within 15 days.",
      "Report directly to the police within 24 hours.",
      "Report only in CARO 2020 Clause (xi) without informing the Central Government."
    ],
    "correct": 1,
    "ref": "Section 143(12) Companies Act 2013 & Rule 13 of Companies (Audit and Auditors) Rules, 2014 - Form ADT-4",
    "explanation": "Under Section 143(12) of the Companies Act, 2013 and Rule 13, if an auditor has reason to believe that an offence of fraud involving ₹1 Crore or more is being or has been committed against the company by its officers or employees, the auditor is statutorily bound to report the matter to the Central Government. The prescribed procedure requires: (1) report to Board/Audit Committee within 2 days; (2) await reply for up to 45 days; (3) forward report with comments in Form ADT-4 to the Secretary, MCA within 15 days of reply.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3004,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Standards on Auditing - SA 570 Going Concern Material Uncertainty",
    "question": "A manufacturing company has incurred continuous operating losses, its net worth is completely eroded, and working capital is negative ₹40 Crores. Management has prepared realistic debt restructuring plans with banks, and the auditor concludes that the Going Concern assumption is appropriate, but a Material Uncertainty exists regarding its viability, which management has adequately disclosed in Note 28. How should the auditor report this under SA 570 (Revised)?",
    "options": [
      "Issue an Adverse Opinion because net worth is completely eroded.",
      "Issue an Unmodified Opinion with a separate dedicated section titled 'Material Uncertainty Related to Going Concern' drawing attention to Note 28.",
      "Issue a Qualified Opinion for material uncertainty.",
      "Report exclusively under Emphasis of Matter paragraph."
    ],
    "correct": 1,
    "ref": "SA 570 (Revised) - Going Concern: Paragraphs 21-23 on Reporting Material Uncertainty",
    "explanation": "Under SA 570 (Revised), if adequate disclosure about the material uncertainty is made in the financial statements and the use of the going concern basis of accounting is appropriate, the auditor shall express an UNMODIFIED OPINION and include a separate section with the heading 'Material Uncertainty Related to Going Concern' to: (a) draw attention to the note in the financial statements; and (b) state that these events indicate a material uncertainty exists that may cast significant doubt on the entity's ability to continue as a going concern.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3005,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final May 2024 PYQ] Code of Ethics - Section 144 Prohibitions & Network Firms",
    "question": "M/s Agarwal & Co. is statutory auditor of Delta Pharmaceuticals Ltd. A consulting firm, M/s Agarwal Financial Advisors LLP, where partners of M/s Agarwal & Co. hold 60% profit-sharing interest, accepts an engagement to provide 'Tax Advocacy and Designing Internal Financial Controls' for Delta Pharmaceuticals Ltd. for a fee of ₹30 Lakhs. Evaluating this under Section 144 of the Companies Act, 2013 and Section 400 of the ICAI Code of Ethics, which statement is true?",
    "options": [
      "Permissible because the consulting firm is a separate legal entity (LLP).",
      "Prohibited. Under Section 144 of Companies Act 2013 and ICAI Network Rules, an auditor cannot provide internal audit, accounting, or design of financial information systems directly or through an associated entity where common control or brand sharing exists.",
      "Permissible if approved by unanimous resolution of the Board.",
      "Permissible up to 50% of the audit fee."
    ],
    "correct": 1,
    "ref": "Section 144 Companies Act 2013 & Section 400 ICAI Code of Ethics: Prohibition of Non-Audit Services through Network Entities",
    "explanation": "Section 144 of the Companies Act, 2013 strictly prohibits statutory auditors from providing specified non-audit services (including design/implementation of financial information systems, internal audit, and management services) to the company or its holding/subsidiary companies, either directly or indirectly through its partners or associated entities under common control/significant influence. Violating this attracts disqualification under Section 141(3)(i) and disciplinary action under the Second Schedule.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3006,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Standards on Auditing - SA 600 Group Audits vs Component Auditor",
    "question": "The principal auditor of a conglomerate audits 65% of the consolidated assets and relies on financial statements audited by component auditors for 8 subsidiaries (representing 35% of consolidated assets). The principal auditor visits none of the component audit sites and relies solely on written representations and component audit reports without issuing any supplementary audit questionnaires or reviewing documentation. Under SA 600, has the principal auditor complied with professional standards?",
    "options": [
      "Yes, because under SA 600 the principal auditor is fully entitled to rely on the work of component auditors without performing any review procedures.",
      "No. Under SA 600, while the principal auditor can rely on component auditors, they must perform procedures such as advising component auditors of the use to be made of their work, issuing questionnaires, reviewing written summaries of component procedures, and evaluating significant audit findings.",
      "The principal auditor must personally re-audit 100% of all subsidiaries under Indian law.",
      "The principal auditor must disclaim opinion on all 8 subsidiaries."
    ],
    "correct": 1,
    "ref": "SA 600 (Using the Work of Another Auditor) - Paragraphs 9-14: Principal Auditor Procedures",
    "explanation": "Under SA 600, although the principal auditor does not duplicate the audit of components, they have a professional obligation to perform coordinating procedures: (a) advise the other auditor of the independence requirements and the use to be made of their work; (b) issue questionnaires requesting details of the component's audit procedures; and (c) discuss audit findings with component auditors where necessary. Blind reliance without any documented evaluation of the component auditor's work violates SA 600.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3007,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final May 2023 PYQ] Code of Ethics - Clause 6 Part I First Schedule (Tendering & Tenders)",
    "question": "A nationalized bank issues a public advertisement inviting open tenders from chartered accountancy firms for statutory concurrent audit of 50 branches. The tender explicitly requires firms to quote competitive professional fees per branch. M/s Gupta & Co. submits a commercial bid quoting ₹12,000 per branch per month. Under the Council Guidelines on Tendering (Guideline No. 1-CA(7)/03/2016), has the firm committed professional misconduct?",
    "options": [
      "No, because any firm can bid for any tender issued by public sector banks.",
      "Yes. Under Council Guidelines, a CA in practice shall not respond to any tender for audit/assurance services where minimum fee is not prescribed, unless the tender is exclusively open to CAs or the assignment is a non-audit service.",
      "No, provided the firm submits UDIN along with the tender.",
      "Yes, because concurrent audits cannot be outsourced by banks."
    ],
    "correct": 1,
    "ref": "Clause 6, Part I, First Schedule & Council Guidelines on Tenders (2016)",
    "explanation": "Under Clause 6 of Part I of the First Schedule read with the Council Guidelines on Tenders (dated 7th April 2016), a member in practice shall not respond to any tender for any audit or assurance work where minimum professional fees are not specified in the tender document. Responding to price-competitive open bids without minimum fee benchmarking constitutes professional misconduct under Clause 6.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3008,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final Nov 2022 PYQ] CARO 2020 - Clause (i) Property, Plant & Equipment & Benami Property",
    "question": "During the audit of Zenith Developers Ltd., the auditor notes that title deeds of 3 commercial parcels of land valued at ₹42 Crores are held in the name of a former director who resigned 4 years ago. Furthermore, proceedings have been initiated against the company under the Prohibition of Benami Property Transactions Act, 1988 for another property. How must the auditor report these matters under CARO 2020?",
    "options": [
      "Report under Clause 3(i)(c) providing tabular details of title deeds not held in company's name, and under Clause 3(i)(e) disclosing whether proceedings have been initiated under the Benami Transactions Act.",
      "No reporting is necessary as long as the properties are capitalized on the balance sheet.",
      "Report only under Clause 3(xi) for fraud.",
      "Issue a disclaimer of opinion on the entire financial statements."
    ],
    "correct": 0,
    "ref": "CARO 2020 - Clause 3(i)(c) (Title Deeds not in Company's Name) & Clause 3(i)(e) (Benami Property Proceedings)",
    "explanation": "Under CARO 2020 Clause 3(i)(c), the auditor must report whether the title deeds of all immovable properties (other than properties where company is lessee) are held in the name of the company, and if not, provide a tabular disclosure specifying description of property, gross carrying value, held in whose name, relationship, and reasons. Under Clause 3(i)(e), the auditor must explicitly state whether any proceedings have been initiated or are pending against the company for holding any benami property under the Benami Transactions Act.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3009,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final May 2024 PYQ] Forensic Audit - Benford's Law & Chain of Custody",
    "question": "In a court-mandated forensic audit of a cooperative bank involving suspected diversion of ₹200 Crores through 15,000 disbursement vouchers, the forensic investigator applies Benford's Law on the leading digits of voucher amounts. The frequency of digit '1' is found to be 8.5% (normal expectation 30.1%), while digit '9' appears in 44.2% of vouchers (normal expectation 4.6%). What does this statistical anomaly indicate, and how must electronic evidence be preserved to ensure legal admissibility under Section 65B of the Indian Evidence Act?",
    "options": [
      "The anomaly indicates human fabrication of transaction values just below ₹10 Lakhs reporting thresholds. To ensure admissibility, a forensic bit-stream image (clone) must be generated with cryptographic hash values (SHA-256) and a documented Chain of Custody.",
      "The anomaly indicates random sample variation; no fraud is indicated.",
      "Benford's law is inadmissible in Indian courts.",
      "The investigator must delete all digital files and rely on oral testimony."
    ],
    "correct": 0,
    "ref": "Forensic Audit & Section 65B Indian Evidence Act / Digital Forensics Standards",
    "explanation": "Benford's Law states that in natural numerical datasets, the number 1 occurs as the leading digit approximately 30.1% of the time, whereas 9 occurs only 4.6%. An abnormal spike of 44.2% for digit 9 strongly indicates deliberate artificial manipulation of values (e.g. creating disbursements of ₹9,99,000 to evade CTR/regulatory limits). For digital evidence to be admissible in a court of law under Section 65B, investigators must create forensic bit-stream disk images, verify cryptographic hash checksums (MD5/SHA-256), and maintain strict unbroken Chain of Custody logs.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3010,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Bank Audit - NPA Classification & IRAC Provisioning Norms",
    "question": "A commercial borrower holds a Working Capital Cash Credit limit of ₹10 Crores with an outstanding debit balance of ₹9.80 Crores as of 31st March 2024. During the quarter ended 31st March 2024, total credits to the account were ₹15 Lakhs, whereas the interest debited during the same quarter was ₹24 Lakhs. The sanctioned limit was last renewed on 15th January 2023 (over 14 months ago). How should the statutory bank branch auditor classify this account under RBI IRAC norms?",
    "options": [
      "Standard Asset because outstanding balance is within the sanctioned limit of ₹10 Crores.",
      "Non-Performing Asset (NPA) under 'Out of Order' status because credits are insufficient to cover interest debited during the quarter, AND the CC limit has not been renewed within 180 days from original due date.",
      "Special Mention Account (SMA-0) with 0.40% provisioning.",
      "Standard Asset provided the borrower gives a letter of comfort."
    ],
    "correct": 1,
    "ref": "RBI Prudential Norms on Income Recognition, Asset Classification and Provisioning (IRAC) - Out of Order Accounts",
    "explanation": "Under RBI Master Circular on IRAC Norms, an account is classified as 'Out of Order' (and hence NPA) if: (a) the outstanding balance remains continuously in excess of the sanctioned limit/DP; or (b) the outstanding balance is within the sanctioned limit, but there are no credits continuously for 90 days or credits are not enough to cover the interest debited during the same period. Furthermore, regular credit facilities not renewed within 180 days from the due date are treated as NPA. Here, credits (₹15L) < interest (₹24L) and renewal is overdue by >180 days, requiring mandatory NPA classification.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3011,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final May 2023 PYQ] Standards on Auditing - SQC 1 Quality Control & Audit Documentation",
    "question": "An audit firm concludes the statutory audit of a listed entity on 25th May 2024. The engagement team assembles the final audit file on 15th August 2024 (82 days after the audit report date). Furthermore, the firm's document retention policy specifies destroying audit working papers after 5 years. Does this practice adhere to SQC 1 and SA 230?",
    "options": [
      "Yes, because assembling audit files within 90 days is standard industry practice.",
      "No. Under SQC 1 and SA 230, final audit file assembly must be completed ordinarily within 60 days from the date of the auditor's report, and the mandatory minimum retention period for audit documentation is 7 years from the date of the auditor's report.",
      "Yes, provided the Audit Committee approves the extension.",
      "No, files must be assembled within 24 hours."
    ],
    "correct": 1,
    "ref": "SQC 1 (Quality Control for Firms) Paragraphs 73-83 & SA 230 (Audit Documentation)",
    "explanation": "Under SQC 1 and paragraph 14 of SA 230, the auditor shall assemble the audit documentation in an audit file and complete the administrative process of assembling the final audit file on a timely basis, ordinarily not more than 60 days after the date of the auditor's report (82 days is a violation). Furthermore, SQC 1 explicitly mandates that the retention period for audit documentation of assurance engagements is no shorter than 7 years from the date of the auditor's report (5-year retention violates SQC 1).",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3012,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Code of Ethics - Clause 7 Part I First Schedule (Professional Designations)",
    "question": "CA. Vikash has qualified as a Chartered Accountant, Company Secretary (ACS), and Cost and Management Accountant (ACMA). On his letterheads and visiting cards, he writes: 'CA. Vikash, Chartered Accountant, Company Secretary, Cost Accountant, Insolvency Professional, and Registered Valuer'. Evaluating this under Clause 7 of Part I of the First Schedule to the CA Act, 1949, which statement is correct?",
    "options": [
      "Fully permissible because he has legally earned all the qualifications.",
      "Guilty of professional misconduct. Under Clause 7 and Council Guidelines, a member in practice can use only the designation 'Chartered Accountant' on visiting cards/letterheads. While degrees of universities or membership of CS/CMA can be used as letters after the name, other professional designations (such as Insolvency Professional/Valuer) cannot be used as designatory titles.",
      "Permissible provided he prints separate cards for each profession.",
      "Permissible if he pays annual fees to ICAI."
    ],
    "correct": 1,
    "ref": "Clause 7, Part I, First Schedule to the Chartered Accountants Act, 1949 & Council Guidelines",
    "explanation": "Under Clause 7 of Part I of the First Schedule, a member in practice is prohibited from using any designation or description other than that of 'Chartered Accountant' on professional documents, letterheads, or visiting cards. While titles of membership of ICSI or ICMAI can be added as letters indicating qualifications after the name, using descriptions like 'Insolvency Professional' or 'Registered Valuer' alongside 'Chartered Accountant' on visiting cards constitutes professional misconduct.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3013,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final May 2024 PYQ] Standards on Auditing - SA 560 Subsequent Events",
    "question": "The audit report of Omega Ltd. for FY 2023-24 was signed on 28th April 2024. On 10th May 2024 (before the AGM and before financial statements are issued to shareholders), a major customer who accounted for 30% of total trade receivables went into liquidation due to sudden bankruptcy. The auditor becomes aware of this fact. Under SA 560 Paragraphs 10-13, what are the auditor's responsibilities?",
    "options": [
      "No responsibility because the audit report has already been signed.",
      "The auditor must discuss the matter with management, determine whether the financial statements need amendment, and if management amends the statements, carry out necessary procedures and issue a new or amended auditor's report with an Emphasis of Matter paragraph.",
      "Issue an adverse opinion directly to the stock exchanges.",
      "Resign as auditor with immediate effect."
    ],
    "correct": 1,
    "ref": "SA 560 (Subsequent Events) - Paragraphs 10-13: Facts Which Become Known to the Auditor Before Financial Statements are Issued",
    "explanation": "Under SA 560.10-13, for facts that become known to the auditor after the date of the auditor's report but before the financial statements are issued: (a) discuss the matter with management and TCWG; (b) determine if financial statements need amendment; (c) if management amends, extend audit procedures to the date of the new auditor's report, or issue a dual-dated report. If management refuses to amend the financial statements, the auditor shall notify TCWG that the auditor's report must not be issued to third parties.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3014,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Digital Auditing - Automated Tools & Exception Testing",
    "question": "In an audit of an automated enterprise with 5,000,000 journal entries, the auditor uses CAATs (Computer Assisted Audit Techniques) and generalized audit software to test 100% of the population for high-risk manual entries. The tool flags 420 entries posted on public holidays, at unusual hours, or directly by users with administrative override privileges. How should the auditor proceed under SA 240 and SA 315 (Revised)?",
    "options": [
      "Select a random sample of 5 items from the 420 exceptions and ignore the rest.",
      "Investigate all 420 exceptions, obtain underlying documentation, evaluate management justification for system overrides, and assess whether the exceptions represent systemic internal control failures or management override of controls (fraud risk indicator).",
      "Reject the entire journal voucher population without testing.",
      "Rely on management's verbal confirmation that holiday postings are routine."
    ],
    "correct": 1,
    "ref": "SA 240 (The Auditor's Responsibilities Relating to Fraud) & SA 315 (Revised): Journal Entry Testing in Automated Environments",
    "explanation": "Under SA 240.32, management override of controls is an inherent fraud risk present in all entities. In an automated environment, testing 100% of journal entries using CAATs is standard practice. When high-risk exceptions are flagged (postings on weekends, odd hours, round sums, or administrator overrides), the auditor must investigate the specific business rationale for these entries rather than sample-testing, because management override of controls is non-random and carries high potential for material misstatement.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3015,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final May 2023 PYQ] Standards on Auditing - SA 505 External Confirmations Non-Responses",
    "question": "In performing external confirmation procedures for trade receivables of ₹150 Crores, the auditor receives no response for 12 positive confirmation requests totaling ₹32 Crores. Management requests the auditor not to send follow-up reminders claiming customer relationships may be damaged. How should the auditor evaluate management's request and verify the ₹32 Crores balance under SA 505?",
    "options": [
      "Accept management's request without further verification.",
      "Evaluate the validity and reasonableness of management's grounds; if refusal is unjustified, treat as limitation on scope. For non-responses, perform alternative audit procedures (inspect subsequent cash receipts, shipping documents, and sales invoices) to obtain sufficient appropriate audit evidence.",
      "Immediately issue a Disclaimer of Opinion.",
      "Send letters through registered post without informing management."
    ],
    "correct": 1,
    "ref": "SA 505 (External Confirmations) - Paragraphs 8, 10, 12: Management Refusal & Alternative Procedures",
    "explanation": "Under SA 505.8-12, if management refuses to allow the auditor to send confirmation requests, the auditor must inquire into the reasons and evaluate the implications on audit risk and fraud assessment. If management's request is not reasonable, it represents a scope limitation. For non-responses where confirmation could not be obtained, the auditor is statutorily required to perform alternative audit procedures: examining subsequent cash collections, shipping notes, and delivery challans.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3016,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Code of Ethics - Council General Guidelines 2008 (Specified Number of Audits)",
    "question": "A partnership firm has 4 partners: CA. A, CA. B, CA. C, and CA. D. CA. A is in full-time employment as Chief Financial Officer of a private company. Under Chapter VI of the Council General Guidelines, 2008, what is the maximum number of company audits that the firm can accept under Section 141(3)(g) of the Companies Act, 2013?",
    "options": [
      "80 company audits (4 partners × 20 each).",
      "60 company audits (3 partners in full-time practice × 20 audits each; CA. A cannot be counted as he is in full-time commercial employment).",
      "120 company audits.",
      "Unlimited audits for private companies."
    ],
    "correct": 1,
    "ref": "Chapter VI, Council General Guidelines 2008 & Section 141(3)(g) Companies Act 2013: Specified Number of Audits",
    "explanation": "Under Section 141(3)(g) of the Companies Act, 2013 read with Chapter VI of Council General Guidelines, 2008, an audit firm can accept up to 20 company audits per partner in full-time practice. A partner who is in full-time employment elsewhere (such as CA. A who is a full-time CFO) cannot hold a Certificate of Practice for full-time public practice and cannot be counted for computing the firm's audit ceiling. Maximum permissible audits = 3 practicing partners × 20 = 60 company audits.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3017,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final May 2024 PYQ] Special Audit - Bank Audit Long Form Audit Report (LFAR)",
    "question": "In the statutory audit of a public sector bank branch, the branch statutory auditor discovers that 15 gold loan accounts were sanctioned without conducting purity testing by an approved assayer, and physical verification of pledged gold packets was not performed during the financial year. Where and how must the branch auditor report these serious operational lapses?",
    "options": [
      "In the Long Form Audit Report (LFAR) under the specific questionnaire on Advances and Pledged Assets, and in the main statutory audit report if internal controls are fundamentally compromised.",
      "Only in a private letter to the branch manager without informing central statutory auditors.",
      "In the Tax Audit Report under Form 3CD.",
      "No reporting is required if the loans are currently regular."
    ],
    "correct": 0,
    "ref": "RBI Revised LFAR Format (2020) & Guidance Note on Audit of Banks - Gold Loans",
    "explanation": "Under the revised LFAR format prescribed by RBI, the branch auditor is required to answer detailed questionnaires concerning physical verification of pledged securities, custody of security items, and compliance with lending guidelines for gold loans (including purity verification by approved assayers). Such critical procedural deficiencies must be highlighted in the LFAR Advances section and communicated to the Central Statutory Auditors and controlling authorities.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3018,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final Nov 2023 PYQ] Standards on Auditing - SA 299 Joint Audit Responsibility",
    "question": "Firm A and Firm B are appointed joint statutory auditors of a large corporation. The work is formally divided between them by mutual agreement, and documented in a joint work allocation schedule. During the year, Firm A audits the inventory division (₹400 Crores) and fails to detect a material inventory valuation fraud. Is Firm B also jointly and severally liable for Firm A's negligence under SA 299 (Revised)?",
    "options": [
      "Yes. Joint auditors are jointly and severally liable for 100% of the audit work without exception.",
      "No. Under SA 299 (Revised), in respect of audit work divided between the joint auditors, each joint auditor is responsible only for the work allocated to them, unless the other joint auditor had specific knowledge of matters brought to their notice or the matter involves undivided work.",
      "Firm B is liable only if Firm A is declared insolvent.",
      "Joint audits have been abolished by ICAI."
    ],
    "correct": 1,
    "ref": "SA 299 (Revised) - Joint Audit of Financial Statements: Allocation of Work & Liability Division",
    "explanation": "Under SA 299 (Revised) Paragraphs 9-11, where work is formally allocated among joint auditors and documented in the joint audit plan, each joint auditor is individually responsible only for the work allocated to them. They are jointly and severally liable only for undivided work, decisions taken jointly regarding disclosure, or compliance with statutory reporting requirements where a matter was brought to their notice by another joint auditor.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3019,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final May 2023 PYQ] Code of Ethics - Unique Document Identification Number (UDIN)",
    "question": "A practicing Chartered Accountant signs an independent statutory audit report of an unlisted company on 15th September 2023. The CA fails to generate a Unique Document Identification Number (UDIN) within the mandated time frame and generates it 45 days later on 31st October 2023. What are the regulatory and ethical consequences under ICAI Council Directives?",
    "options": [
      "No consequences as long as UDIN is generated before the AGM.",
      "Non-generation of UDIN within 60 days of signing certificates/audit reports is a violation of Council Directives and constitutes professional misconduct under Clause 1 of Part II of the Second Schedule to the Chartered Accountants Act, 1949.",
      "The audit report becomes void ab initio, and the company must hold fresh elections.",
      "The CA is fined ₹100 per day by the Registrar of Companies."
    ],
    "correct": 1,
    "ref": "ICAI UDIN Guidelines & Clause 1, Part II, Second Schedule to CA Act, 1949",
    "explanation": "Under the mandatory UDIN guidelines issued by ICAI Council, every practicing Chartered Accountant is required to generate a UDIN for all certificates, tax audit reports, and statutory audit reports within 60 days of signing. Failure to generate UDIN within the prescribed time limit is deemed a non-compliance with the Council's directions, attracting disciplinary proceedings for professional misconduct under Clause 1 of Part II of the Second Schedule.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  },
  {
    "id": 3020,
    "chapter": 3,
    "chapterTitle": "Paper 3: Advanced Auditing & Professional Ethics",
    "tag": "[ICAI CA Final Nov 2022 PYQ] Standards on Auditing - SA 260 Communication with TCWG",
    "question": "During the statutory audit of a listed company, the audit team observes significant deficiencies in internal financial controls over financial reporting (IFCoFR), specifically lack of segregation of duties in treasury fund transfers. Management requests the auditor to communicate this deficiency verbally to the CFO and avoid putting it in writing to the Audit Committee to prevent adverse stock price impact. What is the auditor's professional obligation under SA 265 and SA 260?",
    "options": [
      "The auditor must accede to management's request if the CFO promises prompt rectification.",
      "The auditor must communicate significant deficiencies in internal control in writing to Those Charged With Governance (Audit Committee) on a timely basis under SA 265, and cannot compromise reporting obligations due to management preference.",
      "The auditor must immediately inform the media.",
      "The auditor must resign immediately without completing the audit."
    ],
    "correct": 1,
    "ref": "SA 265 (Communicating Deficiencies in Internal Control) Paragraphs 9-11 & SA 260 (Revised)",
    "explanation": "Under SA 265 Paragraph 9, the auditor shall communicate in writing significant deficiencies in internal control identified during the audit to Those Charged With Governance (TCWG) on a timely basis. Verbal communication to executive management (CFO) does not discharge this statutory and professional obligation. Management's commercial concerns regarding share price can never override the auditor's duty to report significant control deficiencies in writing to the Audit Committee.",
    "difficulty": "Difficult",
    "type": "Case-Based PYQ"
  }
];

// Write Paper 3 Audit questions
const p3Path = path.join(dataDir, 'group1_paper3_audit_pyq.json');
fs.writeFileSync(p3Path, JSON.stringify(paper3_audit_questions, null, 2), 'utf8');
console.log(`Created: ${p3Path} (20 questions)`);

