import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInterval from "../../../custom_hooks/useinterval";

interface Props {
  firstClick: boolean;
  countOfFlag: number;
  isGameOver: boolean;
};

const GameHeaderStyle = styled.div`
  height: 26px;
  margin-bottom: 9px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  min-width: 45px;
  color: #FFF6E3;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  text-align: center;

  & span{
   width: 3.5rem;
 }

 & .heart{
   font-size: 18px;
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
      return "999";
    }
  };

  useInterval(() => {
    if (firstClick === true && isGameOver === false) {
      setCount(prev => prev + 1);
    }
  }, 1000);

  useEffect(() => {
    setCount(0);
  },[isGameOver]);

  return (
    <>
      <GameHeaderStyle>
        <span> ⏳ {getCount(count)} </span>
        <span className="heart">💗</span>
        <span> 🚩{countOfFlag} </span>
      </GameHeaderStyle>
    </>
  )
}