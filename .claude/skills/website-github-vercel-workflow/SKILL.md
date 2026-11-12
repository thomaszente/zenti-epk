---
name: website-github-vercel-workflow
description: Ship a change to the ZENTI press kit site (thomaszente/zenti-epk on Vercel) - branch, implement, build, PR, preview, checks, squash-merge, production. Use for implementation requests, not questions.
---

# Website update workflow

Ships a change to the ZENTI press kit from implementation through production.

## When this applies

Apply when Thomas asks for a **change to the live site**: new copy, a new track,
a design tweak, a bug fix, a new section.

Do **not** apply — answer normally, publish nothing, open no PR — when he is
asking a question, weighing an idea, reviewing options, or asking how something
works. "Should we add X?" is a discussion. "Add X" is a change.

If he says **preview only**, do everything up to and including the preview URL,
then stop with the PR open.

## The project

| | |
| --- | --- |
| Repository | `thomaszente/zenti-epk` (public) |
| Production branch | `main` |
| Vercel team | `ZENTI` (slug `zenti3`, id `team_KL3h3uTgHlGjoho59lca1sez`) |
| Vercel project | `zenti-epk` |
| Framework | Vite + React 18 |
| Root directory | repository root |
| Install | `npm ci` |
| Build check | `npm run build` |
| Output | `dist` |

No lint or test suite exists. `npm run build` is the check, run in CI by
`.github/workflows/build.yml`. If a lint or test script is added later, run it
too and add it to that workflow.

### Where things live

- `src/content.js` — all wording and data: bio, mixes, tracks, releases, flyers,
  experience list, rider, contact. Most content changes are this file alone.
- `src/waveforms.js` — amplitude readings per track.
- `src/styles.css` — all styling; colours and fonts are the `:root` variables.
- `src/components/` — one file per section.
- `src/lib/usePlayer.js` — the audio player shared by the track list and the bar.
- `public/img/`, `public/audio/` — assets, copied to `dist/` untouched.
- `api/booking.js` — serverless function emailing booking inquiries via Resend.
- `vercel.json` — build settings and cache headers.

## Before starting

Confirm write access actually exists. Pushing needs the Claude GitHub App
installed for `thomaszente/zenti-epk`; creating deployments needs Vercel
connector write scope. If either is missing, say exactly which one and stop —
do not improvise around it by sending files to copy by hand unless he asks.

## Steps

1. **Start from main.** Fetch and branch: `git checkout -b <short-kebab-name>`.
2. **Implement.** Keep the existing design language. Prefer editing
   `src/content.js` over hard-coding content into components.
3. **Check.** `npm ci && npm run build`. Fix anything that fails before going on.
4. **Commit and push** the branch.
5. **Open a PR** against `main` with a description of what changed and why.
6. **Get the preview.** Wait for the Vercel preview deployment for the PR's
   **latest commit** to reach `READY`. Give him the clickable URL.
7. **Verify.** Confirm the required checks passed for that same commit. When
   browser tools are available, open the preview and look at the pages that
   changed. Missing, pending, failed, or canceled checks are not passes.
8. **Fix failures** before merging, and re-verify against the new commit.
9. **Squash-merge** once everything passes. Do not bypass repository rules.
10. **Verify production.** Confirm the production deployment on Vercel
    corresponds to the merge commit and reached `READY`.

Audio and image files are large; when adding a track, add the MP3 to
`public/audio/`, its waveform to `src/waveforms.js`, and its entry to `TRACKS`
in `src/content.js`.

## Report back

End every completed change with these five, using real URLs retrieved from
GitHub and Vercel — never constructed by hand:

- **Preview:** the Vercel preview URL for this update
- **Live website:** the production URL, with deployment status
- **Pull request:** the PR URL and merge status
- **Checks:** one line on what passed
- **Changes:** a brief plain-language summary

If a deployment fails, give the deployment or log URL and explain the blocker.
Never report success for a deployment that did not reach `READY`.

## Secrets

The repository is public. Never commit credentials or `.env` files.
`RESEND_API_KEY`, `BOOKING_TO` and `BOOKING_FROM` live in Vercel's environment
variables, not in the repository. Environment variable changes only take effect
on a new deployment.

---

This file is a reference copy. The installed version lives in Claude under
Customize → Skills.
