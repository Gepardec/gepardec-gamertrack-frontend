import { test, expect } from '@playwright/test';
import {game, user1, user2} from './TestFixtures';

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

  await page.route('**/api/v1/users?includeDeactivated=false', (route) => route.fulfill({
    status: 201,
    contentType: 'application/json',
    body: JSON.stringify([user1, user2])
  }));


  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: 'Create Match' }).click();
  await page.getByText(`${game.name} ${game.rules}`).click();
  await page.locator('.match-user-list').first().click();
  await page.getByRole('button', { name: 'Create Match' }).click();
  await page.getByText('WARNING!Select at least one').click({
    button: 'right'
  });
  await expect(page.getByText('WARNING!Select at least one')).toBeVisible();
});
