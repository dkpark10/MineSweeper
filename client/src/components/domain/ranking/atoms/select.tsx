import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  LevelType,
  LevelTypeKR,
} from 'mine-sweeper-type';
import {
  Button,
  Overlay,
} from '../../../common/atoms/index';

interface OptionProps {
  width: string;
  height: string;
  radius: string;
}

const SelectWrapper = styled.div`
  width:8rem;
  @media screen and (${({ theme }) => theme.mobile}) {
    width:28vw;
  }
`;

const SelectButton = styled(Button)`
  overflow: hidden;
  background-color: ${({ theme }) => theme.grayMainColor};
  text-align:center;
  color:white;
  cursor:pointer;
`;

const OptionItem = styled.ul<OptionProps>`
  border-radius: ${({ radius }) => radius};
  background-color: ${({ theme }) => theme.grayMainColor};
  position:absolute;
  width: ${({ width }) => width};
  list-style: none;

  @media screen and (${({ theme }) => theme.mobile}) {
    width:28vw;
  }

  li{
    height: ${({ height }) => height};
    font-family: inherit;
    font-size:0.8rem;
    text-align:center;
    color:white;
    cursor:pointer;
    position:relative;
  }

  li .content {
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  }

  li:hover{
    background-color: ${({ theme }) => theme.mainColor};
  }
`;

interface Props {
  disabled: boolean;
}

type LevelItem = {
  value: LevelType,
  text: LevelTypeKR,
};

export default function RankSelect({
  disabled,
}: Props) {
  const [optionOpen, setOptionOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('쉬움');
  const levelItems: LevelItem[] = [
    {
      value: 'easy',
      text: '쉬움',
    },
    {
      value: 'normal',
      text: '보통',
    },
    {
      value: 'hard',
      text: '어려움',
    },
  ];

  const click = () => {
    setOptionOpen(!optionOpen);
  };

  return (
    <SelectWrapper>
      <SelectButton
        width='100%'
        radius='4px'
        height='1.9rem'
        onClick={click}
        disabled={disabled}
        className='select_button'
      >
        {currentValue}
      </SelectButton>
      {optionOpen
        && (
          <OptionItem
            width='8rem'
            height='1.9rem'
            radius='4px'
          >
            {levelItems.map((levelItem) => (
              levelItem.text !== currentValue
                ? (
                  <Link
                    key={levelItem.value}
                    to={`minesweeper?page=1&level=${levelItem.value}`}
                    onClick={() => {
                      setOptionOpen(false);
                      setCurrentValue(levelItem.text);
                    }}
                  >
                    <li>
                      <span className='content'>
                        {levelItem.text}
                      </span>
                    </li>
                  </Link>
                )
                : (
                  <li key={levelItem.value}>
                    <span className='content'>
                      {levelItem.text}
                    </span>
                  </li>
                )
            ))}
          </OptionItem>
        )}
    </SelectWrapper>
  );
}
