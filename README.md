# 📅 Interactive Wall Calendar

A polished, production-quality interactive wall calendar built for the **TUF Frontend Engineering Challenge**. It features a physical wall-calendar aesthetic, day-range selection, an integrated notes system, dynamic monthly color themes, and smooth Framer Motion animations — all persisted via `localStorage`.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🖼️ **Wall Calendar Aesthetic** | Month-specific SVG landscape illustrations act as the hero panel (mountains, oceans, forests, etc.) |
| 📅 **Day Range Selector** | Click a start date → click an end date. Visual states for start, end, in-between (hover preview too) |
| 📝 **Integrated Notes** | Color-tagged notes linked to selected date ranges, saved to `localStorage` |
| 🎨 **Dynamic Theming** | 12 unique monthly color palettes automatically applied to UI accents via CSS variables |
| ✨ **Framer Motion Animations** | Month slide transitions, note entry/exit, button micro-interactions |
| 📱 **Fully Responsive** | Mobile: vertical stack (hero → grid → notes); Desktop: side-by-side hero + calendar |
| 💾 **Auto-Save** | Notes persist across page reloads via `localStorage` |
| 🌟 **Today Highlight** | Current date marked with accent dot + bold styling |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone or navigate to the project
cd interactive-calendar

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🏗️ Architecture

### File Structure

```
interactive-calendar/
├── src/
│   └── app/
│       ├── layout.tsx              # Root layout, fonts, metadata
│       ├── page.tsx                # Main page wrapper
│       ├── globals.css             # CSS tokens, Tailwind v4, utilities
│       └── components/
│           ├── Calendar/
│           │   ├── index.tsx       # Shell: state, localStorage, layout
│           │   ├── HeroImage.tsx   # SVG landscape + slide animation
│           │   ├── MonthHeader.tsx # Month/year header + nav arrows
│           │   ├── Grid.tsx        # 7-col date grid + range logic
│           │   ├── DayCell.tsx     # Individual day cell + visual states
│           │   └── Notes.tsx       # Notes CRUD + color tags
│           └── ui/
│               └── ThemeProvider.tsx  # 12 monthly themes → CSS vars
├── package.json
├── tailwind.config.ts
└── README.md
```

### Component Hierarchy

```
page.tsx
  └─ Calendar/index.tsx           ← Central state hub
       ├─ ThemeProvider            ← Injects CSS vars for current month
       ├─ HeroImage                ← SVG landscape + AnimatePresence
       ├─ MonthHeader              ← Month display + prev/next
       ├─ Grid                     ← Date matrix + range logic
       │    └─ DayCell (×42)       ← Individual day with all visual states
       └─ Notes                    ← Add/delete notes, color picker
```

---

## 🔄 State Management

All state lives in `Calendar/index.tsx` using React hooks:

| State | Type | Persistence |
|---|---|---|
| `currentDate` | `Date` | In-memory (resets to today on reload) |
| `range` | `{ start: Date\|null, end: Date\|null }` | In-memory |
| `notes` | `Note[]` | **localStorage** (`interactive-calendar-notes`) |
| `direction` | `number` | In-memory (controls animation direction) |
| `mounted` | `boolean` | Hydration guard |

The `ThemeProvider` derives theme from `currentDate.getMonth()` and applies it via `document.documentElement.style.setProperty` inside a `useEffect`.

---

## 🎨 Dynamic Theming

Each of the 12 months has a unique `MonthTheme` object with:
- `accent` — Primary color (buttons, borders, highlights)
- `accentLight` — For in-range cell tinting
- `accentDark` — Pressed states
- `accentSubtle` — Background tints
- `accentText` — Text on accent backgrounds
- `heroGradient` — Used in the SVG landscape

These are injected as CSS custom properties (`--accent`, `--accent-light`, etc.) so all components respond instantly on month change.

---

## 📱 Responsive Layout

| Breakpoint | Layout |
|---|---|
| Mobile `< 1024px` | Vertical stack: Hero → Grid → Notes |
| Desktop `≥ 1024px` | Hero panel (40%) left, Grid + Notes panel (60%) right |

Notes panel has `max-h-[400px]` on mobile (scrollable) and full-height on desktop.

---

## 🧪 Technology Choices

- **Next.js 15 / App Router** — Server components for layout/page, `'use client'` only where needed (interactive components)
- **Tailwind CSS v4** — Utility-first styling; CSS tokens handled via custom properties for dynamic theming
- **Framer Motion** — `AnimatePresence` + `motion.div` for smooth month transitions, note list animations, and button micro-interactions
- **date-fns** — Lightweight, tree-shakeable date utilities (`startOfMonth`, `eachDayOfInterval`, `isWithinInterval`, `isSameDay`, etc.)
- **lucide-react** — Clean, consistent icon set
- **clsx + tailwind-merge** — Conditional class merging without conflicts

---

## 🎯 Day Range Selection Logic

1. **No selection** → Click date A: sets `range.start = A`
2. **Start set** → Click date B: sets `range.end = B`
3. **Both set** → Click any date: resets and starts new selection from that date
4. **Hover preview** — When only start is set, hovering over dates renders a live preview range highlight

The range capsule uses directional border-radius clipping: left half highlighted for start anchor, right half for end, full width for in-between cells.

---

## 💾 localStorage Schema

```ts
// Key: "interactive-calendar-notes"
interface Note {
  id: string;          // Unique ID (timestamp + random)
  text: string;        // Note content
  createdAt: string;   // ISO timestamp
  rangeLabel: string | null; // e.g. "Apr 5 → Apr 10"
  color: string;       // Hex accent color for the note tag
}
```

---

## 🧑‍💻 Development Notes

- The hero image is an inline SVG — no external image assets required, works offline
- Google Fonts (Inter + Outfit) are loaded via `<link>` in `layout.tsx`
- All interactive elements have semantic `id` attributes for easy test automation
- Hydration is guarded via `mounted` state to prevent SSR/client mismatch with `localStorage`

---

*Built with ❤️ for the TUF Frontend Engineering Challenge*
