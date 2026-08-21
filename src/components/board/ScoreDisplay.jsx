import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, XCircle } from 'lucide-react';

/**
 * Display del punteggio con badge delle risposte esatte ed errori
 */
export function ScoreDisplay({ score, correctCount, errorCount, teamName = 'Squadra' }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
        <Trophy className="w-4 h-4 text-amber-400" />
        <span>Punti {teamName}</span>
      </div>

      <motion.div
        key={score}
        initial={{ scale: 1.3, y: -5 }}
        animate={{ scale: 1, y: 0 }}
        className="text-6xl sm:text-7xl font-black text-amber-400 font-mono tracking-tight drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
      >
        {score}
      </motion.div>

      {/* Mini counter corrette ed errori */}
      <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm">
        <span className="flex items-center gap-1 text-emerald-400 font-bold">
          <CheckCircle2 className="w-4 h-4" /> {correctCount} esatte
        </span>
        <span className="flex items-center gap-1 text-rose-400 font-bold">
          <XCircle className="w-4 h-4" /> {errorCount} errori
        </span>
      </div>
    </div>
  );
}
