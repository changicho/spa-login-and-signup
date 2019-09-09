let cookies = document.cookie.split("; ");
let navigation_menu_list = document.querySelectorAll('nav ul li')
let div_login_message = document.querySelector("#onlogin")

if (cookies.length > 2) {
  div_login_message.style.display = "flex";

  let p_user_name = document.querySelector("#user_name")
  let uuid = cookies[2].split("=")[1];

  navigation_menu_list[1].innerHTML = '<a onclick="toLogoutApi()">Logout</a>'

  axios({
    url: "api/get_username_by_uuid",
    method: "post",
    data: {
      uuid: uuid
    }
  }).then(res => {
    p_user_name.innerText = res.data.user_name;
  });


} else {
  navigation_menu_list[1].innerHTML = '<a href="/login">Login</a>'
  div_login_message.style.display = "none";
}

function toLogoutApi() {
  axios({
    url: "api/logout",
    method: "post",
    data: {
      uuid: cookies[2].split("=")[1]
    }
  }).then(res => {
    if (res.data) {
      location.href = "/login"
    } else {
      console.log('check fail!')
    }
  });
}