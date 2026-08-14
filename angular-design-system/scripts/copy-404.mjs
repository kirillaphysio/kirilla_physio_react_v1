// gh-pages serves 404.html for any path it doesn't have a file for. Every real route is
// prerendered to its own index.html, so 404.html only catches genuinely-unknown URLs; we
// point it at Angular's client-side-render shell so the router can still resolve/redirect.
import { copyFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const browser = join('dist', 'kirilla-physio', 'browser');
const src = join(browser, 'index.csr.html');
const dest = join(browser, '404.html');

try {
  await access(src);
  await copyFile(src, dest);
  console.log('copy-404: wrote 404.html from index.csr.html');
} catch (err) {
  console.warn('copy-404: skipped —', err.message);
}
