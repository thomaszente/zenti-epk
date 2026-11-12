import { useCallback, useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead.jsx';
import { GALLERY, CONTACT } from '../content.js';

export default function Photos() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const lastButton = useRef(null);
  const closeButton = useRef(null);

  const step = useCallback((next) => {
    setIndex((i) => (next + GALLERY.length) % GALLERY.length);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (lastButton.current) lastButton.current.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    if (closeButton.current) closeButton.current.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % GALLERY.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const photo = GALLERY[index];

  return (
    <>
      <section id="photos">
        <div className="wrap">
          <SectionHead eyebrow="Photos" title="Press photos.">
            <p>Select a photo to view it large. For print-resolution files, open the photo folder.</p>
          </SectionHead>

          <div className="gal">
            {GALLERY.map((p, i) => (
              <button
                key={p.img}
                type="button"
                aria-label={'View photo: ' + p.alt}
                onClick={(e) => {
                  lastButton.current = e.currentTarget;
                  setIndex(i);
                  setOpen(true);
                }}
              >
                <img src={p.img} alt={p.alt} loading="lazy" />
              </button>
            ))}
          </div>

          <div className="linkrow">
            <a className="btn ghost sm" href={CONTACT.photoFolder}>Download hi-res photos</a>
            <a className="btn ghost sm" href={CONTACT.instagram}>More on Instagram</a>
          </div>
        </div>
      </section>

      <div
        className={'lb' + (open ? ' open' : '')}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <img src={photo.img} alt={photo.alt} />
        <p>
          {index + 1} / {GALLERY.length} · {photo.alt}
        </p>
        <button className="x" type="button" ref={closeButton} onClick={close}>Close</button>
        <button className="pv" type="button" onClick={() => step(index - 1)}>Previous</button>
        <button className="nx" type="button" onClick={() => step(index + 1)}>Next</button>
      </div>
    </>
  );
}
