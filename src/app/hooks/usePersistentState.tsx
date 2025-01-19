import { useState, useEffect } from 'react';

export const usePersistentState = <T,>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultValue); // Initialize with defaultValue

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = sessionStorage.getItem(key);
      if (savedData !== null && savedData !== 'undefined') {
        setState(JSON.parse(savedData));
      }
    }
  }, [key]);

  useEffect(() => {
    if (state !== undefined) {
      sessionStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};