var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash : true
}));

router.get('/signup', function(req, res) {
  res.render('register');
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash : true
}));

router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/blackjack', function(req, res, next) {
  res.render('blackjack/index');
});

router.get('/roulette', function(req, res, next) {
  res.render('roulette/index');
});

module.exports = router;
