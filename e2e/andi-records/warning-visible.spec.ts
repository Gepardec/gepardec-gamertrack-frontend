import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: 'Create Match' }).click();
  await page.getByText('Tischtennis Die Regeln sind').click();
  await page.locator('.match-user-list').first().click();
  await page.getByRole('button', { name: 'Create Match' }).click();
  await page.getByText('WARNING!Select at least one').click({
    button: 'right'
  });
  await expect(page.getByText('WARNING!Select at least one')).toBeVisible();
});
