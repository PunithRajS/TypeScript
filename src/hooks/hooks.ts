import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./fixture";


let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    console.log("Running:" + scenarioName);
    const page = await context.newPage();
    fixture.page = page;
});

After(async function () {
    
});

AfterAll(async function () {
    await browser.close();
});