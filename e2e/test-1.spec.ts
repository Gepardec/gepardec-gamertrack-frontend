import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('button', { name: 'Create User' }).click();
  await page.getByRole('textbox', { name: 'Enter Firstname' }).click();
  await page.getByRole('textbox', { name: 'Enter Firstname' }).fill('Max');
  await page.getByRole('textbox', { name: 'Enter Firstname' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter Lastname' }).fill('Muster');
  await page.getByRole('button', { name: 'Create' }).click();

});
