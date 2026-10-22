const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="full-paper-card paper-texture rounded-2xl border-2 border-icai-gold[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi;
let m = regex.exec(html);
if (m) {
  console.log('=== Card 1 (FR) ===');
  console.log(m[0]);
}
