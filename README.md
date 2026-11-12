# ZENTI Press Kit

The ZENTI electronic press kit — bio, experience, mixes, four streaming originals,
press photos, technical rider and a booking form. Built with Vite and React.

## Deploy to Vercel

Any one of these works. The project ships with `vercel.json`, so Vercel needs no
setup in its dashboard.

**From the Vercel website (no tools to install)**

1. Go to vercel.com/new.
2. Drag this project folder in, or connect the Git repository it lives in.
3. Vercel reads `vercel.json`, runs `npm install` and `npm run build`, and serves `dist`.
4. Add your domain under the project's **Domains** tab.

**From the terminal**

```bash
npm install -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

A pre-built `dist` folder is included, so you can also upload `dist` on its own to
any static host.

## Turn on the booking inbox

The booking form posts to `api/booking.js`, a serverless function that emails the
inquiry to you through [Resend](https://resend.com). Until you add the key below,
the form falls back to handing the message to the visitor's own mail app, so the
page works either way.

1. Create a free Resend account and copy an API key.
2. In Vercel: **Project → Settings → Environment Variables**, add

   | Name | Value |
   | --- | --- |
   | `RESEND_API_KEY` | the key from Resend |
   | `BOOKING_TO` | optional. Where inquiries land. Defaults to `zentimusic@gmail.com` |
   | `BOOKING_FROM` | optional. The From address, e.g. `ZENTI <booking@yourdomain.com>` |

3. Redeploy. Environment variables only reach a new build.

`BOOKING_FROM` has to be on a domain you have verified with Resend. Until you verify
one, leave it unset: the function sends from Resend's `onboarding@resend.dev`, which
can only deliver to your own Resend account address. Verifying your domain takes a
few DNS records and lets mail arrive from your own name.

Each inquiry arrives with the sender's address as **reply-to**, so answering it in
your mail app goes straight back to the booker. A hidden field in the form catches
most bots.

## Working on it

```bash
npm install      # once
npm run dev      # local preview at http://localhost:5173, updates as you edit
npm run build    # writes the deployable site to dist/
npm run preview  # serves the built dist/ folder to check it before deploying
```

Use `npm run preview` rather than opening `dist/index.html` directly: browsers block
ES modules on `file://`, and audio seeking needs a real server.

## Where things are

| Path | What it holds |
| --- | --- |
| `src/content.js` | **All wording and data.** Bio, mixes, tracks, releases, flyers, experience list, rider, contact details. Edit here first. |
| `src/waveforms.js` | Amplitude readings for each track's waveform, taken from the masters. |
| `src/styles.css` | Every style. Colours and fonts are the CSS variables in `:root` at the top. |
| `src/components/` | One file per section of the page. |
| `src/lib/usePlayer.js` | The audio player: one `<audio>` shared by the track list and the bar at the foot of the page. |
| `public/img/` | Photos, flyers and release covers. |
| `public/audio/` | The four original tracks as MP3. |
| `api/booking.js` | Serverless function that emails booking inquiries to you. |
| `index.html` | Page title, description and the social preview tags. |
| `vercel.json` | Vercel build settings and cache headers. |
| `public/_headers` | Cache headers for Cloudflare Pages. Vercel ignores this file; it is here so the project can deploy to either host. |

To change a photo, drop the new file into `public/img/` and point `src/content.js` at it.
To add a track, add the MP3 to `public/audio/`, add its waveform to `src/waveforms.js`,
and add an entry to `TRACKS` in `src/content.js`.

## Notes

- Audio does not download until a visitor presses play. Once playing, the bar at the
  foot of the page keeps the track going as they scroll, and rolls on to the next one.
- The booking form emails you directly once `RESEND_API_KEY` is set, and falls back to
  the visitor's own mail app if it isn't. See "Turn on the booking inbox" above.
- The mix cards link out to SoundCloud. Their players can be embedded now that the
  site is on its own domain, if you would rather host the full sets in the page.
- `base` is `./` in `vite.config.js`, so the built site works at a domain root or in
  a subfolder.
