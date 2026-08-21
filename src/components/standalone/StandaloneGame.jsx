import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Play, Trophy, Sparkles, CheckCircle2, XCircle, SkipForward } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';
import { GameTimer } from '../board/GameTimer';
import { ScoreDisplay } from '../board/ScoreDisplay';
import { CurrentWordCard } from '../controller/CurrentWordCard';
import { ActionPad } from '../controller/ActionPad';
import { PassIndicator } from '../common/PassIndicator';
import { AudioToggle } from '../common/AudioToggle';
import { TimerControlButton } from '../common/TimerControlButton';
import { Button } from '../common/Button';
import { GAME_STATUS } from '../../config/gameConfig';

/**
 * Schermata di Gioco Completa per Modalità 1 Schermo (Standalone)
 */
export function StandaloneGame({ config, onBack }) {
  const game = useGameState(config);

  // Trigger confetti a fine partita se il punteggio è positivo
  useEffect(() => {
    if (game.gameStatus === GAME_STATUS.FINISHED && game.score > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [game.gameStatus, game.score]);

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-3 min-h-screen flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold border border-slate-700/60 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Esci</span>
        </button>

        {/* Pass Indicator (Badge 2/2) */}
        <PassIndicator
          remainingPasses={game.passes.remainingPasses}
          totalPasses={game.passes.totalPasses}
        />

        <div className="flex items-center gap-2">
          <AudioToggle
            isMuted={game.sounds.isMuted}
            onToggle={game.sounds.toggleMute}
          />
          {game.gameStatus !== GAME_STATUS.IDLE && (
            <button
              onClick={game.resetGame}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-all cursor-pointer"
              title="Resetta Partita"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Main Body Switch based on Game Status */}
      <main className="flex-1 flex flex-col items-center justify-center my-3">
        {/* STATO: IDLE (In attesa di avvio) */}
        {game.gameStatus === GAME_STATUS.IDLE && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center w-full max-w-md bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-amber-400 flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-500/20">
              <Trophy className="w-10 h-10 text-amber-200" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Pronti a Giocare?
            </h2>

            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Il turno durerà <strong>{config.timerSeconds} secondi</strong>.<br />
              I suggeritori avranno a disposizione <strong>{config.maxPasses} passi</strong> senza perdita di punti.<br />
              <span className="text-amber-400 font-semibold">Nota:</span> Il tempo si ferma automaticamente ad ogni parola indovinata, errore o passo!
            </p>

            <Button
              variant="primary"
              size="xl"
              onClick={game.startCountdownAndPlay}
              className="w-full text-xl shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              icon={Play}
            >
              INIZIA ROUND
            </Button>
          </motion.div>
        )}

        {/* STATO: COUNTDOWN 3-2-1 */}
        {game.gameStatus === GAME_STATUS.COUNTDOWN && (
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4 animate-pulse">
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

        {/* STATO: PLAYING (In gioco) */}
        {game.gameStatus === GAME_STATUS.PLAYING && (
          <div className="w-full flex flex-col items-center space-y-3 sm:space-y-4">
            {/* Timer & Punteggio Header con Bottone START/STOP al Centro */}
            <div className="w-full grid grid-cols-3 gap-2 sm:gap-3 items-center bg-slate-900/80 border border-slate-800 rounded-3xl p-3 sm:p-4 shadow-xl">
              {/* Sinistra: Timer */}
              <div className="flex justify-center">
                <GameTimer
                  timeLeft={game.timer.timeLeft}
                  totalTime={config.timerSeconds}
                  isRunning={game.timer.isRunning}
                />
              </div>

              {/* Centro: Tasto Avvia / Ferma Tempo */}
              <TimerControlButton
                isRunning={game.timer.isRunning}
                onToggle={game.toggleTimer}
              />

              {/* Destra: Punti Squadra */}
              <div className="flex justify-center">
                <ScoreDisplay
                  score={game.score}
                  correctCount={game.correctCount}
                  errorCount={game.errorCount}
                />
              </div>
            </div>

            {/* Parola Segreta per i suggeritori */}
            <div className="w-full">
              <CurrentWordCard
                word={game.currentWord?.word}
                category={game.currentWord?.category}
                difficulty={game.currentWord?.difficulty}
              />
            </div>

            {/* Pulsantiera Azioni */}
            <div className="w-full">
              <ActionPad
                onCorrect={game.handleCorrect}
                onError={game.handleError}
                onPass={game.handlePass}
                remainingPasses={game.passes.remainingPasses}
              />
            </div>
          </div>
        )}

        {/* STATO: FINISHED (Fine Tempo / Risultati) */}
        {game.gameStatus === GAME_STATUS.FINISHED && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Tempo Scaduto!
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
              Risultato Finale
            </h2>

            {/* Punti Totali */}
            <div className="my-6">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Parole Valide Indovinate
              </span>
              <div className="text-7xl font-black text-amber-400 font-mono drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]">
                {game.score}
              </div>
            </div>

            {/* Statistiche dettagliate */}
            <div className="grid grid-cols-3 gap-2 bg-slate-800/60 rounded-2xl p-3 mb-6 text-xs sm:text-sm">
              <div className="flex flex-col items-center">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> {game.correctCount}
                </span>
                <span className="text-slate-400 text-xs">Indovinate</span>
              </div>
              <div className="flex flex-col items-center border-x border-slate-700">
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> {game.errorCount}
                </span>
                <span className="text-slate-400 text-xs">Errori</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <SkipForward className="w-4 h-4" /> {game.passes.usedPassesCount}
                </span>
                <span className="text-slate-400 text-xs">Passi Usati</span>
              </div>
            </div>

            {/* Storico Parole */}
            {game.history.length > 0 && (
              <div className="max-h-40 overflow-y-auto mb-6 text-left space-y-1.5 p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                <div className="text-xs font-bold uppercase text-slate-400 px-1 mb-1">
                  Riepilogo parole:
                </div>
                {game.history.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs px-2 py-1 rounded bg-slate-900/60"
                  >
                    <span className="font-semibold text-slate-200">{item.word}</span>
                    <span
                      className={`font-bold uppercase text-[10px] px-1.5 py-0.5 rounded ${
                        item.result === 'correct'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : item.result === 'error'
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {item.result === 'correct' ? 'Giusta' : item.result === 'error' ? 'Errore' : 'Passo'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Pulsante Gioca Ancora */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={game.resetGame}
                icon={RotateCcw}
                className="w-full sm:w-auto"
              >
                Nuovo Round
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onBack}
                className="w-full sm:w-auto"
              >
                Cambia Modalità
              </Button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer minimal */}
      <footer className="text-center text-xs text-slate-500 py-2">
        L'Intesa Vincente • Ispirato al celebre gioco TV
      </footer>
    </div>
  );
}
