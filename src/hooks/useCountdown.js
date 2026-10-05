import { useEffect, useState } from 'react';

function getTimeLeft(target) {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, hasPassed: true };
  }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    hasPassed: false,
  };
}

export default function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    if (timeLeft.hasPassed) return;
    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target, timeLeft.hasPassed]);

  return timeLeft;
}
