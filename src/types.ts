export type Phase = 'focus' | 'shortBreak' | 'longBreak'

export type PresetId = 'standard' | 'caveman' | 'monk' | 'custom'

export type ThemeId = 'zen' | 'ocean' | 'sunset' | 'forest' | 'midnight'

export interface Preset {
  id: PresetId
  name: string
  focusDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  shortBreaksBeforeLong: number
}

export interface ThemeColors {
  focus: string
  shortBreak: string
  longBreak: string
}

export interface Theme {
  id: ThemeId
  name: string
  colors: ThemeColors
}

export interface Settings {
  presetId: PresetId
  focusDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  shortBreaksBeforeLong: number
  themeId: ThemeId
}
