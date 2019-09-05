const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// low-db 추가
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

// SHA512 암호화 사용하기 위한 추가
const crypto = require('crypto');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// view는 html 파일로 구성
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
app.get('/', function (request, response, next) {
  response.render('main');
});

app.get('/signup', function (request, response, next) {
  response.render('signup');
});

app.get('/login', function (request, response, next) {
  response.render('login');
});

app.post('/sendAccountInformation', function (request, response, next) {
  // request.body 는 json
  push_account(requst.body);
  response.render('login');
})

app.post('/checkData', function (request, response, next) {
  console.log(request.body);
  response.send(request.body);
})

app.post('/checkConfidentiality', function (request, response, next) {
  console.log(request.body);
})

app.post('/storeDataOfAccount', function (request, response, next) {
  push_data(request.body);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

function push_data(requst_body) {
  let password_sha512 = crypto.createHash('sha512').update(requst_body.password).digest('base64');

  let data = {
    "id": requst_body.id,
    "password": password_sha512,
    "name": requst_body.name,
    "birthdate": `${requst_body.year}.${requst_body.month}.${requst_body.day}`,
    "gender": requst_body.gender,
    "email": requst_body.email,
    "phone": requst_body.phone,
    "interest": requst_body.interests_string.split(', ')
  }
  db.get('accounts')
    .push(data)
    .write()
}

module.exports = app;
