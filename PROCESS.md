# 📋 PROCESS.md - Guida Operativa & Registro di Avanzamento

> ⚠️ **REGOLA CRUCIALE PER OGNI SESSIONE DI CODING**:
> 1. Prima di iniziare a modificare o creare qualsiasi file, **LEGGI SEMPRE** attentamente sia [`progetto.md`](./progetto.md) che questo file [`PROCESS.md`](./PROCESS.md).
> 2. Al termine di ogni sessione di coding, **AGGIORNA SEMPRE** questo file con il riepilogo puntuale delle modifiche apportate nell'ultima sessione, lo stato di avanzamento e i prossimi passi.

---

## 📌 1. Regole di Sviluppo & Standard Architetturali

Tutto il codice del progetto deve rispettare rigorosamente le seguenti linee guida:

1. **Disco & Ambiente**:
   - Qualsiasi nuovo software, runtime, dipendenza o cache deve essere allocato sul disco `D:` (es. `D:\nodejs`, `d:\HUAWEI\Documents\IntesaVincente`).
2. **Modularità & Principio DRY (Don't Repeat Yourself)**:
   - Non duplicare mai logica di calcolo, gestione timer, audio o formattazione.
   - Logica ripetuta ➡️ estrarre in **funzioni pure** (`src/utils/`) o in **custom hook** (`src/hooks/`).
   - Componenti UI ➡️ separare in componenti atomici con responsabilità singola (`src/components/common/`, `src/components/home/`, `src/components/board/`, `src/components/controller/`, `src/components/lobby/`, `src/components/standalone/`).
3. **Convenzione di Nomenclatura Unificata**:
   - **Variabili & Funzioni**: `camelCase` (es. `remainingPasses`, `handleCorrectAnswer`, `currentWord`, `formatTime`).
   - **Componenti React**: `PascalCase` (es. `ModeSelector`, `GameTimer`, `PassIndicator`, `ActionPad`, `StandaloneGame`).
   - **Costanti Globali**: `UPPER_SNAKE_CASE` (es. `DEFAULT_TIMER_SECONDS`, `DEFAULT_MAX_PASSES`, `GAME_MODES`).
   - **Custom Hooks**: Prefisso `use` in `camelCase` (es. `useGameTimer`, `useGameState`, `usePassesManager`, `useSoundEffects`).
4. **Verifica & Pulizia Post-Sviluppo**:
   - Controllare sempre il codice al termine della scrittura.
   - Verificare che ogni timer (`setInterval`), animazione o listener venga correttamente ripulito nella funzione di cleanup di `useEffect`.

---

## 🎮 2. Specifiche Core Implementate

- **Scelta Iniziale Modalità (`ModeSelector.jsx`)**:
  - 📱 **Modalità 1 Schermo (Standalone)**: Schermata integrata timer + parola segreta + tasti rapidi per giocare subito da un solo dispositivo.
  - 📺📱 **Modalità 2 o Più Schermi (Multi-Device QR Code)**: Tabellone TV su schermo 1 con QR Code, smartphone dei suggeritori collegati via URL/parametro `?room=XYZ&role=suggester`.
- **Gestione "Passo" (Default: 2)**:
  - 2 passi disponibili per turno, visualizzati con badge visivo interattivo (`PassIndicator.jsx`).
  - Blocco automatico del tasto Passo al raggiungimento di `0` passi residui.
- **Timer & Regole**:
  - Countdown standard 60s, +1 punto per risposte esatte, -1 per errori e passi.
- **Audio Engine Studio TV (`soundSynthesizer.js`)**:
  - Sintesi audio istantanea a latenza zero tramite Web Audio API (jingle 3-2-1, dong risposta esatta, buzzer errore, swoosh passo, ticchettio e sirena tempo scaduto).

---

## 🏗️ 3. Struttura del Codice (Aggiornata e Completata)

```
intesa-vincente/
├── public/
│   └── favicon.ico
├── src/
│   ├── config/
│   │   └── gameConfig.js              # Costanti globali (DEFAULT_MAX_PASSES=2, DEFAULT_TIMER=60)
│   ├── data/
│   │   └── words.json                 # Mazzo iniziale di parole categorizzate (Cibo, Mestieri, Oggetti, ecc.)
│   ├── components/
│   │   ├── home/
│   │   │   ├── ModeSelector.jsx       # Selezione 1 Schermo (Standalone) vs 2 Schermi (QR Code)
│   │   │   └── HeroHeader.jsx         # Titolo e grafica studio TV
│   │   ├── common/
│   │   │   ├── Button.jsx             # Bottone modulare con varianti cromatiche
│   │   │   ├── Modal.jsx              # Modale generica animata con Framer Motion
│   │   │   ├── PassIndicator.jsx      # Badge visualizzazione passi (2/2 con indicatori)
│   │   │   └── AudioToggle.jsx        # Switch muto/audio ON
│   │   ├── standalone/
│   │   │   └── StandaloneGame.jsx     # Schermata integrata completa per 1 Schermo
│   │   ├── board/
│   │   │   ├── GameTimer.jsx          # Countdown circolare SVG con glow di studio
│   │   │   ├── ScoreDisplay.jsx       # Punteggi animati e statistiche
│   │   │   ├── WordReveal.jsx         # Parola mostrata sul tabellone
│   │   │   └── TvBoardView.jsx        # Vista completa Tabellone TV per 2 Schermi
│   │   ├── controller/
│   │   │   ├── CurrentWordCard.jsx    # Scheda parola segreta con toggle privacy
│   │   │   ├── ActionPad.jsx          # Tasti Giusta, Errore, Passo (con blocco a 0 passi)
│   │   │   └── MobileControllerView.jsx # Vista Controller Smartphone Suggeritori
│   │   └── lobby/
│   │       ├── QrCodeDisplay.jsx      # Generatore QR Code per abbinamento rapido
│   │       └── SettingsForm.jsx       # Modale impostazioni durata e max passi
│   ├── hooks/
│   │   ├── useGameTimer.js            # Countdown con pulizia intervalli
│   │   ├── useGameState.js            # Stato centrale gioco (punti, parole, round)
│   │   ├── usePassesManager.js        # Gestione passi residui (default 2)
│   │   └── useSoundEffects.js         # Gestione suoni studio TV
│   ├── utils/
│   │   ├── timeFormatter.js           # Formattazione minuti:secondi e percentuali
│   │   ├── deckManager.js             # Algoritmo Fisher-Yates per mescolamento
│   │   └── soundSynthesizer.js        # Sintesi audio Web Audio API senza file esterni
│   ├── styles/
│   │   └── index.css                  # Tailwind CSS, glow neon e glassmorphism
│   ├── App.jsx                        # Router e state container principale
│   └── main.jsx                       # Entrypoint React
├── index.html
├── progetto.md
├── PROCESS.md
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 📝 4. Registro delle Sessioni (Changelog)

### Sessione 1 (Inizializzazione Progetto, Architettura & Implementazione Completa)
- **Data**: 2026-08-21
- **Cosa è stato fatto**:
  1. **Configurazione Ambiente su Disco `D:`**:
     - Scaricato e configurato Node.js v22.14.0 LTS portatile su `D:\nodejs`.
     - Impostata la cache di npm su `D:\npm-cache` per non occupare spazio sul disco `C:`.
     - Aggiunto `D:\nodejs` al PATH di sistema.
  2. **Creazione Progetto & Setup Dipendenze**:
     - Inizializzato progetto Vite + React + Tailwind CSS.
     - Installate librerie: `lucide-react`, `framer-motion`, `qrcode.react`, `canvas-confetti`, `clsx`, `tailwind-merge`.
  3. **Implementazione Specifiche & Regole**:
     - Creata la schermata iniziale `ModeSelector` per scegliere tra **1 Schermo (Standalone)** e **2 Schermi (QR Code)**.
     - Creata la logica per il numero di **Passi (default 2)** con `usePassesManager.js`, `PassIndicator.jsx` e disabilitazione automatica a 0 passi in `ActionPad.jsx`.
     - Implementato `soundSynthesizer.js` per riprodurre suoni televisivi realistici (chime corretto, buzzer grave, scivolamento passo, countdown tick, sirena fine round) a zero latenza.
     - Creata la vista completa **1 Schermo (`StandaloneGame.jsx`)** con timer circolare, parola segreta con privacy toggle, pulsantiera touch e schermata finale con statistiche e coriandoli.
     - Creata la vista **2 Schermi (`TvBoardView.jsx`, `QrCodeDisplay.jsx`, `MobileControllerView.jsx`)** con generazione automatica del QR Code e routing automatico via URL query parameter.
     - Creata la modale impostazioni per personalizzare timer (30s-90s) e passi (0-5 o infiniti).
     - Verificato il build e l'assenza di errori di compilazione.

---

## 🎯 5. Prossimi Passi (Next Steps)

1. [ ] Avviare il server di sviluppo locale (`npm run dev`) per testare in anteprima l'interfaccia nel browser.
2. [ ] Aggiungere eventuali categorie tematiche supplementari o editor mazzi personalizzati.
3. [ ] Aggiungere supporto opzionale a WebSockets per sincronizzazione remota via internet su reti diverse.
