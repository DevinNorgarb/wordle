# Wordix

A word-guessing game inspired by Wordle. Guess the 5-letter word in 6 tries!

## Features

- **Unlimited plays** - Play as many games as you want, no daily limit
- **Color-coded feedback** - Green (correct), Yellow (wrong position), Gray (not in word)
- **Virtual keyboard** - Click or type to enter letters
- **Statistics tracking** - Track your games played, win percentage, and guess distribution
- **Dark mode** - Toggle between light and dark themes
- **Responsive design** - Works on desktop and mobile devices
- **No build step** - Pure HTML, CSS, and JavaScript

## How to Play

1. Guess the hidden 5-letter word in 6 tries
2. Each guess must be a valid 5-letter word
3. After each guess, the color of the tiles will change:
   - **Green**: The letter is in the word and in the correct spot
   - **Yellow**: The letter is in the word but in the wrong spot
   - **Gray**: The letter is not in the word
4. Click "New Game" to start a new game anytime

## Deploy to GitHub Pages

### Option 1: Using GitHub Web Interface

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to **Settings** > **Pages**
4. Under "Source", select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**
7. Your game will be live at `https://<username>.github.io/<repository-name>/`

### Option 2: Using Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Wordix game"

# Add your GitHub repository as remote
git remote add origin https://github.com/<username>/<repository-name>.git

# Push to GitHub
git push -u origin main
```

Then enable GitHub Pages in repository settings as described above.

## Project Structure

```
wordix/
├── index.html          # Main game page
├── css/
│   └── style.css       # Styling with animations and dark mode
├── js/
│   ├── words.js        # Word lists (solutions and valid guesses)
│   ├── game.js         # Core game logic
│   └── ui.js           # DOM manipulation and event handling
└── README.md           # This file
```

## Local Development

Simply open `index.html` in a web browser. No build step or server required.

For live reload during development, you can use any local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

## License

MIT License - Feel free to use and modify as you wish.
