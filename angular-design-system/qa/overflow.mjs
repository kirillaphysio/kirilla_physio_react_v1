// Check for horizontal overflow (body scrollWidth > viewport) at several widths, and screenshot
// the landing at the 900px and 600px breakpoints. Run from the project dir.
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = new URL('../dist/kirilla-physio/browser', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const OUT = new URL('./shots', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon' };

function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p.endsWith('/')) p = p.slice(0, -1);
  const cands = [join(ROOT, p), join(ROOT, p, 'index.html')];
  if (p === '') cands.unshift(join(ROOT, 'index.html'));
  for (const c of cands) if (existsSync(c) && extname(c)) return c;
  return join(ROOT, '404.html');
}
const server = createServer(async (req, res) => {
  try { const f = resolveFile(req.url); res.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' }); res.end(await readFile(f)); }
  catch { res.writeHead(404); res.end('nf'); }
});
await mkdir(OUT, { recursive: true });
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;
const browser = await chromium.launch();
const widths = [360, 390, 600, 768, 900, 1180, 1280];
const routes = (process.argv[2] || '/,/rolam,/egyeni-kezelesek,/online-programok,/terapia/fdm,/blog,/blog/reggeli-derekfajas,/kapcsolat,/adatkezeles,/feltetelek,/cookie').split(',');
let bad = 0;
for (const route of routes) {
  const hits = [];
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
    const m = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    const overflow = m.scrollW - m.clientW;
    if (overflow > 1) hits.push(`${w}px(+${overflow})`);
    if (route === '/' && (w === 600 || w === 900)) {
      await page.screenshot({ path: join(OUT, `home.${w}.png`), fullPage: false });
    }
    await ctx.close();
  }
  bad += hits.length;
  console.log(`${hits.length ? 'OVERFLOW' : 'ok      '} ${route}${hits.length ? '  ' + hits.join(' ') : ''}`);
}
console.log(`\nRoutes with overflow: ${bad === 0 ? 'none' : bad}`);
await browser.close();
server.close();
