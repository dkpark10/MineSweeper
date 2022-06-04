import React from "react";
import styled from "styled-components";
import Content from "../../../common/atoms/content";
import { ContentOuterWrapper, ContentWrapper, ContentHeader } from "../atoms/wrapper";
import { GameStatisticsProps } from "statistics-type";

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
  data
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
    hardBestRecord
  } = data;

  return (
    <>
      <ContentOuterWrapper>
        <ContentWrapper>
          {["쉬움", "보통", "어려움"].map((level, idx) =>
            <StatisticsContent
              key={idx}
              fontColor={true}
              fontSize={"1.02rem"}
              bold={true}
            >
              {level}
            </StatisticsContent>
          )}
        </ContentWrapper>
      </ContentOuterWrapper>
      <ContentOuterWrapper>
        <ContentHeader>
          게임 수:
        </ContentHeader>
        <ContentWrapper>
          {[easyGameTotalCount,
            normalGameTotalCount,
            hardGameTotalCount].map((totalItemCount, idx) =>
              <StatisticsContent
                key={idx}
                fontSize={"0.9rem"}
              >
                {totalItemCount}
              </StatisticsContent>
            )}
        </ContentWrapper>
      </ContentOuterWrapper>
      <ContentOuterWrapper>
        <ContentHeader>
          승리 수:
        </ContentHeader>
        <ContentWrapper>
          {[easyGameWinCount,
            normalGameWinCount,
            hardGameWinCount].map((winCount, idx) =>
              <StatisticsContent
                key={idx}
                fontSize={"0.9rem"}
              >
                {winCount}
              </StatisticsContent>
            )}
        </ContentWrapper>
      </ContentOuterWrapper>
      <ContentOuterWrapper>
        <ContentHeader>
          최고기록:
        </ContentHeader>
        <ContentWrapper>
          {[easyBestRecord,
            normalBestRecord,
            hardBestRecord].map((bestRecord, idx) =>
              <StatisticsContent
                key={idx}
                fontSize={"0.9rem"}
              >
                {bestRecord === null ? "기록없음" : bestRecord}
              </StatisticsContent>
            )}
        </ContentWrapper>
      </ContentOuterWrapper>
    </>
  )
}