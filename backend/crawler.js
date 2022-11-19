const puppeteer = require("puppeteer");
const db = require("./db");

async function pageCrawler(url){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    // await page.waitForSelector('a');
    // await page.waitForSelector('span');

    const grabBrand = await page.evaluate(() => {
        const brand = document.querySelector("#\\39 658977b-acca-4403-b2e1-3b3471fe9fff > h1 > a");
        const title = document.querySelector("#\\39 658977b-acca-4403-b2e1-3b3471fe9fff > h1 > span.BrandProductNameAndTypestyle__BrandName-sc-117vbmi-2.hRyxVn");
        const image = document.querySelector("#c3cad545-a06a-42e6-805b-a74a6457a674 > div > div > div.ProductPreviewSliderstyle__CarouselWrapper-sc-1t0tp5v-6.eOSPhh > section > div > div > div:nth-child(1) > div > img").getAttribute('src');
        // #c3cad545-a06a-42e6-805b-a74a6457a674 > div > div > div.ProductPreviewSliderstyle__CarouselWrapper-sc-1t0tp5v-6.eOSPhh > section > div > div > div:nth-child(1) > div > img
        return [brand.innerText.trim(), title.innerText.trim(), image];
    });
    
    await browser.close();
    return grabBrand;
};

async function acceptCookies(page) {
    await page.$eval('#uc-center-container > div.sc-jJoQJp.dTzACB > div > div > div > button.sc-gsDKAQ.vGgQv', el => el.click());
}

module.exports = {pageCrawler};