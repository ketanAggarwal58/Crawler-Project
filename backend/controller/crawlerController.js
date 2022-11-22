const pool = require("../db");
const crawler = require("../crawler");
const {fetchCrawlData, resulttableExist, createResultsTable, queueTableExist, createQueueTable} = require("../queries");


const fetchCrawledData = async (request, response) => {
    pool.query(fetchCrawlData, (error, results) => {
        if(error) throw error;
        response.status(200).json(results.rows);
    });
};

const insertQueueData = async (req, response) => {
    try{    
        let status = req.body.status;
        let name = req.body.name;
        let url = req.body.url;
        pool.query(queueTableExist, (error, results) => {
            if(error) throw error;
            if(results.rows[0].exists){
                pool.query(insertQueueData, [name, status, url], (error, result) => {
                    if(error) throw error;
                    console.log("data Inserted in the queue");
                    insertCrawledData;
                    response.status(201).json("Data Inserted in the Queue")
                });
            }else{
                pool.query(createQueueTable, (error, result) =>{
                    if(error) throw error;
                    console.log("queue table Created Successfully");
                });

                pool.query(insertQueueData, [name, status, url], (error, result) => {
                    if(error) throw error;
                    console.log("data Inserted in the queue");
                    insertCrawledData;
                    response.status(201).json("Data Inserted in the Queue")
                });
            }
        });
    }catch(error){
        console.log("error:" +error);
    }
};

const insertCrawledData = (request, response) => {
    // fetch data From Queue
    pool.query("SELECT * FROM queue WHERE Job_status = $1", ['in_progress'], (error, result) => {
        if(error) throw error;
        let row = result.rows;
        let rowCount = result.rowCount;
        for(let i = 0; i < rowCount; i++){
            // check Table Exists or not
            pool.query(resulttableExist, (error, results) => {
                if(error) throw error;
                if(results.rows[0].exists){
                    // check image url
                    pool.query("SELECT * FROM results WHERE Image = $1", [row[i].job_url], (error, results) => {
                        if(error) throw error;
                            crawler.pageCrawler(row[i].job_url, row[i].id).catch((error) => {console.log(error)});
                            // response.status(200).json("Crawler Data Inserted");
                    });

                    // add Data to DB
                }else{
                    // create Table
                    pool.query(createResultsTable, (error, result) => {
                        if(error) throw error;
                        console.log("Table Created Successfully");
                    });
                    // Insert Data

                    crawler.pageCrawler(row[i].job_url).catch((error) => {console.log(error)});
                }
            });
        }
    });

    // update queue row

    pool.query("SELECT * FROM queue WHERE Job_status = $1", ['enqueued'], (error, results) => {
        if(error) throw error;
        let row = results.rows;
        let rowCount = results.rowCount;
        for(let i = 0; i < rowCount; i++){
            var dateTime = new Date();
            pool.query("UPDATE queue SET Job_Status = $1, Job_Updated_at = $2 WHERE ID = $3", ['in_progress', dateTime, results.rows[i].id], (error, result) => {
                if(error) throw error;
            });
        }
        console.log("Queue Status Updated");
    });

};

const fetchQueue = (request, response) => {
    pool.query('SELECT * FROM queue', (error, result) => {
        if(error) throw error;
        response.status(200).json(result.rows);
    });
};

const fetchQueueByStatus = (request, response) => {
    const status = request.params.status;
    pool.query('SELECT * FROM queue WHERE job_status = $1', [status], (error, result) => {
        if(error) throw error;
        response.status(200).json(result.rows);
    });
};

const updateCrawlingQueue = (request, response) => {
    // pool.query(, (error, results) => {});
};

module.exports = {
    fetchCrawledData,
    insertCrawledData,
    fetchQueue,
    fetchQueueByStatus,
    insertQueueData
};