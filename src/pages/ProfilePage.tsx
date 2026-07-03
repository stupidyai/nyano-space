import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const ProfilePage = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const [instructor, setInstructor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<any>({})
  
  // States for adding/editing items
  const [showAddExp, setShowAddExp] = useState(false)
  const [showAddCert, setShowAddCert] = useState(false)
  const [editingExpId, setEditingExpId] = useState<string | null>(null)
  const [editingCertId, setEditingCertId] = useState<string | null>(null)
  
  const [newExp, setNewExp] = useState({ job_title: '', description: '', duration_hours: 0 })
  const [newCert, setNewCert] = useState({ name: '', description: '', link: '', duration_hours: 0 })

  // Technique search states
  const [techInput, setTechInput] = useState('')
  const [techSuggestions, setTechSuggestions] = useState<any[]>([])
  const [allTechniques, setAllTechniques] = useState<any[]>([])
  const [showAllTechs, setShowAllTechs] = useState(false)
  const [showPricingModal, setShowPricingModal] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [username])

  const fetchProfile = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('instructors')
      .select(`
        *,
        instructor_techniques (
          meditation_techniques (
            id,
            name
          )
        ),
        instructor_experience (*),
        instructor_certifications (*)
      `)
      .eq('username', username)
      .single()

    if (error) {
      console.error('Error fetching profile:', error.message)
    } else {
      setInstructor(data)
      setEditData(data)
      
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user?.id === data.id) {
        setIsOwner(true)
      }
    }
    setLoading(false)
    fetchAllTechniques()
  }

  const fetchAllTechniques = async () => {
    const { data } = await supabase
      .from('meditation_techniques')
      .select('id, name')
      .order('name', { ascending: true })
    setAllTechniques(data || [])
  }

  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from('instructors')
      .update({
        full_name: editData.full_name,
        bio: editData.bio,
        username: editData.username,
        hourly_rate: editData.hourly_rate,
        phone_number: editData.phone_number
      })
      .eq('id', instructor.id)

    if (error) alert(error.message)
    else {
      setIsEditing(false)
      if (editData.username !== username) {
        navigate(`/${editData.username}`)
      } else {
        fetchProfile()
      }
    }
  }

  // --- Technique Handlers ---
  const handleTechSearch = async (val: string) => {
    setTechInput(val)
    if (val.length < 2) {
      setTechSuggestions([])
      return
    }

    const { data } = await supabase
      .from('meditation_techniques')
      .select('id, name')
      .ilike('name', `${val}%`)
      .limit(5)

    setTechSuggestions(data || [])
  }

  const handleAddTechnique = async (techName: string) => {
    const name = techName.trim()
    if (!name) return

    try {
      // 1. Check if technique exists
      let { data: tech } = await supabase
        .from('meditation_techniques')
        .select('id')
        .ilike('name', name)
        .single()

      let techId = tech?.id

      // 2. If doesn't exist, create it
      if (!techId) {
        const { data: newTech, error: createError } = await supabase
          .from('meditation_techniques')
          .insert({ name })
          .select('id')
          .single()
        
        if (createError) throw createError
        techId = newTech.id
      }

      // 3. Link to instructor
      const { error: linkError } = await supabase
        .from('instructor_techniques')
        .insert({ instructor_id: instructor.id, technique_id: techId })

      if (linkError) {
        if (linkError.code === '23505') alert('You already have this technique listed.')
        else throw linkError
      }

      setTechInput('')
      setTechSuggestions([])
      fetchProfile()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleRemoveTechnique = async (techId: string) => {
    const { error } = await supabase
      .from('instructor_techniques')
      .delete()
      .eq('instructor_id', instructor.id)
      .eq('technique_id', techId)

    if (error) alert(error.message)
    else fetchProfile()
  }

  // --- Experience Handlers ---
  const handleAddExperience = async () => {
    const { error } = await supabase
      .from('instructor_experience')
      .insert({ ...newExp, instructor_id: instructor.id })

    if (error) alert(error.message)
    else {
      setShowAddExp(false)
      setNewExp({ job_title: '', description: '', duration_hours: 0 })
      fetchProfile()
    }
  }

  const handleUpdateExperience = async (id: string, data: any) => {
    const { error } = await supabase
      .from('instructor_experience')
      .update(data)
      .eq('id', id)

    if (error) alert(error.message)
    else fetchProfile()
  }

  const handleDeleteExperience = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    const { error } = await supabase
      .from('instructor_experience')
      .delete()
      .eq('id', id)

    if (error) alert(error.message)
    else fetchProfile()
  }

  // --- Certification Handlers ---
  const handleAddCertification = async () => {
    const { error } = await supabase
      .from('instructor_certifications')
      .insert({ ...newCert, instructor_id: instructor.id })

    if (error) alert(error.message)
    else {
      setShowAddCert(false)
      setNewCert({ name: '', description: '', link: '', duration_hours: 0 })
      fetchProfile()
    }
  }

  const handleUpdateCertification = async (id: string, data: any) => {
    const { error } = await supabase
      .from('instructor_certifications')
      .update(data)
      .eq('id', id)

    if (error) alert(error.message)
    else fetchProfile()
  }

  const handleDeleteCertification = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    const { error } = await supabase
      .from('instructor_certifications')
      .delete()
      .eq('id', id)

    if (error) alert(error.message)
    else fetchProfile()
  }

  const formatUrl = (url: string) => {
    if (!url) return ''
    return url.startsWith('http') ? url : `https://${url}`
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-teal-500 animate-pulse">Gathering energy...</div></div>

  if (!instructor) return <div className="text-center pt-40"><p>Instructor not found.</p><button onClick={() => navigate('/instructors')}>Back</button></div>

  return (
    <main className="relative pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Profile Header */}
        <section className="space-y-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="space-y-4 w-full md:w-auto">
                {isEditing ? (
                  <div className="space-y-4">
                    <input className="text-3xl md:text-5xl font-extrabold bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white w-full" value={editData.full_name} onChange={e => setEditData({...editData, full_name: e.target.value})} />
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex items-center gap-2 text-teal-400 flex-1">
                        <span className="font-bold">@</span>
                        <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-teal-400 w-full" value={editData.username} onChange={e => setEditData({...editData, username: e.target.value})} />
                      </div>
                      <div className="flex items-center gap-2 text-indigo-400 justify-center md:justify-start">
                        <span className="font-bold">$</span>
                        <input 
                          type="number" 
                          min="0"
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-indigo-400 w-24" 
                          placeholder="Rate" 
                          value={editData.hourly_rate || ''} 
                          onChange={e => {
                            const val = parseFloat(e.target.value) || 0
                            setEditData({...editData, hourly_rate: Math.max(0, val)})
                          }} 
                        />
                        <span className="text-xs font-bold">/hr</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-xs font-bold uppercase tracking-widest">Phone:</span>
                      <input 
                        type="tel"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm w-full md:w-64"
                        value={editData.phone_number || ''}
                        onChange={e => setEditData({...editData, phone_number: e.target.value})}
                        placeholder="+1..."
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row md:items-end justify-center md:justify-start gap-4">
                      <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight">{instructor.full_name}</h1>
                      {instructor.hourly_rate > 0 && (
                        <span className="px-4 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold mb-2">
                          ${instructor.hourly_rate}/hr
                        </span>
                      )}
                    </div>
                    <p className="text-teal-400 text-xl md:text-2xl font-medium tracking-tight">@{instructor.username}</p>
                  </>
                )}
            </div>
            {isOwner && (
              <button onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)} className="w-full md:w-auto px-8 py-4 bg-white/5 hover:bg-teal-500 hover:text-slate-950 border border-white/10 rounded-full text-white transition-all font-bold uppercase tracking-widest text-xs">
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </button>
            )}
          </div>
          {isEditing ? (
            <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-300 min-h-[160px] text-base md:text-lg leading-relaxed" value={editData.bio} onChange={e => setEditData({...editData, bio: e.target.value})} />
          ) : (
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light max-w-3xl">{instructor.bio || "Experience the silence within. No bio provided."}</p>
          )}

          {/* Techniques Tag Section */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {instructor.instructor_techniques?.map((t: any) => (
                <div key={t.meditation_techniques.id} className="group/tech relative">
                  <span className="px-5 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                    {t.meditation_techniques.name}
                    {isEditing && (
                      <button onClick={() => handleRemoveTechnique(t.meditation_techniques.id)} className="hover:text-red-400 transition-colors">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="relative max-w-sm mx-auto md:mx-0 flex gap-2">
                <div className="relative flex-1">
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-teal-500/50 outline-none pr-10"
                    placeholder="Search or add technique..."
                    value={techInput}
                    onChange={e => handleTechSearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddTechnique(techInput)}
                  />
                  <button 
                    onClick={() => setShowAllTechs(!showAllTechs)}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-teal-400 transition-all ${showAllTechs ? 'rotate-180' : ''}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
                  </button>

                  {/* Suggestions Dropdown */}
                  {techSuggestions.length > 0 && !showAllTechs && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-slate-900 border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                      {techSuggestions.map(s => (
                        <button 
                          key={s.id} 
                          onClick={() => handleAddTechnique(s.name)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-teal-500 hover:text-slate-950 transition-colors"
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* All Techniques Dropdown */}
                  {showAllTechs && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-slate-900 border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-2 border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">All Available Techniques</div>
                      {allTechniques.map(s => (
                        <button 
                          key={s.id} 
                          onClick={() => {
                            handleAddTechnique(s.name)
                            setShowAllTechs(false)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-teal-500 hover:text-slate-950 transition-colors"
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {techInput.length >= 2 && !techSuggestions.find(s => s.name.toLowerCase() === techInput.toLowerCase()) && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-slate-900 border border-white/10 rounded-xl p-2 z-50">
                      <button 
                        onClick={() => handleAddTechnique(techInput)}
                        className="w-full text-xs text-teal-400 hover:underline"
                      >
                        Create new: "{techInput}"
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Experience & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {/* Experience Section */}
          <section className="p-10 rounded-[40px] bg-slate-900/40 border border-white/5 backdrop-blur-sm space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                Experience
              </h3>
              {isOwner && isEditing && (
                <button onClick={() => setShowAddExp(!showAddExp)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-teal-500 hover:text-slate-950 transition-all text-xl">
                  {showAddExp ? '×' : '+'}
                </button>
              )}
            </div>

            {showAddExp && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] space-y-4 animate-in slide-in-from-top-4 duration-300">
                <input className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 text-white" placeholder="Job Title" value={newExp.job_title} onChange={e => setNewExp({...newExp, job_title: e.target.value})} />
                <textarea className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 text-white" placeholder="Description" value={newExp.description} onChange={e => setNewExp({...newExp, description: e.target.value})} />
                <input type="number" min="0" className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 text-white" placeholder="Duration (Hours)" value={newExp.duration_hours || ''} onChange={e => setNewExp({...newExp, duration_hours: Math.max(0, parseInt(e.target.value) || 0)})} />
                <button onClick={handleAddExperience} className="w-full py-3 bg-teal-500 text-slate-950 font-bold rounded-2xl transition-all hover:scale-[1.02]">Add Entry</button>
              </div>
            )}

            <div className="space-y-8">
              {instructor.instructor_experience?.map((exp: any) => (
                <div key={exp.id} className="group/item relative space-y-3">
                  {editingExpId === exp.id ? (
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                      <input className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white" value={exp.job_title} onChange={e => handleUpdateExperience(exp.id, { job_title: e.target.value })} />
                      <textarea className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white text-sm" value={exp.description} onChange={e => handleUpdateExperience(exp.id, { description: e.target.value })} />
                      <div className="flex gap-2">
                        <button onClick={() => setEditingExpId(null)} className="flex-1 py-2 bg-white/5 rounded-xl text-xs">Done</button>
                        <button onClick={() => handleDeleteExperience(exp.id)} className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-xl text-xs">Delete</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <p className="text-white text-lg font-bold">{exp.job_title}</p>
                        <div className="flex items-center gap-2">
                          {exp.duration_hours > 0 && <span className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-slate-500 font-bold">{exp.duration_hours}h</span>}
                          {isOwner && isEditing && (
                            <button onClick={() => setEditingExpId(exp.id)} className="opacity-0 group-hover/item:opacity-100 p-1 hover:text-teal-400 transition-all">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-sm">{exp.description}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section className="p-10 rounded-[40px] bg-slate-900/40 border border-white/5 backdrop-blur-sm space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-2 bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]"></span>
                Certifications
              </h3>
              {isOwner && isEditing && (
                <button onClick={() => setShowAddCert(!showAddCert)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-teal-500 hover:text-slate-950 transition-all text-xl">
                  {showAddCert ? '×' : '+'}
                </button>
              )}
            </div>

            {showAddCert && (
              <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] space-y-4 animate-in slide-in-from-top-4 duration-300">
                <input className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 text-white" placeholder="Certification Name" value={newCert.name} onChange={e => setNewCert({...newCert, name: e.target.value})} />
                <textarea className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 text-white" placeholder="Description" value={newCert.description} onChange={e => setNewCert({...newCert, description: e.target.value})} />
                <input className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 text-white" placeholder="Link" value={newCert.link} onChange={e => setNewCert({...newCert, link: e.target.value})} />
                <input type="number" min="0" className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 text-white" placeholder="Duration (Hours)" value={newCert.duration_hours || ''} onChange={e => setNewCert({...newCert, duration_hours: Math.max(0, parseInt(e.target.value) || 0)})} />
                <button onClick={handleAddCertification} className="w-full py-3 bg-teal-500 text-slate-950 font-bold rounded-2xl transition-all hover:scale-[1.02]">Add Entry</button>
              </div>
            )}

            <div className="space-y-8">
              {instructor.instructor_certifications?.map((cert: any) => (
                <div key={cert.id} className="group/item relative space-y-3">
                  {editingCertId === cert.id ? (
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                      <input className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white" value={cert.name} onChange={e => handleUpdateCertification(cert.id, { name: e.target.value })} />
                      <textarea className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white text-sm" value={cert.description} onChange={e => handleUpdateCertification(cert.id, { description: e.target.value })} />
                      <input className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white text-xs" value={cert.link} onChange={e => handleUpdateCertification(cert.id, { link: e.target.value })} />
                      <div className="flex gap-2">
                        <button onClick={() => setEditingCertId(null)} className="flex-1 py-2 bg-white/5 rounded-xl text-xs">Done</button>
                        <button onClick={() => handleDeleteCertification(cert.id)} className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-xl text-xs">Delete</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <p className="text-white text-lg font-bold">{cert.name}</p>
                        <div className="flex items-center gap-2">
                          {cert.duration_hours > 0 && <span className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-slate-500 font-bold">{cert.duration_hours}h</span>}
                          {isOwner && isEditing && (
                            <button onClick={() => setEditingCertId(cert.id)} className="opacity-0 group-hover/item:opacity-100 p-1 hover:text-teal-400 transition-all">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-sm">{cert.description}</p>
                      {cert.link && <a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer" className="text-teal-400 text-sm hover:underline">View Certificate</a>}
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Contact CTA for Regular Users */}
        {!isOwner && (
          <div className="flex justify-center pt-12">
            <button 
              onClick={() => setShowPricingModal(true)}
              className="group relative px-12 py-5 bg-teal-500 text-slate-950 font-black rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(20,184,166,0.4)] uppercase italic tracking-tighter"
            >
              <span className="relative z-10 flex items-center gap-3 text-xl">
                Contact your instructor
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>
        )}
      </div>

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowPricingModal(false)}></div>
          
          <div className="relative w-full max-w-5xl bg-slate-900/40 border border-white/10 backdrop-blur-2xl rounded-[48px] p-8 md:p-16 shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowPricingModal(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Choose Your <span className="text-teal-400">Package</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Select a plan to start your journey. Each package gives you access to the <span className="text-white font-bold italic">direct contact information</span> of the specified number of instructors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className="p-10 rounded-[32px] bg-white/5 border border-white/10 space-y-8 flex flex-col items-center text-center group hover:bg-white/10 transition-colors">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Starter</h3>
                  <div className="text-5xl font-black text-white">$10</div>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-white">5 Instructors</p>
                  <p className="text-slate-500 text-sm">($2.00 each)</p>
                </div>
                <button onClick={() => navigate('/contact')} className="w-full py-4 bg-white/10 hover:bg-teal-500 hover:text-slate-950 text-white font-bold rounded-2xl border border-white/10 transition-all uppercase tracking-widest text-xs">
                  Pay
                </button>
              </div>

              {/* Better Value */}
              <div className="relative p-10 rounded-[32px] bg-teal-500/10 border border-teal-500/30 space-y-8 flex flex-col items-center text-center group hover:bg-teal-500/20 transition-colors">
                <div className="absolute -top-4 px-4 py-1 bg-teal-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full">Better Value</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-teal-400 uppercase tracking-widest">Grow</h3>
                  <div className="text-5xl font-black text-white">$24</div>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-white">15 Instructors</p>
                  <p className="text-slate-500 text-sm">($1.60 each, 20% discount)</p>
                </div>
                <button onClick={() => navigate('/contact')} className="w-full py-4 bg-teal-500 text-slate-950 font-bold rounded-2xl transition-all uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                  Pay
                </button>
              </div>

              {/* Best Value */}
              <div className="relative p-10 rounded-[32px] bg-indigo-500/10 border border-indigo-500/30 space-y-8 flex flex-col items-center text-center group hover:bg-indigo-500/20 transition-colors">
                <div className="absolute -top-4 px-4 py-1 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Best Value</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-indigo-400 uppercase tracking-widest">Master</h3>
                  <div className="text-5xl font-black text-white">$30</div>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-white">20 Instructors</p>
                  <p className="text-slate-500 text-sm">($1.50 each, 25% discount)</p>
                </div>
                <button onClick={() => navigate('/contact')} className="w-full py-4 bg-indigo-500 text-white font-bold rounded-2xl transition-all uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default ProfilePage
