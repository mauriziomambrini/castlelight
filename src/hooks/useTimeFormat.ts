const useTimeFormat = (seconds: number, includeTenths = false) => {
  const roundedSeconds = Math.floor(seconds);
  const tenths = Math.floor((seconds - roundedSeconds) * 100);
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;

  if (includeTenths) {
    return `${String(minutes).padStart(2, '0')}'${String(remainingSeconds).padStart(2, '0')}"${String(tenths).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default useTimeFormat;
