import React from "react";
import type { BaseProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

export default function LandingGradient({ title, subtitle, bullets, ctaText, icon }: BaseProps) {
  // Add some randomness to colors
  const colorSchemes = [
    { bg: 'from-indigo-700 via-purple-800 to-sky-700', primary: 'from-white via-blue-100 to-indigo-400', accent: 'from-indigo-500 to-purple-500', glow: 'from-indigo-500/20 to-purple-500/20' },
    { bg: 'from-emerald-700 via-teal-800 to-cyan-700', primary: 'from-white via-emerald-100 to-emerald-400', accent: 'from-emerald-500 to-teal-500', glow: 'from-emerald-500/20 to-teal-500/20' },
    { bg: 'from-rose-700 via-pink-800 to-fuchsia-700', primary: 'from-white via-rose-100 to-rose-400', accent: 'from-rose-500 to-pink-500', glow: 'from-rose-500/20 to-pink-500/20' },
    { bg: 'from-orange-700 via-amber-800 to-yellow-700', primary: 'from-white via-orange-100 to-orange-400', accent: 'from-orange-500 to-amber-500', glow: 'from-orange-500/20 to-amber-500/20' }
  ];

  const randomColors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];

  return (
    <div className={`min-h-screen relative overflow-hidden text-white`}>
      {/* Background effects */}
      <div className={`absolute inset-0 bg-gradient-to-br ${randomColors.bg} opacity-90`} />
      <div className="absolute inset-0 pointer-events-none opacity-50" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
      }} />
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${randomColors.glow} rounded-full blur-3xl`} />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${randomColors.glow} rounded-full blur-3xl`} />

      <WebsiteHeader title={title} icon={icon} />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 mb-8 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium">Powered by Orynth</span>
          </div>

          <h1 className={`text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r ${randomColors.primary} bg-clip-text text-transparent tracking-tight`}>
            {title}
          </h1>

          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Randomize between 2 or 3 columns */}
          {(() => {
            const useThreeColumns = Math.random() > 0.5;
            const gridCols = useThreeColumns ? 'md:grid-cols-3' : 'md:grid-cols-2';
            const maxBullets = useThreeColumns ? 6 : 4; // Ensure even numbers

            return (
              <div className={`grid ${gridCols} gap-8`}>
                {bullets?.slice(0, maxBullets).map((b, i) => (
                  <div key={i} className="group relative">
                    <div className={`absolute inset-0 ${randomColors.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
                      <div className={`w-12 h-12 bg-gradient-to-r ${randomColors.accent} rounded-xl flex items-center justify-center mb-4`}>
                        <span className="text-white font-bold text-lg">{i + 1}</span>
                      </div>
                      <p className="text-white/90 text-lg leading-relaxed">{b}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className={`group relative px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r ${randomColors.accent} hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-indigo-500/25`}>
            <span className="relative z-10">{ctaText}</span>
            <div className={`absolute inset-0 ${randomColors.glow} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center">
          <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            🌈 Generated with Orynth — AI-powered website generation
          </p>
        </footer>
      </div>
    </div>
  );
}
