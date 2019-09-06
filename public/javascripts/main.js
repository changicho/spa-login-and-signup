// 페이지가 새로 로딩되었는지 확인.
// SPA 페이지 이동시 이벤트를 할당해주기 위함
let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {  
    if (mutation.addedNodes[0].id === 'component_main') {
      load_main_script();
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
function load_main_script() {
  // console.log('scripts of main');
}
load_main_script();