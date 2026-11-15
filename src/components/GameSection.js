import "./GameStyleSheet.css";
import { useState } from "react";

export default function GameSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="game" className="game-section">
      <div className="game-inner">
        <h2>Take a break & play</h2>
        <p>I built this little game from scratch. Press space or tap to jump!</p>

        <button
          className="game-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="game-frame"
        >
          {open ? "Close game" : "Play Kitten Jump"}
        </button>

        {open && (
          <div id="game-frame" className="game-frame">
            <iframe
              src="/game/index.html"
              title="Kitten Jump game"
              onLoad={(e) => e.target.focus()}
            />
          </div>
        )}
      </div>
    </section>
  );
}