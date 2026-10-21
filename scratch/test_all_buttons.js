const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf-8');
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);

const sandbox = {
  console: console,
  window: {
    scrollTo: () => {},
    addEventListener: () => {}
  },
  tailwind: { config: {} },
  document: {
    getElementById: (id) => ({
      id,
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
        toggle: () => {}
      },
      style: {},
      setAttribute: () => {},
      getAttribute: () => '',
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      focus: () => {},
      innerHTML: '',
      textContent: '',
      value: '',
      disabled: false,
      children: [],
      scrollIntoView: () => {},
      appendChild: () => {}
    }),
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: (tag) => ({
      tagName: tag,
      classList: { add: () => {}, remove: () => {} },
      style: {},
      setAttribute: () => {},
      appendChild: () => {},
      addEventListener: () => {}
    }),
    body: { classList: { add: () => {}, remove: () => {} } }
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  fetch: async () => ({ ok: true, json: async () => ({}) }),
  setTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {},
  clearTimeout: () => {},
  location: { protocol: 'http:', href: 'http://localhost:5000/' },
  navigator: { userAgent: 'test' },
  addEventListener: () => {},
  scrollTo: () => {}
};
sandbox.window = sandbox;

const context = vm.createContext(sandbox);

scripts.forEach((code, i) => {
  vm.runInContext(code, context);
  console.log('Script #' + (i + 1) + ' evaluated successfully');
});

