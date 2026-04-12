import type { GameStats } from '../types';
import './Stats.css';

interface StatsProps {
  stats: GameStats;
  winPercentage: number;
  lastGuessCount?: number;
}

export function Stats({ stats, winPercentage, lastGuessCount }: StatsProps) {
  const maxDistribution = Math.max(...stats.distribution, 1);

  return (
    <div className="stats">
      <div className="stats-container">
        <div className="stat">
          <div className="stat-value">{stats.played}</div>
          <div className="stat-label">Played</div>
        </div>
        <div className="stat">
          <div className="stat-value">{winPercentage}</div>
          <div className="stat-label">Win %</div>
        </div>
        <div className="stat">
          <div className="stat-value">{stats.currentStreak}</div>
          <div className="stat-label">Current Streak</div>
        </div>
        <div className="stat">
          <div className="stat-value">{stats.maxStreak}</div>
          <div className="stat-label">Max Streak</div>
        </div>
      </div>

      <h3>Guess Distribution</h3>
      <div className="guess-distribution">
        {stats.distribution.map((count, i) => {
          const width = Math.max((count / maxDistribution) * 100, 7);
          const isHighlight = lastGuessCount === i + 1;

          return (
            <div key={i} className="guess-row">
              <span className="guess-num">{i + 1}</span>
              <div
                className={`guess-bar ${isHighlight ? 'highlight' : ''}`}
                style={{ width: `${width}%` }}
              >
                {count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
