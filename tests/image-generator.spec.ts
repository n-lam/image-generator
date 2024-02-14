import { test } from '@playwright/test';

test('image-generator', async ({ page }) => {
  const numberOfImages = 1000;
  const range = [...Array(numberOfImages).keys()];

  for (const id of range) {
    await page.goto(`http://localhost:3000/${id}`);
    await page.screenshot({path: `screenshots/customer${id}.png`, fullPage: true});
  }
});
