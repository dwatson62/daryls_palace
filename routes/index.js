var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/blackjack', function(req, res, next) {
  res.render('blackjack/index');
});

router.get('/roulette', function(req, res, next) {
  res.render('roulette/index');
});

module.exports = router;
