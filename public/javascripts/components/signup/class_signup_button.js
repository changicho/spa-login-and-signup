/**
 * 가입하기 버튼 class
 */
class class_signup_button {
  constructor(data) {
    this.data = data

    this.button_show = document.getElementById("button_signin")
    this.modal = document.getElementById('alert_empty')
    this.button_close = document.querySelectorAll('#alert_empty .close')
    this.button_agree_reset = document.querySelector('#alert_empty .agree')
    this.alert_box = this.modal.querySelector('#modal_error_box')

    this.form = data.form;

    this.fillEventListener()
  }
  /**
   * 이벤트 바인딩
   */
  fillEventListener() {
    this.button_show.onclick = () => {
      let error_message = this.data.checkAllFilled()
      // 모든 항목이 제대로 입력 된경우 가입
      if (error_message.length === 0) {
        this.sendDataToServer();
      } else {
        this.fillErrorMessage(error_message)
        this.modal.style.display = "block"
      }
    }

    Array.from(this.button_close).reduce((previous, current) => {
      current.onclick = () => {
        this.closeModal()
      }
    }, [])

    this.button_agree_reset.onclick = () => {
      this.closeModal()
    }

    window.onclick = (event) => {
      if (event.target == this.modal) {
        this.closeModal()
      }
    }
  }
  /**
   * 모달 창에 경고 메시지들을 출력
   * @param {*} alerts 경고 메시지 내용
   */
  fillErrorMessage(alerts) {
    let error_box = document.createElement('ul')
    alerts.reduce((previous, current) => {
      let alert = document.createElement('li')
      alert.innerHTML = `<p>${current}</p>`
      error_box.appendChild(alert)
    }, [])

    this.alert_box.appendChild(error_box)
  }
  /**
   * 모달 창 닫기
   */
  closeModal() {
    this.modal.style.display = "none"
    this.alert_box.querySelector('ul').remove()
  }
  /**
   * 서버에 데이터 저장을 요청
   * form의 데이터를 json으로 전송
   * 전송 방식은 axios, post
   */
  sendDataToServer() {
    axios({
      url: "api/store_account_data",
      method: "post",
      data: {
        id: this.form.id.value,
        password: this.form.password.value,
        name: this.form.name.value,
        year: this.form.year.value,
        month: this.form.month.value,
        day: this.form.day.value,
        gender: this.form.gender.value,
        email: this.form.email.value,
        phone: this.form.phone.value,
        interests_string: this.form.interests_string.value
      }
    }).then(res => {
      if (res.data.store) {
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
          }
        });

      } else {
        // console.log('there are error on store')
      }
    })
    window.location.href = '/'
  }
}

export default class_signup_button;