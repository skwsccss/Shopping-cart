var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController')
var main = new mainController();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', main.index);

module.exports = router;

