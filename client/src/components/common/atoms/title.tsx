import React from 'react';
import styled from 'styled-components';

interface DefaultProps {
  fontSize?: string;
  fontColor?: boolean;
  fontBold?: boolean;
  margin?: string;
}

interface Props extends DefaultProps {
  children: JSX.Element | string;
}

const defaultProps: DefaultProps = {
  fontSize: '1.54rem',
  fontColor: false,
  fontBold: false,
  margin: '0px',
};

const TitleStyle = styled.div<Props>`
  font-family: 'Roboto', sans-serif;
  margin: ${({ margin }) => margin};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontBold }) => (fontBold === true ? 'bold' : '')};
  color:${({ fontColor, theme }) => (fontColor === true ? theme.mainColor : theme.fontColor)};
`;

export default function Title({
  children,
  fontSize,
  fontColor,
  fontBold,
  margin,
}: Props) {
  return (
    <TitleStyle
      fontSize={fontSize}
      fontColor={fontColor}
      fontBold={fontBold}
      margin={margin}
    >
      {children}
    </TitleStyle>
  );
}

Title.defaultProps = defaultProps;
