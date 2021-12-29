import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IPageStyle {
  bold: boolean;
  border?: boolean;
  width?: string;
  isCurrentPage?: boolean;
  backgroundColor?: boolean;
};

export interface IPage extends IPageStyle {
  url: string;
  value: string;
};

const PageStyle = styled.span<IPageStyle>`
  width: ${({ width }) => width};
  border : ${({ theme, border }) => {
    return border === true ? `1px solid ${theme.fontColor}` : 'none'
  }};
  background-color: ${({ theme, backgroundColor }) => {
    return backgroundColor === true ? theme.mainColor : 'none'
  }};

  cursor:pointer;
  display:inline-block;

  font-family: 'Tajawal', sans-serif;
  border-radius:5px;
  margin: 0.8rem 0;
  text-align:center;

  a {
    color:${({ theme, isCurrentPage }) => {
    return isCurrentPage === true ? theme.mainColor : theme.fontColor;
  }};

    text-decoration: none;
    &:hover{
      color:${({ theme }) => theme.mainColor};
  }};
}
`;

const PageLink = ({
  url,
  width,
  border,
  isCurrentPage,
  value,
  bold,
  backgroundColor }: IPage) => {

  return (
    <>
      <PageStyle
        bold={bold}
        width={width}
        border={border}
        isCurrentPage={isCurrentPage}
        backgroundColor={backgroundColor}
      >
        <Link to={url}>
          {value}
        </Link>
      </PageStyle>
    </>
  )
}

export default PageLink;