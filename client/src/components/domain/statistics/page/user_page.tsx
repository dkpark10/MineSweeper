import React from "react";
import styled from "styled-components";
import { GameStatisticsProps } from "statistics-type";

import {
  Loading,
  Title
} from "../../../common/atoms/index";

import {
  Header,
  Footer
} from "../../../common/organisms/index";

import Statistics from "../molecules/statistics";
import PastGameRecord from "../molecules/pastgame_record";
import WinRateRecord from "../molecules/winrate_record";

import useAxios from "../../../custom_hooks/useaxios";
import MyPageWrapper from "../atoms/wrapper";

const TitleHeaderStyle = styled.div`
  text-align:center;
`;

interface Props {
  userid: string;
}

export default function MyPage({
  userid
}: Props) {
  const [response, loading] = useAxios<GameStatisticsProps>(`/api/game?userid=${userid}`);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main>
        <MyPageWrapper>
          <TitleHeaderStyle>
            <Title
              fontSize={"1.28rem"}
              fontBold={true}
            >
              {userid}
            </Title>
          </TitleHeaderStyle>
        </MyPageWrapper>
        <MyPageWrapper>
          <Statistics
            data={response}
          />
        </MyPageWrapper>
        <MyPageWrapper>
          <TitleHeaderStyle>
            {"승률"}
          </TitleHeaderStyle>
          <WinRateRecord
            gameRecord={response}
          />
        </MyPageWrapper>
        <MyPageWrapper>
          <TitleHeaderStyle>
            {"최근 게임 기록"}
          </TitleHeaderStyle>
          <PastGameRecord
            pastGame={response.pastGame}
          />
        </MyPageWrapper>
      </main>
      <Footer />
    </>
  )
}