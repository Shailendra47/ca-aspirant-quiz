const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add openAfmTopicsModal and closeAfmTopicsModal
const targetFrModal = `    function openFrTopicsModal() {`;
const afmModalFns = `    function openAfmTopicsModal() {
      const modal = document.getElementById('afmTopicsModal');
      const container = document.getElementById('afmTopicsContainer');
      if (!modal) return;

      if (container && typeof AFM_CATALOG !== 'undefined' && AFM_CATALOG.topics) {
        container.innerHTML = AFM_CATALOG.topics.map(t => \`
          <div class="p-4 rounded-xl border border-stone-300 bg-white hover:border-icai-gold hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-[11px] mb-1.5">
                <span class="font-bold text-icai-burgundy font-serif">Topic \${t.topicId}</span>
                <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">20 Qs • 15 Mins</span>
              </div>
              <h4 class="font-bold text-icai-navy text-xs sm:text-sm font-display leading-snug">\${t.topicTitle}</h4>
              <p class="text-[11px] text-stone-500 font-serif mt-1 leading-relaxed">\${t.syllabus || ''}</p>
              <div class="mt-2 text-[11px] text-stone-600 flex items-center gap-2 font-serif">
                <span class="font-semibold text-emerald-800">40 Marks (+2.00, 0 Neg.)</span>
                <span>•</span>
                <span class="text-amber-800 font-medium">Difficult PYQs</span>
              </div>
            </div>
            <button onclick="closeAfmTopicsModal(); openPreTestInstructions('AFM_TOPIC_\${t.topicId}')" class="w-full mt-3 py-1.5 px-3 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30 flex items-center justify-center gap-1">
              <span>✍️</span><span>Attempt Test (20 Qs • 15 Mins)</span>
            </button>
          </div>
        \`).join('');
      }

      modal.classList.remove('hidden');
    }

    function closeAfmTopicsModal() {
      const modal = document.getElementById('afmTopicsModal');
      if (modal) modal.classList.add('hidden');
    }

    function openFrTopicsModal() {`;

if (!html.includes('function openAfmTopicsModal()') && html.includes(targetFrModal)) {
  html = html.replace(targetFrModal, afmModalFns);
  console.log('✅ Added openAfmTopicsModal & closeAfmTopicsModal');
}

// 2. Add AFM_FULL_MOCK and AFM_TOPIC_1 to 11 into CHAPTER_META
const targetChapterMetaFr = `    const CHAPTER_META = {\n      'FR_FULL_MOCK': {`;
const afmMetaEntries = `    const CHAPTER_META = {
      'AFM_FULL_MOCK': {
        title: "Paper 2: Advanced Financial Management (AFM) - Comprehensive Grand Examination",
        shortTitle: "AFM Full Exam (100 Qs)",
        total: 100,
        marksPerQ: 2,
        totalMarks: 200,
        time: 180,
        isRealPaper: true,
        group: "Group I",
        difficulty: "Difficult",
        pattern: "Comprehensive 11-Topic Examination"
      },
      'AFM_TOPIC_1': { title: "AFM Topic 1: Capital Budgeting & Investment Decisions", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_2': { title: "AFM Topic 2: Cost of Capital & Capital Structure Decisions", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_3': { title: "AFM Topic 3: Dividend Policy & Working Capital Management", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_4': { title: "AFM Topic 4: Securities Analysis & Portfolio Management, CAPM", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_5': { title: "AFM Topic 5: Derivatives: Futures, Options, and Swaps", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_6': { title: "AFM Topic 6: Foreign Exchange Exposure and Risk Management", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_7': { title: "AFM Topic 7: International Financial Management", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_8': { title: "AFM Topic 8: Mergers, Acquisitions, and Corporate Restructuring", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_9': { title: "AFM Topic 9: Business Valuation Methods", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_10': { title: "AFM Topic 10: Financial Services and Capital Markets", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_11': { title: "AFM Topic 11: Strategic Financial Decision-Making & Financial Modelling", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_FULL_MOCK': {`;

if (!html.includes('AFM_FULL_MOCK') && html.includes(targetChapterMetaFr)) {
  html = html.replace(targetChapterMetaFr, afmMetaEntries);
  console.log('✅ Added AFM_FULL_MOCK and AFM_TOPIC_1 to 11 to CHAPTER_META');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Finalized index.html');

