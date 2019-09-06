/* PJAX 방식 SPA & routing
출처 : https://poiemaweb.com/js-spa
 */
const Routing = {
  main: document.querySelector('main'),
  render: function (title, data, footer) {
    const webpage_title = document.querySelector('title');

    webpage_title.innerText = title;
    this.main.innerHTML = data;
  },

  routes: {
    '/': function () {
      Routing.get('/views/main.html').then(
        res => {
          Routing.render('메인페이지', res, ['show', 'show', 'unshow'])
          change_script('javascripts/main.js')
        }
      )
    },
    '/login': function () {
      Routing.get('/views/login.html').then(
        res => {
          Routing.render('로그인페이지', res, ['show', 'show', 'unshow'])
          change_script('javascripts/login.js')
        }
      )
    },

    '/signup': () => {
      Routing.get('/views/signup.html').then(
        res => {
          Routing.render('회원가입페이지', res, ['show', 'show', 'unshow'])
          change_script('javascripts/signup.js')
        }
      )
    },
    otherwise(path) {
      title.innerText = "page not found"
      renderHtml(`${path} Not Found`)
    }
  }, router: function (path) {
    (this.routes[path] || this.routes.otherwise)(path);
  },
  get: function (url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.send();

      req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status === 200) resolve(req.response);
          else reject(req.statusText);
        }
      }
    })
  }
}

function change_script(source){
  document.head.removeChild(document.querySelector('script[type=module]'));

  const script_signup = document.createElement('script')
  script_signup.type = 'module';
  script_signup.src = source;
  document.head.appendChild(script_signup);
}

window.addEventListener('popstate', (e) => {
  Routing.router(e.state === null ? '/' : e.state.path);
});

document.querySelector('nav').addEventListener('click', (e) => {
  if (!e.target || e.target.nodeName !== 'A') return;
  e.preventDefault();

  const path = e.target.getAttribute('href');
  history.pushState({ path }, null, path);
  Routing.router(path);
})

Routing.router(window.location.pathname);