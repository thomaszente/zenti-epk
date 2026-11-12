import { useEffect, useRef } from 'react';
import { still } from '../lib/util.js';
import { HERO, FACTS } from '../content.js';

/* Drifting points of light that link into constellations near the cursor. */
function useSky(heroRef, canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const g = canvas.getContext('2d');
    let points = [];
    let w = 0;
    let h = 0;
    let mx = -999;
    let my = -999;
    let visible = true;
    let raf = 0;

    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = w * d;
      canvas.height = h * d;
      g.setTransform(d, 0, 0, d, 0, 0);
      const n = w < 700 ? 45 : 110;
      points = [];
      for (let i = 0; i < n; i++) {
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.3 + 0.4,
          p: Math.random() * 6.28
        });
      }
    };

    const frame = (t) => {
      g.clearRect(0, 0, w, h);
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        if (!still) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0) a.x = w;
          if (a.x > w) a.x = 0;
          if (a.y < 0) a.y = h;
          if (a.y > h) a.y = 0;
        }
        const twinkle = 0.35 + 0.35 * Math.sin(t / 900 + a.p);
        g.fillStyle = 'rgba(241,237,228,' + twinkle + ')';
        g.beginPath();
        g.arc(a.x, a.y, a.r, 0, 6.28);
        g.fill();

        const dx = a.x - mx;
        const dy = a.y - my;
        const dm = Math.sqrt(dx * dx + dy * dy);
        if (dm < 190) {
          g.strokeStyle = 'rgba(224,164,106,' + 0.55 * (1 - dm / 190) + ')';
          g.lineWidth = 1;
          g.beginPath();
          g.moveTo(a.x, a.y);
          g.lineTo(mx, my);
          g.stroke();
          for (let j = i + 1; j < points.length; j++) {
            const b = points[j];
            const ex = a.x - b.x;
            const ey = a.y - b.y;
            const e = Math.sqrt(ex * ex + ey * ey);
            if (e < 120 && Math.abs(b.x - mx) < 190 && Math.abs(b.y - my) < 190) {
              g.strokeStyle = 'rgba(224,164,106,' + 0.35 * (1 - e / 120) + ')';
              g.beginPath();
              g.moveTo(a.x, a.y);
              g.lineTo(b.x, b.y);
              g.stroke();
            }
          }
        }
      }
      if (visible && !still) raf = requestAnimationFrame(frame);
    };

    const move = (e) => {
      const r = hero.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      if (still) frame(0);
    };
    const leave = () => {
      mx = -999;
      my = -999;
      if (still) frame(0);
    };
    const resize = () => {
      size();
      if (still) frame(0);
    };

    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', leave);
    window.addEventListener('resize', resize);
    size();
    frame(0);

    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        const was = visible;
        visible = entries[0].isIntersecting;
        if (visible && !was && !still) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(frame);
        }
      });
      io.observe(hero);
    }

    return () => {
      cancelAnimationFrame(raf);
      visible = false;
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
      window.removeEventListener('resize', resize);
      if (io) io.disconnect();
    };
  }, [heroRef, canvasRef]);
}

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  useSky(heroRef, canvasRef);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <img src={HERO.image} alt={HERO.imageAlt} />
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="wrap">
        <p className="caps kit">{HERO.kicker}</p>
        <h1>
          <img src="img/zenti-logo.png" alt="ZENTI" width="250" height="96" />
        </h1>
        <p className="dmm">{HERO.headline}</p>
        <p className="tag">{HERO.tagline}</p>
        <div className="cta">
          <a className="btn solid" href="#book">Check a date</a>
          <a className="btn ghost" href="#journey">Shape the journey</a>
        </div>
      </div>
      <div className="facts">
        {FACTS.map((f) => (
          <div key={f.label}>
            <span>{f.label}</span>
            <b>{f.value}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
