import React, { useState, useEffect } from 'react';

export default (email: string): boolean => {
  const [valid, setValid] = useState<boolean>(false);
  useEffect(() => {
    const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    setValid(emailReg.exec(email) !== null);
  }, [email]);

  return valid;
};
