import React, { useEffect, useState, useMemo } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { debounce } from 'lodash';

import Input, { Label } from '../atoms/input';
import Title from '../../../common/atoms/title';
import { useObjectInput } from '../../../custom_hooks/useinput';
import SignWrapper from '../atoms/wrapper';
import WarningMessage from '../atoms/warning_message';

import axiosInstance from '../../../../utils/default_axios';
import { invalidMessage } from '../../../../utils/static_data';

interface InputProps {
  id: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export default function SignUp({ history }: RouteComponentProps) {
  const [validator, setValidator] = useState({
    id: { result: false, msg: '' },
    email: { result: false, msg: '' },
    password: { result: false },
    repeatPassword: { result: false },
  });

  const duplicateCheck = useMemo(() => debounce(async ({ name, value }:
  { name: string, value: string }) => {
    if (name !== 'id' && name !== 'email') {
      return;
    }

    const regList: { [key: string]: RegExp } = {
      id: /^[A-za-z0-9]{5,15}$/g,
      email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    };

    if (value && regList[name].exec(value) === null) {
      setValidator((prev) => ({
        ...prev,
        [name]: {
          result: false,
          msg: invalidMessage[name][0],
        },
      }));
      return;
    }

    const { data }: AxiosResponse<boolean> = await axiosInstance.get(`/api/user?id=${value}`);
    if (value && data === true) {
      setValidator((prev) => ({
        ...prev,
        id: {
          result: false,
          msg: invalidMessage[name][1],
        },
      }));
      return;
    }

    setValidator((prev) => ({
      ...prev,
      [name]: {
        result: value.length !== 0,
        msg: '',
      },
    }));
  }, 350), []);

  const [value, changeValue] = useObjectInput<InputProps>({
    id: '',
    email: '',
    password: '',
    repeatPassword: '',
  }, duplicateCheck);

  useEffect(() => {
    const passwordReg = /^[A-Za-z0-9]{6,15}$/;
    if (value.password) {
      setValidator((prev) => ({
        ...prev,
        password: {
          result: passwordReg.exec(value.password) !== null,
        },
      }));
    }

    if (value.repeatPassword) {
      setValidator((prev) => ({
        ...prev,
        repeatPassword: {
          result: value.password === value.repeatPassword,
        },
      }));
    }
  }, [value.password, value.repeatPassword]);

  const submintHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkValidValue = Object.entries(validator)
      .filter(([, validatorElement]) => validatorElement.result === false).length > 0;

    if (checkValidValue) {
      // eslint-disable-next-line
      alert('양식에 맞게 다시 작성해 주세요.');
      return;
    }

    const request = async () => {
      try {
        const { data }: AxiosResponse<boolean> = await axiosInstance.post('/api/user', {
          id: value.id,
          email: value.email,
          password: value.password,
        });

        if (data === true) {
          history.goBack();
        } else {
          throw new Error('유저 등록에 실패하였습니다.');
        }
      } catch (error) {
        // eslint-disable-next-line
        alert(error.message);
      }
    };
    request();
  };

  return (
    <main>
      <SignWrapper>
        <Link to='/'>
          <Title
            fontColor
            margin='1.2rem 0px'
          >
            Mine Sweeper
          </Title>
        </Link>
        <form onSubmit={submintHandler}>
          <div>
            <Label htmlFor='id'>
              <Input
                type='text'
                placeholder='아이디'
                name='id'
                id='id'
                value={value.id}
                onChange={changeValue}
              />
            </Label>
            <WarningMessage
              show={validator.id.result === false && value.id.length > 0}
            >
              {validator.id.msg}
            </WarningMessage>
          </div>
          <div>
            <Label htmlFor='email'>
              <Input
                type='eamil'
                placeholder='이메일'
                name='email'
                id='email'
                value={value.email}
                onChange={changeValue}
              />
            </Label>
            <WarningMessage
              show={validator.email.result === false && value.email.length > 0}
            >
              {validator.email.msg}
            </WarningMessage>
          </div>
          <div>
            <Label htmlFor='password'>
              <Input
                type='password'
                placeholder='비밀번호'
                name='password'
                id='password'
                value={value.password}
                onChange={changeValue}
              />
            </Label>
            <WarningMessage
              show={validator.password.result === false && value.password.length > 0}
            >
              {invalidMessage.password as string}
            </WarningMessage>
          </div>
          <div>
            <Label htmlFor='repeat-password'>
              <Input
                type='password'
                placeholder='비밀번호 확인'
                name='repeatPassword'
                id='repeat-password'
                value={value.repeatPassword}
                onChange={changeValue}
              />
            </Label>
            <WarningMessage
              show={validator.repeatPassword.result === false && value.repeatPassword.length > 0}
            >
              {invalidMessage.repeatPassword as string}
            </WarningMessage>
          </div>
          <Input
            type='submit'
            name='signup'
            value='회원가입'
          />
        </form>
      </SignWrapper>
    </main>
  );
}
