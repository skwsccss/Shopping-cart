var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController')
var main = new mainController();
var bodyParser = require('body-parser');
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport')
router.use(csrfProtection);

/* GET users listing. */
router.get('/signup', main.signup);
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/signup',
  failureFlash: true
}));
// router.post('/signup', (req, res) => {
//   console.log(req.method, req.body);
// });
router.get('/profile', (req, res, next) => {
  res.render('auth/profile');
});

module.exports = router;
