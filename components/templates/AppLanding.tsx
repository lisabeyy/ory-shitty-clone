import React from "react";
import type { AppLandingProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

export default function AppLanding({ title, subtitle, badges, features, showcaseTitle, ctaPrimary, ctaSecondary }: AppLandingProps) {
  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-slate-500/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      <WebsiteHeader />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-indigo-400 text-sm font-medium">App Ready</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-indigo-100 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>

          {/* Badges */}
          {badges?.length ? (
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {badges.map((b, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur text-white/90 text-sm font-medium hover:bg-white/20 transition-all duration-300">
                  {b}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features?.map((f, i) => (
            <div key={i} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl border border-white/20 p-8 bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">{i + 1}</span>
                </div>
                <p className="text-white/90 text-lg leading-relaxed">{f}</p>
              </div>
            </div>
          ))}
        </div>

        {/* App Showcase */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{showcaseTitle}</h2>
            <p className="text-white/60">Preview of the application interface</p>
          </div>
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-black/40 to-slate-900/40 backdrop-blur h-[400px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-white/60 text-lg">App Interface Preview</p>
                  <p className="text-white/40 text-sm mt-2">Connect your Solana wallet to see the full app</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <button className="group relative px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-indigo-500/25">
            <span className="relative z-10">{ctaPrimary}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
          <button className="px-8 py-4 rounded-2xl font-bold text-lg bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            {ctaSecondary}
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            📱 App landing template — Connect your Solana wallet to unlock full features
          </p>
        </footer>
      </div>
    </div>
  );
}
