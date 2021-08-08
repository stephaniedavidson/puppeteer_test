// const puppeteer = require("puppeteer");

// let reviews;

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   const url = "https://www.yelp.com/biz/tacos-morelos-jackson-heights";
//   // const url = "https://marketingplatform.google.com/about/partners/find-a-partner";
//   await page.goto(url);
//   // await page.screenshot({ path: "example.png" });

//   reviews = await page.evaluate(() => {
//     // return document.querySelectorAll("[class*=raw]").textContent;
//     // return document.querySelectorAll("[class*=container]").textContent;
//     return document.querySelectorAll("span");
//   });
//   await browser.close();
//   reviews.forEach((review) => console.log(review.textContent));
// })();

const puppeteer = require("puppeteer");

puppeteer
  .launch({
    headless: true,
    args: ['--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'],
  })
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.goto("https://www.yelp.com/search?cflt=restaurants&find_loc=San Francisco, CA");
    await page.waitForSelector("body");

    var rposts = await page.evaluate(() => {
      let posts = document.querySelectorAll("[class*=container]");

      postItems = [];

      posts.forEach((item) => {
        let title = "";
        let reviewCount = "";
        let stars = "";

        try {
          title = item.querySelector("h4").innerText;
          if (title != "") {
            reviewCount = item.querySelector("[class*=reviewCount]").innerText;
            stars = item.querySelector("[aria-label*=rating]").getAttribute("aria-label");

            postItems.push({
              title: title, //
              reviewCount: reviewCount,
              stars: stars,
            });
          }
        } catch (e) {}
      });

      var items = {
        posts: postItems,
      };

      return items;
    });

    console.log(rposts);
    await browser.close();
  })
  .catch(function (error) {
    console.error(error);
  });
