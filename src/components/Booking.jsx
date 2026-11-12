import { useState } from 'react';
import { copyText } from '../lib/util.js';
import { CONTACT, BOOKING_OPTIONS } from '../content.js';

const EMPTY = {
  name: '',
  email: '',
  event: '',
  date: '',
  city: '',
  type: BOOKING_OPTIONS.types[0],
  length: '2 hours',
  message: '',
  company: '' /* honeypot: hidden from people, catnip to bots */
};

export default function Booking({ slot, setSlot }) {
  const [form, setForm] = useState(EMPTY);
  const [output, setOutput] = useState('');
  /* idle · sending · sent · fallback (direct send unavailable, offer copy and mailto) */
  const [state, setState] = useState('idle');
  const [problem, setProblem] = useState('');

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const prettyDate = () => {
    if (!form.date) return '';
    const p = form.date.split('-');
    return new Date(+p[0], p[1] - 1, +p[2]).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const buildMessage = () => {
    const rows = [
      ['Event', form.event.trim()],
      ['Date', prettyDate()],
      ['City', form.city.trim()],
      ['Type', form.type],
      ['Slot', slot === 'Not sure yet' ? '' : slot],
      ['Set length', form.length]
    ]
      .filter((r) => r[1])
      .map((r) => r[0] + ': ' + r[1])
      .join('\n');

    return (
      'Hi Thomas,\n\nI’d like to book ZENTI.\n\n' +
      rows +
      (form.message.trim() ? '\n\n' + form.message.trim() : '') +
      (form.name.trim() ? '\n\n' + form.name.trim() : '') +
      (form.email.trim() ? '\n' + form.email.trim() : '')
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    const msg = buildMessage();
    setOutput(msg);

    const email = form.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setProblem('Please add an email address so Thomas can reply.');
      setState('idle');
      return;
    }
    setProblem('');
    setState('sending');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          email,
          date: prettyDate(),
          slot: slot === 'Not sure yet' ? '' : slot
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState('sent');
        return;
      }
      /* A bad address is worth fixing here; anything else, hand them the message. */
      if (res.status === 400 && data.error) {
        setProblem(data.error);
        setState('idle');
        return;
      }
      setState('fallback');
    } catch (err) {
      setState('fallback');
    }
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
          {state === 'sent' ? (
            <div className="out show" role="status" aria-live="polite">
              <p className="sent">Sent. Thomas has your inquiry and will reply to {form.email.trim()}.</p>
              <div className="acts">
                <button
                  className="btn ghost sm"
                  type="button"
                  onClick={() => {
                    setForm(EMPTY);
                    setOutput('');
                    setState('idle');
                  }}
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="row2">
                <div className="field">
                  <label htmlFor="b-name">Your name</label>
                  <input id="b-name" autoComplete="name" value={form.name} onChange={set('name')} />
                </div>
                <div className="field">
                  <label htmlFor="b-email">Your email</label>
                  <input
                    id="b-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={set('email')}
                  />
                </div>
              </div>

              <div className="row2">
                <div className="field">
                  <label htmlFor="b-ev">Event or venue</label>
                  <input id="b-ev" value={form.event} onChange={set('event')} />
                </div>
                <div className="field">
                  <label htmlFor="b-city">City</label>
                  <input id="b-city" value={form.city} onChange={set('city')} />
                </div>
              </div>

              <div className="row3">
                <div className="field">
                  <label htmlFor="b-date">Date</label>
                  <input id="b-date" type="date" value={form.date} onChange={set('date')} />
                </div>
                <div className="field">
                  <label htmlFor="b-slot">Slot</label>
                  <select id="b-slot" value={slot} onChange={(e) => setSlot(e.target.value)}>
                    {BOOKING_OPTIONS.slots.map((s) => (
                      <option key={s}>{s}</option>
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
                <label htmlFor="b-type">Type of booking</label>
                <select id="b-type" value={form.type} onChange={set('type')}>
                  {BOOKING_OPTIONS.types.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="b-msg">Lineup, capacity, anything else</label>
                <textarea id="b-msg" value={form.message} onChange={set('message')} />
              </div>

              {/* Hidden from people; bots fill it in and get politely ignored. */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="b-co">Company</label>
                <input id="b-co" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} />
              </div>

              <button
                className="btn solid"
                type="submit"
                style={{ alignSelf: 'flex-start' }}
                disabled={state === 'sending'}
              >
                {state === 'sending' ? 'Sending…' : 'Send booking request'}
              </button>

              {problem && (
                <p className="formwarn" role="alert">
                  {problem}
                </p>
              )}

              {state === 'fallback' && (
                <div className="out show" role="status" aria-live="polite">
                  <pre>{output}</pre>
                  <div className="acts">
                    <button
                      className="btn ghost sm"
                      type="button"
                      onClick={() => copyText(output, 'Message copied')}
                    >
                      Copy message
                    </button>
                    <a className="btn ghost sm" href={mailto}>
                      Open in email
                    </a>
                  </div>
                  <small>
                    This page could not send the message itself. Copy it, or open it in your mail
                    app, and send it to {CONTACT.email}.
                  </small>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
