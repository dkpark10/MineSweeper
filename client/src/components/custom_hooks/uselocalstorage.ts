import React, { useState } from 'react';

interface LocalStorageProps{
  key:string;
  defaultValue:string;
}

type ReturnType = [string, React.Dispatch<React.SetStateAction<string>>];

// 로컬스토리지는 값 조작이 가능하기에 유요한 검증 함수를 전달한다.
const useLocalStorage = ({ key, defaultValue }: LocalStorageProps, validator: (val: string) => boolean): ReturnType => {
  const [localValue, setLocalValue] = useState<string>(localStorage.getItem(key));
  if (validator(localValue) === false){
    setLocalValue(defaultValue);
  }
  return [localValue, setLocalValue];
}

export default useLocalStorage;