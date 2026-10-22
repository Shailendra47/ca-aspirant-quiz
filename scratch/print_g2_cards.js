const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="full-paper-card hidden paper-texture rounded-2xl border-2 border-icai-burgundy[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi;
let m;
let i = 4;
while ((m = regex.exec(html)) !== null) {
  i++;
  console.log(`=== Card ${i} ===`);
  console.log(m[0]);
}
