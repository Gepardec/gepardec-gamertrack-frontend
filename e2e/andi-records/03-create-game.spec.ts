import { test, expect } from '@playwright/test';
import {BASE_URL, game} from "./TestFixtures";

test('test', async ({ page }) => {

  await page.route('**/auth/validate', (route) => route.fulfill({
    status: 200,
  }))

  await page.route('**/api/v1/games', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(game)
  }));

  await page.route('**/api/v1/games/'+ game.token, (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(game)
  }));


  await page.goto(BASE_URL);
  await page.getByRole('link', { name: 'Games' }).click();
  await page.getByRole('button', { name: 'Create Game' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Dart');
  await page.getByRole('textbox', { name: 'Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Rules' }).fill('Half score');
  await page.getByRole('textbox', { name: 'Rules' }).press('ControlOrMeta+Shift+ArrowLeft');
  await page.getByRole('textbox', { name: 'Rules' }).press('ControlOrMeta+Shift+ArrowLeft');
  await page.getByRole('textbox', { name: 'Rules' }).fill('split half score');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.locator('app-game-details')).toContainText('Dart');
  await expect(page.locator('app-game-details')).toContainText('split half score');
  await page.getByRole('button', { name: 'Matches' }).click();
  await expect(page.locator('app-match-list')).toContainText('This game has no played matches');
});
