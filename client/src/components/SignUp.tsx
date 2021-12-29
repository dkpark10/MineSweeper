import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import ResetButton from './ResetButton';
import InputInvalidChecker, { InvalidStatus } from '../modules/InputCheker'
import axiosApi, { Response } from '../modules/API';
import { RootState } from '../reducers';
import '../styles/Signup.css';

const titleStyle = {
  color: '#1033e3',
  textAlign: 'center' as const,
  marginBottom: '50px'
};


interface InputElement {
  value: string;
  invalid: boolean;
  msg: string;
}


interface InputList {
  id: InputElement;
  email: InputElement;
  pwd: InputElement;
  chkpwd: InputElement;
};


const SignUp = ({ history }: RouteComponentProps) => {

  const { isLogin } = useSelector((state: RootState) => ({
    isLogin: state.login.isLogin
  }));

  useEffect(() => {
    if (isLogin === true) {
      history.replace('/');
    }
  }, [isLogin, history]);

  const [failmsg, setFailMsg] = useState<boolean>(false);
  const [inputs, setInputs] = useState<InputList>({
    id: { value: '', invalid: true, msg: '' },
    email: { value: '', invalid: true, msg: '' },
    pwd: { value: '', invalid: true, msg: '' },
    chkpwd: { value: '', invalid: true, msg: '' }
  });

  const submintHandler = (e: React.FormEvent<HTMLFormElement>) => {

    // post 방식으로 보낼 때 이벤트를 막아야 한다.
    // 민감한 정보가 쿼리스트링으로 전달 
    e.preventDefault();

    const invalid = Object.entries(inputs)
      .filter(([key, value]) => true === value.invalid).length > 0;

    if (invalid === true)
      return;

    axiosApi.post(`http://localhost:8080/api/user`, {
      "id": inputs.id.value,
      "email": inputs.email.value,
      "pwd": inputs.pwd.value
    })
      .then((res: Response) => {
        if (res.result === false) {
          setFailMsg(prev => true);
        } else {
          history.goBack();
        }
      });
  }


  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setFailMsg(prev => false);

    const inputInvalidChecker: InputInvalidChecker = new InputInvalidChecker();
    inputInvalidChecker.run(name, value, inputs['pwd'].value)
      .then((response: InvalidStatus) => {

        setInputs({
          ...inputs,
          [name]: {
            value: value,
            invalid: response.status,
            msg: response.msg
          }
        });
      });
  }


  const onReset = (inputName: string) => {
    setInputs({
      ...inputs, [inputName]: {
        value: '',
        invalid: true
      }
    })
  }


  const inputList: JSX.Element[] = [
    ['id', 'ID'], ['email', 'E-mail'], ['pwd', 'Password'], ['chkpwd', 'Repeat Password']]
    .map((element, idx) => {

      const [name, placeholder] = element;
      const inputType: string = name === 'pwd' || name === 'chkpwd' ? 'password' : 'text';

      return (
        <div key={idx} className='input-container'>
          <input
            type={inputType}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={inputs[name].value}
          />
          <ResetButton
            inputLength={inputs[name].value.length > 0}
            name={name}
            onReset={() => onReset(name)}
          />
          {inputs[name].invalid
            && inputs[name].value.length > 0
            && <h5 className='invalid-text'>{inputs[name].msg}</h5>}
        </div>
      )
    })

  return (
    <>
      <div className='signup-container'>
        <div className='signup-wrapper'>
          <Link to="/">
            <h1 style={titleStyle}>Mine Sweeper</h1>
          </Link>
          {failmsg && <label className='invalid-text'>Please try again in a little while.</label>}
          <form onSubmit={submintHandler}>
            {inputList}
            <div>
              <input type='submit' value='Sign up'></input>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp