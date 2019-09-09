let cookies = document.cookie.split("; ");
let navigation_menu_list = document.querySelectorAll('nav ul li')
let div_login_message = document.querySelector("#onlogin")

if (cookies.length > 2) {
  div_login_message.style.display = "flex";

  console.log(cookies)

  let p_user_name = document.querySelector("#user_name")
  console.log(p_user_name)
  let user_name = cookies[2].split("=")[1];
  console.log(user_name)

  navigation_menu_list[1].innerHTML = '<a onclick="toLogoutApi()">Logout</a>'

  p_user_name.innerText = user_name

} else {
  navigation_menu_list[1].innerHTML = '<a href="/login">Login</a>'
  div_login_message.style.display = "none";
}

function toLogoutApi(){
  axios({
    url: "api/logout",
    method: "post",
    data: {
      id : cookies[2].split("=")[1]
    }
  }).then(res => {
    console.log(res);
    if (res.data) {
      console.log('check pass!')
      location.href = "/login"
    }else{
      console.log('check fail!')
    }
  });
}