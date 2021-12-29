import styled from 'styled-components';

export interface IButton {
  width: string;
  height: string;
  backgroundColor?: string;
  fontColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  border?: boolean;
  children?: any;
}

export const ButtonStyle = styled.button<Partial<IButton>>`
  cursor:pointer;
  width: ${({ width }) => width};
  height:${({ height }) => height};
  color:${({ fontColor, theme }) => {
    return fontColor ? fontColor : theme.fontColor
  }};
  background-color: ${({ backgroundColor, theme }) => {
    return backgroundColor ? backgroundColor : theme.mainColor
  }};
  border-radius: 5px;
  border : ${({ border, theme }) => {
    return border === true ? `2px solid ${theme.mainColor}` : 'none';
  }};
  font-family :'Roboto', sans-serif;
`;

const SkinismButtonStyle = styled.button<Partial<IButton>>`
  cursor:pointer;
  width: ${({ width }) => width};
  height:${({ height }) => height};
  color:${({ fontColor }) => fontColor};
  background-color: 'none';
  border-radius: 5px;
  border-top: 0.5px solid white;
  border-left: 0.5px solid #eee;
  font-family :'Roboto', sans-serif;
`;

const Button = ({
  width,
  height,
  backgroundColor,
  fontColor,
  border,
  onClick,
  children }: IButton) => {

  return (
    <>
      <ButtonStyle
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        onClick={onClick}
        fontColor={fontColor}
        border={border}
      >{children}
      </ButtonStyle >
    </>
  )
}

const SkinismButton = ({
  width,
  height,
  fontColor,
  onClick,
  children }: IButton) => {

  return (
    <>
      <SkinismButtonStyle
        width={width}
        height={height}
        onClick={onClick}
        fontColor={fontColor}
      >{children}
      </SkinismButtonStyle >
    </>
  )
}

export { Button, SkinismButton };
