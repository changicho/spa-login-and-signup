/* 관심사 담당 class
  data : [
    관심사 저장 list
  ]
  */
class class_interest {
  constructor(data) {
    this.data = data

    this.box = document.getElementById('interest')
    this.input_interest = document.getElementById('input_interest')
    this.p_message = this.box.parentNode.querySelector('.check_message')
    this.input_interest_hidden = this.box.parentNode.querySelector('.hidden')

    this.input_interest.style.width = '-webkit-fill-available'

    this.render_interest()
    this.fillEventLisnter()
  }
  fillEventLisnter() {
    this.box.addEventListener('click', () => {
      this.input_interest.focus()
    })

    this.input_interest.addEventListener('keydown', (event) => {
      // case backspace
      if (event.keyCode === 8 && this.input_interest.value === '' && this.data.interest_list.length !== 0) {
        // 글자 지우는 event 이후에 값을 온전히 불러오기 위해
        // eventQueue 에 할당
        setTimeout(() => {
          this.popTag()
        }, 0)
      }
      // case rest
      if (event.keyCode === 188) {
        if (this.input_interest.value !== '' && !this.checkOnlyRest(this.input_interest.value)) {
          this.pushTag(this.input_interest.value)
          this.input_interest.value = ''
        } else {
          this.input_interest.value = ''
        }
      }
      // change width
      setTimeout(() => {
        this.calculateInputWidth(this.input_interest)
      }, 0)
    })
    // , keyup event
    this.input_interest.addEventListener('keyup', (event) => {
      if (event.keyCode === 188) {
        this.input_interest.value = ''
      }
    })
  }
  checkOnlyRest(input_string) {
    let check_string = input_string.replace(/,/gi, '')

    if (check_string.length === 0) {
      return true
    }
    return false
  }
  fillCloseEvent(node) {
    let title_of_interest = node.children[0].innerHTML

    let index_of_remove = this.data.interest_list.indexOf(title_of_interest)
    if (index_of_remove > -1) this.data.interest_list.splice(index_of_remove, 1)
    node.remove()
  }
  // 최초 view에 로딩
  render_interest() {
    this.data.interest_list.reduce((previous, current) => {
      this.pushTag(current)
    }, [])
  }
  // 관심사 태그를 추가
  pushTag(title) {
    this.input_interest.insertAdjacentHTML('beforebegin', this.makeTitleToTag(title))

    let new_interest_tag = Array.from(document.querySelectorAll('.interest_tag')).pop()

    new_interest_tag.children[1].addEventListener('click', () => {
      this.fillCloseEvent(new_interest_tag)
    })
    this.data.interest_list.push(title)
    this.input_interest_hidden.value = this.data.interest_list
    this.data.interest_count += 1
    this.checkCountOfTag()
  }
  // 키보드 입력으로 list 제어
  popTag() {
    this.box.removeChild(this.box.childNodes[this.box.childNodes.length - 3])
    this.input_interest.value = this.data.interest_list.pop()
    this.input_interest_hidden.value = this.data.interest_list
    this.data.interest_count -= 1
    this.checkCountOfTag()
  }
  makeTitleToTag(title) {
    return `<div class="interest_tag"><p>${title}</p><button>❌</button></div>`
  }
  calculateInputWidth(input_interest) {
    const margin = 20
    let value = this.input_interest.value
    this.box.insertAdjacentHTML('afterbegin', '<div id="virtual_dom">' + value + '</div>');

    // 글자 하나의 대략적인 크기 
    let input_width = document.getElementById('virtual_dom').offsetWidth + margin + "px";
    input_interest.style.width = input_width

    document.getElementById('virtual_dom').remove()
  }
  checkCountOfTag() {
    if (this.data.interest_count < 3) {
      this.showErrorMessage('관심사를 3개이상 입력해주세요')
      this.data.interest = false
    } else {
      this.showCorrectMessage('관심사가 3개 이상입니다.')
      this.data.interest = true
    }
  }
  showErrorMessage(message) {
    this.p_message.style.color = 'red'
    this.p_message.innerText = message
  }
  showCorrectMessage(message) {
    this.p_message.style.color = 'green'
    this.p_message.innerText = message
  }
}

export default class_interest;