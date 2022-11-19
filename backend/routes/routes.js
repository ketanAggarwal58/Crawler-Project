const { fetchCrawledData, insertCrawledData } = require('../controller/crawlerController');
const router = require("express").Router();

router.get('/', fetchCrawledData);
router.get('/test', insertCrawledData);


module.exports = router;