import { Page } from 'playwright';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterUsername(username: string) {
    await this.page.fill('input[name="userID"]', username);
  }

  async clickButton(button: string) {
    await this.page.click(`text=${button}`);
  }

  async enterPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }

  async waitForDashboard() {
    await this.page.waitForSelector('text=Welcome');
  }

  async waitForGreetingMessage() {
    await this.page.waitForSelector('selector-for-greeting-message');
  }

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
