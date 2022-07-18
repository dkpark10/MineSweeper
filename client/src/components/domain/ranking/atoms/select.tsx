import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  LevelType,
  LevelTypeKR,
} from 'mine-sweeper-type';
import {
  Button,
} from '../../../common/atoms/index';
import useOutSideclick from '../../../custom_hooks/useoutside_click';

interface OptionProps {
  width: string;
  height: string;
  radius: string;
}

interface Props {
  disabled: boolean;
}

const SelectWrapper = styled.div<{ width: string }>`
  width:${({ width }) => width};
  @media screen and (${({ theme }) => theme.mobile}) {
    width:28vw;
  }
`;

const SelectButton = styled(Button) <Props>`
  overflow: hidden;
  background-color: ${({ theme }) => theme.grayMainColor};
  text-align:center;
  color: ${({ disabled }) => (
    disabled ? '#7b7b7b' : 'white'
  )};
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

type LevelItem = {
  value: LevelType,
  text: LevelTypeKR,
};

export default function RankSelect({
  disabled,
}: Props) {
  const selectRef = useRef<HTMLDivElement>(null);
  const [optionOpen, setOptionOpen] = useOutSideclick({
    ref: selectRef,
  });

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
  const width = '6.4rem';

  return (
    <SelectWrapper
      ref={selectRef}
      width={width}
    >
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
            width={width}
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
                    <li data-testid={levelItem.value}>
                      <span className='content'>
                        {levelItem.text}
                      </span>
                    </li>
                  </Link>
                )
                : (
                  <li
                    data-testid={levelItem.value}
                    key={levelItem.value}
                  >
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
