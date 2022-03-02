import { useState } from 'react';
// не понял до конца
type ReturnType<T> = [T | undefined, (value: T) => void];

export const useLocalStorage = <T>(key: string, initialValue?: T): ReturnType<T> => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (initialValue) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
