const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://en.wikipedia.org/wiki/Dishwasher_salmon");
  // await page.screenshot({ path: "grab.png"}, fullPage: true )

  //   const names = ["fslkgj", "blah", "blah"];
  //   await fs.writeFile("names.txt", names.join("\r\n"));

  // const bop = await page.evaluate(() => {
  //   return Array.from(document.querySelectorAll("#mw-content-text")).map((x) => x.textContent);
  // });
  // await fs.writeFile("names.txt", bop.join("\r\n"));

  const photos = await page.$$eval("img", (pics) => {
    //puppeteer doing array.from for you??
    return pics.map((pic) => pic.src);
  });

  for (const photo of photos) {
    const imagePage = await page.goto(photo);
    await fs.writeFile(photo.split("/").pop(), await imagePage.buffer());
  }

  await browser.close(); //close browser otherwise takes forever
}

start();
