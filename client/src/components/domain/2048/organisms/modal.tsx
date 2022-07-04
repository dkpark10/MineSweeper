import React from 'react';
import styled, { useTheme } from 'styled-components';

interface Props {
  score: number;
}

const StyleModal = styled.div`
  justify-content:center;
  align-items: center;
  width:100%;
  z-index: 1;
  height:100%;
  background-color: rgba(0, 0, 0, 0.76);
  .modal_content{
    position:absolute;
    top:50%;
    left:50%;
    border-radius: 6px;
    transform:translate(-50%,-50%);
    width:223px;
    padding:10px;
    border: 2px solid ${({ theme }) => theme.mainColor};
    background-color: #000a19;
    text-align:center;
    color:white;
  }
`;

export default function Modal({ score }: Props) {
  const theme = useTheme();

  return (
    <StyleModal
      className='modal'
    >
      <div className='modal_content'>
        <h3>게임 오버</h3>
        <h1 style={{ color: theme.mainColor }}>{score}</h1>
      </div>
    </StyleModal>
  );
}
