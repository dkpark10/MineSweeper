import React from 'react';
import styled from 'styled-components';
import { GameStatisticsProps } from 'statistics-type';
import Content from '../../../common/atoms/content';
import { ContentOuterWrapper, ContentWrapper, ContentHeader } from '../atoms/wrapper';

interface Props {
  data: GameStatisticsProps;
}

const StatisticsContent = styled(Content)`
  display:inline-block;
  width:54px;

  @media screen and (${({ theme }) => theme.mobile}){
    font-size:0.86rem;
  }
`;

export default function Statistics({
  data,
}: Props) {
  const {
    easyGameTotalCount,
    easyGameWinCount,
    easyBestRecord,
    normalGameTotalCount,
    normalGameWinCount,
    normalBestRecord,
    hardGameTotalCount,
    hardGameWinCount,
    hardBestRecord,
  } = data;
  const keys = [1, 2, 3];

  return (
    <>
      <ContentOuterWrapper>
        <ContentWrapper>
          {['쉬움', '보통', '어려움'].map((level) => (
            <StatisticsContent
              key={level}
              fontColor
              fontSize='1.02rem'
              bold
            >
              {level}
            </StatisticsContent>
          ))}
        </ContentWrapper>
      </ContentOuterWrapper>
      <ContentOuterWrapper>
        <ContentHeader>
          게임 수:
        </ContentHeader>
        <ContentWrapper>
          {[easyGameTotalCount,
            normalGameTotalCount,
            hardGameTotalCount].map((totalItemCount, idx) => (
              <StatisticsContent
                key={keys[idx]}
                fontSize='0.9rem'
              >
                {totalItemCount}
              </StatisticsContent>
          ))}
        </ContentWrapper>
      </ContentOuterWrapper>
      <ContentOuterWrapper>
        <ContentHeader>
          승리 수:
        </ContentHeader>
        <ContentWrapper>
          {[easyGameWinCount,
            normalGameWinCount,
            hardGameWinCount].map((winCount, idx) => (
              <StatisticsContent
                key={keys[idx]}
                fontSize='0.9rem'
              >
                {winCount}
              </StatisticsContent>
          ))}
        </ContentWrapper>
      </ContentOuterWrapper>
      <ContentOuterWrapper>
        <ContentHeader>
          최고기록:
        </ContentHeader>
        <ContentWrapper>
          {[easyBestRecord,
            normalBestRecord,
            hardBestRecord].map((bestRecord, idx) => (
              <StatisticsContent
                key={keys[idx]}
                fontSize='0.9rem'
              >
                {bestRecord === null ? '기록없음' : bestRecord}
              </StatisticsContent>
          ))}
        </ContentWrapper>
      </ContentOuterWrapper>
    </>
  );
}
