import Link from 'next/link';
import Starfield from '@/components/ui/Starfield';
import CosmicDust from '@/components/ui/CosmicDust';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Galactic Background */}
      <Starfield />
      <CosmicDust />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6 px-6 py-2 glass rounded-full neon-border animate-pulse-glow">
            <span className="text-sm font-semibold gradient-text">✨ NEXT-GENERATION DESIGN PLATFORM</span>
          </div>

          <h1 className="text-8xl font-bold text-white mb-6 animate-float neon-glow">
            🚍 <span className="gradient-text">HoodiesBus</span>
          </h1>

          <p className="text-3xl font-semibold text-white/90 mb-6 max-w-3xl mx-auto">
            Design Your Dream Hoodie in <span className="gradient-text">3D Space</span>
          </p>

          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Journey through the cosmos of custom fashion. The universe's most advanced hoodie
            customization platform with AI-powered design, real-time 3D visualization, and
            direct manufacturing integration.
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              href="/designer"
              className="cosmic-button px-10 py-5 text-white rounded-2xl text-xl font-bold transition-all transform hover:scale-105 shadow-2xl relative group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-2xl">🎨</span>
                <span>Launch Designer</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
            <Link
              href="/gallery"
              className="glass px-10 py-5 text-white rounded-2xl text-xl font-bold hover-lift transition-all border-2 border-white/30 aurora-border group"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">🌌</span>
                <span>Explore Gallery</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="glass neon-border rounded-3xl p-8 hover-lift transition-all group">
            <div className="text-6xl mb-6 animate-float">🎨</div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Realtime 3D Designer</h3>
            <p className="text-white/80 leading-relaxed">
              Design your hoodie in stunning real-time 3D. Customize colors, add prints, adjust measurements, and see instant results with WebGL-powered rendering.
            </p>
            <div className="mt-4 text-purple-400 font-semibold group-hover:translate-x-2 transition-transform inline-block">
              Explore →
            </div>
          </div>

          <div className="glass neon-border rounded-3xl p-8 hover-lift transition-all group">
            <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '0.5s' }}>🤖</div>
            <h3 className="text-2xl font-bold gradient-text mb-4">AI Design Assistant</h3>
            <p className="text-white/80 leading-relaxed">
              Get intelligent design suggestions, color harmony recommendations, and style advice from our locally-powered Llama AI assistant.
            </p>
            <div className="mt-4 text-purple-400 font-semibold group-hover:translate-x-2 transition-transform inline-block">
              Explore →
            </div>
          </div>

          <div className="glass neon-border rounded-3xl p-8 hover-lift transition-all group">
            <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '1s' }}>🧵</div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Direct Manufacturing</h3>
            <p className="text-white/80 leading-relaxed">
              Connect directly with manufacturers worldwide. Auto-generated production PDFs with measurements, QR codes, and specifications.
            </p>
            <div className="mt-4 text-purple-400 font-semibold group-hover:translate-x-2 transition-transform inline-block">
              Explore →
            </div>
          </div>

          <div className="glass neon-border rounded-3xl p-8 hover-lift transition-all group">
            <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '1.5s' }}>👁️</div>
            <h3 className="text-2xl font-bold gradient-text mb-4">AR Preview</h3>
            <p className="text-white/80 leading-relaxed">
              See your hoodie in augmented reality before ordering. Try it on virtually using your phone's camera with WebXR technology.
            </p>
            <div className="mt-4 text-purple-400 font-semibold group-hover:translate-x-2 transition-transform inline-block">
              Explore →
            </div>
          </div>

          <div className="glass neon-border rounded-3xl p-8 hover-lift transition-all group">
            <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '2s' }}>📐</div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Parametric Patterns</h3>
            <p className="text-white/80 leading-relaxed">
              FreeSewing integration for parametric pattern generation. Mathematical precision ensures perfect fit based on your measurements.
            </p>
            <div className="mt-4 text-purple-400 font-semibold group-hover:translate-x-2 transition-transform inline-block">
              Explore →
            </div>
          </div>

          <div className="glass neon-border rounded-3xl p-8 hover-lift transition-all group">
            <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '2.5s' }}>🌍</div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Global Payments</h3>
            <p className="text-white/80 leading-relaxed">
              PayPal and Razorpay integration for secure worldwide transactions. Multi-currency support with local payment methods.
            </p>
            <div className="mt-4 text-purple-400 font-semibold group-hover:translate-x-2 transition-transform inline-block">
              Explore →
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center holographic rounded-[3rem] p-16 border-2 border-purple-500/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-xl"></div>

          <div className="relative z-10">
            <div className="text-6xl mb-6 animate-pulse-glow">✨</div>
            <h2 className="text-5xl font-bold neon-glow mb-6">
              Ready to Launch Your Design Into Orbit?
            </h2>
            <p className="text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
              Join the next generation of designers creating custom hoodies across the galaxy
            </p>
            <Link
              href="/designer"
              className="cosmic-button inline-block px-16 py-6 text-white rounded-2xl text-2xl font-bold transition-all transform hover:scale-110 shadow-2xl group"
            >
              <span className="relative z-10 flex items-center gap-4">
                <span className="text-3xl">🚀</span>
                <span>Start Your Journey</span>
                <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-32 glass">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">🚍 HoodiesBus</h3>
              <p className="text-white/70 leading-relaxed">
                The universe's premier hoodie design platform. Create, collaborate, and customize.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Platform</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="/designer" className="hover:text-purple-400 transition-colors">3D Designer</a></li>
                <li><a href="/gallery" className="hover:text-purple-400 transition-colors">Gallery</a></li>
                <li><a href="/manufacturers" className="hover:text-purple-400 transition-colors">Manufacturers</a></li>
                <li><a href="/pricing" className="hover:text-purple-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Resources</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="/docs" className="hover:text-purple-400 transition-colors">Documentation</a></li>
                <li><a href="/tutorials" className="hover:text-purple-400 transition-colors">Tutorials</a></li>
                <li><a href="/api" className="hover:text-purple-400 transition-colors">API</a></li>
                <li><a href="/support" className="hover:text-purple-400 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Connect</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/60">
              © 2025 HoodiesBus. Crafted with <span className="text-purple-400">💜</span> for designers across the cosmos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
