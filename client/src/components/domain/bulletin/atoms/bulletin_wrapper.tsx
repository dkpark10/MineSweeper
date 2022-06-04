import styled from "styled-components";

export const AlignCenterWrapper = styled.div`
  text-align: center;
`

const DefaultBulletinWrapper = styled.main`
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

  @media screen and (${({ theme }) => theme.minTablet}){
    margin-top:20px;
    width:784px;
    position: relative;
    padding:20px;
  }

  @media screen and (${({ theme }) => theme.mobile}){
    width:100vw;
    height: 100vh;
  }
`;

export default DefaultBulletinWrapper;