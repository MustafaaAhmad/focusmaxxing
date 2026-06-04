# focusmaxxing

A static focusmaxxing timer built with React 19, Tailwind CSS v4, and Vite 6.

## Getting Started

```sh
npm install
npm run dev        # dev server at localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
```

## Project Structure

```
src/
├── main.tsx                 # Entry point
├── App.tsx                  # Root component — binds phase/theme to <html>
├── index.css                # Tailwind v4 + CSS custom properties for themes
├── types.ts                 # Shared TypeScript types
├── constants.ts             # Preset and theme definitions
├── hooks/useTimer.ts        # Timer state machine (tick, phase cycle, alarm, title)
├── context/SettingsContext.tsx  # Settings state + localStorage persistence
├── utils/audio.ts           # Web Audio API alarm (extensible for custom sound)
└── components/
    ├── TimerDisplay.tsx     # mm:ss countdown
    ├── Controls.tsx         # Start / Pause / Reset
    ├── PhaseLabel.tsx       # Phase name + session counter
    ├── SettingsIcon.tsx     # Gear icon (top-right)
    └── SettingsModal.tsx    # Presets, duration sliders, theme picker
```

## Architecture

### Timer Flow

```
Focus → (alarm) → Short Break × N → (alarm) → Long Break → (alarm) → Focus (cycle)
```

Each phase auto-starts when the previous one ends. The alarm triggers on every phase transition.

### Settings

Settings are persisted to `localStorage` under the key `focusmaxxing-settings`. The provider (`SettingsContext`) exposes three operations:

- `updateSettings(partial)` — update individual values, switches preset to `custom`
- `applyPreset(id)` — loads a named preset (standard / caveman / monk)
- `setTheme(id)` — changes the color theme

### Theming

Background colors are driven by two `data` attributes on `<html>`:

- `data-theme` — selects the color palette (zen / ocean / sunset / forest / midnight)
- `data-phase` — selects which palette color to use (focus / shortBreak / longBreak)

Add new themes by extending the `THEMES` array in `constants.ts` and the corresponding `[data-theme="..."]` block in `index.css`.

### Audio

The default alarm uses the Web Audio API (sine wave, 3 beeps at 880Hz). To use a custom sound file at runtime:

```ts
import { setCustomSound } from './utils/audio'
setCustomSound('/path/to/alarm.mp3')
```

Pass `null` to `setCustomSound` to revert to the built-in beep.

## Presets

| Preset    | Focus | Short Break | Long Break | Shorts Before Long |
|-----------|-------|-------------|------------|-------------------|
| Standard  | 45m   | 10m         | 15m        | 3                 |
| Caveman   | 15m   | 3m          | 10m        | 2                 |
| Monk      | 60m   | 10m         | 20m        | 4                 |
| Custom    | user  | user        | user       | user              |

## Tech Stack

- **React 19** — `useState`, `useEffect`, `useRef`, `useCallback`
- **Tailwind CSS v4** — `@import "tailwindcss"`, CSS-driven theming, no JS config file
- **Vite 6** — `@vitejs/plugin-react` + `@tailwindcss/vite`
- **TypeScript** — strict mode
