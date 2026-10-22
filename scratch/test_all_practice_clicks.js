const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Extract all buttons from testsSelectionView
const viewStart = html.indexOf('id="testsSelectionView"');
const viewEnd = html.indexOf('id="instructionsView"');
const viewHtml = html.substring(viewStart, viewEnd);

const buttonRegex = /<button([^>]*)>([\s\S]*?)<\/button>/gi;
let match;
const buttons = [];
while ((match = buttonRegex.exec(viewHtml)) !== null) {
  const attrs = match[1];
  const inner = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  const onclickMatch = attrs.match(/onclick="([^"]*)"/i);
  if (onclickMatch) {
    buttons.push({ onclick: onclickMatch[1], text: inner });
  }
}

console.log('Testing each button in testsSelectionView...');
buttons.forEach((b, idx) => {
  console.log(`[${idx+1}] Text: "${b.text}" -> Action: ${b.onclick}`);
});
