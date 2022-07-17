import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './button';

interface OptionProps {
  width: string;
  height: string;
  radius: string;
  backgroundColor: string;
}

const SelectWrapper = styled.div<Partial<OptionProps>>`
  width: ${({ width }) => width};
`;

const SelectButton = styled(Button)`
  overflow: hidden;
  text-align:center;
  color:white;
  cursor:pointer;
`;

const Option = styled.ul<OptionProps>`
  border-radius: ${({ radius }) => radius};
  background-color: ${({ backgroundColor }) => backgroundColor};
  position:absolute;
  width: ${({ width }) => width};
  list-style: none;

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
  optionList: string[];
  width: string;
  heightPerList: string;
  radius: string;
  backgroundColor: string;
}

export default function RankSelect({
  disabled,
  optionList,
  width,
  heightPerList,
  radius,
  backgroundColor,
}: Props) {
  const [optionOpen, setOptionOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(optionList[0]);

  const click = () => {
    setOptionOpen(!optionOpen);
  };

  return (
    <SelectWrapper
      width={width}
    >
      <SelectButton
        width='100%'
        radius={radius}
        height={heightPerList}
        onClick={click}
        disabled={disabled}
        backgroundColor={backgroundColor}
      >
        {currentValue}
      </SelectButton>
      {optionOpen
        && (
          <Option
            width={width}
            height={heightPerList}
            radius={radius}
            backgroundColor={backgroundColor}
          >
            {optionList.map((option) => (
              <li
                key={option}
                role='presentation'
                onClick={() => setCurrentValue(option)}
                onKeyPress={() => setCurrentValue(option)}
              >
                <span className='content'>
                  {option}
                </span>
              </li>
            ))}
          </Option>
        )}
    </SelectWrapper>
  );
}
