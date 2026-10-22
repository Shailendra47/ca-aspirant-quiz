const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Extract testsSelectionView
const viewStart = html.indexOf('id="testsSelectionView"');
const viewEnd = html.indexOf('id="instructionsView"');
const viewHtml = html.substring(viewStart, viewEnd);

// Find all buttons in testsSelectionView
const buttonRegex = /<button([^>]*)>([\s\S]*?)<\/button>/gi;
let match;
let count = 0;
while ((match = buttonRegex.exec(viewHtml)) !== null) {
  count++;
  const attrs = match[1];
  const inner = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  const onclickMatch = attrs.match(/onclick="([^"]*)"/i);
  const onclick = onclickMatch ? onclickMatch[1] : 'NO_ONCLICK';
  console.log(`Btn ${count}: onclick="${onclick}" | text="${inner}"`);
}
