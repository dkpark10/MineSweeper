import React from 'react';

interface ResetButtonProps {
  inputLength : boolean;
  name : string;
  onReset: React.MouseEventHandler<HTMLButtonElement>;
}

const ResetButton = (props: ResetButtonProps) => {

  const { inputLength, name, onReset } = props;

  return (
    <>
      {inputLength && <button
        name={name}
        className='btn-reset'
        onClick={onReset} />}
    </>
  )
}

export default ResetButton;