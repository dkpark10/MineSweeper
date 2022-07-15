import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageNationItem from '../../../common/atoms/page_nation_item';

const RankNavigationWrapper = styled.div`
  position:relative;
`;

const RankNavigation = styled.div`
  position:absolute;
  left: 50%;
  transform:translateX(-50%);
  display:flex;
  justify-content: space-around;
  align-items: center;
  width: 322px;
  height:51px;
  position: relative;
  background-color: white;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
  border-radius: 8px;

  a{
    font-size:1.05rem;
    text-decoration: none;
    font-weight:bold;
  }
`;

interface Props {
  currentGame: string;
}

export default function RankNavigator({
  currentGame,
}: Props) {
  const LinkItem = [
    {
      content: '지뢰찾기',
      name: 'minesweeper',
      url: 'minesweeper?page=1&level=easy',
    },
    {
      content: '2048',
      name: '2048',
      url: '2048?page=1',
    },
  ];

  return (
    <RankNavigationWrapper>
      <RankNavigation>
        {LinkItem.map((item) => (
          <Link
            to={item.url}
            key={item.content}
            replace
          >
            <PageNationItem
              value={item.content}
              currentPage={currentGame === item.name}
              fontSize='1.0rem'
            />
          </Link>
        ))}
      </RankNavigation>
    </RankNavigationWrapper>
  );
}
