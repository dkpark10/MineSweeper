type PagaNationType = 'totalItemCount' | 'itemCountperPage' | 'pageRangeDisplayed' | 'currentPage';
type PageNextPrevType = 'countPageShow' | 'currentPage';

type CalculBeginPageParameter = {
  [k in PagaNationType]: number;
};

type CalculPrevPageParameter = {
  [k in PageNextPrevType]: number;
};

type CalculNextPageParameter = CalculPrevPageParameter & {
  lastPage: number;
};

export const isMobile = (): boolean => /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

export const calculBeginPage = ({
  totalItemCount,
  itemCountperPage,
  pageRangeDisplayed,
  currentPage,
}: CalculBeginPageParameter): [number, number, number] => {
  const half = Math.floor(pageRangeDisplayed / 2);

  let lastPage = Math.floor(totalItemCount / itemCountperPage);
  if (totalItemCount % itemCountperPage !== 0) {
    lastPage += 1;
  }

  if (lastPage < pageRangeDisplayed) {
    return [1, lastPage, lastPage];
  }

  if (currentPage - half <= 1) {
    return [1, lastPage, pageRangeDisplayed];
  }

  if (currentPage > lastPage - half) {
    return [lastPage - pageRangeDisplayed + 1, lastPage, pageRangeDisplayed];
  }

  return [currentPage - half, lastPage, pageRangeDisplayed];
};

export const calculPrevButtonBeginPage = ({
  countPageShow,
  currentPage,
}: CalculPrevPageParameter): number => (

  currentPage - countPageShow <= 0
    ? 1
    : currentPage - countPageShow
);

export const calculNextButtonBeginPage = ({
  countPageShow,
  currentPage,
  lastPage,
}: CalculNextPageParameter): number => (

  currentPage + countPageShow > lastPage
    ? lastPage
    : currentPage + countPageShow
);
