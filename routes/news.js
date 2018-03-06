const router = require('express').Router();
const newsController = require('../controller/newsController')
/* GET home page. */
router.get('/', newsController.getData);

module.exports = router;
