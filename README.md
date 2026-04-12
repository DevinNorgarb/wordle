# Wordix

A word-guessing game inspired by Wordle. Guess the 5-letter word in 6 tries!

## Features

- Modern React + TypeScript application built with Vite
- 14,856 valid 5-letter words for guessing
- 900+ curated solution words
- Light/Dark theme support
- Statistics tracking with local storage
- Responsive design for all screen sizes
- Keyboard support for desktop play
- Animated tile flips and shakes

## Development

### Prerequisites

- Node.js 18+
- npm

### Getting Started

```bash
cd wordix-app
npm install
npm run dev
```

The development server will start at `http://localhost:5173`.

### Building for Production

```bash
cd wordix-app
npm run build
```

The built files will be in `wordix-app/dist/`.

### Running Tests

```bash
cd wordix-app
npm run lint
```

## Deploy to GitHub Pages

This project uses GitHub Actions for automated deployment.

### Automatic Deployment

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy

### Manual Setup

1. Go to your repository Settings > Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. Push to main to trigger the deployment

## Project Structure

```
wordle/
├── wordix-app/              # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── data/            # Word lists and game data
│   │   ├── hooks/           # Custom React hooks
│   │   └── types.ts         # TypeScript types
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
└── README.md
```

## How to Play

1. Type a 5-letter word and press Enter
2. Green tiles mean the letter is correct and in the right spot
3. Yellow tiles mean the letter is in the word but wrong spot
4. Gray tiles mean the letter is not in the word
5. You have 6 tries to guess the word

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **GitHub Actions** - CI/CD deployment

## License

MIT
