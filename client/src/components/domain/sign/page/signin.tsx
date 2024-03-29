import React, { useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Response, LoginInfo } from 'response-type';
import { useObjectInput } from '../../../custom_hooks/useinput';
import axiosInstance, { MyResponses } from '../../../../utils/default_axios';

import { setLogin } from '../../../../reducers/login';
import { RootState } from '../../../../reducers/index';

import Input, { Label } from '../atoms/input';

import {
  Title,
  Content,
  Button,
} from '../../../common/atoms/index';
import SignWrapper from '../atoms/wrapper';

const ForgetHelp = styled.div`
  display:flex;
  justify-content: space-around;
  align-items: center;
  margin:7px 0px;
`;

interface InputProps {
  userid: string;
  password: string;
}

export default function SignIn({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  const titleHeader = useSelector(({ title }: RootState) => title.title);
  const [value, changeValue, setChangeValue] = useObjectInput<InputProps>({
    userid: '',
    password: '',
  });
  const [error, setError] = useState<boolean>(false);

  const submintHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.userid.length <= 0 || value.password.length <= 0) {
      return;
    }

    try {
      const { status, data }: MyResponses<Response> = await axiosInstance.post('/api/login', {
        userid: value.userid,
        password: value.password,
      });

      if (status === 202) {
        throw new Error('로그인 실패');
      }

      const { accessToken } = data.loginInfo as LoginInfo;
      // Authorization 헤더에 토큰을 박는다.
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      dispatch(setLogin({
        isLogin: true,
        id: value.userid,
      }));

      history.goBack();
    } catch (err) {
      setError(true);
    }
  };

  const setGeustId = () => {
    setChangeValue((prev) => ({
      ...prev,
      userid: 'guestid',
      password: '123456',
    }));
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
              name='userid'
              value={value.userid}
              onChange={changeValue}
            />
          </div>
          <div>
            <Label htmlFor='password' />
            <Input
              type='password'
              placeholder='비밀번호'
              name='password'
              value={value.password}
              onChange={changeValue}
            />
          </div>
          <ForgetHelp>
            <Button
              width='100%'
              height='100%'
              backgroundColor='white'
              onClick={setGeustId}
            >
              <Content
                fontSize='0.8rem'
              >
                게스트 로그인
              </Content>
            </Button>
          </ForgetHelp>
          {error && <span className='failmsg'>아이디 또는 비밀번호가 틀립니다.</span>}
          <Input
            type='submit'
            name='login'
            value='로그인'
          />
        </form>
      </SignWrapper>
    </main>
  );
}
