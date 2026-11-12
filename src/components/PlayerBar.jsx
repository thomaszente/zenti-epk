import { fmt } from '../lib/usePlayer.js';

const PLAY = 'M8 5v14l11-7z';
const PAUSE = 'M6 5h4v14H6zM14 5h4v14h-4z';
const PREV = 'M7 6h2v12H7zm3 6l8-6v12z';
const NEXT = 'M15 6h2v12h-2zM6 6l8 6-8 6z';
const CLOSE =
  'M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4 6.3 6.3 6.3-6.3z';

/* Stays at the foot of the page so a track keeps playing while the visitor reads on. */
export default function PlayerBar({ player }) {
  const { track, playing, now, current } = player;
  const length = current > -1 ? player.total(current) : 0;
  const percent = length ? (now / length) * 100 : 0;

  const seek = (e) => {
    if (current < 0) return;
    const b = e.currentTarget.getBoundingClientRect();
    player.select(current, playing, Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)));
  };

  const onKeyDown = (e) => {
    if (current < 0 || !length) return;
    if (e.key === 'ArrowRight') player.select(current, playing, Math.min(1, (now + 5) / length));
    else if (e.key === 'ArrowLeft') player.select(current, playing, Math.max(0, (now - 5) / length));
    else return;
    e.preventDefault();
  };

  return (
    <div className="bar" hidden={!track}>
      <div className="wrap">
        <button className="bbtn" type="button" aria-label="Previous track" onClick={player.prev}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={PREV} /></svg>
        </button>
        <button
          className="bbtn main"
          type="button"
          aria-label={(playing ? 'Pause ' : 'Play ') + (track ? track.title : '')}
          onClick={player.togglePlay}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={playing ? PAUSE : PLAY} /></svg>
        </button>
        <button className="bbtn" type="button" aria-label="Next track" onClick={player.next}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={NEXT} /></svg>
        </button>

        <div className="binfo">
          <b>{track ? track.title : ''}</b>
          <span>{track ? track.credit : ''}</span>
        </div>

        <div
          className="bline"
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent) || 0}
          aria-valuetext={fmt(now) + ' of ' + fmt(length) + (track ? ', ' + track.title : '')}
          style={{ '--p': (percent || 0) + '%' }}
          onClick={seek}
          onKeyDown={onKeyDown}
        >
          <i />
        </div>

        <span className="ptime">
          {fmt(now)} / {fmt(length)}
        </span>

        <button
          className="bbtn"
          type="button"
          aria-label="Stop and close the player"
          onClick={player.stop}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={CLOSE} /></svg>
        </button>
      </div>
    </div>
  );
}
