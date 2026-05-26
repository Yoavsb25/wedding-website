const { test, expect } = require('@playwright/test');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('deep link to Gifts stays aligned while first-load assets settle', async ({ page }) => {
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

  await page.goto('/wedding-website/#gifts', { waitUntil: 'domcontentloaded' });

  await expect.poll(
    async () => page.locator('#gifts').evaluate((el) => Math.abs(el.getBoundingClientRect().top)),
    { timeout: 5000 }
  ).toBeLessThanOrEqual(1);
});
