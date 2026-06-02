# focusmaxxing — Agent Guide

## Project Overview

A static pomodoro timer site. React 19 + Tailwind CSS v4 + Vite 6 + TypeScript (strict).

## Tech Stack

- **React 19** — functional components, hooks only (no class components, no useReducer)
- **Tailwind CSS v4** — `@import "tailwindcss"` in CSS, **no JS config file**
- **Vite 6** — `@vitejs/plugin-react` + `@tailwindcss/vite` plugin
- **TypeScript** — strict mode enabled
- **Web Audio API** — alarm sound (no external audio files)

## Build Commands

```sh
npm install
npm run dev      # dev server
npm run build    # tsc + vite build (must pass before PR)
npm run preview  # preview production build
```

## Project Structure

```
src/
├── main.tsx                  # Entry — <SettingsProvider><App /></SettingsProvider>
├── App.tsx                   # Root — binds data-phase/data-theme on <html>
├── index.css                 # Tailwind v4 + CSS custom properties + range input styles
├── types.ts                  # Phase, PresetId, ThemeId, Settings, Preset, Theme, ThemeColors
├── constants.ts              # PRESETS[] and THEMES[] arrays
├── hooks/useTimer.ts         # Timer with refs to avoid stale closures
├── context/SettingsContext.tsx    # Settings state, localStorage persistence
├── utils/audio.ts            # playAlarm(), setCustomSound()
├── components/
│   ├── TimerDisplay.tsx      # Large mm:ss countdown
│   ├── Controls.tsx          # Start/Pause + Reset
│   ├── PhaseLabel.tsx        # Phase name + session counter
│   ├── SettingsIcon.tsx      # SVG gear icon, top-right
│   └── SettingsModal.tsx     # Presets, sliders, theme picker
└── vite-env.d.ts
```

## Key Conventions

### Types (types.ts)
- `Phase` = `'focus' | 'shortBreak' | 'longBreak'`
- `PresetId` = `'standard' | 'caveman' | 'monk' | 'custom'`
- `ThemeId` = `'zen' | 'ocean' | 'sunset' | 'forest' | 'midnight'`
- `Settings` = `{ presetId, focusDuration, shortBreakDuration, longBreakDuration, shortBreaksBeforeLong, themeId }`

### Presets (constants.ts)
- **Standard**: 45/10/15/3
- **Caveman**: 15/3/10/2
- **Monk**: 60/10/20/4
- **Custom**: user-defined (set via `updateSettings`)

### Timer Hook (hooks/useTimer.ts)
- Uses `useRef` to track mutable state (`phaseRef`, `sessionsRef`, `durationsRef`) to avoid stale closures in `setInterval`
- Auto-starts next phase when timer reaches 0
- Updates `document.title` on every tick: `[mm:ss] - PhaseName`
- Calls `playAlarm()` from `utils/audio.ts` on phase completion
- Resetting keeps the current phase but resets its timer

### Settings Context (context/SettingsContext.tsx)
- Persists to `localStorage` key `pomodoro-settings`
- `updateSettings(partial)` — applies partial updates, switches preset to `'custom'`
- `applyPreset(id)` — loads a named preset's durations

### Theming (index.css + App.tsx)
- `data-theme` on `<html>` selects color palette
- `data-phase` on `<html>` selects which phase color to use
- CSS custom properties `--bg-focus`, `--bg-short-break`, `--bg-long-break`
- `transition: background-color 0.6s ease` on `html`
- Each theme in `constants.ts` must have a matching `[data-theme="id"]` block in `index.css`

### Audio (utils/audio.ts)
- `playAlarm()` — default: 3 sine-wave beeps at 880Hz via Web Audio API
- `setCustomSound(url: string | null)` — override with audio file URL, or null to reset
- `AudioContext` is lazily created on first call

## Coding Rules

- Every exported type and function must have a JSDoc comment
- No comments inside function bodies unless the logic is non-obvious
- Tailwind classes only — no inline styles unless dynamic (e.g. theme color swatches)
- All interactive elements need `cursor-pointer` class
- Components are default exports in `App.tsx`/`main.tsx`, named exports everywhere else
- No external UI libraries — all components hand-built with Tailwind
- No circular dependencies
- Run `npm run build` before committing to verify no type errors
