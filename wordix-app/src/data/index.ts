import { VALID_GUESSES } from './validGuesses';
import { SOLUTIONS } from './solutions';

export { VALID_GUESSES, SOLUTIONS };

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export function getRandomWord(): string {
  return SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)].toUpperCase();
}

export function isValidWord(word: string): boolean {
  return VALID_GUESSES.has(word.toLowerCase());
}
