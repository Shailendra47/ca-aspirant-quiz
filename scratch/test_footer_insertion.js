const fs = require('fs');

const originalHtml = fs.readFileSync('index.html', 'utf8');

const target = `          <!-- Chapter 6 Test Card -->
          <div class="paper-texture rounded-2xl border border-icai-border p-5 shadow-book hover:border-icai-gold hover:shadow-lg transition flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-xs text-stone-500 mb-2.5">
                <span class="font-bold text-icai-burgundy font-serif bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">Chapter 6 Test</span>
                <span class="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10.5px]">20-20 Sectional</span>
              </div>
              <h4 class="font-bold text-icai-navy text-base font-display">Mutual Funds (CA Final AFM)</h4>
              <p class="text-xs text-stone-600 mt-1.5 font-serif leading-relaxed min-h-[36px]">NAV Calculation, Sharpe, Treynor, Jensen Alpha, Expense Ratio &amp; Fama Net Selectivity.</p>
              <div class="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-serif">
                <span class="font-bold text-icai-navy flex items-center gap-1"><span>📝</span> 20 Qs</span>
                <span class="text-stone-300">•</span>
                <span class="font-bold text-icai-burgundy flex items-center gap-1"><span>⏱️</span> 15 Mins</span>
                <span class="text-stone-300">•</span>
                <span class="font-bold text-stone-800 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded text-[11px] whitespace-nowrap">40 Marks</span>
              </div>
            </div>
            <button onclick="openPreTestInstructions(6)" class="w-full mt-4 py-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-xl text-xs transition border border-icai-gold/30 shadow-2xs flex items-center justify-center gap-1.5">
              <span>⚡</span><span>Attempt 20-20 Test (15 Mins)</span>
            </button>
          </div>

        </div>
      </section>
    </div>`;

console.log('Target found in index.html?', originalHtml.includes(target));

