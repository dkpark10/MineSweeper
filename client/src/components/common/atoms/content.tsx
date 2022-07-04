import styled from 'styled-components';

interface Props {
  fontSize?: string;
  hoverFontColor?: string;
  bold?: boolean;
  fontColor?: boolean;
  margin?:string;
  center?: boolean;
}

export default styled.span<Props>`
  font-family: 'Noto Sans KR', sans-serif;
  color: ${({ fontColor, theme }) => (fontColor === true ? theme.mainColor : theme.fontColor)};
  font-size: ${({ fontSize }) => fontSize || '0.9rem'};
  font-weight: ${({ bold }) => (bold === true ? 'bold' : '')};
  margin: ${({ margin }) => margin};
  text-align: ${({ center }) => (center ? 'center' : '')};

  &:hover{
    color: ${({ hoverFontColor }) => hoverFontColor};
  }
`;
