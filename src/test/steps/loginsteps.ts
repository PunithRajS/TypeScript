import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Page, Browser } from 'playwright';
import { UPSHomePage } from './UPSHomePage';
import { LoginPage } from './LoginPage';

let page: Page;
let browser: Browser;
let homePage: UPSHomePage;
let loginPage: LoginPage;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  homePage = new UPSHomePage(page);
  loginPage = new LoginPage(page);
});

After(async function () {
  await browser.close();
});

Given('I am on the UPS homepage', async function () {
  await homePage.navigate();
});

Given('I navigate to the login page', async function () {
  await homePage.goToLoginPage();
});

When('I enter my username {string}', async function (username: string) {
  await loginPage.enterUsername(username);
});

When('I click the {string} button', async function (button: string) {
  await loginPage.clickButton(button);
});

When('I enter my password {string}', async function (password: string) {
  await loginPage.enterPassword(password);
});

Then('I should be redirected to my account dashboard', async function () {
  await loginPage.waitForDashboard();
});

Then('I should see a greeting message with my name', async function () {
  await loginPage.waitForGreetingMessage();
});

When('I enter an invalid password', async function () {
  await loginPage.enterPassword("invalidpassword");
});

Then('I should see an error message indicating incorrect login details', async function () {
  await loginPage.waitForErrorMessage();
});

Then('I should remain on the password entry page', async function () {
  const url = await loginPage.getCurrentUrl();
  if (!url.includes('login-page-url')) throw new Error('Did not remain on the password entry page');
});

When('I enter an unregistered username', async function () {
  await loginPage.enterUsername("unregisteredusername");
});

Then('I should see an error message indicating the username is unrecognized', async function () {
  await loginPage.waitForUnrecognizedUsernameMessage();
});

Then('I should remain on the username entry page', async function () {
  const url = await loginPage.getCurrentUrl();
  if (!url.includes('username-entry-page-url')) throw new Error('Did not remain on the username entry page');
});
