import { useState, useCallback } from 'react';
import { DEFAULT_MAX_PASSES } from '../config/gameConfig';

/**
 * Custom hook dedicato alla gestione del numero di "Passo" disponibili
 * 
 * @param {number} maxPasses - Numero massimo di passi consentiti (default: 2)
 */
export function usePassesManager(maxPasses = DEFAULT_MAX_PASSES) {
  const [totalPasses, setTotalPasses] = useState(maxPasses);
  const [remainingPasses, setRemainingPasses] = useState(maxPasses);
  const [usedPassesCount, setUsedPassesCount] = useState(0);

  const consumePass = useCallback(() => {
    if (remainingPasses > 0) {
      setRemainingPasses((prev) => prev - 1);
      setUsedPassesCount((prev) => prev + 1);
      return true;
    }
    return false;
  }, [remainingPasses]);

  const resetPasses = useCallback((newMax = totalPasses) => {
    setTotalPasses(newMax);
    setRemainingPasses(newMax);
    setUsedPassesCount(0);
  }, [totalPasses]);

  const canPass = remainingPasses > 0;

  return {
    totalPasses,
    remainingPasses,
    usedPassesCount,
    canPass,
    consumePass,
    resetPasses,
    setTotalPasses,
  };
}
