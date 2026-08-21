# 📋 PROCESS.md - Guida Operativa & Registro di Avanzamento

> ⚠️ **REGOLA CRUCIALE PER OGNI SESSIONE DI CODING**:
> 1. Prima di iniziare a modificare o creare qualsiasi file, **LEGGI SEMPRE** attentamente sia [`progetto.md`](./progetto.md) che questo file [`PROCESS.md`](./PROCESS.md).
> 2. Al termine di ogni sessione di coding, **AGGIORNA SEMPRE** questo file con il riepilogo puntuale delle modifiche apportate nell'ultima sessione, lo stato di avanzamento e i prossimi passi.

---

## 📌 1. Regole di Sviluppo & Standard Architetturali

Tutto il codice del progetto deve rispettare rigorosamente le seguenti linee guida:

1. **Disco & Ambiente**:
   - Qualsiasi nuovo software, runtime, dipendenza o cache deve essere allocato sul disco `D:` (es. `D:\nodejs`, `D:\Git`, `D:\gh`, `d:\HUAWEI\Documents\IntesaVincente`).
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
  - Countdown standard 60s, +1 punto per risposte esatte, -1 per errori. **Passo = 0 punti (nessuna detrazione)**.
  - Cliccando su **+1 / -1 / Passo**, il timer si **ferma automaticamente** per permettere alla squadra di prepararsi.
  - Un pulsante centrale **AVVIA TEMPO / FERMA TEMPO** (grande e touch-friendly) è posizionato tra il timer circolare e il display del punteggio.
- **No Zoom Mobile**:
  - `index.html`: viewport con `user-scalable=no, viewport-fit=cover`.
  - `main.jsx`: blocco via JS di `gesturestart`, `gesturechange`, `gestureend`, `touchmove` multi-touch, doppio-tap zoom.
- **Audio Engine Studio TV (`soundSynthesizer.js`)**:
  - Sintesi audio nativa tramite Web Audio API (jingle 3-2-1, dong risposta esatta, buzzer errore, swoosh passo, ticchettio e sirena tempo scaduto).

---

## 🏗️ 3. Struttura del Codice (Aggiornata e Completata)

