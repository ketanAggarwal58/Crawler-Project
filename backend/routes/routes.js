const controller = require('../controller/crawlerController');
const router = require("express").Router();
const pool = require("../db");
const {fetchCrawlData, resulttableExist, createResultsTable, queueTableExist, createQueueTable, InsertQueueData} = require("../queries");

router.get('/', controller.fetchCrawledData);
router.get('/queue', controller.fetchQueue);
router.get('/queue/:status', controller.fetchQueueByStatus);
router.get('/insertData', controller.insertCrawledData);
router.post('/queue', (req, response) => {
    try{    
        let status = req.body.status;
        let name = req.body.name;
        let url = req.body.url;
        pool.query(queueTableExist, (error, results) => {
            if(error) throw error;
            console.log(results.rows[0].exists);
            if(results.rows[0].exists){
                pool.query(InsertQueueData, [name, status, url], (error, result) => {
                    if(error) throw error;
                    console.log("data Inserted in the queue");
                    response.status(201).json("Data Inserted in the Queue")
                });
            }else{
                pool.query(createQueueTable, (error, result) =>{
                    if(error) throw error;
                    console.log("queue table Created Successfully");
                });

                pool.query(InsertQueueData, [name, status, url], (error, result) => {
                    if(error) throw error;
                    console.log("data Inserted in the queue");
                    response.status(201).json("Data Inserted in the Queue")
                });
            }
        });
    }catch(error){
        console.log("error:" +error);
    }
});


module.exports = router;