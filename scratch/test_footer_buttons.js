const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Extract all onclick attributes from inside the footer
const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/);
if (!footerMatch) {
  console.error('Footer not found!');
  process.exit(1);
}

const footerHtml = footerMatch[0];
const onclickRegex = /onclick="([^"]+)"/g;
let match;
const handlers = [];
while ((match = onclickRegex.exec(footerHtml)) !== null) {
  handlers.push(match[1]);
}

console.log('Footer onclick handlers found:', handlers.length);
handlers.forEach(h => console.log(' - ' + h));

