import { useState } from 'react';
import { copyText } from '../lib/util.js';
import { CONTACT, BOOKING_OPTIONS } from '../content.js';

const EMPTY = {
  name: '',
  event: '',
  date: '',
  city: '',
  type: BOOKING_OPTIONS.types[0],
  length: '2 hours',
  message: ''
};

export default function Booking({ slot, setSlot }) {
  const [form, setForm] = useState(EMPTY);
  const [output, setOutput] = useState('');

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const build = (e) => {
    e.preventDefault();
    let date = '';
    if (form.date) {
      const p = form.date.split('-');
      date = new Date(+p[0], p[1] - 1, +p[2]).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
    const rows = [
      ['Event', form.event.trim()],
      ['Date', date],
      ['City', form.city.trim()],
      ['Type', form.type],
      ['Slot', slot === 'Not sure yet' ? '' : slot],
      ['Set length', form.length]
    ]
      .filter((r) => r[1])
      .map((r) => r[0] + ': ' + r[1])
      .join('\n');

    const msg =
      'Hi Thomas,\n\nI’d like to book ZENTI.\n\n' +
      rows +
      (form.message.trim() ? '\n\n' + form.message.trim() : '') +
      (form.name.trim() ? '\n\n' + form.name.trim() : '');
    setOutput(msg);
  };

  const mailto =
    'mailto:' +
    CONTACT.email +
    '?subject=' +
    encodeURIComponent('ZENTI booking inquiry' + (form.event.trim() ? ': ' + form.event.trim() : '')) +
    '&body=' +
    encodeURIComponent(output);

  return (
    <section id="book">
      <div className="wrap book">
        <div>
          <p className="caps eyebrow">Booking</p>
          <h2>Let’s make magic.</h2>
          <div className="direct">
            <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>
            <a href={CONTACT.instagram}>{CONTACT.instagramHandle}</a>
            <a href={CONTACT.cosmotion}>{CONTACT.cosmotionHandle}</a>
            <span>{CONTACT.basedLine}</span>
          </div>
        </div>

        <div>
          <form onSubmit={build} noValidate>
            <div className="row2">
              <div className="field">
                <label htmlFor="b-name">Your name</label>
                <input id="b-name" autoComplete="name" value={form.name} onChange={set('name')} />
              </div>
              <div className="field">
                <label htmlFor="b-ev">Event or venue</label>
                <input id="b-ev" value={form.event} onChange={set('event')} />
              </div>
            </div>

            <div className="row2">
              <div className="field">
                <label htmlFor="b-date">Date</label>
                <input id="b-date" type="date" value={form.date} onChange={set('date')} />
              </div>
              <div className="field">
                <label htmlFor="b-city">City</label>
                <input id="b-city" value={form.city} onChange={set('city')} />
              </div>
            </div>

            <div className="row3">
              <div className="field">
                <label htmlFor="b-slot">Slot</label>
                <select id="b-slot" value={slot} onChange={(e) => setSlot(e.target.value)}>
                  {BOOKING_OPTIONS.slots.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="b-type">Type of booking</label>
                <select id="b-type" value={form.type} onChange={set('type')}>
                  {BOOKING_OPTIONS.types.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="b-len">Set length</label>
                <select id="b-len" value={form.length} onChange={set('length')}>
                  {BOOKING_OPTIONS.lengths.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="b-msg">Lineup, capacity, anything else</label>
              <textarea id="b-msg" value={form.message} onChange={set('message')} />
            </div>

            <button className="btn solid" type="submit" style={{ alignSelf: 'flex-start' }}>
              Prepare booking request
            </button>

            <div className={'out' + (output ? ' show' : '')} role="status" aria-live="polite">
              <pre>{output}</pre>
              <div className="acts">
                <button
                  className="btn ghost sm"
                  type="button"
                  onClick={() => copyText(output, 'Message copied')}
                >
                  Copy message
                </button>
                <a className="btn ghost sm" href={mailto}>Open in email</a>
              </div>
              <small>
                This page cannot send email itself. Copy the message, or open it in your mail app,
                and send it to {CONTACT.email}.
              </small>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
