import React, { useState, useEffect } from 'react';

export default (password: string): boolean => {
  const [valid, setValid] = useState<boolean>(false);
  useEffect(() => {
    const passwordReg = /^[A-Za-z0-9]{6,15}$/;
    setValid(passwordReg.exec(password) !== null);
  }, [password]);

  return valid;
};
