import { test, expect } from '@playwright/test';
import {game, user1} from './TestFixtures';

test('Eingeloggter User hast Create Buttons Visible', async ({ page }) => {
  await page.route('**/auth/validate', (route) => route.fulfill({
    status: 200,
  }))


  await page.route('**/api/v1/users', (route) => route.fulfill({
    status: 201,
    contentType: 'application/json',
    body: JSON.stringify([user1])
  }));


  await page.route('**/api/v1/games', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{
      ...game,
    }])
  }));

  await page.route('**/api/v1/games/' + game.token , (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{
      ...game,
    }])
  }));

  await page.goto('http://localhost:4200/');
  await expect(page.getByRole('button', { name: 'Create Match' })).toBeVisible();
  await page.getByRole('link', { name: 'Ranklist' }).click();
  await page.getByRole('link', { name: 'Users' }).click();
  await expect(page.getByRole('button', { name: 'Create User' })).toBeVisible();
  await page.getByRole('link', { name: 'Games' }).click();
  await expect(page.getByRole('button', { name: 'Create Game' })).toBeVisible();
  await page.getByRole('heading', { name: game.name }).click();
  await expect(page.getByRole('button').nth(4)).toBeVisible();
  await expect(page.getByRole('button').nth(3)).toBeVisible();
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByText(`${user1.firstname} ${user1.lastname}`).first().click();
  await expect(page.getByRole('button', { name: 'Update' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
});
