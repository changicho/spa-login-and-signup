# 로그인과 회원가입 저장소

[heroku 링크](https://pacific-ocean-80855.herokuapp.com/)

## SPA 구현

라우터들은 전부 layout으로 라우팅
layout에서 SPA 라우팅을 담당하는 spa_router.js 를 이용.
URL 경로마다 main 태그의 내용을 바꾸어줌.

각 페이지마다 필요한 js 동적으로 로딩

회원가입 js는 모듈로 나눠서 script tag, type = module 로 import

## back-end

index.js 는 페이지 라우팅을 담당
api.js 는 api/명령 방식으로 접근, 응답을 json의 형식으로 send

api.js 에서만 database 접근
database는 low-db로 구현

로그인 시 세션에 정보 저장 (uuid, name, expire_time)
서버에서는 주기적으로 오래된 세션을 파기 (시간 단위에 따라)
api 에서 응답 시 쿠키 사용

## 공부한 내용

express 서버 구성
low-db (설치가 필요 없는 데이터베이스)
back-end api request, response 응답
브라우저에서 javascript module import
SPA 순수 js로 구현
세션, 쿠키
