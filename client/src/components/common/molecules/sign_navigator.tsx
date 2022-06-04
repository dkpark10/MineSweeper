import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SignNavigatorWrapper = styled.div`
  @media screen and (${({ theme }) => theme.mobile}){
    display:none;
  }

  margin: 0px 1.05rem;
  font-size:0.9rem;
  cursor:pointer;

  a{
    color: #FFF6E3;
    text-decoration:none;
  }

  a:hover{
    color: ${({ theme }) => theme.mainColor};
  }

  a:after{
    content: "|";
    margin:0px 5px;
  }

  a:last-child::after {
    content: "";
  }

  .signout{
    font-size: 0.86rem;
    color: #FFF6E3;
    margin: 0px 1.65rem;
  }

  .signout:hover{
    color: ${({ theme }) => theme.mainColor};
  }
`;

interface Props {
  userid: string;
  isLogin: boolean;
  logout: React.MouseEventHandler<HTMLDivElement>;
}

export default function SignNavigator({
  userid,
  isLogin,
  logout
}: Props) {

  return (
    <>
      <SignNavigatorWrapper>
        {isLogin === false
          ?
          <>
            <Link to="/signin">
              로그인
            </Link>
            <Link to="/signup">
              회원가입
            </Link>
          </>
          :
          <div
            className="signout"
            onClick={logout}
          >
            {userid}님 | 로그아웃
          </div>
        }
      </SignNavigatorWrapper>
    </>
  )
}