// Test every single button handler from index.html
const testActions = [
  // Full Papers & Group filters
  ['switchFullPapersGroup(ALL)', () => sandbox.switchFullPapersGroup('ALL')],
  ['switchFullPapersGroup(G1)', () => sandbox.switchFullPapersGroup('G1')],
  ['switchFullPapersGroup(G2)', () => sandbox.switchFullPapersGroup('G2')],
  ['openPreTestInstructions(P1)', () => sandbox.openPreTestInstructions('REAL_PAPER_1')],
  ['openPreTestInstructions(P2)', () => sandbox.openPreTestInstructions('REAL_PAPER_2')],
  ['openPreTestInstructions(P3)', () => sandbox.openPreTestInstructions('REAL_PAPER_3')],
  ['openPreTestInstructions(P4)', () => sandbox.openPreTestInstructions('REAL_PAPER_4')],
  ['openPreTestInstructions(P5)', () => sandbox.openPreTestInstructions('REAL_PAPER_5')],
  ['openPreTestInstructions(P6)', () => sandbox.openPreTestInstructions('REAL_PAPER_6')],
  ['openPreTestInstructions(Ch1)', () => sandbox.openPreTestInstructions(1)],
  ['openPreTestInstructions(ALL)', () => sandbox.openPreTestInstructions('ALL')],
  // Descriptive paper modal
  ['openDescriptivePaperModal(P1)', () => sandbox.openDescriptivePaperModal('PAPER_1')],
  ['openDescriptivePaperModal(P2)', () => sandbox.openDescriptivePaperModal('PAPER_2')],
  ['openDescriptivePaperModal(P3)', () => sandbox.openDescriptivePaperModal('PAPER_3')],
  ['openDescriptivePaperModal(P4)', () => sandbox.openDescriptivePaperModal('PAPER_4')],
  ['openDescriptivePaperModal(P5)', () => sandbox.openDescriptivePaperModal('PAPER_5')],
  ['openDescriptivePaperModal(P6)', () => sandbox.openDescriptivePaperModal('PAPER_6')],
  ['closeDescriptivePaperModal', () => sandbox.closeDescriptivePaperModal()],
  ['switchDescriptivePaper(P2)', () => sandbox.switchDescriptivePaper('PAPER_2')],
  ['toggleAllModelAnswers', () => sandbox.toggleAllModelAnswers()],
  ['toggleDescriptiveAnswer(0)', () => sandbox.toggleDescriptiveAnswer(0)],
  // OTP modal
  ['openOtpLoginModal', () => sandbox.openOtpLoginModal()],
  ['closeOtpLoginModal', () => sandbox.closeOtpLoginModal()],
  ['requestRealTimeOtp', () => sandbox.requestRealTimeOtp()],
  ['autoFillRealTimeOtp', () => sandbox.autoFillRealTimeOtp()],
  ['handleOtpInputChange', () => sandbox.handleOtpInputChange()],
  ['handleResendOtpClick', () => sandbox.handleResendOtpClick()],
  ['handleOtpLoginSubmit', () => sandbox.handleOtpLoginSubmit()],
  // Views
  ['switchMainView(tests)', () => sandbox.switchMainView('tests')],
  ['switchMainView(notes)', () => sandbox.switchMainView('notes')],
  ['switchMainView(analytics)', () => sandbox.switchMainView('analytics')],
  ['switchMainView(leaderboard)', () => sandbox.switchMainView('leaderboard')],
  // Instructions
  ['handleInstructionCheckChange(true)', () => sandbox.handleInstructionCheckChange({ checked: true })],
  ['handleInstructionCheckChange(false)', () => sandbox.handleInstructionCheckChange({ checked: false })],
  // Exam CBT
  ['launchCbtExam', () => sandbox.launchCbtExam()],
  ['handleSelectCbtOption(0)', () => sandbox.handleSelectCbtOption(0)],
  ['handleSaveAndNext', () => sandbox.handleSaveAndNext()],
  ['handleMarkForReviewAndNext', () => sandbox.handleMarkForReviewAndNext()],
  ['handleClearResponse', () => sandbox.handleClearResponse()],
  ['jumpToCbtQuestion(0)', () => sandbox.jumpToCbtQuestion(0)],
  ['openSubmitAlertModal', () => sandbox.openSubmitAlertModal()],
  ['closeSubmitAlertModal', () => sandbox.closeSubmitAlertModal()],
  ['confirmSubmitTest', () => sandbox.confirmSubmitTest()],
  // Scorecard modal
  ['closeScorecardModal', () => sandbox.closeScorecardModal()],
  ['resetQuizState', () => sandbox.resetQuizState()],
  ['retryIncorrectQuestions', () => sandbox.retryIncorrectQuestions()],
  // FR, AFM & Audit Modals
  ['openFrTopicsModal', () => sandbox.openFrTopicsModal()],
  ['closeFrTopicsModal', () => sandbox.closeFrTopicsModal()],
  ['openAfmTopicsModal', () => sandbox.openAfmTopicsModal()],
  ['closeAfmTopicsModal', () => sandbox.closeAfmTopicsModal()],
  ['openAuditTopicsModal', () => sandbox.openAuditTopicsModal()],
  ['closeAuditTopicsModal', () => sandbox.closeAuditTopicsModal()],
  ['openPreTestInstructions(AUDIT_FULL_MOCK)', () => sandbox.openPreTestInstructions('AUDIT_FULL_MOCK')],
  // CEL Modal & Tests
  ['openCelTopicsModal', () => sandbox.openCelTopicsModal()],
  ['closeCelTopicsModal', () => sandbox.closeCelTopicsModal()],
  ['openPreTestInstructions(CEL_FULL_MOCK)', () => sandbox.openPreTestInstructions('CEL_FULL_MOCK')],
  ['openPreTestInstructions(CEL_TOPIC_1)', () => sandbox.openPreTestInstructions('CEL_TOPIC_1')],
  ['openDescriptivePaperModal(PAPER_LAW)', () => sandbox.openDescriptivePaperModal('PAPER_LAW')],
  // Notes
  ['switchNotesChapter(1)', () => sandbox.switchNotesChapter(1)]
];

let failedCount = 0;
testActions.forEach(([name, fn], idx) => {
  try {
    fn();
    console.log(`[PASS] ${name}`);
  } catch (err) {
    failedCount++;
    console.error(`[FAIL] ${name}:`, err.message);
  }
});

console.log(`\nResults: ${testActions.length - failedCount} / ${testActions.length} PASSED.`);

