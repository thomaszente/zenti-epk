# ZENTI Press Kit

The ZENTI electronic press kit — bio, experience, mixes, four streaming
originals, press photos, technical rider and a booking form.

A static site: one `index.html` with its CSS and JavaScript inline, plus assets.
There is no build step and no dependencies to install.

## Layout

| Path | What it holds |
| --- | --- |
| `index.html` | The whole page: markup, styles and scripts. |
| `img/` | Photos, flyers and release covers. |
| `audio/` | The four original tracks as MP3, each with a `.env.json` waveform. |
| `frames/` | 96 webp stills for the dawn sequence. |
| `video/` | The haze clip and its poster frame. |
| `api/booking.js` | Serverless function that can email booking inquiries (see below). |
| `vercel.json` | Vercel settings: no build, serve from the repository root, cache headers. |
| `netlify.toml` | The equivalent for Netlify, kept so the site can deploy to either host. |
| `scripts/check-assets.py` | Verifies every file the page references is committed. |

## Working on it

Edit `index.html` directly, then preview it over HTTP — not by double-clicking
the file, since the waveform JSON is fetched and audio seeking needs a real
server:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
python3 scripts/check-assets.py # confirms nothing is referenced but missing
```

`scripts/check-assets.py` also runs in CI on every push and pull request.

## Deployment

Vercel deploys `main` automatically. `vercel.json` sets no build command and
serves the repository root, so a push is live within a minute.

## The booking form

The form currently composes a message and hands it to the visitor's mail app.

`api/booking.js` is a Vercel Serverless Function that can email inquiries
straight to the inbox instead, through [Resend](https://resend.com). It is in
the repository but the page does not call it yet. To switch it on, add
`RESEND_API_KEY` under the Vercel project's Environment Variables, redeploy,
and wire the form to POST to `/api/booking`.

Optional variables: `BOOKING_TO` (defaults to `zentimusic@gmail.com`) and
`BOOKING_FROM` (must be a domain verified with Resend).

Never commit credentials or `.env` files. This repository is public.
