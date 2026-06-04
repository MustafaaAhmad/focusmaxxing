interface OnboardingNoteProps {
  onDismiss: () => void
}

export function OnboardingNote({ onDismiss }: OnboardingNoteProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[var(--overlay)]" onClick={onDismiss} />
      <div
        className="relative bg-[#fef68a] dark:bg-[#4a3f00] text-[#1a1a2e] dark:text-[#fef68a] rounded-lg shadow-2xl p-6 max-w-sm w-full -rotate-1"
        style={{ boxShadow: '4px 6px 12px rgba(0,0,0,0.3)' }}
      >
        <div className="text-2xl mb-2 text-center">📌</div>
        <h2 className="text-lg font-bold text-center mb-3">Welcome to Focusmaxxing</h2>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li>• Stay focused for a set time, then enjoy a break</li>
          <li>• Focus → Short Breaks × N → Long Break → repeat</li>
          <li>• Pick a preset (Standard, Caveman, Monk) for different vibes</li>
          <li>• Phase names change based on your preset</li>
          <li>• Customize durations, theme, and light/dark mode in Settings</li>
          <li>• 💰 Support us with a tip in Settings → Send a tip</li>
        </ul>
        <button
          onClick={onDismiss}
          className="mt-4 w-full py-2 rounded-lg bg-[#1a1a2e] dark:bg-[#fef68a] text-[#fef68a] dark:text-[#1a1a2e] font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
