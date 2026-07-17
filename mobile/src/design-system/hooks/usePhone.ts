import { useCallback } from 'react';

export function usePhone() {
  const formatPhone = useCallback((val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    if (clean.length > 5) {
      return `${clean.slice(0, 5)} ${clean.slice(5, 10)}`;
    }
    return clean;
  }, []);

  return { formatPhone };
}
