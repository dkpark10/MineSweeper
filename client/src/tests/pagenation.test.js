import {
  calculBeginPage,
  calculNextButtonBeginPage,
  calculPrevButtonBeginPage
} from "../utils/common";

describe("페이지네이션 테스트", () => {

  const totalItemCount = 678;
  const itemCountperPage = 20;
  const pageRangeDisplayed = 9;
  const half = Math.floor(pageRangeDisplayed / 2);

  let lastPage = Math.floor(totalItemCount / itemCountperPage);
  if (totalItemCount % itemCountperPage !== 0) {
    lastPage++;
  }

  const pageInfo = {
    totalItemCount,
    itemCountperPage,
    pageRangeDisplayed,
    currentPage: 1
  };

  test("페이지 범위 앞", async () => {

    for (let currentPage = 1; currentPage <= 1 + half; currentPage++) {
      pageInfo.currentPage = currentPage;
      const [beginPage, ] = calculBeginPage(pageInfo);
      expect(beginPage).toBe(1);
    }
  })

  test("페이지 범위 중간", async () => {

    for (let currentPage = 2 + half; currentPage < lastPage - half; currentPage++) {
      pageInfo.currentPage = currentPage;
      const [beginPage, ] = calculBeginPage(pageInfo);
      expect(beginPage).toBe(currentPage - half);
    }
  })

  test("페이지 범위 마지막", async () => {

    for (let currentPage = lastPage; currentPage >= lastPage - half; currentPage--) {
      pageInfo.currentPage = currentPage;
      const [beginPage, ] = calculBeginPage(pageInfo);
      expect(beginPage).toBe(lastPage - pageRangeDisplayed + 1);
    }
  })
})