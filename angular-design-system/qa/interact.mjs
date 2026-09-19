// Functional/a11y checks against the built app: consent→GA gating, carousel keyboard,
// symptom-router selection, and reduced-motion reveal no-op.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = new URL('../dist/kirilla-physio/browser', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon' };
function resolveFile(u) { let p = decodeURIComponent(u.split('?')[0]); if (p.endsWith('/')) p = p.slice(0, -1); const c = [join(ROOT, p), join(ROOT, p, 'index.html')]; if (p === '') c.unshift(join(ROOT, 'index.html')); for (const f of c) if (existsSync(f) && extname(f)) return f; return join(ROOT, '404.html'); }
const server = createServer(async (req, res) => { try { const f = resolveFile(req.url); res.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' }); res.end(await readFile(f)); } catch { res.writeHead(404); res.end('nf'); } });
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;
const browser = await chromium.launch();
const results = [];
const ok = (name, cond) => { results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}`); };

// 1. Consent decline → no GA script; accept → GA script injected
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const bannerVisible = await page.locator('.consent').isVisible();
  ok('consent banner shows on first visit', bannerVisible);
  await page.getByText('Elutasítom', { exact: true }).click();
  await page.waitForTimeout(300);
  const gaAfterDecline = await page.evaluate(() => !!document.querySelector('script[src*="googletagmanager"]'));
  ok('GA NOT loaded after decline', !gaAfterDecline);
  const bannerGone = await page.locator('.consent').count();
  ok('banner dismissed after choice', bannerGone === 0);
  await ctx.close();
}
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.getByText('Elfogadom', { exact: true }).click();
  await page.waitForTimeout(500);
  const gaAfterAccept = await page.evaluate(() => !!document.querySelector('script[src*="googletagmanager"]'));
  ok('GA loaded after accept-all', gaAfterAccept);
  await ctx.close();
}

// 2. Carousel keyboard arrows change the active page
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const carousel = page.locator('.kp-carousel');
  await carousel.scrollIntoViewIfNeeded();
  await carousel.focus();
  const firstActive = await page.locator('.kp-carousel__dot.is-active').getAttribute('aria-label');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(400);
  const secondActive = await page.locator('.kp-carousel__dot.is-active').getAttribute('aria-label');
  ok('carousel ArrowRight advances page', firstActive !== secondActive);
  await ctx.close();
}

// 3. Symptom router: selecting a region updates the detail heading
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const before = await page.locator('.panel__title').innerText();
  await page.locator('.kp-bm__label', { hasText: 'Térd' }).first().click();
  await page.waitForTimeout(200);
  const after = await page.locator('.panel__title').innerText();
  ok('symptom router updates on region select', before !== after && /Térd/.test(after));
  await ctx.close();
}

// 4. Reduced motion → reveal is a no-op (sections fully visible, opacity 1)
{
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const revealReady = await page.evaluate(() => document.documentElement.classList.contains('reveal-ready'));
  ok('reveal-ready NOT set under reduced-motion', !revealReady);
  const opacity = await page.locator('section[data-reveal]').last().evaluate((el) => getComputedStyle(el).opacity);
  ok('last section visible under reduced-motion (opacity 1)', opacity === '1');
  await ctx.close();
}

await browser.close();
server.close();
console.log(results.join('\n'));
