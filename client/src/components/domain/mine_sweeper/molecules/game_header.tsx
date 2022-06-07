import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useInterval from '../../../custom_hooks/useinterval';
import Image from '../../../common/atoms/image';
import flagimage from '../../../../assets/flag.png';
import heartimage from '../../../../assets/heart.png';
import hourglassimage from '../../../../assets/hourglass.png';

interface Props {
  firstClick: boolean;
  countOfFlag: number;
  isGameOver: boolean;
};

const GameHeaderStyle = styled.div`
  height: 29px;
  margin-bottom: 9px;
  display:flex;
  justify-content: space-between;
  color: #FFF6E3;
  font-size: 0.94rem;
`;

const HeaderItem = styled.span`
  justify-content: center;
  display:flex;
  align-items: center;

  .header_text{
    min-width:26px;
  }
`;

export default function GameHeader({
  firstClick,
  countOfFlag,
  isGameOver }: Props) {
  const [count, setCount] = useState<number>(0);

  const getCount = (count: number): string => {
    if (count < 10) {
      return `00${count}`;
    } else if (count >= 10 && count < 100) {
      return `0${count}`;
    } else if (count >= 100 && count <= 999) {
      return `${count}`;
    } else {
      return '999';
    }
  };

  useInterval(() => {
    if (firstClick === true && isGameOver === false) {
      setCount(prev => prev + 1);
    }
  }, 1000);

  useEffect(() => {
    setCount(0);
  }, [isGameOver]);

  return (
    <GameHeaderStyle>
      <HeaderItem>
        <Image
          width='19px'
          height='19px'
          src={hourglassimage}
        />
        <div className='header_text'>
          {getCount(count)}
        </div>
      </HeaderItem>
      <HeaderItem>
        <Image
          width='20px'
          height='20px'
          src={heartimage}
        />
      </HeaderItem>
      <HeaderItem>
        <Image
          width='19px'
          height='19px'
          src={flagimage}
        />
        <div className='header_text'>
          {countOfFlag}
        </div>
      </HeaderItem>
    </GameHeaderStyle>
  )
}