/**
 * ???? class
 */
class class_terms {
  constructor(data) {
    this.data = data

    this.modal_terms = document.getElementById('terms')
    this.button_show = document.getElementById("button_terms")
    this.button_close = document.getElementById("close_terms")
    this.button_agree = document.querySelector("#terms .agree")
    this.checkbox = document.querySelector('#check_terms')
    this.terms_box = this.modal_terms.querySelector('.terms')

    this.fillEventListener()
  }
  /**
   * ??? ???
   */
  fillEventListener() {
    this.button_show.onclick = () => {
      this.modal_terms.style.display = "block"
    }

    this.button_close.onclick = () => {
      this.modal_terms.style.display = "none";
    }

    this.button_agree.onclick = () => {
      this.setAgree()
      this.modal_terms.style.display = "none"
    }

    window.onclick = (event) => {
      if (event.target == this.modal_terms) {
        this.modal_terms.style.display = "none"
      }
    }

    this.checkbox.onclick = (event) => {
      event.preventDefault()
    }

    this.terms_box.addEventListener('scroll', () => {
      let scroll_position = this.terms_box.scrollTop + this.terms_box.clientHeight
      let scroll_height = this.terms_box.scrollHeight

      if (scroll_position === scroll_height) {
        this.setAgree()
        this.modal_terms.style.display = "none"
      }
    })
  }
  /**
   * ???? ?? ???? ???? ??
   */
  setAgree() {
    this.checkbox.checked = true
  }
}

export default class_terms;
