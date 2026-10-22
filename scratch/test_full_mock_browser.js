const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost:5000"
});

const window = dom.window;
const document = window.document;

console.log('Testing openPreTestInstructions FR_FULL_MOCK...');
try {
  window.openPreTestInstructions('FR_FULL_MOCK');
  console.log('openPreTestInstructions worked! Current view:', window.currentMainView);
  console.log('currentTestQuestions length:', window.currentTestQuestions.length);
} catch (e) {
  console.error('ERROR in openPreTestInstructions:', e);
}

console.log('Testing launchCbtExam...');
try {
  window.launchCbtExam();
  console.log('launchCbtExam worked! Current view:', window.currentMainView);
  console.log('cbtExamTitle:', document.getElementById('cbtExamTitle').textContent);
  console.log('cbtQuestionPrompt:', document.getElementById('cbtQuestionPrompt').textContent);
} catch (e) {
  console.error('ERROR in launchCbtExam:', e);
}
