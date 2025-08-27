import React from "react";
import type { MemeCoinProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

export default function MemeCoin({ title, subtitle, bullets, ctaText, ticker, supply }: MemeCoinProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

      <WebsiteHeader title={title} icon="🚀" />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-sm font-medium">Live on Solana</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
            {title} <span className="text-emerald-400">{ticker}</span>
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {bullets?.map((b, i) => (
            <div key={i} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl border border-white/20 p-8 bg-white/10 backdrop-blur hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">{i + 1}</span>
                </div>
                <p className="text-white/90 text-lg leading-relaxed">{b}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Token Info & CTA */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-16">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-2xl border border-emerald-500/30 p-8 bg-emerald-500/10 backdrop-blur hover:bg-emerald-500/20 transition-all duration-300">
              <div className="text-center">
                <div className="text-emerald-400 text-sm font-medium mb-2">Total Supply</div>
                <div className="text-4xl font-black text-white">{supply}</div>
                <div className="text-emerald-300 text-sm mt-2">Tokens Available</div>
              </div>
            </div>
          </div>

          <button className="group relative px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/25">
            <span className="relative z-10">{ctaText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-white/50 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            ⚠️ Demo page - No actual token deployment. This is a showcase of Orynth's website generation capabilities.
          </p>
        </div>
      </div>
    </div>
  );
}
