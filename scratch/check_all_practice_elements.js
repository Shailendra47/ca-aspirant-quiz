const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Extract testsSelectionView HTML
const viewStart = html.indexOf('id="testsSelectionView"');
const viewEnd = html.indexOf('id="instructionsView"');
const viewHtml = html.substring(viewStart, viewEnd);

// Find all buttons, links, inputs
const tagRegex = /<(button|a|input)[^>]*>/gi;
let m;
const elements = [];
while ((m = tagRegex.exec(viewHtml)) !== null) {
  elements.push(m[0]);
}

console.log('Total interactive elements in testsSelectionView:', elements.length);
elements.forEach((el, i) => {
  console.log(`${i+1}: ${el}`);
});
