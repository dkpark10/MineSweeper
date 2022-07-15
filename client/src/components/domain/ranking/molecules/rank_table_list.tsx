import React from 'react';
import { GameProps } from 'rankpage-type';
import { Link } from 'react-router-dom';
import RankItem from './rank_table_item';

interface Props {
  rankData: GameProps[];
  page: string;
}

export default function RankList({
  rankData,
  page,
}: Props) {
  return (
    <ul>
      {rankData.map((rank, idx) => (
        <li
          key={Number(page) + idx}
        >
          <Link
            to={{
              pathname: `/mypage/${rank.id}`,
              state: {
                userid: rank.id,
              },
            }}
            replace
          >
            <RankItem
              rank={Number(page) + idx}
              id={rank.id}
              record={rank.record}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
