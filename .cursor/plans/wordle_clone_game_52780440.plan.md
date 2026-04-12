---
name: Wordle Clone Game
overview: Create a Wordle-like word-guessing game using vanilla HTML/CSS/JS for easy GitHub Pages deployment, with a unique name to avoid copyright issues.
todos:
  - id: setup-project
    content: Create project structure with index.html, css/, js/ directories
    status: pending
  - id: implement-html
    content: Build HTML structure (game board grid, keyboard, modals)
    status: pending
  - id: implement-css
    content: Style the game with animations, dark mode, responsive design
    status: pending
  - id: implement-words
    content: Add word lists (solutions and valid guesses)
    status: pending
  - id: implement-game-logic
    content: Core game mechanics (word validation, color feedback, win/lose)
    status: pending
  - id: implement-ui
    content: DOM manipulation, animations, keyboard handling
    status: pending
  - id: implement-stats
    content: Statistics tracking (games played, wins, guess distribution) and localStorage
    status: pending
  - id: add-readme
    content: Documentation with GitHub Pages deployment instructions
    status: pending
isProject: false
---

# Wordix - A Wordle-Like Game

## Overview

Build a word-guessing game with identical gameplay to Wordle, deployed as a static site to GitHub Pages.

## Name Options

Since "Wordle" is trademarked by The New York Times, here are alternative names:
- **Wordix** (recommended - catchy, similar feel)
- **Guessle**
- **Lexile**
- **Wurdl**

## Technology Stack

**Vanilla HTML/CSS/JS** - Chosen for:
- Zero build step required
- Direct GitHub Pages deployment
- Fast loading, no framework overhead
- Simple maintenance

## Project Structure

```
wordle/
├── index.html          # Main game page
├── css/
│   └── style.css       # Game styling (grid, keyboard, animations)
├── js/
│   ├── game.js         # Core game logic
│   ├── words.js        # Word list (valid guesses + solutions)
│   └── ui.js           # DOM manipulation and animations
└── README.md           # Documentation
```

## Core Features to Implement

### 1. Game Board
- 6 rows x 5 columns grid
- Each cell holds one letter
- Color-coded feedback:
  - **Green**: Correct letter, correct position
  - **Yellow**: Correct letter, wrong position
  - **Gray**: Letter not in word

### 2. Virtual Keyboard
- QWERTY layout
- Keys change color based on guesses
- Enter and Backspace buttons

### 3. Game Logic
- **Unlimited plays** - Random word selection each game (no daily limit)
- "New Game" button to start fresh anytime
- Word validation (only accept valid 5-letter words)
- Win/lose detection
- Statistics tracking (localStorage)

### 4. UI/UX
- Flip animations for revealing letters
- Shake animation for invalid words
- Dark mode support
- Responsive design (mobile-friendly)
- Modal dialogs (instructions, statistics)

### 5. Persistence (localStorage)
- Statistics (games played, win %, guess distribution)
- Theme preference

## GitHub Pages Deployment

1. Initialize git repository
2. Add all files
3. Push to GitHub
4. Enable GitHub Pages in repository settings (source: main branch)

## Word List Strategy

- ~2,300 solution words (common 5-letter words)
- ~10,000 valid guess words (includes obscure words)
- Words stored in `js/words.js`
