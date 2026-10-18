# Bento Feedback

A one-page visualisation of the feedback builders left for **Hack Club Bento** — 34 responses,
categorised into themes, with stats, an interactive globe of where everyone is, and every quote
verbatim.

- 34 responses · 32 builders · 12 countries · 7 themes
- Interactive dotted globe (drag to spin, click a marker to filter the quotes)
- Theme + country filtering across the whole page
- Sentiment ("vibe") read of every response

Review status from the internal board is deliberately **not** included — it's private.

## Assets
Logos and imagery are hotlinked (nothing is vendored) from [hackclub.com/brand](https://hackclub.com/brand),
[bento.hackclub.com](https://bento.hackclub.com) and cdn.hackclub.com — all © Hack Club.
Phantom Sans is loaded from assets.hackclub.com.

## Local
Any static server works, e.g. `python3 -m http.server 4173`.

`gen-land.mjs` + `ne_110m_land.geojson` generate `land.js` (the globe's land dots) — run
`node gen-land.mjs` to regenerate.

Live: https://feedback.navaratne.uk
