var express = require('express');
var router = express.Router();
var passport = require('passport');

var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('message', 'You must be logged in first.');
  res.redirect('/')
}

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

router.get('/blackjack', isAuthenticated, function(req, res, next) {
  res.render('blackjack/index', { user: req.user } );
});

router.get('/roulette', isAuthenticated, function(req, res, next) {
  res.render('roulette/index', { user: req.user } );
});

module.exports = router;
