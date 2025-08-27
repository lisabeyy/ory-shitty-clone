import React from "react";
import type { BaseProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

export default function MinimalDocs({ title, subtitle, bullets }: BaseProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-200 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-slate-500/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <WebsiteHeader />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium">Documentation</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-slate-100 to-blue-400 bg-clip-text text-transparent">
            {title}
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur rounded-3xl border border-white/10 p-8 md:p-12">
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
              <span className="text-2xl mr-3">📚</span>
              Overview
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              This is a minimal documentation template designed for clarity and readability.
              Replace this content with your actual documentation.
            </p>

            <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
              <span className="text-xl mr-3">🔑</span>
              Key Points
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {bullets?.map((b, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-white font-bold text-sm">{i + 1}</span>
                    </div>
                    <p className="text-slate-200 text-lg leading-relaxed">{b}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
              <span className="text-xl mr-3">🚀</span>
              Getting Started
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Follow these steps to get up and running with your project:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-slate-300 text-lg">
              <li>Review the key points above</li>
              <li>Set up your development environment</li>
              <li>Install required dependencies</li>
              <li>Run the project locally</li>
              <li>Connect your Solana wallet to unlock full features</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16">
          <p className="text-slate-400 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            📚 Documentation template — Powered by Orynth
          </p>
        </footer>
      </div>
    </div>
  );
}
