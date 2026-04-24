# Invoice Guard

Responsive invoice management app for the Frontend Wizards Stage 2 challenge.

## Overview

Invoice Guard is a fully client-side invoice manager with:

- Invoice list and invoice detail views
- Create and edit flow in a custom drawer
- Delete confirmation modal
- Status filtering on the list page
- Mark as paid action for pending invoices
- Light and dark theme persistence
- Local persistence for invoices and theme settings
- Direct-link support for `/invoice/:id` with not-found fallback

## Setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - type-check and build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally

## Architecture

- React + TypeScript + Vite
- App state lives in `src/app/App.tsx` and is managed with React hooks
- Invoice and theme data persist in `localStorage`
- Navigation is handled by a small custom router in `src/app/router.tsx`
- The source is organized into `app`, `components`, `pages`, `data`, `types`, `utils`, and `styles`

## Key Files

- [App shell](./src/app/App.tsx)
- [Router](./src/app/router.tsx)
- [Invoice list page](./src/pages/InvoiceListPage.tsx)
- [Invoice detail page](./src/pages/InvoiceDetailPage.tsx)
- [Invoice form drawer](./src/components/invoice/InvoiceFormDrawer.tsx)
- [Invoice types](./src/types/invoice.ts)
- [Seed data](./src/data/seedInvoices.ts)
- [Invoice helpers](./src/utils/invoice.ts)
- [Validation helpers](./src/utils/validation.ts)
- [Storage helpers](./src/utils/storage.ts)
- [Base styles](./src/App.css)

## Trade-Offs

- `localStorage` was chosen over a backend to keep the project fast, offline-friendly, and simple for the challenge deadline.
- The invoice detail route is handled client-side, with a Vercel rewrite so direct links work after deployment.
- The invoice form uses a custom drawer instead of a third-party form package so the UI stays close to the brief and avoids extra dependencies.

## Accessibility Notes

- Semantic headings, buttons, labels, and landmarks
- Form errors are shown inline with visual invalid states
- Delete modal traps focus and closes with `Escape`
- Interactive controls remain keyboard navigable
- Color contrast and status colors were tuned for light and dark themes

## Improvements Beyond Requirements

- Persistent theme toggle
- Clean TypeScript domain model for invoices and form values
- Reusable helpers for currency, dates, validation, and invoice creation
- Responsive shell with a fixed desktop sidebar and mobile header

## Deployment

- Live URL: _add your deployed Vercel or Netlify URL here_
- Repo: _add your GitHub repo URL here_
