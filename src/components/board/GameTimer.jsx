import React from 'react';
import { motion } from 'framer-motion';
import { formatTime, calculateTimePercentage } from '../../utils/timeFormatter';

/**
 * Visualizzazione Timer Circolare ad alto impatto grafico.
 * Utilizza un viewBox SVG relativo per scalare fluidamente su qualsiasi schermo
 * senza mai sbordare o sovrapporsi.
 */
export function GameTimer({ timeLeft, totalTime = 60, isRunning, compact = false }) {
  const percentage = calculateTimePercentage(timeLeft, totalTime);
  const isUrgent = timeLeft <= 10 && timeLeft > 0;

  // Utilizziamo un raggio fisso nel viewbox 100x100. L'SVG scalerà fluidamente.
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.327
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center w-full aspect-square">
      <div 
        className={`relative flex items-center justify-center w-full h-full ${
          compact 
            ? 'max-w-[85px] max-h-[85px] sm:max-w-[96px] sm:max-h-[96px]' 
            : 'max-w-[130px] max-h-[130px] sm:max-w-[200px] sm:max-h-[200px] md:max-w-[224px] md:max-h-[224px]'
        }`}
      >
        {/* SVG Circular Progress fluido */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full transform -rotate-90 select-none"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-slate-800/80"
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            className={`transition-all duration-300 ${
              isUrgent ? 'stroke-rose-500' : 'stroke-amber-400'
            }`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: isUrgent
                ? 'drop-shadow(0 0 4px rgba(239, 68, 68, 0.8))'
                : 'drop-shadow(0 0 3px rgba(245, 158, 11, 0.6))',
            }}
          />
        </svg>

        {/* Cifre Countdown al centro */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
          <motion.span
            key={timeLeft}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className={`font-mono font-black tracking-tighter leading-none ${
              isUrgent
                ? 'text-rose-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                : 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]'
            } ${
              compact 
                ? 'text-lg sm:text-xl md:text-2xl' 
                : 'text-2xl xs:text-3xl sm:text-5xl md:text-6xl'
            }`}
          >
            {formatTime(timeLeft)}
          </motion.span>
          {!compact && (
            <span className="text-[8px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-0.5 sm:mt-1 scale-90 sm:scale-100">
              Sec
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
export default GameTimer;
