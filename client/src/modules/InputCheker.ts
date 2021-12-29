import axiosApi,{Response} from './API';

export interface InvalidStatus {
  msg: string;
  status: boolean;
};

export default class InputInvalidChecker {

  private readonly invalidText: any = {
    id: ['5~15 characters consisting of English letters(a-zA-Z), numbers, or special characters (_)',
      'id already exists'],
    email: [
      'the email is invalid',
      'email already exists'
    ],
    pwd : 'The password must be at least 6 to 15 digits.'
  }

  public async run(name: string, value: string, pwd: string): Promise<InvalidStatus> {

    let invalid: InvalidStatus;

    if (name === 'id' || name === 'email') {
      invalid = await this.duplicateCheck({ name, value });
    } else if (name === 'pwd') {
      invalid = await this.invalidPasswordCheck(name, value);
    } else {
      invalid = await this.confirmPassword(value, pwd);
    }

    return invalid;
  }

  public duplicateCheck({ name, value }): Promise<InvalidStatus> {

    // 정규표현식을 멤버변수로 두면 결과값이 매번 달라짐 왜???????????????????? 진짜 이상하네
    // 정규식은 스택안에서만 사용해야 하나??? 뭐 어디 이상한데 두면 오류나네........
    const regExpList: { [key: string]: RegExp } = {
      id: /^[A-za-z0-9]{5,15}$/g,  // 영문 대문자 또는 소문자 또는 숫자로 시작 길이는 5 ~ 15
      email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    };

    return new Promise((resolve) => {

      if (regExpList[name].exec(value) === null) {
        return resolve({ msg: this.invalidText[name][0], status: true });
      }

      axiosApi.get(`http://localhost:8080/api/user?${name}=${value}`)
        .then((response: Response) => {
          if (response.result === true) {
            return resolve({ msg: this.invalidText[name][1], status: true });
          }
          return resolve({ msg: '', status: false });
        })
        .catch(err => {
          // 웹서버와 통신 중 장애 발생 시 에러처리 아이디 중복체크로 회원가입 방지
          return { msg: '', status: true };
        });
    })
  }

  public invalidPasswordCheck(name: string, value: string): Promise<InvalidStatus> {

    const regPwd: RegExp = /^[A-Za-z0-9]{6,15}$/;

    return new Promise((resolve) => {

      if (regPwd.exec(value) === null) {
        return resolve({ msg: this.invalidText[name], status: true });
      } else {
        return resolve({ msg: '', status: false });
      }
    })
  }

  public confirmPassword(pwd1: string, pwd2:string): Promise<InvalidStatus>{
    
    return new Promise((resolve) => {

      if(pwd1 !== pwd2){
        return resolve({ msg: "The password doesn't match.", status: true });
      }else{
        return resolve({ msg: '', status: false });
      }
    })
  }
}