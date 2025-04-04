import { test, expect } from '@playwright/test';

test('Eingeloggter User hast Create Buttons Visible', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await expect(page.getByRole('button', { name: 'Create Match' })).toBeVisible();
  await page.getByRole('link', { name: 'Ranklist' }).click();
  await page.getByRole('link', { name: 'Users' }).click();
  await expect(page.getByRole('button', { name: 'Create User' })).toBeVisible();
  await page.getByRole('link', { name: 'Games' }).click();
  await expect(page.getByRole('button', { name: 'Create Game' })).toBeVisible();
  await page.getByRole('heading', { name: 'Tischtennis' }).click();
  await expect(page.getByRole('button').nth(4)).toBeVisible();
  await expect(page.getByRole('button').nth(3)).toBeVisible();
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByText('Andreas Novak').first().click();
  await expect(page.getByRole('button', { name: 'Update' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
});
