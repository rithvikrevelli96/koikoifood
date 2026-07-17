import { useState, useEffect, useCallback } from 'react';

export function useOTP(initialCountdown = 30) {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, countdown]);

  const startTimer = useCallback((secs = 30) => {
    setCountdown(secs);
    setTimerActive(true);
  }, []);

  const resetTimer = useCallback(() => {
    setCountdown(0);
    setTimerActive(false);
  }, []);

  return {
    countdown,
    timerActive,
    startTimer,
    resetTimer,
  };
}
