import React from 'react';
import styled from 'styled-components';

const RankItemWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  height:46px;
  font-size:0.92rem;
`;

const RankItem = styled.span<{ width: string, center?: boolean }>`
  display:inline-block;
  width:${({ width }) => width};
  text-align: ${({ center }) => (center ? 'center' : '')};
  color:${({ theme }) => theme.fontColor};
  font-weight:bold;
`;

export default function RankNavigator() {
  return (
    <RankItemWrapper>
      <RankItem
        width='12%'
        center
      >
        순위
      </RankItem>
      <RankItem
        width='60%'
      >
        아이디
      </RankItem>
      <RankItem
        width='22%'
      >
        기록
      </RankItem>
    </RankItemWrapper>
  );
}
