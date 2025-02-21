import { Page } from 'playwright';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterUsername(username: string) {
    await this.page.fill('#emailInput', username);
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
    await this.page.waitForSelector('#user-profile');
  }

  // async waitForGreetingMessage() {
  //   await this.page.waitForSelector('#user-profile');
  // }

  async waitForErrorMessage() {
    await this.page.waitForSelector('text=The information you entered does not match our records');
  }

  async waitForUnrecognizedUsernameMessage() {
    await this.page.waitForSelector('text=The username you entered is not recognized');
  }

  async getCurrentUrl() {
    return await this.page.url();
  }
}
