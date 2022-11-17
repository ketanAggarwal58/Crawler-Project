const express = require("express");
const dotenv = require("dotenv");
// const { Client } = require("pg");
const db = require('./db');
const crawler = require('./crawler');
const cheerio = require('cheerio');

dotenv.config();

const app = express();



app.listen(process.env.PORT, () => {
    console.log("Server is up running on port: 8000")
});