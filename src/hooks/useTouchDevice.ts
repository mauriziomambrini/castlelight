import { useEffect, useState } from 'react';

function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const detectTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    setIsTouch(detectTouch());
  }, []);

  return isTouch;
}

export default useTouchDevice;
