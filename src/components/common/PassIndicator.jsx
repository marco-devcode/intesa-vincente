import React from 'react';
import { motion } from 'framer-motion';
import { SkipForward, ShieldAlert } from 'lucide-react';

/**
 * Visualizzazione grafica dei Passi disponibili e consumati (es. 2/2)
 * 
 * @param {Object} props
 * @param {number} props.remainingPasses - Passi rimanenti
 * @param {number} props.totalPasses - Passi totali iniziali (default 2)
 */
export function PassIndicator({ remainingPasses, totalPasses = 2, size = 'md' }) {
  const dots = Array.from({ length: totalPasses }, (_, index) => {
    const isAvailable = index < remainingPasses;
    return isAvailable;
  });

  return (
    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
        <SkipForward className="w-4 h-4 text-amber-400" />
        <span>Passi:</span>
      </div>

      <div className="flex items-center gap-1.5">
        {dots.map((isAvailable, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: isAvailable ? 1 : 0.85,
              opacity: isAvailable ? 1 : 0.25,
            }}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              isAvailable 
                ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]' 
                : 'bg-slate-600 border border-slate-500/50'
            }`}
          />
        ))}
      </div>

      <span className={`font-mono font-bold text-xs sm:text-sm ${remainingPasses > 0 ? 'text-amber-300' : 'text-slate-500'}`}>
        ({remainingPasses}/{totalPasses})
      </span>

      {remainingPasses === 0 && (
        <span className="text-rose-400 text-xs font-semibold flex items-center gap-0.5 ml-1">
          <ShieldAlert className="w-3.5 h-3.5" /> Esauriti
        </span>
      )}
    </div>
  );
}
