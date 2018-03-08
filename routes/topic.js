const router = require('express').Router();
const topicController = require('../controller/topicController')
/* GET home page. */
router.get('/', topicController.getAllTopic);
router.get('/:id', topicController.getTopic)
router.post('/', topicController.createTopic)
router.put('/:id', topicController.updateTopic)
router.delete('/:id', topicController.deleteTopic)

module.exports = router;
