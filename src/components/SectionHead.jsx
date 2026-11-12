import { useEffect, useRef } from 'react';
import { still } from '../lib/util.js';

/* A section heading that slides up the first time it scrolls into view. */
export default function SectionHead({ eyebrow, title, children, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (still || !el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('seen');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="head" ref={ref} style={style}>
      {eyebrow && <p className="caps eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children}
    </div>
  );
}
