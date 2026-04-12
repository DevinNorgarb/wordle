import type { TileStatus } from '../types';
import './Tile.css';

interface TileProps {
  letter: string;
  status: TileStatus;
  delay?: number;
}

export function Tile({ letter, status, delay = 0 }: TileProps) {
  const className = ['tile', status !== 'empty' && status !== 'filled' ? 'flip' : '', status].filter(Boolean).join(' ');

  return (
    <div
      className={className}
      style={{ animationDelay: `${delay}ms` }}
    >
      {letter}
    </div>
  );
}
