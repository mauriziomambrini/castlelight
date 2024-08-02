import { useMemo } from 'react';

const useFormat = (seconds: number) => {
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }, [seconds]);

  return formattedTime;
};

export default useFormat;
