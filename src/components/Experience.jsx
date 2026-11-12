import { useMemo, useState } from 'react';
import { glowProps } from '../lib/util.js';
import SectionHead from './SectionHead.jsx';
import { EXPERIENCE, CITY_ALIASES, MARQUEE, FLYERS } from '../content.js';

const CHIPS = [{ id: 'all', label: 'All' }].concat(
  EXPERIENCE.map((g) => ({ id: g.id, label: g.h }))
);

export default function Experience() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXPERIENCE.filter((g) => filter === 'all' || filter === g.id)
      .map((g) => ({
        ...g,
        hits: g.n.filter((entry) => {
          if (!q) return true;
          const tag = (entry[1] || '').toLowerCase();
          const haystack = (entry[0] + ' ' + tag + ' ' + (CITY_ALIASES[tag] || '')).toLowerCase();
          return haystack.indexOf(q) > -1;
        })
      }))
      .filter((g) => g.hits.length);
  }, [query, filter]);

  return (
    <section id="experience">
      <div className="wrap">
        <SectionHead eyebrow="Experience" title="The rooms, the festivals, the names on the bill.">
          <p>
            Search for a venue, a city or an artist you know. Highlighted names are headliners ZENTI
            has opened for or shared a lineup with.
          </p>
        </SectionHead>

        <div className="marquee">
          {MARQUEE.map((m) => (
            <div className="glow" key={m.name} {...glowProps()}>
              <b>{m.name}</b>
              <span>{m.note}</span>
            </div>
          ))}
        </div>

        <div className="tools">
          <div className="search">
            <label htmlFor="xq">Search the list</label>
            <input
              id="xq"
              type="search"
              placeholder="Try Miami, Kingdom or Monolink"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="chipsbar" role="group" aria-label="Show">
            {CHIPS.map((c) => (
              <button
                key={c.id}
                type="button"
                className="fchip"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          {groups.map((g) => (
            <div className="group" key={g.id}>
              <h3>
                {g.h}
                <small>
                  {query.trim() ? `${g.hits.length} of ${g.n.length}` : `${g.n.length} listed`}
                </small>
              </h3>
              <ul className="names">
                {g.hits.map((entry) => (
                  <li key={entry[0]} className={entry[2] ? 'top' : undefined}>
                    {entry[0]}
                    {entry[1] ? <i>{entry[1]}</i> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {!groups.length && (
            <p className="none">
              No match for “{query.trim()}”. Clear the search to see the full list.
            </p>
          )}
        </div>

        <p className="caps subhead">On the bill</p>
        <div className="flyers">
          {FLYERS.map((f) => (
            <figure key={f.img}>
              <img src={f.img} alt={f.alt} loading="lazy" />
              <figcaption>
                <b>{f.title}</b>
                {f.note}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
