// Utility to generate consistent colors and layouts based on a stable identifier
// This ensures that once a website is generated, its colors and layout stay the same

export function getConsistentColors(identifier: string) {
  // Use the identifier to generate a consistent color scheme
  const hash = simpleHash(identifier);
  const colorSchemes = [
    { bg: 'from-slate-950 via-blue-950 to-slate-900', primary: 'from-blue-400 via-cyan-400 to-blue-600', accent: 'from-blue-500 to-cyan-500' },
    { bg: 'from-slate-950 via-purple-950 to-slate-900', primary: 'from-purple-400 via-pink-400 to-purple-600', accent: 'from-purple-500 to-pink-500' },
    { bg: 'from-slate-950 via-emerald-950 to-slate-900', primary: 'from-emerald-400 via-teal-400 to-emerald-600', accent: 'from-emerald-500 to-teal-500' },
    { bg: 'from-slate-950 via-indigo-950 to-slate-900', primary: 'from-indigo-400 via-blue-400 to-indigo-600', accent: 'from-indigo-500 to-blue-500' },
    { bg: 'from-slate-950 via-rose-950 to-slate-900', primary: 'from-rose-400 via-pink-400 to-rose-600', accent: 'from-rose-500 to-pink-500' },
    { bg: 'from-slate-950 via-amber-950 to-slate-900', primary: 'from-amber-400 via-orange-400 to-amber-600', accent: 'from-amber-500 to-orange-500' }
  ];
  
  return colorSchemes[hash % colorSchemes.length];
}

// Get consistent grid layout based on title hash
export function getConsistentGridLayout(styleParams: any, title: string) {
  if (styleParams?.gridLayout) {
    return styleParams.gridLayout;
  }
  
  const hash = simpleHash(title);
  const layouts = [
    // 2 columns with 4 items (2 rows of 2)
    { gridCols: 'md:grid-cols-2', maxItems: 4 },
    // 2 columns with 6 items (3 rows of 2) 
    { gridCols: 'md:grid-cols-2', maxItems: 6 },
    // 3 columns with 6 items (2 rows of 3)
    { gridCols: 'md:grid-cols-3', maxItems: 6 },
    // 3 columns with 9 items (3 rows of 3)
    { gridCols: 'md:grid-cols-3', maxItems: 9 },
    // 4 columns with 8 items (2 rows of 4)
    { gridCols: 'md:grid-cols-4', maxItems: 8 },
    // 4 columns with 12 items (3 rows of 4)
    { gridCols: 'md:grid-cols-4', maxItems: 12 }
  ];
  
  return layouts[hash % layouts.length];
}

export function getConsistentColorScheme(identifier: string) {
  // Use the identifier to generate a consistent color scheme for LandingTemplate
  const hash = simpleHash(identifier);
  const schemes = ['cool', 'degen', 'cyberpunk', 'trendy', 'sport'];
  return schemes[hash % schemes.length];
}

// Generate random style parameters that will be stored and reused
export function generateRandomStyleParams(title: string) {
  const hash = simpleHash(title);
  
  return {
    colors: getConsistentColors(title),
    gridLayout: getConsistentGridLayout(null, title) // Pass null as styleParams to generate new layout
  };
}

// Get stored style parameters or fall back to consistent ones
export function getStoredStyleParams(styleParams: any, fallbackIdentifier: string) {
  if (styleParams && styleParams.colorScheme && styleParams.gridLayout) {
    // Use stored style parameters
    return {
      colors: getColorsByName(styleParams.colorScheme),
      gridLayout: getGridLayoutByName(styleParams.gridLayout)
    };
  } else {
    // Fall back to consistent generation based on identifier
    return {
      colors: getConsistentColors(fallbackIdentifier),
      gridLayout: getConsistentGridLayout(styleParams, fallbackIdentifier) // Pass styleParams here
    };
  }
}

function getColorsByName(name: string) {
  const colorMap: Record<string, any> = {
    blue: { 
      bg: 'from-slate-950 via-blue-950 to-slate-900', 
      primary: 'from-blue-400 via-cyan-400 to-blue-600', 
      accent: 'from-blue-500 to-cyan-500',
      timeline: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30'
    },
    purple: { 
      bg: 'from-slate-950 via-purple-950 to-slate-900', 
      primary: 'from-purple-400 via-pink-400 to-purple-600', 
      accent: 'from-purple-500 to-pink-500',
      timeline: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30'
    },
    emerald: { 
      bg: 'from-slate-950 via-emerald-950 to-slate-900', 
      primary: 'from-emerald-400 via-teal-400 to-emerald-600', 
      accent: 'from-emerald-500 to-teal-500',
      timeline: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30'
    },
    indigo: { 
      bg: 'from-slate-950 via-indigo-950 to-slate-900', 
      primary: 'from-indigo-400 via-blue-400 to-indigo-600', 
      accent: 'from-indigo-500 to-blue-500',
      timeline: 'from-indigo-500/20 to-blue-500/20',
      border: 'border-indigo-500/30'
    },
    rose: { 
      bg: 'from-slate-950 via-rose-950 to-slate-900', 
      primary: 'from-rose-400 via-pink-400 to-rose-600', 
      accent: 'from-rose-500 to-pink-500',
      timeline: 'from-rose-500/20 to-pink-500/20',
      border: 'border-rose-500/30'
    },
    amber: { 
      bg: 'from-slate-950 via-amber-950 to-slate-900', 
      primary: 'from-amber-400 via-orange-400 to-amber-600', 
      accent: 'from-amber-500 to-orange-500',
      timeline: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30'
    }
  };
  
  return colorMap[name] || colorMap.blue;
}

