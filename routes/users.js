var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) { return next(err) };
    console.log(post.name + " was saved!")
    res.json(post);
  });
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) {
      return next(err)
    } else {
      res.json({ message: req.body.name + " was deleted" });
    }
  });
});

module.exports = router;
