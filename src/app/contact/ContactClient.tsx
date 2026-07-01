'use client';

import React from 'react';
import Link from 'next/link';
import BackgroundAnimations from "@/components/BackgroundAnimations";

const ContactClient = () => {
  const socialPlatforms = [
    { 
      name: 'X', 
      url: 'https://x.com/nyanospace', 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      ), 
      color: 'hover:text-black' 
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/na-madhu-m/', 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ), 
      color: 'hover:text-[#0077B5]' 
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/nyanospace/', 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.44-.645-1.44-1.44s.645-1.44 1.44-1.44z" />
        </svg>
      ), 
      color: 'hover:text-[#E1306C]' 
    },
    { 
      name: 'TikTok', 
      url: 'https://www.tiktok.com/@inyanospace', 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-.1-.03-.1-.01-.5-.03-1-.03-1.5 0-2.11.8-4.17 2.22-5.71 1.44-1.56 3.47-2.5 5.59-2.61.01 4.02-.01 8.05.02 12.07.13.45.45.81.88 1.02.5.25 1.1.24 1.5-.09.43-.34.68-.88.64-1.43-.02-2.11-.01-4.21-.01-6.32 0-3.91-.01-7.81-.01-11.72z" />
        </svg>
      ), 
      color: 'hover:text-[#00f2ea]' 
    },
    { 
      name: 'YouTube', 
      url: 'https://www.youtube.com/@nyanospace', 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ), 
      color: 'hover:text-[#FF0000]' 
    },
  ];

  const communityLinks = [
    { name: 'Discord', url: 'https://discord.gg/t67M9BeE', color: 'bg-indigo-500' },
    { name: 'Telegram', url: 'https://t.me/+vIqUVDH7rV1lYjU1', color: 'bg-sky-500' },
    { name: 'Reddit', url: 'https://www.reddit.com/r/inyanospace/', color: 'bg-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans relative pt-20">
      <BackgroundAnimations />
      
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="max-w-3xl w-full bg-white/40 backdrop-blur-xl rounded-[50px] p-8 md:p-16 border border-primary/5 shadow-2xl space-y-12 text-center">
          
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter uppercase italic">
              Let&apos;s <span className="text-primary">Connect</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed">
              Whether you&apos;re a couple, a creator, or a partner, we&apos;re ready to preserve your story.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="p-8 bg-gradient-to-br from-primary to-secondary rounded-[35px] text-white shadow-xl hover:scale-[1.02] transition-transform">
            <p className="text-sm font-bold uppercase tracking-widest mb-2 opacity-90">Direct Inquiry</p>
            <div className="text-3xl md:text-4xl font-black italic tracking-tight mb-4">
              DM Founder @nyanospace
            </div>
            <p className="text-white/80 font-light">The fastest way to schedule your interview or collaboration.</p>
          </div>

          {/* Social & Email Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Social Presence</h3>
              <div className="flex flex-col gap-4">
                {socialPlatforms.map((platform) => (
                  <a 
                    key={platform.name} 
                    href={platform.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 transition-colors group ${platform.color}`}
                  >
                    <span className="shrink-0 transition-transform group-hover:scale-110">{platform.icon}</span>
                    <span className="text-xl font-bold text-foreground group-hover:text-inherit">{platform.name}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Official Email & Phone</h3>
              <a href="mailto:nyanospace@gmail.com" className="text-xl font-bold text-foreground hover:text-primary transition-colors block">
                nyanospace@gmail.com
              </a>
              <a href="tel:6364913348" className="text-xl font-bold text-foreground hover:text-primary transition-colors block">
                +91 6364913348
              </a>
            </div>
          </div>

          {/* Communities */}
          <div className="pt-8 border-t border-primary/5">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Join Our Community</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {communityLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className={`px-6 py-2 rounded-full text-white font-bold text-sm transition-all hover:scale-110 ${link.color}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <Link href="/" className="inline-block text-gray-400 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ContactClient;
