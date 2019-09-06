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
    this.section_account = document.getElementById('section_account')

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

export default class_account;