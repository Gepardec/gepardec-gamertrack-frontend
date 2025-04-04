import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('button', { name: 'Create User' }).click();
  await page.getByRole('textbox', { name: 'Enter Firstname' }).click();
  await page.getByRole('textbox', { name: 'Enter Firstname' }).fill('Andreas');
  await page.getByRole('textbox', { name: 'Enter Firstname' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter Lastname' }).fill('Novak');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'Create User' }).click();
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByRole('button', { name: 'Create User' })).toBeVisible();
  await page.pause();
  await expect(page.locator('app-user-list')).toContainText('Andreas Novak');
  await page.getByRole('button', { name: 'Create User' }).click();
  await page.getByRole('textbox', { name: 'Enter Firstname' }).click();
  await page.getByRole('textbox', { name: 'Enter Firstname' }).fill('Tobias');
  await page.getByRole('textbox', { name: 'Enter Firstname' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter Lastname' }).fill('Meindl');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.locator('app-user-list')).toContainText('Tobias Meindl');
  await page.getByRole('link', { name: 'Games' }).click();
  await page.getByRole('button', { name: 'Create Game' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Tischtennis');
  await page.getByRole('textbox', { name: 'Rules' }).click();
  await page.getByRole('textbox', { name: 'Rules' }).fill('Die Regeln sind wie folgt: Ping dann Pong');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.locator('app-game-details')).toContainText('Tischtennis');
  await expect(page.locator('app-game-details')).toContainText('Die Regeln sind wie folgt: Ping dann Pong');
  await page.getByRole('button', { name: 'Matches' }).click();
  await expect(page.locator('app-match-list')).toContainText('This game has no played matches');
  await page.getByRole('link', { name: 'Ranklist' }).click();
  await page.getByText('HomeRanklistUsersGames').click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'Create Match' }).click();
  await page.getByRole('heading', { name: 'Tischtennis' }).click();
  await page.getByText('Andreas Novak').first().click();
  await page.getByText('Tobias Meindl').first().click();
  await page.getByRole('button', { name: 'Create Match' }).click();
  await expect(page.getByText('Confirm Match for Tischtennis 1. Andreas Novak2. Tobias Meindl Confirm Cancel')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('1. Andreas Novak2. Tobias Meindl');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByRole('heading', { name: 'Recent Matches' })).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('Tischtennis: 1. Andreas 2. Tobias');
});
