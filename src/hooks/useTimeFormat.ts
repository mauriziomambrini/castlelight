const useTimeFormat = (seconds: number, includeTenths = false) => {
  const roundedSeconds = Math.floor(seconds);
  const tenths = Math.floor((seconds - roundedSeconds) * 100);
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;

  const toStr = (num: number): string => {
    return String(num).padStart(2, '0');
  };

  // const format = (input: string, replacements: any[]) => {
  //   return input.replace(/{(\d+)}/g, (_, i) => replacements[i]);
  // };

  if (includeTenths) {
    // return format(`{0}'{1}"{2}`, [minutes, remainingSeconds, tenths]);
    return [toStr(minutes), `'`, toStr(remainingSeconds), `"`, toStr(tenths)].join('');
  }

  return [toStr(minutes), toStr(remainingSeconds)].join(':');
};

export default useTimeFormat;
