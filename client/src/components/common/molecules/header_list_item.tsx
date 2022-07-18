import React from 'react';
import styled from 'styled-components';
import {
  Image,
} from '../atoms/index';

const HeaderListWrapper = styled.li`
  display:flex;
  align-items: center;
  cursor:pointer;

  &:hover{
    color: ${({ theme }) => theme.mainColor};
  }

  @media screen and (${({ theme }) => theme.minTablet}){
    margin:0px 12px;
    .header_menu_img {
      display: none;
    }
  }

  @media screen and (${({ theme }) => theme.mobile}){
    margin:30px 0px;
    .menu_text{
      margin: 0px 10px;
    }

    .header_menu_img {
      display:flex;
      align-items: center;
    }
  }
`;

interface Props {
  src: string;
  value: string;
  alt: string;
}

export default function HeaderListItem({
  src,
  value,
  alt,
}: Props) {
  return (
    <HeaderListWrapper>
      <div className='header_menu_img'>
        <Image
          src={src}
          alt={alt}
          width='22px'
          height='22px'
        />
      </div>
      <span className='menu_text'>
        {value}
      </span>
    </HeaderListWrapper>
  );
}
