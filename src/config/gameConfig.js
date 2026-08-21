/**
 * Costanti globali di configurazione del gioco "L'Intesa Vincente"
 * Rispettano la convenzione di nomenclatura UPPER_SNAKE_CASE per le costanti.
 */

export const DEFAULT_TIMER_SECONDS = 60;
export const DEFAULT_MAX_PASSES = 2;

export const POINTS_CONFIG = {
  CORRECT: 1,
  ERROR: -1,
  PASS: 0, // Nessuna detrazione punti sul Passo!
};

export const GAME_MODES = {
  STANDALONE: 'standalone',   // Gioca su 1 solo schermo (telefono o PC)
  MULTI_SCREEN: 'multi_screen' // Gioca su 2 schermi (Tabellone TV + Controller QR Code)
};

export const GAME_STATUS = {
  IDLE: 'idle',
  COUNTDOWN: 'countdown',
  PLAYING: 'playing',
  PAUSED: 'paused',
  FINISHED: 'finished',
};

export const PASS_MODES = {
  DISALLOW_ON_ZERO: 'disallow', // Disabilita il tasto quando i passi sono 0
  EXTRA_PENALTY: 'penalty',     // Permette passi extra ma con penalità (-2 punti)
};
