import { test, expect } from '@playwright/test';
import {BASE_URL, game, match, user1, user2} from "./TestFixtures";

test('test', async ({ page }) => {
  await page.route('**/api/v1/matches', (route) => route.fulfill({
    status: 201,
    contentType: 'application/json',
    body: JSON.stringify(match(user1, user2, game))
  }));

  await page.route('**/api/v1/matches?pageNumber=1&pageSize=15', (route) => route.fulfill({
    status: 201,
    contentType: 'application/json',
    body: JSON.stringify([match(user1, user2, game)])
  }));

  await page.route('**/api/v1/games', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([game])
  }));

  await page.route('**/api/v1/users?includeDeactivated=false', (route) => route.fulfill({
    status: 201,
    contentType: 'application/json',
    body: JSON.stringify([user1, user2])
  }));

  await page.route('**/auth/validate', (route) => route.fulfill({
    status: 200,
  }))


  await page.goto(BASE_URL);
  await page.getByRole('button', { name: 'Create Match' }).click();
  await page.getByText(game.name).click();


  await page.getByText('Erhard Siegl').first().click();
  await page.getByText('Andreas Novak').first().click();
  await page.getByRole('button', { name: 'Create Match' }).click();
  await page.getByText('Confirm Match for Dart 1. Erhard Siegl2. Andreas Novak Confirm Cancel').click({
    button: 'left'
  });
  await expect(page.getByText('Confirm Match for Dart 1. Erhard Siegl2. Andreas Novak Confirm Cancel')).toBeVisible();
  await page.getByRole('button', { name: 'Confirm' }).click();
  //TODO find another solution
  await expect(page.locator('app-match-history-list')).toContainText('Recent Matches Dart: 1. Erhard 2. Andreas todayCreate Match');
});
