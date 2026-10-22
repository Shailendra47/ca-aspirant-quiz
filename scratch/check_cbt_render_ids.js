const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('function renderCbtQuestion');
const end = html.indexOf('function openSubmitAlertModal');
const code = html.substring(start, end);

const idMatches = [...code.matchAll(/document\.getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
const uniqueIds = [...new Set(idMatches)];

console.log('Total unique IDs in renderCbtQuestion/renderCbtPalette/updateLegendCounters:', uniqueIds.length);
uniqueIds.forEach(id => {
  const exists = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
  console.log(`ID "${id}": ${exists ? 'EXISTS' : '❌ MISSING IN HTML!'}`);
});
