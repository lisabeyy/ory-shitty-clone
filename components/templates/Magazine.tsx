import React from "react";
import type { BaseProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";
import { getStoredStyleParams } from "@/lib/consistentStyles";

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
          <h1 className={`text-8xl md:text-9xl font-black mb-6 bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>
            {title}
          </h1>
          <p className="text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Magazine Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Latest Updates
          </h2>
          
          {/* Use stored grid layout */}
          <div className={`grid ${gridLayout.gridCols} gap-8`}>
            {bullets?.slice(0, gridLayout.maxItems).map((bullet, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 ${colors.timeline} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`relative rounded-2xl border ${colors.border} p-8 bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${colors.accent} rounded-2xl flex items-center justify-center mb-6`}>
                    <span className="text-white text-2xl">{icon}</span>
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
            <div className={`rounded-2xl border ${colors.border} p-8 bg-gradient-to-r ${colors.timeline} backdrop-blur`}>
              <h3 className="text-2xl font-bold text-white mb-4">Featured Story</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                This is the main featured story that showcases the most important content and draws readers in with compelling narrative.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className={`rounded-2xl border ${colors.border} p-6 bg-white/10 backdrop-blur`}>
              <h4 className="text-lg font-bold text-white mb-2">Quick Stats</h4>
              <div className="text-white/70">
                <div className="mb-2">📊 95% Success Rate</div>
                <div className="mb-2">🚀 10x Faster</div>
                <div>💡 Innovation Leader</div>
              </div>
            </div>
            <div className={`rounded-2xl border ${colors.border} p-6 bg-white/10 backdrop-blur`}>
              <h4 className="text-lg font-bold text-white mb-2">Newsletter</h4>
              <p className="text-white/70 text-sm mb-4">Stay updated with our latest insights</p>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 mb-3"
              />
              <button className={`w-full px-4 py-2 bg-gradient-to-r ${colors.accent} text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`relative rounded-3xl border ${colors.border} p-16 bg-gradient-to-r ${colors.timeline} backdrop-blur overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
          <div className="relative text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Explore More?</h2>
            <p className="text-white/90 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of readers who have already discovered the latest insights and trends.
            </p>
            <button className={`px-10 py-5 bg-gradient-to-r ${colors.accent} hover:from-purple-600 hover:to-pink-600 text-white font-bold text-2xl rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl`}>
              {ctaText}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-20">
          <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            📰 Magazine template — Powered by Orynth
          </p>
        </footer>
      </div>
    </div>
  );
}

