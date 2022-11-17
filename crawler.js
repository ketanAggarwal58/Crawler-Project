const axios = require('axios');
const cheerio = require('cheerio');

const url = "https://www.flaconi.de/pflege/dr-barbara-sturm/baby-and-kids/dr-barbara-sturm-baby-and-kids-baby-bum-cream-babykoerpercreme.html";

const booksdata = [];

async function getGenre(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const books = $("#\39 658977b-acca-4403-b2e1-3b3471fe9fff > h1 > a").text().trim();
        console.log(books);
        // books.each(function(){
        //     brand = $(this).find("a").text().trim();
        //     // title = $(this).find(".price_color").text();
        //     // image = $(this).find(".availability").text().trim();
        //     // console.log(brand);
        //     booksdata.push({brand});
        // })

        console.log(booksdata);
    } catch (error) {
        console.log(error);
    }
}

getGenre(url);
