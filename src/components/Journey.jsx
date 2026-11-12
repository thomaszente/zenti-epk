import { useEffect, useRef, useState } from 'react';
import { still, toast } from '../lib/util.js';
import SectionHead from './SectionHead.jsx';
import { SLOTS } from '../content.js';

/* Smooth read of the energy arc between its eight control points. */
function valueAt(points, u) {
  const n = points.length - 1;
  const x = Math.min(n - 1e-6, u * n);
  const i = Math.floor(x);
  const m = (1 - Math.cos((x - i) * Math.PI)) / 2;
  return points[i] * (1 - m) + points[i + 1] * m;
}

export default function Journey({ onPickSlot }) {
  const [cur, setCur] = useState(2);
  const canvasRef = useRef(null);
  const drawRef = useRef(null);
  /* Mutable animation state, kept out of React so the loop never re-renders. */
  const anim = useRef({
    cur: 2,
    from: SLOTS[2].pts.slice(),
    shown: SLOTS[2].pts.slice(),
    morph: 1
  });

  /* Start a morph to the newly chosen slot. */
  useEffect(() => {
    const a = anim.current;
    a.from = a.shown.slice();
    a.cur = cur;
    a.morph = still ? 1 : 0;
    if (still && drawRef.current) drawRef.current(0);
  }, [cur]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = canvas.getContext('2d');
    let visible = true;
    let raf = 0;

    const draw = (t) => {
      const a = anim.current;
      const slot = SLOTS[a.cur];
      const d = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * d) || canvas.height !== Math.round(h * d)) {
        canvas.width = Math.round(w * d);
        canvas.height = Math.round(h * d);
      }
      g.setTransform(d, 0, 0, d, 0, 0);
      g.clearRect(0, 0, w, h);

      const pad = 28;
      const top = 26;
      const bot = h - 34;

      if (a.morph < 1) a.morph = Math.min(1, a.morph + 0.035);
      const e = 1 - Math.pow(1 - a.morph, 3);
      for (let i = 0; i < a.shown.length; i++) {
        a.shown[i] = a.from[i] + (slot.pts[i] - a.from[i]) * e;
      }

      const Y = (u) => bot - (bot - top) * valueAt(a.shown, u);
      const X = (u) => pad + (w - pad * 2) * u;

      g.strokeStyle = '#2A2927';
      g.lineWidth = 1;
      for (let k = 0; k < 4; k++) {
        const gy = top + ((bot - top) * k) / 3;
        g.beginPath();
        g.moveTo(pad, gy);
        g.lineTo(w - pad, gy);
        g.stroke();
      }

      g.beginPath();
      g.moveTo(X(0), bot);
      for (let u = 0; u <= 1.0001; u += 0.01) g.lineTo(X(u), Y(u));
      g.lineTo(X(1), bot);
      g.closePath();
      const grad = g.createLinearGradient(0, top, 0, bot);
      grad.addColorStop(0, slot.c + '55');
      grad.addColorStop(1, slot.c + '00');
      g.fillStyle = grad;
      g.fill();

      g.beginPath();
      for (let u = 0; u <= 1.0001; u += 0.01) {
        if (u === 0) g.moveTo(X(u), Y(u));
        else g.lineTo(X(u), Y(u));
      }
      g.strokeStyle = slot.c;
      g.lineWidth = 2;
      g.stroke();

      /* The playhead running the length of the set, with a short comet tail. */
      const pu = still ? 1 : (t / 7000) % 1;
      for (let q = 0; q < 14; q++) {
        const tu = pu - q * 0.012;
        if (tu < 0) continue;
        g.fillStyle = slot.c;
        g.globalAlpha = (1 - q / 14) * 0.5;
        g.beginPath();
        g.arc(X(tu), Y(tu), 4 - q * 0.2, 0, 6.28);
        g.fill();
      }
      g.globalAlpha = 1;
      g.shadowColor = slot.c;
      g.shadowBlur = 18;
      g.fillStyle = '#F1EDE4';
      g.beginPath();
      g.arc(X(pu), Y(pu), 5, 0, 6.28);
      g.fill();
      g.shadowBlur = 0;

      g.fillStyle = '#8A857B';
      g.font = '500 10px Montserrat, Arial, sans-serif';
      g.textBaseline = 'alphabetic';
      g.textAlign = 'left';
      g.fillText('FIRST TRACK', pad, h - 12);
      g.textAlign = 'right';
      g.fillText('LAST TRACK', w - pad, h - 12);
      g.textAlign = 'left';
      g.fillText('ENERGY', pad, 16);

      if (visible && !still) raf = requestAnimationFrame(draw);
    };

    drawRef.current = draw;
    const resize = () => {
      if (still) draw(0);
    };
    window.addEventListener('resize', resize);
    draw(0);

    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        const was = visible;
        visible = entries[0].isIntersecting;
        if (visible && !was && !still) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        }
      });
      io.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      visible = false;
      window.removeEventListener('resize', resize);
      if (io) io.disconnect();
    };
  }, []);

  const slot = SLOTS[cur];

  const requestSlot = () => {
    onPickSlot(slot.k);
    const book = document.getElementById('book');
    if (book) book.scrollIntoView({ behavior: still ? 'auto' : 'smooth' });
    toast(slot.k + ' slot added to your request');
  };

  return (
    <section id="journey">
      <div className="wrap">
        <SectionHead eyebrow="The room and the hour" title="Pick the hour. See the journey.">
          <p>Every set is built for its slot. Move the dial through the night to see how ZENTI reads each one.</p>
        </SectionHead>

        <div className="jr" style={{ '--hue': slot.c }}>
          <div className="jr-stage">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="A sketch of the energy arc of the set for the selected hour"
            />
            <div className="dial">
              <label className="caps" htmlFor="jr-range" style={{ color: 'var(--bone-mute)' }}>
                Hour of the night
              </label>
              <input
                id="jr-range"
                type="range"
                min="0"
                max={SLOTS.length - 1}
                step="1"
                value={cur}
                aria-valuetext={slot.k}
                onChange={(e) => setCur(Number(e.target.value))}
              />
              <div className="ticks">
                {SLOTS.map((s, i) => (
                  <button
                    key={s.k}
                    type="button"
                    aria-pressed={i === cur}
                    onClick={() => setCur(i)}
                  >
                    {s.k}
                  </button>
                ))}
              </div>
            </div>
            <small>A sketch of the arc, energy over the length of the set. Not a setlist.</small>
          </div>

          <div className="jr-info" aria-live="polite">
            <p className="caps">{slot.k}</p>
            <h3>{slot.t}</h3>
            <p>{slot.d}</p>
            <ul className="jr-tags">
              {slot.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p className="proof">{slot.proof}</p>
            <button className="btn" type="button" onClick={requestSlot}>
              Request this slot
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
