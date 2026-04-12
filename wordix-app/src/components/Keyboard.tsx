import type { KeyboardState } from '../types';
import './Keyboard.css';

interface KeyboardProps {
  keyboardState: KeyboardState;
  onKey: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export function Keyboard({ keyboardState, onKey, onEnter, onBackspace }: KeyboardProps) {
  const handleClick = (key: string) => {
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'BACKSPACE') {
      onBackspace();
    } else {
      onKey(key);
    }
  };

  return (
    <div className="keyboard">
      {ROWS.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((key) => {
            const status = keyboardState[key] || '';
            const isWide = key === 'ENTER' || key === 'BACKSPACE';
            const className = ['key', isWide ? 'wide-key' : '', status].filter(Boolean).join(' ');

            return (
              <button
                key={key}
                className={className}
                onClick={() => handleClick(key)}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
