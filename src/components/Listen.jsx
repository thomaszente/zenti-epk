import { useCallback, useEffect, useMemo, useRef } from 'react';
import { glowProps } from '../lib/util.js';
import SectionHead from './SectionHead.jsx';
import { MIXES, RELEASES, CONTACT } from '../content.js';
import Tracks from './Tracks.jsx';

/* A stable pseudo-random waveform, so each card looks like its own recording. */
function makeBars(seed) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const out = [];
  for (let k = 0; k < 400; k++) {
    const env = 0.45 + 0.4 * Math.sin(k / 9 + (seed % 7)) * Math.sin(k / 23);
    out.push(env * 0.6 + rand() * 0.4);
  }
  return out;
}

function MixCard({ mix, seed }) {
  const canvasRef = useRef(null);
  const bars = useMemo(() => makeBars(seed), [seed]);

  const paint = useCallback(
    (progress) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.clientWidth || 500;
      const h = 44;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(w * d)) {
        canvas.width = Math.round(w * d);
        canvas.height = h * d;
      }
      const g = canvas.getContext('2d');
      g.setTransform(d, 0, 0, d, 0, 0);
      g.clearRect(0, 0, w, h);
      for (let x = 0, k = 0; x < w; x += 4, k++) {
        const bh = Math.max(3, h * bars[k % bars.length]);
        g.fillStyle = x / w < progress ? '#E0A46A' : '#8A857B';
        g.fillRect(x, (h - bh) / 2, 2, bh);
      }
    },
    [bars]
  );

  useEffect(() => {
    paint(0);
  }, [paint]);

  const glow = glowProps();

  return (
    <a
      className="mix glow"
      href={mix.url}
      onPointerMove={(e) => {
        glow.onPointerMove(e);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const r = canvas.getBoundingClientRect();
        paint(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
      }}
      onPointerLeave={() => paint(0)}
    >
      <span className="caps k">{mix.kind}</span>
      <b>{mix.title}</b>
      <span>{mix.note}</span>
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="caps go">Open on SoundCloud</span>
    </a>
  );
}

export default function Listen({ player }) {
  return (
    <section id="listen">
      <div className="wrap">
        <SectionHead eyebrow="Listen" title="Six sets, from a water tower to the playa.">
          <p>Live recordings and guest mixes. Run your cursor across a waveform, then open it on SoundCloud.</p>
        </SectionHead>

        <div className="mixes">
          {MIXES.map((mix, i) => (
            <MixCard key={mix.url} mix={mix} seed={i + 3} />
          ))}
        </div>

        <p className="caps subhead">Releases</p>
        <div className="rels">
          {RELEASES.map((r) => (
            <figure key={r.img}>
              <img src={r.img} alt={r.alt} loading="lazy" />
              <figcaption>
                {r.badge && <span className="new">{r.badge}</span>}
                <b>{r.title}</b>
                <span>{r.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="caps subhead">Originals</p>
        <p className="pintro">Four originals, full length. They keep playing while you read the rest of the page.</p>
        <Tracks player={player} />

        <div className="linkrow">
          <a className="btn ghost sm" href={CONTACT.spotify}>Spotify</a>
          <a className="btn ghost sm" href={CONTACT.originals}>Original tracks</a>
          <a className="btn ghost sm" href={CONTACT.beatport}>Beatport</a>
          <a className="btn ghost sm" href={CONTACT.soundcloud}>SoundCloud</a>
        </div>
      </div>
    </section>
  );
}
