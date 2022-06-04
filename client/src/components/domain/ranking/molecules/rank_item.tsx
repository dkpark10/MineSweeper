import React from "react";
import styled from "styled-components";

const RankItemWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  height:39px;
  font-size:0.86rem;

  &:hover{
    border:1px solid ${({ theme }) => theme.mainColor};
  }
`;

const RankItem = styled.span<{ width: string, center?: boolean, fontColor?: boolean }>`
  display:inline-block;
  width:${({ width }) => width};
  text-align: ${({ center }) => center ? "center" : ""};
  color:${({ theme, fontColor }) => fontColor === true ? theme.mainColor : theme.fontColor};
  font-weight:${({ fontColor }) => fontColor === true ? "bold" : ""};
`;

interface Props {
  rank?: number | string;
  id?: string;
  record?: string;
}

export default function RankNavigator({
  rank = "순위",
  id = "아이디",
  record = "기록"
}: Props) {

  return (
    <RankItemWrapper>
      <RankItem
        width={"12%"}
        center={true}
        fontColor={true}
      >
        {rank}
      </RankItem>
      <RankItem
        width={"60%"}
      >
        {id}
      </RankItem>
      <RankItem
        width={"22%"}
      >
        {record}
      </RankItem>
    </RankItemWrapper>
  )
}