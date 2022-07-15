import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  currentGame: string;
}

export default function RankSelect({
  currentGame,
}: Props) {
  const levelItem = ['쉬움', '보통', '어려움'];
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  return (
    <select onChange={onChange}>
      {levelItem.map((item) => (
        <option
          key={item}
          disabled={currentGame !== 'minesweeper'}
        >
          {item}
        </option>
      ))}
    </select>
  );
}
