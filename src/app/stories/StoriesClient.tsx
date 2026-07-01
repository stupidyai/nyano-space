'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BackgroundAnimations from '@/components/BackgroundAnimations';

interface Couple {
  id: string;
  female_name: string;
  male_name: string;
  wedding_date: string;
  slug: string;
}

export default function StoriesClient() {
  const [couples, setCouples] = useState<Couple[]>([]);
  const [filteredCouples, setFilteredCouples] = useState<Couple[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCouples() {
      const { data, error } = await supabase
        .from('couples')
        .select('*')
        .order('wedding_date', { ascending: false });

      if (!error && data) {
        setCouples(data);
        setFilteredCouples(data);
      }
      setLoading(false);
    }

    fetchCouples();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredCouples(couples);
      return;
    }

    const filtered = couples.filter((couple) => {
      const fullName = `${couple.female_name} ${couple.male_name}`.toLowerCase();
      const weddingDate = new Date(couple.wedding_date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }).toLowerCase();
      
      return fullName.includes(query) || weddingDate.includes(query) || couple.wedding_date.includes(query);
    });

    setFilteredCouples(filtered);
  }, [searchQuery, couples]);

  return (
    <div className="min-h-screen relative bg-white font-poppins pb-20 overflow-hidden pt-16 sm:pt-20">
      <BackgroundAnimations />
      
      <main className="pt-12 max-w-7xl mx-auto px-6 relative z-10">
        <header className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter uppercase italic mb-6">
            Explore <span className="text-primary">Love Stories</span>
          </h1>
          <p className="text-gray-600 text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Discover the beautiful journeys of our couples, preserved forever in their unique Eternal Time Trees.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <span className="text-2xl">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search by name or date (e.g. Jun 2026)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-white border-2 border-primary/10 rounded-[30px] focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-lg shadow-sm group-hover:shadow-md"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-primary transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse text-primary font-bold text-2xl italic">Finding Love Stories...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCouples.map((couple) => (
              <Link 
                key={couple.id} 
                href={`/couples/${couple.slug}`}
                className="group relative bg-white rounded-[40px] p-8 border border-primary/5 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all hover:-translate-y-2 overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
                
                <div className="relative space-y-4">
                  <div className="text-4xl">💝</div>
                  <h3 className="text-3xl font-black text-foreground italic uppercase tracking-tight leading-none">
                    {couple.female_name} <br />
                    <span className="text-primary text-2xl font-light">&</span> <br />
                    {couple.male_name}
                  </h3>
                  <div className="pt-4 border-t border-primary/5 flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Wedding Date</p>
                      <p className="text-lg font-bold text-secondary">
                        {new Date(couple.wedding_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredCouples.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl italic mb-8">
              {searchQuery ? `No stories found matching "${searchQuery}"` : "No love stories have been recorded yet."}
            </p>
            {!searchQuery && (
              <Link href="/admin" className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:shadow-xl transition-all">
                Add First Story
              </Link>
            )}
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-primary font-bold hover:underline"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </main>

      <footer className="text-center pt-20 pb-10">
        <p className="text-gray-400">Capture your own story at Nyano Space</p>
      </footer>
    </div>
  );
}
