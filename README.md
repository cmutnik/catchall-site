# Stealth page

Single-page static site. No build step, no dependencies — open `index.html`.

## What it is

A pre-launch page for an applied AI research company building a judgment layer,
starting in marketing. Two audiences: research/engineering recruits, and investors.
One email CTA. No company name on the page by design — the name is unsettled, and
shipping nameless keeps that decision open.

## Structure

Everything is in `index.html`: inline CSS, inline SVG, one inline script.
Fonts are Instrument Sans and JetBrains Mono from Google Fonts.

- **Hero** — canvas field of cells completing, with judgment cells left unfilled
- **The gap** — Applied AI / Judgment / AI research, the middle one unclaimed
- **The hinge** — a general model has no priors but the internet's
- **The judgment engine** — context layer and research, plus the loop diagram
- **Per-business fit** — shared structure, local fit
- **Beachhead** — marketing first, then every function
- **Invitation** — researchers and investors, one mailto

## Colour system

Three states, used consistently in the diagram and the build columns:

| State | Token | Meaning |
|---|---|---|
| Solved | `--rule` `#d3d8de` | Largely works today (execution) |
| Being built | `--cool` `#a17c3c` | The context layer — warm bronze, not grey |
| Open | `--brass` `#1b53ff` | The judgment problem — the one signal colour |

Ground is near-white `#fbfbfc`, ink `#0d1117`. Type is Archivo with JetBrains Mono.
The hero and closing canvases draw a contour field — the landscape of possible
strategies — with one committed path traced across it and the chosen point marked.

Alternative treatments explored are kept in `variants/`.

## Before this goes live

- [ ] Replace the placeholder email (`hello@example.com`)
- [ ] Confirm the thesis framing with Alex
- [ ] Decide the name and register a domain
- [ ] Move this repo to the venture's GitHub org

## Password-protected page

`private.html` is encrypted (AES-GCM, PBKDF2 key) and decrypted in the browser, so the
repo can stay public without exposing its content. Write the page in `private-src/index.html`
(gitignored — keep your own copy), then:

    PAGE_PASSWORD='…' node build-private.mjs

and commit `private.html`. Needs HTTPS (or localhost) to decrypt. It's still offline-guessable,
so use a long password.
