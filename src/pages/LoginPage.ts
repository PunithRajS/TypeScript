import { Page } from 'playwright';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterUsername(username: string) {
    try{
      await this.page.fill('#emailInput', username);
    }catch(error){
      console.error('Error entering username:', error);
    }
  }

  async clickContinue() {
    await this.page.click(`#submitBtn`);
  }
  async clickLogin() {
    await this.page.click(`#submitBtn`);
  }

  async enterPassword(password: string) {
    await this.page.fill('#pwd', password);
  }

  async waitForDashboard() {
    const redirectedUrl = this.getCurrentUrl();
    await this.page.waitForSelector('#user-profile');
    console.log(redirectedUrl);
  }

  // async waitForGreetingMessage() {
  //   await this.page.waitForSelector('#user-profile');
  // }

  async waitForErrorMessage() {
    await this.page.waitForSelector('#generic_error > p');
  }

  async waitForUnrecognizedUsernameMessage() {
    await this.page.waitForSelector('#generic_error > p');
  }

  async getCurrentUrl() {
    return await this.page.url();
  }
}
