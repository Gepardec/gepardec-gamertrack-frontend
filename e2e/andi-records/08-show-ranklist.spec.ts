import { test, expect } from '@playwright/test';
import {game} from './TestFixtures';

test('test', async ({ page }) => {


  await page.route('**/api/v1/games', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{
      ...game
    }])
  }));

  await page.route('**/auth/validate', (route) => route.fulfill({
    status: 200,
  }))



  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Ranklist' }).click();
  await expect(page.getByRole('heading')).toContainText('Rank List' + ' ' + game.name);
  await expect(page.locator('#scoreCount')).toHaveValue('10');
  await expect(page.locator('#game')).toHaveValue('1: Object');
});
