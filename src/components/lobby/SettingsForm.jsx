import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Clock, SkipForward, Check } from 'lucide-react';

/**
 * Modale impostazioni per personalizzare durata timer e numero passi
 */
export function SettingsForm({
  currentTimer = 60,
  currentPasses = 2,
  onSave,
  onCancel,
}) {
  const [timerSeconds, setTimerSeconds] = useState(currentTimer);
  const [maxPasses, setMaxPasses] = useState(currentPasses);

  const timerOptions = [30, 45, 60, 75, 90];
  const passOptions = [0, 1, 2, 3, 5];

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ timerSeconds, maxPasses });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Durata Timer */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>Durata del Round (Secondi)</span>
        </label>
        <div className="grid grid-cols-5 gap-2">
          {timerOptions.map((seconds) => (
            <button
              key={seconds}
              type="button"
              onClick={() => setTimerSeconds(seconds)}
              className={`py-2 rounded-xl text-sm font-bold transition-all ${
                timerSeconds === seconds
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 border border-blue-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {seconds}s
            </button>
          ))}
        </div>
      </div>

      {/* Numero Passi */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">
          <SkipForward className="w-4 h-4 text-amber-400" />
          <span>Numero di Passi Disponibili (Default: 2)</span>
        </label>
        <div className="grid grid-cols-5 gap-2">
          {passOptions.map((passes) => (
            <button
              key={passes}
              type="button"
              onClick={() => setMaxPasses(passes)}
              className={`py-2 rounded-xl text-sm font-bold transition-all ${
                maxPasses === passes
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 border border-amber-300 font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {passes === 0 ? '0 (Nessuno)' : passes}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-2">
          I passi consentono di saltare una parola difficile. Raggiunto lo 0, il pulsante Passo verrà disabilitato.
        </p>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Annulla
        </Button>
        <Button variant="primary" type="submit" icon={Check}>
          Salva Impostazioni
        </Button>
      </div>
    </form>
  );
}