```
intesa-vincente/
├── public/
│   └── favicon.ico
├── src/
│   ├── config/
│   │   └── gameConfig.js              # Costanti globali (DEFAULT_MAX_PASSES=2, DEFAULT_TIMER=60, PASS=0)
│   ├── data/
│   │   └── words.json                 # Mazzo iniziale di parole categorizzate
│   ├── components/
│   │   ├── home/
│   │   │   ├── ModeSelector.jsx       # Selezione 1 Schermo (Standalone) vs 2 Schermi (QR Code)
│   │   │   └── HeroHeader.jsx         # Titolo e grafica studio TV
│   │   ├── common/
│   │   │   ├── Button.jsx             # Bottone modulare con varianti cromatiche
│   │   │   ├── Modal.jsx              # Modale generica animata con Framer Motion
│   │   │   ├── PassIndicator.jsx      # Badge visualizzazione passi (2/2 con indicatori)
│   │   │   ├── AudioToggle.jsx        # Switch muto/audio ON
│   │   │   └── TimerControlButton.jsx # Pulsante AVVIA/FERMA TEMPO (grande, touch-friendly)
│   │   ├── standalone/
│   │   │   └── StandaloneGame.jsx     # Schermata integrata completa per 1 Schermo
│   │   ├── board/
│   │   │   ├── GameTimer.jsx          # Countdown circolare SVG (prop compact per mobile)
│   │   │   ├── ScoreDisplay.jsx       # Punteggi animati e statistiche (prop compact per mobile)
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
│   │   ├── useGameState.js            # Stato centrale gioco (punti, parole, round, toggleTimer)
│   │   ├── usePassesManager.js        # Gestione passi residui (default 2)
│   │   └── useSoundEffects.js         # Gestione suoni studio TV
│   ├── utils/
│   │   ├── timeFormatter.js           # Formattazione minuti:secondi e percentuali
│   │   ├── deckManager.js             # Algoritmo Fisher-Yates per mescolamento
│   │   └── soundSynthesizer.js        # Sintesi audio Web Audio API senza file esterni
│   ├── styles/
│   │   └── index.css                  # Tailwind CSS, glow neon e glassmorphism
│   ├── App.jsx                        # Router e state container principale
│   └── main.jsx                       # Entrypoint React + blocco zoom iOS/Android
├── .gitignore
├── index.html
├── progetto.md
├── PROCESS.md
├── README.md
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 📝 4. Registro delle Sessioni (Changelog)

### Sessione 4 (Timer Stop Automatico, Pulsante Centrale, No Zoom Mobile)
- **Data**: 2026-08-21
- **Cosa è stato fatto**:
  1. **`gameConfig.js`**: `POINTS_CONFIG.PASS = 0` — il Passo non sottrae più punti.
  2. **`useGameState.js`**: In `handleCorrect`, `handleError`, `handlePass` aggiunto `timer.pauseTimer()` — il timer si ferma automaticamente ad ogni parola. Esposta funzione `toggleTimer`.
  3. **`TimerControlButton.jsx`** [NUOVO]: Pulsante grande touch-friendly AVVIA/FERMA TEMPO, con animazione pulsante quando in pausa.
  4. **`StandaloneGame.jsx`**: Layout a griglia 3 colonne (Timer | TimerControlButton | Score) in stato PLAYING.
  5. **`TvBoardView.jsx`**: Stessa griglia 3 colonne per la vista Tabellone TV.
  6. **`MobileControllerView.jsx`**: Aggiunta barra Timer mini + TimerControlButton + Score mini in stato PLAYING.
  7. **`GameTimer.jsx`**: Aggiunta prop `compact` per ridurre le dimensioni nel controller mobile.
  8. **`ScoreDisplay.jsx`**: Aggiunta prop `compact` per testo ridotto nel controller mobile.
  9. **`index.html`**: Viewport meta aggiornata con `user-scalable=no, viewport-fit=cover`.
  10. **`main.jsx`**: Blocco JS di pinch-to-zoom (gesturestart/change/end), touchmove multi-touch e double-tap zoom per iOS/Android.
  11. **Build verificata** ✅ — 0 errori, 2247 moduli.
  12. **Push su GitHub** effettuato.

### Sessione 3 (Autenticazione GitHub CLI & Push su Remote Main)
- **Data**: 2026-08-21
- **Cosa è stato fatto**:
  1. Configurato **GitHub CLI (`gh.exe`)** su disco `D:\gh`.
  2. Autenticato con successo l'account `marco-devcode` via GitHub Device Flow.
  3. Effettuato il **push completo** del branch `main` su [`https://github.com/marco-devcode/intesa-vincente`](https://github.com/marco-devcode/intesa-vincente).

### Sessione 2 (Preparazione Repository Git & Deploy Vercel / GitHub)
- **Data**: 2026-08-21
- **Cosa è stato fatto**:
  1. Configurato **Git per Windows (v2.47.1)** su disco `D:\Git` e aggiunto al PATH.
  2. Creato `.gitignore` e `README.md`.
  3. Inizializzato repository locale e completato il primo commit.

### Sessione 1 (Inizializzazione Progetto, Architettura & Implementazione Completa)
- **Data**: 2026-08-21
- **Cosa è stato fatto**:
  1. Setup ambiente Node.js v22 LTS e npm su `D:\nodejs`, cache su `D:\npm-cache`.
  2. Inizializzato progetto Vite + React + Tailwind CSS con icone, suoni e animazioni.
  3. Implementate modalità 1 Schermo (Standalone) e 2 Schermi (QR Code), gestione dei 2 passi e sintetizzatore audio studio TV.

---

## 🎯 5. Prossimi Passi (Next Steps)

1. [x] Codice sincronizzato e pubblicato su GitHub ([`marco-devcode/intesa-vincente`](https://github.com/marco-devcode/intesa-vincente)).
2. [ ] Effettuare il deploy live su Vercel importando il repository da [`vercel.com/new`](https://vercel.com/new).
