import { useMemo } from 'react';

const useTimeFormat = (seconds: number, includeTenths = false) => {
  return useMemo(() => {
    const roundedSeconds = Math.floor(seconds);
    const tenths = Math.floor((seconds - roundedSeconds) * 100); // Calcola i decimi di secondo come due cifre
    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;

    if (includeTenths) {
      return `${String(minutes).padStart(2, '0')}'${String(remainingSeconds).padStart(2, '0')}"${String(tenths).padStart(1, '0')}`;
    }

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }, [seconds, includeTenths]);
};

export default useTimeFormat;
