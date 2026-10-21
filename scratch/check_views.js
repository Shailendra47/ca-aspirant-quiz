const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
for (let i = 810; i < 835; i++) {
  console.log((i+1) + ': ' + lines[i].trim().slice(0, 80));
}
console.log('---');
for (let i = 1460; i < 1475; i++) {
  console.log((i+1) + ': ' + lines[i].trim().slice(0, 80));
}
