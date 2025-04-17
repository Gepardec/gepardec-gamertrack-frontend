import { test, expect } from '@playwright/test';
import {user1} from './TestFixtures';

// Soll den User anlegen und wieder löschen und dann checken, ob der User eh nicht mehr aufgelistet wird
test('delete-user-permanent', async ({ page }) => {

  const userToDelete = {
    firstname: 'To',
    lastname: 'Delete',
    token: 'ToDelete',
    deactivated: false,
  }

  await page.route('**/api/v1/users', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{
     ...userToDelete
    }])
  }));

  await page.route('**/api/v1/users/' + userToDelete.token, (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{
     ...userToDelete
    }])
  }));

  await page.route('**/auth/validate', (route) => route.fulfill({
    status: 200,
  }))

  await page.goto('http://localhost:4200/');
  await page.locator('.right-div-container').click();
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('button', { name: 'Create User' }).click();
  await page.getByRole('textbox', { name: 'Enter Firstname' }).click();
  await page.getByRole('textbox', { name: 'Enter Firstname' }).fill('To');
  await page.getByRole('textbox', { name: 'Enter Firstname' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter Lastname' }).fill('Delete');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByText('To Delete').first().click();
  await page.getByRole('button', { name: 'Delete' }).click();

  //TODO is the test redundant?
  //await expect(page.getByText('Erhard Siegl')).toBeVisible();
  //await expect(page.locator('app-user-list')).toContainText('Andreas Novak Active Tobias Meindl Active Erhard Siegl Active');
});
