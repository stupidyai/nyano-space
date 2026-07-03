import { useNavigate } from 'react-router-dom'

const TrainURstaffPage = () => {
  const navigate = useNavigate()

  return (
    <main className="relative pt-40 pb-20 px-6 min-h-screen overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 space-y-16">
        <header className="space-y-6 text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.85]">
            Empower <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">Your Workforce</span>
          </h1>
        </header>

        <section className="p-12 rounded-[56px] bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-2xl space-y-10">
          <p className="text-3xl md:text-4xl text-slate-200 font-light leading-relaxed">
            Your team is your engine, but even the best engines overheat. <br className="hidden md:block" />
            <span className="text-white font-bold">Nyano Space</span> provides the precision tools to transform high-pressure environments into hubs of flow, focus, and <span className="text-teal-400 font-bold">sustained peak performance.</span>
          </p>
          <p className="text-xl text-slate-400 font-light max-w-3xl">
            We don't just reduce anxiety; we unlock the deep clarity required for your next breakthrough by training your staff in the science of presence.
          </p>

          <div className="pt-8 border-t border-white/5 space-y-4">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Ready to transform your team?</p>
            <button 
              onClick={() => navigate('/contact')}
              className="group text-5xl md:text-7xl font-black text-teal-400 hover:text-white transition-all flex items-center gap-6 italic tracking-tighter"
            >
              CONTACT <span className="text-teal-400 group-hover:translate-x-4 transition-transform inline-block">→</span>
            </button>
          </div>
        </section>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Reduce Burnout", desc: "Scientific techniques to manage workplace stress." },
            { title: "Focus & Clarity", desc: "Sharpen cognitive performance and decision making." },
            { title: "Team Harmony", desc: "Foster a culture of presence and mutual respect." }
          ].map((benefit, i) => (
            <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default TrainURstaffPage
