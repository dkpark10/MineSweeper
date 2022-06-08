import React from 'react';
import styled from 'styled-components';

export const AbsoluteCenterWrapper = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
`;

export const FlexBetweenWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
`;
