import React from "react";
import styled from "styled-components";
import CenterWrapper from "../../../common/atoms/center_wrapper";

const DefaultBulletinWrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  margin:auto; 
  background-color: white;

  @media screen and (${({ theme }) => theme.minTablet}){
    border-radius: 10px;
    width:644px;
    position: relative;
    margin-top:20px;
    box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
    padding:20px;
  }

  @media screen and (${({ theme }) => theme.mobile}){
    width:100vw;
    border-radius:10px;
    margin-top:10px;
    padding:10px;
  }
`
export const ContentOuterWrapper = styled.div`
  position: relative;
  height:43px;
  text-align:center;
`;

export const ContentHeader = styled.div`
  position: absolute;
  left:3%;
  top:50%;
  transform: translateY(-50%);
  font-size:0.78rem;

  @media screen and (${({ theme }) => theme.mobile}){
    left:0%;
    font-size:0.72rem;
  }
`;

export const ContentWrapper = styled(CenterWrapper)`
  display:flex;
  justify-content: space-around;
  width:284px;  
`;

export default DefaultBulletinWrapper;