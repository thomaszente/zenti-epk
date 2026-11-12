import { copyText, glowProps } from '../lib/util.js';
import SectionHead from './SectionHead.jsx';
import { RIDER, RIDER_TEXT } from '../content.js';

export default function Rider() {
  return (
    <section id="rider">
      <div className="wrap">
        <SectionHead eyebrow="Technical rider · DJ set" title="What the booth needs." />
        <div className="rider">
          {RIDER.map((r) => (
            <div className="glow" key={r.h} {...glowProps()}>
              <h3>{r.h}</h3>
              <b>{r.b}</b>
              <span>{r.s}</span>
            </div>
          ))}
        </div>
        <p className="note">
          <span>Different gear on site? Say so in your inquiry and we will make it work. Fee on request.</span>
          <button
            className="btn ghost sm"
            type="button"
            onClick={() => copyText(RIDER_TEXT, 'Rider copied')}
          >
            Copy rider
          </button>
        </p>
      </div>
    </section>
  );
}
