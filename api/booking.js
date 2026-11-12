/* Vercel Serverless Function: POST /api/booking
 *
 * Sends a booking inquiry to Thomas's inbox through Resend.
 *
 * Environment variables (set these in the Vercel dashboard):
 *   RESEND_API_KEY  required — from resend.com
 *   BOOKING_TO      optional — where inquiries land, defaults below
 *   BOOKING_FROM    optional — the From address. Must be on a domain verified
 *                              with Resend. Until you verify one, Resend's
 *                              onboarding@resend.dev works for mail sent to
 *                              your own account address.
 *
 * If RESEND_API_KEY is missing the function answers 503 and the booking form
 * falls back to handing the message to the visitor's own mail app, so the page
 * keeps working either way.
 */

const TO = process.env.BOOKING_TO || 'zentimusic@gmail.com';
const FROM = process.env.BOOKING_FROM || 'ZENTI Press Kit <onboarding@resend.dev>';
const MAX = 4000;

const clean = (v) => (typeof v === 'string' ? v.trim().slice(0, MAX) : '');
const looksLikeEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const escapeHtml = (v) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Use POST.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ ok: false, error: 'That request could not be read.' });
    }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'That request could not be read.' });
  }

  /* Hidden field no person fills in. Answer 200 so bots learn nothing. */
  if (clean(body.company)) return res.status(200).json({ ok: true });

  const email = clean(body.email);
  if (!looksLikeEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Please add an email address we can reply to.' });
  }

  const name = clean(body.name);
  const fields = [
    ['Name', name],
    ['Email', email],
    ['Event or venue', clean(body.event)],
    ['Date', clean(body.date)],
    ['City', clean(body.city)],
    ['Slot', clean(body.slot)],
    ['Type', clean(body.type)],
    ['Set length', clean(body.length)]
  ].filter((f) => f[1]);

  const note = clean(body.message);
  const text =
    'New booking inquiry from the ZENTI press kit.\n\n' +
    fields.map((f) => f[0] + ': ' + f[1]).join('\n') +
    (note ? '\n\nMessage:\n' + note : '') +
    '\n\nReply to this email to answer ' + (name || email) + ' directly.';

  const html =
    '<h2 style="font:600 18px system-ui,sans-serif;margin:0 0 14px">New booking inquiry</h2>' +
    '<table style="font:14px/1.6 system-ui,sans-serif;border-collapse:collapse">' +
    fields
      .map(
        (f) =>
          '<tr><td style="padding:3px 16px 3px 0;color:#666;white-space:nowrap">' +
          escapeHtml(f[0]) +
          '</td><td style="padding:3px 0"><strong>' +
          escapeHtml(f[1]) +
          '</strong></td></tr>'
      )
      .join('') +
    '</table>' +
    (note
      ? '<p style="font:14px/1.6 system-ui,sans-serif;margin:16px 0 0;white-space:pre-wrap">' +
        escapeHtml(note) +
        '</p>'
      : '');

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return res
      .status(503)
      .json({ ok: false, error: 'Email sending is not configured on this deployment yet.' });
  }

  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: name ? `${name} <${email}>` : email,
        subject: 'ZENTI booking inquiry' + (clean(body.event) ? ': ' + clean(body.event) : ''),
        text,
        html
      })
    });

    if (!sent.ok) {
      const detail = await sent.text();
      console.error('Resend rejected the message:', sent.status, detail);
      return res.status(502).json({ ok: false, error: 'The message could not be sent just now.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Booking send failed:', err);
    return res.status(502).json({ ok: false, error: 'The message could not be sent just now.' });
  }
}
