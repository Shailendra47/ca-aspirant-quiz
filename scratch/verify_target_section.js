const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetSection = `        </div>
      </div>

        </div>
      </div>
      
      <!-- Section Title for Chapter Tests (20-20 Standard) -->
      <div class="flex items-center justify-between mb-4 pt-2">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <h2 class="text-lg font-bold font-display text-icai-navy">Sectional &amp; Chapter-Wise Practice Tests</h2>
            <span class="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">20-20 Standard</span>
          </div>
          <p class="text-xs text-stone-600 font-serif">20 Questions • 15 Minutes • 40 Marks (+2.00/Q, No Negative Marking) • High-Difficulty Case-Based PYQs.</p>
        </div>
        <span class="text-xs text-stone-500 font-medium hidden sm:inline">6 Core Modules • 20 Qs Each</span>
      </div>

      <!-- Tests Catalog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- Grand Mock Exam Card -->
        <div class="md:col-span-2 lg:col-span-3 paper-texture rounded-xl border border-icai-border p-5 shadow-book hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden bg-gradient-to-r from-amber-50/50 to-stone-50">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-800 text-[10px] font-bold uppercase tracking-wider">Speed Practice</span>
              <span class="px-2 py-0.5 rounded bg-icai-navy text-amber-200 text-[10px] font-semibold">120 Questions Pool</span>
            </div>
            <h3 class="text-base font-bold text-icai-navy font-display">Comprehensive Multi-Module Speed Mock Test</h3>
            <p class="text-xs text-stone-600 mt-0.5 font-serif">Full question bank covering all 6 modules • 60 Mins timed test.</p>
          </div>
          <button onclick="openPreTestInstructions('ALL')" class="px-5 py-2 bg-stone-800 hover:bg-stone-900 text-amber-200 font-bold rounded-lg text-xs shadow-xs transition shrink-0">
            Attempt Speed Mock (120 Qs)
          </button>
        </div>

        <!-- Chapter 1 Test Card -->
        <div class="paper-texture rounded-xl border border-icai-border p-5 shadow-book hover:border-icai-gold transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span class="font-bold text-icai-burgundy font-serif">Chapter 1 Test</span>
              <span class="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">20-20 Sectional (15 Mins)</span>
            </div>
            <h4 class="font-bold text-icai-navy text-base font-display">Fundamental Principles &amp; Threats</h4>
            <p class="text-xs text-stone-600 mt-1 font-serif">Integrity, Objectivity, Confidentiality, Fee Dependence, Self-Review &amp; Safeguards.</p>
            <div class="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-medium">
              <span class="font-bold text-icai-navy">20 Questions</span>
              <span>•</span>
              <span class="font-bold text-icai-burgundy">15 Mins</span>
              <span>•</span>
              <span class="font-bold text-stone-800">40 Marks (+2.00, 0 Neg.)</span>
            </div>
          </div>
          <button onclick="openPreTestInstructions(1)" class="w-full mt-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30">
            Attempt 20-20 Test (20 Qs • 15 Mins)
          </button>
        </div>

        <!-- Chapter 2 Test Card -->
        <div class="paper-texture rounded-xl border border-icai-border p-5 shadow-book hover:border-icai-gold transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span class="font-bold text-icai-burgundy font-serif">Chapter 2 Test</span>
              <span class="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">20-20 Sectional (15 Mins)</span>
            </div>
            <h4 class="font-bold text-icai-navy text-base font-display">Auditor Independence &amp; Non-Audit Services</h4>
            <p class="text-xs text-stone-600 mt-1 font-serif">Section 144 Prohibitions, Internal Audit, Accounting, Tax Advocacy &amp; Cooling-off.</p>
            <div class="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-medium">
              <span class="font-bold text-icai-navy">20 Questions</span>
              <span>•</span>
              <span class="font-bold text-icai-burgundy">15 Mins</span>
              <span>•</span>
              <span class="font-bold text-stone-800">40 Marks (+2.00, 0 Neg.)</span>
            </div>
          </div>
          <button onclick="openPreTestInstructions(2)" class="w-full mt-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30">
            Attempt 20-20 Test (20 Qs • 15 Mins)
          </button>
        </div>

        <!-- Chapter 3 Test Card -->
        <div class="paper-texture rounded-xl border border-icai-border p-5 shadow-book hover:border-icai-gold transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span class="font-bold text-icai-burgundy font-serif">Chapter 3 Test</span>
              <span class="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">20-20 Sectional (15 Mins)</span>
            </div>
            <h4 class="font-bold text-icai-navy text-base font-display">Fees, Tendering &amp; Contingent Fees</h4>
            <p class="text-xs text-stone-600 mt-1 font-serif">Regulation 192, Minimum Audit Fees, Tendering for Non-Audits &amp; Percentage Fees.</p>
            <div class="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-medium">
              <span class="font-bold text-icai-navy">20 Questions</span>
              <span>•</span>
              <span class="font-bold text-icai-burgundy">15 Mins</span>
              <span>•</span>
              <span class="font-bold text-stone-800">40 Marks (+2.00, 0 Neg.)</span>
            </div>
          </div>
          <button onclick="openPreTestInstructions(3)" class="w-full mt-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30">
            Attempt 20-20 Test (20 Qs • 15 Mins)
          </button>
        </div>

        <!-- Chapter 4 Test Card -->
        <div class="paper-texture rounded-xl border border-icai-border p-5 shadow-book hover:border-icai-gold transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span class="font-bold text-icai-burgundy font-serif">Chapter 4 Test</span>
              <span class="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">20-20 Sectional (15 Mins)</span>
            </div>
            <h4 class="font-bold text-icai-navy text-base font-display">Marketing, Advertising &amp; Publicity</h4>
            <p class="text-xs text-stone-600 mt-1 font-serif">Clause 6 &amp; 7 Part I First Schedule, Website Guidelines, Press Interviews &amp; Visiting Cards.</p>
            <div class="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-medium">
              <span class="font-bold text-icai-navy">20 Questions</span>
              <span>•</span>
              <span class="font-bold text-icai-burgundy">15 Mins</span>
              <span>•</span>
              <span class="font-bold text-stone-800">40 Marks (+2.00, 0 Neg.)</span>
            </div>
          </div>
          <button onclick="openPreTestInstructions(4)" class="w-full mt-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30">
            Attempt 20-20 Test (20 Qs • 15 Mins)
          </button>
        </div>

        <!-- Chapter 5 Test Card -->
        <div class="paper-texture rounded-xl border border-icai-border p-5 shadow-book hover:border-icai-gold transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span class="font-bold text-icai-burgundy font-serif">Chapter 5 Test</span>
              <span class="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">20-20 Sectional (15 Mins)</span>
            </div>
            <h4 class="font-bold text-icai-navy text-base font-display">Risk Management (CA Final AFM)</h4>
            <p class="text-xs text-stone-600 mt-1 font-serif">Interest Rate Swaps, Value at Risk (VaR), Currency Hedging, Cross-Currency Swaps.</p>
            <div class="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-medium">
              <span class="font-bold text-icai-navy">20 Questions</span>
              <span>•</span>
              <span class="font-bold text-icai-burgundy">15 Mins</span>
              <span>•</span>
              <span class="font-bold text-stone-800">40 Marks (+2.00, 0 Neg.)</span>
            </div>
          </div>
          <button onclick="openPreTestInstructions(5)" class="w-full mt-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30">
            Attempt 20-20 Test (20 Qs • 15 Mins)
          </button>
        </div>

        <!-- Chapter 6 Test Card -->
        <div class="paper-texture rounded-xl border border-icai-border p-5 shadow-book hover:border-icai-gold transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span class="font-bold text-icai-burgundy font-serif">Chapter 6 Test</span>
              <span class="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">20-20 Sectional (15 Mins)</span>
            </div>
            <h4 class="font-bold text-icai-navy text-base font-display">Mutual Funds (CA Final AFM)</h4>
            <p class="text-xs text-stone-600 mt-1 font-serif">NAV Calculation, Sharpe, Treynor, Jensen Alpha, Expense Ratio &amp; Fama Net Selectivity.</p>
            <div class="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-medium">
              <span class="font-bold text-icai-navy">20 Questions</span>
              <span>•</span>
              <span class="font-bold text-icai-burgundy">15 Mins</span>
              <span>•</span>
              <span class="font-bold text-stone-800">40 Marks (+2.00, 0 Neg.)</span>
            </div>
          </div>
          <button onclick="openPreTestInstructions(6)" class="w-full mt-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30">
            Attempt 20-20 Test (20 Qs • 15 Mins)
          </button>
        </div>

      </div>
    </div>`;

console.log('Target section found?', html.includes(targetSection));

