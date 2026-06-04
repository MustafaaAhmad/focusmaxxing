import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react'
import type { Settings, PresetId, ThemeId, Mode, Phase } from '../types'
import { PRESETS } from '../constants'

const STORAGE_KEY = 'focusmaxxing-settings'

const DEFAULT_SETTINGS: Settings = {
  presetId: 'standard',
  focusDuration: 45,
  shortBreakDuration: 10,
  longBreakDuration: 15,
  shortBreaksBeforeLong: 3,
  themeId: 'zen',
  mode: 'dark',
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
  phaseLabels: Record<Phase, string>
  updateSettings: (partial: Partial<Settings>) => void
  applyPreset: (id: PresetId) => void
  setTheme: (id: ThemeId) => void
  setMode: (mode: Mode) => void
}

const SettingsContext = createContext<SettingsContextType | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const phaseLabels = useMemo(() => {
    if (settings.presetId === 'custom') {
      return PRESETS[0].labels
    }
    const preset = PRESETS.find(p => p.id === settings.presetId)
    return preset?.labels ?? PRESETS[0].labels
  }, [settings.presetId])

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
        ...(preset.themeId ? { themeId: preset.themeId } : {}),
      }))
    }
  }, [])

  const setTheme = useCallback((id: ThemeId) => {
    setSettings(prev => ({ ...prev, themeId: id }))
  }, [])

  const setMode = useCallback((mode: Mode) => {
    setSettings(prev => ({ ...prev, mode }))
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, phaseLabels, updateSettings, applyPreset, setTheme, setMode }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings(): SettingsContextType {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
