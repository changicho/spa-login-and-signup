/**
 * 초기화 담당 class
 */
class class_reset {
  constructor(data) {
    this.data = data

    this.modal = document.getElementById('reset')
    this.button_show = document.getElementById("button_reset")
    this.button_close = document.querySelectorAll('#reset .close')
    this.button_agree_reset = document.querySelector('#reset .agree')

    this.fillEventListener()
  }
  /**
   * 이벤트 바인딩
   */
  fillEventListener() {
    this.button_show.onclick = () => {
      this.modal.style.display = "block"
    }

    Array.from(this.button_close).reduce((previous, current) => {
      current.onclick = () => {
        this.modal.style.display = "none"
      }
    }, [])

    this.button_agree_reset.onclick = () => {
      this.data.clearAll()
      this.modal.style.display = "none"
    }

    window.onclick = (event) => {
      if (event.target == this.modal) {
        this.modal.style.display = "none"
      }
    }
  }
}

export default class_reset;