var express = require('express');
var router = express.Router();

// low-db 추가
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

// uuid 추가
const uuidv1 = require('uuid/v1');

// SHA512 암호화 사용하기 위한 추가
const crypto = require('crypto');

/**
 * post 방식으로 온 데이터를 echo 하는 test URL
 */
router.post('/check_data', function (request, response, next) {
  // console.log(`method : POST, data = ${request.body}`);
  if (request.body.status === "ok") {
    response.send("ok");
  } else {
    response.send("no");
  }
})

/**
 * get 방식으로 온 데이터를 echo 하는 test URL
 */
router.get('/check_data', function (request, response, next) {
  console.log('method : GET')
  console.log(request.body);
  response.send(request.body);
})

/**
 * 로그인 시 비밀번호 확인
 * id 정보와 pw 정보 전부 왔을 경우에만 실행
 * id, pw가 올바를 경우 sessio에 저장
 */
router.post('/check_confidentiality', function (request, response, next) {
  if (!check_password(request.body.id, request.body.password)) {
    console.log('error check password')

    response.send({ result: false });
    return;
  }
  console.log('pass check password')

  let user_name = find_name_by_id(request.body.id);
  let uuid = uuidv1();
  let expire_time = new Date();
  expire_time.setMinutes(expire_time.getMinutes() + 1)

  let data = {
    "uuid": uuid,
    "user_name": user_name,
    "expire_time": expire_time
  }
  push_data(data, 'session')

  response.cookie('uuid', uuid, {
    maxAge: 50000
  });
  response.send({ result: true })
})

/**
 * 회원가입 정보를 DB에 저장함
 */
router.post('/store_account_data', function (request, response, next) {
  let new_account = make_account(request.body)
  push_data(new_account, 'accounts');

  let user_name = new_account.name;
  let uuid = uuidv1();
  let expire_time = new Date();
  expire_time.setMinutes(expire_time.getMinutes() + 1)

  let data = {
    "uuid": uuid,
    "user_name": user_name,
    "expire_time": expire_time
  }
  push_data(data, 'session')

  response.cookie('uuid', uuid, {
    maxAge: 50000
  });

  response.send({ "store": true })
})

/**
 * 회원가입 시 이미 존재하는 아이디인지 확인
 */
router.post('/check_exist_id', function (request, response, next) {
  let target = db.get('accounts')
    .find({ id: request.body.id })
    .value()

  if (target === undefined) {
    response.send({ "exist": false })
  } else {
    response.send({ "exist": true })
  }
})

/**
 * 로그아웃을 담당하는 API
 * 데이터베이스에서 현재 uuid 의 값을 삭제
 */
router.post('/logout', function (request, response, next) {
  let uuid = request.body.uuid;

  remove_session_data(uuid, 'session')
  response.clearCookie('uuid');

  response.send({ "data": true })
})

/**
 * DB 의 session 테이블에서 uuid 로 유저의 이름을 찾아줌.
 */
router.post('/get_username_by_uuid', function (request, response, next) {
  let uuid = request.body.uuid;

  let target = db.get('session').find({ uuid: uuid }).value()
  response.send({ "user_name": target.user_name })
})

/**
 * 가공된 데이터를 특정 테이블에 저장
 * @param {*} data DB에 저장하고 싶은 data
 * @param {*} table DB의 저장하고 싶은 table 
 */
function push_data(data, table) {
  db.get(table)
    .push(data)
    .write()
}

/**
 * DB 에서 데이터를 삭제하는 구문
 * @param {string} type 검색할 key 값 
 * @param {*} key 삭제를 원하는 id
 * @param {*} table 삭제를 원하는 테이블
 */
function remove_session_data(key, table) {
  db.get(table)
    .remove({
      uuid: key
    })
    .write()
}

/**
 * account 테이블에서 id로 이름을 찾아줌
 * @param {*} id 찾고자 하는 id
 */
function find_name_by_id(id) {
  let target = db.get('accounts')
    .find({ id: id })
    .value()

  return target.name;
}

/**
 * 계정 정보를 table 에 맞도록 가공해주는 함수
 * post로 날아온 form 태그의 정로를 가공
 * @param {*} requst_body : post로 넘어온 회원가입 정보
 */
function make_account(requst_body) {
  let password_sha512 = crypto.createHash('sha512').update(requst_body.password).digest('base64');
  console.log(password_sha512)
  return data = {
    "id": requst_body.id,
    "password": password_sha512,
    "name": requst_body.name,
    "birthdate": `${requst_body.year}.${requst_body.month}.${requst_body.day}`,
    "gender": requst_body.gender,
    "email": requst_body.email,
    "phone": requst_body.phone,
    "interest": requst_body.interests_string.split(',')
  }
}

/**
 * 로그인 시 아이디와 비밀번호를 확인
 * @param {*} input_id 입력한 ID값
 * @param {*} input_password 입력한 password 값
 */
function check_password(input_id, input_password) {
  let input_password_sha512 = crypto.createHash('sha512').update(input_password).digest('base64');

  let target = db.get('accounts')
    .find({ id: input_id })
    .value()

  if (target === undefined) {
    return false;
  }

  if (input_password_sha512 === target.password) {
    return true;
  }
  return false;
}

/**
 * 특정 시간마다 session 에서 만료된 시간인 정보를 초기화
 * 1분마다
 */
setInterval(() => {
  let session_table = db.get('session')
    .map('expire_time')
    .value()
  // console.log("check interval");

  let now = new Date();

  session_table.reduce((pre, cur) => {
    let expire_time = new Date(cur);

    if (now > expire_time) {
      db.get('session').remove({ expire_time: cur })
        .write()
    }
  }, [])
}, 60000);


module.exports = router;
