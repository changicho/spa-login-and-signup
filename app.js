const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/**
 * 라우터 추가
 */
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/api');
var apiRouter = require('./routes/api');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// // view는 pug 파일로 구성
// app.set('view engine', 'pug');

// view는 html 파일로 구성
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api', apiRouter);

// 쿠키 예제
app.get('/set_cookie', function (req, res) {
  // var visitors = req.cookies.visitors || 0
  // visitors ++;

  let json = {
    id: "hello",
    pass: "word"
  }
  res.cookie('visitors', json, {
    maxAge: 5000
  });

  res.send('visitors: ' + json);
});

// 쿠키 예제
app.get('/get_cookie', function (req, res) {
  var visitors = req.cookies.visitors;
  res.send('Visitors: ' + visitors.id);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
  // 404 페이지로 return
  res.render('404error');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
