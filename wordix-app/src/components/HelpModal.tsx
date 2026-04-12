import './HelpModal.css';

export function HelpModal() {
  return (
    <div className="help-content">
      <p>Guess the <strong>WORDIX</strong> in 6 tries.</p>
      <ul>
        <li>Each guess must be a valid 5-letter word.</li>
        <li>The color of the tiles will change to show how close your guess was to the word.</li>
      </ul>

      <div className="examples">
        <p><strong>Examples</strong></p>

        <div className="example-row">
          <div className="example-tile correct">W</div>
          <div className="example-tile">E</div>
          <div className="example-tile">A</div>
          <div className="example-tile">R</div>
          <div className="example-tile">Y</div>
        </div>
        <p><strong>W</strong> is in the word and in the correct spot.</p>

        <div className="example-row">
          <div className="example-tile">P</div>
          <div className="example-tile present">I</div>
          <div className="example-tile">L</div>
          <div className="example-tile">L</div>
          <div className="example-tile">S</div>
        </div>
        <p><strong>I</strong> is in the word but in the wrong spot.</p>

        <div className="example-row">
          <div className="example-tile">V</div>
          <div className="example-tile">A</div>
          <div className="example-tile">G</div>
          <div className="example-tile absent">U</div>
          <div className="example-tile">E</div>
        </div>
        <p><strong>U</strong> is not in the word in any spot.</p>
      </div>

      <p className="hint">Click <strong>New Game</strong> to play again anytime!</p>
    </div>
  );
}
