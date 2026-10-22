const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Collect EVERY onclick in index.html
const onclickRegex = /onclick\s*=\s*["']([^"']+)["']/g;
let m;
const onclicks = [];
while ((m = onclickRegex.exec(html)) !== null) {
  const fn = m[1].trim();
  if (!onclicks.includes(fn)) onclicks.push(fn);
}

console.log('Total unique onclick actions in index.html:', onclicks.length);

// Let's print all of them
onclicks.forEach((act, idx) => {
  console.log(`${idx+1}: ${act}`);
});
