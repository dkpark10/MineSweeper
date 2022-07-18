import React from 'react';
import styled from 'styled-components';
import { Expand } from '../../../common/atoms/animation';

interface Props {
  backgroundColor: string;
  children: string;
  testid: string;
}

const DefaultTile = styled.div<{ backgroundColor: string }>`
  width:194px;
  height:194px;
  color:white;
  font-size:4.4rem;
  border-radius:15px;
  text-align:center;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  box-shadow:  4px 4px 10px #272626;
  margin:20px;

  &:hover{
    animation: ${Expand} 1s;
  }

  @media screen and (${({ theme }) => theme.mobile}){
    width:114px;
    height:114px;
    font-size:2.6rem;
  }
`;

export default function Tile({
  backgroundColor,
  children,
  testid,
}: Props): JSX.Element {
  return (
    <DefaultTile
      data-testid={testid}
      backgroundColor={backgroundColor}
    >
      {children}
    </DefaultTile>
  );
}