function getGridLayoutByName(name: string) {
  const layoutMap: Record<string, any> = {
    'two-column': { gridCols: 'md:grid-cols-2', maxItems: 4 },
    'three-column': { gridCols: 'md:grid-cols-3', maxItems: 6 }
  };
  
  return layoutMap[name] || layoutMap['two-column'];
}

// Simple hash function to convert string to number
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Generate contextually relevant emojis for features based on text content
export function getFeatureEmoji(featureText: string): string {
  const lowerText = featureText.toLowerCase();
  
  // Map common feature keywords to relevant emojis
  const emojiMap: Record<string, string> = {
    // Performance & Speed
    'fast': '⚡', 'speed': '⚡', 'performance': '🚀', 'quick': '⚡', 'efficient': '⚡',
    'optimized': '⚡', 'turbo': '🚀', 'lightning': '⚡', 'rapid': '⚡',
    
    // Security & Safety
    'secure': '🔒', 'security': '🔒', 'safe': '🛡️', 'protected': '🛡️', 'encrypted': '🔐',
    'privacy': '🔒', 'guard': '🛡️', 'shield': '🛡️', 'lock': '🔒',
    
    // Innovation & Technology
    'innovative': '💡', 'innovation': '💡', 'technology': '🔬', 'tech': '🔬', 'advanced': '🚀',
    'cutting-edge': '🔬', 'modern': '✨', 'future': '🔮', 'ai': '🤖', 'artificial': '🤖',
    'machine learning': '🧠', 'ml': '🧠', 'automation': '⚙️', 'smart': '🧠',
    
    // Quality & Excellence
    'quality': '⭐', 'excellent': '⭐', 'premium': '💎', 'best': '🏆', 'top': '🏆',
    'award': '🏆', 'certified': '✅', 'verified': '✅', 'trusted': '🤝',
    
    // User Experience
    'user-friendly': '😊', 'intuitive': '🎯', 'easy': '😊', 'simple': '🎯', 'smooth': '✨',
    'seamless': '✨', 'enjoyable': '😊', 'pleasant': '😊', 'comfortable': '😌',
    
    // Support & Service
    'support': '🆘', 'help': '🆘', 'assistance': '🤝', 'service': '🛎️', 'customer': '👥',
    '24/7': '🕐', 'always': '🕐', 'available': '✅', 'responsive': '📱',
    
    // Community & Social
    'community': '👥', 'social': '🌐', 'network': '🌐', 'collaboration': '🤝', 'team': '👥',
    'partnership': '🤝', 'connect': '🔗', 'share': '📤', 'together': '👥',
    
    // Data & Analytics
    'data': '📊', 'analytics': '📈', 'insights': '🔍', 'metrics': '📊', 'statistics': '📊',
    'report': '📋', 'dashboard': '📊', 'monitoring': '👁️', 'tracking': '📍',
    
    // Mobile & Accessibility
    'mobile': '📱', 'responsive': '📱', 'accessibility': '♿', 'universal': '🌍', 'cross-platform': '🔄',
    'anywhere': '🌍', 'remote': '🏠', 'cloud': '☁️', 'online': '🌐',
    
    // Business & Enterprise
    'business': '💼', 'enterprise': '🏢', 'professional': '👔', 'corporate': '🏢', 'scalable': '📈',
    'growth': '📈', 'expansion': '🚀', 'scale': '📈', 'enterprise': '🏢',
    
    // Creative & Design
    'creative': '🎨', 'design': '🎨', 'beautiful': '✨', 'aesthetic': '🎨', 'visual': '👁️',
    'artistic': '🎨', 'stunning': '✨', 'elegant': '✨', 'stylish': '💅',
    
    // Education & Learning
    'education': '📚', 'learning': '📖', 'knowledge': '🧠', 'training': '🎓', 'tutorial': '📖',
    'guide': '🗺️', 'help': '🆘', 'teach': '👨‍🏫', 'learn': '📖',
    
    // Health & Wellness
    'health': '🏥', 'wellness': '💚', 'fitness': '💪', 'medical': '🏥', 'care': '💚',
    'healing': '💚', 'recovery': '🔄', 'vitality': '💚', 'strength': '💪',
    
    // Finance & Money
    'finance': '💰', 'money': '💵', 'investment': '📈', 'savings': '🏦', 'budget': '📊',
    'financial': '💰', 'economic': '📊', 'profit': '📈', 'wealth': '💎',
    
    // Food & Restaurant
    'food': '🍕', 'restaurant': '🍽️', 'delivery': '🚚', 'fresh': '🥬', 'taste': '👅',
    'cooking': '👨‍🍳', 'recipe': '📖', 'ingredients': '🥬', 'delicious': '😋',
    
    // Travel & Transportation
    'travel': '✈️', 'transport': '🚗', 'journey': '🗺️', 'adventure': '🏔️', 'explore': '🔍',
    'destination': '📍', 'vacation': '🏖️', 'trip': '🎒', 'flight': '✈️',
    
    // Entertainment & Media
    'entertainment': '🎬', 'media': '📺', 'video': '🎥', 'music': '🎵', 'game': '🎮',
    'fun': '😄', 'enjoy': '😊', 'amusement': '🎪', 'leisure': '⛱️'
  };
  
  // Check for exact matches first
  for (const [keyword, emoji] of Object.entries(emojiMap)) {
    if (lowerText.includes(keyword)) {
      return emoji;
    }
  }
  
  // If no exact match, use hash-based fallback for variety
  const hash = simpleHash(featureText);
  const fallbackEmojis = ['✨', '🚀', '💡', '⭐', '🎯', '🔧', '📱', '🌐', '💎', '🏆'];
  return fallbackEmojis[hash % fallbackEmojis.length];
}
