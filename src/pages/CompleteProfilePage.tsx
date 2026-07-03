import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const CompleteProfilePage = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    full_name: user?.user_metadata?.full_name || '',
    phone_number: '',
    bio: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.username) {
      setError('Username is required')
      setLoading(false)
      return
    }

    if (!formData.phone_number) {
      setError('Phone number is required')
      setLoading(false)
      return
    }

    try {
      const { error: updateError } = await supabase
        .from('instructors')
        .upsert({
          id: user.id,
          username: formData.username.toLowerCase().trim(),
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          bio: formData.bio,
          is_profile_complete: true,
          updated_at: new Date().toISOString()
        })

      if (updateError) throw updateError

      // Redirect to their new profile
      navigate(`/${formData.username}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative pt-40 pb-20 px-6 flex items-center justify-center min-h-screen">
      <div className="max-w-xl w-full p-10 rounded-[40px] bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Complete Your <span className="text-teal-400">Profile</span></h1>
          <p className="text-slate-400">Set up your identity on Nyano Space.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-4">Username</label>
            <input 
              type="text"
              placeholder="e.g. zen_master"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-teal-500/50 transition-all"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
            <input 
              type="text"
              placeholder="Your Full Name"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-teal-500/50 transition-all"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-4">Phone Number</label>
            <input 
              type="tel"
              placeholder="+1 234 567 8900"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-teal-500/50 transition-all"
              value={formData.phone_number}
              onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-4">Bio</label>
            <textarea 
              placeholder="Your meditation philosophy..."
              rows={4}
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-teal-500/50 transition-all resize-none"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-700 text-slate-950 font-extrabold rounded-2xl transition-all shadow-[0_0_30px_rgba(20,184,166,0.2)] hover:scale-[1.02]"
          >
            {loading ? 'Processing...' : 'Complete Onboarding'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default CompleteProfilePage
