// helpers.ts
import { Page } from '@playwright/test';

const URL = 'https://www.erp.com';

// Function to navigate to the home URL
export async function navigateToURL(page: Page) {
  await page.goto(URL);
  console.log('✅ Browser opened and navigated to ERP website.');

  // Handling the cookie consent pop-up
  try {
    await page.waitForSelector('.privacy_prompt_content', { timeout: 5000 });
    await page.click('label[for="privacy_pref_optout"]');
    await page.waitForSelector('#consent_prompt_submit:not([disabled])', { timeout: 5000 });
    await page.click('#consent_prompt_submit');
    console.log('✅ Cookie consent handled.');
  } catch {
    console.log('⚠️ No cookie consent pop-up detected.');
  }
}

// Function to log in to the account
export async function login(page: Page, username: string, password: string) {
  try {
    await page.waitForSelector('text=Log In', { timeout: 5000 });
    await page.click('text=Log In');
    console.log('✅ Clicked on "Log In".');
    
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
