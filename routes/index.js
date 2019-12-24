var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController')
var main = new mainController();
var bodyParser = require('body-parser');


router.use(bodyParser.json());
/* GET home page. */
router.get('/', main.index);
router.get('/add-to-cart/:id', main.addToCart);
router.get('/shopping-cart', main.shoppingCart);
router.get('/checkout', isLoggedIn, main.checkout);
router.post('/checkout', isLoggedIn, main.checkout);
router.get('/reduce/:id', isLoggedIn, main.reduceByOne);
router.get('/remove/:id', isLoggedIn, main.remove);
// router.post('/checkout', main);
// router.get('')

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/users/signin');
}