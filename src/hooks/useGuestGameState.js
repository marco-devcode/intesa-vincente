import { useState, useEffect, useRef, useCallback } from 'react';
import { GAME_STATUS, DEFAULT_TIMER_SECONDS, DEFAULT_MAX_PASSES } from '../config/gameConfig';

/**
 * Stato iniziale dello schermo guest prima di ricevere il primo aggiornamento dall'host.
 */
const INITIAL_GUEST_STATE = {
  gameStatus: GAME_STATUS.IDLE,
  score: 0,
  correctCount: 0,
  errorCount: 0,
  countdownNumber: null,
  timeLeft: DEFAULT_TIMER_SECONDS,
  isTimerRunning: false,
  remainingPasses: DEFAULT_MAX_PASSES,
  totalPasses: DEFAULT_MAX_PASSES,
  canPass: true,
  isWaitingForNextWord: false,
};

/**
 * Hook per lo Schermo Giocatore (GUEST) nella modalità 2 schermi.
 *
 * Comportamento:
 * - Riceve lo stato di gioco broadcast dall'host via BroadcastChannel.
 * - NON controlla direttamente il gioco — espone solo funzioni che inviano comandi all'host.
 * - Comandi disponibili: toggleTimer, handlePass (nessun +1/-1, il guest non vede la parola).
 *
 * @param {string} roomCode - Codice stanza, usato come nome del canale
 * @returns Oggetto con stato di sola lettura e funzioni comando
 */
export function useGuestGameState(roomCode) {
  const [state, setState] = useState(INITIAL_GUEST_STATE);
  const channelRef = useRef(null);

  useEffect(() => {
    const channel = new BroadcastChannel(`intesa-vincente-${roomCode}`);
    channelRef.current = channel;

    channel.onmessage = (event) => {
      if (event.data?.type === 'STATE_UPDATE') {
        setState(event.data.payload);
      }
    };

    // Segnala all'host che il guest è pronto (l'host risponderà con lo stato corrente)
    channel.postMessage({ type: 'GUEST_READY' });

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [roomCode]);

  const toggleTimer = useCallback(() => {
    channelRef.current?.postMessage({ type: 'CMD_TOGGLE_TIMER' });
  }, []);

  const handlePass = useCallback(() => {
    channelRef.current?.postMessage({ type: 'CMD_PASS' });
  }, []);

  // Restituisce un'interfaccia compatibile con useGameState ma di sola lettura
  return {
    gameStatus: state.gameStatus,
    score: state.score,
    correctCount: state.correctCount,
    errorCount: state.errorCount,
    countdownNumber: state.countdownNumber,

    timer: {
      timeLeft: state.timeLeft,
      isRunning: state.isTimerRunning,
    },

    passes: {
      remainingPasses: state.remainingPasses,
      totalPasses: state.totalPasses,
      canPass: state.canPass,
    },
    isWaitingForNextWord: state.isWaitingForNextWord,

    toggleTimer,
    handlePass,
  };
}
