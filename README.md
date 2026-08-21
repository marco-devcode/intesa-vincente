# 🎯 L'Intesa Vincente (Reazione a Catena Web App)

Un'applicazione web interattiva, moderna e reattiva ispirata al celebre gioco **"L'Intesa Vincente"** del programma televisivo *Reazione a Catena*.

![L'Intesa Vincente](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/trophy.svg)

---

## 🌟 Caratteristiche Principali

- 📱 **Modalità 1 Schermo (Standalone)**: Gioca subito su un unico smartphone, tablet o PC con timer, parola segreta per i suggeritori e pulsanti di convalida.
- 📺📱 **Modalità 2 Schermi (Multi-Device con QR Code)**:
  - **Schermo TV / PC**: Tabellone con timer circolare gigante, punteggi, animazioni e audio da studio TV.
  - **Smartphone Suggeritori**: I due suggeritori inquadrano il **QR Code** per visualizzare la parola segreta e i pulsanti touch sul proprio dispositivo.
- ⏱️ **Timer 60 Secondi con Regole Ufficiali**:
  - **+1 Punto**: Risposta esatta (*Dong trionfale*).
  - **-1 Punto**: Errore (*Buzzer TV*).
  - **Passo (Default: 2)**: Salta una parola difficile (*Swoosh*). Raggiunto lo 0, il pulsante viene bloccato per rispettare il limite consentito.
- 🔊 **Audio Studio TV a Latenza Zero**: Sintesi audio nativa tramite Web Audio API (nessun file esterno pesante).
- ⚙️ **Regole Personalizzabili**: Imposta durata del timer (30s-90s) e numero massimo di passi (0-5 o infiniti).
- 🏆 **Statistiche Finali & Coriandoli**: Riepilogo parole indovinate, errori e passi utilizzati a fine manche.

---

## 🛠️ Stack Tecnologico

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animazioni**: Framer Motion & Canvas Confetti
- **Audio Engine**: Web Audio API Sound Synthesizer
- **QR Code**: QRCode.react
- **Icone**: Lucide React
- **Deploy**: Vercel

---

## 🚀 Installazione ed Esecuzione Locale

### Prerequisiti
- [Node.js](https://nodejs.org/) (versione 18+)

### 1. Clona il repository
```bash
git clone https://github.com/tuo-username/intesa-vincente.git
cd intesa-vincente
```

### 2. Installa le dipendenze
```bash
npm install
```

### 3. Avvia il server di sviluppo
```bash
npm run dev
```
L'applicazione sarà attiva all'indirizzo `http://localhost:3000`.

---

## 🌐 Deploy su Vercel

Puoi effettuare il deploy istantaneo su Vercel collegando il repository GitHub o tramite Vercel CLI:
```bash
npx vercel
```

---

## 📜 Licenza
Distribuito sotto licenza MIT. Ispirato al format televisivo per scopi di intrattenimento tra amici.
