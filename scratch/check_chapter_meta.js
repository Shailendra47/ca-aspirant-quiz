const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('const CHAPTER_META = {');
if (start !== -1) {
  console.log(html.substring(start, start + 2500));
} else {
  console.log('Not found');
}
