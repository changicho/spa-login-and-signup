/**
 * 개인정보 검사 담당 class
 * data : 
 * 조건 불만족시 에러 메시지
 * 조건 만족시 메시지
 * 검사할 정규식
 * section_private section tag
 */
class class_private {
  constructor(data) {
    this.data = data

    this.section_private = document.getElementById('section_private')

    this.input_name = document.getElementsByName('name')[0]
    this.select_gender = document.getElementsByName('gender')[0]
    this.input_email = document.getElementsByName('email')[0]
    this.input_phone = document.getElementsByName('phone')[0]

    this.fillEventListener()
  }
  /**
   * 이벤트 바인딩
   */
  fillEventListener() {
    this.input_name.addEventListener('keyup', () => {
      this.checkName()
    })
    this.select_gender.addEventListener('change', () => {
      if (this.select_gender.value === "") {
        return
      }
      this.checkGender()
    })
    this.input_email.addEventListener('keyup', () => {
      this.checkEmail()
    })
    this.input_phone.addEventListener('keyup', () => {
      this.checkPhone()
    })
  }
  /**
   * 이름을 입력 했는지 확인
   */
  checkName() {
    let name = this.input_name.value;
    if (name.length !== 0) {
      this.data.name = true
    } else {
      this.data.name = false
    }
  }
  /**
   * 성별을 입력 했는지 확인
   */
  checkGender() {
    this.data.gender = true
  }
  /**
   * 이메일이 올바른지 확인
   */
  checkEmail() {
    const rule_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    const p_message = this.input_email.parentNode.parentNode.children[2]
    let email = this.input_email.value


    if (!rule_email.test(email)) {
      this.showErrorMessage(p_message, '이메일 주소를 다시 확인해주세요.')
      this.data.email = false
    } else {
      this.showCorrectMessage(p_message, '올바른 이메일 입니다.')
      this.data.email = true
    }
  }
  /**
   * 휴대전화 입력이 올바른지 확인
   */
  checkPhone() {
    const rule_phone = /^\d{3}-\d{3,4}-\d{4}$/
    const p_message = this.input_phone.parentNode.parentNode.children[2]
    let phone = this.input_phone.value

    if (!rule_phone.test(phone)) {
      this.showErrorMessage(p_message, '형식에 맞지 않는 번호입니다.')
      this.data.phone = false
    } else {
      this.showCorrectMessage(p_message, '올바른 휴대전화 번호 입니다.')
      this.data.phone = true
    }
  }
  /**
   * 특정 항목의 오류 메시지 출력
   * @param {*} tag 오류메시지를 출력하고 싶은 항목의 메시지 tag
   * @param {*} message 오류 메시지 내용
   */
  showErrorMessage(tag, message) {
    tag.style.color = 'red'
    tag.innerText = message
  }
  /**
   * 특정 항목의 통과 메시지 출력
   * @param {*} tag 통과 메시지를 출력하고 싶은 항목의 메시지 tag
   * @param {*} message 메시지 내용
   */
  showCorrectMessage(tag, message) {
    tag.style.color = 'green'
    tag.innerText = message
  }
}

export default class_private;