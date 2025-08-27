import React from "react";
import type { BaseProps } from "@/lib/templates";
import WebsiteHeader from "../WebsiteHeader";

export default function BubbleClickerShell({ title, subtitle }: BaseProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-aurora" />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
      }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      <WebsiteHeader />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium">Game Ready</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-400 bg-clip-text text-transparent">
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />

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
            className="absolute w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg hover:shadow-2xl"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Game Controls */}
        <div className="flex gap-6 justify-center mb-16">
          <button className="group relative px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25">
            <span className="relative z-10">🎮 Start Game</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
          <button className="px-8 py-4 rounded-2xl font-bold text-lg bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            🔄 Reset
          </button>
        </div>

        {/* Game Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  Bubbles appear faster as your score increases
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Miss 3 bubbles and game is over
                </li>
              </ul>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-3xl mr-3">🏆</span>
                Scoring System
              </h2>
              <ul className="space-y-3 text-white/80 text-lg">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Normal bubbles: 1 point
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Golden bubbles: 5 points
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Combo streaks multiply points
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Share your high score!
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-white/60 text-sm bg-white/5 backdrop-blur rounded-xl px-6 py-3 inline-block border border-white/10">
            🎮 Demo game shell — Connect your Solana wallet to play for real!
          </p>
        </footer>
      </div>
    </div>
  );
}
