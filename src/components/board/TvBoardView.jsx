import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ArrowLeft, RotateCcw, Play, Sparkles, Users,
  CheckCircle2, XCircle, SkipForward, Trophy
} from 'lucide-react';
import { useHostGameState } from '../../hooks/useHostGameState';
import { GameTimer } from './GameTimer';
import { ScoreDisplay } from './ScoreDisplay';
import { WordReveal } from './WordReveal';
import { PassIndicator } from '../common/PassIndicator';
import { AudioToggle } from '../common/AudioToggle';
import { TimerControlButton } from '../common/TimerControlButton';
import { Button } from '../common/Button';
import { GAME_STATUS } from '../../config/gameConfig';

/**
 * Schermo Suggeritori — HOST della modalità 2 schermi.
 *
 * Questo schermo è gestito dai suggeritori (chi dà gli indizi).
 * Vede la parola segreta, i tasti +1/-1/Passo e controlla il timer.
 * Trasmette lo stato al Schermo Giocatore via BroadcastChannel.
 */
export function TvBoardView({ config, roomCode, onBack }) {
  const game = useHostGameState(config, roomCode);

  // Confetti a fine partita se il punteggio è positivo
  useEffect(() => {
    if (game.gameStatus === GAME_STATUS.FINISHED && game.score > 0) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    }
  }, [game.gameStatus, game.score]);

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-3 min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold border border-slate-700/60 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Esci</span>
        </button>

        {/* Badge schermo */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-bold">
          <Users className="w-3.5 h-3.5 text-amber-400" />
          <span>Suggeritori · <span className="text-amber-400 font-mono">{roomCode}</span></span>
        </div>

        <div className="flex items-center gap-2">
          <PassIndicator
            remainingPasses={game.passes.remainingPasses}
            totalPasses={game.passes.totalPasses}
          />
          <AudioToggle isMuted={game.sounds.isMuted} onToggle={game.sounds.toggleMute} />
          {game.gameStatus !== GAME_STATUS.IDLE && (
            <button
              onClick={game.resetGame}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-all cursor-pointer"
              title="Resetta"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Corpo principale */}
      <main className="flex-1 flex flex-col items-center justify-center my-3">

        {/* IDLE */}
        {game.gameStatus === GAME_STATUS.IDLE && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center w-full max-w-md bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 to-amber-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Schermo Suggeritori</h2>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Questo schermo mostra le parole da indovinare.<br />
              Il <span className="text-amber-400 font-semibold">Giocatore</span> usa il suo schermo per gestire il tempo.<br />
              Il timer si ferma automaticamente ad ogni risposta.
            </p>
            <Button
              variant="primary"
              size="xl"
              onClick={game.startCountdownAndPlay}
              className="w-full shadow-[0_0_25px_rgba(99,102,241,0.5)]"
              icon={Play}
            >
              INIZIA ROUND
            </Button>
          </motion.div>
        )}

        {/* COUNTDOWN */}
        {game.gameStatus === GAME_STATUS.COUNTDOWN && (
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4 animate-pulse">
              Concentrazione...
            </span>
            <motion.div
              key={game.countdownNumber}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-8xl sm:text-9xl font-black font-mono text-amber-400 drop-shadow-[0_0_40px_rgba(251,191,36,0.8)]"
            >
              {game.countdownNumber}
            </motion.div>
          </div>
        )}

        {/* PLAYING */}
        {game.gameStatus === GAME_STATUS.PLAYING && (
          <div className="w-full flex flex-col items-center space-y-3 sm:space-y-4">
            {/* Timer | AVVIA-FERMA | Punteggio */}
            <div className="w-full grid grid-cols-[28%_44%_28%] gap-1 xs:gap-2 sm:gap-3 items-center bg-slate-900/80 border border-slate-800 rounded-3xl p-2.5 xs:p-3 sm:p-4 shadow-xl select-none">
              <div className="flex justify-center min-w-0 overflow-hidden">
                <GameTimer
                  timeLeft={game.timer.timeLeft}
                  totalTime={config.timerSeconds}
                  isRunning={game.timer.isRunning}
                />
              </div>
              <div className="min-w-0">
                <TimerControlButton
                  isRunning={game.timer.isRunning}
                  onToggle={game.toggleTimer}
                  className="w-full py-3.5 px-1 sm:px-3 sm:py-5 rounded-2xl"
                />
              </div>
              <div className="flex justify-center min-w-0 overflow-hidden">
                <ScoreDisplay
                  score={game.score}
                  correctCount={game.correctCount}
                  errorCount={game.errorCount}
                />
              </div>
            </div>

            {/* Parola Segreta (solo i suggeritori la vedono) */}
            <div className="w-full">
              <WordReveal
                word={game.currentWord?.word}
                isVisible={true}
                isWaitingForNextWord={game.isWaitingForNextWord}
              />
            </div>

            {/* Tasti +1 / Passo / -1 */}
            <div className="w-full grid grid-cols-3 gap-2 sm:gap-3">
              <Button
                variant="error"
                size="lg"
                onClick={game.handleError}
                className="w-full py-5 text-lg font-black rounded-2xl"
              >
                -1 Errore
              </Button>
              <Button
                variant="pass"
                size="lg"
                onClick={game.handlePass}
                disabled={!game.passes.canPass}
                className="w-full py-5 text-lg font-black rounded-2xl"
              >
                Passo ({game.passes.remainingPasses})
              </Button>
              <Button
                variant="correct"
                size="lg"
                onClick={game.handleCorrect}
                className="w-full py-5 text-lg font-black rounded-2xl"
              >
                +1 Giusta
              </Button>
            </div>
          </div>
        )}

        {/* FINISHED */}
        {game.gameStatus === GAME_STATUS.FINISHED && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Tempo Scaduto!
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">Risultato Finale</h2>
            <div className="my-6">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Punti</span>
              <div className="text-7xl font-black text-amber-400 font-mono drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]">
                {game.score}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-800/60 rounded-2xl p-3 mb-6 text-xs sm:text-sm">
              <div className="flex flex-col items-center">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />{game.correctCount}
                </span>
                <span className="text-slate-400 text-xs">Giuste</span>
              </div>
              <div className="flex flex-col items-center border-x border-slate-700">
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <XCircle className="w-4 h-4" />{game.errorCount}
                </span>
                <span className="text-slate-400 text-xs">Errori</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <SkipForward className="w-4 h-4" />{game.passes.usedPassesCount ?? (game.passes.totalPasses - game.passes.remainingPasses)}
                </span>
                <span className="text-slate-400 text-xs">Passi</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Button variant="primary" size="lg" onClick={game.resetGame} icon={RotateCcw} className="w-full sm:w-auto">
                Nuovo Round
              </Button>
              <Button variant="secondary" size="lg" onClick={onBack} className="w-full sm:w-auto">
                Esci
              </Button>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="text-center text-xs text-slate-500 py-2">
        Schermo Suggeritori · L'Intesa Vincente
      </footer>
    </div>
  );
}
