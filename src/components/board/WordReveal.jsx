import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Visualizzazione della parola svelata (sul tabellone principale o in post-partita)
 */
export function WordReveal({ word, isVisible = true, isWaitingForNextWord = false }) {
  if (!word) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      {/* Notifica di avvio tempo */}
      <div className="min-h-[32px] mb-2 flex items-center justify-center">
        {isWaitingForNextWord && (
          <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-950/80 border border-amber-500/40 px-4 py-1.5 rounded-full animate-pulse">
            avvia il tempo per mostrare la nuova parola
          </span>
        )}
      </div>

      <div className="w-full max-w-xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/80 border-2 border-blue-400/40 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_40px_rgba(59,130,246,0.3)]">
        <AnimatePresence mode="wait">
          {isVisible ? (
            <motion.div
              key={word}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-3xl sm:text-5xl font-black text-white tracking-wider uppercase drop-shadow-md"
            >
              {word}
            </motion.div>
          ) : (
            <motion.div
              key="hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl sm:text-4xl font-bold text-slate-500 italic"
            >
              •••••••••••••
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
