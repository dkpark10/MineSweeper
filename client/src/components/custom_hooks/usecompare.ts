import React, { useState, useEffect } from 'react';
import { isEqual } from 'lodash';

type CompareParameter<T> = {
  val1: T;
  val2: T;
};

export default <T>({ val1, val2 }: CompareParameter<T>): boolean => {
  const [same, setSame] = useState<boolean>(false);
  useEffect(() => {
    if (isEqual(val1, val2)) {
      setSame(true);
    } else {
      setSame(false);
    }
  }, [val1, val2]);

  return same;
};
