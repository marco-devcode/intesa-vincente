import { useState, useCallback, useMemo } from 'react';
import initialWords from '../data/words.json';
import { shuffleDeck } from '../utils/deckManager';
import { useGameTimer } from './useGameTimer';
import { usePassesManager } from './usePassesManager';
import { useSoundEffects } from './useSoundEffects';
import { 
  DEFAULT_TIMER_SECONDS, 
  DEFAULT_MAX_PASSES, 
  POINTS_CONFIG, 
  GAME_STATUS 
} from '../config/gameConfig';

/**
 * Custom hook per lo stato centrale della partita di "L'Intesa Vincente"
 */
export function useGameState(config = {}) {
  const {
    timerSeconds = DEFAULT_TIMER_SECONDS,
    maxPasses = DEFAULT_MAX_PASSES,
  } = config;

  const [gameStatus, setGameStatus] = useState(GAME_STATUS.IDLE);
  const [deck, setDeck] = useState(() => shuffleDeck(initialWords));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isWaitingForNextWord, setIsWaitingForNextWord] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [countdownNumber, setCountdownNumber] = useState(null);

  const sounds = useSoundEffects();
  const passes = usePassesManager(maxPasses);

  const currentWord = useMemo(() => {
    if (!deck || deck.length === 0) return null;
    return deck[currentWordIndex % deck.length];
  }, [deck, currentWordIndex]);

  const handleTimeout = useCallback(() => {
    setGameStatus(GAME_STATUS.FINISHED);
    sounds.playTimeout();
  }, [sounds]);

  const handleTick = useCallback((secondsLeft) => {
    if (secondsLeft <= 5 && secondsLeft > 0) {
      sounds.playTick();
    }
  }, [sounds]);

  const timer = useGameTimer({
    initialDuration: timerSeconds,
    onTimeout: handleTimeout,
    onTick: handleTick,
  });

  const startCountdownAndPlay = useCallback(() => {
    setGameStatus(GAME_STATUS.COUNTDOWN);
    setCountdownNumber(3);
    sounds.playTick();

    const countInterval = setInterval(() => {
      setCountdownNumber((prev) => {
        if (prev === 3) {
          sounds.playTick();
          return 2;
        }
        if (prev === 2) {
          sounds.playTick();
          return 1;
        }
        clearInterval(countInterval);
        sounds.playStart();
        setCountdownNumber(null);
        setGameStatus(GAME_STATUS.PLAYING);
        setIsWaitingForNextWord(false); // Nuova parola pronta all'inizio
        timer.startTimer();
        return null;
      });
    }, 900);
  }, [sounds, timer]);

  const toggleTimer = useCallback(() => {
    if (gameStatus !== GAME_STATUS.PLAYING) return;
    
    if (timer.isRunning) {
      timer.pauseTimer();
    } else {
      if (isWaitingForNextWord) {
        // Cambia la parola solo quando si riavvia il tempo
        setCurrentWordIndex((prev) => prev + 1);
        setIsWaitingForNextWord(false);
      }
      timer.resumeTimer();
    }
  }, [gameStatus, timer, isWaitingForNextWord]);

  const handleCorrect = useCallback(() => {
    if (gameStatus !== GAME_STATUS.PLAYING || isWaitingForNextWord) return;
    
    sounds.playCorrect();
    setScore((prev) => prev + POINTS_CONFIG.CORRECT);
    setCorrectCount((prev) => prev + 1);
    
    if (currentWord) {
      setHistory((prev) => [...prev, { word: currentWord.word, result: 'correct' }]);
    }
    
    // Ferma il tempo e mantieni la parola indovinata visibile
    setIsWaitingForNextWord(true);
    timer.pauseTimer();
  }, [gameStatus, sounds, currentWord, timer, isWaitingForNextWord]);

  const handleError = useCallback(() => {
    if (gameStatus !== GAME_STATUS.PLAYING || isWaitingForNextWord) return;

    sounds.playError();
    setScore((prev) => Math.max(0, prev + POINTS_CONFIG.ERROR));
    setErrorCount((prev) => prev + 1);

    if (currentWord) {
      setHistory((prev) => [...prev, { word: currentWord.word, result: 'error' }]);
    }

    // Ferma il tempo e mantieni la parola visibile
    setIsWaitingForNextWord(true);
    timer.pauseTimer();
  }, [gameStatus, sounds, currentWord, timer, isWaitingForNextWord]);

  const handlePass = useCallback(() => {
    if (gameStatus !== GAME_STATUS.PLAYING || isWaitingForNextWord) return;
    
    if (!passes.canPass) {
      sounds.playError();
      return;
    }

    const consumed = passes.consumePass();
    if (consumed) {
      sounds.playPass();
      if (POINTS_CONFIG.PASS !== 0) {
        setScore((prev) => Math.max(0, prev + POINTS_CONFIG.PASS));
      }
      
      if (currentWord) {
        setHistory((prev) => [...prev, { word: currentWord.word, result: 'pass' }]);
      }

      // Ferma il tempo e mantieni la parola visibile
      setIsWaitingForNextWord(true);
      timer.pauseTimer();
    }
  }, [gameStatus, passes, sounds, currentWord, timer, isWaitingForNextWord]);

  const resetGame = useCallback(() => {
    setDeck(shuffleDeck(initialWords));
    setCurrentWordIndex(0);
    setIsWaitingForNextWord(false);
    setScore(0);
    setCorrectCount(0);
    setErrorCount(0);
    setHistory([]);
    setCountdownNumber(null);
    setGameStatus(GAME_STATUS.IDLE);
    passes.resetPasses(maxPasses);
    timer.resetTimer(timerSeconds);
  }, [maxPasses, timerSeconds, passes, timer]);

  return {
    gameStatus,
    setGameStatus,
    currentWord,
    isWaitingForNextWord,
    score,
    correctCount,
    errorCount,
    history,
    countdownNumber,
    timer,
    passes,
    sounds,
    startCountdownAndPlay,
    toggleTimer,
    handleCorrect,
    handleError,
    handlePass,
    resetGame,
  };
}
