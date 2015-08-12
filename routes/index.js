var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message: req.flash('message'), user: req.user } );
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash : true
}));

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/blackjack', function(req, res, next) {
  res.render('blackjack/index', { user: req.user } );
});

router.get('/roulette', function(req, res, next) {
  res.render('roulette/index', { user: req.user } );
});

module.exports = router;
