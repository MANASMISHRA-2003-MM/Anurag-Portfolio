# Anurag Shakya — Video Editor & Creative Professional

A standalone React + TypeScript + Vite landing page, retargeted to Anurag Shakya while following the composition and motion language of the current Squarespace homepage.

## Run

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

## Edit your portfolio

Main content:
`src/assets/portfolio.ts`

Local media:
`public/portfolio/`

Hero videos:
`public/hero-videos/`

The hero cycles through the five captured local WebM scenes used in the supplied Squarespace capture:
- plants-desktop.webm
- creative-desktop.webm
- barber-desktop.webm
- tutor-desktop.webm
- wellness-desktop.webm

The runtime hero uses only the local copies. No Squarespace CDN request is needed for the hero.

## Add real project media

Put your files in:
`public/portfolio/images/`
`public/portfolio/videos/`

Then edit the corresponding `projects` entries in:
`src/assets/portfolio.ts`

## Notes

The current design intentionally uses an editorial, media-first landing-page structure: full-viewport hero, animated stats, pill row, large work cards, capability grid, showreel, creator/collaboration context, experience, process, FAQ, and a large closing contact CTA.

The supplied Figma reference could not be inspected because the connected Figma account does not have access to that file. The implementation therefore uses the live Squarespace homepage as the visual reference plus the supplied project.

Third-party/captured media should only be published when you have the right to use it.
