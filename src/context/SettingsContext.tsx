import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { Settings, PresetId, ThemeId } from '../types'
import { PRESETS } from '../constants'

const STORAGE_KEY = 'pomodoro-settings'

const DEFAULT_SETTINGS: Settings = {
  presetId: 'standard',
  focusDuration: 45,
  shortBreakDuration: 10,
  longBreakDuration: 15,
  shortBreaksBeforeLong: 3,
  themeId: 'zen',
}

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<Settings>
      return { ...DEFAULT_SETTINGS, ...parsed }
    }
  } catch {
    // ignore
  }
  return DEFAULT_SETTINGS
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (partial: Partial<Settings>) => void
  applyPreset: (id: PresetId) => void
  setTheme: (id: ThemeId) => void
}

const SettingsContext = createContext<SettingsContextType | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateSettings = useCallback((partial: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...partial, presetId: 'custom' }))
  }, [])

  const applyPreset = useCallback((id: PresetId) => {
    const preset = PRESETS.find(p => p.id === id)
    if (preset) {
      setSettings(prev => ({
        ...prev,
        presetId: id,
        focusDuration: preset.focusDuration,
        shortBreakDuration: preset.shortBreakDuration,
        longBreakDuration: preset.longBreakDuration,
        shortBreaksBeforeLong: preset.shortBreaksBeforeLong,
      }))
    }
  }, [])

  const setTheme = useCallback((id: ThemeId) => {
    setSettings(prev => ({ ...prev, themeId: id }))
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, applyPreset, setTheme }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings(): SettingsContextType {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
