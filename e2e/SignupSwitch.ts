import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';

interface Data {
  emailId: string;
  verificationCode: string;
}

async function singupSwitch() {
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const upsPage: Page = await context.newPage();
  await upsPage.goto('https://wwwapps.ups.com/doapp/signup'); 

  const mailPage: Page = await context.newPage();
  await mailPage.goto('https://mail.tm/en/'); 

  const emailId: string = await upsPage.$eval('input#email', el => (el as HTMLInputElement).value); 
  const data: Data = { emailId, verificationCode: '' };
  fs.writeFileSync('signupData.json', JSON.stringify(data, null, 2));

  await upsPage.bringToFront();
  const savedData: Data = JSON.parse(fs.readFileSync('signupData.json', 'utf-8'));
  await mailPage.fill('input#emailField', savedData.emailId); 

  await mailPage.bringToFront();
  const verificationCode: string = await upsPage.$eval('input#verification', el => (el as HTMLInputElement).value); 
  savedData.verificationCode = verificationCode;
  fs.writeFileSync('signupData.json', JSON.stringify(savedData, null, 2));

  await upsPage.bringToFront();
  const finalData: Data = JSON.parse(fs.readFileSync('signupData.json', 'utf-8'));
  await mailPage.fill('input#verificationField', finalData.verificationCode); 

  await browser.close();
}

singupSwitch().catch(console.error);
