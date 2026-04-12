export type TileStatus = 'empty' | 'filled' | 'correct' | 'present' | 'absent';

export interface Guess {
  word: string;
  result: TileStatus[];
}

export interface GameStats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
  distribution: number[];
}

export interface KeyboardState {
  [key: string]: TileStatus;
}
