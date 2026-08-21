import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Pulsante per attivare/disattivare gli effetti sonori
 */
export function AudioToggle({ isMuted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-md transition-all shadow-md active:scale-95"
      title={isMuted ? 'Attiva Audio' : 'Disattiva Audio'}
      aria-label="Toggle Audio"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-rose-400" />
      ) : (
        <Volume2 className="w-5 h-5 text-emerald-400" />
      )}
    </button>
  );
}
