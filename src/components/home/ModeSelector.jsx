import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Tv, QrCode, Play, Users, Sparkles, Settings } from 'lucide-react';
import { Button } from '../common/Button';

/**
 * Schermata di selezione iniziale della modalità di gioco
 */
export function ModeSelector({ onSelectMode, onOpenSettings }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-8">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Come vuoi giocare?
        </h2>
        <p className="text-slate-400 text-sm">
          Scegli la modalità più adatta al tuo gruppo di amici
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Standalone (1 Schermo) */}
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative group rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-800/90 via-game-card/90 to-slate-950 border-2 border-blue-500/30 hover:border-blue-400 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all cursor-pointer flex flex-col justify-between"
          onClick={() => onSelectMode('standalone')}
        >
          <div className="absolute top-4 right-4 bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs px-3 py-1 rounded-full font-semibold">
            Più Rapido
          </div>

          <div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30">
              <Smartphone className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              Gioca con 1 Schermo
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Ideale per giocare subito con un solo telefono, tablet o PC. Il timer, la parola segreta e i tasti di convalida sono tutti sullo stesso display.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> Nessuna configurazione o connessione richiesta
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> Gestione rapida dei 2 passi e del punteggio
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> Funzione privacy per nascondere la parola
              </li>
            </ul>
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            icon={Play}
          >
            Avvia Partita Singola
          </Button>
        </motion.div>

        {/* Card 2: Multi-Screen (2 Schermi / QR Code) */}
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative group rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-indigo-950/80 via-game-card/90 to-slate-950 border-2 border-indigo-500/30 hover:border-indigo-400 shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all cursor-pointer flex flex-col justify-between"
          onClick={() => onSelectMode('multi_screen')}
        >
          <div className="absolute top-4 right-4 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Esperienza TV
          </div>

          <div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/30">
              <div className="relative">
                <Tv className="w-8 h-8" />
                <QrCode className="w-4 h-4 absolute -bottom-1 -right-1 text-amber-300" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              Gioca con 2 Schermi
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Proietta il <strong>Tabellone TV</strong> sul computer o Smart TV e connetti gli smartphone dei suggeritori inquadrando il <strong>QR Code</strong>.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span> Schermo TV con timer gigante e suoni studio
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span> Smartphone dedicati per i 2 suggeritori
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span> Accesso istantaneo senza login
              </li>
            </ul>
          </div>

          <Button 
            variant="pass" 
            size="lg" 
            className="w-full text-slate-950 font-black"
            icon={QrCode}
          >
            Crea Stanza & QR Code
          </Button>
        </motion.div>
      </div>

      {/* Settings bar at bottom */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onOpenSettings}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 text-sm transition-all"
        >
          <Settings className="w-4 h-4" />
          <span>Personalizza Regole (Timer & Numero Passi)</span>
        </button>
      </div>
    </div>
  );
}
