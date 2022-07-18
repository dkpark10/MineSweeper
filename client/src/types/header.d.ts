declare module 'header-type' {
  export type HeaderTitle = '게임' | '랭킹' | '게시판' | '나의 페이지' | '옵션';

  export type HeaderURL =
    '/'
    | '/ranking/minesweeper?level=easy&page=1'
    | '/community?page=1'
    | '/mypage'
    | '/option';

  export type Header = {
    id: number;
    title: HeaderTitle;
    url: HeaderURL;
    src: string;
  };
}
