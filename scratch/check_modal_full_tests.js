const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /Looking for the Comprehensive Full Test\?[\s\S]*?<\/div>/gi;
let m;
let i = 0;
while ((m = regex.exec(html)) !== null) {
  i++;
  console.log(`=== Modal Full Test Button ${i} ===`);
  console.log(m[0]);
}
