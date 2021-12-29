import styled from 'styled-components';

interface ITextStyle {
  size?: string;
  isColor?: boolean;
  value?: string;
  bold?: boolean;
  margin?: string;
}

const HeaderStyle = styled.div<ITextStyle>`
  font-family: 'Roboto', sans-serif;
  font-size: ${({ size }) => size};
  color: ${({ isColor, theme }) => {
    return isColor === true ? theme.mainColor : theme.fontColor;
  }};
  margin: ${({margin}) => margin};
  font-weight: ${({ bold }) => {
    return bold === true ? 'bold' : null;
  }};
`;

const HeaderText = ({ size, value, isColor, margin = '18px 0' }: ITextStyle) => {

  return (
    <>
      <HeaderStyle
        size={size}
        isColor={isColor}
        margin={margin}
      >
        {value}
      </HeaderStyle>
    </>
  )
}

const InlineStyle = styled.span<ITextStyle>`
  font-family: 'Tajawal', sans-serif;
  font-size: ${({ size }) => size};
  color: ${({ isColor, theme }) => {
    return isColor === true ? theme.mainColor : theme.fontColor;
  }};
  font-weight: ${({ bold }) => {
    return bold === true ? 'bold' : null;
  }};
`;

const InlineText = ({ size = '1.0rem', value, isColor,bold }: ITextStyle) => {
  
  return (
    <>
      <InlineStyle
        size={size}
        isColor={isColor}
        bold={bold}
      >
        {value}
      </InlineStyle>
    </>
  )
}

export { HeaderText, InlineText };