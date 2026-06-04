import { useState, useEffect, useRef, useCallback } from 'react'
import type { Phase } from '../types'
import { playAlarm } from '../utils/audio'

interface UseTimerOptions {
  focusDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  shortBreaksBeforeLong: number
}

export function useTimer({
  focusDuration,
  shortBreakDuration,
  longBreakDuration,
  shortBreaksBeforeLong,
}: UseTimerOptions) {
  const getDurationForPhase = useCallback(
    (p: Phase): number => {
      switch (p) {
        case 'focus': return focusDuration
        case 'shortBreak': return shortBreakDuration
        case 'longBreak': return longBreakDuration
      }
    },
    [focusDuration, shortBreakDuration, longBreakDuration],
  )

  const [timeRemaining, setTimeRemaining] = useState(() => focusDuration * 60)
  const [phase, setPhase] = useState<Phase>('focus')
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)

  const phaseRef = useRef(phase)
  const sessionsRef = useRef(completedSessions)
  const durationsRef = useRef({ focusDuration, shortBreakDuration, longBreakDuration, shortBreaksBeforeLong })

  durationsRef.current = { focusDuration, shortBreakDuration, longBreakDuration, shortBreaksBeforeLong }
  useEffect(() => { phaseRef.current = phase }, [phase])
  useEffect(() => { sessionsRef.current = completedSessions }, [completedSessions])

  useEffect(() => {
    const p = phaseRef.current
    const mins = p === 'focus' ? focusDuration
      : p === 'shortBreak' ? shortBreakDuration
      : longBreakDuration
    setTimeRemaining(mins * 60)
    setIsRunning(false)
  }, [focusDuration, shortBreakDuration, longBreakDuration])

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

  useEffect(() => {
    if (timeRemaining !== 0 || !isRunning) return

    playAlarm()

    const d = durationsRef.current
    let nextPhase: Phase

    if (phaseRef.current === 'focus') {
      const next = sessionsRef.current + 1
      if (next >= d.shortBreaksBeforeLong) {
        nextPhase = 'longBreak'
        setCompletedSessions(0)
      } else {
        nextPhase = 'shortBreak'
        setCompletedSessions(next)
      }
    } else {
      nextPhase = 'focus'
    }

    setPhase(nextPhase)

    const mins = nextPhase === 'focus'
      ? d.focusDuration
      : nextPhase === 'shortBreak'
        ? d.shortBreakDuration
        : d.longBreakDuration
    setTimeRemaining(mins * 60)
    setIsRunning(true)
  }, [timeRemaining, isRunning])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback(() => {
    setIsRunning(false)
    const d = durationsRef.current
    const p = phaseRef.current
    const mins = p === 'focus' ? d.focusDuration
      : p === 'shortBreak' ? d.shortBreakDuration
      : d.longBreakDuration
    setTimeRemaining(mins * 60)
  }, [])

  useEffect(() => {
    const m = Math.floor(timeRemaining / 60)
    const s = timeRemaining % 60
    const name = phase === 'focus' ? 'Focus'
      : phase === 'shortBreak' ? 'Short Break'
      : 'Long Break'
    document.title = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} - ${name}`
  }, [timeRemaining, phase])

  return { timeRemaining, phase, isRunning, completedSessions, start, pause, reset }
}
