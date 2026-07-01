'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import BackgroundAnimations from '@/components/BackgroundAnimations';
import Link from 'next/link';

interface TimelineEvent {
  id: string;
  title: string;
  event_date: string;
  description: string;
  event_type: string;
  instagram_url?: string;
  tiktok_url?: string;
}

interface Couple {
  id: string;
  female_name: string;
  male_name: string;
  wedding_date: string;
  slug: string;
  female_instagram?: string;
  female_tiktok?: string;
  female_x?: string;
  male_instagram?: string;
  male_tiktok?: string;
  male_x?: string;
  is_example?: boolean;
}

export default function CoupleTimeTreeClient() {
  const { slug } = useParams();
  const [couple, setCouple] = useState<Couple | null>(null);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [stardust, setStardust] = useState<{ id: number; left: string; delay: string; size: string }[]>([]);

  useEffect(() => {
    // Generate stardust
    const stars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      size: `${Math.random() * 3 + 1}px`,
    }));
    setStardust(stars);

    async function fetchData() {
      if (!slug) return;

      const { data: coupleData, error: coupleError } = await supabase
        .from('couples')
        .select('*')
        .eq('slug', slug)
        .single();

      if (coupleError || !coupleData) {
        setLoading(false);
        return;
      }

      setCouple(coupleData);

      const { data: eventsData, error: eventsError } = await supabase
        .from('timeline_events')
        .select('*')
        .eq('couple_id', coupleData.id)
        .order('event_date', { ascending: true });

      if (!eventsError && eventsData) {
        setEvents(eventsData);
      }

      setLoading(false);
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-primary font-bold text-2xl">Loading Love Story...</div>
      </div>
    );
  }

  if (!couple) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
        <p className="text-gray-600 mb-8">This beautiful journey hasn&apos;t been recorded yet.</p>
        <Link href="/" className="px-8 py-3 bg-primary text-white rounded-full font-bold">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#0a0a2e] font-poppins overflow-x-hidden text-white">
      {/* Night Sky Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Deep Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05051a] via-[#0a0a2e] to-[#1a1a4a]" />
        
        {/* Large Glowing Moon */}
        <div className="absolute top-20 -right-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-white rounded-full opacity-20 blur-[80px] animate-pulse-slow" />
        <div className="absolute top-40 -right-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-white rounded-full opacity-40 blur-[40px]" />
        
        {/* Stardust/Snowfall Animation */}
        {stardust.map((star) => (
          <div
            key={star.id}
            className="absolute top-[-10px] bg-white rounded-full opacity-60 animate-fall"
            style={{
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              boxShadow: '0 0 10px white',
            }}
          />
        ))}

        {/* Silhouette Tree (Left Side) */}
        <div className="absolute bottom-0 left-[-50px] w-[300px] md:w-[500px] opacity-40 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full fill-black">
            <path d="M50,200 Q45,150 50,120 T60,60 T40,20 M50,150 Q70,130 90,140 M50,120 Q30,100 20,110 M60,90 Q80,70 100,80" stroke="black" strokeWidth="5" fill="none" />
          </svg>
        </div>

        {/* Silhouette Grass/Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-black opacity-90" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 20%, 95% 40%, 90% 15%, 85% 35%, 80% 10%, 75% 45%, 70% 20%, 65% 40%, 60% 15%, 55% 30%, 50% 10%, 45% 40%, 40% 20%, 35% 45%, 30% 15%, 25% 35%, 20% 10%, 15% 40%, 10% 20%, 5% 45%, 0% 15%)' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-[#0a0a2e] rounded-full flex items-center justify-center font-bold">N</div>
          <span className="font-bold text-lg text-white">Nyano Space</span>
        </Link>
        <div className="text-white font-medium italic opacity-80">
          {couple.female_name} & {couple.male_name}
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-32 pb-20 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            The Eternal <span className="text-white/80">Time Tree</span>
          </h1>
          <p className="text-xl text-white/60 italic">
            Celebrating the journey of {couple.female_name} and {couple.male_name}
          </p>
          <div className="mt-8 inline-block px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold">
            Wedding Date: {new Date(couple.wedding_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Timeline Section */}
      <main className="max-w-5xl mx-auto px-6 pb-48 relative z-10">
        <div className="relative">
          {/* Central Line (The Dark Silhouette Trunk) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-black/60 backdrop-blur-sm rounded-full" />

          <div className="space-y-32">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={event.id} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Branch Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full z-20 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] group ${index % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'}`}>
                    <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 hover:border-white/30 transition-all hover:-translate-y-2 relative group-hover:bg-black/60">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-white/60 font-bold">
                          {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex gap-2">
                          {event.tiktok_url && (
                            <a 
                              href={event.tiktok_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white hover:text-[#00f2ea] transition-colors p-1"
                              title="View on TikTok"
                            >
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-.1-.03-.1-.01-.5-.03-1-.03-1.5 0-2.11.8-4.17 2.22-5.71 1.44-1.56 3.47-2.5 5.59-2.61.01 4.02-.01 8.05.02 12.07.13.45.45.81.88 1.02.5.25 1.1.24 1.5-.09.43-.34.68-.88.64-1.43-.02-2.11-.01-4.21-.01-6.32 0-3.91-.01-7.81-.01-11.72z" />
                              </svg>
                            </a>
                          )}
                          {event.instagram_url && (
                            <a 
                              href={event.instagram_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white hover:text-[#E1306C] transition-colors p-1"
                              title="View on Instagram"
                            >
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.44-.645-1.44-1.44s.645-1.44 1.44-1.44z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-md">{event.title}</h3>
                      <p className="text-white/70 leading-relaxed font-light">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-white/40 italic">
                The story is just beginning to be written...
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Partners Social Footer */}
      <section className="max-w-4xl mx-auto px-6 pb-20 relative z-10">
        <div className="bg-black/40 backdrop-blur-xl rounded-[30px] md:rounded-[40px] p-8 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden group">
          {/* Decorative elements */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-[60px] group-hover:bg-secondary/20 transition-all duration-700" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-all duration-700" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-12">
            {/* Female Partner Socials */}
            <div className="text-center md:text-left space-y-6 min-w-0">
              <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase truncate">
                {couple.female_name} <span className="text-secondary/80">Socials</span>
              </h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
                {couple.female_instagram && (
                  <a 
                    href={`https://instagram.com/${couple.female_instagram.replace('@', '')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-[#E1306C]/20 border border-white/10 hover:border-[#E1306C]/40 rounded-2xl transition-all duration-300 group/link"
                    title={`Instagram: ${couple.female_instagram}`}
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white/60 group-hover/link:text-[#E1306C] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.44-.645-1.44-1.44s.645-1.44 1.44-1.44z" />
                    </svg>
                  </a>
                )}
                {couple.female_tiktok && (
                  <a 
                    href={`https://tiktok.com/@${couple.female_tiktok.replace('@', '')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-[#00f2ea]/20 border border-white/10 hover:border-[#00f2ea]/40 rounded-2xl transition-all duration-300 group/link"
                    title={`TikTok: ${couple.female_tiktok}`}
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white/60 group-hover/link:text-[#00f2ea] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-.1-.03-.1-.01-.5-.03-1-.03-1.5 0-2.11.8-4.17 2.22-5.71 1.44-1.56 3.47-2.5 5.59-2.61.01 4.02-.01 8.05.02 12.07.13.45.45.81.88 1.02.5.25 1.1.24 1.5-.09.43-.34.68-.88.64-1.43-.02-2.11-.01-4.21-.01-6.32 0-3.91-.01-7.81-.01-11.72z" />
                    </svg>
                  </a>
                )}
                {couple.female_x && (
                  <a 
                    href={`https://x.com/${couple.female_x.replace('@', '')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white/40 rounded-2xl transition-all duration-300 group/link"
                    title={`X (Twitter): ${couple.female_x}`}
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white/60 group-hover/link:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full md:w-px h-px md:h-24 bg-white/10" />

            {/* Male Partner Socials */}
            <div className="text-center md:text-right space-y-6 min-w-0">
              <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase truncate">
                {couple.male_name} <span className="text-primary/80">Socials</span>
              </h3>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
                {couple.male_instagram && (
                  <a 
                    href={`https://instagram.com/${couple.male_instagram.replace('@', '')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-[#E1306C]/20 border border-white/10 hover:border-[#E1306C]/40 rounded-2xl transition-all duration-300 group/link"
                    title={`Instagram: ${couple.male_instagram}`}
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white/60 group-hover/link:text-[#E1306C] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.44-.645-1.44-1.44s.645-1.44 1.44-1.44z" />
                    </svg>
                  </a>
                )}
                {couple.male_tiktok && (
                  <a 
                    href={`https://tiktok.com/@${couple.male_tiktok.replace('@', '')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-[#00f2ea]/20 border border-white/10 hover:border-[#00f2ea]/40 rounded-2xl transition-all duration-300 group/link"
                    title={`TikTok: ${couple.male_tiktok}`}
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white/60 group-hover/link:text-[#00f2ea] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-.1-.03-.1-.01-.5-.03-1-.03-1.5 0-2.11.8-4.17 2.22-5.71 1.44-1.56 3.47-2.5 5.59-2.61.01 4.02-.01 8.05.02 12.07.13.45.45.81.88 1.02.5.25 1.1.24 1.5-.09.43-.34.68-.88.64-1.43-.02-2.11-.01-4.21-.01-6.32 0-3.91-.01-7.81-.01-11.72z" />
                    </svg>
                  </a>
                )}
                {couple.male_x && (
                  <a 
                    href={`https://x.com/${couple.male_x.replace('@', '')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white/40 rounded-2xl transition-all duration-300 group/link"
                    title={`X (Twitter): ${couple.male_x}`}
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white/60 group-hover/link:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center relative z-10">
        <p className="text-white/30 italic">Preserved under the moonlight by Nyano Space</p>
      </footer>

      <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh) translateX(20px); opacity: 0; }
        }
        .animate-fall {
          animation: fall 15s linear infinite;
        }
        .font-poppins { font-family: var(--font-poppins), sans-serif; }
      `}</style>
    </div>
  );
}
