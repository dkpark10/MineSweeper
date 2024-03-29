import React, { useState } from 'react';
import styled from 'styled-components';
import { LevelType } from 'mine-sweeper-type';

import {
  Content,
  RadioButton,
} from '../../../common/atoms/index';
import { getLocalStorageItem } from '../../../../utils/common';

interface Props {
  name: string;
}

const OptionItem = styled.div`
  display:flex;
  margin: 1.0rem 0;
`;

export default function OptionCard({
  name,
}: Props) {
  const levelValue = getLocalStorageItem({
    key: 'difficulty',
    defaultValue: 'easy',
    validator: (val: string) => ['easy', 'normal', 'hard'].filter((ele) => ele === val).length > 0,
  });
  const [currentLevel, setCurrentLevel] = useState(levelValue);

  const levels: [LevelType, string][] = [
    ['easy', '쉬움 9 X 9 지뢰개수 : 10'],
    ['normal', '보통 16 X 16 지뢰개수 : 40'],
    ['hard', '어려움 30 X 16 지뢰개수 : 99'],
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('difficulty', e.currentTarget.value);
    setCurrentLevel(e.currentTarget.value);
  };

  return (
    <div>
      <Content
        fontColor
        bold
        fontSize='1.1rem'
      >
        {name}
      </Content>
      {levels.map((level) => (
        <OptionItem key={level[0]}>
          <RadioButton
            name='level'
            value={level[0]}
            id={level[0]}
            onChange={onChange}
            check={level[0] === currentLevel}
          />
          <label htmlFor={level[0]}>
            <Content
              margin='0px 10px'
            >
              {level[1]}
            </Content>
          </label>
        </OptionItem>
      ))}
    </div>
  );
}
