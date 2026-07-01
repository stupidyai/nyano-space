'use client';

import React from 'react';
import Link from 'next/link';
import BackgroundAnimations from '@/components/BackgroundAnimations';

export default function CollaborateClient() {
  return (
    <div className="min-h-screen relative bg-white font-poppins overflow-hidden pt-16 sm:pt-20">
      <BackgroundAnimations />
      
      <main className="relative pt-12 pb-20 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <header className="text-center space-y-8 mb-20">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Join the Elite</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter uppercase italic leading-none">
              For <span className="text-primary">Influencers</span>
            </h1>
            <p className="text-gray-600 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Are you a storyteller with a passion for human connection? Nyano Space is looking for influential voices to help us capture the most intimate moments of a couple&apos;s journey.
            </p>
          </header>

          {/* Value Propositions */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-white/80 backdrop-blur-sm p-10 rounded-[40px] border border-primary/5 shadow-sm hover:shadow-xl transition-all">
              <div className="text-4xl mb-6">🎙️</div>
              <h3 className="text-2xl font-bold mb-4">Host Intimate Dialogues</h3>
              <p className="text-gray-600 leading-relaxed">
                Step into the host seat for our signature podcast sessions. Facilitate deep, meaningful conversations that explore the history, growth, and future of married partners.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-10 rounded-[40px] border border-primary/5 shadow-sm hover:shadow-xl transition-all">
              <div className="text-4xl mb-6">✨</div>
              <h3 className="text-2xl font-bold mb-4">Wedding Chronicles</h3>
              <p className="text-gray-600 leading-relaxed">
                Be the face of our on-site wedding interviews. Capture the electric energy and emotional depth of the big day as it happens, creating timeless content for our couples.
              </p>
            </div>
          </div>

          {/* Attractive Pitch */}
          <section className="bg-gradient-to-br from-primary to-secondary rounded-[50px] p-12 md:p-20 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                Why Collaborate with Us?
              </h2>
              <p className="text-xl md:text-2xl opacity-90 font-light leading-relaxed max-w-3xl mx-auto">
                Join a movement that goes beyond traditional content creation. At Nyano Space, we don&apos;t just make videos; we preserve legacies. As a partner, you&apos;ll have the platform to build deep emotional narratives, expand your reach into the luxury wedding market, and become part of a community that celebrates the most beautiful aspect of human life: **Love.**
              </p>
              <div className="pt-8">
                <Link 
                  href="/contact" 
                  className="inline-block px-12 py-5 bg-white text-primary rounded-full text-xl font-black uppercase tracking-tight hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Contact Founder to Join
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="text-center py-20 border-t border-primary/5">
        <p className="text-gray-400">© 2026 Nyano Space Creator Network</p>
      </footer>
    </div>
  );
}
