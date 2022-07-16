import React from 'react';
import styled from 'styled-components';
import { LevelType, LevelTypeKR } from 'mine-sweeper-type';

const Select = styled.select`
  width: 8rem;
  height: 1.9rem;
  border-radius: .25em;
  overflow: hidden;
  background-color: ${({ theme }) => theme.grayMainColor};
  text-align:center;
  color:white;
  cursor:pointer;
`;

interface Props {
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

type LevelItem = {
  value: LevelType,
  text: LevelTypeKR,
};

export default function RankSelect({
  disabled,
  onChange,
}: Props) {
  const levelItem: LevelItem[] = [
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

  return (
    <Select
      name='minesweeper_level_rank'
      onChange={onChange}
    >
      {levelItem.map(({ value, text }) => (
        <option
          key={value}
          disabled={disabled}
          value={value}
        >
          {text}
        </option>
      ))}
    </Select>
  );
}
