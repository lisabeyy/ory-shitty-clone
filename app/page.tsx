'use client';
import { useState, useEffect } from 'react';

// Color schemes for random UI
const colorSchemes = [
  {
    primary: 'from-purple-500 to-pink-500',
    secondary: 'from-pink-400 to-rose-400',
    accent: 'from-cyan-400 to-blue-400',
    bg: 'from-slate-950 via-purple-950 to-slate-900',
    card: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    button: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
  },
  {
    primary: 'from-blue-500 to-cyan-500',
    secondary: 'from-cyan-400 to-blue-400',
    accent: 'from-indigo-400 to-purple-400',
    bg: 'from-slate-950 via-blue-950 to-slate-900',
    card: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    button: 'from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
  },
  {
    primary: 'from-emerald-500 to-teal-500',
    secondary: 'from-teal-400 to-cyan-400',
    accent: 'from-green-400 to-emerald-400',
    bg: 'from-slate-950 via-emerald-950 to-slate-900',
    card: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
    button: 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
  },
  {
    primary: 'from-orange-500 to-red-500',
    secondary: 'from-red-400 to-pink-400',
    accent: 'from-yellow-400 to-orange-400',
    bg: 'from-slate-950 via-orange-950 to-slate-900',
    card: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/30',
    button: 'from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
  },
  {
    primary: 'from-violet-500 to-fuchsia-500',
    secondary: 'from-fuchsia-400 to-pink-400',
    accent: 'from-purple-400 to-violet-400',
    bg: 'from-slate-950 via-violet-950 to-slate-900',
    card: 'from-violet-500/20 to-fuchsia-500/20',
    border: 'border-violet-500/30',
    button: 'from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600'
  }
];

export default function Home() {
  const [prompt, setPrompt] = useState('Create a landing page for a playful meme coin called ORY');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentScheme, setCurrentScheme] = useState(0);
  const [generatedSites, setGeneratedSites] = useState<Array<{ slug: string, title: string, prompt: string }>>([]);

  // Example prompts
  const examplePrompts = [
    "Create a minimalist docs page for a privacy-first wallet",
    "Bright landing for a playful meme coin called ORY with $ORY ticker",
    "Modern app landing page for a Solana-based pizza delivery service",
    "Step-by-step wizard for creating an NFT collection",
    "Landing page for a DeFi yield farming platform",
    "Documentation site for a blockchain developer toolkit"
  ];

  // Random color scheme on mount
  useEffect(() => {
    setCurrentScheme(Math.floor(Math.random() * colorSchemes.length));
  }, []);

  // Change color scheme every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScheme(prev => (prev + 1) % colorSchemes.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const colors = colorSchemes[currentScheme];

  const handlePromptClick = (promptText: string) => {
    setPrompt(promptText);
    // Smooth scroll to form
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

      // Add to generated sites list
      const newSite = {
        slug: json.slug,
        title: prompt.split(' ').slice(0, 4).join(' ') + '...',
        prompt: prompt
      };
      setGeneratedSites(prev => [newSite, ...prev.slice(0, 4)]);

      // Redirect to generated site
      window.location.href = `/website/${json.slug}`;
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} text-white relative overflow-hidden transition-all duration-1000`}>
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br ${colors.card} rounded-full blur-3xl animate-pulse`} />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br ${colors.card} rounded-full blur-3xl animate-pulse`} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${colors.primary} rounded-full opacity-20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Header */}
        <div className="text-center pt-20 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Million Dollar Business Header */}
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur rounded-full border border-yellow-500/30 animate-bounce">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-400 text-sm font-medium">🚀 Million Dollar Business Alert</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-100 to-pink-400 bg-clip-text text-transparent animate-slide-up">
                Orynth Clone lol
              </h1>

              <p className="text-2xl md:text-3xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
                The exact same product that raised millions, now available for <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-bold animate-pulse">FREE</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-slide-up animation-delay-400">
                <a
                  href="https://x.com/lisabeyy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 group"
                >
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Follow @lisabeyy</span>
                </a>

                <a
                  href="https://github.com/lisabeyy/ory-shitty-clone.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 group"
                >
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>Download for FREE</span>
                </a>
              </div>

              <p className="text-white/60 text-lg max-w-2xl mx-auto animate-slide-up animation-delay-600">
                "I've seen this exact same product built by a team and raise millions by just doing this"
                <br />
                <span className="text-yellow-400 font-semibold animate-pulse">— Now it's yours for $0</span>
              </p>
            </div>

            {/* Main Generator Section */}
            <div id="generator-form" className="bg-white/5 backdrop-blur border border-white/20 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto animate-slide-up animation-delay-800">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center">
                <span className="mr-3">🎯</span>
                AI-Powered Website Generator
              </h2>
              <p className="text-white/80 mb-8 text-lg text-center">
                Generate professional websites from natural language prompts. Outputs beautiful React/Tailwind templates at unique URLs.
              </p>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.card} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <textarea
                    className="relative w-full h-32 bg-black/30 rounded-2xl p-4 outline-none border border-white/20 text-white placeholder-white/50 resize-none focus:border-white/40 transition-all duration-300"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Describe the website you want to create..."
                  />
                  <div className="absolute top-4 right-4 text-white/30 text-sm">
                    {prompt.length}/500
                  </div>
                </div>

                <button
                  disabled={creating}
                  className={`w-full px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r ${colors.button} disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl group`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {creating ? (
                      <>
                        <div className="animate-spin mr-3">🚀</div>
                        Generating Your Million Dollar Website...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">✨</span>
                        Generate Website
                      </>
                    )}
                  </span>
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.card} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </button>

                {error && (
                  <div className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 animate-shake">
                    {error}
                  </div>
                )}
              </form>
            </div>

            {/* Example Prompts */}
            <div className="mt-12 text-center animate-slide-up animation-delay-1000">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                <span className="mr-3">💡</span>
                Try These Prompts
              </h3>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {examplePrompts.map((promptText, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(promptText)}
                    className="group relative bg-white/5 backdrop-blur border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/40 text-left animate-slide-up"
                    style={{ animationDelay: `${1200 + index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${colors.card} rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative">
                      <p className="text-white/80 text-sm group-hover:text-white transition-colors duration-300">
                        <span className={`font-semibold bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>
                          "{promptText}"
                        </span>
                      </p>
                      <div className="mt-2 text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300">
                        Click to use this prompt →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recently Generated Sites */}
            {generatedSites.length > 0 && (
              <div className="mt-12 text-center animate-slide-up animation-delay-1400">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                  <span className="mr-3">🚀</span>
                  Recently Generated
                </h3>
                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {generatedSites.map((site, index) => (
                    <a
                      key={site.slug}
                      href={`/website/${site.slug}`}
                      className="group relative bg-white/5 backdrop-blur border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/40 text-left"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${colors.card} rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative">
                        <h4 className="text-white font-semibold mb-2 group-hover:text-white transition-colors duration-300">
                          {site.title}
                        </h4>
                        <p className="text-white/60 text-sm mb-3 line-clamp-2">
                          {site.prompt}
                        </p>
                        <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300">
                          View site →
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-16 text-center animate-slide-up animation-delay-1600">
              <p className="text-white/50 text-sm">
                🚀 Built with ❤️ by <a href="https://x.com/lisabeyy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">@lisabeyy</a> •
                <span className="text-yellow-400 font-semibold"> Million Dollar Business Code for FREE</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        .animation-delay-1400 { animation-delay: 1400ms; }
        .animation-delay-1600 { animation-delay: 1600ms; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
