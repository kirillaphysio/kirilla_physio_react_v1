// Load each route and report any console errors / page errors / failed requests.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/prinzm/WebstormProjects/kirilla_physio_react_v1/angular/node_modules/playwright');

const ROOT = new URL('../dist/kirilla-physio/browser', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon' };
function resolveFile(u) { let p = decodeURIComponent(u.split('?')[0]); if (p.endsWith('/')) p = p.slice(0, -1); const c = [join(ROOT, p), join(ROOT, p, 'index.html')]; if (p === '') c.unshift(join(ROOT, 'index.html')); for (const f of c) if (existsSync(f) && extname(f)) return f; return join(ROOT, '404.html'); }
const server = createServer(async (req, res) => { try { const f = resolveFile(req.url); res.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' }); res.end(await readFile(f)); } catch { res.writeHead(404); res.end('nf'); } });
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;
const browser = await chromium.launch();
const routes = ['/', '/online-programok', '/kapcsolat', '/terapia/fdm', '/adatkezeles', '/feltetelek', '/cookie'];
let totalErrors = 0;
for (const route of routes) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => { const u = r.url(); if (!u.includes('cloudinary') && !u.includes('placehold') && !u.includes('googletagmanager') && !u.includes('fonts.')) errs.push('reqfail: ' + u); });
  await page.goto(base + route, { waitUntil: 'networkidle' }).catch((e) => errs.push('goto: ' + e.message));
  await page.waitForTimeout(300);
  totalErrors += errs.length;
  console.log(`${errs.length === 0 ? 'OK  ' : 'ERR '} ${route}${errs.length ? '\n    ' + errs.join('\n    ') : ''}`);
  await ctx.close();
}
await browser.close();
server.close();
console.log(`\nTotal errors: ${totalErrors}`);
