import React from "react";
import styled from "styled-components";
import PageNationItem from "../../../common/atoms/page_nation_item";

interface Props {
  currentLevel: string;
}

const LevelNationWrapper = styled.div<Props>`
  display:flex;
  justify-content: space-around;
  align-items: center;
  height:51px;
  position: relative;
  background-color: white;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
  border-radius: 8px;

  a{
    font-size:1.05rem;
    color:${({ theme }) => theme.fontColor};
    text-decoration: none;
    font-weight:bold;
  }

  a:hover{
    color:${({ theme }) => theme.mainColor};
  }
`;

export default function RankNavigator({
  currentLevel
}: Props) {
  const levels = ["easy", "normal", "hard"];

  return (
    <LevelNationWrapper
      currentLevel={currentLevel}
    >
      {["쉬움", "보통", "어려움"].map((item, idx) =>
        <PageNationItem
          key={idx}
          value={item}
          url={`${levels[idx]}?page=1`}
          currentPage={currentLevel === levels[idx]}
          fontSize={"1.0rem"}
        />
      )}
    </LevelNationWrapper>
  )
}