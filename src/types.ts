export type Phase = 'focus' | 'shortBreak' | 'longBreak'

export type PresetId = 'standard' | 'caveman' | 'monk' | 'custom'

export type ThemeId = 'zen' | 'ocean' | 'sunset' | 'forest' | 'midnight' | 'primitive' | 'temple'

export type Mode = 'dark' | 'light'

export interface Preset {
  id: PresetId
  name: string
  labels: { focus: string; shortBreak: string; longBreak: string }
  focusDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  shortBreaksBeforeLong: number
  themeId?: ThemeId
}

export interface ThemeColors {
  focus: string
  shortBreak: string
  longBreak: string
}

export interface Theme {
  id: ThemeId
  name: string
  icon: string
  colors: ThemeColors
}

export interface Settings {
  presetId: PresetId
  focusDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  shortBreaksBeforeLong: number
  themeId: ThemeId
  mode: Mode
}
