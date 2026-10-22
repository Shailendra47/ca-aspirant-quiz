const fs = require('fs');
const readline = require('readline');
const stream = fs.createReadStream(process.env.USERPROFILE + '/.gemini/antigravity/brain/dba9f733-5305-430f-bcce-5d7fb9739df6/.system_generated/logs/transcript.jsonl');
const rl = readline.createInterface({ input: stream });

rl.on('line', (line) => {
  if (line.includes('switchFullPapersGroup')) {
    const obj = JSON.parse(line);
    console.log('step:', obj.step_index);
    if (obj.content && obj.content.includes('switchFullPapersGroup')) {
      const idx = obj.content.indexOf('switchFullPapersGroup');
      console.log(obj.content.substring(idx - 30, idx + 250));
    }
  }
});

