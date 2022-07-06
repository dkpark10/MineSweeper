import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  backgroundColor: string;
  children: string;
  testid: string;
}

const expand = keyframes`
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.0);
  }
`;

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
    animation: ${expand} 1s;
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
