import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// ─── Disabilita zoom tramite pinch e doppio tap su iOS/Android ───────────────

// Blocca pinch-to-zoom e altri gesture che zoomano (Safari iOS)
document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
document.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false });
document.addEventListener('gestureend', (e) => e.preventDefault(), { passive: false });

// Blocca touch multi-touch che causa pinch-to-zoom
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

// Blocca doppio-tap zoom: se due tap avvengono in meno di 300ms, previeni
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd < 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, { passive: false });

// ─────────────────────────────────────────────────────────────────────────────

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
