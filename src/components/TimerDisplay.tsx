import type { Phase } from '../types'

interface TimerDisplayProps {
  timeRemaining: number
  phase: Phase
}

export function TimerDisplay({ timeRemaining, phase }: TimerDisplayProps) {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <div className="text-center my-16 select-none">
      <div className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-bold text-white tracking-tight leading-none tabular-nums">
        {display}
      </div>
    </div>
  )
}
