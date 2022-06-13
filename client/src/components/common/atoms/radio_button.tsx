import React from 'react';
import styled from 'styled-components';

interface DefaultProps {
  value?: string;
  check?: boolean;
  size?: {
    top: string;
    left: string;
  }
}

const defaultProps: DefaultProps = {
  value: '',
  check: false,
  size: { top: '0.0rem', left: '0.0rem' },
};

interface Props extends DefaultProps {
  name: string;
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioStyle = styled.span<Partial<Props>>`
  position: relative;
  display:inline-block;
  height: 23px;
  width: 23px;
  margin:0px;

  input[type=radio] {
    opacity:0;
    position: absolute;
    cursor: pointer;
    z-index: 1;
    top: ${({ size }) => size?.top};
    left : ${({ size }) => size?.left};
    width: 100%;
    height: 100%;
  }

  input[type=radio] + label::before{
    position: absolute;
    content: "";
    top: ${({ size }) => size?.top};
    left : ${({ size }) => size?.left};
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: linear-gradient(122deg, #e7e7f4, white);
    box-shadow:  2px 3px 4px rgb(175, 175, 175);
  }

  input[type=radio]:checked + label::before {
    background: radial-gradient(closest-side, #5959de, #17179d, white 85%);
    -webkit-transition: .7s;
    transition: .7s;
  }
`;

export default function RadioButton({
  name,
  id,
  value,
  check,
  onChange,
  size,
}: Props) {
  return (
    <RadioStyle
      size={size}
    >
      <input
        type='radio'
        name={name}
        value={value}
        id={id}
        onChange={onChange}
        checked={check}
      />
      {/* eslint-disable-next-line */}
      <label htmlFor={name} />
    </RadioStyle>
  );
}

RadioButton.defaultProps = defaultProps;
