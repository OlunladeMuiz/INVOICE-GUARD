# Invoice Guard

Responsive invoice management app for the Frontend Wizards Stage 2 challenge.

## Setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Architecture

- React + TypeScript + Vite
- Local state with `useState`
- Persistent invoice and theme data in `localStorage`
- Custom path-based navigation for `/` and `/invoice/:id`
- Single source of truth for invoice types, seed data, and helpers in `src/`

Key files:

- [App](./src/App.tsx)
- [Types](./src/types.ts)
- [Seed data](./src/data.ts)
- [Helpers](./src/utils.ts)
- [Persistence](./src/storage.ts)
- [Styles](./src/App.css)

## Trade-Offs

- `localStorage` was chosen over a backend to keep the project fast, reliable, and fully offline-friendly for the deadline.
- The invoice detail route is handled client-side, with a Vercel rewrite to keep direct links working on deployment.
- The invoice form uses a custom drawer instead of a separate library so the UI matches the brief more closely and avoids extra dependencies.

## Accessibility Notes

- Semantic headings, buttons, labels, and landmarks
- Form errors are shown inline with visual invalid states
- Delete modal traps focus and closes with `Escape`
- Interactive controls remain keyboard navigable
- Color contrast and status colors were tuned for light and dark themes

## Improvements Beyond Requirements

- Persistent theme toggle
- Path-based navigation with a production rewrite
- Clean TypeScript domain model for invoices and form values
- Reusable helpers for currency, dates, validation, and invoice creation
- Responsive shell with a fixed desktop sidebar and mobile header

## Deployment

- Live URL: _add your deployed Vercel or Netlify URL here_
- Repo: _add your GitHub repo URL here_
