import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageNationItem from '../atoms/page_nation_item';
import {
  calculBeginPage,
  calculPrevButtonBeginPage,
  calculNextButtonBeginPage,
  isMobile,
} from '../../../utils/common';

const PageNationWrapper = styled.div`
  position:relative;
  height:46px;
  margin:16px 0px;
`;

const PageNationStyle = styled.nav`
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  display:flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height:100%;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
  border-radius: 8px;

  @media screen and (${({ theme }) => theme.mobile}){
    width:100vw;
  }
`;

interface Props {
  url: string;
  totalItemCount: number;
  currentPage: number;
  itemCountperPage?: number;
  pageRangeDisplayed?: number;
}

export default function PageNation({
  url,
  totalItemCount,
  currentPage,
  itemCountperPage = 20,
  pageRangeDisplayed = isMobile() ? 5 : 9,
}: Props) {
  const [beginPage, lastPage, countPageShow] = calculBeginPage({
    totalItemCount,
    itemCountperPage,
    currentPage,
    pageRangeDisplayed,
  });

  return (
    <PageNationWrapper>
      <PageNationStyle>
        <Link
          to={`${url}?page=${calculPrevButtonBeginPage({ countPageShow, currentPage })}`}
        >
          <PageNationItem
            value='◀'
          />
        </Link>
        {Array.from({ length: countPageShow }, (_, i) => i + beginPage)
          .map((page) => (
            <Link
              key={page}
              to={`${url}?page=${page}`}
            >
              <PageNationItem
                value={String(page)}
                currentPage={currentPage === page}
              />
            </Link>
          ))}
        <Link
          to={`${url}?page=${calculNextButtonBeginPage({ countPageShow, currentPage, lastPage })}`}
        >
          <PageNationItem
            value='▶'
          />
        </Link>
      </PageNationStyle>
    </PageNationWrapper>
  );
}

PageNation.defaultProps = {
  itemCountperPage: 20,
  pageRangeDisplayed: isMobile() ? 5 : 9,
};
