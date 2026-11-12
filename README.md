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
| `api/booking.mjs` | Serverless function that emails booking inquiries (see below). |
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

The form posts to `api/booking.mjs`, a Vercel Serverless Function that emails
the inquiry through [Resend](https://resend.com), with the sender's address as
reply-to. A hidden field catches most bots.

Set `RESEND_API_KEY` under the Vercel project's Environment Variables to switch
it on, then redeploy — environment variables only reach a new build. Until that
key is set the function answers 503 and the form falls back to handing the
message to the visitor's own mail app, so the page works either way.

Optional variables: `BOOKING_TO` (defaults to `zentimusic@gmail.com`) and
`BOOKING_FROM`, which must be on a domain verified with Resend. Until you verify
one, leave it unset and Resend sends from its own address, which can only
deliver to your Resend account address.

The file is `.mjs` rather than `.js` so Vercel reads it as an ES module; there
is no `package.json` in this repository to declare that.

Never commit credentials or `.env` files. This repository is public.
