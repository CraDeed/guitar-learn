import React from 'react';
import { useCallback, useState } from 'react';

const useInput = (
  initialValue: string,
): [
  string,
  React.ChangeEventHandler<HTMLInputElement>,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [value, setValue] = useState<string>(initialValue);

  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
};

export default useInput;
