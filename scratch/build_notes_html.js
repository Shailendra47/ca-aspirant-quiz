const fs = require('fs');
const path = require('path');

const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'notes', 'textbook_notes_catalog.json'), 'utf8'));

console.log('Generating Textbook Notes HTML for:');
catalog.groups.forEach(g => {
  console.log(`- ${g.group} (${g.subjects.length} subjects)`);
  g.subjects.forEach(s => {
    console.log(`  * ${s.subject} (${s.topics.length} topics)`);
  });
});

