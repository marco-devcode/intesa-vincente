import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Scheda della parola segreta per i suggeritori
 */
export function CurrentWordCard({ word, difficulty, isWaitingForNextWord }) {
  const [isCovered, setIsCovered] = useState(false);

  if (!word) return null;

  return (
    <div className="relative w-full max-w-lg mx-auto bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-blue-400/50 rounded-3xl p-6 shadow-2xl overflow-hidden">
      {/* Categoria/Istruzione */}
      <div className="flex items-center justify-between mb-3 min-h-[32px]">
        {isWaitingForNextWord ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-500/45 px-3 py-1 rounded-full animate-pulse">
            avvia il tempo per mostrare la nuova parola
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-300 bg-sky-950/80 border border-sky-400/40 px-3 py-1 rounded-full">
            In Gioco
          </span>
        )}

        <button
          onClick={() => setIsCovered((prev) => !prev)}
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          title="Nascondi parola temporaneamente"
        >
          {isCovered ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>{isCovered ? 'Mostra' : 'Copri'}</span>
        </button>
      </div>

      {/* Secret Word */}
      <div className="py-6 sm:py-8 text-center min-h-[110px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isCovered ? (
            <motion.div
              key="covered"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-2xl font-bold text-slate-500 italic"
            >
              [Parola Nascosta]
            </motion.div>
          ) : (
            <motion.div
              key={word}
              initial={{ opacity: 0, scale: 0.85, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -5 }}
              className="text-4xl sm:text-5xl font-black text-amber-300 tracking-wider uppercase drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]"
            >
              {word}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center text-xs text-slate-400 border-t border-slate-700/60 pt-3">
        🗣️ I due suggeritori dicono una sola parola a testa alternandosi!
      </div>
    </div>
  );
}
