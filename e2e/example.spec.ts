import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.fill('#username', 'Gepard');
  await page.fill('#password', 'Gep@rdec2014');

  await page.locator("[type=submit]").click();

  await page.waitForURL("http://localhost:4200/");

  const keyExists = await page.evaluate(() => {
    return localStorage.getItem('authToken') !== null;
  });

  expect(keyExists).toBe(true);
});

