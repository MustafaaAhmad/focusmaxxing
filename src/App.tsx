import { useState, useEffect } from 'react'
import { useSettings } from './context/SettingsContext'
import { useTimer } from './hooks/useTimer'
import { TimerDisplay } from './components/TimerDisplay'
import { Controls } from './components/Controls'
import { PhaseLabel } from './components/PhaseLabel'
import { SettingsIcon } from './components/SettingsIcon'
import { SettingsModal } from './components/SettingsModal'
import { OnboardingNote } from './components/OnboardingNote'

export default function App() {
  const { settings, phaseLabels } = useSettings()
  const [showSettings, setShowSettings] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('focusmaxxing-onboarding')
  })

  useEffect(() => {
    if (!showOnboarding) {
      localStorage.setItem('focusmaxxing-onboarding', '1')
    }
  }, [showOnboarding])

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
      {showOnboarding && <OnboardingNote onDismiss={() => setShowOnboarding(false)} />}
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
