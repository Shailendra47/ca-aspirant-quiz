const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('class="full-paper-card')) {
    console.log((i+1) + ': ' + l.trim().substring(0, 80));
  }
});
