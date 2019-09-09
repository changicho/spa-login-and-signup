import class_set_prevent_dafault from "./components/signup/class_set_prevent_default.js";
import class_signup_data from "./components/signup/class_signup_data.js"
import class_account from "./components/signup/class_account.js"
import class_interest from "./components/signup/class_interests.js"
import class_terms from "./components/signup/class_terms.js"
import class_reset from "./components/signup/class_reset.js"
import class_signup_button from "./components/signup/class_signup_button.js"
import class_birthdate from "./components/signup/class_birthdate.js"
import class_private from "./components/signup/class_private.js"

// 페이지가 새로 로딩되었는지 확인.
// SPA 페이지 이동시 이벤트를 할당해주기 위함
let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes[0].id === 'component_signup') {
      load_signup_script();
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
function load_signup_script() {
  new class_set_prevent_dafault()
  let data = new class_signup_data()

  new class_interest(data)
  new class_account(data)
  new class_terms(data)
  new class_reset(data)
  new class_signup_button(data)
  new class_birthdate(data)
  new class_private(data)
}
load_signup_script();