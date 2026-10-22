const fs = require('fs');
const code = fs.readFileSync('server/server.js', 'utf8');

const lines = code.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('.find(') || l.includes('.findOne(') || l.includes('.findById(')) {
    console.log(`L${idx+1}: ${l.trim().substring(0, 80)}`);
  }
});

