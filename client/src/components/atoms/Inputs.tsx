import React from 'react';
import styled from 'styled-components';

interface IInputStyle {
  type: string;
  value: string;
  width: string;
  height: string;
  backgroundColor: string;
  placeHolder?: string;
  onChange?: React.Dispatch<React.SetStateAction<any>>;
  border?: string;
}

const InputTextStyle = styled('input').attrs((props: IInputStyle) => ({
  style: {
    type: 'text',
    value: props.value
  }
})) <IInputStyle>`
  width: ${({ width }) => width};
  height:${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border:none;
  margin-right: 0.7rem;
  font-size:1.0rem;
  outline: 1px solid ${({ theme }) => theme.mainColor};
  border-radius: 8px;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.mainColor};
  }
`;

const InputSubmitStyle = styled('input').attrs((props: IInputStyle) => ({
  style: {
    type: 'submit',
    value: props.value
  }
})) <IInputStyle>`
  width: ${({ width }) => width};
  height:${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border:none;
  color:white;
  font-family: 'Roboto', sans-serif;
  border-radius:7px;
  font-size: 0.9rem;

  &:hover{
    cursor:pointer;
    background: linear-gradient(70deg,#1033e3, #f74bf7);
  }
`;

const Input = ({ type, value, width, height, backgroundColor, placeHolder = '', onChange }: Partial<IInputStyle>) => {

  switch (type) {
    case 'text':
      return (
        <>
          <InputTextStyle
            type={type}
            value={value}
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            onChange={onChange}
            placeholder={placeHolder}
          />
        </>
      )
    case 'submit':
      return (
        <>
          <InputSubmitStyle
            type={type}
            value={value}
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            onChange={onChange}
            placeholder={placeHolder}
          />
        </>
      )
    default: break;
  }
}

export default Input;