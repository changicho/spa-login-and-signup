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

router.get('/logout', function(req, res, next) {
  res.render('layout');
});

/**
 * axios 테스트용 페이지
 */
router.get('/test', function (request, response, next) {
  response.render('axios_test');
});

module.exports = router;
