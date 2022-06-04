import React from 'react';
import styled from 'styled-components';

interface Props {
  width: string;
  height: string;
  children: JSX.Element | string | number;
  border?:string;
  radius?:string;
  backgroundColor?: string;
};

export default styled.button<Props>`
  font-family: 'Noto Sans KR', sans-serif;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border || "none"};
  border-radius: ${({ radius }) => radius || "0px"};
  background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.mainColor};
  cursor:pointer;
`;