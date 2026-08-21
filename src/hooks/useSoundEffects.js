import { useState, useCallback } from 'react';
import { soundSynthesizer } from '../utils/soundSynthesizer';

/**
 * Custom Hook per la gestione del sonoro
 * @returns {Object} Controlli audio ed eventi sonori
 */
export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      soundSynthesizer.setMuted(next);
      return next;
    });
  }, []);

  const playCorrect = useCallback(() => soundSynthesizer.playCorrect(), []);
  const playError = useCallback(() => soundSynthesizer.playError(), []);
  const playPass = useCallback(() => soundSynthesizer.playPass(), []);
  const playTick = useCallback(() => soundSynthesizer.playTick(), []);
  const playTimeout = useCallback(() => soundSynthesizer.playTimeout(), []);
  const playStart = useCallback(() => soundSynthesizer.playStart(), []);

  return {
    isMuted,
    toggleMute,
    playCorrect,
    playError,
    playPass,
    playTick,
    playTimeout,
    playStart,
  };
}
