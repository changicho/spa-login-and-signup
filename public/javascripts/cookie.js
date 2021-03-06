let cookies = document.cookie.split("; ");
let navigation_menu_list = document.querySelectorAll('nav ul li')
let div_login_message = document.querySelector("#onlogin")

if (find_uuid(cookies)) {
  div_login_message.style.display = "flex";

  let p_user_name = document.querySelector("#user_name")
  let uuid = find_uuid(cookies);

  navigation_menu_list[1].innerHTML = '<a onclick="toLogoutApi()">Logout</a>'
  navigation_menu_list[2].style.display="none",
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
  navigation_menu_list[2].style.display="flex";
}

function find_uuid(cookies){
  let uuid = undefined
  cookies.reduce((pre,cur)=>{
    if(cur===""){
      return
    }

    let type = cur.split('=')[0];
    if(type==='uuid'){
      uuid = cur.split('=')[1];
    }
  },[])

  return uuid;
}

function toLogoutApi() {
  axios({
    url: "api/logout",
    method: "post",
    data: {
      uuid: find_uuid(cookies)
    }
  }).then(res => {
    if (res.data) {
      location.href = "/login"
    } else {
      console.log('check fail!')
    }
  });
}