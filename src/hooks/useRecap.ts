import * as IMAGES from '@/assets/images';
import { useQuizContext } from '@/hooks/useQuizContext.ts';
import { useEffect, useMemo, useRef, useState } from 'react';

const useRecap = () => {
  const { calculateScore } = useQuizContext();
  const { successRate } = calculateScore();
  const [pathLength, setPathLength] = useState(0);
  const [dashOffset, setDashOffset] = useState(0);
  const [animatedSuccessRate, setAnimatedSuccessRate] = useState(0);

  const pathRef = useRef<SVGPathElement>(null);

  const resultData = useMemo(() => {
    switch (true) {
      case successRate >= 75:
        return {
          text: 'excellent',
          image: IMAGES.characterKnightSword,
        };
      case successRate >= 50:
        return {
          text: 'good',
          image: IMAGES.characterArcherArrow,
        };
      case successRate >= 25:
        return {
          text: 'normal',
          image: IMAGES.characterSoldierLance,
        };
      default:
        return {
          text: 'bad',
          image: IMAGES.characterFarmer,
        };
    }
  }, [successRate]);

  const animate = (timestamp: number, startTimestamp: number) => {
    const elapsed = timestamp - startTimestamp;
    const progress = Math.min(elapsed / 2000, 1);

    const currentRate = Math.floor(progress * successRate);
    setAnimatedSuccessRate(currentRate);

    const currentOffset = pathLength - (pathLength * currentRate) / 100;
    setDashOffset(currentOffset);

    if (progress < 1) {
      requestAnimationFrame((newTimestamp) =>
        animate(newTimestamp, startTimestamp),
      );
    }
  };

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    setPathLength(length);
    setDashOffset(length);
  }, []);

  useEffect(() => {
    if (pathLength <= 0) return;
    requestAnimationFrame((timestamp) => animate(timestamp, timestamp));
  }, [pathLength, successRate]);

  return {
    pathRef,
    pathLength,
    dashOffset,
    animatedSuccessRate,
    resultData,
  };
};

export default useRecap;
