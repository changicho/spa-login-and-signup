(function () {
  /* 회원가입에 필요한 데이터들
data : [
  아이디, 비밀번호, 이름, 생년월일
  성별, 이메일, 휴대전화, 관심사
  database에서 가져온 아이디 목록 (중복 검사용)
]
*/
  class class_data_signup {
    constructor() {
      this.database_id_list = []

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
      this.readDataFromDatabase()
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
      this.interest_list = []

      let interest_tags = document.querySelector('#interest').querySelectorAll('.interest_tag')
      Array.from(interest_tags).reduce((previous, current) => {
        current.remove()
      }, [])
    }
    // 정보 제출 시 확인하는 부분
    // return : list
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
    // 초기화 버튼
    clearAll() {
      this.initial()
      this.checkbox_terms.checked = false
      Array.from(document.querySelectorAll('.check_message')).reduce((previous, current) => {
        current.innerText = ''
      }, [])

      Array.from(document.querySelectorAll('input')).reduce((previous, current) => {
        current.value = ''
      }, [])

      Array.from(document.querySelectorAll('select')).reduce((previous, current) => {
        current.selectedIndex = 0
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
interest_count:    ${this.interest_count}
    `)
    }
    readDataFromDatabase() {
      this.database_id_list = ['admin']
    }
  }

  /* id와 pw 검사 담당 class
  data : [
    조건 불만족시 에러 메시지
    조건 만족시 메시지
    검사할 정규식
    account_information section tag
  ] */
  class class_account {
    constructor(data) {
      this.data = data

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
            this.data.id = false
          } else {
            current.children[2].style.color = 'green'
            current.children[2].innerText = this.message_ok[index]
            this.data.id = true
          }

          if (index === 0) {
            this.data.database_id_list.reduce((pre, cur) => {
              if (cur === input_data) {
                current.children[2].style.color = 'red'
                current.children[2].innerText = '이미 사용중인 아이디 입니다.'
                this.data.id = false
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
            this.data.password = false
          } else {
            this.section_account.children[2].children[2].style.color = 'green'
            this.section_account.children[2].children[2].innerText = "비밀번호가 일치합니다."
            this.data.password = true
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
  class class_private {
    constructor(data) {
      this.data = data

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
        this.data.name = true
      } else {
        this.data.name = false
      }
    }
    checkGender() {
      this.data.gender = true
    }
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
  class class_birthdate {
    constructor(data) {
      this.data = data

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
        this.data.date_of_birth = true
      } else {
        this.data.date_of_birth = false
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
  class class_interest {
    constructor(data) {
      this.data = data

      this.box = document.getElementById('interest')
      this.input_interest = document.getElementById('input_interest')
      this.p_message = this.box.parentNode.querySelector('.check_message')

      this.input_interest.style.width = '-webkit-fill-available'

      this.render_interest()
      this.fillEventLisnter()
    }
    fillEventLisnter() {
      this.input_interest.addEventListener('keydown', (event) => {
        // 엔터키 무효화
        if (event.keyCode === 13) {
          event.preventDefault()
        }

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
      this.data.interest_count += 1
      this.checkCountOfTag()
    }
    // 키보드 입력으로 list 제어
    popTag() {
      this.box.removeChild(this.box.childNodes[this.box.childNodes.length - 3])
      this.input_interest.value = this.data.interest_list.pop()
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

  /* 약관 담당 class */
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
    setAgree() {
      this.checkbox.checked = true
    }
  }

  /* 초기화 담당 class */
  class class_reset {
    constructor(data) {
      this.data = data

      this.modal = document.getElementById('reset')
      this.button_show = document.getElementById("button_reset")
      this.button_close = document.querySelectorAll('#reset .close')
      this.button_agree_reset = document.querySelector('#reset .agree')

      this.fillEventListener()
    }
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

  /* 가입하기 버튼 class */
  class class_alert_empty {
    constructor(data) {
      this.data = data

      this.button_show = document.getElementById("button_signin")
      this.modal = document.getElementById('alert_empty')
      this.button_close = document.querySelectorAll('#alert_empty .close')
      this.button_agree_reset = document.querySelector('#alert_empty .agree')
      this.alert_box = this.modal.querySelector('.error_box')

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
      console.log(error_box)
      this.alert_box.appendChild(error_box)
    }
    closeModal() {
      this.modal.style.display = "none"
      this.alert_box.querySelector('ul').remove()
    }
  }

  class signup {
    constructor() {
      this.data = new class_data_signup()
      new class_interest(this.data)
      new class_account(this.data)
      new class_private(this.data)
      new class_birthdate(this.data)
      new class_terms(this.data)
      new class_reset(this.data)
      new class_alert_empty(this.data)
    }

  }

  new signup()
})()