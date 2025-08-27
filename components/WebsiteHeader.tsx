import React from "react";

interface WebsiteHeaderProps {
  title?: string;
  icon?: string;
}

export default function WebsiteHeader({ title = "Amazing Website", icon = "✨" }: WebsiteHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{icon}</div>
            <div>
              <h1 className="text-xl font-bold text-white">{title}</h1>
              <p className="text-xs text-white/60">Built with Orynth</p>
            </div>
          </div>

          {/* Solana Connect Button */}
          <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
}
