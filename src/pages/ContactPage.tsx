const ContactPage = () => {
  const socials = [
    { name: 'X (Twitter)', url: 'https://x.com/nyanospace', icon: '𝕏', color: 'hover:bg-white/10' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/na-madhu-m/', icon: 'in', color: 'hover:bg-blue-600/20 text-blue-400' },
    { name: 'Instagram', url: 'https://www.instagram.com/nyanospace/', icon: '📸', color: 'hover:bg-pink-600/20 text-pink-400' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@inyanospace', icon: '🎵', color: 'hover:bg-cyan-600/20 text-cyan-400' },
    { name: 'Facebook', url: 'https://www.facebook.com/nyanospace/', icon: 'f', color: 'hover:bg-indigo-600/20 text-indigo-400' },
  ]

  const communities = [
    { name: 'Discord', url: 'https://discord.gg/t67M9BeE', icon: '👾', color: 'bg-indigo-500' },
    { name: 'Telegram', url: 'https://t.me/+vIqUVDH7rV1lYjU1', icon: '✈️', color: 'bg-sky-500' },
    { name: 'Reddit', url: 'https://www.reddit.com/r/inyanospace/', icon: '🤖', color: 'bg-orange-600' },
  ]

  return (
    <main className="relative pt-40 pb-20 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-20">
        <header className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic">
            Get in <span className="text-teal-400">Touch</span>
          </h1>
          <p className="text-slate-400 text-xl font-light max-w-2xl mx-auto">
            Whether you're looking for individual guidance or corporate training, we're here to help you find your space.
          </p>
          <div className="pt-4">
            <p className="text-teal-400 text-lg font-bold uppercase tracking-tight flex items-center justify-center gap-3 flex-wrap">
              DM Founder @
              <span className="flex flex-col items-start gap-1">
                <span className="text-3xl font-bold text-white uppercase italic tracking-tight">Social Media</span>
                <div className="h-1 w-20 bg-teal-500 rounded-full" />
              </span>
              to make payments and receive contact information of instructors
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Social Links */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white uppercase italic tracking-tight">Social Media</h2>
              <div className="h-1 w-20 bg-teal-500 rounded-full" />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-6 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-sm transition-all hover:scale-[1.02] ${social.color}`}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-2xl font-bold">{social.icon}</span>
                    <span className="text-xl font-bold text-white">{social.name}</span>
                  </div>
                  <svg className="w-6 h-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              ))}
            </div>
          </section>

          {/* Communities */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white uppercase italic tracking-tight">Join Communities</h2>
              <div className="h-1 w-20 bg-indigo-500 rounded-full" />
            </div>
            <div className="grid grid-cols-1 gap-6">
              {communities.map((comm) => (
                <a
                  key={comm.name}
                  href={comm.url}
                  className="group relative p-8 rounded-[40px] overflow-hidden bg-slate-900/40 border border-white/5 backdrop-blur-sm transition-all hover:border-white/20"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${comm.color} opacity-10 blur-[60px] group-hover:opacity-30 transition-opacity`} />
                  <div className="relative flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-3xl">{comm.icon}</span>
                      <h3 className="text-2xl font-bold text-white">{comm.name}</h3>
                      <p className="text-slate-500 text-sm">Join the conversation</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full ${comm.color} flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform`}>
                      +
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Support Section */}
        <footer className="text-center pt-20 border-t border-white/5">
          <p className="text-slate-500 mb-4">Direct Inquiry</p>
          <a href="mailto:support@nyano.space" className="text-4xl md:text-5xl font-black text-white hover:text-teal-400 transition-colors tracking-tighter">
            nyanospace@gmail.com
          </a>
        </footer>
      </div>
    </main>
  )
}

export default ContactPage
