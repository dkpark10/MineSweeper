export const isMobile = (): boolean => {
  return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
}

export const calculBeginPage = ({
  totalItemCount,
  itemCountperPage,
  pageRangeDisplayed,
  currentPage
}): [number, number, number] => {

  const half = Math.floor(pageRangeDisplayed / 2);

  let lastPage = Math.floor(totalItemCount / itemCountperPage);
  if (totalItemCount % itemCountperPage !== 0) {
    lastPage++;
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
}

export const calculPrevButtonBeginPage = ({
  countPageShow,
  currentPage
}): number => {
  return currentPage - countPageShow <= 0 ? 1 : currentPage - countPageShow;
}

export const calculNextButtonBeginPage = ({
  countPageShow,
  currentPage,
  lastPage
}): number => {
  return currentPage + countPageShow > lastPage ? lastPage : currentPage + countPageShow;
}