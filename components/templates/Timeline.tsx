import React from "react";
import type { BaseProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";
import { getStoredStyleParams, getFeatureEmoji } from "@/lib/consistentStyles";

export default function Timeline({ title, subtitle, bullets, ctaText, icon, styleParams }: BaseProps) {
  // Use stored style parameters or fall back to consistent ones
  const { colors, gridLayout } = getStoredStyleParams(styleParams, title);

  // Color schemes
  const colorSchemes = [
    { bg: 'from-slate-950 via-orange-950 to-slate-900', primary: 'from-orange-400 to-red-500', accent: 'from-orange-500 to-red-600', timeline: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30' },
    { bg: 'from-slate-950 via-lime-950 to-slate-900', primary: 'from-lime-400 to-green-500', accent: 'from-lime-500 to-green-600', timeline: 'from-lime-500/20 to-green-500/20', border: 'border-lime-500/30' },
    { bg: 'from-slate-950 via-sky-950 to-slate-900', primary: 'from-sky-400 to-blue-500', accent: 'from-sky-500 to-blue-600', timeline: 'from-sky-500/20 to-blue-500/20', border: 'border-sky-500/30' },
    { bg: 'from-slate-950 via-fuchsia-950 to-slate-900', primary: 'from-fuchsia-400 to-purple-500', accent: 'from-fuchsia-500 to-purple-600', timeline: 'from-fuchsia-500/20 to-purple-500/20', border: 'border-fuchsia-500/30' }
  ];

  // Use stored colors if available, otherwise fall back to consistent ones
  const finalColors = colors || colorSchemes[0];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${finalColors.bg} text-white relative overflow-hidden`}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${finalColors.timeline} rounded-full blur-3xl animate-pulse`} />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${finalColors.timeline} rounded-full blur-3xl animate-pulse`} />

      <WebsiteHeader title={title} icon={icon} />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section - Minimal centered */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-orange-400 text-sm font-medium">Timeline Layout</span>
          </div>

          <h1 className={`text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r ${finalColors.primary} bg-clip-text text-transparent`}>
            {title}
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Timeline Section - Vertical layout with alternating sides */}
        <div className="relative mb-20">
          {/* Timeline line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${finalColors.timeline} rounded-full`}></div>

          {bullets?.map((bullet, index) => (
            <div key={index} className={`relative mb-16 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
              {/* Timeline dot */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r ${finalColors.accent} rounded-full border-4 border-white shadow-lg z-10`}></div>

              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                <div className="group relative">
                  <div className={`absolute inset-0 ${finalColors.timeline} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className={`relative rounded-2xl border ${finalColors.border} p-8 bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40`}>
                    <div className={`w-12 h-12 bg-gradient-to-r ${finalColors.accent} rounded-xl flex items-center justify-center mb-4`}>
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Step {index + 1}</h3>
                    <p className="text-white/80 text-lg leading-relaxed">{bullet}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid - 3 columns */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {bullets?.slice(0, 3).map((bullet, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 ${finalColors.timeline} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative rounded-2xl border border-white/20 p-8 bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
                  <div className={`w-16 h-16 bg-gradient-to-r ${finalColors.accent} rounded-2xl flex items-center justify-center mb-6`}>
                    <span className="text-white text-2xl">{getFeatureEmoji(bullet)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{bullet}</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {bullet} - a key feature that makes {title} stand out.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Full width with gradient */}
        <div className={`relative rounded-3xl border ${finalColors.border} p-16 bg-gradient-to-r ${finalColors.timeline} backdrop-blur overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
          <div className="relative text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-white/90 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who have already transformed their experience with our innovative platform.
            </p>
            <button className={`px-10 py-5 bg-gradient-to-r ${finalColors.accent} hover:from-orange-600 hover:to-red-700 text-white font-bold text-2xl rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl`}>
              {ctaText}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-20">
          <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            ⏰ Timeline template — Powered by LisaBeyy
          </p>
        </footer>
      </div>
    </div>
  );
}
