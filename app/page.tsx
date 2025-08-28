'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('Create a landing page for a playful meme coin called ORY');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingSites, setExistingSites] = useState<Array<{ slug: string, title: string, templateId: string, props: any, icon?: string }>>([]);
  const [loadingSites, setLoadingSites] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Example prompts
  const examplePrompts = [
    "Create a minimalist docs page for a privacy-first wallet",
    "Bright landing for a playful meme coin called ORY with $ORY ticker",
    "Modern app landing page for a Solana-based pizza delivery service",
    "Step-by-step wizard for creating an NFT collection",
    "Landing page for a DeFi yield farming platform",
    "Documentation site for a blockchain developer toolkit"
  ];

  // Fetch existing sites on mount
  useEffect(() => {
    fetchExistingSites();
  }, []);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchExistingSites = async () => {
    try {
      const res = await fetch('/api/sites');
      if (res.ok) {
        const sites = await res.json();
        setExistingSites(sites);
      }
    } catch (err) {
      console.error('Failed to fetch sites:', err);
    } finally {
      setLoadingSites(false);
    }
  };

  const handlePromptClick = (promptText: string) => {
    setPrompt(promptText);
    document.getElementById('generator-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();

      await fetchExistingSites();
      window.location.href = `/website/${json.slug}`;
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950 to-black" />
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
        }}
      />

      {/* Floating Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-purple-500/20 backdrop-blur-xl bg-black/80 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
                <span className="text-white font-bold text-sm relative z-10">O</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-space-grotesk">
                NoCodeDev
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/sites" className="text-purple-300 hover:text-white transition-colors duration-300 font-medium">
                Browse Sites
              </a>
              <a href="https://x.com/lisabeyy" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-white transition-colors duration-300 font-medium">
                @lisabeyy
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Animated Badge */}
          <div className="inline-flex items-center space-x-2 mb-8 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-full border border-yellow-500/30 animate-pulse">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
            <span className="text-yellow-400 text-sm font-medium font-space-grotesk">🚀 Million Dollar Business Alert</span>
          </div>

          {/* Main Title with Glitch Effect */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight font-space-grotesk">
            <span className="bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent animate-pulse-neon">
              No-Code Website Generator
            </span>
            <span className="block text-4xl md:text-6xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mt-2 animate-float">
              lol
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-4xl mx-auto leading-relaxed font-inter">
            AI-powered website generator, easily accessible for home use. Now available for{" "}
            <span className="text-green-400 font-bold animate-pulse">FREE</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a
              href="https://x.com/lisabeyy"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center space-x-2">
                <span>Follow @lisabeyy</span>
                <div className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300">🐦</div>
              </span>
            </a>

            <a
              href="https://github.com/lisabeyy/ory-the-clone.git"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center space-x-2">
                <span>Download for FREE</span>
                <div className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300">💾</div>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Generator Section */}
      <section id="generator-form" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-space-grotesk">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Powered Website Generator
              </span>
            </h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto font-inter">
              Generate professional websites from natural language prompts. Outputs beautiful React/Tailwind templates at unique URLs.
            </p>
          </div>

          {/* Generator Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl" />
            <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 md:p-12">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="relative group">
                  <textarea
                    className="w-full h-32 px-6 py-4 bg-black/60 border border-purple-500/30 rounded-2xl text-white placeholder-purple-300 resize-none focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 font-inter"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Describe the website you want to create..."
                  />
                  <div className="absolute top-4 right-4 text-purple-400 text-sm">
                    {prompt.length}/500
                  </div>
                </div>

                <button
                  disabled={creating}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-pink-500/25 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center">
                    {creating ? (
                      <>
                        <div className="animate-spin mr-3">🤖</div>
                        Generating Your Million Dollar Website...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">✨</span>
                        Generate Website
                      </>
                    )}
                  </span>
                </button>

                {error && (
                  <div className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 animate-shake">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Example Prompts */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 font-space-grotesk">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Try These Prompts
              </span>
            </h3>
            <p className="text-purple-200 font-inter">
              Click any prompt to use it in the generator above
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {examplePrompts.map((promptText, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(promptText)}
                className="group relative text-left p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 hover:border-purple-400 hover:bg-black/60 transition-all duration-300 hover:scale-105 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <p className="text-purple-200 text-sm group-hover:text-white transition-colors duration-300 font-inter">
                    "{promptText}"
                  </p>
                  <div className="mt-2 text-xs text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                    Click to use this prompt →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Browse All Sites Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h3 className="text-3xl font-bold mb-4 font-space-grotesk">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Browse Generated Websites
            </span>
          </h3>
          <p className="text-purple-200 mb-8 font-inter">
            Check out all the amazing websites created by our community
          </p>
          <a
            href="/sites"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-pink-500/25 group"
          >
            <span className="mr-2">🔍</span>
            Browse All Sites
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>

      {/* Recently Generated Sites */}
      {existingSites.length > 0 && (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 font-space-grotesk">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Recently Generated
                </span>
              </h3>
              <p className="text-purple-200 font-inter">
                Latest websites created by our community
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {existingSites.slice(0, 4).map((site, index) => (
                <a
                  key={site.slug}
                  href={`/website/${site.slug}`}
                  className="group relative bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 hover:border-purple-400 hover:bg-black/60 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl animate-float">{site.icon || "✨"}</div>
                        <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 font-space-grotesk">
                          {site.title || site.slug}
                        </h4>
                      </div>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
                        {site.templateId}
                      </span>
                    </div>
                    <p className="text-purple-200 text-sm mb-3 line-clamp-2 font-inter">
                      {site.props?.subtitle || `Generated with ${site.templateId} template`}
                    </p>
                    <div className="text-sm text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      View site →
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {existingSites.length > 4 && (
              <div className="text-center mt-8">
                <a
                  href="/sites"
                  className="text-purple-400 hover:text-purple-300 font-medium font-inter"
                >
                  +{existingSites.length - 4} more sites →
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-purple-300 font-inter">
            🚀 Built with ❤️ by <a href="https://x.com/lisabeyy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">@lisabeyy</a> •
            <span className="text-yellow-400 font-semibold"> Million Dollar Business Code for FREE</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
