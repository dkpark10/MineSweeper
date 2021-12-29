import Header from '../Header';
import { RouteComponentProps } from 'react-router-dom';
import React from 'react';
import Statistics from '../page/Statistics';

interface MatchParams{
  userid:string;
}

export default function UserPage({ match, location }: RouteComponentProps<MatchParams>) {

  const userid = match.params.userid;

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