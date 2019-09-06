/* 가입하기 버튼 class */
class class_signup_button {
  constructor(data) {
    this.data = data

    this.button_show = document.getElementById("button_signin")
    this.modal = document.getElementById('alert_empty')
    this.button_close = document.querySelectorAll('#alert_empty .close')
    this.button_agree_reset = document.querySelector('#alert_empty .agree')
    this.alert_box = this.modal.querySelector('#modal_error_box')

    this.fillEventListener()
  }
  fillEventListener() {
    this.button_show.onclick = () => {
      let error_message = this.data.checkAllFilled()
      if (error_message.length === 0) {
        window.location.href = '/'
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
  fillErrorMessage(alerts) {
    let error_box = document.createElement('ul')
    alerts.reduce((previous, current) => {
      let alert = document.createElement('li')
      alert.innerHTML = `<p>${current}</p>`
      error_box.appendChild(alert)
    }, [])

    this.alert_box.appendChild(error_box)
  }
  closeModal() {
    this.modal.style.display = "none"
    this.alert_box.querySelector('ul').remove()
  }
}

export default class_signup_button;