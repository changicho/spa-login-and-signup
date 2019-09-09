/**
 * 회원 가입 페이지의 data들을 관리하는 class
 */
class class_data_signup {
  constructor() {
    this.database_id_list = []
    this.form = document.forms[0];
    
    this.checkbox_terms = document.querySelector("#check_terms")
    this.interest_list = []
    this.error_messages = {
      id: "아이디를 확인해주세요.",
      password: "비밀번호를 확인해주세요.",
      name: "이름을 입력해주세요.",
      date_of_birth: '생년월일을 확인해주세요.',
      gender: '성별을 입력해주세요.',
      email: '이메일을 확인해주세요.',
      phone: '연락처를 확인해주세요.',
      interest: '관심사를 확인해주세요.'
    }

    this.initial()
  }
  /**
   * 각 항목이 유효성 검사를 통과했는지 boolean 값
   * 처음엔 전부 false 로 설정
   */
  initial() {
    this.id = false
    this.password = false
    this.name = false
    this.date_of_birth = false
    this.gender = false
    this.email = false
    this.phone = false
    this.interest = false
    this.interest_count = 0
    this.interest_list = []

    let interest_tags = document.querySelector('#interest').querySelectorAll('.interest_tag')
    Array.from(interest_tags).reduce((previous, current) => {
      current.remove()
    }, [])
  }
  /**
   * 정보 제출 시 확인하는 부분
   * return : 경고 메시지 list
   */
  checkAllFilled() {
    let error_message = []
    if (!this.id) {
      error_message.push(this.error_messages.id)
    }
    if (!this.password) {
      error_message.push(this.error_messages.password)
    }
    if (!this.name) {
      error_message.push(this.error_messages.name)
    }
    if (!this.date_of_birth) {
      error_message.push(this.error_messages.date_of_birth)
    }
    if (!this.gender) {
      error_message.push(this.error_messages.gender)
    }
    if (!this.email) {
      error_message.push(this.error_messages.email)
    }
    if (!this.phone) {
      error_message.push(this.error_messages.phone)
    }
    if (!this.interest) {
      error_message.push(this.error_messages.interest)
    }
    return error_message
  }
  /**
   * 페이지 전부 초기화
   */
  clearAll() {
    this.initial()
    this.checkbox_terms.checked = false
    Array.from(document.querySelectorAll('.check_message')).reduce((previous, current) => {
      current.innerText = ''
    }, [])
  }
  /**
   * 각 항목의 boolean 값 출력
   */
  showCheckedData() {
    console.log(`
id:    ${this.id}
pw:    ${this.password}
name:    ${this.name}
date:    ${this.date_of_birth}
gender:    ${this.gender}
email:    ${this.email}
phone:    ${this.phone}
interest:    ${this.interest}
interest_count:    ${this.interest_count}
  `)
  }
}

export default class_data_signup;