import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Ranklist' }).click();
  await expect(page.getByRole('heading')).toContainText('Rank List Tischtennis');
  await expect(page.locator('#scoreCount')).toHaveValue('10');
  await expect(page.locator('#game')).toHaveValue('1: Object');
});
