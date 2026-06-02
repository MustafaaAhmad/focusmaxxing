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
        className="px-10 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg font-medium transition-all active:scale-95 min-w-[140px] cursor-pointer"
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={onReset}
        className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 text-lg transition-all active:scale-95 cursor-pointer"
      >
        Reset
      </button>
    </div>
  )
}
