import PageLink from '../atoms/Page';
import styled from 'styled-components';

export interface PageProps {
  totalItemCount: number;
  itemCountperPage?: number;
  currentPage: number;
  pageRangeDisplayed?: number;
  url: string;
}

const PageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 524px;
  left:50%;
  margin : 1.4rem 0;
  transform: translateX(-50%);
  cursor: pointer;
  text-align: center;
  font-family: 'Tajawal', sans-serif;
  font-size: 1.2rem;
`;

const calculPage = ({
  totalItemCount,
  itemCountperPage,
  currentPage,
  pageRangeDisplayed
}: Partial<PageProps>) => {

  let beginPage = currentPage - Math.floor(pageRangeDisplayed / 2);

  if (currentPage - Math.floor(pageRangeDisplayed / 2) <= 0) {
    beginPage = 1;
  }

  const tmpEndPage = Math.floor(totalItemCount / itemCountperPage);
  const endPage = totalItemCount % itemCountperPage === 0 ? tmpEndPage : tmpEndPage + 1;

  if (currentPage + Math.floor(pageRangeDisplayed / 2) > endPage) {
    beginPage = endPage - pageRangeDisplayed;
    if (beginPage <= 0) {
      beginPage = 1;
    }
  }

  return { beginPage, endPage };
}

const PageNation = ({
  totalItemCount,
  itemCountperPage = 20,
  currentPage,
  pageRangeDisplayed = 9,
  url
}: PageProps) => {

  const { beginPage, endPage } = calculPage({
    totalItemCount,
    itemCountperPage,
    currentPage,
    pageRangeDisplayed
  });

  const pageList: JSX.Element[] = Array.from({ length: pageRangeDisplayed }, (v, i) => i)
    .map((ele, idx) => {

      const page = beginPage + ele;
      if (page > endPage) {
        return <span key={idx} style={{ display: 'none' }} />
      }

      return (
        <PageLink
          key={idx}
          url={`${url}?page=${page}`}
          isCurrentPage={page === currentPage}
          value={String(page)}
          bold={false}
        />
      )
    })
    
  return (
    <>
      <PageWrapper>
        <PageLink
          url={`${url}?page=${currentPage - pageRangeDisplayed <= 0 ?
            1 :
            currentPage - pageRangeDisplayed}`}
          isCurrentPage={false}
          value={'<<'}
          bold={true}
        />
        {pageList}
        <PageLink
          url={`${url}?page=${currentPage + pageRangeDisplayed > endPage
            ? endPage
            : currentPage + pageRangeDisplayed}`}
          isCurrentPage={false}
          value={'>>'}
          bold={true}
        />
      </PageWrapper>
    </>
  )
}

export default PageNation;