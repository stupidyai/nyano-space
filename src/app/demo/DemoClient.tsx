'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BackgroundAnimations from '@/components/BackgroundAnimations';

export default function DemoClient() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const demoSections = [
    {
      title: "Before & After the Vows",
      description: "Our creators conduct intimate, heart-to-heart interviews with couples both before and after their wedding ceremony. This captures the raw, beautiful transformation from nervous excitement to marital euphoria.",
      youtubeUrl: "https://www.youtube.com/shorts/ynGo_H95mSo",
      embedId: "ynGo_H95mSo",
      icon: "🎙️",
      color: "from-pink-500/20 to-rose-500/20"
    },
    {
      title: "Guest Chronicles",
      description: "We don't just focus on the couple; we capture the joy of the entire celebration. Our team interviews guests, capturing their well-wishes, funny anecdotes, and the collective love felt during your special event.",
      youtubeUrl: "https://www.youtube.com/shorts/T7xqH4Y99Vc",
      embedId: "T7xqH4Y99Vc",
      icon: "🥂",
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      title: "Family Legacies",
      description: "Upon request, we conduct deep-dive interviews with parents and elders. These sessions preserve family wisdom and emotional reflections that might otherwise go unrecorded, creating a true family legacy.",
      youtubeUrl: "https://www.youtube.com/shorts/JyVn4OnIsBk",
      embedId: "JyVn4OnIsBk",
      icon: "🏠",
      color: "from-blue-500/10 to-indigo-500/10"
    }
  ];

  return (
    <div className="min-h-screen relative bg-white font-poppins overflow-hidden pt-16 sm:pt-20">
      <BackgroundAnimations />
      
      <main className="relative pt-12 pb-20 px-6 z-10">
        <div className="max-w-6xl mx-auto space-y-24">
          <header className="text-center space-y-6">
            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter uppercase italic leading-none">
              Watch Our <span className="text-primary">Demos</span>
            </h1>
            <p className="text-gray-600 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Experience how we capture the soul of every celebration through our specialized interview segments.
            </p>
          </header>

          <div className="space-y-16">
            {demoSections.map((section, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row gap-12 items-center p-8 md:p-12 rounded-[50px] bg-gradient-to-br ${section.color} border border-white shadow-xl hover:shadow-2xl transition-all overflow-hidden relative group`}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-white/50 transition-colors" />
                
                <div className="flex-1 space-y-6 relative z-10">
                  <div className="text-5xl">{section.icon}</div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tight text-foreground">{section.title}</h2>
                  <p className="text-lg text-gray-700 leading-relaxed font-light">
                    {section.description}
                  </p>
                  <a 
                    href={section.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF0000] text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <span>Watch Sample on YouTube</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                </div>

                <div className="flex-1 w-full aspect-[9/16] max-w-[320px] mx-auto bg-black rounded-[30px] border-4 border-white shadow-2xl relative overflow-hidden group">
                    {playingId === section.embedId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${section.embedId}?autoplay=1`}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div 
                        className="absolute inset-0 w-full h-full cursor-pointer group"
                        onClick={() => setPlayingId(section.embedId)}
                      >
                        {/* High-quality Thumbnail Placeholder */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(https://img.youtube.com/vi/${section.embedId}/hqdefault.jpg)` }}
                        />
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                        
                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
                          </div>
                        </div>
                        
                        <div className="absolute bottom-6 left-0 right-0 text-center">
                          <span className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest border border-white/20 group-hover:bg-primary transition-colors">
                            Click to Play
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>

          <footer className="text-center pt-10">
            <Link 
              href="/contact" 
              className="px-10 py-5 bg-foreground text-white rounded-full text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all inline-block"
            >
              Book Your Story Today
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
