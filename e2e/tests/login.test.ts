import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';

// Defining browser, context, and page variables
let browser: Browser;
let context: BrowserContext;
let page: Page;

// Defining constants for the URL, username, and password
const HomeURL = 'https://www.erp.com';
const USERNAME = 'my-username';
const PASSWORD = 'my-password';

// Function to navigate to the home URL
async function navigateToURL() {
  await page.goto(HomeURL);
  console.log('Browser opened and navigated to ERP website.');

  // Handling the cookie consent pop-up
  try {
    await page.waitForSelector('.privacy_prompt_content', { timeout: 5000 });
    await page.click('label[for="privacy_pref_optout"]');
    await page.waitForSelector('#consent_prompt_submit:not([disabled])', { timeout: 5000 });
    await page.click('#consent_prompt_submit');
    console.log('Cookie consent handled.');
  } catch {
    console.log('No cookie consent pop-up detected.');
  }
}

// Function to log in to the account
async function login(username: string, password: string) {
  try {
    await page.waitForSelector('text=Log In', { timeout: 5000 });
    await page.click('text=Log In');
    console.log('Clicked on "Log In".');
    
    // Fill in the username and password, and submit the form
    await page.fill('#emailInput', username);
    await page.click('#submitBtn'); // Clicking on Continue Button
    await page.fill('#pwd', password);
    await page.click('#submitBtn'); // Clicking on Login Button
    
    console.log('LogIn Successful, current page URL:', page.url());
  } catch (error) {
    console.log('LogIn Failed', error);
  }
}

// Setup the browser and context before all tests
test.beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    geolocation: { latitude: 37.7749, longitude: -122.4194 },
    permissions: ['geolocation'],
    timezoneId: 'America/Los_Angeles',
    locale: 'en-US',
  });
  page = await context.newPage();
});

// Close the browser after all tests
test.afterAll(async () => {
  await browser.close();
});

// Test case for logging into the account
test('Logging Into The Account', async () => {
  await navigateToURL();
  await login(USERNAME, PASSWORD);
  
  // Assertions to check if login was successful
  expect(page.url()).toBe(HomeURL);
  await page.waitForSelector('#user-profile');
  expect(await page.isVisible('#user-profile')).toBeTruthy();
});

// Test case for deleting the account (implementation required)
test('Deleting The Account', async () => {
  await navigateToURL();
  // Implement deletion steps with appropriate assertions here
});
