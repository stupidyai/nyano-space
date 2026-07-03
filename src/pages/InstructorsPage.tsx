import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState<any[]>([])
  const [techniques, setTechniques] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('none')
  const [selectedTech, setSelectedTech] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Instructors
      const { data: instData, error: instError } = await supabase
        .from('instructors')
        .select(`
          id,
          full_name,
          username,
          hourly_rate,
          instructor_techniques (
            meditation_techniques (
              name
            )
          )
        `)
      
      // Fetch Techniques for dropdown
      const { data: techData } = await supabase
        .from('meditation_techniques')
        .select('name')
        .order('name')

      if (instError) console.error('Error fetching instructors:', instError.message)
      else setInstructors(instData || [])
      if (techData) setTechniques(techData)
      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredInstructors = instructors
    .filter(inst => {
      const query = searchQuery.toLowerCase()
      const matchesSearch = inst.full_name?.toLowerCase().includes(query) || inst.username?.toLowerCase().includes(query)
      const matchesTech = selectedTech === 'all' || inst.instructor_techniques?.some((it: any) => it.meditation_techniques?.name === selectedTech)
      return matchesSearch && matchesTech
    })
    .sort((a, b) => {
      if (sortBy === 'low-high') return (a.hourly_rate || 0) - (b.hourly_rate || 0)
      if (sortBy === 'high-low') return (b.hourly_rate || 0) - (a.hourly_rate || 0)
      return 0
    })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] pt-32">
        <div className="text-slate-400 animate-pulse font-medium">Loading directory...</div>
      </div>
    )
  }

  return (
    <main className="relative pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="text-center space-y-4 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white">
            Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400 italic">Human Guides</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-light">
            Connect with experienced practitioners for personalized, real-time meditation and chanting sessions.
          </p>
        </header>

        {/* Filter Bar */}
        <section className="max-w-5xl mx-auto px-6">
          <div className="p-4 md:p-6 bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-[32px] flex flex-col md:flex-row gap-4 items-center shadow-2xl">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text"
                placeholder="Search by name or username..."
                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-teal-500/50 transition-all placeholder:text-slate-600 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Tag Dropdown */}
            <div className="relative w-full md:w-64">
              <select 
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none text-sm font-medium"
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
              >
                <option value="all" className="bg-slate-900 text-white">All Techniques</option>
                {techniques.map(tech => (
                  <option key={tech.name} value={tech.name} className="bg-slate-900 text-white">{tech.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full md:w-64">
              <select 
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none text-sm font-medium"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="none" className="bg-slate-900 text-white">Sort By Price</option>
                <option value="low-high" className="bg-slate-900 text-white">Price: Low to High</option>
                <option value="high-low" className="bg-slate-900 text-white">Price: High to Low</option>
              </select>
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {filteredInstructors.map((instructor) => (
            <div 
              key={instructor.id} 
              className="group relative p-8 rounded-[32px] bg-slate-900/40 border border-white/5 backdrop-blur-sm transition-all duration-500 hover:border-teal-500/30 hover:bg-slate-900/60 shadow-2xl"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-teal-500/10 to-indigo-500/10 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">
                      {instructor.full_name || 'Anonymous Instructor'}
                    </h3>
                    <p className="text-slate-500 font-medium">@{instructor.username || 'user'}</p>
                  </div>
                  {instructor.hourly_rate > 0 && (
                    <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold whitespace-nowrap">
                      ${instructor.hourly_rate}/hr
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-500/70">
                    Specializations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {instructor.instructor_techniques?.map((it: any, idx: number) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 group-hover:border-teal-500/20"
                      >
                        {it.meditation_techniques?.name}
                      </span>
                    ))}
                    {(!instructor.instructor_techniques || instructor.instructor_techniques.length === 0) && (
                      <span className="text-xs text-slate-600 italic">General Meditation</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/${instructor.username}`)}
                  className="w-full py-4 bg-white/5 hover:bg-teal-500 hover:text-slate-950 text-white font-bold rounded-2xl border border-white/10 hover:border-teal-500 transition-all duration-300"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
          
          {filteredInstructors.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white/5 rounded-[32px] border border-dashed border-white/10">
              <p className="text-slate-500">No instructors match your search criteria.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedTech('all'); setSortBy('none'); }} className="mt-4 text-teal-400 hover:underline text-sm font-bold uppercase tracking-widest">Clear Filters</button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default InstructorsPage
