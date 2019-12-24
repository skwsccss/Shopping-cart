var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController')
var main = new mainController();
var bodyParser = require('body-parser');
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport')
router.use(csrfProtection);

router.get('/profile', isLoggedIn, main.Profile);

router.get('/logout', isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.use('/', notLoggedIn, (req, res, next) => {
  next();
});

/* GET users listing. */
router.get('/signup', main.signup);
router.post('/signup', passport.authenticate('local-signup', {
  // successRedirect: '/users/profile', ==> callback
  failureRedirect: '/users/signup',
  failureFlash: true
}), (req, res, next) => {
  if (req.session.oldUrl) {
    let oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/users/profile');
  }
});
// router.post('/signup', (req, res) => {
//   console.log(req.method, req.body);
// });
router.get('/signin', main.signin);
// router.post('/signin', main.signin);
router.post('/signin', passport.authenticate('local-signin', {
  // successRedirect: '/users/profile',instead this ==> callback function
  failureRedirect: '/users/signin',
  failureFlash: true
}), (req, res, next) => {
  if (req.session.oldUrl) {
    let oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/users/profile');
  }
});



module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}