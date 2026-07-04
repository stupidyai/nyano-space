'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { generateCoupleSlug } from '@/lib/utils';
import BackgroundAnimations from '@/components/BackgroundAnimations';
import Link from 'next/link';

interface TimelineEventInput {
  id?: string;
  title: string;
  event_date: string;
  description: string;
  event_type: string;
  instagram_url: string;
}

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [couples, setCouples] = useState<any[]>([]);
  const [selectedCoupleId, setSelectedCoupleId] = useState<string>('');
  
  const [femaleName, setFemaleName] = useState('');
  const [maleName, setMaleName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  
  const [femaleInstagram, setFemaleInstagram] = useState('@nyanospace');
  const [femaleX, setFemaleX] = useState('@nyanospace');
  const [maleInstagram, setMaleInstagram] = useState('@nyanospace');
  const [maleX, setMaleX] = useState('@nyanospace');

  const [events, setEvents] = useState<TimelineEventInput[]>([
    { title: 'How we met', event_date: '', description: '', event_type: 'met', instagram_url: 'https://www.instagram.com/nyanospace/' }
  ]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAdmin(true);
      fetchCouples();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'nyanospace@gmail.com' && loginPassword === 'Strong1728!') {
      setIsAdmin(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setLoginError('');
      fetchCouples();
    } else {
      setLoginError('Invalid email or password. Access denied.');
    }
  };

  const fetchCouples = async () => {
    const { data, error } = await supabase.from('couples').select('*').order('created_at', { ascending: false });
    if (!error && data) setCouples(data);
  };

  const loadCoupleData = async (id: string) => {
    if (!id) {
      resetForm();
      return;
    }
    setFetching(true);
    const { data: couple, error: coupleError } = await supabase.from('couples').select('*').eq('id', id).single();
    if (couple) {
      setFemaleName(couple.female_name);
      setMaleName(couple.male_name);
      setWeddingDate(couple.wedding_date);
      setFemaleInstagram(couple.female_instagram || '');
      setFemaleX(couple.female_x || '');
      setMaleInstagram(couple.male_instagram || '');
      setMaleX(couple.male_x || '');
      
      const { data: timelineEvents, error: eventsError } = await supabase
        .from('timeline_events')
        .select('*')
        .eq('couple_id', id)
        .order('order', { ascending: true });
      
      if (timelineEvents && timelineEvents.length > 0) {
        setEvents(timelineEvents.map(e => ({
          id: e.id,
          title: e.title,
          event_date: e.event_date,
          description: e.description,
          event_type: e.event_type,
          instagram_url: e.instagram_url || 'https://www.instagram.com/nyanospace/'
        })));
      }
    }
    setFetching(false);
  };

  const resetForm = () => {
    setSelectedCoupleId('');
    setFemaleName('');
    setMaleName('');
    setWeddingDate('');
    setFemaleInstagram('@nyanospace');
    setFemaleX('@nyanospace');
    setMaleInstagram('@nyanospace');
    setMaleX('@nyanospace');
    setEvents([{ title: 'How we met', event_date: '', description: '', event_type: 'met', instagram_url: 'https://www.instagram.com/nyanospace/' }]);
  };

  const addEvent = () => {
    setEvents([...events, { title: '', event_date: '', description: '', event_type: '', instagram_url: 'https://www.instagram.com/nyanospace/' }]);
  };

  const updateEvent = (index: number, field: keyof TimelineEventInput, value: string) => {
    const newEvents = [...events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setEvents(newEvents);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const slug = generateCoupleSlug(femaleName, maleName, weddingDate);
      let coupleId = selectedCoupleId;

      if (selectedCoupleId) {
        // Update Couple
        const { error: coupleError } = await supabase
          .from('couples')
          .update({
            female_name: femaleName,
            male_name: maleName,
            wedding_date: weddingDate,
            slug: slug,
            female_instagram: femaleInstagram,
            female_x: femaleX,
            male_instagram: maleInstagram,
            male_x: maleX,
          })
          .eq('id', selectedCoupleId);
        if (coupleError) throw coupleError;
      } else {
        // Create Couple
        const { data: coupleData, error: coupleError } = await supabase
          .from('couples')
          .insert({
            female_name: femaleName,
            male_name: maleName,
            wedding_date: weddingDate,
            slug: slug,
            female_instagram: femaleInstagram,
            female_x: femaleX,
            male_instagram: maleInstagram,
            male_x: maleX,
          })
          .select()
          .single();
        if (coupleError) throw coupleError;
        coupleId = coupleData.id;
      }

      // 2. Manage Timeline Events (Delete and re-insert for simplicity, or upsert)
      if (selectedCoupleId) {
        await supabase.from('timeline_events').delete().eq('couple_id', selectedCoupleId);
      }

      const eventsToInsert = events
        .filter(e => e.title && e.event_date)
        .map((e, index) => ({
          couple_id: coupleId,
          title: e.title,
          event_date: e.event_date,
          description: e.description,
          event_type: e.event_type,
          instagram_url: e.instagram_url,
          order: index
        }));

      if (eventsToInsert.length > 0) {
        const { error: eventsError } = await supabase
          .from('timeline_events')
          .insert(eventsToInsert);
        if (eventsError) throw eventsError;
      }

      setMessage({ text: `Success! Story ${selectedCoupleId ? 'updated' : 'created'} at /couples/${slug}`, type: 'success' });
      fetchCouples();
      if (!selectedCoupleId) resetForm();
    } catch (error: any) {
      console.error(error);
      setMessage({ text: error.message || 'Error creating story', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-white font-poppins pb-20 pt-16 sm:pt-20">
      <BackgroundAnimations />
      
      {!isAdmin ? (
        <main className="pt-24 max-w-md mx-auto px-6 relative z-10">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-primary/5 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl">🔐</span>
            </div>
            <h1 className="text-3xl font-black text-foreground mb-2 uppercase italic tracking-tighter">
              Admin <span className="text-primary">Portal</span>
            </h1>
            <p className="text-gray-500 mb-8 font-light">Please verify your identity to continue.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-left space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@nyanospace.com"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              <div className="text-left space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              
              {loginError && (
                <p className="text-red-500 text-sm font-bold mt-2 animate-bounce">{loginError}</p>
              )}
              
              <button
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-black text-lg hover:shadow-xl transition-all mt-4 active:scale-95"
              >
                Enter Dashboard
              </button>
            </form>
            
            <Link href="/" className="inline-block mt-8 text-gray-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">
              ← Back to Public Site
            </Link>
          </div>
        </main>
      ) : (
        <main className="pt-12 max-w-4xl mx-auto px-6 relative z-10">
          <header className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-foreground mb-4">
                {selectedCoupleId ? 'Edit' : 'Create'} Couple <span className="text-primary">Love Story</span>
              </h1>
              <p className="text-gray-600">Enter the details to generate a unique time tree for the couple.</p>
            </div>
            <button 
              onClick={() => {
                sessionStorage.removeItem('isAdminAuthenticated');
                setIsAdmin(false);
              }}
              className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-red-50 hover:text-red-500 transition-all text-sm whitespace-nowrap"
            >
              Logout
            </button>
          </header>

        {/* Couple Selector */}
        <section className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5 mb-8">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider block mb-4">Select Couple to Edit (Optional)</label>
          <select 
            value={selectedCoupleId}
            onChange={(e) => {
              setSelectedCoupleId(e.target.value);
              loadCoupleData(e.target.value);
            }}
            className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          >
            <option value="">-- Create New Couple --</option>
            {couples.map(c => (
              <option key={c.id} value={c.id}>{c.female_name} & {c.male_name}</option>
            ))}
          </select>
          {fetching && <p className="mt-2 text-primary animate-pulse text-sm font-medium">Loading couple data...</p>}
        </section>

        {message.text && (
          <div className={`p-4 rounded-2xl mb-8 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {message.text}
            {message.type === 'success' && (
              <Link href={`/couples/${generateCoupleSlug(femaleName || 'preview', maleName || 'preview', weddingDate || '2026-01-01')}`} className="block mt-2 font-bold underline">
                View Created Story →
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Couple Details */}
          <section className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5">
            <h2 className="text-2xl font-bold mb-6 text-primary">Couple Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Female Partner Name</label>
                <input
                  required
                  type="text"
                  value={femaleName}
                  onChange={(e) => setFemaleName(e.target.value)}
                  placeholder="e.g. Priya"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Male Partner Name</label>
                <input
                  required
                  type="text"
                  value={maleName}
                  onChange={(e) => setMaleName(e.target.value)}
                  placeholder="e.g. Rahul"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Wedding Date</label>
                <input
                  required
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Partner Socials */}
              <div className="md:col-span-2 grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                {/* Female Socials */}
                <div className="space-y-4">
                  <h3 className="font-bold text-secondary uppercase text-sm tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    {femaleName || 'Female Partner'} Socials
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-20">Instagram</span>
                      <input
                        type="text"
                        value={femaleInstagram}
                        onChange={(e) => setFemaleInstagram(e.target.value)}
                        placeholder="@username"
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/10"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-20">X (Twitter)</span>
                      <input
                        type="text"
                        value={femaleX}
                        onChange={(e) => setFemaleX(e.target.value)}
                        placeholder="@username"
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Male Socials */}
                <div className="space-y-4">
                  <h3 className="font-bold text-primary uppercase text-sm tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    {maleName || 'Male Partner'} Socials
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-20">Instagram</span>
                      <input
                        type="text"
                        value={maleInstagram}
                        onChange={(e) => setMaleInstagram(e.target.value)}
                        placeholder="@username"
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-20">X (Twitter)</span>
                      <input
                        type="text"
                        value={maleX}
                        onChange={(e) => setMaleX(e.target.value)}
                        placeholder="@username"
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline Events */}
          <section className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Time Tree Events</h2>
              <button
                type="button"
                onClick={addEvent}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all text-sm"
              >
                + Add Event
              </button>
            </div>

            <div className="space-y-8">
              {events.map((event, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeEvent(index)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold"
                    >
                      ✕
                    </button>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Event Title</label>
                      <input
                        required
                        type="text"
                        value={event.title}
                        onChange={(e) => updateEvent(index, 'title', e.target.value)}
                        placeholder="e.g. First Meeting"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Event Date</label>
                      <input
                        required
                        type="date"
                        value={event.event_date}
                        onChange={(e) => updateEvent(index, 'event_date', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Event Type</label>
                      <input
                        type="text"
                        value={event.event_type}
                        onChange={(e) => updateEvent(index, 'event_type', e.target.value)}
                        placeholder="e.g. met, engagement"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Instagram Link</label>
                      <input
                        type="url"
                        value={event.instagram_url}
                        onChange={(e) => updateEvent(index, 'instagram_url', e.target.value)}
                        placeholder="https://www.instagram.com/..."
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                      <textarea
                        value={event.description}
                        onChange={(e) => updateEvent(index, 'description', e.target.value)}
                        placeholder="Tell the story of this moment..."
                        rows={3}
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-3xl font-black text-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Love Story...' : 'Generate Time Tree & Save'}
          </button>
        </form>
      </main>
      )}
    </div>
  );
}
