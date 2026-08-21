import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Play, Sparkles, Tv } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';
import { GameTimer } from './GameTimer';
import { ScoreDisplay } from './ScoreDisplay';
import { WordReveal } from './WordReveal';
import { PassIndicator } from '../common/PassIndicator';
import { AudioToggle } from '../common/AudioToggle';
import { Button } from '../common/Button';
import { GAME_STATUS } from '../../config/gameConfig';

/**
 * Schermata Tabellone TV per Modalità 2 Schermi
 */
export function TvBoardView({ config, roomCode, onBack }) {
  const game = useGameState(config);

  useEffect(() => {
    if (game.gameStatus === GAME_STATUS.FINISHED && game.score > 0) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  }, [game.gameStatus, game.score]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 min-h-screen flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-bold">
            <Tv className="w-4 h-4" />
            <span>Tabellone TV • Stanza: <strong className="text-amber-400 font-mono">{roomCode}</strong></span>
          </div>
        </div>

        <PassIndicator
          remainingPasses={game.passes.remainingPasses}
          totalPasses={game.passes.totalPasses}
        />

        <div className="flex items-center gap-2">
          <AudioToggle
            isMuted={game.sounds.isMuted}
            onToggle={game.sounds.toggleMute}
          />
          <button
            onClick={game.resetGame}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main TV Stage */}
      <main className="flex-1 flex flex-col items-center justify-center my-6">
        {game.gameStatus === GAME_STATUS.IDLE && (
          <div className="text-center max-w-lg bg-slate-900/80 border border-blue-500/40 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-3">Tabellone Pronto</h2>
            <p className="text-slate-300 text-sm mb-6">
              Assicurati che i due suggeritori abbiano aperto lo schermo controller sul proprio telefono prima di avviare il countdown.
            </p>
            <Button
              variant="primary"
              size="xl"
              onClick={game.startCountdownAndPlay}
              icon={Play}
              className="w-full shadow-2xl font-black"
            >
              AVVIA IL GIOCO
            </Button>
          </div>
        )}

        {game.gameStatus === GAME_STATUS.COUNTDOWN && (
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-blue-400 uppercase tracking-widest mb-4 animate-pulse">
              Studio Pronto...
            </span>
            <motion.div
              key={game.countdownNumber}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1.3, opacity: 1 }}
              className="text-9xl font-black font-mono text-amber-400 drop-shadow-[0_0_50px_rgba(251,191,36,0.9)]"
            >
              {game.countdownNumber}
            </motion.div>
          </div>
        )}

        {game.gameStatus === GAME_STATUS.PLAYING && (
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-3xl bg-slate-900/70 border border-blue-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <GameTimer
                timeLeft={game.timer.timeLeft}
                totalTime={config.timerSeconds}
                isRunning={game.timer.isRunning}
              />
              <ScoreDisplay
                score={game.score}
                correctCount={game.correctCount}
                errorCount={game.errorCount}
              />
            </div>

            {/* In modalità TV mostriamo la parola target oscurata o rivelata */}
            <WordReveal
              word={game.currentWord?.word}
              category={game.currentWord?.category}
              isVisible={true}
            />

            {/* Controlli di regia di emergenza */}
            <div className="flex items-center gap-3">
              <Button size="sm" variant="correct" onClick={game.handleCorrect}>+1 Giusta</Button>
              <Button size="sm" variant="pass" onClick={game.handlePass} disabled={!game.passes.canPass}>Passo ({game.passes.remainingPasses})</Button>
              <Button size="sm" variant="error" onClick={game.handleError}>-1 Errore</Button>
            </div>
          </div>
        )}

        {game.gameStatus === GAME_STATUS.FINISHED && (
          <div className="text-center max-w-xl bg-slate-900/90 border-2 border-amber-400 rounded-3xl p-8 shadow-2xl">
            <div className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-2">Stop al Tempo!</div>
            <h2 className="text-4xl font-black text-white mb-4">Punteggio Finale</h2>
            <div className="text-8xl font-black text-amber-400 font-mono mb-6 drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]">
              {game.score}
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="primary" size="lg" onClick={game.resetGame} icon={RotateCcw}>
                Altra Manche
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center text-xs text-slate-500 py-2">
        Tabellone TV • L'Intesa Vincente
      </footer>
    </div>
  );
}
