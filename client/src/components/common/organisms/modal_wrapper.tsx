import React, { useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  children: JSX.Element;
}

const ModalWrapperStyle = styled.div<Props>`
  position: fixed;
  width:100%;
  height:100%;
  top:0;
  z-index: 1;
  font-size:0.92rem;
  font-family: 'Noto Sans KR', sans-serif;
  
  .overlay{
    width:100%;
    height:100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    display: flex;
}`;

export default function ModalWrapper({
  children
}: Props) {

  useEffect(() => {
    // 스크롤 막는다.
    document.body.style.overflow = 'hidden';
  })

  // 모달 바깥을 클릭하면 닫는다.
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // 자식한테 이벤트 전파 방지
    if (e.target === e.currentTarget) {
    }
  }

  return (
    <>
      <ModalWrapperStyle>
        <div className='overlay'
          onClick={closeModal}
        >
          {children}
        </div>
      </ModalWrapperStyle>
    </>
  )
}
