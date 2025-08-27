import React from "react";

export default function WebsiteHeader() {
  const handleSolanaConnect = () => {
    // Placeholder for Solana wallet connection
    console.log("Solana connect clicked");
    // In a real implementation, this would integrate with @solana/wallet-adapter-react
    // or similar wallet connection libraries
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="text-white/80 font-medium">Orynth</span>
        </div>

        <button
          onClick={handleSolanaConnect}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span>Connect Solana</span>
        </button>
      </div>
    </header>
  );
}
