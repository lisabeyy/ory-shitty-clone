import React from "react";
import type { LandingTemplateProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

export default function LandingTemplate({
  title,
  subtitle,
  badges,
  features,
  showcaseTitle,
  ctaPrimary,
  ctaSecondary,
  logo,
  backgroundImage,
  colorScheme = 'random'
}: LandingTemplateProps) {

  // Color schemes
  const schemes = {
    cool: {
      primary: 'from-blue-500 to-cyan-500',
      secondary: 'from-cyan-400 to-blue-400',
      accent: 'from-indigo-400 to-purple-400',
      bg: 'from-slate-950 via-blue-950 to-slate-900',
      card: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30',
      button: 'from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
    },
    degen: {
      primary: 'from-orange-500 to-red-500',
      secondary: 'from-red-400 to-pink-400',
      accent: 'from-yellow-400 to-orange-400',
      bg: 'from-slate-950 via-orange-950 to-slate-900',
      card: 'from-orange-500/20 to-red-500/20',
      border: 'border-orange-500/30',
      button: 'from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
    },
    cyberpunk: {
      primary: 'from-green-500 to-emerald-500',
      secondary: 'from-emerald-400 to-cyan-400',
      accent: 'from-lime-400 to-green-400',
      bg: 'from-slate-950 via-green-950 to-slate-900',
      card: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500/30',
      button: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
    },
    trendy: {
      primary: 'from-purple-500 to-pink-500',
      secondary: 'from-pink-400 to-rose-400',
      accent: 'from-violet-400 to-purple-400',
      bg: 'from-slate-950 via-purple-950 to-slate-900',
      card: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30',
      button: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
    },
    sport: {
      primary: 'from-red-500 to-orange-500',
      secondary: 'from-orange-400 to-yellow-400',
      accent: 'from-red-400 to-pink-400',
      bg: 'from-slate-950 via-red-950 to-slate-900',
      card: 'from-red-500/20 to-orange-500/20',
      border: 'border-red-500/30',
      button: 'from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
    }
  };

  // Get color scheme (random if specified or default to trendy)
  const currentScheme = colorScheme === 'random'
    ? Object.values(schemes)[Math.floor(Math.random() * Object.values(schemes).length)]
    : schemes[colorScheme] || schemes.trendy;

  const colors = currentScheme;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} text-white relative overflow-hidden`}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${colors.card} rounded-full blur-3xl animate-pulse`} />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r ${colors.card} rounded-full blur-3xl animate-pulse`} />

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

      <WebsiteHeader title={title} icon="🎯" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-8xl mb-6 animate-bounce">🎯</div>
              <h1 className={`text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>
                {title}
              </h1>
              <p className="text-2xl md:text-3xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
                {subtitle}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 ${colors.card} backdrop-blur rounded-full text-white border ${colors.border} text-sm font-medium`}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button className={`px-8 py-4 bg-gradient-to-r ${colors.button} text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl`}>
                  {ctaPrimary}
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105">
                  {ctaSecondary}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>
              {showcaseTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature}</h3>
                  <p className="text-white/70">
                    Revolutionary feature that sets {title} apart from the competition.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60">
              🎯 Built with ❤️ by the {title} team • Powered by Orynth
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
