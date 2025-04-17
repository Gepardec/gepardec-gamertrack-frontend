import { test, expect } from '@playwright/test';
import {BASE_URL, game, user1} from './TestFixtures';

test('test', async ({ page }) => {


  await page.route('**/api/v1/users', (route) => route.fulfill({
    status: 201,
    contentType: 'application/json',
    body: JSON.stringify([user1])
  }));

  await page.route('**/auth/validate', (route) => route.fulfill({
    status: 200,
  }))

  await page.goto(BASE_URL);
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('button', { name: 'Create User' }).click();
  await page.getByRole('textbox', { name: 'Enter Firstname' }).click();
  await page.getByRole('textbox', { name: 'Enter Firstname' }).fill(user1.firstname);
  await page.getByRole('textbox', { name: 'Enter Firstname' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter Lastname' }).fill(user1.lastname);
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.locator('app-user-list')).toContainText(user1.firstname + ' ' + user1.lastname);
});
