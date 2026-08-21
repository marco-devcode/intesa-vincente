import React, { useState, useEffect } from 'react';
import { HeroHeader } from './components/home/HeroHeader';
import { ModeSelector } from './components/home/ModeSelector';
import { StandaloneGame } from './components/standalone/StandaloneGame';
import { QrCodeDisplay } from './components/lobby/QrCodeDisplay';
import { TvBoardView } from './components/board/TvBoardView';
import { MobileControllerView } from './components/controller/MobileControllerView';
import { Modal } from './components/common/Modal';
import { SettingsForm } from './components/lobby/SettingsForm';
import { DEFAULT_TIMER_SECONDS, DEFAULT_MAX_PASSES } from './config/gameConfig';

export function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'standalone' | 'qr_lobby' | 'tv_board' | 'mobile_controller'
  const [roomCode, setRoomCode] = useState('INT8');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Impostazioni di gioco personalizzabili (default: 60s timer, 2 passi)
  const [gameConfig, setGameConfig] = useState({
    timerSeconds: DEFAULT_TIMER_SECONDS,
    maxPasses: DEFAULT_MAX_PASSES,
  });

  // Rilevamento automatico se un utente entra tramite link / QR code dello smartphone
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    const roleParam = params.get('role');

    if (roomParam) {
      setRoomCode(roomParam.toUpperCase());
      if (roleParam === 'player') {
        setCurrentView('mobile_controller');
      }
    }
  }, []);

  const handleSelectMode = (mode) => {
    if (mode === 'standalone') {
      setCurrentView('standalone');
    } else if (mode === 'multi_screen') {
      // Generazione codice stanza casuale a 4 caratteri (es. REA7)
      const randomCode = 'INT' + Math.floor(10 + Math.random() * 90);
      setRoomCode(randomCode);
      setCurrentView('qr_lobby');
    }
  };

  const handleSaveSettings = (newSettings) => {
    setGameConfig(newSettings);
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-game-bg text-white flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* VISTA 1: HOME (Selezione Modalità) */}
      {currentView === 'home' && (
        <div className="flex-1 flex flex-col justify-between">
          <HeroHeader />
          <ModeSelector
            onSelectMode={handleSelectMode}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
          <footer className="text-center text-xs text-slate-500 py-6">
            L'Intesa Vincente • Party Game Web App
          </footer>
        </div>
      )}

      {/* VISTA 2: STANDALONE (1 Schermo - Tutto in uno) */}
      {currentView === 'standalone' && (
        <StandaloneGame
          config={gameConfig}
          onBack={() => setCurrentView('home')}
        />
      )}

      {/* VISTA 3: LOBBY QR CODE (Schermo 1: Attesa connessione) */}
      {currentView === 'qr_lobby' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <QrCodeDisplay
            roomCode={roomCode}
            onStartMatch={() => setCurrentView('tv_board')}
            onBack={() => setCurrentView('home')}
          />
        </div>
      )}

      {/* VISTA 4: TABELLONE TV (Schermo 1 in gioco) */}
      {currentView === 'tv_board' && (
        <TvBoardView
          config={gameConfig}
          roomCode={roomCode}
          onBack={() => setCurrentView('home')}
        />
      )}

      {/* VISTA 5: CONTROLLER SMARTPHONE SUGGERITORI (Schermo 2) */}
      {currentView === 'mobile_controller' && (
        <MobileControllerView
          config={gameConfig}
          roomCode={roomCode}
          onBack={() => {
            window.history.replaceState({}, '', window.location.pathname);
            setCurrentView('home');
          }}
        />
      )}

      {/* Modale Impostazioni */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Impostazioni di Gioco"
      >
        <SettingsForm
          currentTimer={gameConfig.timerSeconds}
          currentPasses={gameConfig.maxPasses}
          onSave={handleSaveSettings}
          onCancel={() => setIsSettingsOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;
