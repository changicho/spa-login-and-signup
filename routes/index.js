var express = require('express');
var router = express.Router();

//
router.get('/', function(req, res, next) {
  res.render('layout');
});

router.get('/login', function(req, res, next) {
  res.render('layout');
});

router.get('/signup', function(req, res, next) {
  res.render('layout');
});

router.get('/main', function(req, res, next) {
  // res.render('layout');
  res.send("$$$");

});

module.exports = router;
