import { useState } from 'react';
import { copyText } from '../lib/util.js';
import SectionHead from './SectionHead.jsx';
import { BIO } from '../content.js';

export default function Bio() {
  const [length, setLength] = useState('medium');
  const paragraphs = BIO.text[length];
  const words = paragraphs.join(' ').split(/\s+/).length;

  return (
    <section id="bio">
      <div className="wrap bio">
        <figure>
          <img src={BIO.image} alt={BIO.imageAlt} loading="lazy" />
        </figure>
        <div>
          <SectionHead eyebrow="Bio" title={BIO.heading} style={{ marginBottom: 28 }} />
          <div className="biobar">
            <div className="seg" role="tablist" aria-label="Bio length">
              {BIO.lengths.map((l) => (
                <button
                  key={l.id}
                  role="tab"
                  type="button"
                  aria-selected={length === l.id}
                  onClick={() => setLength(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              className="btn ghost sm"
              type="button"
              onClick={() => copyText(paragraphs.join('\n\n'), 'Bio copied')}
            >
              Copy this bio
            </button>
          </div>
          <div className="biotext" role="tabpanel" aria-live="polite">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="count">
            {words} words. Written in the third person, ready to paste into a lineup page or program.
          </p>
        </div>
      </div>
    </section>
  );
}
