// Lightweight a11y sweep: per route report h1 count, heading-level jumps, landmark presence,
// images missing alt, and controls without an accessible name.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = new URL('../dist/kirilla-physio/browser', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
function resolveFile(u) { let p = decodeURIComponent(u.split('?')[0].split('#')[0]); if (p.endsWith('/')) p = p.slice(0, -1); const c = [join(ROOT, p), join(ROOT, p, 'index.html')]; if (p === '') c.unshift(join(ROOT, 'index.html')); for (const f of c) if (existsSync(f) && extname(f)) return f; return join(ROOT, '404.html'); }
const server = createServer(async (req, res) => { try { const f = resolveFile(req.url); res.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' }); res.end(await readFile(f)); } catch { res.writeHead(404); res.end('nf'); } });
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;
const browser = await chromium.launch();
const routes = ['/', '/rolam', '/egyeni-kezelesek', '/online-programok', '/terapia/fdm', '/blog', '/blog/reggeli-derekfajas', '/kapcsolat'];
let problems = 0;
for (const route of routes) {
  const page = await browser.newContext({ viewport: { width: 1280, height: 900 } }).then((c) => c.newPage());
  await page.goto(base + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const r = await page.evaluate(() => {
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
    let jumps = [];
    for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) jumps.push(`${hs[i - 1]}->${hs[i]}`);
    const h1 = hs.filter((x) => x === 1).length;
    const imgsNoAlt = [...document.querySelectorAll('img')].filter((i) => i.getAttribute('aria-hidden') !== 'true' && !i.hasAttribute('alt')).length;
    const named = (el) => (el.textContent || '').trim() || el.getAttribute('aria-label') || el.getAttribute('title');
    const unnamed = [...document.querySelectorAll('button, a[href]')].filter((el) => el.offsetParent !== null && !named(el)).length;
    const landmarks = { main: !!document.querySelector('main'), header: !!document.querySelector('header, [role=banner]'), footer: !!document.querySelector('footer, [role=contentinfo]'), nav: !!document.querySelector('nav') };
    return { h1, jumps, imgsNoAlt, unnamed, landmarks };
  });
  const bad = r.h1 !== 1 || r.jumps.length || r.imgsNoAlt || r.unnamed || !r.landmarks.main || !r.landmarks.footer;
  if (bad) problems++;
  console.log(`${bad ? 'WARN' : 'ok  '} ${route}  h1=${r.h1} jumps=[${r.jumps.join(',')}] imgNoAlt=${r.imgsNoAlt} unnamedCtrls=${r.unnamed} landmarks=${JSON.stringify(r.landmarks)}`);
  await page.close();
}
console.log(`\nRoutes with a11y warnings: ${problems === 0 ? 'none' : problems}`);
await browser.close();
server.close();
