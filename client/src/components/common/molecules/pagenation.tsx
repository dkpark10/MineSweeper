import React from "react";
import styled from 'styled-components';
import PageNationItem from "../atoms/page_nation_item";
import {
  calculBeginPage,
  calculPrevButtonBeginPage,
  calculNextButtonBeginPage,
  isMobile
} from "../../../utils/common";

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
  pageRangeDisplayed = isMobile() ? 5 : 9
}: Props) {

  const [beginPage, lastPage, countPageShow] = calculBeginPage({
    totalItemCount,
    itemCountperPage,
    currentPage,
    pageRangeDisplayed
  });

  return (
    <PageNationWrapper>
      <PageNationStyle>
        <PageNationItem
          value={"◀"}
          url={`${url}?page=${calculPrevButtonBeginPage({ countPageShow, currentPage })}`}
        />
        {Array.from({ length: countPageShow }, (_, i) => i + beginPage)
          .map((page, idx) =>
            <PageNationItem
              key={idx}
              value={String(page)}
              url={`${url}?page=${page}`}
              currentPage={currentPage === page}
            />
          )}
        <PageNationItem
          value={"▶"}
          url={`${url}?page=${calculNextButtonBeginPage({ countPageShow, currentPage, lastPage })}`}
        />
      </PageNationStyle>
    </PageNationWrapper>
  )
}