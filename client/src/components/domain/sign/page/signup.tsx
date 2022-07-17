import React, { useState, useMemo } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../reducers/index';

import Input, { Label } from '../atoms/input';
import Title from '../../../common/atoms/title';
import { useObjectInput } from '../../../custom_hooks/useinput';
import SignWrapper from '../atoms/wrapper';
import WarningMessage from '../atoms/warning_message';

import useCompare from '../../../custom_hooks/usecompare';
import useVerifyId from '../../../custom_hooks/useverify_id';
import useVerifyEmail from '../../../custom_hooks/useverify_email';
import useVerifyPassword from '../../../custom_hooks/useverify_password';

import axiosInstance from '../../../../utils/default_axios';
import invalidMessage from '../../../../utils/static_data';

interface InputProps {
  id: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export default function SignUp({ history }: RouteComponentProps) {
  const titleHeader = useSelector(({ title }: RootState) => title.title);
  const [idDuplicate, setIdDuplicate] = useState(false);

  const duplicateIdCheck = useMemo(() => debounce(async ({ name, value }:
  { name: string, value: string }) => {
    if (name !== 'id') {
      return;
    }

    const { data }: AxiosResponse<boolean> = await axiosInstance.get(`/api/user?id=${value}`);
    if (value && data === true) {
      setIdDuplicate(true);
      return;
    }

    setIdDuplicate(false);
  }, 350), []);

  const [value, changeValue] = useObjectInput<InputProps>({
    id: '',
    email: '',
    password: '',
    repeatPassword: '',
  }, duplicateIdCheck);

  const isValidId = useVerifyId(value.id);
  const isValidEmail = useVerifyEmail(value.email);
  const isValidPassword = useVerifyPassword(value.password);
  const passwordSame = useCompare<string>({
    val1: value.password,
    val2: value.repeatPassword,
  });

  const validate = () => {
    const invalidLength = Object.entries(value)
      .map((item) => item[1])
      .filter((val) => val.length <= 0).length > 0;

    if (invalidLength
      || idDuplicate
      || !isValidId
      || !isValidEmail
      || !isValidPassword
      || !passwordSame) {
      return false;
    }
    return true;
  };

  const getInvalidIdMessage = (): string => {
    if (isValidId) {
      if (idDuplicate) {
        return invalidMessage.idduplicate;
      }
      return '';
    }
    return invalidMessage.id;
  };

  const submintHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
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
            {titleHeader}
          </Title>
        </Link>
        <form onSubmit={submintHandler}>
          <div>
            <Label htmlFor='id' />
            <Input
              type='text'
              placeholder='아이디'
              name='id'
              id='id'
              value={value.id}
              onChange={changeValue}
            />
            <WarningMessage
              show={
                value.id.length > 0
                && (isValidId === false
                  || idDuplicate
                )
              }
            >
              {getInvalidIdMessage()}
            </WarningMessage>
          </div>
          <div>
            <Label htmlFor='email' />
            <Input
              type='eamil'
              placeholder='이메일'
              name='email'
              id='email'
              value={value.email}
              onChange={changeValue}
            />
            <WarningMessage
              show={
                value.email.length > 0
                && isValidEmail === false
              }
            >
              {invalidMessage.email}
            </WarningMessage>
          </div>
          <div>
            <Label htmlFor='password' />
            <Input
              type='password'
              placeholder='비밀번호'
              name='password'
              id='password'
              value={value.password}
              onChange={changeValue}
            />
            <WarningMessage
              show={
                value.password.length > 0
                && isValidPassword === false
              }
            >
              {invalidMessage.password}
            </WarningMessage>
          </div>
          <div>
            <Label htmlFor='repeat password' />
            <Input
              type='password'
              placeholder='비밀번호 확인'
              name='repeatPassword'
              id='repeat-password'
              value={value.repeatPassword}
              onChange={changeValue}
            />
            <WarningMessage
              show={
                value.repeatPassword.length > 0
                && passwordSame === false
              }
            >
              {invalidMessage.repeatPassword}
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
