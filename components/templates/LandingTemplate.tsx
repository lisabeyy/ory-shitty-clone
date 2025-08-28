import React from "react";
import type { LandingTemplateProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";
import { getStoredStyleParams, getFeatureEmoji } from "@/lib/consistentStyles";

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
  colorScheme,
  accentColor,
  icon,
  styleParams
}: LandingTemplateProps) {
  // Use stored style parameters or fall back to consistent ones
  const { colors, gridLayout } = getStoredStyleParams(styleParams, title);

  // Color schemes
  const colorSchemes = {
    cool: {
      bg: 'from-slate-950 via-blue-950 to-slate-900',
      primary: 'from-blue-400 via-cyan-400 to-blue-600',
      accent: 'from-blue-500 to-cyan-500',
      text: 'text-blue-300'
    },
    degen: {
      bg: 'from-zinc-950 via-purple-950 to-zinc-900',
      primary: 'from-white via-emerald-100 to-emerald-400',
      accent: 'from-emerald-500 to-blue-500',
      text: 'text-emerald-300'
    },
    cyberpunk: {
      bg: 'from-black via-purple-950 to-black',
      primary: 'from-cyan-400 via-purple-400 to-pink-400',
      accent: 'from-purple-500 to-pink-500',
      text: 'text-cyan-300'
    },
    trendy: {
      bg: 'from-slate-950 via-purple-950 to-slate-900',
      primary: 'from-purple-400 via-pink-400 to-purple-600',
      accent: 'from-purple-500 to-pink-500',
      text: 'text-purple-300'
    },
    sport: {
      bg: 'from-slate-950 via-emerald-950 to-slate-900',
      primary: 'from-emerald-400 via-teal-400 to-emerald-600',
      accent: 'from-emerald-500 to-teal-500',
      text: 'text-emerald-300'
    }
  };

  // Use stored colors if available, otherwise fall back to colorScheme prop
  const finalColors = colors || colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.trendy;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${finalColors.bg} text-white relative overflow-hidden`}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

      <WebsiteHeader title={title} icon={icon} />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-sm font-medium">Live Now</span>
          </div>

          <h1 className={`text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r ${finalColors.primary} bg-clip-text text-transparent`}>
            {title}
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {badges?.map((badge, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white border border-white/20 text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className={`px-8 py-4 bg-gradient-to-r ${finalColors.accent} hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl`}>
              {ctaPrimary}
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white font-bold text-xl rounded-2xl transition-all duration-300 hover:scale-105">
              {ctaSecondary}
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {showcaseTitle}
          </h2>

          {/* Use stored grid layout */}
          <div className={`grid ${gridLayout.gridCols} gap-8`}>
            {features?.slice(0, gridLayout.maxItems).map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-white/20 p-8 bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">{getFeatureEmoji(feature)}</span>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            🎯 Built with ❤️ by the {title} team • Powered by LisaBeyy
          </p>
        </footer>
      </div>
    </div>
  );
}
