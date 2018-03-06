const router = require('express').Router();
const UserController = require('../controller/userController')

/* GET users listing. */
router.get('/', UserController.getData);

module.exports = router;
