const express = require("express");
const dotenv = require("dotenv");
const crawler = require('./crawler');

dotenv.config();
const app = express();

const fetchdata = require('./routes/routes')

app.use(express.json());
const url = "https://www.flaconi.de/pflege/brooklyn-soap-company/adventskalender-body-and-beard/brooklyn-soap-company-adventskalender-body-and-beard-adventskalender.html#sku=80072110-1";
crawler.pageCrawler(url);

app.use('/fetchData', fetchdata);

app.listen(process.env.PORT, () => {
    console.log("Server is up running on port: 8000")
});