import React from "react";
import type { BaseProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

export default function CardGrid({ title, subtitle, bullets, ctaText, icon }: BaseProps) {
  // Add some randomness to colors
  const colorSchemes = [
    { bg: 'from-slate-950 via-cyan-950 to-slate-900', primary: 'from-cyan-400 to-blue-500', accent: 'from-cyan-500 to-blue-600', card: 'from-cyan-500/10 to-blue-500/10', border: 'border-cyan-500/30' },
    { bg: 'from-slate-950 via-rose-950 to-slate-900', primary: 'from-rose-400 to-pink-500', accent: 'from-rose-500 to-pink-600', card: 'from-rose-500/10 to-pink-500/10', border: 'border-rose-500/30' },
    { bg: 'from-slate-950 via-emerald-950 to-slate-900', primary: 'from-emerald-400 to-teal-500', accent: 'from-emerald-500 to-teal-600', card: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/30' },
    { bg: 'from-slate-950 via-violet-950 to-slate-900', primary: 'from-violet-400 to-purple-500', accent: 'from-violet-500 to-purple-600', card: 'from-violet-500/10 to-purple-500/10', border: 'border-violet-500/30' }
  ];
  
  const randomColors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${randomColors.bg} text-white relative overflow-hidden`}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${randomColors.card} rounded-full blur-3xl animate-pulse`} />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${randomColors.card} rounded-full blur-3xl animate-pulse`} />

      <WebsiteHeader title={title} icon={icon} />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section - Side by side layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="text-left">
            <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm font-medium">New Template</span>
            </div>
            
            <h1 className={`text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r ${randomColors.primary} bg-clip-text text-transparent leading-tight`}>
              {title}
            </h1>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              {subtitle}
            </p>
            
            <button className={`px-8 py-4 bg-gradient-to-r ${randomColors.accent} hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl`}>
              {ctaText}
            </button>
          </div>
          
          <div className="relative">
            <div className={`w-full h-80 bg-gradient-to-br ${randomColors.card} rounded-3xl border ${randomColors.border} backdrop-blur flex items-center justify-center`}>
              <div className="text-center">
                <div className="text-8xl mb-4">🎴</div>
                <p className="text-white/70 text-lg">Visual Preview</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid - 2x2 or 3x3 Layout */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Key Features
          </h2>
          
          {/* Randomize between 2 or 3 columns */}
          {(() => {
            const useThreeColumns = Math.random() > 0.5;
            const gridCols = useThreeColumns ? 'md:grid-cols-3' : 'md:grid-cols-2';
            const maxCards = useThreeColumns ? 6 : 4; // Ensure even numbers
            
            return (
              <div className={`grid ${gridCols} gap-8`}>
                {bullets?.slice(0, maxCards).map((bullet, index) => (
                  <div key={index} className="group relative">
                    <div className={`absolute inset-0 ${randomColors.card} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`relative rounded-2xl border ${randomColors.border} p-8 bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40`}>
                      <div className={`w-16 h-16 bg-gradient-to-r ${randomColors.accent} rounded-2xl flex items-center justify-center mb-6`}>
                        <span className="text-white text-2xl font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">Feature {index + 1}</h3>
                      <p className="text-white/80 text-lg leading-relaxed">{bullet}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Stats Section - Horizontal layout */}
        <div className="mb-20">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold bg-gradient-to-r ${randomColors.primary} bg-clip-text text-transparent mb-2`}>100%</div>
              <div className="text-white/60">Success Rate</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold bg-gradient-to-r ${randomColors.primary} bg-clip-text text-transparent mb-2`}>24/7</div>
              <div className="text-white/60">Support</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold bg-gradient-to-r ${randomColors.primary} bg-clip-text text-transparent mb-2`}>10K+</div>
              <div className="text-white/60">Happy Users</div>
            </div>
          </div>
        </div>

        {/* CTA Section - Centered with background */}
        <div className={`relative rounded-3xl border ${randomColors.border} p-12 bg-gradient-to-r ${randomColors.card} backdrop-blur`}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already transformed their experience with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-8 py-4 bg-gradient-to-r ${randomColors.accent} hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl`}>
                {ctaText}
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-20">
          <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            🎴 Card Grid template — Powered by Orynth
          </p>
        </footer>
      </div>
    </div>
  );
}
