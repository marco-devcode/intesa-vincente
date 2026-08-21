import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, Copy, Check, Users, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

/**
 * Componente per mostrare il QR Code della stanza per connettere gli smartphone
 */
export function QrCodeDisplay({ roomCode = 'CAT8', onStartMatch, onBack }) {
  const [copied, setCopied] = React.useState(false);
  
  // URL generato per il controller mobile
  const roomUrl = `${window.location.origin}${window.location.pathname}?room=${roomCode}&role=suggester`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-b from-slate-900 via-game-card to-slate-950 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950 border border-indigo-400/40 text-indigo-300 text-xs font-bold uppercase mb-4">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Stanza Multi-Schermo Creata</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
        Inquadra con lo Smartphone
      </h2>
      
      <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
        I due suggeritori devono scansionare questo QR Code per visualizzare le parole segrete sul proprio telefono.
      </p>

      {/* QR Code Container */}
      <div className="inline-block p-4 sm:p-6 bg-white rounded-3xl shadow-2xl shadow-indigo-500/20 mb-6 border-4 border-amber-400">
        <QRCodeSVG
          value={roomUrl}
          size={200}
          level="H"
          includeMargin={false}
        />
      </div>

      {/* Codice Stanza */}
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
          Codice Stanza
        </div>
        <div className="inline-block font-mono text-3xl sm:text-4xl font-black text-amber-400 bg-slate-900 border border-slate-700 px-6 py-2 rounded-2xl tracking-widest shadow-inner">
          {roomCode}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="secondary"
          onClick={handleCopyLink}
          icon={copied ? Check : Copy}
          className="w-full sm:w-auto"
        >
          {copied ? 'Link Copiato!' : 'Copia Link Stanza'}
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={onStartMatch}
          icon={Smartphone}
          className="w-full sm:w-auto font-black"
        >
          Avvia Round dal Tabellone
        </Button>
      </div>

      <div className="mt-6">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
        >
          ← Torna alla selezione modalità
        </button>
      </div>
    </div>
  );
}
