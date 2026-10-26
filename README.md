# CampusEvents — TechSpace Tech Team Submission (Frontend)

A responsive event-discovery website where students browse upcoming college events at USICT, filter them, search instantly, bookmark favourites and register through a validated form — all in the browser, no backend required.

**Domain:** Frontend · **Built with:** React 19 + Vite + Tailwind CSS v4

**Live site (Vercel):** https://campus-events-theta.vercel.app
**Live site (GitHub Pages):** https://aaryan11916403224-sketch.github.io/campus-events/

---

## Screens (clickable flow)

Every screen is linked end-to-end via hash routing:

```
Discover  →  Event details  →  Registration form  →  Success screen  →  Manage / cancel
   #/          #/event/:id       #/event/:id/register   #/event/:id/success   #/event/:id/manage
```

| Screen | What it covers |
| --- | --- |
| **Discover** | Navbar, hero, featured events, search + category filters, event cards grid |
| **Event details** | Date, venue, organiser, seats, entry fee, tags, register CTA |
| **Registration form** | Five validated fields with inline error states and loading state |
| **Success screen** | Confirmation code, registration summary, clear feedback |
| **Manage** | View or cancel a registration (with a confirm step) |

## Deliverables checklist

| Requirement | Where |
| --- | --- |
| Discover screen: search, filters, event cards | Discover screen |
| Event details: date, venue, organiser, CTA | Event details screen |
| Registration form with validation states | Register screen (blur + submit validation) |
| Reusable buttons, cards and inputs | `components/ui/` (Button, TextField, SelectField) + EventCard |
| Clickable prototype linking all screens | Hash-router flow above |
| Featured events and clear navigation | "Featured this season" section + sticky navbar + back links |
| Bookmark an event | Card / details bookmark button, persisted in localStorage |
| Success screen with clear feedback | Confirmation code + summary + toasts |
| At least one empty or error state | Empty state, load-error state with retry, 404 state, ErrorBoundary |
| Consistent colour, type and spacing | Design tokens in `src/index.css` (warm-paper palette, Fraunces + Plus Jakarta Sans) |

## Bonus features

- **Search that understands intent** — multi-word token matching ("code rush" finds "CodeRush"), search by date, venue, organiser or tag, live match highlighting, `/` hotkey, clear button
- **Dark / light mode** — persisted per device
- **Bookmarked-only view**
- **Error recovery** — data load failures show a retry state; a React ErrorBoundary catches render crashes instead of a blank page
- **Smooth motion** — staggered card entrances, animated confirmation check

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 (Vite) |
| Styling | Tailwind CSS v4 design tokens (`@theme`), Fraunces + Plus Jakarta Sans |
| Data | `public/data/events.json` fetched at runtime (real loading/error states) |
| Routing | Lightweight hash router (`hooks/useHashRoute.js`) |
| Persistence | `localStorage` for bookmarks, theme and registrations |
| Testing | Headless jsdom smoke suite (`smoke.mjs`), 14 interaction tests |

No backend, no API keys, no environment variables, nothing uploaded anywhere.

## How to run

```bash
npm install        # install dependencies
npm run dev        # dev server → http://localhost:5173/campus-events/
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm test           # headless smoke tests (search, validation, error states)
npm run test:live  # same suite against the deployed live site
```

## Project structure

```
public/data/events.json        # event catalogue (10 events)
src/
├── App.jsx                    # app state + route/screen switch
├── index.css                  # design tokens, covers, animations
├── hooks/                     # useHashRoute, useLocalStorage
├── utils/                     # search, validation, registration storage
├── components/ui/             # reusable Button, TextField/SelectField, Icon
├── components/                # Navbar, Hero, EventCard, filters, states…
└── screens/                   # Discover, EventDetails, Register, RegistrationStatus
```

## Notes

- Event content is sample data modelled on TechSpace / USICT events.
- Registrations are stored on the visitor's device (localStorage) — the form demonstrates full validation and error handling without a backend.
