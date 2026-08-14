// Static-serve the prerendered dist and screenshot given routes at desktop + mobile widths.
// Run from a dir where `playwright` resolves (e.g. ../angular). Usage:
//   node shoot.mjs "/,/online-programok,/kapcsolat"
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
// Resolve playwright from the old Angular project (which has it + browsers installed).
const require = createRequire(import.meta.url);
const PW = process.env.PW_PATH || 'C:/Users/prinzm/WebstormProjects/kirilla_physio_react_v1/angular/node_modules/playwright';
const { chromium } = require(PW);

const ROOT = new URL('../dist/kirilla-physio/browser', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const OUT = new URL('./shots', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const routes = (process.argv[2] || '/').split(',');

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p.endsWith('/')) p = p.slice(0, -1);
  const candidates = [join(ROOT, p), join(ROOT, p, 'index.html'), join(ROOT, p + '.html')];
  if (p === '') candidates.unshift(join(ROOT, 'index.html'));
  for (const c of candidates) if (existsSync(c) && extname(c)) return c;
  return join(ROOT, '404.html');
}

const server = createServer(async (req, res) => {
  try {
    const file = resolveFile(req.url);
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});

await mkdir(OUT, { recursive: true });
await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const base = `http://localhost:${port}`;
console.log('serving', ROOT, 'on', base);

const browser = await chromium.launch();
const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];
for (const route of routes) {
  for (const vp of viewports) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const url = base + route;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const slug = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
    const path = join(OUT, `${slug}.${vp.name}.png`);
    await page.screenshot({ path, fullPage: true });
    console.log('shot', path);
    await ctx.close();
  }
}
await browser.close();
server.close();
console.log('done');
