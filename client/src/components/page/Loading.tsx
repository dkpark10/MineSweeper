import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { InlineText } from '../atoms/Text';

const LoadWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const Loading = () => {

  const [count, setCount] = useState(0);
  const tid = useRef(null);

  useEffect(() => {
    tid.current = setInterval(() => {
      if (count >= 3) {
        setCount(0);
        return;
      }
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(tid.current);
      tid.current = null;
    };
  }, [count]);

  const bombs = Array.from({ length: count }, (v, i) => '💣').join('');

  return (
    <>
      <LoadWrapper>
        <InlineText
          size={'4.2rem'}
          isColor={false}
          value={"Loading"}
        />
        <InlineText
          size={'1.8rem'}
          isColor={false}
          value={bombs}
        />
      </LoadWrapper>
    </>
  );
}

export default Loading;