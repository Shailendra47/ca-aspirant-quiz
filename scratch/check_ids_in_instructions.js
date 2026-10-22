const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all document.getElementById calls in openPreTestInstructions and launchCbtExam
const startInstructions = html.indexOf('function openPreTestInstructions');
const endInstructions = html.indexOf('function renderCbtQuestion');
const code = html.substring(startInstructions, endInstructions);

const idMatches = [...code.matchAll(/document\.getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
const uniqueIds = [...new Set(idMatches)];

console.log('Total unique IDs accessed in openPreTestInstructions / launchCbtExam:', uniqueIds.length);
uniqueIds.forEach(id => {
  const exists = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
  console.log(`ID "${id}": ${exists ? 'EXISTS' : '❌ MISSING IN HTML!'}`);
});
