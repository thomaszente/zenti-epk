import { useCallback, useEffect, useRef } from 'react';
import { glowProps } from '../lib/util.js';
import { fmt } from '../lib/usePlayer.js';

const PLAY = 'M8 5v14l11-7z';
const PAUSE = 'M6 5h4v14H6zM14 5h4v14h-4z';

function Track({ track, index, player }) {
  const canvasRef = useRef(null);
  const active = player.current === index;
  const playing = active && player.playing;
  const length = player.total(index);
  const at = active ? player.now : 0;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.clientWidth;
    const h = 56;
    const d = Math.min(window.devicePixelRatio || 1, 2);
    if (!w) return;
    if (canvas.width !== Math.round(w * d)) {
      canvas.width = Math.round(w * d);
      canvas.height = h * d;
    }
    const g = canvas.getContext('2d');
    g.setTransform(d, 0, 0, d, 0, 0);
    g.clearRect(0, 0, w, h);

    const peaks = track.peaks;
    const n = Math.max(40, Math.min(peaks.length, Math.floor(w / 3)));
    const step = w / n;
    const bw = Math.max(1, step - 1);
    const progress = active && length ? at / length : 0;

    for (let i = 0; i < n; i++) {
      const v = peaks[Math.floor((i * peaks.length) / n)];
      const bh = Math.max(2, v * h * 0.92);
      g.fillStyle = i / n < progress ? '#E0A46A' : '#8A857B';
      g.fillRect(i * step, (h - bh) / 2, bw, bh);
    }
  }, [track, active, at, length]);

  useEffect(draw, [draw]);

  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  const seekRatio = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const b = canvas.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - b.left) / b.width));
  };

  const onKeyDown = (e) => {
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowUp') player.select(index, playing, Math.min(1, (at + 5) / length));
    else if (k === 'ArrowLeft' || k === 'ArrowDown') player.select(index, playing, Math.max(0, (at - 5) / length));
    else if (k === 'Home') player.select(index, playing, 0);
    else if (k === ' ' || k === 'Enter') player.toggle(index);
    else return;
    e.preventDefault();
  };

  const percent = length ? Math.round((at / length) * 100) : 0;

  return (
    <div className={'trk glow' + (active ? ' on' : '')} {...glowProps()}>
      <button
        className="pbtn"
        type="button"
        aria-label={(playing ? 'Pause ' : 'Play ') + track.title}
        onClick={() => player.toggle(index)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={playing ? PAUSE : PLAY} />
        </svg>
      </button>

      <div className="pbody">
        <div className="prow">
          <b>{track.title}</b>
          <span className="caps pk">{track.credit}</span>
        </div>

        <div
          className="pwave"
          role="slider"
          tabIndex={0}
          aria-label={'Seek within ' + track.title}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-valuetext={fmt(at) + ' of ' + fmt(length)}
          onKeyDown={onKeyDown}
          onClick={(e) => player.select(index, true, seekRatio(e))}
        >
          <canvas ref={canvasRef} aria-hidden="true" />
        </div>

        <div className="prow">
          <span className="pnote">{track.note}</span>
          <span className="ptime">
            {fmt(at)} / {fmt(length)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Tracks({ player }) {
  return (
    <div className="tracks">
      {player.tracks.map((track, i) => (
        <Track key={track.id} track={track} index={i} player={player} />
      ))}
    </div>
  );
}
