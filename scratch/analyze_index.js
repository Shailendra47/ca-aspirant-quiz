const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
console.log('Total scripts in index.html:', scripts.length);
scripts.forEach((s, idx) => {
  const code = s[1];
  console.log(`Script ${idx+1}: ${code.length} chars (~${(code.length/1024).toFixed(1)} KB)`);
  const lines = code.trim().split('\n');
  console.log(`   Lines: ${lines.length}`);
  console.log(`   Preview: ${lines[0].substring(0, 90)}`);
});

