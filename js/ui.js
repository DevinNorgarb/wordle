const game = new WordixGame();

const boardEl = document.getElementById('board');
const keyboardEl = document.getElementById('keyboard');
const messageEl = document.getElementById('message');
const newGameBtn = document.getElementById('new-game-btn');
const helpBtn = document.getElementById('help-btn');
const statsBtn = document.getElementById('stats-btn');
const themeBtn = document.getElementById('theme-btn');
const helpModal = document.getElementById('help-modal');
const statsModal = document.getElementById('stats-modal');

function initBoard() {
    boardEl.innerHTML = '';
    for (let i = 0; i < MAX_GUESSES; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.dataset.row = i;

        for (let j = 0; j < WORD_LENGTH; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.col = j;
            row.appendChild(tile);
        }

        boardEl.appendChild(row);
    }
}

function updateBoard() {
    const rows = boardEl.querySelectorAll('.row');

    // Clear all tiles first
    rows.forEach((row, rowIndex) => {
        const tiles = row.querySelectorAll('.tile');
        tiles.forEach((tile, colIndex) => {
            if (rowIndex < game.guesses.length) {
                const guess = game.guesses[rowIndex];
                tile.textContent = guess.word[colIndex];
                tile.className = `tile ${guess.result[colIndex]}`;
            } else if (rowIndex === game.guesses.length) {
                tile.textContent = game.currentGuess[colIndex] || '';
                tile.className = game.currentGuess[colIndex] ? 'tile filled' : 'tile';
            } else {
                tile.textContent = '';
                tile.className = 'tile';
            }
        });
    });
}

function updateCurrentRow() {
    const currentRowIndex = game.guesses.length;
    const row = boardEl.querySelector(`[data-row="${currentRowIndex}"]`);
    if (!row) return;

    const tiles = row.querySelectorAll('.tile');
    tiles.forEach((tile, i) => {
        tile.textContent = game.currentGuess[i] || '';
        tile.className = game.currentGuess[i] ? 'tile filled' : 'tile';
    });
}

function revealGuess(rowIndex, result) {
    return new Promise((resolve) => {
        const row = boardEl.querySelector(`[data-row="${rowIndex}"]`);
        const tiles = row.querySelectorAll('.tile');

        tiles.forEach((tile, i) => {
            setTimeout(() => {
                tile.classList.add('flip');

                setTimeout(() => {
                    tile.classList.remove('flip');
                    tile.classList.add(result[i]);
                }, 250);

                if (i === WORD_LENGTH - 1) {
                    setTimeout(resolve, 300);
                }
            }, i * 300);
        });
    });
}

function shakeRow() {
    const currentRowIndex = game.guesses.length;
    const row = boardEl.querySelector(`[data-row="${currentRowIndex}"]`);
    if (!row) return;

    row.classList.add('shake');
    setTimeout(() => row.classList.remove('shake'), 500);
}

function bounceRow(rowIndex) {
    const row = boardEl.querySelector(`[data-row="${rowIndex}"]`);
    if (!row) return;

    row.classList.add('bounce');
    setTimeout(() => row.classList.remove('bounce'), 1000);
}

function updateKeyboard() {
    const state = game.getKeyboardState();
    const keys = keyboardEl.querySelectorAll('button[data-key]');

    keys.forEach(key => {
        const letter = key.dataset.key;
        if (letter.length === 1 && state[letter]) {
            key.className = state[letter];
        }
    });
}

function resetKeyboard() {
    const keys = keyboardEl.querySelectorAll('button[data-key]');
    keys.forEach(key => {
        if (key.dataset.key.length === 1) {
            key.className = '';
        }
    });
}

function showMessage(text, type = '', duration = 1500) {
    messageEl.textContent = text;
    messageEl.className = type ? `show ${type}` : 'show';

    if (duration > 0) {
        setTimeout(() => {
            messageEl.className = '';
        }, duration);
    }
}

function handleKeyPress(key) {
    if (game.gameOver) return;

    if (key === 'ENTER') {
        const result = game.submitGuess();

        if (!result.valid) {
            showMessage(result.reason, 'error');
            shakeRow();
            return;
        }

        const rowIndex = game.guesses.length - 1;
        revealGuess(rowIndex, result.result).then(() => {
            updateKeyboard();

            if (result.gameOver) {
                if (result.won) {
                    const messages = ['Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!'];
                    showMessage(messages[rowIndex] || 'You won!', 'success', 3000);
                    bounceRow(rowIndex);
                } else {
                    showMessage(game.targetWord, 'error', 0);
                }
            }
        });

    } else if (key === 'BACKSPACE') {
        if (game.removeLetter()) {
            updateCurrentRow();
        }

    } else if (/^[A-Z]$/.test(key)) {
        if (game.addLetter(key)) {
            updateCurrentRow();
        }
    }
}

function startNewGame() {
    game.newGame();
    initBoard();
    resetKeyboard();
    messageEl.className = '';
    messageEl.textContent = '';
}

function updateStatsModal() {
    document.getElementById('stat-played').textContent = game.stats.played;
    document.getElementById('stat-win-pct').textContent = game.getWinPercentage();
    document.getElementById('stat-current-streak').textContent = game.stats.currentStreak;
    document.getElementById('stat-max-streak').textContent = game.stats.maxStreak;

    const distributionEl = document.getElementById('guess-distribution');
    distributionEl.innerHTML = '';

    const maxCount = Math.max(...game.stats.distribution, 1);

    game.stats.distribution.forEach((count, i) => {
        const row = document.createElement('div');
        row.className = 'guess-row';

        const num = document.createElement('span');
        num.className = 'guess-num';
        num.textContent = i + 1;

        const bar = document.createElement('div');
        bar.className = 'guess-bar';
        bar.textContent = count;
        bar.style.width = `${Math.max((count / maxCount) * 100, 8)}%`;

        if (game.gameOver && game.won && game.guesses.length === i + 1) {
            bar.classList.add('highlight');
        }

        row.appendChild(num);
        row.appendChild(bar);
        distributionEl.appendChild(row);
    });
}

function openModal(modal) {
    modal.classList.add('show');
}

function closeModal(modal) {
    modal.classList.remove('show');
}

function initTheme() {
    const savedTheme = localStorage.getItem('wordix-theme') || 'light';
    document.documentElement.dataset.theme = savedTheme;
    updateThemeButton();
}

function toggleTheme() {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('wordix-theme', next);
    updateThemeButton();
}

function updateThemeButton() {
    const isDark = document.documentElement.dataset.theme === 'dark';
    themeBtn.textContent = isDark ? '☀️' : '🌙';
}

// Event Listeners
keyboardEl.addEventListener('click', (e) => {
    const key = e.target.dataset?.key;
    if (key) handleKeyPress(key);
});

document.addEventListener('keydown', (e) => {
    if (helpModal.classList.contains('show') || statsModal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeModal(helpModal);
            closeModal(statsModal);
        }
        return;
    }

    if (e.key === 'Enter') {
        handleKeyPress('ENTER');
    } else if (e.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
    } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
    }
});

newGameBtn.addEventListener('click', startNewGame);

helpBtn.addEventListener('click', () => openModal(helpModal));
statsBtn.addEventListener('click', () => {
    updateStatsModal();
    openModal(statsModal);
});
themeBtn.addEventListener('click', toggleTheme);

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        closeModal(e.target.closest('.modal'));
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// Initialize
initTheme();
startNewGame();
