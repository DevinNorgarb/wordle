import { useState, useCallback, useEffect } from 'react';
import { getRandomWord, isValidWord, WORD_LENGTH, MAX_GUESSES } from '../data';
import type { Guess, TileStatus, GameStats, KeyboardState } from '../types';

const STATS_KEY = 'wordix-stats';

function loadStats(): GameStats {
  const saved = localStorage.getItem(STATS_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    played: 0,
    won: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: [0, 0, 0, 0, 0, 0],
  };
}

function saveStats(stats: GameStats): void {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function useGame() {
  const [targetWord, setTargetWord] = useState<string>('');
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [stats, setStats] = useState<GameStats>(loadStats);
  const [shakeRow, setShakeRow] = useState<boolean>(false);
  const [bounceRow, setBounceRow] = useState<boolean>(false);

  const newGame = useCallback(() => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setWon(false);
    setMessage('');
    setShakeRow(false);
    setBounceRow(false);
  }, []);

  useEffect(() => {
    newGame();
  }, [newGame]);

  const showMessage = useCallback((msg: string, duration = 2000) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), duration);
  }, []);

  const evaluateGuess = useCallback((guess: string): TileStatus[] => {
    const result: TileStatus[] = Array(WORD_LENGTH).fill('absent');
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = 'correct';
        targetLetters[i] = '';
        guessLetters[i] = '';
      }
    }

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] === '') continue;
      const targetIndex = targetLetters.indexOf(guessLetters[i]);
      if (targetIndex !== -1) {
        result[i] = 'present';
        targetLetters[targetIndex] = '';
      }
    }

    return result;
  }, [targetWord]);

  const updateStats = useCallback((didWin: boolean, guessCount: number) => {
    setStats((prev) => {
      const newStats = { ...prev };
      newStats.played++;

      if (didWin) {
        newStats.won++;
        newStats.currentStreak++;
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
        newStats.distribution[guessCount - 1]++;
      } else {
        newStats.currentStreak = 0;
      }

      saveStats(newStats);
      return newStats;
    });
  }, []);

  const addLetter = useCallback((letter: string) => {
    if (gameOver || currentGuess.length >= WORD_LENGTH) return;
    setCurrentGuess((prev) => prev + letter.toUpperCase());
  }, [gameOver, currentGuess.length]);

  const removeLetter = useCallback(() => {
    if (gameOver || currentGuess.length === 0) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameOver, currentGuess.length]);

  const submitGuess = useCallback(() => {
    if (gameOver) return;

    if (currentGuess.length !== WORD_LENGTH) {
      showMessage('Not enough letters');
      setShakeRow(true);
      setTimeout(() => setShakeRow(false), 500);
      return;
    }

    if (!isValidWord(currentGuess)) {
      showMessage('Not in word list');
      setShakeRow(true);
      setTimeout(() => setShakeRow(false), 500);
      return;
    }

    const result = evaluateGuess(currentGuess);
    const newGuess: Guess = { word: currentGuess, result };
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);

    if (currentGuess === targetWord) {
      setGameOver(true);
      setWon(true);
      setBounceRow(true);
      updateStats(true, newGuesses.length);
      const messages = ['Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!'];
      showMessage(messages[newGuesses.length - 1] || 'You won!', 3000);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
      setWon(false);
      updateStats(false, newGuesses.length);
      showMessage(targetWord, 5000);
    }

    setCurrentGuess('');
  }, [gameOver, currentGuess, guesses, targetWord, evaluateGuess, updateStats, showMessage]);

  const getKeyboardState = useCallback((): KeyboardState => {
    const state: KeyboardState = {};
    const priority: Record<TileStatus, number> = {
      empty: 0,
      filled: 0,
      absent: 1,
      present: 2,
      correct: 3,
    };

    for (const guess of guesses) {
      for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = guess.word[i];
        const status = guess.result[i];
        if (!state[letter] || priority[status] > priority[state[letter]]) {
          state[letter] = status;
        }
      }
    }

    return state;
  }, [guesses]);

  const winPercentage = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  return {
    targetWord,
    guesses,
    currentGuess,
    gameOver,
    won,
    message,
    stats,
    winPercentage,
    shakeRow,
    bounceRow,
    newGame,
    addLetter,
    removeLetter,
    submitGuess,
    getKeyboardState,
  };
}
