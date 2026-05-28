const { test, expect } = require('@playwright/test');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const TOLERANCE_PX = 1;

// Simulate slow images and fonts (600ms each) to stress the scroll logic
async function slowDownAssets(page) {
  await page.route('**/images/Cuple.png', async (route) => {
    await delay(600);
    await route.continue();
  });
  await page.route('https://fonts.googleapis.com/**', async (route) => {
    await delay(600);
    await route.continue();
  });
  await page.route('https://fonts.gstatic.com/**', async (route) => {
    await delay(600);
    await route.continue();
  });
}

function expectGiftsAligned(page) {
  return expect.poll(
    async () => page.locator('#gifts').evaluate((el) => Math.abs(el.getBoundingClientRect().top)),
    { timeout: 5000 }
  ).toBeLessThanOrEqual(TOLERANCE_PX);
}

// Cold load: navigate directly to #gifts with slow assets (simulates first visit, no cache)
test('cold load — #gifts deep link stays aligned while assets settle', async ({ page }) => {
  await slowDownAssets(page);
  await page.goto('/wedding-website/#gifts', { waitUntil: 'domcontentloaded' });
  await expectGiftsAligned(page);
});

// Warm cache: visit root first (caches assets), then route via about:blank to force
// a genuine full-page reload of #gifts. Direct root→#gifts is a same-document
// hash navigation in WebKit (no page reload, our useEffect never re-fires).
test('warm cache — #gifts deep link works after prior page visit', async ({ page }) => {
  await page.goto('/wedding-website/');
  await page.waitForLoadState('load');
  await page.goto('about:blank');
  await page.goto('/wedding-website/#gifts', { waitUntil: 'load' });
  await expectGiftsAligned(page);
});
