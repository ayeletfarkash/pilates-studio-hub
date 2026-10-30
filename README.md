# Pilates Studio Hub

Hebrew (RTL) landing page for a Pilates studio offering Reformer and Mat classes. The landing page is the first milestone of the app described in `SPEC.md`.

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, lucide-react.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Checks

```bash
npm run lint
npm run typecheck  # generates Next route types, then runs tsc
npm run build
```

## Structure

- `src/app/` — root layout (`lang="he" dir="rtl"`, fonts) and the landing page.
- `src/components/landing/` — page sections (header, hero, classes, why us, CTA, footer).
- `src/components/ui/button-link.tsx` — shared link-styled button.
- `src/content/landing.ts` — all Hebrew copy and placeholder data.
- `public/images/` — photos from [Unsplash](https://unsplash.com) (Unsplash License).

## Current limitations

The page is static. It has no booking, authentication, or backend. The "Book a Class" buttons scroll within the page, and the contact details and social links are placeholders.
