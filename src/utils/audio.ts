let ctx: AudioContext | null = null

let customSoundUrl: string | null = null

export function setCustomSound(url: string | null): void {
  customSoundUrl = url
}

export function playAlarm(): void {
  if (customSoundUrl) {
    const audio = new Audio(customSoundUrl)
    audio.play().catch(() => {})
    return
  }

  if (!ctx) {
    ctx = new AudioContext()
  }

  const now = ctx.currentTime

  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    osc.type = 'sine'
    const start = now + i * 0.3
    gain.gain.setValueAtTime(0.3, start)
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25)
    osc.start(start)
    osc.stop(start + 0.25)
  }
}
