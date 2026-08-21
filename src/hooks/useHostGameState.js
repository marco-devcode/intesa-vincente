import { useEffect, useRef } from 'react';
import { useGameState } from './useGameState';

/**
 * Hook per lo Schermo Suggeritori (HOST) nella modalità 2 schermi.
 *
 * Comportamento:
 * - Esegue useGameState normalmente (ha il controllo completo del gioco).
 * - Trasmette l'intero stato di gioco via BroadcastChannel ogni volta che cambia.
 * - Ascolta i comandi inviati dallo Schermo Giocatore (GUEST):
 *   - CMD_TOGGLE_TIMER → esegue toggleTimer
 *   - CMD_PASS        → esegue handlePass
 *
 * @param {Object} config    - Configurazione partita (timerSeconds, maxPasses)
 * @param {string} roomCode  - Codice stanza, usato come nome del canale
 */
export function useHostGameState(config, roomCode) {
  const game = useGameState(config);
  const channelRef = useRef(null);

  // Ref alle azioni correnti per evitare closures stantie nel listener
  const actionsRef = useRef({});
  actionsRef.current = {
    toggleTimer: game.toggleTimer,
    handlePass: game.handlePass,
  };

  // Setup BroadcastChannel e ascolto comandi guest
  useEffect(() => {
    const channel = new BroadcastChannel(`intesa-vincente-${roomCode}`);
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const { type } = event.data;
      if (type === 'CMD_TOGGLE_TIMER') {
        actionsRef.current.toggleTimer();
      } else if (type === 'CMD_PASS') {
        actionsRef.current.handlePass();
      }
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [roomCode]);

  // Broadcast dello stato completo ogni volta che cambia qualcosa di rilevante
  useEffect(() => {
    if (!channelRef.current) return;
    channelRef.current.postMessage({
      type: 'STATE_UPDATE',
      payload: {
        gameStatus: game.gameStatus,
        score: game.score,
        correctCount: game.correctCount,
        errorCount: game.errorCount,
        countdownNumber: game.countdownNumber,
        timeLeft: game.timer.timeLeft,
        isTimerRunning: game.timer.isRunning,
        remainingPasses: game.passes.remainingPasses,
        totalPasses: game.passes.totalPasses,
        canPass: game.passes.canPass,
      },
    });
  }, [
    game.gameStatus,
    game.score,
    game.correctCount,
    game.errorCount,
    game.countdownNumber,
    game.timer.timeLeft,
    game.timer.isRunning,
    game.passes.remainingPasses,
    game.passes.totalPasses,
    game.passes.canPass,
  ]);

  // Restituisce l'intero oggetto game invariato (l'host ha accesso completo)
  return game;
}
