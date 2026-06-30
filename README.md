# Global Crisis & Mitigation

A structural research resource on the **survivability regime** — the synchronized climate, pollution,
water, grid, demographic and institutional pressures of the century — and what remains mitigable.

Built as a fast static site with interactive data visualizations, in an editorial / consulting
aesthetic.

## What's inside

- **Crisis Index (HCPI)** — the Human Century Problem Index: twelve century-scale problems scored
  across six dimensions (Exposure, Urgency, Lock-in, Coupling, Medium, D-gap) and ranked by a
  coupling-weighted composite. Interactive bar + radar dashboard.
- **Dashboards** — interactive heat explorer (air / feels-like / WBGT, °C/°F), extreme-heat-days,
  population-weighted mean temperature, device thermal limits, and regional exposure shares.
- **Digital reports** — long-form analysis: the survivability regime, heat and the human medium, the
  regional outlook, and the long-run trajectory to 3000.
- **Mitigation framework** — five universal levers (Path, Stock, Medium, D, Allocation) applied to
  each Tier I systemic core.
- **Methodology & sources** — how scores and temperature bands are built, with the source register.

## Tech stack

- [Astro](https://astro.build) — static site generation
- [React](https://react.dev) islands for interactive charts
- [Recharts](https://recharts.org) for data visualization
- Hand-built CSS design system (no UI framework)

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # preview the production build
```

## Deployment (Cloudflare Pages)

This site is a static build deployed on Cloudflare Pages.

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Framework preset:** Astro

HTTP headers and redirects are configured in `public/_headers` and `public/_redirects`.

## Data & methodology

All figures are an **analytical synthesis** across published climate, health and development research
(World Bank, IPCC AR6, CMIP6/SSP scenarios, WHO, Lancet Countdown, SALURBAL, and others). HCPI scores
are structured judgments designed to make coupling and functional exposure legible — not measured
quantities with decimal precision. Post-2060 figures are scenario envelopes, not forecasts. See the
[Methodology](https://global-crisis-and-mitigation.pages.dev/methodology/) page for details.

## License

Research synthesis for analytical use. Verify against original sources before operational use.
