import React from 'react';

interface RadioButtonProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}

const RadioButton = ({ name, value, onChange, checked }: RadioButtonProps) => {

  return (
    <>
      <input
        type='radio'
        name={name}
        value={value}
        onChange={onChange}
        checked={checked} />
    </>
  )
}

export default RadioButton;