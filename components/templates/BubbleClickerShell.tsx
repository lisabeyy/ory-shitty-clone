import React from "react";
import type { BaseProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

export default function BubbleClickerShell({ title, subtitle, icon }: BaseProps) {
  // Add some randomness to colors
  const colorSchemes = [
    { bg: 'from-blue-900 via-purple-900 to-indigo-900', primary: 'from-white via-blue-100 to-purple-400', accent: 'from-blue-500 to-purple-500', glow: 'from-blue-500/20 to-purple-500/20' },
    { bg: 'from-emerald-900 via-teal-900 to-cyan-900', primary: 'from-white via-emerald-100 to-teal-400', accent: 'from-emerald-500 to-teal-500', glow: 'from-emerald-500/20 to-teal-500/20' },
    { bg: 'from-rose-900 via-pink-900 to-fuchsia-900', primary: 'from-white via-rose-100 to-pink-400', accent: 'from-rose-500 to-pink-500', glow: 'from-rose-500/20 to-pink-500/20' },
    { bg: 'from-orange-900 via-amber-900 to-yellow-900', primary: 'from-white via-orange-100 to-amber-400', accent: 'from-orange-500 to-amber-500', glow: 'from-orange-500/20 to-amber-500/20' }
  ];
  
  const randomColors = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${randomColors.bg} text-white relative overflow-hidden`}>
      {/* Background effects */}
      <div className={`absolute inset-0 bg-gradient-to-r ${randomColors.glow} animate-aurora`} />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
      }} />
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${randomColors.glow} rounded-full blur-3xl`} />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${randomColors.glow} rounded-full blur-3xl`} />

      <WebsiteHeader title={title} icon={icon} />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium">Game Ready</span>
          </div>

          <h1 className={`text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r ${randomColors.primary} bg-clip-text text-transparent`}>
            {title || "🫧 Bubble Clicker"}
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle || "Click bubbles, earn points, beat your high score!"}
          </p>
        </div>

        {/* Game Stats Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-3 border border-white/20">
            <span className="font-mono text-lg">High Score: 0</span>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-3 border border-white/20">
            <span className="font-mono text-lg">Total Games: 0</span>
          </div>
        </div>

        {/* Game Canvas */}
        <div className="relative h-[540px] bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 mb-12 overflow-hidden group">
          <div className={`absolute inset-0 bg-gradient-to-br ${randomColors.glow}`} />

          {/* Game UI Overlay */}
          <div className="absolute top-6 left-6 bg-white/10 backdrop-blur rounded-xl px-4 py-2 border border-white/20">
            <span className="font-mono font-bold">Score: 0</span>
          </div>
          <div className="absolute top-6 right-6 bg-white/10 backdrop-blur rounded-xl px-4 py-2 border border-white/20">
            <span className="font-mono font-bold">Lives: ❤️❤️❤️</span>
          </div>

          {/* Game Instructions */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🫧</div>
              <p className="text-white/60 text-lg">Click to start playing!</p>
            </div>
          </div>

          {/* Sample Bubble */}
          <div
            className={`absolute w-16 h-16 bg-gradient-to-br ${randomColors.accent} rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg hover:shadow-2xl`}
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Game Controls */}
        <div className="flex gap-6 justify-center mb-16">
          <button className={`group relative px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r ${randomColors.accent} hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25`}>
            <span className="relative z-10">🎮 Start Game</span>
            <div className={`absolute inset-0 ${randomColors.glow} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
          </button>
          <button className="px-8 py-4 rounded-2xl font-bold text-lg bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            🔄 Reset
          </button>
        </div>

        {/* Game Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="group relative">
            <div className={`absolute inset-0 ${randomColors.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-3xl mr-3">🎮</span>
                How to Play
              </h2>
              <ul className="space-y-3 text-white/80 text-lg">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Click the bubbles as fast as you can
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Each click increases your score
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Avoid missing bubbles to keep your lives
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Beat your high score and challenge friends
                </li>
              </ul>
            </div>
          </div>

          <div className="group relative">
            <div className={`absolute inset-0 ${randomColors.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-3xl mr-3">🏆</span>
                Game Features
              </h2>
              <ul className="space-y-3 text-white/80 text-lg">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Responsive click detection
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Progressive difficulty
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Score tracking system
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Beautiful visual effects
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            🫧 Game template — Powered by Orynth
          </p>
        </footer>
      </div>
    </div>
  );
}
