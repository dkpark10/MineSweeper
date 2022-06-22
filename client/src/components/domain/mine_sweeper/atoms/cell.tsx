import React, { ReactText } from 'react';
import styled from 'styled-components';
import flagimage from '../../../../assets/flag.png';
import { AbsoluteCenterWrapper } from '../../../common/atoms/wrapper';
import Image from '../../../common/atoms/image';

interface Props {
  value: ReactText;
  isLock: boolean;
  onMouseOver: React.MouseEventHandler<HTMLDivElement>;
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp: React.MouseEventHandler<HTMLDivElement>;
  onContextMenu: React.MouseEventHandler<HTMLDivElement>;
  isPointerHover: boolean;
}

const CellStyle = styled.div<Partial<Props>>`
  width: 26px;
  height: 26px;
  margin: 0.5px;
  display: inline-block;
  border-radius: 2px;
  position: relative;
  box-shadow: inset 2px 2px 0.5px #303030,
          inset -1px -1px 0.5px #484848;

  ${({ isLock, isPointerHover }) => {
    if (isLock === true) {
      return 'background: #3b3b3b';
    }
    if (isPointerHover === true) {
      return 'background: #717180';
    }

    return 'background: #4e4e50';
  }};
          
  &:hover{
    ${({ isLock }) => (isLock ? '' : 'background-color: #717180')};
  }
`;

const CellTextStyle = styled(AbsoluteCenterWrapper) <{
  color: string;
}>`
  font-size: 9px;
  font-weight: bold;
  color: ${({ color }) => color};
`;

export default function Cell({
  isLock,
  value,
  onMouseOver,
  onMouseDown,
  onMouseUp,
  onContextMenu,
  isPointerHover,
}: Props) {
  const colorofButtonNumber: string[] = [
    '',
    '#FF245E',
    '#8CA9FA',
    '#FFAA39',
    '#7EEE62',
    '#D9D1E8',
    '#0DEBEB',
    '#A566F8',
    '#A9350B',
  ];

  return (
    <CellStyle
      className='cell'
      isLock={isLock}
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onContextMenu={onContextMenu}
      isPointerHover={isPointerHover}
    >
      {value === 'flag'
        ? (
          <AbsoluteCenterWrapper>
            <Image
              width='100%'
              height='100%'
              src={flagimage}
              alt='flag'
            />
          </AbsoluteCenterWrapper>
        )
        : (
          <CellTextStyle
            color={colorofButtonNumber[value as number]}
          >
            {value}
          </CellTextStyle>
        )}
    </CellStyle>
  );
}
