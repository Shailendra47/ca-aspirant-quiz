const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<([^>]+)>([^<]*Full Test[^<]*)<\/[^>]+>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(`Tag: <${m[1]}> -> Text: "${m[2].trim()}"`);
}
