import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const LandingPage = ({ user }: { user?: any }) => {
  const navigate = useNavigate()
  const handleJoin = async () => {
    if (user) return // Should not happen if button is hidden
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account'
        }
      }
    })
    if (error) console.error('Error signing in:', error.message)
  }

  return (
    <main className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-teal-400 mb-4">
            Real Human Connection
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter text-white leading-[1.1]">
            1-on-1 Online Meditation <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 italic font-serif"> & chantings</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light px-4">
            Experience the profound power of shared presence. In an era of machines and AI voices, Nyano Space offers the <span className="text-slate-200 font-medium">real human touch</span> through personalized, real-time guidance.
          </p>
        </section>

        {/* Choose Instructor CTA */}
        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <button 
            onClick={() => navigate('/instructors')}
            className="group relative px-8 py-4 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 font-bold tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Choose your instructor
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/0 via-indigo-500/20 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </button>
        </div>

        {/* Action Cards */}
        <section className="max-w-xl mx-auto">
          <div className="group relative p-8 md:p-12 rounded-[40px] bg-slate-900/40 border border-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-teal-500/30 hover:bg-slate-900/60 shadow-2xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] group-hover:bg-teal-500/20 transition-colors duration-500"></div>
            <div className="relative space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white">Continue as Instructor</h3>
                <p className="text-slate-400 leading-relaxed">
                  Guide others on their journey. Share your energy and experience with a community that values human presence over algorithms.
                </p>
              </div>
              {user ? (
                <div className="space-y-4">
                  <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-teal-400 text-sm font-medium">
                    You are currently logged in as an instructor.
                  </div>
                  <button 
                    onClick={() => navigate('/instructors')}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all"
                  >
                    Explore Directory
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleJoin}
                  className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
                >
                  Join Now
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="pt-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Why Human Presence Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Shared Energy', desc: 'Meditating together creates a resonance that solitary apps cannot replicate.' },
              { title: 'Live Guidance', desc: 'Instructors adapt to the group mood and energy in real-time.' },
              { title: 'Accountability', desc: 'Showing up for someone else helps you show up for yourself.' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div className="text-teal-400 font-serif text-3xl italic">0{idx + 1}.</div>
                <h4 className="text-xl font-bold text-slate-200">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default LandingPage
