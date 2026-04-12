import { Tile } from './Tile';
import { WORD_LENGTH, MAX_GUESSES } from '../data';
import type { Guess, TileStatus } from '../types';
import './Board.css';

interface BoardProps {
  guesses: Guess[];
  currentGuess: string;
  shakeRow: boolean;
  bounceRow: boolean;
}

export function Board({ guesses, currentGuess, shakeRow, bounceRow }: BoardProps) {
  const rows = [];

  for (let i = 0; i < MAX_GUESSES; i++) {
    const tiles = [];
    const isCurrentRow = i === guesses.length;
    const isCompletedRow = i < guesses.length;
    const isWinningRow = bounceRow && i === guesses.length - 1;

    for (let j = 0; j < WORD_LENGTH; j++) {
      let letter = '';
      let status: TileStatus = 'empty';

      if (isCompletedRow) {
        letter = guesses[i].word[j];
        status = guesses[i].result[j];
      } else if (isCurrentRow && j < currentGuess.length) {
        letter = currentGuess[j];
        status = 'filled';
      }

      tiles.push(
        <Tile
          key={j}
          letter={letter}
          status={status}
          delay={isCompletedRow ? j * 100 : 0}
        />
      );
    }

    const rowClassName = [
      'row',
      isCurrentRow && shakeRow ? 'shake' : '',
      isWinningRow ? 'bounce' : '',
    ].filter(Boolean).join(' ');

    rows.push(
      <div key={i} className={rowClassName}>
        {tiles}
      </div>
    );
  }

  return <div className="board">{rows}</div>;
}
