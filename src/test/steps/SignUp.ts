import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Page, Browser } from 'playwright';

let page: Page;
let browser: Browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

After(async function () {
  await browser.close();
});

Given('I am on the UPS sign-up page', async function () {
    
});


When('I enter my first name {string}', async function (string) {
    
});


When('I enter my last name {string}', async function (string) {
    
});


When('I enter my email address {string}', async function (string) {
    
});

When('I agree to the terms and conditions', async function () {
  
});

Then('I should be directed to the email verification page', async function () {
    
});

When('I enter the verification code sent to my email {string}', async function (string) {
    
});

Then('I should see a message confirming successful sign-up', async function () {
    
});


Then('I should be redirected to the UPS home page', async function () {
    
});


Given('I am on the UPS sign-up page', async function () {
    
});


When('I enter my first name {string}', async function (string) {
    
});


When('I enter my last name {string}', async function (string) {
    
});


When('I enter my email address {string}', async function (string) {
    
});

When('I agree to the terms and conditions', async function () {
    
});


Then('I should see an error message indicating the email is already registered', async function () {
    
});


Then('I should remain on the sign-up page', async function () {
    
});
