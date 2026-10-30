# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Pilates Studio Hub: a web app for a Pilates studio offering Reformer and Mat classes. The full product and technical spec is in `SPEC.md`. Read it before starting a new phase.

## Current status

- Done: static Hebrew landing page (`src/app/page.tsx`).
- Not built yet: authentication, database (Supabase), admin, instructor and member interfaces, booking, memberships and credits, insights.
- Work one phase at a time (`SPEC.md` §11). Propose a plan before starting a phase, and don't build ahead of it.

## Models

This project uses `opusplan` (set in `.claude/settings.json`): Opus for planning (plan mode), Sonnet for coding (execution). Start larger tasks in plan mode (Shift+Tab) so planning runs on Opus. Once the plan is approved, implementation switches to Sonnet automatically.

When planning runs on Opus 5.5, execution runs on Sonnet 5.5.

## Workflow after every code change

1. After writing code, test it: run lint, typecheck, build, and regression tests (once Vitest exists) to confirm existing behavior still works.
2. After the tests pass, run a security review with the `security-review` skill.
3. Commit at the end of every task that changed code.
4. At the end of the task, document every update you made in Obsidian, in the `Pilates Studio Hub/` folder of the vault (Obsidian MCP tools).

## Commands

```bash
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck  # next typegen && tsc --noEmit (plain tsc fails without generated route types)
npm run build
npm run image -- --name <name> --size <landscape|portrait|square> --prompt "..."   # AI image → public/images/<name>.jpg (needs OPENAI_API_KEY in .env.local)
```

For new or replacement images, delegate to the `image-generator` subagent (`.claude/agents/image-generator.md`). It owns the house photo style, inspects results, and logs AI images in `public/images/CREDITS.md`.

Run lint, typecheck and build after changes, and fix any errors you introduced. There is no test runner yet. Vitest arrives with the first business logic (`SPEC.md` §10).

## Landing page architecture

- `src/app/page.tsx` stacks the section components from `src/components/landing/`. All of them are server components except `site-header.tsx`, which needs state for the mobile menu.
- Navigation works through in-page anchors only. The section ids (`top`, `classes`, `about`, `book`, `contact`) are referenced by `navLinks` in `src/content/landing.ts` and by the buttons' `href`s. Renaming an id breaks navigation silently.
- Every "Book a Class" button leads to `#book` (the CTA section), and that section's button leads to `#contact` (the footer). No booking flow exists, so keep that chain honest until Phase 4.
- `html { scroll-padding-top }` in `globals.css` offsets anchor jumps for the sticky header (`h-20`). Change both together.

## Stack

- Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4, lucide-react.
- Next 16 differs from older versions. For example, `next/image` uses `preload`, not `priority`. Check `node_modules/next/dist/docs/` when unsure.
- Planned per the spec: shadcn/ui, Supabase (Auth, Postgres, RLS), Vitest. Add them in the phase that needs them, not before.

## Conventions

- **Language and direction:** the UI is Hebrew and right-to-left (`<html lang="he" dir="rtl">`). Code identifiers, database fields and enums are in English.
- **RTL layout:** use logical Tailwind utilities (`ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`, `text-start`), not left/right versions. Wrap Latin text or numbers in `dir="ltr"` when needed (brand name, phone, email).
- **Copy:** keep user-facing text in `src/content/` rather than hardcoding it in components, so English can be added later.
- **Design tokens:** defined in `src/app/globals.css` under `@theme`: `cream`, `sand-100/200/300`, `ink`, `muted`, `clay`, `clay-dark`, `sage`, `sage-light`. Fonts are `font-sans` (Heebo) and `font-serif` (Frank Ruhl Libre). Use these tokens instead of raw hex values.
- **Unlayered CSS:** anything in `globals.css` outside `@layer` beats all Tailwind utilities. Keep it minimal.
- **Focus:** keyboard focus rings come from the global `:focus-visible` rule. Add the `surface-dark` class to dark sections so the ring switches to a light color.
- **Components:**
  - `src/components/landing/`: landing-page sections.
  - `src/components/ui/`: shared primitives (e.g. `ButtonLink`).
  - Only add a `"use client"` component where it needs state or browser APIs.
- **Images:** stored locally in `public/images/` and rendered with `next/image`. Give them Hebrew alt text.
- **Accessibility:** use semantic landmarks and headings. Keep text contrast at 4.5:1 or higher. Every interactive element must be reachable and visible with the keyboard.

## Rules from the spec

- Never present mock data as real, never fake success messages, and never imply a booking happened when it didn't.
- Enforce permissions and business rules on the server or in the database (RLS), never only by hiding UI.
- Never expose Supabase service-role keys to the browser. Put credentials in environment variables.
- Bookings, memberships and credits must not use localStorage as their source of truth.
- Don't build excluded features (payments, SMS or WhatsApp, waitlists, multi-branch, etc.) without approval.
- Don't add dependencies unless they're needed.
