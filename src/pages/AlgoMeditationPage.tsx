import { useNavigate } from 'react-router-dom'

const AlgoMeditationPage = () => {
  const navigate = useNavigate()

  const modules = [
    {
      id: 'box-breathing',
      title: 'Box Breathing',
      description: 'Stabilize your mind and nervous system with rhythmic breath control.',
      path: '/algo-meditation/box-breathing',
      color: 'from-teal-400 to-emerald-500'
    },
    {
      id: 'mantra',
      title: 'Mantra Chanting',
      description: 'The Maha Mantra: Hare Krishna. Sound vibration for spiritual elevation.',
      path: '/algo-meditation/mantra',
      color: 'from-indigo-400 to-purple-500'
    }
  ]

  return (
    <main className="relative pt-40 pb-20 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-extrabold text-white tracking-tighter uppercase italic">
            Algo<span className="text-teal-400">Meditation</span>
          </h1>
          <p className="text-slate-400 text-xl font-light">Algorithmic flows for deep consciousness.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((mod) => (
            <div 
              key={mod.id}
              onClick={() => navigate(mod.path)}
              className="group relative p-12 rounded-[48px] bg-slate-900/40 border border-white/5 backdrop-blur-md cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:bg-slate-900/60 overflow-hidden"
            >
              <div className={`absolute -inset-px bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500`}>
                  <div className="w-6 h-6 bg-white/20 rounded-full blur-sm" />
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-4xl font-bold text-white group-hover:text-teal-400 transition-colors">{mod.title}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">{mod.description}</p>
                </div>

                <div className="pt-4 flex items-center gap-2 text-teal-400 font-bold group-hover:translate-x-2 transition-transform">
                  Start Session <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default AlgoMeditationPage
