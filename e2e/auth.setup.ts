import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
require('dotenv').config()

const password: string = process.env['SECRET_DEFAULT_PW'];



setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://localhost:4200/login');
  await page.fill('#username', 'Gepard');
  await page.fill('#password', password);

  await page.locator("[type=submit]").click();

  await page.waitForURL("http://localhost:4200/");

  await page.context().storageState({ path: authFile });


});
