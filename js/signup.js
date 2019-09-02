/* 데이터베이스에서 읽어온 정보들
data : [
  이미 가입된 아이디 목록
] */
class class_data_from_database {
  constructor() {
    this.id_database = ['admin']
  }
}

/* 각 요소들 통과 여부
data : [
  아이디, 비밀번호, 이름, 생년월일
  성별, 이메일, 휴대전화, 관심사
]
value_of_data : boolean
function : [
  모든 요소 채워졌는지 검사
  모든 요소 초기화
]
extra : 팝업 레이어에 뿌려주는 부분?
*/
class class_data_of_checked {
  constructor() {
    // this.id = false
    // this.password = false
    // this.name = false
    // this.date_of_birth = false
    // this.gender = false
    // this.email = false
    // this.phone = false
    // this.interest = false
    // this.interest_count = 0
    this.initial()
  }
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
  }
  // 정보 제출 시 확인하는 부분
  // return : boolean
  checkAllFilled() {
    if (this.id) {

    }
  }
  // 초기화 버튼
  clearAll() {
    this.initial()

    Array.from(document.querySelectorAll('.check_message')).reduce((previous, current) => {
      current.innerText = ''
    }, [])
  }
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
    `)
  }
}

/* id와 pw 검사 담당 class
data : [
  조건 불만족시 에러 메시지
  조건 만족시 메시지
  검사할 정규식
  account_information section tag
] */
class class_check_account {
  constructor() {
    this.message_error = [
      '5글자 이상, 영 소문자, 숫자, 특수기호(_), (-)만 사용 가능합니다.', '8~16자의 영문 대, 소문자, 숫자, 특수문자로 구성해야합니다.', '8~16자의 영문 대, 소문자, 숫자, 특수문자로 구성해야합니다.'
    ]
    this.message_ok = [
      '사용 가능한 아이디 입니다.', '사용 가능한 비밀번호 입니다.', '사용 가능한 비밀번호 입니다.'
    ]
    let rule_id = /^[a-z0-9-_]{5,20}$/
    let rule_password = /^[a-zA-z0-9~`!@#$%\^&*()-+=]{8,16}$/
    this.check_rule = [rule_id, rule_password, rule_password]
    this.section_account = document.getElementById('account_information')

    this.fillEventListener()
  }
  fillEventListener() {
    // 각 입력부분 정규식에 만족하는지 검사
    Array.from(this.section_account.children).reduce((previous, current, index) => {
      current.children[1].children[0].addEventListener('keyup', () => {
        let input_data = current.children[1].children[0].value

        if (!this.check_rule[index].test(input_data)) {
          current.children[2].style.color = 'red'
          current.children[2].innerText = this.message_error[index]
          data_of_checked.id = false
        } else {
          current.children[2].style.color = 'green'
          current.children[2].innerText = this.message_ok[index]
          data_of_checked.id = true
        }

        if (index === 0) {
          data_from_database.id_database.reduce((pre, cur) => {
            if (cur === input_data) {
              current.children[2].style.color = 'red'
              current.children[2].innerText = '이미 사용중인 아이디 입니다.'
              data_of_checked.id = false
            }
          }, 0)
        }
      })
    }, [])

    // 비밀번호 입력, 재입력 부분을 통틀어 서로 같은지 검사
    Array.from(this.section_account.children).reduce((previous, current) => {
      current.children[1].children[0].addEventListener('keyup', () => {
        let origin_password = this.section_account.children[1].children[1].children[0].value
        let reentered_password = this.section_account.children[2].children[1].children[0].value

        if (reentered_password !== origin_password || origin_password === "") {
          this.section_account.children[2].children[2].style.color = 'red'
          this.section_account.children[2].children[2].innerText = "비밀번호가 일치하지 않습니다."
          data_of_checked.password = false
        } else {
          this.section_account.children[2].children[2].style.color = 'green'
          this.section_account.children[2].children[2].innerText = "비밀번호가 일치합니다."
          data_of_checked.password = true
        }
      })
    })
  }
}

/* 개인정보 검사 담당 class
data : [
  조건 불만족시 에러 메시지
  조건 만족시 메시지
  검사할 정규식
  private_information section tag
] */
class class_check_private {
  constructor() {
    this.section_private = document.getElementById('private_information')

    this.input_name = document.getElementsByName('name')[0]
    this.select_gender = document.getElementsByName('gender')[0]
    this.input_email = document.getElementsByName('email')[0]
    this.input_phone = document.getElementsByName('phone')[0]

    this.fillEventListener()
  }
  fillEventListener() {
    this.input_name.addEventListener('keyup', () => {
      this.checkName()
    })
    this.select_gender.addEventListener('change', () => {
      this.checkGender()
    })
    this.input_email.addEventListener('keyup', () => {
      this.checkEmail()
    })
    this.input_phone.addEventListener('keyup', () => {
      this.checkPhone()
    })
  }
  checkName() {
    let name = this.input_name.value;
    if (name.length !== 0) {
      data_of_checked.name = true
    } else {
      data_of_checked.name = false
    }
  }
  checkGender() {
    data_of_checked.gender = true
  }
  checkEmail() {
    const rule_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    const p_message = this.input_email.parentNode.parentNode.children[2]
    let email = this.input_email.value


    if (!rule_email.test(email)) {
      this.showErrorMessage(p_message, '이메일 주소를 다시 확인해주세요.')
      data_of_checked.email = false
    } else {
      this.showCorrectMessage(p_message, '올바른 이메일 입니다.')
      data_of_checked.email = true
    }
  }
  checkPhone() {
    const rule_phone = /^\d{3}-\d{3,4}-\d{4}$/
    const p_message = this.input_phone.parentNode.parentNode.children[2]
    let phone = this.input_phone.value

    if (!rule_phone.test(phone)) {
      this.showErrorMessage(p_message, '형식에 맞지 않는 번호입니다.')
      data_of_checked.phone = false
    } else {
      this.showCorrectMessage(p_message, '올바른 휴대전화 번호 입니다.')
      data_of_checked.phone = true
    }
  }
  showErrorMessage(tag, message) {
    tag.style.color = 'red'
    tag.innerText = message
  }
  showCorrectMessage(tag, message) {
    tag.style.color = 'green'
    tag.innerText = message
  }
}

