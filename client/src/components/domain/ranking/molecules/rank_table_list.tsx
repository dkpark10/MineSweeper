import React from 'react';
import styled from 'styled-components';
import { GameProps } from 'rankpage-type';
import { Link } from 'react-router-dom';
import RankItem from './rank_table_item';

const RankListWrapper = styled.ul`
  list-style: none;

  li:nth-child(odd) {
    background-color: white;
  }

  li:last-child{
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
  }
`;

interface Props {
  rankData: GameProps[];
  page: string;
}

export default function RankList({
  rankData,
  page,
}: Props) {
  return (
    <RankListWrapper>
      {rankData.map((rank, idx) => (
        <li
          key={rank.ranking}
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
    </RankListWrapper>
  );
}
