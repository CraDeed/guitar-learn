import React from 'react';
import { useCallback, useState } from 'react';

const useInput = <T extends number | string>(
  initialValue: T,
): [
  T,
  React.ChangeEventHandler<any>,
  React.Dispatch<React.SetStateAction<T>>,
] => {
  const [value, setValue] = useState<T>(initialValue);

  const handler = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
};

export default useInput;
