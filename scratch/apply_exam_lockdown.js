const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Modal HTML to insert after submitAlertModal (around line 1409)
const modalTarget = `          <button onclick="confirmSubmitTest()" class="px-6 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 text-xs font-bold rounded-lg shadow-md border border-icai-gold/40 transition">
            Submit
          </button>
        </div>
      </div>
    </div>`;

const modalReplacement = `          <button onclick="confirmSubmitTest()" class="px-6 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 text-xs font-bold rounded-lg shadow-md border border-icai-gold/40 transition">
            Submit
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== EXAM SESSION LOCK ALERT MODAL ==================== -->
    <div id="examLockAlertModal" class="hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="paper-texture rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-7 border-2 border-amber-400 font-sans animate-in fade-in zoom-in-95 duration-150 relative overflow-hidden text-center">
        <!-- Top Ornamental Ribbon -->
        <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-icai-navy via-amber-500 to-icai-burgundy"></div>

        <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center text-2xl shadow-xs">
          🔒
        </div>

        <span class="inline-block px-3 py-0.5 rounded-full bg-icai-navy text-amber-200 text-[10px] font-bold uppercase tracking-wider mb-2">
          Official ICAI CBT Security Protocol
        </span>

        <h3 class="text-lg font-bold text-icai-navy font-display mb-2">
          Examination in Progress
        </h3>

        <p class="text-xs text-stone-700 font-serif leading-relaxed mb-5 max-w-md mx-auto">
          Under official examination guidelines, you cannot leave or navigate away from an active paper session without submitting your paper. All navigation is secured to maintain examination integrity.
        </p>

        <div class="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-left text-xs font-serif text-stone-800 space-y-1.5 mb-6">
          <div class="flex items-center justify-between">
            <span class="font-bold text-icai-navy">Active Examination:</span>
            <span id="lockExamPaperTitle" class="font-semibold text-stone-900 font-sans truncate max-w-[200px]">CA Final Examination</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-bold text-icai-navy">Time Remaining:</span>
            <span id="lockExamTimeRemaining" class="font-mono font-bold text-rose-700">00:00</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onclick="closeExamLockModal()" class="w-full sm:flex-1 py-2.5 px-4 bg-icai-navy hover:bg-icai-dark text-amber-200 text-xs font-bold rounded-xl shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1.5">
            <span>✍️</span><span>Continue Examination</span>
          </button>
          <button onclick="proceedToSubmitFromLock()" class="w-full sm:flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-stone-900 text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5">
            <span>📄</span><span>Submit Paper Now</span>
          </button>
        </div>
      </div>
    </div>`;

// 2. JavaScript logic update in switchMainView
const switchViewTarget = `    // View Switching
    function switchMainView(viewName) {
      currentMainView = viewName;`;

const switchViewReplacement = `    // View Switching with Strict Examination Session Guard
    function switchMainView(viewName) {
      // STRICT EXAM LOCK: Candidate cannot leave active test session without submitting paper
      if (currentMainView === 'exam' && viewName !== 'exam' && viewName !== 'results') {
        openExamLockModal();
        return;
      }

      currentMainView = viewName;`;

// 3. JavaScript functions for Exam Lock Modal & window handlers
const functionsTarget = `    // ==================== IMAGE 1: OTP LOGIN MODAL LOGIC ====================`;

const functionsReplacement = `    // ==================== EXAM SESSION LOCK CONTROLLER ====================
    function openExamLockModal() {
      const modal = document.getElementById('examLockAlertModal');
      if (!modal) return;
      const titleEl = document.getElementById('lockExamPaperTitle');
      const timerEl = document.getElementById('lockExamTimeRemaining');
      const meta = (typeof CHAPTER_META !== 'undefined' && CHAPTER_META[currentTestKey]) ? CHAPTER_META[currentTestKey] : (typeof CHAPTER_META !== 'undefined' ? CHAPTER_META['ALL'] : {});
      if (titleEl) {
        titleEl.textContent = (meta && meta.title) ? meta.title : 'CA Final CBT Examination';
      }
      if (timerEl) {
        const mins = Math.floor(examTimeRemainingSeconds / 60);
        const secs = examTimeRemainingSeconds % 60;
        timerEl.textContent = \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;
      }
      modal.classList.remove('hidden');
    }

    function closeExamLockModal() {
      const modal = document.getElementById('examLockAlertModal');
      if (modal) modal.classList.add('hidden');
    }

    function proceedToSubmitFromLock() {
      closeExamLockModal();
      openSubmitAlertModal();
    }

    // Browser navigation & unload guard during active exam
    window.addEventListener('beforeunload', function(e) {
      if (currentMainView === 'exam') {
        e.preventDefault();
        e.returnValue = 'Examination is currently active. You cannot leave the session without submitting your paper.';
        return e.returnValue;
      }
    });

    window.addEventListener('popstate', function(e) {
      if (currentMainView === 'exam') {
        try {
          history.pushState({ inExam: true }, document.title, location.href);
        } catch (err) {}
        openExamLockModal();
      }
    });

    // ==================== IMAGE 1: OTP LOGIN MODAL LOGIC ====================`;

// 4. Update openOtpLoginModal to prevent opening during exam
const otpModalTarget = `    function openOtpLoginModal() {
      const modal = document.getElementById('otpLoginModal');`;

const otpModalReplacement = `    function openOtpLoginModal() {
      if (currentMainView === 'exam') {
        openExamLockModal();
        return;
      }
      const modal = document.getElementById('otpLoginModal');`;

// 5. In launchCbtExam, push browser history state
const launchExamTarget = `      switchMainView('exam');
      renderCbtQuestion(0);
      renderCbtPalette();
      updateLegendCounters();
    }`;

const launchExamReplacement = `      switchMainView('exam');
      try {
        history.pushState({ inExam: true }, document.title, location.href);
      } catch (err) {}
      renderCbtQuestion(0);
      renderCbtPalette();
      updateLegendCounters();
    }`;

let updated = html
  .replace(modalTarget, modalReplacement)
  .replace(switchViewTarget, switchViewReplacement)
  .replace(functionsTarget, functionsReplacement)
  .replace(otpModalTarget, otpModalReplacement)
  .replace(launchExamTarget, launchExamReplacement);

fs.writeFileSync('index.html', updated, 'utf8');
console.log('Successfully applied exam lockdown to index.html!');

