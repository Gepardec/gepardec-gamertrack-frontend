import { test, expect } from '@playwright/test';
import {user1} from './TestFixtures';

// Soll angelegten User wieder deaktivieren
test('deactivate-user', async ({ page }) => {

  await page.route('**/api/v1/users', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([user1])
  }));

  await page.route('**/api/v1/users/' + user1.token, (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      ...user1,
      deactivated: true,
    })
  }));

  await page.route('**/auth/validate', (route) => route.fulfill({
    status: 200,
  }))


  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByText(user1.firstname + ' ' + user1.lastname).first().click();
  await page.getByRole('button', { name: 'Delete' }).click();
  //TODO find another solution
  await expect(page.getByText('Active')).toBeVisible();
});
