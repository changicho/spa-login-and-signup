// 페이지가 새로 로딩되었는지 확인.
// SPA 페이지 이동시 이벤트를 할당해주기 위함
let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes[0].id === 'component_login') {
      load_login_script();
    }
  })
})
// 바뀌는것을 감지할 인자들.
// childList가 바뀌는지 확인한다.
let config = {
  childList: true,
};
observer.observe(document.querySelector('main'), config);
/**
 * 이벤트를 할당해주는 함수
 */
function load_login_script() {
  let error_message = document.querySelector('.check_message')

  console.log('event bind')

  document.querySelector('#submit_axios').addEventListener('click', () => {
    console.log('send axios')
    axios({
      url: "api/check_confidentiality",
      method: "post",
      data: {
        id: document.forms[0].id.value,
        password: document.forms[0].password.value
      }
    }).then(res => {
      if (res.data.result) {
        console.log(res)

        window.location.href = "/";
      } else {
        error_message.style.color = "red";
        error_message.innerHTML = "아이디와 비밀번호를 확인해주세요"
      }
    });
  });
  // console.log('scripts of login');
}
load_login_script();