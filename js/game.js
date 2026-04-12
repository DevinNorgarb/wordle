const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

class WordixGame {
    constructor() {
        this.targetWord = '';
        this.guesses = [];
        this.currentGuess = '';
        this.gameOver = false;
        this.won = false;
        this.stats = this.loadStats();
    }

    newGame() {
        this.targetWord = getRandomWord();
        this.guesses = [];
        this.currentGuess = '';
        this.gameOver = false;
        this.won = false;
    }

    addLetter(letter) {
        if (this.gameOver) return false;
        if (this.currentGuess.length >= WORD_LENGTH) return false;

        this.currentGuess += letter.toUpperCase();
        return true;
    }

    removeLetter() {
        if (this.gameOver) return false;
        if (this.currentGuess.length === 0) return false;

        this.currentGuess = this.currentGuess.slice(0, -1);
        return true;
    }

    submitGuess() {
        if (this.gameOver) return { valid: false, reason: 'Game is over' };
        if (this.currentGuess.length !== WORD_LENGTH) {
            return { valid: false, reason: 'Not enough letters' };
        }
        if (!isValidWord(this.currentGuess)) {
            return { valid: false, reason: 'Not in word list' };
        }

        const result = this.evaluateGuess(this.currentGuess);
        this.guesses.push({ word: this.currentGuess, result });

        if (this.currentGuess === this.targetWord) {
            this.gameOver = true;
            this.won = true;
            this.updateStats(true, this.guesses.length);
        } else if (this.guesses.length >= MAX_GUESSES) {
            this.gameOver = true;
            this.won = false;
            this.updateStats(false);
        }

        this.currentGuess = '';
        return { valid: true, result, gameOver: this.gameOver, won: this.won };
    }

    evaluateGuess(guess) {
        const result = Array(WORD_LENGTH).fill('absent');
        const targetLetters = this.targetWord.split('');
        const guessLetters = guess.split('');

        // First pass: mark correct letters
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (guessLetters[i] === targetLetters[i]) {
                result[i] = 'correct';
                targetLetters[i] = null;
                guessLetters[i] = null;
            }
        }

        // Second pass: mark present letters
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (guessLetters[i] === null) continue;

            const targetIndex = targetLetters.indexOf(guessLetters[i]);
            if (targetIndex !== -1) {
                result[i] = 'present';
                targetLetters[targetIndex] = null;
            }
        }

        return result;
    }

    getKeyboardState() {
        const state = {};

        for (const guess of this.guesses) {
            for (let i = 0; i < WORD_LENGTH; i++) {
                const letter = guess.word[i];
                const status = guess.result[i];

                if (!state[letter] || this.statusPriority(status) > this.statusPriority(state[letter])) {
                    state[letter] = status;
                }
            }
        }

        return state;
    }

    statusPriority(status) {
        const priorities = { absent: 1, present: 2, correct: 3 };
        return priorities[status] || 0;
    }

    loadStats() {
        const saved = localStorage.getItem('wordix-stats');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            played: 0,
            won: 0,
            currentStreak: 0,
            maxStreak: 0,
            distribution: [0, 0, 0, 0, 0, 0]
        };
    }

    saveStats() {
        localStorage.setItem('wordix-stats', JSON.stringify(this.stats));
    }

    updateStats(won, guessCount = 0) {
        this.stats.played++;

        if (won) {
            this.stats.won++;
            this.stats.currentStreak++;
            this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.currentStreak);
            this.stats.distribution[guessCount - 1]++;
        } else {
            this.stats.currentStreak = 0;
        }

        this.saveStats();
    }

    getWinPercentage() {
        if (this.stats.played === 0) return 0;
        return Math.round((this.stats.won / this.stats.played) * 100);
    }
}
