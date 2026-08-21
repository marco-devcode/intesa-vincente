/**
 * Formatta i secondi rimanenti in formato mm:ss o ss
 * @param {number} totalSeconds - Secondi totali da formattare
 * @returns {string} Stringa formattata
 */
export function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${seconds}`;
}

/**
 * Calcola la percentuale di tempo rimanente per la barra di progresso
 * @param {number} currentSeconds 
 * @param {number} totalSeconds 
 * @returns {number} Percentuale da 0 a 100
 */
export function calculateTimePercentage(currentSeconds, totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) return 0;
  return Math.min(100, Math.max(0, (currentSeconds / totalSeconds) * 100));
}
