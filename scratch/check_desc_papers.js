const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const match = content.match(/const DESCRIPTIVE_PAPERS = \{([\s\S]*?)\n\s*\};/);
if (match) {
  const keys = [...match[1].matchAll(/['"]?([A-Za-z0-9_]+)['"]?\s*:/g)].map(m => m[1]);
  console.log('DESCRIPTIVE_PAPERS keys:', keys);
}

