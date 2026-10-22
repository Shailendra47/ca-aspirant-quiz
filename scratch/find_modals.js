const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<div id="[a-zA-Z]+TopicsModal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[0].substring(0, 200));
}
