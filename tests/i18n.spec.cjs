const { test, expect } = require('@playwright/test');

// Canonical translated strings per language — spot-check visible UI text.
// Proper nouns (R48, Beit Hadar, Tel Aviv, Google Calendar, bank numbers)
// are intentionally excluded; they stay the same across all languages.
const CHECKS = {
  en: {
    // strings that should be visible in English
    present: [
      "We're Getting Married",
      'Maya & Yoav',
      'RSVP Now',
      'Schedule',
      'Location',
      'Parking',
      "Wedding Gift",
      "or pay quickly with",
      "Maya's Bit",
      "Yoav's Bit",
      "Maya's PayBox",
      "Yoav's PayBox",
      'Bank Transfer',
      'Bank Name',
      'Branch',
      'Account Number',
    ],
    // strings from other languages that must NOT appear
    absent: ['אנחנו מתחתנים', 'Nos Casamos'],
  },
  he: {
    present: [
      'אנחנו מתחתנים',
      'מאיה & יואב',
      'אישור הגעה',       // RSVP Now
      'לוח האירועים',    // Schedule heading
      'מיקום',           // Location
      'חניה',            // Parking
      'מתנה לחתונה',     // Wedding Gift
      'או שלמו מהר עם',  // or pay quickly with
      'ביט של מאיה',
      'ביט של יואב',
      'פיי-בוקס של מאיה',
      'פיי-בוקס של יואב',
      'העברה בנקאית',    // Bank Transfer
      'שם הבנק',         // Bank Name
      'סניף',            // Branch
      'מספר חשבון',      // Account Number
    ],
    absent: ["We're Getting Married", 'Nos Casamos'],
  },
  es: {
    present: [
      'Nos Casamos',
      'RSVP Ahora',
      'Programa',        // Schedule
      'Ubicación',       // Location
      'Estacionamiento', // Parking
      'Regalo de Casamiento', // Wedding Gift
      'o paga rápidamente con',
      'Bit de Maya',
      'Bit de Yoav',
      'PayBox de Maya',
      'PayBox de Yoav',
      'Transferencia Bancaria', // Bank Transfer
      'Nombre del Banco',       // Bank Name
      'Sucursal',               // Branch
      'Número de Cuenta',       // Account Number
    ],
    absent: ["We're Getting Married", 'אנחנו מתחתנים'],
  },
};

// The app defaults to Hebrew (localStorage 'lang'). Each test clears storage
// so we start from a known state, then click the switcher.
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

for (const [lang, { present, absent }] of Object.entries(CHECKS)) {
  test(`${lang.toUpperCase()} — all strings translated`, async ({ page }) => {
    // Click the language button if not already active
    const switcher = page.locator(`button[aria-pressed]`).filter({ hasText: lang === 'he' ? 'עב' : lang.toUpperCase() });
    await switcher.click();
    await page.waitForTimeout(200); // allow framer-motion + i18n to settle

    for (const str of present) {
      await expect(page.locator('body'), `Expected "${str}" to be visible`).toContainText(str);
    }

    for (const str of absent) {
      await expect(page.locator('body'), `Did not expect "${str}" in ${lang} mode`).not.toContainText(str);
    }
  });
}
