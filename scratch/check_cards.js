const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<div[^>]*class="[^"]*full-paper-card[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi;
let m;
let i = 0;
while ((m = regex.exec(html)) !== null && i < 10) {
  i++;
  console.log(`--- Card ${i} ---`);
  console.log(m[0].substring(0, 500));
}
