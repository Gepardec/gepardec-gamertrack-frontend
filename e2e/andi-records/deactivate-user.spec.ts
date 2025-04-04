import { test, expect } from '@playwright/test';

// Soll angelegten User wieder deaktivieren
test('deactivate-user', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByText('Tobias Meindl').first().click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('app-user-list')).toContainText('Tobias Meindl Deactivated');
});
