import React from 'react';
import { GameStatisticsProps } from 'statistics-type';
import styled from 'styled-components';
import { AbsoluteCenterWrapper } from '../../../common/atoms/wrapper';
import Doughnut from '../atoms/doughnut';

const WinRateRecordWrapper = styled.div`
  display:flex;
  justify-content: space-around;
`;

const WinRateRecordItem = styled.div`
  width:20%;
  position:relative;
`;

const WinRateText = styled(AbsoluteCenterWrapper)`
  font-size: 1.1rem;
  @media screen and (${({ theme }) => theme.mobile}){
    font-size: 0.89rem;
  }
`;

interface Props {
  gameRecord: GameStatisticsProps;
}

export default function WinRateRecord({ gameRecord }: Props) {
  const {
    easyGameTotalCount,
    easyGameWinCount,
    normalGameTotalCount,
    normalGameWinCount,
    hardGameTotalCount,
    hardGameWinCount,
  } = gameRecord;

  const keys = [1, 2, 3];
  const winRateList = [
    Math.floor((easyGameWinCount / easyGameTotalCount) * 100),
    Math.floor((normalGameWinCount / normalGameTotalCount) * 100),
    Math.floor((hardGameWinCount / hardGameTotalCount) * 100),
  ];

  return (
    <WinRateRecordWrapper>
      {winRateList.map((winRate, idx) => (
        <WinRateRecordItem key={keys[idx]}>
          <WinRateText>
            {Number.isNaN(winRate) ? '0%' : `${winRate}%`}
          </WinRateText>
          <Doughnut
            winRate={winRate}
          />
        </WinRateRecordItem>
      ))}
    </WinRateRecordWrapper>
  );
}
