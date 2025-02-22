import { Given, When, Then, Before, context } from '@cucumber/cucumber';
// import { BrowserContext } from 'playwright';
import { fixture } from "../../hooks/fixture";
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

let homePage: HomePage ;
let loginPage: LoginPage ;
// let context: BrowserContext;

Before(async function () {
  homePage = new HomePage(fixture.page);
  loginPage = new LoginPage(fixture.page);
});

Given('I am on the homepage', async function () {
  await homePage.navigate();
  console.log('Browser opened and navigated to UPS website.');
});

Given('I navigate to the login page', async function () {
  await homePage.goToLoginPage();
});

When('I enter my Valid UserName', async function () {
  await loginPage.enterUsername("JSnow110");
});

When('I click the {string} button', async function (button: string) {
  if (button === 'Continue') {
    await loginPage.clickContinue();
  } else if (button === 'LogIn') {
    await loginPage.clickLogin();
  }
});

When('I enter my Valid Password', async function () {
  await loginPage.enterPassword("JSkeypass881");
});

Then('I should be redirected to my account dashboard', async function () {
  await loginPage.waitForDashboard();
});

// Then('I should see a greeting message with my name', async function () {
//   await loginPage.waitForGreetingMessage();
// });

When('I enter an Invalid password', async function () {
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
