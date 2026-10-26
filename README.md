# CampusEvents — TechSpace Tech Team Submission (Frontend)

A responsive event-discovery website where students browse upcoming college events at USICT, filter them by category, search instantly, bookmark favourites and open full event details — all in the browser, no backend required.

**Domain:** Frontend · **Built with:** React 19 + Vite + Tailwind CSS v4

---

## What this project does

- **Landing page** with navbar, hero section and a grid of upcoming event cards
- **Search** across event titles, organisers, tags and descriptions
- **Category filters** (Hackathon, Workshop, Competition, Expo, Summit, Gaming) plus a "Bookmarked only" mode
- **Event detail modal** with date, time, venue, organiser, fee, seats and a working Register action
- **Loading state** — animated skeleton cards while data loads
- **Empty state** — friendly message with a one-click "Clear all filters" reset
- **Dark / light mode** — persisted across visits (localStorage)
- **Bookmarks** — saved in `localStorage`, survive page reloads
- **Responsive** — mobile-first layout, works from 320px to desktop
- Small touches: toast feedback, staggered card animations, hover transitions

## Tech stack

| Layer      | Choice                                       |
| ---------- | -------------------------------------------- |
| Framework  | React 19 (Vite scaffold)                     |
| Styling    | Tailwind CSS v4 (via `@tailwindcss/vite`)    |
| Data       | Local `src/data/events.json` (10 events)     |
| State      | React hooks + custom `useLocalStorage` hook  |
| Fonts      | Plus Jakarta Sans + Space Grotesk (Google Fonts) |

No backend, no API keys, no environment variables.

## How to run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:5173

# 3. Production build
npm run build
npm run preview   # serve the dist/ folder locally
```

## Project structure

```
src/
├── App.jsx                 # app state: search, filters, bookmarks, modal
├── data/events.json        # event catalogue
├── hooks/useLocalStorage.js
├── utils/date.js
└── components/
    ├── Navbar.jsx          # sticky nav + theme toggle + saved counter
    ├── Hero.jsx            # hero banner + stats
    ├── SearchFilters.jsx   # search box, category chips, saved toggle
    ├── EventCard.jsx       # event card with bookmark button
    ├── EventModal.jsx      # full details dialog + register CTA
    ├── SkeletonCard.jsx    # loading state
    ├── EmptyState.jsx      # no-results state
    └── Footer.jsx          # about + tech stack
```

## Features vs. requirements

| Requirement                     | Status |
| ------------------------------- | ------ |
| Landing: navbar, hero, cards    | Done   |
| Event detail page or modal      | Done (modal) |
| Loading and empty states        | Done   |
| Search and category filters     | Done   |
| Responsive (mobile + desktop)   | Done   |
| Working buttons, clean UI       | Done   |
| Event data from local JSON      | Done   |
| **Bonus:** dark / light mode    | Done   |
| **Bonus:** bookmarks (localStorage) | Done |
| **Bonus:** smooth animations    | Done   |

## Notes

- Event content (dates, venues, fees) is sample data modelled on TechSpace / USICT events.
- Registration is a front-end simulation only — it stores the registered event IDs in `localStorage`.
