const { fetchCrawledData } = require('../controller/crawlerController');
const router = require("express").Router();

router.get('/', fetchCrawledData);


module.exports = router;