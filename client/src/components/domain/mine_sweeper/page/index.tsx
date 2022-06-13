import React from 'react';
import { LevelType } from 'mine-sweeper-type';
import useLocalStorage from '../../../custom_hooks/uselocalstorage';
import Game from '../organisms/game';
import Header from '../../../common/organisms/header';

export default function MineSweeper() {
  const [level] = useLocalStorage({
    key: 'difficulty',
    defaultValue: 'easy',
  }, (val: string) => ['easy', 'normal', 'hard'].filter((ele) => ele === val).length > 0);

  return (
    <>
      <Header />
      <Game level={level as LevelType} />
    </>
  );
}
