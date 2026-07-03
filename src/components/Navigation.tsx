import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const Navigation = ({ isScrolled, user }: { isScrolled: boolean, user: any }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (user) {
      const fetchUsername = async () => {
        const { data } = await supabase
          .from('instructors')
          .select('username')
          .eq('id', user.id)
          .single()
        if (data) setUsername(data.username)
      }
      fetchUsername()
    } else {
      setUsername(null)
    }
  }, [user])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsMobileMenuOpen(false)
    navigate('/')
  }

  const navLinks = [
    { name: 'TRAIN UR STAFF', path: '/train-ur-staff' },
    { name: 'ALGO MEDITATION', path: '/algo-meditation' },
    { name: 'CONTACT', path: '/contact' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'py-4 bg-black/40 backdrop-blur-xl border-b border-white/5' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-indigo-500 rounded-xl flex items-center justify-center rotate-45 group-hover:rotate-[225deg] transition-transform duration-700">
            <div className="w-4 h-4 bg-white/20 rounded-full blur-sm animate-pulse"></div>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic whitespace-nowrap">nyano <span className="text-teal-400">space</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          {navLinks.map(link => (
            <button key={link.path} onClick={() => navigate(link.path)} className="hover:text-teal-400 transition-colors uppercase tracking-widest text-[10px] font-bold">{link.name}</button>
          ))}
          {user && (
            <div className="flex items-center gap-6 pl-4 border-l border-white/10">
              <span 
                onClick={() => username && navigate(`/${username}`)}
                className="text-xs text-teal-400 font-bold cursor-pointer hover:underline uppercase italic"
              >
                {username ? `@${username}` : user.email}
              </span>
              <button 
                onClick={handleLogout}
                className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all text-[10px] font-bold uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white transition-all"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100 py-10' : 'max-h-0 opacity-0 py-0'}`}>
        <div className="flex flex-col items-center gap-8 px-6 text-center">
          {navLinks.map(link => (
            <button 
              key={link.path} 
              onClick={() => { navigate(link.path); setIsMobileMenuOpen(false); }} 
              className="text-2xl font-black text-white uppercase italic tracking-tighter hover:text-teal-400 transition-colors"
            >
              {link.name}
            </button>
          ))}
          {user && (
            <div className="w-full pt-8 mt-4 border-t border-white/10 space-y-6">
              <span 
                onClick={() => { username && navigate(`/${username}`); setIsMobileMenuOpen(false); }}
                className="block text-xl text-teal-400 font-bold italic"
              >
                {username ? `@${username}` : user.email}
              </span>
              <button 
                onClick={handleLogout}
                className="w-full py-4 bg-white/5 border border-white/10 rounded-3xl text-white font-bold uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
