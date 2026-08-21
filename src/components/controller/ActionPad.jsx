import React from 'react';
import { Check, X, SkipForward, Ban } from 'lucide-react';
import { Button } from '../common/Button';

/**
 * Pulsantiera rapida per convalidare le risposte
 * Gestisce la logica dei passi residui (disabilita se remainingPasses == 0)
 */
export function ActionPad({
  onCorrect,
  onError,
  onPass,
  remainingPasses,
  disabled = false,
}) {
  const canPass = remainingPasses > 0 && !disabled;

  return (
    <div className="w-full max-w-xl mx-auto grid grid-cols-3 gap-3 sm:gap-4 p-2">
      {/* Tasto Errore */}
      <button
        onClick={onError}
        disabled={disabled}
        className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-extrabold shadow-xl shadow-rose-900/40 border-2 border-rose-400/40 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Sbagliata (-1)"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-rose-800/80 flex items-center justify-center mb-2 shadow-inner">
          <X className="w-8 h-8 sm:w-9 sm:h-9 stroke-[3]" />
        </div>
        <span className="text-sm sm:text-base tracking-wide uppercase">Errore</span>
        <span className="text-xs text-rose-200 font-mono mt-0.5">-1 pt</span>
      </button>

      {/* Tasto Passo (con gestione numero passi) */}
      <button
        onClick={onPass}
        disabled={!canPass}
        className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl font-extrabold transition-all border-2 active:scale-95 cursor-pointer ${
          canPass 
            ? 'bg-gradient-to-b from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 shadow-xl shadow-amber-900/40 border-amber-300/60' 
            : 'bg-slate-800/60 border-slate-700/40 text-slate-500 opacity-40 cursor-not-allowed'
        }`}
        aria-label="Passo (-1)"
      >
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2 shadow-inner ${
          canPass ? 'bg-amber-600/60' : 'bg-slate-700'
        }`}>
          {canPass ? (
            <SkipForward className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
          ) : (
            <Ban className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" />
          )}
        </div>
        <span className="text-sm sm:text-base tracking-wide uppercase">Passo</span>
        <span className="text-xs font-mono mt-0.5">
          {canPass ? `(${remainingPasses} rimasti)` : 'Esauriti'}
        </span>
      </button>

      {/* Tasto Indovinata */}
      <button
        onClick={onCorrect}
        disabled={disabled}
        className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold shadow-xl shadow-emerald-900/40 border-2 border-emerald-300/40 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Indovinata (+1)"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-800/80 flex items-center justify-center mb-2 shadow-inner">
          <Check className="w-8 h-8 sm:w-9 sm:h-9 stroke-[3]" />
        </div>
        <span className="text-sm sm:text-base tracking-wide uppercase">Giusta!</span>
        <span className="text-xs text-emerald-200 font-mono mt-0.5">+1 pt</span>
      </button>
    </div>
  );
}
