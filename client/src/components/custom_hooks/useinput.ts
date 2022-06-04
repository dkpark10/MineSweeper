import React, { useState } from 'react';

type ChangeReturnType = (e: React.ChangeEvent<HTMLInputElement>) => void;
interface CallbackProps {
  name?: string;
  value?: string;
}

export const useObjectInput = <T>(init: T, callback?: (props: CallbackProps) => void):
  [T, ChangeReturnType, React.Dispatch<React.SetStateAction<T>>] => {
  const [data, setData] = useState<T>(init);
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (callback) {
      callback({
        name,
        value
      });
    }
  };
  return [data, change, setData];
};

export const useStringInput = (init: string, callback?: (props: CallbackProps) => void): [string, ChangeReturnType] => {
  const [data, setData] = useState<string>(init);
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(e.target.value);

    if (callback) {
      callback({
        name,
        value
      });
    }
  };
  return [data, change];
};