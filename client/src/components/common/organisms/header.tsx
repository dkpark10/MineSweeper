import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { AxiosResponse } from 'axios';
import { Response } from 'response-type';
import { Header } from 'header-type';
import { setLogin } from '../../../reducers/login';
import { RootState } from '../../../reducers';

import { MenuMoveAnimation } from '../atoms/animation';
import HeaderTitle from '../molecules/header_title';
import SignNavigator from '../molecules/sign_navigator';
import HeaderListItem from '../molecules/header_list_item';

import axiosInstance from '../../../utils/default_axios';

import GameMenuImg from '../../../assets/games.png';
import RankingMenuImg from '../../../assets/ranking.png';
import PostMenuImg from '../../../assets/report.png';
import MyPageMenuImg from '../../../assets/user.png';
import SettingMenuImg from '../../../assets/settings.png';

const HeaderWrapper = styled.header`
  position: relative;
  height:59px;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: ${({ theme }) => theme.grayMainColor};
  display:flex;
  align-items: center;
  justify-content: space-between;
`;

const NavigatorWrapper = styled.nav<{ show: boolean }>`
  a{
    text-decoration: none;
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
    font-size:1.12rem;
    animation: ${({ show }) => (show === true
    ? css`${MenuMoveAnimation(0)} 0.1s linear forwards`
    : '')};

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

    a{
      color: #FFF6E3;
    }

    ul{
      display:flex;
      font-size:1.0rem;
    }
  }
`;

export default function HeaderComponent() {
  const { userid, isLogin } = useSelector((state: RootState) => ({
    userid: state.login.id,
    isLogin: state.login.isLogin,
  }));
  const [mobileShowMenu, setMobileShowMenu] = useState<boolean>(false);
  const dispatch = useDispatch();

  const menus: Header[] = [
    {
      id: 0,
      title: '게임',
      url: '/',
      src: GameMenuImg,
    },
    {
      id: 1,
      title: '랭킹',
      url: '/ranking/minesweeper?level=easy&page=1',
      src: RankingMenuImg,
    },
    {
      id: 2,
      title: '게시판',
      url: '/community?page=1',
      src: PostMenuImg,
    },
    {
      id: 3,
      title: '나의 페이지',
      url: '/mypage',
      src: MyPageMenuImg,
    },
    {
      id: 4,
      title: '옵션',
      url: '/option',
      src: SettingMenuImg,
    },
  ];

  const openMenu = () => {
    setMobileShowMenu((prev) => !prev);
  };

  const closeMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setMobileShowMenu(false);
    }
  };

  const logout = async () => {
    try {
      const { data }: AxiosResponse<Response> = await axiosInstance.post('/api/auth/logout');
      if (data.result === true) {
        dispatch(setLogin({
          isLogin: false,
          id: '',
        }));
      }
    } catch (e) {
      // empty
    }
  };

  return (
    <HeaderWrapper>
      <HeaderTitle
        onClick={openMenu}
      />
      <NavigatorWrapper
        onClick={closeMenu}
        show={mobileShowMenu}
      >
        <div className='menu_content'>
          <ul>
            {menus.map((menu) => (
              <Link
                key={menu.id}
                to={menu.url}
              >
                <HeaderListItem
                  src={menu.src}
                  alt={`${menu.title}이미지`}
                  value={menu.title}
                />
              </Link>
            ))}
            {mobileShowMenu && (isLogin
              ? (
                <li
                  className='signout'
                  onClick={logout}
                  role='presentation'
                >
                  로그아웃
                </li>
              )
              : (
                <>
                  <li>
                    <Link to='signin'>
                      로그인
                    </Link>
                  </li>
                  <li>
                    <Link to='signup'>
                      회원가입
                    </Link>
                  </li>
                </>
              )
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
  );
}
