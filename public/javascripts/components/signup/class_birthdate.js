/**
 * 생년월일 담당 class
 */
class class_birthdate {
  constructor(data) {
    this.data = data

    this.p_message = document.getElementById('section_private').children[1].children[2]
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
  /**
   * input, select 태그에 이벤트 바인딩
   */
  fillEventListener() {
    this.input_year.addEventListener('keyup', () => {
      this.checkYearOfBirth()
    })

    this.select_month.addEventListener('change', () => {
      if (this.select_month.value === "") {
        return
      }
      this.checkMonthOfBirth()
    })

    this.input_day.addEventListener('keyup', () => {
      this.checkDateOfBirth()
    })
  }
  /**
   * 출생 년도가 올바른지 확인
   */
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
  /**
   * 월이 채워졌음을 확인
   */
  checkMonthOfBirth() {
    this.month = this.select_month.value
    this.check_month = true

    this.checkDateOfBirth()
  }
  /**
   * 년 월 일을 입력했을 때 유효한지 확인
   */
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
  /**
   * 연 월 일을 전부 입력했는지 확인
   */
  checkAll() {
    if (this.check_year && this.check_month && this.check_day) {
      this.data.date_of_birth = true
    } else {
      this.data.date_of_birth = false
    }
  }
  /**
   * 생년월일 에러 메시지 태그 출력
   * @param {*} message 에러 메시지 내용
   */
  showErrorMessage(message) {
    this.p_message.style.color = 'red'
    this.p_message.innerText = message
  }
  /**
   * 생년월일 통과 메시지 출력
   * @param {*} message 통과 메시지
   */
  showCorrectMessage(message) {
    this.p_message.style.color = 'green'
    this.p_message.innerText = message
  }
  /**
   * 연도와 월을 입력하면, 가능한 일 의 최대값을 return
   * 윤년 확인용
   * @param {*} month 월
   * @param {*} year 연
   */
  getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
  }
}

export default class_birthdate;