import Image from "next/image";
import Link from "next/link";
import BackgroundAnimations from "@/components/BackgroundAnimations";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative pt-16 sm:pt-20">
      <BackgroundAnimations />

      <section id="home" className="flex-1 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-white/80 rounded-full shadow-md border border-primary/20">
                <span className="text-secondary font-semibold">Preserving Your Journey Together</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Capture Every Moment of Your 
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Love Story</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed italic">
                Beyond traditional videography, we preserve your legacy. Experience our specialized sessions: from intimate Before & After the Vows dialogues and emotional Guest Chronicles to preserving the timeless wisdom of Family Legacies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/stories" className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all text-center">
                  Explore Love Stories
                </Link>
                <Link href="/demo" className="px-8 py-4 bg-white text-foreground rounded-full text-lg font-semibold border-2 border-primary hover:bg-primary/10 transition-all text-center">
                  Watch Demo
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center animate-pulse-slow relative">
                <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full animate-drift"></div>
                <div className="text-8xl">🎙️</div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white shadow-xl z-0">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-90">Couples Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Nyano Space?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "💝", title: "Preserve Memories", desc: "Create timeless keepsakes that you can cherish forever" },
              { icon: "🎥", title: "Professional Quality", desc: "High-quality video and audio production" },
              { icon: "❤️", title: "Personal Touch", desc: "Every story is unique and we capture yours authentically" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center items-center">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-accent to-white rounded-full flex items-center justify-center animate-drift relative shadow-inner">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl"></div>
                <div className="text-8xl">🏠</div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">About Nyano Space</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that every love story deserves to be told and preserved. At Nyano Space, we specialize in capturing the beautiful journey of couples through intimate podcast-style interviews that go beyond the surface.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From the quiet reflections before your wedding to the shared wisdom of years spent together, we document the evolution of your love so you can relive those precious moments forever.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">5+</div>
                  <div className="text-gray-500">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">1000+</div>
                  <div className="text-gray-500">Videos Created</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-10">
            Let&apos;s capture your beautiful story together. Get in touch with us today!
          </p>
          <Link href="/contact" className="inline-block px-10 py-4 bg-white text-primary rounded-full text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
            Contact Us Now
          </Link>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center font-bold text-xl">
                  N
                </div>
                <span className="text-2xl font-bold">Nyano Space</span>
              </div>
              <p className="text-gray-400">Preserving your journey, one moment at a time.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                <li><Link href="/stories" className="hover:text-primary transition-colors">Love Stories</Link></li>
                <li><Link href="/partners" className="hover:text-primary transition-colors">Event Organizers</Link></li>
                <li><Link href="/collaborate" className="hover:text-primary transition-colors">For Influencers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Offerings</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Partner Dialogues</li>
                <li>Wedding Chronicles</li>
                <li>Interview Sessions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">nyanospace@gmail.com</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2026 Nyano Space. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
