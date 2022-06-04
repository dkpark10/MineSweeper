import React from 'react';
import styled from 'styled-components';

const HamStyle = styled.span`
  @media screen and (${({ theme }) => theme.mobile}){
    width: 20px;
    height: 20px;
    display:flex;
    align-content: space-around;
    flex-wrap: wrap;
    margin: 0px 5px;
    cursor:pointer;

    div{
      display: block;
      width: 100%;
      height: 2px;
      position: relative;
      background: #fff6e3;
      border-radius: 50%;
    }
  }
`;

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function Hamburger({
  onClick
}: Props) {
  return (
    <HamStyle 
      onClick={onClick}
    >
      <div></div>
      <div></div>
      <div></div>
    </HamStyle>
  )
}