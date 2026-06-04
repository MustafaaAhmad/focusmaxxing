import type { Phase } from '../types'

interface PhaseLabelProps {
  phase: Phase
  phaseLabels: Record<Phase, string>
  completedSessions: number
  shortBreaksBeforeLong: number
}

export function PhaseLabel({ phase, phaseLabels, completedSessions, shortBreaksBeforeLong }: PhaseLabelProps) {
  const remaining = shortBreaksBeforeLong - completedSessions
  const breakType = completedSessions >= shortBreaksBeforeLong - 1 ? 'long' : 'short'

  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] uppercase text-[var(--text-secondary)]">
        {phaseLabels[phase]}
      </h2>
      {phase === 'focus' && (
        <p className="text-sm text-[var(--text-muted)] mt-2">
          #{completedSessions + 1} · {remaining - 1} more until {breakType} break
        </p>
      )}
    </div>
  )
}
