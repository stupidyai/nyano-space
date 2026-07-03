import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BoxBreathingPage = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale')
  const [seconds, setSeconds] = useState(4)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          // Switch phase
          setPhase((current) => {
            if (current === 'Inhale') return 'Hold'
            if (current === 'Hold') return 'Exhale'
            if (current === 'Exhale') return 'Pause'
            return 'Inhale'
          })
          return 4
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getCircleSize = () => {
    if (phase === 'Inhale') return 'scale-[1.5]'
    if (phase === 'Hold') return 'scale-[1.5]'
    if (phase === 'Exhale') return 'scale-[1]'
    return 'scale-[1]'
  }

  const getPhaseColor = () => {
    if (phase === 'Inhale') return 'border-teal-400 shadow-[0_0_80px_rgba(45,212,191,0.3)]'
    if (phase === 'Exhale') return 'border-indigo-400 shadow-[0_0_80px_rgba(129,140,248,0.3)]'
    return 'border-white/20'
  }

  return (
    <main className="relative h-screen flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${phase === 'Inhale' ? 'bg-teal-500/5' : phase === 'Exhale' ? 'bg-indigo-500/5' : ''}`} />

      <button 
        onClick={() => navigate('/algo-meditation')}
        className="absolute top-10 left-10 p-4 text-slate-500 hover:text-white transition-colors z-50 flex items-center gap-2 font-bold uppercase tracking-tighter"
      >
        <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg> Exit
      </button>

      <div className="relative flex flex-col items-center justify-center space-y-20">
        {/* The Breathing Circle */}
        <div className={`w-64 h-64 rounded-full border-4 transition-all duration-[4000ms] ease-in-out flex items-center justify-center ${getCircleSize()} ${getPhaseColor()}`}>
          <div className="flex flex-col items-center">
            <span className="text-7xl font-black text-white tabular-nums">{seconds}</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic transition-all duration-500">
            {phase === 'Pause' ? 'Hold' : phase}
          </h2>
          <p className="text-slate-500 font-medium tracking-[0.3em] uppercase text-sm">Follow the rhythm</p>
        </div>
      </div>

      {/* Box visual aid */}
      <div className="absolute bottom-20 flex gap-4">
        {['Inhale', 'Hold', 'Exhale', 'Pause'].map((p) => (
          <div 
            key={p} 
            className={`w-3 h-3 rounded-full transition-all duration-500 ${phase === p ? 'bg-teal-400 scale-150' : 'bg-white/10'}`} 
          />
        ))}
      </div>
    </main>
  )
}

export default BoxBreathingPage
