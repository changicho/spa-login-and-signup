/**
 * id와 pw 검사 담당 class
 * data : 
 * 조건 불만족시 에러 메시지
 * 조건 만족시 메시지
 * 검사할 정규식
 * account_information section tag
 */
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
    this.p_error_message = this.section_account.querySelector('.check_message')

    this.fillEventListener()
  }
  /**
   * 각 input 태그에 이벤트를 설정
   */
  fillEventListener() {
    // 각 입력부분 정규식에 만족하는지 검사
    Array.from(this.section_account.children).reduce((previous, current, index) => {
      let input_currnet = current.querySelector('input');
      let p_current_check_message = current.querySelector('.check_message')

      input_currnet.addEventListener('keyup', () => {
        let input_data = input_currnet.value

        if (!this.check_rule[index].test(input_data)) {
          p_current_check_message.style.color = 'red'
          p_current_check_message.innerText = this.message_error[index]
          this.data.id = false
        } else {
          p_current_check_message.style.color = 'green'
          p_current_check_message.innerText = this.message_ok[index]
          this.data.id = true
        }
      })
    }, [])

    // 중복 아이디를 체크해주는 부분
    document.getElementsByName('id')[0].addEventListener('focusout', () => {
      axios({
        url: "api/check_exist_id",
        method: "post",
        data: {
          id: document.getElementsByName('id')[0].value
        }
      }).then(res => {
        if (res.data.exist) {
          this.p_error_message.style.color = 'red'
          this.p_error_message.innerText = '이미 사용중인 아이디 입니다.'
          this.data.id = false
        }
      });
    })

    // 비밀번호 입력, 재입력 부분을 통틀어 서로 같은지 검사
    Array.from(this.section_account.children).reduce((previous, current) => {
      let input_currnet = current.querySelector('input');
      input_currnet.addEventListener('keyup', () => {
        let origin_password = this.section_account.children[1].children[1].children[0].value
        let reentered_password = this.section_account.children[2].children[1].children[0].value
        let p_error_message = this.section_account.children[2].children[2];

        if (reentered_password !== origin_password || origin_password === "") {
          p_error_message.style.color = 'red'
          p_error_message.innerText = "비밀번호가 일치하지 않습니다."
          this.data.password = false
        } else {
          p_error_message.style.color = 'green'
          p_error_message.innerText = "비밀번호가 일치합니다."
          this.data.password = true
        }
      })
    })
  }
}

export default class_account;