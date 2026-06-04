import { useState, useEffect } from 'react'
import { useSettings } from './context/SettingsContext'
import { useTimer } from './hooks/useTimer'
import { TimerDisplay } from './components/TimerDisplay'
import { Controls } from './components/Controls'
import { PhaseLabel } from './components/PhaseLabel'
import { SettingsIcon } from './components/SettingsIcon'
import { SettingsModal } from './components/SettingsModal'

export default function App() {
  const { settings, phaseLabels } = useSettings()
  const [showSettings, setShowSettings] = useState(false)

  const {
    timeRemaining,
    phase,
    isRunning,
    completedSessions,
    start,
    pause,
    reset,
  } = useTimer({
    focusDuration: settings.focusDuration,
    shortBreakDuration: settings.shortBreakDuration,
    longBreakDuration: settings.longBreakDuration,
    shortBreaksBeforeLong: settings.shortBreaksBeforeLong,
    phaseLabels,
  })

  useEffect(() => {
    document.documentElement.dataset.phase = phase
  }, [phase])

  useEffect(() => {
    document.documentElement.dataset.theme = settings.themeId
  }, [settings.themeId])

  useEffect(() => {
    document.documentElement.dataset.mode = settings.mode
  }, [settings.mode])

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center relative px-4">
        <SettingsIcon onClick={() => setShowSettings(true)} />
        <PhaseLabel
          phase={phase}
          phaseLabels={phaseLabels}
          completedSessions={completedSessions}
          shortBreaksBeforeLong={settings.shortBreaksBeforeLong}
        />
        <TimerDisplay timeRemaining={timeRemaining} phase={phase} />
        <Controls
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
        />
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </>
  )
}
