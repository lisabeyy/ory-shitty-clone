import React from "react";
import type { AppLandingProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

export default function AppLanding({ title, subtitle, badges, features, showcaseTitle, ctaPrimary, ctaSecondary, icon }: AppLandingProps) {
  // Add some randomness to colors
  const colorSchemes = [
    { bg: 'from-slate-950 via-blue-950 to-slate-900', primary: 'from-blue-400 via-cyan-400 to-blue-600', accent: 'from-blue-500 to-cyan-500' },
    { bg: 'from-slate-950 via-purple-950 to-slate-900', primary: 'from-purple-400 via-pink-400 to-purple-600', accent: 'from-purple-500 to-pink-500' },
    { bg: 'from-slate-950 via-emerald-950 to-slate-900', primary: 'from-emerald-400 via-teal-400 to-emerald-600', accent: 'from-emerald-500 to-teal-500' },
    { bg: 'from-slate-950 via-indigo-950 to-slate-900', primary: 'from-indigo-400 via-blue-400 to-indigo-600', accent: 'from-indigo-500 to-blue-500' },
    { bg: 'from-slate-950 via-rose-950 to-slate-900', primary: 'from-rose-400 via-pink-400 to-rose-600', accent: 'from-rose-500 to-pink-500' },
    { bg: 'from-slate-950 via-amber-950 to-slate-900', primary: 'from-amber-400 via-orange-400 to-amber-600', accent: 'from-amber-500 to-orange-500' }
  ];
  
  const randomColors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${randomColors.bg} text-white`}>
      <WebsiteHeader title={title} icon={icon} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-pulse">{icon}</div>
            <h1 className={`text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r ${randomColors.primary} bg-clip-text text-transparent`}>
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
                  className="px-4 py-2 bg-blue-500/20 backdrop-blur rounded-full text-blue-300 border border-blue-400/30 text-sm font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className={`px-8 py-4 bg-gradient-to-r ${randomColors.accent} hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl`}>
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
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {showcaseTitle}
          </h2>
          
          {/* Randomize between 2 or 3 columns */}
          {(() => {
            const useThreeColumns = Math.random() > 0.5;
            const gridCols = useThreeColumns ? 'md:grid-cols-3' : 'md:grid-cols-2';
            const maxFeatures = useThreeColumns ? 6 : 4; // Ensure even numbers
            
            return (
              <div className={`grid ${gridCols} gap-8`}>
                {features.slice(0, maxFeatures).map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature}</h3>
                    <p className="text-white/70">
                      Revolutionary feature that sets {title} apart from the competition.
                    </p>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60">
            ⚡ Built with ❤️ by the {title} team • Powered by Orynth
          </p>
        </div>
      </footer>
    </div>
  );
}
