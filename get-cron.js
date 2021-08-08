const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const cron = require("node-cron");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://learnwebcode.github.io/practice-requests/");

  //   await page.click("#clickme");
  //   const clickedData = await page.$eval("#data", (el) => el.textContent);
  //   console.log(clickedData);

  await page.type("#ourfield", "blue"); //1st thing css selector, second is the val you want in it

  //these things just work better in promise
  await Promise.all([
    page.click("#ourform button"), //
    page.waitForNavigation(),
  ]);

  const hiddenInfo = await page.$eval("#message", (el) => el.textContent);
  console.log(hiddenInfo);

  await browser.close(); //close browser otherwise takes forever
}

cron.schedule("*/5 * * * * *", start);
