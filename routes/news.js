const router = require('express').Router();
const newsController = require('../controller/newsController')
/* GET home page. */
router.get('/search/', newsController.filterNews);
router.get('/:id', newsController.getNews)
router.post('/', newsController.createNews, newsController.addTopic)
router.put('/:id', newsController.updateNews)
router.delete('/:id', newsController.deleteNews)
router.get('/', newsController.getAllNews);


module.exports = router;
