import { PRESETS, THEMES } from '../constants'
import { useSettings } from '../context/SettingsContext'

interface SettingsModalProps {
  onClose: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const { settings, updateSettings, applyPreset } = useSettings()

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-md mx-4 border border-white/10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/80 transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">Preset</h3>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  settings.presetId === preset.id
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
                }`}
              >
                {preset.name}
              </button>
            ))}
            <button
              onClick={() => updateSettings({ presetId: 'custom' })}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                settings.presetId === 'custom'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              Custom
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">Duration</h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/80">Focus</span>
                <span className="text-white font-medium">{settings.focusDuration} min</span>
              </div>
              <input
                type="range"
                min={5}
                max={120}
                step={5}
                value={settings.focusDuration}
                onChange={e => updateSettings({ focusDuration: Number(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/80">Short Break</span>
                <span className="text-white font-medium">{settings.shortBreakDuration} min</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={settings.shortBreakDuration}
                onChange={e => updateSettings({ shortBreakDuration: Number(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/80">Long Break</span>
                <span className="text-white font-medium">{settings.longBreakDuration} min</span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={5}
                value={settings.longBreakDuration}
                onChange={e => updateSettings({ longBreakDuration: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">Breaks Before Long</h3>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/80">Short breaks before long break</span>
            <span className="text-white font-medium">{settings.shortBreaksBeforeLong}</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={settings.shortBreaksBeforeLong}
            onChange={e => updateSettings({ shortBreaksBeforeLong: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">Theme</h3>
          <div className="flex gap-3 flex-wrap">
            {THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => updateSettings({ themeId: theme.id })}
                className={`w-14 h-14 rounded-xl border-2 transition-all cursor-pointer ${
                  settings.themeId === theme.id
                    ? 'border-white ring-2 ring-white/40 scale-110'
                    : 'border-white/10 hover:border-white/30'
                }`}
                style={{ backgroundColor: theme.colors.focus }}
                title={theme.name}
              />
            ))}
          </div>
          <p className="text-white/40 text-xs mt-3">
            {THEMES.find(t => t.id === settings.themeId)?.name}
          </p>
        </div>
      </div>
    </div>
  )
}
