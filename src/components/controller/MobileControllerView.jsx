import React from 'react';
import { useGuestGameState } from '../../hooks/useGuestGameState';
import { GameTimer } from '../board/GameTimer';
import { ScoreDisplay } from '../board/ScoreDisplay';
import { PassIndicator } from '../common/PassIndicator';
import { TimerControlButton } from '../common/TimerControlButton';
import { Smartphone, Play, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { GAME_STATUS } from '../../config/gameConfig';

/**
 * Schermo Giocatore (Guest) - Colui che deve indovinare la parola.
 * Non vede la parola segreta, non ha i pulsanti +1/-1.
 * Vede il timer, il punteggio e controlla il tempo (AVVIA/FERMA) e può passare (Passo).
 */
export function MobileControllerView({ roomCode, onBack }) {
  const game = useGuestGameState(roomCode);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>Giocatore · <span className="text-amber-400 font-mono">{roomCode}</span></span>
        </div>

        <PassIndicator
          remainingPasses={game.passes.remainingPasses}
          totalPasses={game.passes.totalPasses}
        />

        <button
          onClick={onBack}
          className="text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-400"
        >
          Esci
        </button>
      </header>

      {/* Body */}
      <main className="flex-1 flex flex-col items-center justify-center my-3 space-y-6">
        {/* IDLE */}
        {game.gameStatus === GAME_STATUS.IDLE && (
          <div className="text-center p-6 bg-slate-900/90 rounded-3xl border border-indigo-500/20 w-full shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">Schermo Giocatore</h3>
            <p className="text-xs text-slate-400 mb-6">
              In attesa che i suggeritori avviino il gioco sul loro schermo.
            </p>
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin"></div>
            </div>
          </div>
        )}

        {/* COUNTDOWN */}
        {game.gameStatus === GAME_STATUS.COUNTDOWN && (
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4 animate-pulse">
              Concentrazione...
            </span>
            <div className="text-7xl font-black text-amber-400 font-mono">
              {game.countdownNumber}
            </div>
          </div>
        )}

        {/* PLAYING */}
        {game.gameStatus === GAME_STATUS.PLAYING && (
          <div className="w-full flex flex-col items-center space-y-6">
            {/* Pannello Timer e Score */}
            {/* Timer mini + Tasto Stop/Avvia + Punteggio mini */}
            <div className="w-full grid grid-cols-[28%_44%_28%] gap-1 xs:gap-2 items-center bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 xs:p-3 shadow-lg select-none">
              <div className="flex justify-center min-w-0 overflow-hidden">
                <GameTimer
                  timeLeft={game.timer.timeLeft}
                  totalTime={60}
                  isRunning={game.timer.isRunning}
                  compact={true}
                />
              </div>

              <div className="min-w-0">
                <TimerControlButton
                  isRunning={game.timer.isRunning}
                  onToggle={game.toggleTimer}
                  className="w-full py-3 px-1 sm:px-2 rounded-xl"
                />
              </div>

              <div className="flex justify-center min-w-0 overflow-hidden">
                <ScoreDisplay
                  score={game.score}
                  correctCount={game.correctCount}
                  errorCount={game.errorCount}
                  compact={true}
                />
              </div>
            </div>

            {/* Istruzione per il giocatore */}
            <div className="text-center p-6 bg-slate-950/60 border border-slate-800/80 rounded-2xl w-full">
              {game.isWaitingForNextWord ? (
                <>
                  <span className="text-xs text-amber-400 font-black uppercase tracking-widest animate-pulse">
                    avvia il tempo per mostrare la nuova parola
                  </span>
                  <p className="text-xs text-slate-400 mt-2">
                    Premi il pulsante verde al centro per rivelare il prossimo termine ed avviare il countdown.
                  </p>
                </>
              ) : (
                <>
                  <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Ascolta i suggeritori</span>
                  <p className="text-sm text-slate-300 mt-2">
                    Indovina la parola e pronunciala ad alta voce! I suggeritori registreranno i punti.
                  </p>
                </>
              )}
            </div>

            {/* Pulsante di Passo per velocizzare */}
            <div className="w-full">
              <Button
                variant="pass"
                size="xl"
                onClick={game.handlePass}
                disabled={!game.passes.canPass}
                className="w-full py-6 text-xl font-black rounded-3xl shadow-xl shadow-amber-900/10"
              >
                Passo ({game.passes.remainingPasses})
              </Button>
            </div>
          </div>
        )}

        {/* FINISHED */}
        {game.gameStatus === GAME_STATUS.FINISHED && (
          <div className="text-center p-6 bg-slate-900/90 rounded-3xl border border-slate-800 w-full shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Fine Round!
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Manche Terminata</h3>
            <div className="text-6xl font-black text-amber-400 font-mono my-4 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              {game.score} pt
            </div>
            <p className="text-xs text-slate-400">
              I suggeritori possono avviare un nuovo round dal loro schermo.
            </p>
          </div>
        )}
      </main>

      <footer className="text-center text-[10px] text-slate-500 py-1">
        Schermo Giocatore • L'Intesa Vincente
      </footer>
    </div>
  );
}
