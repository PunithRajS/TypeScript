import { Page } from 'playwright';

export class UPSHomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.ups.com');
  }

  async goToLoginPage() {
    await this.page.click('text=Log In');
  }
}
