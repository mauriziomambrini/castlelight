import { useMemo } from 'react';

const useFormat = (seconds: number, includeTenths = false) => {
  const formattedTime = useMemo(() => {
    const roundedSeconds = Math.floor(seconds);
    const tenths = Math.floor((seconds - roundedSeconds) * 100); // Calcola i decimi di secondo come due cifre
    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;

    if (includeTenths) {
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}.${String(tenths).padStart(2, '0')}`;
    } else {
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
  }, [seconds, includeTenths]);

  return formattedTime;
};

export default useFormat;
