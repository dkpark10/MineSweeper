import React, {
  useEffect,
  useRef,
} from 'react';
import styled from 'styled-components';

const NewGameInput = styled.input.attrs(() => ({
  type: 'button',
}))`
  width:89px;
  height:26px;
  border-radius: 5px;
  font-weight: bold;
  margin-top:12px;
  cursor:pointer;
  color:white;
  border: 2px solid #292929;
  outline: none;
  background: linear-gradient(145deg, #171717, #313030);
  box-shadow:  3px 3px 15px #171717,
             -3px -3px 5px #383636;
  &:hover{
    border: none;
    background: linear-gradient(145deg, #ce6e00, #ff8e00);
    box-shadow:  1px 1px 15px #c66900,
             -3px -3px 5px #ffa100;
  }
`;

interface Props {
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onReset: () => void;
}

export default function NewGameButton({ onKeyDown, onReset }: Props) {
  const newGameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newGameRef.current) {
      newGameRef.current.focus();
    }
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <NewGameInput
        ref={newGameRef}
        name='keypress'
        onBlur={() => {
          if (newGameRef.current) {
            newGameRef.current.focus();
          }
        }}
        value='새게임'
        onClick={onReset}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
