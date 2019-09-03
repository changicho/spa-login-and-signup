/* PJAX 방식 SPA & routing
출처 : https://poiemaweb.com/js-spa
 */
(function () {
  const root = document.querySelector('.app-root');
  const navigation = document.getElementById('navigation');
  const title = document.querySelector('title')

  function renderHtml(html) {
    root.innerHTML = html;
  }

  function get(url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.send();

      req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status === 200) resolve(req.response)
          else reject(req.statusText)
        }
      };
    });
  }

  const routes = {
    '/': function () {
      title.innerText = "메인 페이지"
      // renderHtml('')
      get('/view/main.html')
        .then(res => renderHtml(res))
    },
    '/login': function () {
      title.innerText = "로그인 페이지"
      get('/view/login.html')
        .then(res => renderHtml(res))
    },
    '/signup': () => {

      title.innerText = "회원가입 페이지"
      get('/view/signup.html')
        .then((res) => {
          renderHtml(res)
        });
      const script_signup = document.createElement('script')
      script_signup.src = '/js/signup.js'
      document.head.appendChild(script_signup)
    },
    otherwise(path) {
      title.innerText = "page not found"
      renderHtml(`${path} Not Found`)
    }
  };

  function router(path) {
    (routes[path] || routes.otherwise)(path);
  }

  // history entry가 변경되면 발생하는 이벤트
  // PJAX 방식은 hash를 사용하지 않으므로 hashchange 이벤트를 사용할 수 없다.
  // popstate event는 pushState에 의해 발생시키지 않는다.
  // 이전페이지 / 다음페이지 button 또는 history.back() / history.go(n)에 의해 발생한다.
  window.addEventListener('popstate', e => {
    // e.state는 pushState 메소드의 첫번째 인수
    console.log('[popstate]', e.state);
    // 이전페이지 / 다음페이지 button이 클릭되면 router를 호출
    router(e.state.path);
  });

  // 내비게이션을 클릭하면 주소창의 url이 변경되므로 서버로 요청이 전송된다.
  // preventDefault를 사용하여 이를 방지하고 history 관리를 위한 처리를 실시
  navigation.addEventListener('click', e => {
    if (!e.target || e.target.nodeName !== 'A') return;
    e.preventDefault();

    // 이동 페이지
    const path = e.target.getAttribute('href');

    // pushState 메소드는 주소창의 URL은 변경하지만 요청하지는 않는다.
    history.pushState({
      path
    }, null, path);

    // path에 의한 AJAX 요청
    router(path);
    // location.reload()
  });

  // 웹페이지가 처음 로딩되었을 때
  // 404 에러 및 경로로 직접 들어오는 부분 처리를 위한 pathname 사용
  router(window.location.pathname)
}());