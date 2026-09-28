# Tariff Impact India

A structured frontend documenting the **US tariff measures on Indian goods**
(April 2025 – September 2026): the chronology, the consequences for India, and
how New Delhi responded — extended to the state and cluster level, the
macroeconomy, the international response, and a forward view.

Static HTML, CSS and JavaScript. **No build step, no package manager, no
framework, no network dependencies.**

## Run it

Open `index.html` in a browser. That's it.

To serve over HTTP instead (recommended, so relative paths and caching behave
predictably):

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Pages

| File | Purpose |
|---|---|
| `index.html` | Overview landing page — headline figures, the rate chart, what happened, the bill, sector snapshot, routing to the deep pages, open questions |
| `timeline.html` | Full dated chronology, filterable by event type, plus a table view and the unchanged Section 232 duties |
| `impact.html` | Consequences — macro impact, exposure, sector effects, loss of competitiveness, trade performance, second-order effects |
| `response.html` | India's four response tracks — legal, negotiating, domestic support, diversification — plus an assessment |
| `sectors.html` | Sector deep-dive for six export lines, with metrics and current status, plus a short glossary |
| `regions.html` | State and cluster level — textile export values, MSME closures, jobs affected, and five cluster case studies |
| `economy.html` | Bilateral trade flows, diversification, the rupee, RBI intervention, equity markets, and the employment effect |
| `global.html` | Other countries' responses — rare earths, the EU car tariff, the apparel sourcing shift, transshipment allegations |
| `outlook.html` | Four forward scenarios, the 2025-26 trade agreements, what to watch, and the unresolved questions |
| `glossary.html` | Every statute, scheme and abbreviation, searchable and filterable |
| `data.html` | Data explorer — every chart and table in one place |
| `sources.html` | Full source list, methodology, conventions, known gaps |
| `about.html` | About the project, how it is built, editorial approach |

## File layout

```
tariff-impact/
├── index.html          Overview
├── timeline.html       Chronology
├── impact.html         Impact & consequences
├── response.html       India's response
├── sectors.html        Sector deep-dive
├── regions.html        Regions & export clusters
├── economy.html        Economy, currency & jobs
├── global.html         Global context
├── outlook.html        Outlook & scenarios
├── glossary.html       Glossary
├── data.html           Data explorer
├── sources.html        Sources & methodology
├── about.html          About
├── css/
│   └── styles.css      Design system + all components (one file)
└── js/
    ├── data.js         THE DATA MODEL — edit only this to update the site
    ├── charts.js       Dependency-free SVG chart library
    └── main.js         Page behaviour + data-to-DOM renderers
```

## Architecture

**`js/data.js` is the single source of truth.** Every chronology entry, sector,
trade figure, estimate, glossary term and source lives there. No content is
hardcoded in the HTML beyond prose and headings.

**Pages stay declarative.** Anything needing JavaScript is marked up with a
mount point:

```html
<div data-render="rate-chart"></div>
```

`main.js` keeps a registry of named renderers and fills each mount point on
load. Adding a new chart to a page means adding one attribute — no page-specific
script tags. Each renderer is wrapped in a `try/catch` so one failing chart can
never blank a page.

**Charts are hand-rolled SVG** with a `viewBox`, so they scale to any container
width without a rasterised fallback and without a charting dependency. Ten
renderer types ship in `charts.js`:

`rateTimeline` · `barChart` · `groupedBarChart` · `horizontalBarChart` ·
`donutChart` · `rangeChart` · `splitBar` · `lineChart` · `scatterChart` ·
`divergingBarChart`

Chart colours are declared once in the `PALETTE` map and resolved to CSS custom
properties at render time, so every chart follows the active theme
(light / dark / system) without duplicating the palette.

**Page behaviour** in `main.js`: mobile navigation, scroll reveals, animated
counters, table-of-contents scrollspy, a light/dark/system theme toggle
persisted in `localStorage`, glossary search, and generic filter groups driven by
`data-filter-group` / `data-filter-target` / `data-tags`.

## Updating the content

Edit `js/data.js`. Nothing else needs to change — the chronology, sector pages,
charts, tables, counters, source list and methodology all read from that model.

**Add a chronology entry** — append to the `timeline` array. The chart, the
filterable timeline and the table all pick it up automatically. Dates must be ISO
and ascending; the chart maps them onto an x-axis.

```js
{
  date: '2026-11-01',            // ISO, ascending
  display: '1 Nov 2026',         // human label; may include a range ("27 Aug 2025 - 6 Feb 2026")
  title: 'Event headline',
  rate: 12,                      // additional duty in %, or null if not a rate change
  kind: 'escalation',            // escalation | relief | legal | negotiation | domestic | threat
  summary: 'One or two sentences.',
  detail: 'Optional deeper context.'
}
```

The chronology derives the displayed year from `date`, never from `display`, so
the year column always lines up and always reflects the real date.

**Add a sector** — append to the `sectors` array. Give it a unique `id`; the
page anchor and the filter tag are derived from it.

**Add a source** — append to the `sources` array with `publisher`, `title`,
`date`, `kind` and `url`. The sources page groups them by `kind` automatically.

## Editorial rules encoded here

1. **No number without a source.** Every figure traces to published reporting, an
   official release, a gazette notification or a named research note.
2. **Show disagreement.** Where institutions conflict, the range is presented
   rather than reconciled into false precision.
3. **Separate mechanism from outcome.** Headline rate, tariff incidence and
   exporter incidence are three different numbers and are not blurred.
4. **Report rates precisely.** All rates are *additional* duties on top of
   standard MFN rates, unless stated otherwise.

## Accessibility

- Semantic landmarks, one `<h1>` per page, skip link to main content
- ARIA labels on every chart; `aria-pressed` on filter toggles; `aria-current` on nav
- Colour is never the sole carrier of meaning — severity and event types pair
  colour with a text label
- `prefers-reduced-motion` disables scroll reveals and counter animation
- Responsive from 1180px down to 360px, with a print stylesheet
- Visible `:focus-visible` outlines

## Scope and limitations

- Covers US tariff measures on Indian goods, 2 Apr 2025 – 28 Sep 2026
- **Services exports are outside tariff scope** and appear only where they affect
  the external balance
- **Section 232 duties are separate** — they apply to all US trading partners and
  were not changed by this episode
- The **textile MSME closure window (Apr 2023 – Mar 2026) predates most of the
  tariff episode**, so closure counts measure sector fragility rather than a
  tariff death toll
- FY26 state export figures cover a **textile and apparel basket only**, so
  states with large service or pharmaceutical exports are not represented
- No sector-level employment data exists disaggregated by tariff exposure
- Exporter-level incidence cannot be separated from lost volume
- Product-level exemptions changed repeatedly, so sector effective rates are
  indicative rather than precise
- **Scenario weights in `outlook.html` are editorial judgement, not forecasts**,
  and the two external-shock futures overlap with the reset scenario, so the
  weights deliberately do not sum to 100
- Agreement "projected effect" figures are negotiating estimates, not observed
  outcomes
- Oil, freight and the West Asia conflict confound most 2026 sector and currency
  movements and are flagged where relevant
- Tariff policy was subject to litigation and appeal throughout

This is an independent informational project. It is **not** affiliated with,
endorsed by, or representing the Government of India, the US administration, the
WTO, or any of the trade bodies and research institutions cited. Nothing here is
investment, trade or legal advice.
