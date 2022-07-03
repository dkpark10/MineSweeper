import React from 'react';
import styled from 'styled-components';

const StyleScore = styled.header`
  font-size:1.8rem;
  color: #fb8500;
  text-align:center;
  font-weight:bold;
  margin-bottom: 20px;
`;

interface Props {
  score: number;
}

export default function Score({ score }: Props) {
  return (
    <StyleScore>
      {`점수 : ${score}`}
    </StyleScore>
  );
}
