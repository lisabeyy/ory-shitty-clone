import React from "react";
import type { MemeCoinProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

interface MemeCoinProps {
  title: string;
  subtitle: string;
  ticker: string;
  description: string;
  features: string[];
  socialLinks: string[];
}

export default function MemeCoin({ title, subtitle, ticker, description, features, socialLinks }: MemeCoinProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white">
      <WebsiteHeader title={title} icon="🚀" />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-bounce">🚀</div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              {subtitle}
            </p>
            <div className="inline-flex items-center space-x-4 px-8 py-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
              <span className="text-3xl font-bold text-yellow-400">{ticker}</span>
              <span className="text-white/60">Token</span>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl text-white/70 leading-relaxed">
              {description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-xl">
              🚀 Launch App
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105">
              📖 Read Whitepaper
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Why {ticker}?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-white mb-4">{feature}</h3>
                <p className="text-white/70">
                  Revolutionary feature that sets {ticker} apart from the competition.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Join the {ticker} Community
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => (
              <button
                key={index}
                className="px-6 py-3 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {social}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60">
            🚀 Built with ❤️ by the {ticker} team • Powered by Orynth
          </p>
        </div>
      </footer>
    </div>
  );
}
