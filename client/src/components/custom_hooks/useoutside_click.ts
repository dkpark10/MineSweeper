import React, { useState, useEffect } from 'react';

type Props<T> = {
  ref: React.RefObject<T>;
};

type ReturnType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export default function useOutsideClick({ ref }: Props<Node>): ReturnType {
  const [inerClick, setInnerClick] = useState(false);

  useEffect(() => {
    const clickSelectOutside = (e: MouseEvent) => {
      if (
        inerClick
        && ref.current
        && !ref.current.contains(e.target as Node)
      ) {
        setInnerClick(false);
      }
    };

    document.addEventListener('mousedown', clickSelectOutside);
    return () => {
      document.removeEventListener('mousedown', clickSelectOutside);
    };
  }, [inerClick, ref]);

  return [inerClick, setInnerClick];
}
