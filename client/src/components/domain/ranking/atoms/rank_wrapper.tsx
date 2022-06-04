import styled from "styled-components";

const RankWrapper = styled.main`
  font-family: "Noto Sans KR", sans-serif;
  margin:auto;

  ul{
    list-style: none;
  }

  li:nth-child(odd) {
    background-color: white;
  }

  li:last-child{
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
  }

  @media screen and (${({ theme }) => theme.minTablet}){
    border-radius: 12px;
    width:784px;
    padding:24px;
  }

  @media screen and (${({ theme }) => theme.mobile}){
    width: 100vw;
  }
`;

export default RankWrapper;