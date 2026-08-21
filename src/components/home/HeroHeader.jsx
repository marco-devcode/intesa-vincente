import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function HeroHeader() {
  return (
    <header className="text-center py-6 sm:py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-400/40 text-blue-300 text-xs sm:text-sm font-semibold mb-3 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
      >
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>REAZIONE A CATENA PARTY GAME</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
      >
        <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300 bg-clip-text text-transparent drop-shadow-sm">
          L'INTESA VINCENTE
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-3 text-slate-300 max-w-xl mx-auto text-sm sm:text-base"
      >
        Due suggeritori, una parola a testa e un risponditore: indovinate più parole possibili in 60 secondi!
      </motion.p>
    </header>
  );
}
