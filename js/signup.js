/* id와 pw 검사 담당 class
data : [
  조건 불만족시 에러 메시지
  조건 만족시 메시지
  검사할 정규식
  기존에 사용하고 있는 id
  id, password section tag
] */
class check_idpw_section {
  constructor() {
    this.message_error = [
      '5글자 이상, 영 소문자, 숫자, 특수기호(_), (-)만 사용 가능합니다.', '8~16자의 영문 대, 소문자, 숫자, 특수문자로 구성해야합니다.', '8~16자의 영문 대, 소문자, 숫자, 특수문자로 구성해야합니다.'
    ]
    this.message_ok = [
      '사용 가능한 아이디 입니다.', '사용 가능한 비밀번호 입니다.', '사용 가능한 비밀번호 입니다.'
    ]
    this.check_rule = [/^[a-z0-9-_]{5,20}$/, /^[a-zA-z0-9~`!@#$%\^&*()-+=]{8,16}$/, /^[a-zA-z0-9~`!@#$%\^&*()-+=]{8,16}$/]
    this.id_data = ['admin']
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
        } else {
          current.children[2].style.color = 'green'
          current.children[2].innerText = this.message_ok[index]
        }

        if (index === 0) {
          this.id_data.reduce((pre, cur) => {
            if (cur === input_data) {
              current.children[2].style.color = 'red'
              current.children[2].innerText = '이미 사용중인 아이디 입니다.'
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

        if (reentered_password !== origin_password) {
          this.section_account.children[2].children[2].style.color = 'red'
          this.section_account.children[2].children[2].innerText = "비밀번호가 일치하지 않습니다."
        } else {
          this.section_account.children[2].children[2].style.color = 'green'
          this.section_account.children[2].children[2].innerText = "비밀번호가 일치합니다."
        }
      })
    })
  }
}

let check_idpw = new check_idpw_section()