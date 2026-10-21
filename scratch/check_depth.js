const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const tStart = content.indexOf('id="testsSelectionView"');
const nStart = content.indexOf('id="notesView"');

console.log('testsSelectionView at index:', tStart);
console.log('notesView at index:', nStart);

// Let's check the DOM tree of testsSelectionView
const snippet = content.substring(tStart, nStart);

let depth = 0;
const re = /<\/?div\b[^>]*>/gi;
let m;
let lastIndex = 0;
while ((m = re.exec(snippet)) !== null) {
  if (m[0].startsWith('</')) {
    depth--;
    if (depth === 0) {
      console.log('testsSelectionView closes at relative index:', m.index);
      console.log('Closing tag snippet:\n', snippet.substring(m.index - 50, m.index + 50));
      lastIndex = m.index;
      break;
    }
  } else if (!m[0].endsWith('/>')) {
    depth++;
  }
}

console.log('Final depth at notesView:', depth);