/* 생년월일 검사 담당 class
data : [

] */
class class_check_birthdate {
  constructor() {
    this.p_message = document.getElementById('private_information').children[1].children[2]
    this.year = 0
    this.month = 0
    this.day = 0

    this.check_year = false
    this.check_month = false
    this.check_day = false

    this.input_year = document.getElementsByName('year')[0]
    this.select_month = document.getElementsByName('month')[0]
    this.input_day = document.getElementsByName('day')[0]

    this.fillEventListener()
  }
  fillEventListener() {
    this.input_year.addEventListener('keyup', () => {
      this.checkYearOfBirth()
    })

    this.select_month.addEventListener('change', () => {
      this.checkMonthOfBirth()
    })

    this.input_day.addEventListener('keyup', () => {
      this.checkDateOfBirth()
    })
  }
  checkYearOfBirth() {
    const check_rule = /^[0-9]{4,4}$/
    let year = this.input_year.value;

    if (!check_rule.test(year)) {
      this.showErrorMessage('출생년도를 정확히 입력해 주세요.')
      this.check_year = false
    } else {
      if (new Date().getFullYear() - year < 15 || new Date().getFullYear() - year > 100) {
        this.showErrorMessage('14세 미만, 99세 이상은 가입하실 수 없습니다.')
        this.check_year = false
      } else {
        this.year = year
        this.showCorrectMessage('')
        this.check_year = true
      }
    }

    this.checkDateOfBirth()
  }
  checkMonthOfBirth() {
    this.month = this.select_month.value
    this.check_month = true

    this.checkDateOfBirth()
  }
  checkDateOfBirth() {
    let year = this.year
    let month = this.month
    let day = this.input_day.value

    if (day === "") {
      this.check_day = false
    } else if (month === 0 || year === 0) {
      this.showErrorMessage('출생연도와 월에서 빠진 부분이 있는지 확인해주세요')
      this.check_day = false
    } else if (this.getDaysInMonth(month, year) < day) {
      this.showErrorMessage('올바른 날짜를 입력해 주세요.')
      this.check_day = false
    } else {
      this.showCorrectMessage('')
      this.day = day
      this.check_day = true
    }

    this.checkAll()
  }
  checkAll() {
    if (this.check_year && this.check_month && this.check_day) {
      data_of_checked.date_of_birth = true
    } else {
      data_of_checked.date_of_birth = false
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
  getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
  }
}

/* 관심사 담당 class
data : [
  관심사 저장 list
]
*/
class class_check_interest {
  constructor() {
    this.interest_list = ['안녕', '하세요', '반갑습니다.']
    // this.interest_count = this.interest_list.length

    this.box = document.getElementById('interest')
    this.input_interest = document.getElementById('input_interest')

    this.render_interest()
    this.fillEventLisnter()
  }
  fillEventLisnter() {
    // backspace : 8
    // , : 188
    this.input_interest.addEventListener('keydown', (event) => {
      // case backspace
      if (event.keyCode === 8 && this.input_interest.value === '' && this.interest_list.length !== 0) {
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

    let index_of_remove = this.interest_list.indexOf(title_of_interest)
    if (index_of_remove > -1) this.interest_list.splice(index_of_remove, 1)
    node.remove()
  }
  // 최초 view에 로딩
  render_interest() {
    this.interest_list.reduce((previous, current) => {
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
    this.interest_list.push(title)
    data_of_checked.interest_count += 1
  }
  // 키보드 입력으로 list 제어
  popTag() {
    this.box.removeChild(this.box.childNodes[this.box.childNodes.length - 3])
    this.input_interest.value = this.interest_list.pop()
    data_of_checked.interest_count -= 1
  }
  makeTitleToTag(title) {
    return `<div class="interest_tag"><p>${title}</p><button>❌</button></div>`
  }
  calculateInputWidth(input_interest) {
    let value = input_interest.value
    this.box.insertAdjacentHTML('afterbegin', '<div id="virtual_dom">' + value + '</div>');

    // 글자 하나의 대략적인 크기 
    let input_width = document.getElementById('virtual_dom').offsetWidth + 10 + "px";
    input_interest.style.width = input_width
    document.getElementById('virtual_dom').remove()
  }
}

let data_from_database = new class_data_from_database()
let data_of_checked = new class_data_of_checked()
new class_check_interest()
new class_check_account()
new class_check_private()
new class_check_birthdate()