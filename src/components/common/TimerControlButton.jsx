import React from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Pulsante centrale per avviare o fermare il tempo (posizionato tra Timer e Punti Squadra)
 * Dimensionato appositamente per essere facile da premere rapidamente da smartphone.
 */
export function TimerControlButton({
  isRunning,
  onToggle,
  disabled = false,
  className = '',
}) {
  return (
    <div className="flex flex-col items-center justify-center my-auto px-2">
      <motion.button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        whileTap={{ scale: 0.94 }}
        animate={!isRunning ? { scale: [1, 1.04, 1] } : {}}
        transition={!isRunning ? { repeat: Infinity, duration: 1.6 } : {}}
        className={`w-full min-w-[110px] sm:min-w-[140px] py-4 sm:py-5 px-3 sm:px-4 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center gap-1.5 font-black transition-all shadow-xl cursor-pointer border-2 select-none active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
          isRunning
            ? 'bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-amber-300/80 shadow-amber-900/40'
            : 'bg-gradient-to-b from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.5)]'
        } ${className}`}
        aria-label={isRunning ? 'Ferma Tempo' : 'Avvia Tempo'}
      >
        <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-inner ${
          isRunning ? 'bg-amber-700/60 text-slate-950' : 'bg-emerald-700/80 text-white'
        }`}>
          {isRunning ? (
            <Pause className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
          ) : (
            <Play className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] translate-x-0.5" />
          )}
        </div>

        <span className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-center leading-tight">
          {isRunning ? 'FERMA TEMPO' : 'AVVIA TEMPO'}
        </span>
      </motion.button>
    </div>
  );
}
