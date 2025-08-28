import React from "react";
import type { BaseProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";
import { getStoredStyleParams, getFeatureEmoji } from "@/lib/consistentStyles";

export default function Magazine({ title, subtitle, bullets, ctaText, icon, styleParams }: BaseProps) {
  // Use stored style parameters or fall back to consistent ones
  const { colors, gridLayout } = getStoredStyleParams(styleParams, title);
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} text-white relative overflow-hidden`}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${colors.timeline} rounded-full blur-3xl animate-pulse`} />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${colors.timeline} rounded-full blur-3xl animate-pulse`} />

      <WebsiteHeader title={title} icon={icon} />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section - Large title */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
            <span className="text-rose-400 text-sm font-medium">Magazine Layout</span>
          </div>
          
          <h1 className={`text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>
            {title}
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* CTA Button */}
          <button className={`px-8 py-4 bg-gradient-to-r ${colors.accent} hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl`}>
            {ctaText}
          </button>
        </div>

        {/* Magazine Grid - 2x2 or 3x3 layout */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
            Featured Articles
          </h2>
          
          {/* Use stored grid layout */}
          <div className={`grid ${gridLayout.gridCols} gap-8`}>
            {bullets?.slice(0, gridLayout.maxItems).map((bullet, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 ${colors.timeline} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`relative rounded-2xl border ${colors.border} p-8 bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${colors.accent} rounded-2xl flex items-center justify-center mb-6`}>
                    <span className="text-white text-2xl">{getFeatureEmoji(bullet)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Article {index + 1}</h3>
                  <p className="text-white/80 text-lg leading-relaxed">{bullet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Layout */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="md:col-span-2">
            <div className={`rounded-2xl border ${colors.border} p-8 bg-white/10 backdrop-blur`}>
              <h3 className="text-2xl font-bold text-white mb-4">Latest Updates</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Stay up to date with the latest news and developments from {title}. Our team is constantly working to bring you the most relevant and timely information.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className={`rounded-2xl border ${colors.border} p-6 bg-white/10 backdrop-blur`}>
              <h4 className="text-lg font-bold text-white mb-2">Quick Stats</h4>
              <div className="space-y-2 text-white/70">
                <div>📊 Total Articles: {bullets?.length || 0}</div>
                <div>👥 Active Readers: 10K+</div>
                <div>📈 Growth Rate: 25%</div>
              </div>
            </div>
            <div className={`rounded-2xl border ${colors.border} p-6 bg-white/10 backdrop-blur`}>
              <h4 className="text-lg font-bold text-white mb-2">Newsletter</h4>
              <p className="text-white/70 text-sm mb-4">Get the latest updates delivered to your inbox.</p>
              <button className={`w-full px-4 py-2 bg-gradient-to-r ${colors.accent} text-white rounded-lg text-sm font-medium`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            📖 Magazine template — Powered by LisaBeyy
          </p>
        </footer>
      </div>
    </div>
  );
}

