const pool = require("../../db");
const {fetchCrawlData} = require("../../queries");

const fetchCrawledData = (request, response) => {
    pool.query(fetchCrawlData, (error, results) => {
        if(error) throw error;
        response.status(200).json(results.rows);
    });
}

module.exports = {
    fetchCrawledData,
};