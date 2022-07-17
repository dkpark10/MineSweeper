import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components';
import axiosInstance from '../../../../utils/default_axios';
import { RootState } from '../../../../reducers/index';
import secretKey from '../../../../config/secret_key';
import ModalWrapper from '../../../common/organisms/modal_wrapper';
import {
  Button,
  Content,
} from '../../../common/atoms/index';

export interface Props {
  score: number;
  onReset: () => void;
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

export default function Modal2048({
  score,
  onReset,
}: Props) {
  const userid = useSelector((state: RootState) => state.login.id);

  useEffect(() => {
    const request = async () => {
      try {
        await axiosInstance.post('/api/auth/game/2048', {
          id: userid === '' ? 'anonymous' : userid,
          record: score,
          clientAnonymousKey: secretKey.anonymousKey,
        });
      } catch (e) {
        // empty
      }
    };

    request();
  }, [score, userid]);

  return (
    <ModalWrapper>
      <ModalContentStyle
        className='modal'
      >
        <div>
          <Content
            fontSize='1.05rem'
          >
            게임오버
          </Content>
        </div>
        <div>
          <Content
            fontColor
            fontSize='1.45rem'
          >
            {score}
          </Content>
        </div>
        <div>
          <CloseButton
            width='75px'
            height='25px'
            radius='5px'
            border='none'
            onClick={onReset}
          >
            닫기
          </CloseButton>
        </div>
      </ModalContentStyle>
    </ModalWrapper>
  );
}
