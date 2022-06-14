import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface DefaultProps {
  fontSize?: string;
  currentPage?: boolean;
}

interface Props extends DefaultProps {
  value: string;
  url: string;
}

const defaultProps: DefaultProps = {
  fontSize: '0.85rem',
  currentPage: false,
};

const PageNationItemWrapper = styled.span<Partial<Props>>`
  display:inline-block;
  position:relative;
  border-radius:5px;
  cursor:pointer;
  padding:4px;
  min-width: 32px;
  text-align:center;
  font-size: ${({ fontSize }) => fontSize || '0.85rem'};

  background-color:${({ theme, currentPage }) => (currentPage === true
    ? theme.mainColor
    : '')};

  color:${({ theme, currentPage }) => (currentPage === true
    ? 'white'
    : theme.fontColor)};

  &:hover{
    color:${({ theme }) => theme.mainColor};
  }
`;

export default function PageNationItem({
  value,
  url,
  fontSize,
  currentPage,
}: Props) {
  return (
    <Link to={url}>
      <PageNationItemWrapper
        fontSize={fontSize}
        currentPage={currentPage}
      >
        {value}
      </PageNationItemWrapper>
    </Link>
  );
}

PageNationItem.defaultProps = defaultProps;
