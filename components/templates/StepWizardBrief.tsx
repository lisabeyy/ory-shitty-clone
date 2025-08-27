import React from "react";
import type { StepWizardProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

export default function StepWizardBrief({ title, subtitle, steps, highlights, ctaPrimary, disclaimer }: StepWizardProps) {
  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-violet-900 via-fuchsia-900 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-slate-500/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl" />

      <WebsiteHeader title={title} icon="📋" />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
            <span className="text-violet-400 text-sm font-medium">Step by Step</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-violet-100 to-fuchsia-400 bg-clip-text text-transparent">
            {title}
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Steps Section */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <span className="text-2xl mr-3">📋</span>
              Step-by-Step Guide
            </h2>

            {steps?.map((s, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-violet-300 mb-2 font-medium">Step {i + 1}</div>
                      <div className="text-2xl font-bold text-white mb-3">{s.title}</div>
                      {s.desc ? (
                        <p className="text-white/70 text-lg leading-relaxed">{s.desc}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <div className="mt-8">
              <button className="group relative px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/25">
                <span className="relative z-10">{ctaPrimary}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </div>
          </div>

          {/* Highlights Sidebar */}
          <aside className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-xl mr-3">💡</span>
              Key Highlights
            </h3>

            {highlights?.map((h, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-xl border border-white/20 bg-white/10 backdrop-blur p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
                  <div className="w-8 h-8 bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white font-bold text-sm">★</span>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed">{h}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>

        {/* Disclaimer */}
        {disclaimer ? (
          <div className="mt-16 text-center">
            <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
              ⚠️ {disclaimer}
            </p>
          </div>
        ) : null}

        {/* Footer */}
        <footer className="text-center mt-16">
          <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            📋 Step wizard template — Powered by @lisabeyy
          </p>
        </footer>
      </div>
    </div>
  );
}
