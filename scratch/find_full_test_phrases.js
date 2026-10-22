const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /[^<>\n]*full test[^<>\n]*/gi;
let m;
const occurrences = [];
while ((m = regex.exec(html)) !== null) {
  occurrences.push(m[0].trim());
}

console.log('Occurrences of "full test":', occurrences.length);
occurrences.forEach((o, i) => console.log(`${i+1}: ${o}`));
