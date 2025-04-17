import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
require('dotenv').config()

const password: string | undefined = process.env['SECRET_DEFAULT_PW'];



setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://localhost:4200/login');

  await page.route('**/login', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
    })
  }));

  await page.route('**/auth/validate', (route) => route.fulfill({
    status: 200,
  }))


  await page.fill('#username', 'Gepard');
  await page.fill('#password', password!);

  await page.locator("[type=submit]").click();

  await page.waitForURL("http://localhost:4200/");

  await page.context().storageState({ path: authFile });


});
