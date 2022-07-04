import React from 'react';
import styled from 'styled-components';

interface Props {
  backgroundColor: string;
  children: string;
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
`;

export default function Tile({
  backgroundColor,
  children,
}: Props): JSX.Element {
  return (
    <DefaultTile
      backgroundColor={backgroundColor}
    >
      {children}
    </DefaultTile>
  );
}
