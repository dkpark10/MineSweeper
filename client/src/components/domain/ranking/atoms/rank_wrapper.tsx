import styled from 'styled-components';

const RankWrapper = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  margin:auto;

  @media screen and (${({ theme }) => theme.minTablet}){
    border-radius: 12px;
    width:784px;
    padding:24px;
  }

  @media screen and (${({ theme }) => theme.mobile}){
    width: 100vw;
  }
`;

export const RankListWrapper = styled.main`
  margin-bottom: 1.8rem;
`;

export default RankWrapper;
