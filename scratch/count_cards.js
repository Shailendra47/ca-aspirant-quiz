const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const cards = [...html.matchAll(/class="[^"]*full-paper-card[^"]*"/g)];
console.log('Total full-paper-card count in index.html:', cards.length);

// Also check which group each card belongs to
const cardBlocks = [...html.matchAll(/class="[^"]*full-paper-card[^"]*"[^>]*data-group="([^"]+)"/g)];
console.log('Cards with data-group:');
cardBlocks.forEach((m, idx) => {
  console.log(`Card ${idx+1}: data-group="${m[1]}"`);
});

