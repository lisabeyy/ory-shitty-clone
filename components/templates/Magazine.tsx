import React from "react";
import type { BaseProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

export default function Magazine({ title, subtitle, bullets, ctaText, icon }: BaseProps) {
  // Add some randomness to colors
  const colorSchemes = [
    { bg: 'from-slate-950 via-amber-950 to-slate-900', primary: 'from-amber-400 to-orange-500', accent: 'from-amber-500 to-orange-600', card: 'from-amber-500/10 to-orange-500/10', border: 'border-amber-500/30' },
    { bg: 'from-slate-950 via-cyan-950 to-slate-900', primary: 'from-cyan-400 to-blue-500', accent: 'from-cyan-500 to-blue-600', card: 'from-cyan-500/10 to-blue-500/10', border: 'border-cyan-500/30' },
    { bg: 'from-slate-950 via-emerald-950 to-slate-900', primary: 'from-emerald-400 to-teal-500', accent: 'from-emerald-500 to-teal-600', card: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/30' },
    { bg: 'from-slate-950 via-rose-950 to-slate-900', primary: 'from-rose-400 to-pink-500', accent: 'from-rose-500 to-pink-600', card: 'from-rose-500/10 to-pink-500/10', border: 'border-rose-500/30' }
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
        {/* Hero Section - Magazine style with large title */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-amber-400 text-sm font-medium">Featured Story</span>
            </div>

            <h1 className={`text-7xl md:text-8xl font-black mb-8 bg-gradient-to-r ${randomColors.primary} bg-clip-text text-transparent leading-none tracking-tight`}>
              {title}
            </h1>

            <p className="text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              {subtitle}
            </p>
          </div>

          {/* Hero CTA */}
          <div className="text-center">
            <button className={`px-10 py-5 bg-gradient-to-r ${randomColors.accent} hover:from-amber-600 hover:to-orange-700 text-white font-bold text-2xl rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl`}>
              {ctaText}
            </button>
          </div>
        </div>

        {/* Magazine Grid - 2x2 or 3x3 layout with different sizes */}
        <div className="mb-20">
          {(() => {
            const useThreeColumns = Math.random() > 0.5;
            const gridCols = useThreeColumns ? 'md:grid-cols-3' : 'md:grid-cols-2';
            const maxCards = useThreeColumns ? 6 : 4; // Ensure even numbers
            
            return (
              <div className={`grid ${gridCols} gap-8`}>
                {/* Large featured article - spans full width */}
                <div className="group relative md:col-span-full">
                  <div className={`absolute inset-0 ${randomColors.card} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className={`relative rounded-3xl border ${randomColors.border} p-12 bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40`}>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Featured Story</h2>
                        <p className="text-white/80 text-xl leading-relaxed mb-6">
                          {bullets?.[0] || "Discover the amazing features that make this platform unique and powerful."}
                        </p>
                        <button className={`px-6 py-3 bg-gradient-to-r ${randomColors.accent} hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105`}>
                          Read More
                        </button>
                      </div>
                      <div className={`w-full h-64 bg-gradient-to-br ${randomColors.card} rounded-2xl border ${randomColors.border} flex items-center justify-center`}>
                        <div className="text-center">
                          <div className="text-6xl mb-4">{icon}</div>
                          <p className="text-white/70">Featured Image</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Smaller articles - fill remaining grid */}
                {bullets?.slice(1, maxCards - 1).map((bullet, index) => (
                  <div key={index} className="group relative">
                    <div className={`absolute inset-0 ${randomColors.card} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className={`relative rounded-2xl border ${randomColors.border} p-8 bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40`}>
                      <div className={`w-16 h-16 bg-gradient-to-r ${randomColors.accent} rounded-2xl flex items-center justify-center mb-6`}>
                        <span className="text-white text-2xl">📖</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">Article {index + 2}</h3>
                      <p className="text-white/80 text-lg leading-relaxed mb-6">{bullet}</p>
                      <button className="px-4 py-2 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300">
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Sidebar Layout - Content + Sidebar */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-bold text-white mb-8">Latest Updates</h2>
            <div className="space-y-8">
              {bullets?.slice(3, 6).map((bullet, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 ${randomColors.card} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative rounded-2xl border border-white/20 p-8 bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${randomColors.accent} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-lg">{index + 4}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-3">Update {index + 4}</h3>
                        <p className="text-white/80 text-lg leading-relaxed">{bullet}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className={`rounded-2xl border ${randomColors.border} p-6 bg-gradient-to-r ${randomColors.card} backdrop-blur`}>
              <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Users</span>
                  <span className="text-white font-bold">10K+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Articles</span>
                  <span className="text-white font-bold">500+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Views</span>
                  <span className="text-white font-bold">1M+</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur">
              <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
              <p className="text-white/70 text-sm mb-4">Stay updated with our latest stories</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 mb-3"
              />
              <button className={`w-full px-4 py-2 bg-gradient-to-r ${randomColors.accent} hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-300`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            📰 Magazine template — Powered by Orynth
          </p>
        </footer>
      </div>
    </div>
  );
}
