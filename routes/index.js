var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController')
var main = new mainController();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
/* GET home page. */
router.get('/', main.index);

module.exports = router;

