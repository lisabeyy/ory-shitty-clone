import React from "react";

interface LandingTemplateProps {
  title: string;
  subtitle?: string;
  badges?: string[];
  features?: string[];
  showcaseTitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  logo?: string;
  backgroundImage?: string;
  colorScheme?: 'cool' | 'degen' | 'cyberpunk' | 'trendy' | 'sport' | 'random';
  accentColor?: string;
}

// Predefined color schemes
const colorSchemes = {
  cool: {
    primary: 'from-blue-500 to-cyan-500',
    secondary: 'from-cyan-400 to-blue-400',
    accent: 'from-indigo-400 to-purple-400',
    bg: 'from-slate-900 via-blue-950 to-slate-900',
    card: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    badge: 'from-blue-500/20 to-cyan-500/20',
    button: 'from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
  },
  degen: {
    primary: 'from-orange-500 to-red-500',
    secondary: 'from-red-400 to-pink-400',
    accent: 'from-yellow-400 to-orange-400',
    bg: 'from-orange-950 via-red-950 to-pink-950',
    card: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    badge: 'from-orange-500/20 to-red-500/20',
    button: 'from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
  },
  cyberpunk: {
    primary: 'from-purple-500 to-pink-500',
    secondary: 'from-pink-400 to-rose-400',
    accent: 'from-cyan-400 to-blue-400',
    bg: 'from-purple-950 via-pink-950 to-rose-950',
    card: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    badge: 'from-purple-500/20 to-pink-500/20',
    button: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
  },
  trendy: {
    primary: 'from-emerald-500 to-teal-500',
    secondary: 'from-teal-400 to-cyan-400',
    accent: 'from-green-400 to-emerald-400',
    bg: 'from-emerald-950 via-teal-950 to-cyan-950',
    card: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    badge: 'from-emerald-500/20 to-teal-500/20',
    button: 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
  },
  sport: {
    primary: 'from-red-500 to-orange-500',
    secondary: 'from-orange-400 to-yellow-400',
    accent: 'from-red-400 to-pink-400',
    bg: 'from-red-950 via-orange-950 to-yellow-950',
    card: 'from-red-500/20 to-orange-500/20',
    border: 'border-red-500/30',
    text: 'text-red-400',
    badge: 'from-red-500/20 to-orange-500/20',
    button: 'from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
  }
};

// Generate random color scheme
const getRandomColorScheme = () => {
  const schemes = Object.keys(colorSchemes) as (keyof typeof colorSchemes)[];
  const randomScheme = schemes[Math.floor(Math.random() * schemes.length)];
  return colorSchemes[randomScheme];
};

export default function LandingTemplate({
  title,
  subtitle,
  badges = [],
  features = [],
  showcaseTitle,
  ctaPrimary = "Get Started",
  ctaSecondary = "Learn More",
  logo,
  backgroundImage,
  colorScheme = 'random',
  accentColor
}: LandingTemplateProps) {

  // Get color scheme
  const colors = colorScheme === 'random' ? getRandomColorScheme() : colorSchemes[colorScheme];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} text-white relative overflow-hidden`}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />

      {/* Background Image Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Navigation Header */}
      <nav className="relative z-50 border-b border-white/20 backdrop-blur-lg bg-black/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              {logo ? (
                <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
              ) : (
                <div className={`w-10 h-10 bg-gradient-to-br ${colors.primary} rounded-full flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{title.charAt(0)}</span>
                </div>
              )}
              <span className="text-xl font-bold text-white">
                {title.split(' ')[0]}
              </span>
            </div>

            {/* Wallet Connection */}
            <button
              className={`px-6 py-3 bg-gradient-to-r ${colors.button} text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>Connect Solana</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center max-w-5xl">
            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 rounded-full border border-white/30 bg-gradient-to-r ${colors.badge} backdrop-blur text-white/90 text-sm font-medium hover:bg-white/20 transition-all duration-300`}
                  >
                    <span className="mr-2">✨</span>
                    {badge}
                  </div>
                ))}
              </div>
            )}

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className={`bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>
                {title}
              </span>
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className={`group relative px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r ${colors.button} transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl`}>
                <span className="relative z-10">{ctaPrimary}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="px-8 py-4 rounded-2xl font-bold text-lg bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                {ctaSecondary}
              </button>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        {showcaseTitle && (
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {showcaseTitle}
                </h2>
                <p className="text-white/60 text-lg">Interactive demo and preview area</p>
              </div>

              {/* Framed Panel */}
              <div className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.card} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`relative bg-white/10 backdrop-blur-sm border ${colors.border} rounded-3xl p-8 hover:border-white/40 transition-colors`}>
                  <div className={`aspect-video bg-gradient-to-br ${colors.card} rounded-2xl flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="text-6xl mb-4">🚀</div>
                      <p className="text-white/60 text-lg">Interactive Demo Area</p>
                      <p className="text-white/40 text-sm mt-2">Connect your Solana wallet to see the full experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Grid */}
        {features.length > 0 && (
          <section className="py-20 px-6 bg-white/5">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Key Features
                </h2>
                <p className="text-white/60 text-lg">Discover what makes our platform unique</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${colors.card} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
                      <div className={`w-16 h-16 bg-gradient-to-r ${colors.primary} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                        <span className="text-white font-bold text-xl">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4 text-center">
                        {feature}
                      </h3>
                      <p className="text-white/70 text-center leading-relaxed">
                        Experience the power of {feature.toLowerCase()} in our platform.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className={`bg-gradient-to-r ${colors.card} rounded-3xl p-12 border ${colors.border}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to get started?
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Join thousands of users already using our platform.
              </p>
              <button
                className={`px-12 py-4 rounded-2xl font-bold text-xl bg-gradient-to-r ${colors.button} text-white transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl`}
              >
                Connect & Start Building
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/10">
        <p className="text-white/50 text-sm">
          🚀 Generated with Orynth — AI-powered website generation
        </p>
      </footer>
    </div>
  );
}
