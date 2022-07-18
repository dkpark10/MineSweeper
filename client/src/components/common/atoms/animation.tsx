import { keyframes } from 'styled-components';

export const MenuMoveAnimation = (x: number) => keyframes`
  100% {
    left: ${x}vw;
  }
`;

export const Expand = keyframes`
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.0);
  }
`;
