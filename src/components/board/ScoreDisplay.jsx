import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, XCircle } from 'lucide-react';

/**
 * Display del punteggio con badge delle risposte esatte ed errori.
 * La prop `compact` riduce il testo per la vista controller mobile.
 */
export function ScoreDisplay({ score, correctCount, errorCount, teamName = 'Squadra', compact = false }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
        compact ? 'text-[10px]' : 'text-xs sm:text-sm'
      }`}>
        <Trophy className={`text-amber-400 ${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
        {!compact && <span>Punti {teamName}</span>}
      </div>

      <motion.div
        key={score}
        initial={{ scale: 1.3, y: -5 }}
        animate={{ scale: 1, y: 0 }}
        className={`font-black text-amber-400 font-mono tracking-tight drop-shadow-[0_0_20px_rgba(245,158,11,0.5)] ${
          compact ? 'text-3xl' : 'text-6xl sm:text-7xl'
        }`}
      >
        {score}
      </motion.div>

      {/* Mini counter corrette ed errori */}
      <div className={`flex items-center gap-3 mt-1 ${compact ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>
        <span className="flex items-center gap-0.5 text-emerald-400 font-bold">
          <CheckCircle2 className={compact ? 'w-3 h-3' : 'w-4 h-4'} />
          {correctCount}
        </span>
        <span className="flex items-center gap-0.5 text-rose-400 font-bold">
          <XCircle className={compact ? 'w-3 h-3' : 'w-4 h-4'} />
          {errorCount}
        </span>
      </div>
    </div>
  );
}
