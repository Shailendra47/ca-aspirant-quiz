const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Extract all <button ...> and <a ...> tags
const buttonRegex = /<(button|a)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
let match;
const interactiveElements = [];
while ((match = buttonRegex.exec(html)) !== null) {
  const tag = match[1];
  const attrs = match[2];
  const innerText = match[3].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  const onclickMatch = attrs.match(/onclick\s*=\s*["']([^"']+)["']/i);
  const hrefMatch = attrs.match(/href\s*=\s*["']([^"']+)["']/i);
  const idMatch = attrs.match(/id\s*=\s*["']([^"']+)["']/i);
  interactiveElements.push({
    tag,
    id: idMatch ? idMatch[1] : null,
    onclick: onclickMatch ? onclickMatch[1] : null,
    href: hrefMatch ? hrefMatch[1] : null,
    text: innerText
  });
}

console.log('Total interactive elements in index.html:', interactiveElements.length);

let withoutAction = 0;
interactiveElements.forEach((el, idx) => {
  if (!el.onclick && (!el.href || el.href === '#' || el.href === 'javascript:void(0)')) {
    console.log(`[WARN] Element ${idx+1} has no action: <${el.tag} id="${el.id}"> Text: "${el.text}"`);
    withoutAction++;
  }
});

console.log(`Total elements without active handler: ${withoutAction}`);
