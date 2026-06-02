import type { Preset, Theme } from './types'

export const PRESETS: Preset[] = [
  {
    id: 'standard',
    name: 'Standard',
    focusDuration: 45,
    shortBreakDuration: 10,
    longBreakDuration: 15,
    shortBreaksBeforeLong: 3,
  },
  {
    id: 'caveman',
    name: 'Caveman',
    focusDuration: 15,
    shortBreakDuration: 3,
    longBreakDuration: 10,
    shortBreaksBeforeLong: 2,
  },
  {
    id: 'monk',
    name: 'Monk',
    focusDuration: 60,
    shortBreakDuration: 10,
    longBreakDuration: 20,
    shortBreaksBeforeLong: 4,
  },
]

export const THEMES: Theme[] = [
  {
    id: 'zen',
    name: 'Zen',
    colors: { focus: '#0f172a', shortBreak: '#064e3b', longBreak: '#134e4a' },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: { focus: '#172554', shortBreak: '#1e3a5f', longBreak: '#164e63' },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: { focus: '#431407', shortBreak: '#881337', longBreak: '#78350f' },
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: { focus: '#052e16', shortBreak: '#1a2e05', longBreak: '#064e3b' },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    colors: { focus: '#1e1b4b', shortBreak: '#2e1065', longBreak: '#312e81' },
  },
]
