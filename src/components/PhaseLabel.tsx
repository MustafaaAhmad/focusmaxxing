import type { Phase } from '../types'

interface PhaseLabelProps {
  phase: Phase
  completedSessions: number
  shortBreaksBeforeLong: number
}

const LABELS: Record<Phase, string> = {
  focus: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
}

export function PhaseLabel({ phase, completedSessions, shortBreaksBeforeLong }: PhaseLabelProps) {
  const remaining = shortBreaksBeforeLong - completedSessions
  const breakType = completedSessions >= shortBreaksBeforeLong - 1 ? 'long' : 'short'

  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] uppercase text-white/70">
        {LABELS[phase]}
      </h2>
      {phase === 'focus' && (
        <p className="text-sm text-white/30 mt-2">
          #{completedSessions + 1} · {remaining - 1} more until {breakType} break
        </p>
      )}
    </div>
  )
}
