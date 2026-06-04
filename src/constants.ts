import type { Preset, Theme } from './types'

export const PRESETS: Preset[] = [
  {
    id: 'standard',
    name: 'Standard',
    labels: { focus: 'Focus', shortBreak: 'Short Break', longBreak: 'Long Break' },
    focusDuration: 45,
    shortBreakDuration: 10,
    longBreakDuration: 15,
    shortBreaksBeforeLong: 3,
  },
  {
    id: 'caveman',
    name: 'Caveman',
    labels: { focus: 'Hunt', shortBreak: 'Rest', longBreak: 'Feast' },
    focusDuration: 15,
    shortBreakDuration: 3,
    longBreakDuration: 10,
    shortBreaksBeforeLong: 2,
    themeId: 'primitive',
  },
  {
    id: 'monk',
    name: 'Monk',
    labels: { focus: 'Meditate', shortBreak: 'Breathe', longBreak: 'Reflect' },
    focusDuration: 60,
    shortBreakDuration: 10,
    longBreakDuration: 20,
    shortBreaksBeforeLong: 4,
    themeId: 'temple',
  },
]

export const THEMES: Theme[] = [
  {
    id: 'zen',
    name: 'Zen',
    icon: '🧘',
    colors: { focus: '#0f172a', shortBreak: '#064e3b', longBreak: '#134e4a' },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: '🌊',
    colors: { focus: '#172554', shortBreak: '#1e3a5f', longBreak: '#164e63' },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    icon: '🌅',
    colors: { focus: '#431407', shortBreak: '#881337', longBreak: '#78350f' },
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    colors: { focus: '#052e16', shortBreak: '#1a2e05', longBreak: '#064e3b' },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    icon: '🌙',
    colors: { focus: '#1e1b4b', shortBreak: '#2e1065', longBreak: '#312e81' },
  },
  {
    id: 'primitive',
    name: 'Primitive',
    icon: '🦴',
    colors: { focus: '#3b1f0b', shortBreak: '#5c3a21', longBreak: '#8b4513' },
  },
  {
    id: 'temple',
    name: 'Temple',
    icon: '🏯',
    colors: { focus: '#1a0f0a', shortBreak: '#7b1f1f', longBreak: '#2d5016' },
  },
]
