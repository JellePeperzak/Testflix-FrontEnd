import { useState, useEffect } from 'react';

export const usePersistentState = <T,>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const savedData = sessionStorage.getItem(key);
      console.log(`key: ${key}, savedData: ${savedData}, typeof savedData: ${typeof savedData}`)
      try {
        // Ensure we only parse valid JSON
        return savedData && savedData !== 'undefined'
          ? JSON.parse(savedData)
          : defaultValue;
      } catch (e) {
        console.error(`Error parsing sessionStorage key "${key}":`, e);
        return defaultValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};