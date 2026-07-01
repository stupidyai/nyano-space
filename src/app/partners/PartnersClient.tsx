'use client';

import React from 'react';
import Link from 'next/link';
import BackgroundAnimations from '@/components/BackgroundAnimations';

export default function PartnersClient() {
  const partners = [
    {
      title: "Blouse Designers",
      description: "The architects of the perfect bridal look. We collaborate with top-tier blouse designers to showcase the intricate details and craftsmanship of your bridal trousseau during our interviews.",
      icon: "👗",
      isFeatured: true,
      color: "from-rose-500/10 to-pink-500/10",
      borderColor: "border-primary/20"
    },
    {
      title: "Wedding Cooks & Caterers",
      description: "Preserving the flavors of your celebration. We highlight the culinary artists who bring the feast to life.",
      icon: "👨‍🍳",
      isFeatured: false,
      color: "from-amber-500/10 to-orange-500/10",
      borderColor: "border-secondary/20"
    },
    {
      title: "Flower Arrangers",
      description: "Capturing the floral dreams. From mandaps to bouquets, we ensure the natural beauty is preserved.",
      icon: "💐",
      isFeatured: false,
      color: "from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-500/20"
    },
    {
      title: "Event Organizers",
      description: "The masterminds behind the magic. We work alongside event planners for seamless storytelling.",
      icon: "📋",
      isFeatured: false,
      color: "from-blue-500/10 to-indigo-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Henna & Mehndi Artists",
      description: "Capturing the intricate stories etched in henna, from the first stroke to the deep mahogany stain.",
      icon: "🌿",
      isFeatured: false,
      color: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20"
    },
    {
      title: "Makeup & Hair Stylists",
      description: "Documenting the transformation and the radiant glow of the couple on their most special day.",
      icon: "💄",
      isFeatured: false,
      color: "from-purple-500/10 to-fuchsia-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      title: "Jewelry Designers",
      description: "Focusing the lens on the heritage pieces and sparkling gems that complete the bridal ensemble.",
      icon: "💎",
      isFeatured: false,
      color: "from-yellow-500/10 to-amber-500/10",
      borderColor: "border-yellow-500/20"
    },
    {
      title: "Traditional Musicians",
      description: "Capturing the rhythmic soul of the wedding, from classical ragas to celebratory folk beats.",
      icon: "🎻",
      isFeatured: false,
      color: "from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      title: "Invitation Designers",
      description: "Preserving the first glimpse of your story—the paper, the ink, and the art that invited the world.",
      icon: "✉️",
      isFeatured: false,
      color: "from-cyan-500/10 to-sky-500/10",
      borderColor: "border-cyan-500/20"
    },
    {
      title: "Wedding Decorators",
      description: "From grand stages to intimate corners, we document the environment that hosted your love.",
      icon: "🎪",
      isFeatured: false,
      color: "from-rose-500/10 to-pink-500/10",
      borderColor: "border-rose-500/20"
    },
    {
      title: "Choreographers",
      description: "Filming the grace and energy of the dances that tell your journey through movement.",
      icon: "💃",
      isFeatured: false,
      color: "from-indigo-500/10 to-blue-500/10",
      borderColor: "border-indigo-500/20"
    },
    {
      title: "Venue Managers",
      description: "Collaborating with palaces, gardens, and halls to find the perfect backdrop for every interview.",
      icon: "🏰",
      isFeatured: false,
      color: "from-slate-500/10 to-gray-500/10",
      borderColor: "border-slate-500/20"
    },
    {
      title: "Turban & Drapery Experts",
      description: "Highlighting the traditional art of draping and the majestic look of the groom's attire.",
      icon: "👳",
      isFeatured: false,
      color: "from-red-500/10 to-orange-500/10",
      borderColor: "border-red-500/20"
    },
    {
      title: "Grooming Specialists",
      description: "Ensuring the groom looks his absolute best for the close-up podcast sessions and events.",
      icon: "✂️",
      isFeatured: false,
      color: "from-blue-600/10 to-sky-600/10",
      borderColor: "border-blue-600/20"
    },
    {
      title: "Lighting Designers",
      description: "Working with light to create the cinematic atmosphere that makes your story shine.",
      icon: "💡",
      isFeatured: false,
      color: "from-yellow-400/10 to-amber-400/10",
      borderColor: "border-yellow-400/20"
    },
    {
      title: "Sound Engineers",
      description: "Guaranteeing that every whisper and every vow is recorded with crystal clear perfection.",
      icon: "🎧",
      isFeatured: false,
      color: "from-zinc-500/10 to-neutral-500/10",
      borderColor: "border-zinc-500/20"
    },
    {
      title: "Gift & Favor Curators",
      description: "Documenting the tokens of gratitude and the small details that guests will remember.",
      icon: "🎁",
      isFeatured: false,
      color: "from-pink-400/10 to-rose-400/10",
      borderColor: "border-pink-400/20"
    },
    {
      title: "Wedding Cake Artists",
      description: "The sweet finale—capturing the artistry and the flavor of your celebratory cake.",
      icon: "🎂",
      isFeatured: false,
      color: "from-cream-500/10 to-amber-200/10",
      borderColor: "border-amber-300/20"
    },
    {
      title: "Car Decorators",
      description: "Capturing the grand entrance and the stylish departure in beautifully adorned vehicles.",
      icon: "🚗",
      isFeatured: false,
      color: "from-sky-400/10 to-blue-400/10",
      borderColor: "border-sky-400/20"
    },
    {
      title: "Security & Logistics",
      description: "Working behind the scenes to ensure the story-capturing process is smooth and uninterrupted.",
      icon: "🛡️",
      isFeatured: false,
      color: "from-slate-700/10 to-gray-700/10",
      borderColor: "border-slate-700/20"
    },
    {
      title: "Priests & Officiants",
      description: "Recording the sacred words and traditional rituals that form the core of the union.",
      icon: "🙏",
      isFeatured: false,
      color: "from-orange-600/10 to-amber-600/10",
      borderColor: "border-orange-600/20"
    }
  ];

  return (
    <div className="min-h-screen relative bg-white font-poppins overflow-hidden pt-16 sm:pt-20">
      <BackgroundAnimations />
      
      <main className="relative pt-12 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16 space-y-6">
            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter uppercase italic leading-none">
              Event <span className="text-primary">Organizers</span>
            </h1>
            <p className="text-gray-600 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              We collaborate with the finest professionals in the wedding industry to create a seamless and unforgettable experience for every couple.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {partners.map((partner, idx) => (
              <Link 
                key={idx}
                href="/contact"
                className={`group relative rounded-[40px] p-8 md:p-10 border-2 ${partner.borderColor} bg-gradient-to-br ${partner.color} transition-all hover:shadow-2xl hover:-translate-y-2 overflow-hidden flex flex-col ${partner.isFeatured ? 'lg:col-span-2 lg:flex-row gap-8 items-center' : ''}`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-white/40 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-white/60 transition-colors`} />
                
                <div className={`${partner.isFeatured ? 'flex-shrink-0' : 'mb-6'} text-6xl md:text-7xl relative z-10`}>
                  {partner.icon}
                </div>
                
                <div className="flex-1 space-y-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <h2 className={`font-black uppercase italic tracking-tight text-foreground ${partner.isFeatured ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                      {partner.title}
                    </h2>
                    {partner.isFeatured && (
                      <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-widest">Featured</span>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed font-light text-lg">
                    {partner.description}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                    Partner with us <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <section className="mt-24 text-center p-12 bg-primary/5 rounded-[50px] border border-primary/10">
            <h2 className="text-3xl font-bold mb-6">Are you a wedding professional?</h2>
            <p className="text-gray-600 mb-10 max-w-xl mx-auto">Join our elite network and offer your clients a unique way to preserve their most precious memories.</p>
            <Link href="/contact" className="px-10 py-4 bg-primary text-white rounded-full font-bold text-xl hover:shadow-xl transition-all inline-block">
              Become a Partner
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
