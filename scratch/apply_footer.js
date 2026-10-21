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

const replacement = `          <!-- Chapter 6 Test Card -->
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

      <!-- ==================== PRACTICE EXAM PAGE FOOTER ==================== -->
      <footer class="mt-12 paper-texture rounded-2xl border border-icai-border shadow-book overflow-hidden font-sans">
        <!-- Top Ornamental ICAI Gold & Burgundy Accent Ribbon -->
        <div class="h-1.5 bg-gradient-to-r from-icai-navy via-icai-gold to-icai-burgundy"></div>

        <div class="p-6 sm:p-10 bg-gradient-to-b from-stone-900 via-icai-dark to-slate-950 text-stone-300">
          <!-- Main 4-Column Footer Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-stone-800">
            
            <!-- Column 1: ICAI Emblem & Portal Identity -->
            <div class="space-y-3.5">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-icai-navy text-icai-gold border border-icai-gold/40 flex items-center justify-center text-xl shadow-xs">
                  🏛️
                </div>
                <div>
                  <h3 class="text-white font-display font-bold text-base tracking-wide">ICAI CA Final</h3>
                  <p class="text-[11px] text-amber-200/90 font-serif">Examination CBT Simulator</p>
                </div>
              </div>
              <p class="text-xs text-stone-400 font-serif leading-relaxed">
                Official Computer-Based Test (CBT) and Case-Scenario practice portal designed strictly in accordance with the <strong>New Scheme of Education &amp; Training</strong> prescribed by the Institute of Chartered Accountants of India (ICAI).
              </p>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800/80 border border-amber-400/30 text-amber-200 text-[11px] font-medium">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>ICAI 70:30 Standard Compliant</span>
              </div>
            </div>

            <!-- Column 2: Group I Full Papers (100 Marks Each) -->
            <div>
              <h4 class="text-white font-bold text-sm font-display uppercase tracking-wider mb-3.5 flex items-center gap-2 border-l-2 border-icai-gold pl-2">
                <span>📚</span><span>Group I Full Papers</span>
              </h4>
              <ul class="space-y-2.5 text-xs font-serif">
                <li>
                  <button onclick="openPreTestInstructions('FR_FULL_MOCK')" class="text-stone-300 hover:text-amber-200 transition flex items-center gap-1.5 text-left">
                    <span class="text-icai-gold text-[10px]">▶</span>
                    <span>Paper 1: Financial Reporting (FR • 100M)</span>
                  </button>
                </li>
                <li>
                  <button onclick="openPreTestInstructions('AFM_FULL_MOCK')" class="text-stone-300 hover:text-amber-200 transition flex items-center gap-1.5 text-left">
                    <span class="text-icai-gold text-[10px]">▶</span>
                    <span>Paper 2: Adv. Financial Mgmt (AFM • 100M)</span>
                  </button>
                </li>
                <li>
                  <button onclick="openPreTestInstructions('AUDIT_FULL_MOCK')" class="text-stone-300 hover:text-amber-200 transition flex items-center gap-1.5 text-left">
                    <span class="text-icai-gold text-[10px]">▶</span>
                    <span>Paper 3: Adv. Auditing &amp; Ethics (100M)</span>
                  </button>
                </li>
                <li>
                  <button onclick="openPreTestInstructions('CEL_FULL_MOCK')" class="text-stone-300 hover:text-amber-200 transition flex items-center gap-1.5 text-left">
                    <span class="text-icai-gold text-[10px]">▶</span>
                    <span>Paper 4: Corporate &amp; Economic Laws (100M)</span>
                  </button>
                </li>
                <li class="pt-1.5 border-t border-stone-800">
                  <button onclick="openPreTestInstructions('ALL')" class="text-amber-300 hover:text-amber-100 font-sans font-semibold transition flex items-center gap-1.5">
                    <span>⚡</span><span>Speed Mock Exam (120 Questions)</span>
                  </button>
                </li>
              </ul>
            </div>

            <!-- Column 3: Quick Study Hub & Subject Modals -->
            <div>
              <h4 class="text-white font-bold text-sm font-display uppercase tracking-wider mb-3.5 flex items-center gap-2 border-l-2 border-icai-gold pl-2">
                <span>📑</span><span>Topic Tests &amp; Notes</span>
              </h4>
              <ul class="space-y-2.5 text-xs font-serif">
                <li>
                  <button onclick="openFrTopicsModal()" class="text-stone-300 hover:text-amber-200 transition flex items-center gap-1.5 text-left">
                    <span class="text-icai-gold text-[10px]">▶</span>
                    <span>FR Topic Catalog (13 Modules • 20Q)</span>
                  </button>
                </li>
                <li>
                  <button onclick="openAfmTopicsModal()" class="text-stone-300 hover:text-amber-200 transition flex items-center gap-1.5 text-left">
                    <span class="text-icai-gold text-[10px]">▶</span>
                    <span>AFM Topic Catalog (11 Modules • 20Q)</span>
                  </button>
                </li>
                <li>
                  <button onclick="openAuditTopicsModal()" class="text-stone-300 hover:text-amber-200 transition flex items-center gap-1.5 text-left">
                    <span class="text-icai-gold text-[10px]">▶</span>
                    <span>Audit Topic Catalog (11 Modules • 20Q)</span>
                  </button>
                </li>
                <li>
                  <button onclick="openCelTopicsModal()" class="text-stone-300 hover:text-amber-200 transition flex items-center gap-1.5 text-left">
                    <span class="text-icai-gold text-[10px]">▶</span>
                    <span>CEL Topic Catalog (9 Modules • 20Q)</span>
                  </button>
                </li>
                <li class="pt-1.5 border-t border-stone-800">
                  <button onclick="switchMainView('notes')" class="text-amber-300 hover:text-amber-100 font-sans font-semibold transition flex items-center gap-1.5">
                    <span>📖</span><span>Textbook Notes (Group I &amp; II)</span>
                  </button>
                </li>
              </ul>
            </div>

            <!-- Column 4: Examination Standards & Legal Advisory -->
            <div class="space-y-3">
              <h4 class="text-white font-bold text-sm font-display uppercase tracking-wider mb-3.5 flex items-center gap-2 border-l-2 border-icai-gold pl-2">
                <span>⚖️</span><span>Statutory Standards</span>
              </h4>
              <div class="p-3.5 rounded-xl bg-stone-800/60 border border-stone-700/80 text-xs font-serif text-stone-300 leading-relaxed">
                <p class="font-bold text-amber-200 font-sans mb-1 flex items-center gap-1.5">
                  <span>🏛️</span><span>Chartered Accountants Act, 1949</span>
                </p>
                <p class="text-[11px] text-stone-400">
                  Gazette Notification No. 1-CA(7)/201/2023. Questions conform to ICAI Guidelines, Ind AS, Standards on Auditing, and Companies Act, 2013.
                </p>
              </div>
              <div class="flex items-center gap-2 text-[11px] text-stone-400">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Database: MongoDB Atlas (Live &amp; Synced)</span>
              </div>
            </div>

          </div>

          <!-- Bottom Bar with ICAI Motto, Copyright & Quick Links -->
          <div class="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-stone-400">
            <div class="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 text-center sm:text-left">
              <span class="font-display font-semibold text-amber-200 text-sm tracking-wide">य एष सुप्तेषु जागर्ति</span>
              <span class="hidden sm:inline text-stone-600">•</span>
              <span class="text-stone-400 text-[11.5px] italic">"That person who is awake in those that sleep"</span>
            </div>
            
            <div class="flex flex-wrap items-center justify-center gap-4 text-[11.5px]">
              <span class="text-stone-500 font-sans">© 2026 ICAI CA Final CBT Platform</span>
              <span class="text-stone-600">•</span>
              <button onclick="switchMainView('analytics')" class="hover:text-amber-200 transition">Analytics</button>
              <span class="text-stone-600">•</span>
              <button onclick="switchMainView('leaderboard')" class="hover:text-amber-200 transition">Merit Board</button>
              <span class="text-stone-600">•</span>
              <span class="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-mono text-[10px]">v2.4 New Scheme</span>
            </div>
          </div>
        </div>
      </footer>
    </div>`;

const newHtml = originalHtml.replace(target, replacement);

console.log('Replacement made?', newHtml !== originalHtml);

fs.writeFileSync('index.html', newHtml, 'utf8');
console.log('index.html updated with beautiful footer!');

