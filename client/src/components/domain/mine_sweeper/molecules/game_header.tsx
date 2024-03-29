import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useInterval from '../../../custom_hooks/useinterval';

import flag from '../../../../assets/flag.png';
import heart from '../../../../assets/heart.png';
import hourglass from '../../../../assets/hourglass.png';

import {
  Image,
  Button,
} from '../../../common/atoms/index';
import { getCount } from '../../../../utils/common';

interface Props {
  firstClick: boolean;
  countOfFlag: number;
  isGameOver: boolean;
  gameReset: React.MouseEventHandler<HTMLButtonElement>;
}

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
  gameReset,
  isGameOver,
}: Props) {
  const [count, setCount] = useState<number>(0);

  useInterval(() => {
    if (firstClick === false && isGameOver === false) {
      setCount((prev) => prev + 1);
    }
  }, 1000);

  useEffect(() => {
    setCount(0);
  }, [isGameOver, firstClick]);

  return (
    <GameHeaderStyle>
      <HeaderItem>
        <Image
          width='19px'
          height='19px'
          src={hourglass}
          alt='모래시계'
        />
        <div className='header_text'>
          {getCount(count)}
        </div>
      </HeaderItem>
      <Button
        onClick={gameReset}
        backgroundColor='#2e2d2d'
      >
        <HeaderItem>
          <Image
            width='20px'
            height='20px'
            src={heart}
            alt='하트'
          />
        </HeaderItem>
      </Button>
      <HeaderItem>
        <Image
          width='19px'
          height='19px'
          src={flag}
          alt='깃발'
        />
        <div className='header_text'>
          {countOfFlag}
        </div>
      </HeaderItem>
    </GameHeaderStyle>
  );
}
