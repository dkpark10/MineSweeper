import React from 'react';
import styled from 'styled-components';

interface Props {
  type: string;
  width: string;
  height: string;
}

const Input = styled('input').attrs(({
  type,
}: Props) => ({
  style: {
    type,
  }
})) <Props>`
  font-family: 'Noto Sans KR', sans-serif;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  outline:none;
  border:none;
`;

export default Input;