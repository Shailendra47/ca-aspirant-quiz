const fs = require('fs');
const serverCode = fs.readFileSync('server/server.js', 'utf8');

// Check fs.readFileSync calls
const readSyncCalls = [...serverCode.matchAll(/fs\.readFileSync\([^\)]+\)/g)];
console.log('fs.readFileSync occurrences in server.js:', readSyncCalls.length);
readSyncCalls.forEach((c, idx) => {
  console.log(`Call ${idx+1}:`, c[0]);
});

