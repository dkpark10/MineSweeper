import React from 'react';
import styled from 'styled-components';

const StyleScore = styled.header`
  font-size:1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.mainColor};
  text-align:center;
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
