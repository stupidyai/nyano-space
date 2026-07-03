import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MantraMeditationPage = () => {
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  
  const mantraLines = [
    "hare krishna hare krishna",
    "krishna krishna hare hare",
    "hare rama hare rama",
    "rama rama hare hare"
  ]
  
  const totalDuration = 12000 // 12 seconds per full cycle
  const allWords = mantraLines.join(' ').split(' ')

  useEffect(() => {
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = (elapsed % totalDuration) / totalDuration
      setProgress(newProgress)
    }, 50)

    return () => clearInterval(timer)
  }, [])

  // Calculate which word we are currently on
  const currentWordIndex = Math.floor(progress * allWords.length)

  return (
    <main className="relative h-screen flex flex-col items-center justify-center bg-slate-950 px-6 overflow-hidden">
      <button 
        onClick={() => navigate('/algo-meditation')}
        className="absolute top-10 left-10 p-4 text-slate-500 hover:text-white transition-colors z-50 flex items-center gap-2 font-bold uppercase tracking-tighter"
      >
        <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg> Exit
      </button>

      <div className="max-w-4xl w-full space-y-16 text-center z-10">
        <div className="space-y-4">
          <p className="text-teal-400 font-bold uppercase tracking-[0.4em] text-xs">Maha Mantra</p>
          <h2 className="text-2xl text-slate-500 font-light italic">Sync your breath with the vibration</h2>
        </div>

        <div className="space-y-4 md:space-y-8">
          {mantraLines.map((line, lineIdx) => {
            const lineWords = line.split(' ')
            // Calculate start index for this line in the allWords array
            const lineStartIndex = mantraLines.slice(0, lineIdx).join(' ').split(' ').filter(w => w !== '').length
            
            return (
              <div key={lineIdx} className="flex flex-wrap justify-center gap-x-4 md:gap-x-6">
                {lineWords.map((word, wordIdx) => {
                  const globalIdx = lineStartIndex + wordIdx
                  const isActive = globalIdx <= currentWordIndex
                  const isCurrent = globalIdx === currentWordIndex

                  return (
                    <span 
                      key={wordIdx}
                      className={`text-4xl md:text-6xl font-black uppercase italic tracking-tighter transition-all duration-300 ${
                        isActive 
                          ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] opacity-100 scale-110' 
                          : 'text-white/10 opacity-30 scale-100'
                      } ${isCurrent ? 'text-teal-400 drop-shadow-[0_0_20px_rgba(45,212,191,0.6)]' : ''}`}
                    >
                      {word}
                    </span>
                  )
                })}
              </div>
            )
          })}
        </div>

        <div className="pt-12 flex justify-center items-center gap-6">
          <div className="w-full max-w-xs h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 transition-all duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Atmospheric Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
    </main>
  )
}

export default MantraMeditationPage
