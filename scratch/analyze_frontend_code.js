const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('HTML size:', html.length, 'bytes');

// Check script section length
const scriptMatch = html.match(/<script(?:\s+type="text\/javascript"|\s+defer)?\s*>([\s\S]*?)<\/script>/gi);
console.log('Script tags count:', scriptMatch ? scriptMatch.length : 0);

// Let's find functions in the main script
const mainScript = scriptMatch ? scriptMatch[scriptMatch.length - 1] : '';
const funcMatches = [...mainScript.matchAll(/function\s+([a-zA-Z0-9_]+)\s*\(/g)].map(m => m[1]);
console.log('Total functions in main script:', funcMatches.length);
console.log('Functions:', funcMatches.join(', '));

