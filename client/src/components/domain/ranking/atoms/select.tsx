import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Select = styled.div`
  position: relative;
  display: flex;
  width: 12em;
  height: 3em;
  border:2px solid red;
  border-radius: .25em;
  overflow: hidden;

  &:after{
    content:'\25BC';
    position: absolute;
    top: 0;
    right: 0;
    padding: 1em;
    background-color: #34495e;
    transition: .25s all ease;
    pointer-events: none;
  }

  &:hover:after{
    color: #f39c12;
  }

  select{
    appearance: none;
    outline: 0;
    border: 0;
    box-shadow: none;
    flex: 1;
    padding: 0 1em;
    color: #fff;
    background-color: ${({ theme }) => theme.grayBackGround};
    background-image: none;
    cursor: pointer;
  }
`;

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
    <Select>
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
    </Select>
  );
}
