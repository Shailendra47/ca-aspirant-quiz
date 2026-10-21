const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

let depth = 0;
for (let i = 416; i < 970; i++) {
  const line = lines[i];
  if (!line) continue;
  const opens = (line.match(/<div\b/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  depth += opens - closes;
  if (depth <= 1 || i > 930 || line.includes('<footer') || line.includes('</footer')) {
    console.log(`L${i+1} [depth=${depth} (+${opens}, -${closes})]: ${line.trim().slice(0, 70)}`);
  }
}
