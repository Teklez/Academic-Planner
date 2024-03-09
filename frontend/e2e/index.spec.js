const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("../index.html");

  await page.click('a[href="#intro"]');
  await page.waitForSelector("#intro h2");

  await page.click('a[href="#features"]');
  await page.waitForSelector("#features h1");

  await page.click('a[href="#pricing"]');
  await page.waitForSelector("#pricing h1");

  await page.click('a[href="#contact"]');
  await page.waitForSelector("#contact h1");

  await page.click('a[href="loginPage.html"]');
  await page.waitForSelector("input#username");

  await page.goBack();

  await page.click('a[href="registration.html"]');
  await page.waitForSelector("input#signup-username"); // Assuming there is a signup-username input on the registration page

  await browser.close();
})();
