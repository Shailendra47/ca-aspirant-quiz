const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Target 1: The header area around lines 440-464
const headerTarget = `        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 class="text-lg sm:text-xl font-bold font-display text-icai-navy flex items-center gap-2">
              <span>🏛️</span>
              <span>Group I Full Papers &amp; Subject Tests</span>
            </h2>
            <p class="text-xs text-stone-600 font-serif mt-0.5">
              All 4 Core Subjects under Group I: Financial Reporting (FR), Advanced Financial Management (AFM), Advanced Auditing (AAAPE) &amp; Corporate and Economic Laws (CEL).
            </p>
          </div>
          
          <!-- Group I Badge & Standard Indicator -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50/90 border border-amber-300/90 shadow-2xs self-start sm:self-auto">
            <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span class="text-xs font-bold font-sans text-icai-navy">Group I • 4 Core Subjects</span>
            <span class="text-[11px] font-medium text-stone-600 font-serif border-l border-amber-300 pl-2">100Q / 3-Hr &amp; 20Q / 15-Min</span>
          </div>

          <!-- Hidden compatibility buttons for legacy tab references -->
          <div class="hidden" aria-hidden="true">
            <button id="tabGroupAll"></button>
            <button id="tabGroup1"></button>
            <button id="tabGroup2"></button>
          </div>
        </div>`;

console.log('headerTarget present?', html.includes(headerTarget));

// Target 2: End of fullPapersGrid before sectionalTestsSection (around lines 640-660)
const card4EndTarget = `                <button onclick="openDescriptivePaperModal('PAPER_LAW')" class="w-full sm:flex-1 py-1.5 px-2 bg-white hover:bg-stone-100 text-stone-800 font-semibold rounded-lg text-[11px] border border-stone-300 transition flex items-center justify-center gap-1">
                  <span>📄</span><span>Section B (70M Descriptive)</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>`;

console.log('card4EndTarget present?', html.includes(card4EndTarget));

