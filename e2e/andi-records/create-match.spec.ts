import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: 'Create Match' }).click();
  await page.getByText('Dart split half score').click();
  await page.locator('.match-user-list-container > div:nth-child(3)').click();
  await page.getByRole('button', { name: 'Create Match' }).click();
  await page.locator('.match-user-list').first().click();
  await page.getByRole('button', { name: 'Create Match' }).click();
  await page.getByText('Confirm Match for Dart 1. Erhard Siegl2. Andreas Novak Confirm Cancel').click({
    button: 'right'
  });
  await expect(page.getByText('Confirm Match for Dart 1. Erhard Siegl2. Andreas Novak Confirm Cancel')).toBeVisible();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.locator('app-match-history-list')).toContainText('Dart: 1. Erhard 2. Andreas today');
});
