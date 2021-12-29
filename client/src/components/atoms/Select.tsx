import React from 'react';
import styled from 'styled-components';

interface ISelectStyle {
  width: string;
  height: string;
  option: string[][];
}

const SelectStyle = styled.select<Partial<ISelectStyle>>`
  width: ${({ width }) => width}rem;
  height:${({ height }) => height}rem;
  font-family: 'Tajawal', sans-serif;
  margin : 0 0.5rem;
`;

const Select = ({ width, height, option }: ISelectStyle) => {

  const optionList: JSX.Element[] = option.map((ele, idx) => {

    const [key, value] = ele;
    return (
      <option
        key={idx}
        value={key}
      >{value}
      </option>
    )
  })

  return (
    <>
      <SelectStyle
        width={width}
        height={height}
      >
        {optionList}
      </SelectStyle>
    </>
  )
}

export default Select;