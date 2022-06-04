import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { RootState } from "../../../reducers";
import { useSelector } from "react-redux";
import { setLogin } from "../../../reducers/login";
import { useDispatch } from "react-redux";
import { AxiosResponse } from "axios";
import { Response } from "response-type";

import HeaderTitle from "../molecules/header_title";
import SignNavigator from "../molecules/sign_navigator";

import axiosInstance from "../../../utils/default_axios";

const HeaderWrapper = styled.header`
  position: relative;
  width:100%;
  height:59px;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: ${({ theme }) => theme.grayMainColor};
  display:flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuMoveAnimation = (x: number) => keyframes`
  100% {
    left: ${x}vw;
  }
`;

const NavigatorWrapper = styled.nav<{ show: boolean }>`
  a{
    text-decoration: none;
  }

  li{
    cursor:pointer;
  }
  
  a:hover, li:hover{
    color: ${({ theme }) => theme.mainColor};
  }

  ul{
    list-style: none;
  }

  @media screen and (${({ theme }) => theme.mobile}){
    position: absolute;
    top:59px;
    left:-100vw;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index:98;
    font-size:1.25rem;
    animation: ${({ show }) =>
    show === true ?
      css`${MenuMoveAnimation(0)} 0.1s linear forwards` : ''};

    .menu_content{
      position:relative;
      display:flex;
      width:76vw;
      height:93vh;
      justify-content: center;
      z-index:99;
      background-color: white;
      align-content: space-around;
      flex-wrap: wrap;
      color: ${({ theme }) => theme.fontColor};
    }

    a{
      color: ${({ theme }) => theme.fontColor};
    }

    li{
      margin:30px 0px;
    }
  }

  @media screen and (${({ theme }) => theme.minTablet}) {
    position: absolute;
    left:50%;
    transform:translatex(-50%);
    display:inline-block;
    height:100%;
    display:flex;
    align-items:center;

    .sign_navi{
      display:none;
    }

    a{
      color: #FFF6E3;
    }

    ul{
      display:flex;
      font-size:1.0rem;

      li{
        margin:0px 12px;
      }
    }
  }
`;

export default function Header() {
  const { userid, isLogin } = useSelector((state: RootState) => ({
    userid: state.login.id,
    isLogin: state.login.isLogin,
  }));
  const [mobileShowMenu, setMobileShowMenu] = useState<boolean>(false);
  const menus =
    [
      { title: "게임", url: "/" },
      { title: "랭킹", url: "/ranking/easy?page=1" },
      { title: "게시판", url: "/community?page=1" },
      { title: "나의 페이지", url: "/mypage" },
      { title: "옵션", url: "/option" }
    ] as const;

  const openMenu = () => {
    setMobileShowMenu((prev) => !prev);
  }

  const closeMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setMobileShowMenu(false);
    }
  }

  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const { data }: AxiosResponse<Response> = await axiosInstance.post("/api/auth/logout");
      if (data.result === true) {
        dispatch(setLogin({
          isLogin: false,
          id: ""
        }));
      }
    } catch (e) {
    }
  }

  return (
    <>
      <HeaderWrapper>
        <HeaderTitle
          onClick={openMenu}
        />
        <NavigatorWrapper
          className="menu"
          onClick={closeMenu}
          show={mobileShowMenu}
        >
          <div className="menu_content">
            <ul>
              {menus.map((menu, idx) =>
                <li key={idx}>
                  <Link
                    to={menu.url}
                  >
                    {menu.title}
                  </Link>
                </li>
              )}
              {mobileShowMenu && (isLogin
                ?
                <li
                  className="signout"
                  onClick={logout}
                >
                  로그아웃
                </li>
                :
                <>
                  <li>
                    <Link to="signin">
                      로그인
                    </Link>
                  </li>
                  <li>
                    <Link to="signup">
                      회원가입
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </NavigatorWrapper>
        <SignNavigator
          userid={userid}
          isLogin={isLogin}
          logout={logout}
        />
      </HeaderWrapper>
    </>
  )
}