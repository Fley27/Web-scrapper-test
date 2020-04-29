const puppeteer = require("puppeteer");
const C = require("./constants");
const USERNAME_SELECTOR = "#email";
const PASSWORD_SELECTOR = "#pass";
const CTA_SELECTOR = "#loginbutton";
//<input value="Konekte" aria-label="Konekte" data-testid="royal_login_button" type="submit" id=""></input>
async function startBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  return { browser, page };
}

(async () => {
  // Create an instance of the chrome browser
  // But disable headless mode !
  const browser = await puppeteer.launch({
    headless: false,
  });

  // Create a new page
  const page = await browser.newPage();

  // Configure the navigation timeout
  await page.goto("https://www.facebook.com/", {
    waitUntil: "load",
    // Remove the timeout
    timeout: 0,
  });

  // Navigate to some website e.g Our Code World
  await page.goto("https://www.facebook.com/");

  // Do your stuff
  // ...

  page.setViewport({ width: 1366, height: 768 });
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(C.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password);
  await page.click(CTA_SELECTOR);
  await page.waitForNavigation();
  await page.screenshot({ path: "facebook.png" });

  await playTest("https://www.facebook.com/");
  process.exit(1);
})();

async function closeBrowser(browser) {
  try {
    return browser.close();
  } catch (error) {
    console.log(`${error}`);
  }
}
