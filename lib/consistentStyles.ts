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

export function getConsistentGridLayout(identifier: string) {
  // Use the identifier to generate a consistent grid layout
  const hash = simpleHash(identifier);
  const useThreeColumns = (hash % 2) === 0; // Even hash = 3 columns, odd hash = 2 columns
  
  return {
    useThreeColumns,
    gridCols: useThreeColumns ? 'md:grid-cols-3' : 'md:grid-cols-2',
    maxItems: useThreeColumns ? 6 : 4 // Ensure even numbers
  };
}

export function getConsistentColorScheme(identifier: string) {
  // Use the identifier to generate a consistent color scheme for LandingTemplate
  const hash = simpleHash(identifier);
  const schemes = ['cool', 'degen', 'cyberpunk', 'trendy', 'sport'];
  return schemes[hash % schemes.length];
}

// Generate random style parameters that get stored in the database
export function generateRandomStyleParams() {
  const colorSchemes = [
    { bg: 'from-slate-950 via-blue-950 to-slate-900', primary: 'from-blue-400 via-cyan-400 to-blue-600', accent: 'from-blue-500 to-cyan-500', name: 'blue' },
    { bg: 'from-slate-950 via-purple-950 to-slate-900', primary: 'from-purple-400 via-pink-400 to-purple-600', accent: 'from-purple-500 to-pink-500', name: 'purple' },
    { bg: 'from-slate-950 via-emerald-950 to-slate-900', primary: 'from-emerald-400 via-teal-400 to-emerald-600', accent: 'from-emerald-500 to-teal-500', name: 'emerald' },
    { bg: 'from-slate-950 via-indigo-950 to-slate-900', primary: 'from-indigo-400 via-blue-400 to-indigo-600', accent: 'from-indigo-500 to-blue-500', name: 'indigo' },
    { bg: 'from-slate-950 via-rose-950 to-slate-900', primary: 'from-rose-400 via-pink-400 to-rose-600', accent: 'from-rose-500 to-pink-500', name: 'rose' },
    { bg: 'from-slate-950 via-amber-950 to-slate-900', primary: 'from-amber-400 via-orange-400 to-amber-600', accent: 'from-amber-500 to-orange-500', name: 'amber' }
  ];
  
  const gridLayouts = [
    { cols: 'md:grid-cols-2', maxItems: 4, name: 'two-column' },
    { cols: 'md:grid-cols-3', maxItems: 6, name: 'three-column' }
  ];
  
  const randomColorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  const randomGridLayout = gridLayouts[Math.floor(Math.random() * gridLayouts.length)];
  
  return {
    colorScheme: randomColorScheme.name,
    gridLayout: randomGridLayout.name,
    accentColor: randomColorScheme.accent
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
      gridLayout: getConsistentGridLayout(fallbackIdentifier)
    };
  }
}

function getColorsByName(name: string) {
  const colorMap: Record<string, any> = {
    blue: { bg: 'from-slate-950 via-blue-950 to-slate-900', primary: 'from-blue-400 via-cyan-400 to-blue-600', accent: 'from-blue-500 to-cyan-500' },
    purple: { bg: 'from-slate-950 via-purple-950 to-slate-900', primary: 'from-purple-400 via-pink-400 to-purple-600', accent: 'from-purple-500 to-pink-500' },
    emerald: { bg: 'from-slate-950 via-emerald-950 to-slate-900', primary: 'from-emerald-400 via-teal-400 to-emerald-600', accent: 'from-emerald-500 to-teal-500' },
    indigo: { bg: 'from-slate-950 via-indigo-950 to-slate-900', primary: 'from-indigo-400 via-blue-400 to-indigo-600', accent: 'from-indigo-500 to-blue-500' },
    rose: { bg: 'from-slate-950 via-rose-950 to-slate-900', primary: 'from-rose-400 via-pink-400 to-rose-600', accent: 'from-rose-500 to-pink-500' },
    amber: { bg: 'from-slate-950 via-amber-950 to-slate-900', primary: 'from-amber-400 via-orange-400 to-amber-600', accent: 'from-amber-500 to-orange-500' }
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
