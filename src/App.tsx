import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from './lib/supabase'
import BackgroundAnimation from './components/BackgroundAnimation'
import Navigation from './components/Navigation'
import LandingPage from './pages/LandingPage'
import InstructorsPage from './pages/InstructorsPage'
import ProfilePage from './pages/ProfilePage'
import CompleteProfilePage from './pages/CompleteProfilePage'
import AlgoMeditationPage from './pages/AlgoMeditationPage'
import BoxBreathingPage from './pages/BoxBreathingPage'
import MantraMeditationPage from './pages/MantraMeditationPage'
import TrainURstaffPage from './pages/TrainURstaffPage'
import ContactPage from './pages/ContactPage'

// This component handles the redirection logic inside the Router context
const AuthRedirectHandler = ({ session }: { session: any }) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const checkProfile = async () => {
      if (!session?.user) return

      console.log("Checking profile status for user:", session.user.id)
      
      const { data, error } = await supabase
        .from('instructors')
        .select('is_profile_complete, username, phone_number')
        .eq('id', session.user.id)
        .single()

      if (error || !data || !data.is_profile_complete || !data.username || !data.phone_number) {
        console.log("Profile incomplete, missing username/phone, or missing record. Redirecting...")
        if (location.pathname !== '/complete-profile') {
          navigate('/complete-profile')
        }
      }
    }

    checkProfile()
  }, [session, location.pathname, navigate])

  return null
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [])

  return (
    <Router>
      <AuthRedirectHandler session={session} />
      <div className="min-h-screen text-slate-200 font-sans selection:bg-teal-500/30">
        <BackgroundAnimation />
        <Navigation isScrolled={isScrolled} user={session?.user} />

        <Routes>
          <Route path="/" element={<LandingPage user={session?.user} />} />
          <Route path="/instructors" element={<InstructorsPage />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/complete-profile" element={<CompleteProfilePage user={session?.user} />} />
          <Route path="/algo-meditation" element={<AlgoMeditationPage />} />
          <Route path="/algo-meditation/box-breathing" element={<BoxBreathingPage />} />
          <Route path="/algo-meditation/mantra" element={<MantraMeditationPage />} />
          <Route path="/train-ur-staff" element={<TrainURstaffPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <footer className="py-20 border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
            <div className="text-2xl font-bold tracking-tighter text-white italic font-serif">nyano.space</div>
            <p className="text-slate-400 text-sm">© 2026 Nyano Space. Elevating human consciousness, together.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
