const useTimeFormat = (seconds: number, includeTenths = false) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const tenths = Math.floor((seconds * 10) % 10); // Calcola i decimi di secondo come una cifra

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return includeTenths ? `${formattedTime}.${tenths}` : formattedTime;
};

export default useTimeFormat;
