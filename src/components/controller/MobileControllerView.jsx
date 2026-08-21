import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { CurrentWordCard } from './CurrentWordCard';
import { ActionPad } from './ActionPad';
import { PassIndicator } from '../common/PassIndicator';
import { AudioToggle } from '../common/AudioToggle';
import { TimerControlButton } from '../common/TimerControlButton';
import { GameTimer } from '../board/GameTimer';
import { ScoreDisplay } from '../board/ScoreDisplay';
import { Smartphone, Play, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { GAME_STATUS } from '../../config/gameConfig';

/**
 * Vista Smartphone Controller per i Suggeritori (2 Schermi via QR Code)
 * Permette di gestire il timer con il pulsante centrale e rispondere alla parola.
 */
export function MobileControllerView({ config, roomCode, onBack }) {
  const game = useGameState(config);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 min-h-screen flex flex-col justify-between">
      {/* Controller Header */}
      <header className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
          <Smartphone className="w-4 h-4 text-sky-400" />
          <span>Suggeritori ({roomCode})</span>
        </div>

        <PassIndicator
          remainingPasses={game.passes.remainingPasses}
          totalPasses={game.passes.totalPasses}
        />

        <AudioToggle
          isMuted={game.sounds.isMuted}
          onToggle={game.sounds.toggleMute}
        />
      </header>

      {/* Controller Body */}
      <main className="flex-1 flex flex-col items-center justify-center my-3 space-y-4">
        {game.gameStatus === GAME_STATUS.IDLE && (
          <div className="text-center p-6 bg-slate-900/90 rounded-3xl border border-slate-800 w-full">
            <h3 className="text-xl font-bold text-white mb-2">Controller Pronto</h3>
            <p className="text-xs text-slate-400 mb-6">
              Premi Avvia quando la squadra è pronta al tavolo.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={game.startCountdownAndPlay}
              icon={Play}
              className="w-full font-black"
            >
              AVVIA GIOCO
            </Button>
          </div>
        )}

        {game.gameStatus === GAME_STATUS.PLAYING && (
          <>
            {/* Timer mini + Tasto Stop/Avvia + Punteggio mini */}
            <div className="w-full grid grid-cols-3 gap-2 items-center bg-slate-900/80 border border-slate-800 rounded-2xl p-3 shadow-lg">
              <div className="flex justify-center">
                <GameTimer
                  timeLeft={game.timer.timeLeft}
                  totalTime={config.timerSeconds}
                  isRunning={game.timer.isRunning}
                  compact={true}
                />
              </div>

              <TimerControlButton
                isRunning={game.timer.isRunning}
                onToggle={game.toggleTimer}
              />

              <div className="flex justify-center">
                <ScoreDisplay
                  score={game.score}
                  correctCount={game.correctCount}
                  errorCount={game.errorCount}
                  compact={true}
                />
              </div>
            </div>

            {/* Word Card */}
            <CurrentWordCard
              word={game.currentWord?.word}
              category={game.currentWord?.category}
              difficulty={game.currentWord?.difficulty}
            />

            {/* Quick action pad */}
            <ActionPad
              onCorrect={game.handleCorrect}
              onError={game.handleError}
              onPass={game.handlePass}
              remainingPasses={game.passes.remainingPasses}
            />
          </>
        )}

        {game.gameStatus === GAME_STATUS.FINISHED && (
          <div className="text-center p-6 bg-slate-900/90 rounded-3xl border border-slate-800 w-full">
            <h3 className="text-2xl font-bold text-white mb-2">Round Terminato!</h3>
            <div className="text-5xl font-black text-amber-400 font-mono my-4">
              {game.score} pt
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={game.resetGame}
              icon={RotateCcw}
              className="w-full"
            >
              Prossimo Round
            </Button>
          </div>
        )}
      </main>

      <footer className="text-center text-[10px] text-slate-500 py-1">
        Controller Smartphone • L'Intesa Vincente
      </footer>
    </div>
  );
}
