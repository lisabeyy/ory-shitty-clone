import React from "react";
import type { MemeCoinProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";
import { getStoredStyleParams, getFeatureEmoji } from "@/lib/consistentStyles";

export default function MemeCoin({ title, subtitle, bullets, ctaText, ticker, supply, icon, styleParams }: MemeCoinProps) {
  // Use stored style parameters or fall back to consistent ones
  const { colors, gridLayout } = getStoredStyleParams(styleParams, title);
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} text-white`}>
      <WebsiteHeader title={title} icon={icon} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-pulse">{icon}</div>
            <h1 className={`text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r ${colors.primary} bg-clip-text text-transparent`}>
              {title}
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              {subtitle}
            </p>
            
            {/* Token Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-8 py-4">
                <div className="text-2xl font-bold text-yellow-400">{ticker}</div>
                <div className="text-white/60 text-sm">Ticker</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-8 py-4">
                <div className="text-2xl font-bold text-green-400">{supply}</div>
                <div className="text-white/60 text-sm">Total Supply</div>
              </div>
            </div>

            {/* CTA Button */}
            <button className={`px-8 py-4 bg-gradient-to-r ${colors.accent} hover:from-green-600 hover:to-emerald-600 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl`}>
              {ctaText}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Why Choose {title}?
          </h2>
          
          {/* Use stored grid layout */}
          <div className={`grid ${gridLayout.gridCols} gap-8`}>
            {bullets.slice(0, gridLayout.maxItems).map((bullet, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{getFeatureEmoji(bullet)}</div>
                <h3 className="text-xl font-bold text-white mb-4">{bullet}</h3>
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
            🚀 Built with ❤️ by the {title} team • Powered by LisaBeyy
          </p>
        </div>
      </footer>
    </div>
  );
}
