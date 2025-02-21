import { Page } from 'playwright';

export class HomePage {
  private page: Page;
  // private context: BrowserContext; 

  constructor(page: Page) {
    this.page = page;
    // this.context = context;
  }

  async navigate() {

    // Handle browser dialog
    this.page.on('dialog', async dialog => {
    console.log('Dialog message:', dialog.message());
    if (dialog.type() === 'confirm') {
      await dialog.accept(); 
    } else {
      await dialog.dismiss();
  }});

  await this.page.goto('https://www.ups.com');
  // await this.context().grantPermissions(['geolocation']);
  // await this.setGeolocation({ latitude: 37.7749, longitude: -122.4194 });
   }

  async goToLoginPage() {
    await this.page.click('span.text:has-text("Log In")');
  }
}


// await page.waitForSelector('.privacy_prompt_content', { timeout: 5000 });

//     // Click the label associated with the "Opt-In to Essential Cookies Only" radio button
//     await page.click('label[for="privacy_pref_optout"]');

//     // Wait for the "Confirm Selection" button to be enabled
//     await page.waitForSelector('#consent_prompt_submit:not([disabled])', { timeout: 5000 });

//     // Click the "Confirm Selection" button
//     await page.click('#consent_prompt_submit');