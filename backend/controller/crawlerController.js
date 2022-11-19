const pool = require("../db");
const {fetchCrawlData, tableExist, createResultsTable} = require("../queries");

const fetchCrawledData = (request, response) => {
    pool.query(fetchCrawlData, (error, results) => {
        if(error) throw error;
        response.status(200).json(results.rows);
    });
}

const insertQueueData = (request, response) => {
    const {status, name, url} = request.body;
}

const insertCrawledData = (request, response) => {

    // fetch data From Queue
    pool.query("", (error, result) => {});

    // check Table Exists or not
    pool.query(tableExist, (error, results) => {
        if(error) throw error;

        if(results.rows[0].exists){
            // check image url
            pool.query("", (error, results) => {
                if(error) throw error;

            });

            // add Data to DB
        }else{
            // create Table
            pool.query(createResultsTable, (error, result) => {
                if(error) throw error;
                console.log("Table Created Successfully");
            });
            // Insert Data
            pool.query()
        }
    });

    // update queue row

};

const updateCrawlingQueue = (request, response) => {
    // pool.query(, (error, results) => {});
};

module.exports = {
    fetchCrawledData,
    insertCrawledData
};