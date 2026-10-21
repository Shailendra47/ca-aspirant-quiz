const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const tags = ['div', 'section', 'main', 'header', 'aside', 'footer'];

tags.forEach(tag => {
  const openRe = new RegExp(`<${tag}\\b[^>]*>`, 'gi');
  const closeRe = new RegExp(`</${tag}>`, 'gi');
  const opens = (content.match(openRe) || []).length;
  const closes = (content.match(closeRe) || []).length;
  console.log(`${tag}: open=${opens}, close=${closes}, match=${opens === closes}`);
});

