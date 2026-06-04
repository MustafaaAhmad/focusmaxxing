interface ControlsProps {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export function Controls({ isRunning, onStart, onPause, onReset }: ControlsProps) {
  return (
    <div className="flex gap-6">
      <button
        onClick={isRunning ? onPause : onStart}
        className="px-10 py-3 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] text-lg font-medium transition-all active:scale-95 min-w-[140px] cursor-pointer"
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={onReset}
        className="px-6 py-3 rounded-full bg-[var(--surface-active)] hover:bg-[var(--surface)] text-[var(--text-secondary)] text-lg transition-all active:scale-95 cursor-pointer"
      >
        Reset
      </button>
    </div>
  )
}
