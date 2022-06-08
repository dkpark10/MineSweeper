import React, { ReactText } from "react";
import styled from "styled-components";
import Image from '../../../common/atoms/image';
import flagimage from '../../../../assets/flag.png';
import { AbsoluteCenterWrapper } from '../../../common/atoms/wrapper';

interface Props {
  value: ReactText;
  isLock: boolean;
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  onContextMenu: React.MouseEventHandler<HTMLDivElement>;
};

const CellStyle = styled.div<Partial<Props>>`
  width: 26px;
  height: 26px;
  margin: 0.5px;
  display: inline-block;
  border-radius: 2px;
  position: relative;

  ${({ isLock }) => {
    return isLock === true
      ? `background: #3b3b3b;
          box-shadow: inset 2px 2px 0.5px #303030,
          inset -1px -1px 0.5px #484848;`
      : `background: #4e4e50;
          box-shadow: inset 2px 2px 5px #464649,
          inset -1px -1px 0.5px #6e6e73;`
  }}

  &:hover{
    ${({ isLock }) => isLock ? '' : 'background-color: #717180'};
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
  onMouseDown,
  onContextMenu
}: Props) {

  const colorofButtonNumber: string[] = [
    "",
    "#FF245E",
    "#8CA9FA",
    "#FFAA39",
    "#7EEE62",
    "#D9D1E8",
    "#0DEBEB",
    "#A566F8",
    "#A9350B"
  ];

  return (
    <CellStyle
      className="cell"
      isLock={isLock}
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}
    >
      {value === 'flag'
        ?
        <AbsoluteCenterWrapper>
          <Image
            width={'100%'}
            height={'100%'}
            src={flagimage}
            alt={'깃발'}
          />
        </AbsoluteCenterWrapper>
        :
        <CellTextStyle
          color={colorofButtonNumber[value]}
        >
          {value}
        </CellTextStyle>
      }
    </CellStyle>
  );
}