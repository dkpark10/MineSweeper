import Header from '../Header';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import React, { useEffect } from 'react';

import Statistics from '../page/Statistics';

export default function MyPage({ history }: RouteComponentProps) {

  const { userid, isLogin } = useSelector((state: RootState) => ({
    userid: state.login.id,
    isLogin: state.login.isLogin
  }));

  // 비로그인시 로그인창으로
  useEffect(() => {
    if (isLogin !== true) {
      history.replace('/signin');
    }
  }, [isLogin, history]);

  return (
    <>
      <Header
        selected='MyPage'
      />
      <Statistics
        userid={userid}
      />
    </>
  )
}