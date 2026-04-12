import { useEffect, useState, useCallback } from 'react';
import { Board, Keyboard, Modal, Stats, HelpModal } from './components';
import { useGame } from './hooks/useGame';
import './App.css';

function App() {
  const {
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
  } = useGame();

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('wordix-theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('wordix-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === 'Enter') {
      submitGuess();
    } else if (e.key === 'Backspace') {
      removeLetter();
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      addLetter(e.key);
    }
  }, [submitGuess, removeLetter, addLetter]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => setShowStats(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [gameOver]);

  return (
    <div className="game-container">
      <header>
        <button className="icon-btn" onClick={() => setShowHelp(true)} aria-label="How to play">
          ?
        </button>
        <h1>Wordix</h1>
        <div className="header-right">
          <button className="icon-btn" onClick={() => setShowStats(true)} aria-label="Statistics">
            📊
          </button>
          <button
            className="icon-btn"
            onClick={() => setIsDark((d) => !d)}
            aria-label="Toggle theme"
          >
            {isDark ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <main>
        <div className="message-container">
          <div className={`message ${message ? 'show' : ''} ${gameOver && !won ? 'error' : gameOver && won ? 'success' : ''}`}>
            {message}
          </div>
        </div>

        <Board
          guesses={guesses}
          currentGuess={currentGuess}
          shakeRow={shakeRow}
          bounceRow={bounceRow}
        />

        <Keyboard
          keyboardState={getKeyboardState()}
          onKey={addLetter}
          onEnter={submitGuess}
          onBackspace={removeLetter}
        />

        <button className="new-game-btn" onClick={newGame}>
          New Game
        </button>
      </main>

      <Modal isOpen={showHelp} onClose={() => setShowHelp(false)} title="How To Play">
        <HelpModal />
      </Modal>

      <Modal isOpen={showStats} onClose={() => setShowStats(false)} title="Statistics">
        <Stats
          stats={stats}
          winPercentage={winPercentage}
          lastGuessCount={won ? guesses.length : undefined}
        />
      </Modal>
    </div>
  );
}

export default App;
