import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { LevelType } from 'mine-sweeper-type';
import { RootState } from '../../../../reducers/index';
import axiosInstance from '../../../../utils/default_axios';
import secretKey from '../../../../config/secret_key';
import ModalWrapper from '../../../common/organisms/modal_wrapper';

import {
  Button,
  Content,
} from '../../../common/atoms/index';

export interface Props {
  takenTime: number;
  level: LevelType;
  isGameSuccess: boolean;
  onMouseClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalContentStyle = styled.div`
  width: 294px;
  padding: 35px 50px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.2);
  text-align: center;
  background-color: white;
  box-shadow:  17px 17px 38px #121212,
        -1px -1px 3px #ffffff;
`;

const CloseButton = styled(Button)`
  margin-top: 20px;
  font-family: "Noto Sans KR", sans-serif;
  background-color: ${({ theme }) => theme.mainColor};
  color: white;

  &:hover{
    background: linear-gradient(70deg, 
      ${({ theme }) => theme.mainColor}, 
      ${({ theme }) => theme.gradientColor});
  }
`;

export default function ModalMineSweeper({
  takenTime,
  level,
  isGameSuccess,
  onMouseClick,
}: Props) {
  const userid = useSelector((state: RootState) => state.login.id);
  const levels = {
    easy: '쉬움',
    normal: '보통',
    hard: '어려움',
  };

  useEffect(() => {
    const request = async () => {
      try {
        await axiosInstance.post('/api/auth/game/minesweeper', {
          id: userid === '' ? 'anonymous' : userid,
          record: takenTime / 1000,
          success: isGameSuccess ? 'success' : 'fail',
          level,
          clientAnonymousKey: secretKey.anonymousKey,
        });
      } catch (e) {
        // empty
      }
    };

    request();
  }, [isGameSuccess, level, takenTime, userid]);

  return (
    <ModalWrapper>
      <ModalContentStyle
        className='modal'
      >
        <Content
          fontColor
          fontSize='1.15rem'
        >
          {isGameSuccess ? '성공' : '실패'}
        </Content>
        <div>
          {' '}
          {`시간: ${(takenTime) / 1000}`}
        </div>
        <div>
          {' '}
          레벨 :
          {levels[level]}
        </div>
        <CloseButton
          width='75px'
          height='25px'
          radius='5px'
          border='none'
          onClick={onMouseClick}
        >
          닫기
        </CloseButton>
      </ModalContentStyle>
    </ModalWrapper>
  );
}
