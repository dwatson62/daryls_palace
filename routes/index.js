var express = require('express');
var router = express.Router();
var passport = require('passport');

// var isAuthenticated = function (req, res, next) {
//   if (req.isAuthenticated())
//     return next();
//   res.redirect('/');
// }

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
  res.render('blackjack/index');
});

router.get('/roulette', function(req, res, next) {
  res.render('roulette/index');
});

module.exports = router;
