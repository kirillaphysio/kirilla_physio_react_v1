// Visual/functional QA comparison between the React app and this Angular port — built for step 10
// of the migration (docs/angular-migration-plan.md), kept as a reusable regression tool since it
// caught two real CSS bugs (see that doc's step 10 entry) that no unit test could have.
//
// Usage:
//   1. From the repo root: npm start                      (React dev server, port 3000 by default —
//      pass PORT=3500 BROWSER=none npx react-scripts start to match this script's default)
//   2. From angular/:       npx ng serve --port 4300
//   3. npx playwright install chromium   (once, if not already installed)
//   4. node qa/compare-with-react.mjs
//   Output lands in qa/screenshots/ (git-ignored) — review the PNGs directly, and check
//   console-errors.json / link-ga-results.json / cloudinary-fallback-results.json for the
//   non-visual checks (GA firing, outbound/mailto links, Cloudinary broken-image fallback).
//
// Adjust REACT_BASE/ANGULAR_BASE below if you're running the dev servers on different ports.
import { chromium, devices } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const REACT_BASE = 'http://localhost:3500';
const ANGULAR_BASE = 'http://localhost:4300';
const OUT_DIR = path.resolve(import.meta.dirname, 'screenshots');
mkdirSync(OUT_DIR, { recursive: true });

const ROUTES = [
  { slug: 'home', hash: '#/' },
  { slug: 'contacts', hash: '#/contacts' },
  { slug: 'online-programs', hash: '#/online-programs' },
  { slug: 'individual-treatments', hash: '#/individual-treatments' },
  { slug: 'therapy-gyogytorna', hash: '#/therapy/gyogytorna' },
  { slug: 'terms', hash: '#/terms' },
  { slug: 'privacy', hash: '#/privacy' },
  { slug: 'cookie', hash: '#/cookie' },
];

// 'mobile' uses a real device emulation profile (viewport + mobile user-agent + touch), not just
// a resized viewport — react-device-detect's isMobile is UA-string based, not viewport-based, so
// a narrow *desktop* UA viewport doesn't actually trigger the React app's mobile rendering path.
// A bare-viewport-resize test would silently compare React's desktop UI against Angular's mobile
// UI at the same width. Angular's CSS-breakpoint approach doesn't care about UA either way.
const VIEWPORTS = [
  { slug: 'mobile', ...devices['iPhone 13'] },
  { slug: 'desktop', width: 1280, height: 900 },
];

const APPS = [
  { slug: 'react', base: REACT_BASE },
  { slug: 'angular', base: ANGULAR_BASE },
];

const consoleErrors = {};

async function shootAll(browser) {
  for (const viewport of VIEWPORTS) {
    for (const app of APPS) {
      const { slug, ...contextOptions } = viewport;
      const context = await browser.newContext({
        ...contextOptions,
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      const key = `${app.slug}-${viewport.slug}`;
      consoleErrors[key] = {};

      for (const route of ROUTES) {
        const errorsForRoute = [];
        const onConsole = (msg) => {
          if (msg.type() === 'error') errorsForRoute.push(msg.text());
        };
        const onPageError = (err) => errorsForRoute.push(String(err));
        page.on('console', onConsole);
        page.on('pageerror', onPageError);

        const url = `${app.base}/${route.hash}`;
        try {
          // 'load' not 'networkidle' — Vite's dev-server HMR websocket is a persistent
          // connection, so networkidle never resolves for either dev server.
          await page.goto(url, { waitUntil: 'load', timeout: 30000 });
        } catch (e) {
          errorsForRoute.push(`NAVIGATION_ERROR: ${e}`);
        }
        // Extra settle time for swiper autoplay/animations/CSS transitions to reach a stable frame.
        await page.waitForTimeout(900);

        const fileName = `${route.slug}--${viewport.slug}--${app.slug}.png`;
        await page.screenshot({ path: path.join(OUT_DIR, fileName), fullPage: true });

        page.off('console', onConsole);
        page.off('pageerror', onPageError);
        consoleErrors[key][route.slug] = errorsForRoute;
      }

      await context.close();
    }
  }
}

async function checkLinksAndGa(browser) {
  const results = {};

  for (const app of APPS) {
    results[app.slug] = {};
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();

    // GA: watch for a request to google-analytics/collect or googletagmanager gtag config calls.
    const gaRequests = [];
    page.on('request', (req) => {
      const u = req.url();
      if (u.includes('google-analytics.com') || u.includes('googletagmanager.com') || u.includes('/g/collect')) {
        gaRequests.push(u);
      }
    });

    await page.goto(`${app.base}/#/`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(800);
    await page.goto(`${app.base}/#/contacts`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(800);
    results[app.slug].gaRequests = gaRequests;

    // Outbound/mailto links on the Contacts page + footer social links.
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    results[app.slug].mailto = hrefs.find((h) => h?.startsWith('mailto:')) ?? null;
    results[app.slug].socialHrefs = hrefs.filter(
      (h) => h && /facebook|instagram|tiktok|youtube/.test(h),
    );
    results[app.slug].bookingHref = hrefs.find((h) => h?.includes('salonic')) ?? null;

    await context.close();
  }

  return results;
}

async function checkCloudinaryFallback(browser) {
  const results = {};
  for (const app of APPS) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    // Force every image request to fail, to exercise the placehold.co fallback path.
    await page.route('**/*', (route) => {
      const req = route.request();
      if (req.resourceType() === 'image' && req.url().includes('cloudinary')) {
        return route.abort();
      }
      return route.continue();
    });
    await page.goto(`${app.base}/#/individual-treatments`, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1200);
    const srcs = await page.$$eval('img', (imgs) => imgs.map((i) => i.src));
    results[app.slug] = srcs.filter((s) => s.includes('placehold.co'));
    await page.screenshot({
      path: path.join(OUT_DIR, `cloudinary-fallback--${app.slug}.png`),
      fullPage: false,
    });
    await context.close();
  }
  return results;
}

const browser = await chromium.launch();
try {
  await shootAll(browser);
  const linkResults = await checkLinksAndGa(browser);
  const fallbackResults = await checkCloudinaryFallback(browser);

  writeFileSync(
    path.join(OUT_DIR, 'console-errors.json'),
    JSON.stringify(consoleErrors, null, 2),
  );
  writeFileSync(
    path.join(OUT_DIR, 'link-ga-results.json'),
    JSON.stringify(linkResults, null, 2),
  );
  writeFileSync(
    path.join(OUT_DIR, 'cloudinary-fallback-results.json'),
    JSON.stringify(fallbackResults, null, 2),
  );

  console.log('DONE');
  console.log('Console errors summary:');
  for (const [key, byRoute] of Object.entries(consoleErrors)) {
    for (const [route, errs] of Object.entries(byRoute)) {
      if (errs.length) console.log(`  ${key} / ${route}: ${errs.length} error(s)`);
    }
  }
} finally {
  await browser.close();
}
