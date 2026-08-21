import React from 'react';
import { motion } from 'framer-motion';
import { formatTime, calculateTimePercentage } from '../../utils/timeFormatter';

/**
 * Visualizzazione Timer Circolare ad alto impatto grafico
 */
export function GameTimer({ timeLeft, totalTime = 60, isRunning }) {
  const percentage = calculateTimePercentage(timeLeft, totalTime);
  const isUrgent = timeLeft <= 10 && timeLeft > 0;
  
  // Calcolo perimetro SVG per barra circolare
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* SVG Circular Progress */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className="stroke-slate-800/80"
            strokeWidth="12"
            fill="transparent"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            className={`transition-all duration-300 ${
              isUrgent ? 'stroke-rose-500' : 'stroke-amber-400'
            }`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: isUrgent 
                ? 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.8))' 
                : 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.6))',
            }}
          />
        </svg>

        {/* Cifre Countdown al centro */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={timeLeft}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            className={`font-mono text-5xl sm:text-6xl font-black tracking-tighter ${
              isUrgent 
                ? 'text-rose-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' 
                : 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]'
            }`}
          >
            {formatTime(timeLeft)}
          </motion.span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
            Secondi
          </span>
        </div>
      </div>
    </div>
  );
}
