var express = require('express');
var router = express.Router();

/**
 * 모든 페이지는 layout 을 render 한다
 * 각 history 마다 내용의 변경은 spa_router.js 에서 담당
 */
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
