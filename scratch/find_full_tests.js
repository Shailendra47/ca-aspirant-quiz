const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Search for Full Test buttons or launch functions
const regex = /<button[^>]*onclick="([^"]*)"[^>]*>([\s\S]*?)<\/button>/gi;
let match;
const buttons = [];
while ((match = regex.exec(html)) !== null) {
  const onclick = match[1];
  const text = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  if (onclick.includes('openPreTestInstructions') || onclick.includes('launch') || text.toLowerCase().includes('full') || text.toLowerCase().includes('test')) {
    buttons.push({ onclick, text });
  }
}

console.log('Found full/test buttons:', buttons.length);
buttons.forEach((b, i) => console.log(`${i+1}: onclick="${b.onclick}" | text="${b.text}"`));
