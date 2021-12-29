import Header from '../Header';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axiosApi, { Response } from '../../modules/API';
import { RootState } from '../../reducers';
import React, { useEffect, useState } from 'react';

import {
  HeaderText,
}from '../atoms/index';

import {
  TextWrapper
}from '../molecules/index';
import { PieData } from '../molecules/NivoPie';

import {
  StatisticsTotalGame,
  StatisticsSummary,
  StatisticsWinrate,
  StatisticsPastGame
}from '../organisms/index';

const StatisticsWrapper = styled.div`
  margin: 30px 0;
  padding:0 40px;
  left: 50%;
  transform: translate(-50%);
  position: absolute;
  min-width: 794px;
  background-color:white;
  border-radius: 9px;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
`;

interface IPastGame {
  record: number;
  date: string;
  success: number;
  level: string;
}

export default function Statisticks({ userid }: { userid: string }) {

  const [gameCountPerLevel, setGameCountPerLevel] = useState<PieData[]>(Array.from({ length: 3 }, (v, i) => ({
    id: `${i}`,
    label: `${i}`,
    value: 0,
    color: ''
  })));

  const [pastGame, setPastGame] = useState<IPastGame[]>(Array.from({ length: 20 }, (v, i) => ({
    record: 0,
    date: '',
    success: 0,
    level: ''
  })));

  const [winRate, setWinRate] = useState<number[]>([0, 1, 2]);
  const [best, setBest] = useState<number[]>([1, 2, 3]);
  const [totalGame, setTotalGame] = useState<number>(0);
  const [winCount, setWinCount] = useState<number[]>([]);

  useEffect(() => {
    axiosApi.get(`http://localhost:8080/api/game?userid=${userid}`)
      .then((res: Response) => {

        const { easytotal, normaltotal, hardtotal, easywin, normalwin, hardwin, pastGame } = res.data;
        const { ebest, nbest, hbest } = res.data;

        setBest(prev => [ebest, nbest, hbest]);
        setPastGame(prev => [...pastGame]);
        setTotalGame(easytotal + normaltotal + hardtotal);
        setGameCountPerLevel(prev => [
          {
            id: 'easy',
            label: 'easy',
            value: easytotal
          },
          {
            id: 'normal',
            label: 'normal',
            value: normaltotal
          },
          {
            id: 'hard',
            label: 'hard',
            value: hardtotal
          }
        ]);

        setWinCount(prev => [
          easywin, normalwin, hardwin
        ]);

        setWinRate(prev => [
          Math.floor(easywin * 100 / easytotal),
          Math.floor(normalwin * 100 / normaltotal),
          Math.floor(hardwin * 100 / hardtotal)
        ]);
      })
      .catch(e => { });

  }, [userid]);

  return (
    <>
      <StatisticsWrapper>
        <TextWrapper
          width={'100%'}
          textAlign={'center'}
        >
          <HeaderText
            size={'2.0rem'}
            value={userid}
            isColor={false}
          />
        </TextWrapper>
        <StatisticsSummary
          gameCountPerLevel={gameCountPerLevel}
          best={best}
          winCount={winCount}
        />
        <StatisticsTotalGame
          totalGame={totalGame}
          gameCountPerLevel={gameCountPerLevel}
        />
        <StatisticsWinrate
          winRate={winRate}
        />
        <StatisticsPastGame
          pastGame={pastGame}
        />
      </StatisticsWrapper>
    </>
  )
}