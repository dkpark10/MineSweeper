import React, { useState, useEffect } from 'react';

export default (id: string): boolean => {
  const [valid, setValid] = useState<boolean>(false);
  useEffect(() => {
    const idReg = /^[A-za-z0-9]{5,15}$/g;
    setValid(idReg.exec(id) !== null);
  }, [id]);

  return valid;
};
