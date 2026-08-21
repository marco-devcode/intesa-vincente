import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook per la gestione del timer di gioco
 * Garantisce pulizia accurata dei listener/interval ed evita drift temporali.
 * 
 * @param {Object} options
 * @param {number} options.initialDuration - Secondi iniziali (default 60)
 * @param {Function} options.onTimeout - Callback allo scadere del tempo
 * @param {Function} options.onTick - Callback opzionale ad ogni secondo
 */
export function useGameTimer({ initialDuration = 60, onTimeout, onTick } = {}) {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const timerRef = useRef(null);
  const onTimeoutRef = useRef(onTimeout);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
    onTickRef.current = onTick;
  }, [onTimeout, onTick]);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setIsFinished(false);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    if (!isFinished && timeLeft > 0) {
      setIsRunning(true);
    }
  }, [isFinished, timeLeft]);

  const resetTimer = useCallback((newDuration = initialDuration) => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(newDuration);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [initialDuration]);

  const adjustTime = useCallback((seconds) => {
    setTimeLeft((prev) => Math.max(0, prev + seconds));
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsRunning(false);
          setIsFinished(true);
          if (onTimeoutRef.current) {
            onTimeoutRef.current();
          }
          return 0;
        }

        const nextTime = prev - 1;
        if (onTickRef.current) {
          onTickRef.current(nextTime);
        }
        return nextTime;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning]);

  return {
    timeLeft,
    isRunning,
    isFinished,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    adjustTime,
    setTimeLeft,
  };
}
