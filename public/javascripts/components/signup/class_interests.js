/**
 * 관심사 담당 class
 */
class class_interest {
  constructor(data) {
    this.data = data

    this.box = document.getElementById('interest')
    this.input_interest = document.getElementById('input_interest')
    this.p_message = this.box.parentNode.querySelector('.check_message')
    this.input_interest_hidden = this.box.parentNode.querySelector('.hidden')

    this.input_interest.style.width = '-webkit-fill-available'

    this.fillEventLisnter()
  }
  /**
   * 내부 태그의 이벤트 설정
   */
  fillEventLisnter() {
    this.box.addEventListener('click', () => {
      this.input_interest.focus()
    })

    this.input_interest.addEventListener('keydown', (event) => {
      // case backspace
      if (event.keyCode === 8 && this.input_interest.value === '' && this.data.interest_list.length !== 0) {
        // 글자 지우는 event 이후에 값을 온전히 불러오기 위해 eventQueue 에 할당
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

    this.input_interest.addEventListener('keyup', (event) => {
      if (event.keyCode === 188) {
        this.input_interest.value = ''
      }
    })
  }
  /**
   * ,로만 이루어진 문자열인지 검사
   * @param {*} input_string 관심사 입력 태그의 값
   */
  checkOnlyRest(input_string) {
    let check_string = input_string.replace(/,/gi, '')

    if (check_string.length === 0) {
      return true
    }
    return false
  }
  /**
   * ❌ 버튼을 누르면 관심사 삭제
   * @param {*} node 
   */
  fillRemoveEvent(node) {
    let title_of_interest = node.children[0].innerHTML

    let index_of_remove = this.data.interest_list.indexOf(title_of_interest)
    if (index_of_remove > -1) this.data.interest_list.splice(index_of_remove, 1)
    node.remove()
  }
  /**
   * 관심사 태그 추가
   * @param {*} title 관심사 태그의 이름
   */
  pushTag(title) {
    this.input_interest.insertAdjacentHTML('beforebegin', this.makeTitleToTag(title))

    let new_interest_tag = Array.from(document.querySelectorAll('.interest_tag')).pop()

    new_interest_tag.children[1].addEventListener('click', () => {
      this.fillRemoveEvent(new_interest_tag)
    })
    this.data.interest_list.push(title)
    this.input_interest_hidden.value = this.data.interest_list
    this.data.interest_count += 1
    this.checkCountOfTag()
  }
  /**
   * 관심사 list 에서 마지막 태그를 삭제
   */
  popTag() {
    this.box.removeChild(this.box.childNodes[this.box.childNodes.length - 3])
    this.input_interest.value = this.data.interest_list.pop()
    this.input_interest_hidden.value = this.data.interest_list
    this.data.interest_count -= 1
    this.checkCountOfTag()
  }
  /**
   * 태그 이름을 입력받아 html로 변환
   * @param {*} title 태그의 이름
   */
  makeTitleToTag(title) {
    return `<div class="interest_tag"><p>${title}</p><button>❌</button></div>`
  }
  /**
   * 가로 폭을 동적으로 할당
   * @param {*} input_interest 관심사 입력 input tag
   */
  calculateInputWidth(input_interest) {
    const margin = 20
    let value = this.input_interest.value
    this.box.insertAdjacentHTML('afterbegin', '<div id="virtual_dom">' + value + '</div>');

    // 글자 하나의 대략적인 크기 
    let input_width = document.getElementById('virtual_dom').offsetWidth + margin + "px";
    input_interest.style.width = input_width

    document.getElementById('virtual_dom').remove()
  }
  /**
   * 관심사의 개수가 3개 이상인지 확인
   */
  checkCountOfTag() {
    if (this.data.interest_count < 3) {
      this.showErrorMessage('관심사를 3개이상 입력해주세요')
      this.data.interest = false
    } else {
      this.showCorrectMessage('관심사가 3개 이상입니다.')
      this.data.interest = true
    }
  }
  /**
   * 관심사 메시지 tag 에 에러 메시지 출력
   * @param {*} message 에러 메시지
   */
  showErrorMessage(message) {
    this.p_message.style.color = 'red'
    this.p_message.innerText = message
  }
  /**
   * 관심사 메시지 tag 에 통과 메시지 출력
   * @param {*} message 통과 메시지
   */
  showCorrectMessage(message) {
    this.p_message.style.color = 'green'
    this.p_message.innerText = message
  }
}

export default class_interest;