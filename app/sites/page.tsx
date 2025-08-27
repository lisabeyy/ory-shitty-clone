'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Site {
  slug: string;
  templateId: string;
  props: any;
  title?: string;
  icon?: string;
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('all');

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await fetch('/api/sites');
      if (res.ok) {
        const data = await res.json();
        setSites(data);
      }
    } catch (error) {
      console.error('Failed to fetch sites:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique template types
  const templateTypes = ['all', ...Array.from(new Set(sites.map(site => site.templateId)))];

  // Filter sites based on search and template
  const filteredSites = sites.filter(site => {
    const matchesSearch = searchTerm === '' ||
      site.props?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.props?.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTemplate = selectedTemplate === 'all' || site.templateId === selectedTemplate;

    return matchesSearch && matchesTemplate;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🚀</div>
          <p className="text-white text-xl">Loading amazing websites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur border-b border-white/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">
                ← Back to Generator
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">🌐 Generated Websites</h1>
              <p className="text-white/60 text-sm mt-1">
                {sites.length} amazing sites created by our community
              </p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search websites by title, subtitle, or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40">
              🔍
            </div>
          </div>

          {/* Template Filter */}
          <div className="flex flex-wrap gap-3">
            {templateTypes.map((template) => (
              <button
                key={template}
                onClick={() => setSelectedTemplate(template)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${selectedTemplate === template
                    ? 'bg-white/20 text-white border border-white/40'
                    : 'bg-white/10 text-white/60 hover:bg-white/20 border border-white/20'
                  }`}
              >
                {template === 'all' ? 'All Templates' : template}
                {template !== 'all' && (
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {sites.filter(s => s.templateId === template).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className="text-white/60">
              Showing {filteredSites.length} of {sites.length} websites
            </p>
          </div>
        </div>
      </div>

      {/* Sites Grid */}
      <div className="container mx-auto px-6 pb-20">
        {filteredSites.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-white mb-2">No websites found</h3>
            <p className="text-white/60 mb-6">
              Try adjusting your search terms or template filter
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Create Your First Website
            </Link>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSites.map((site) => (
                <Link
                  key={site.slug}
                  href={`/website/${site.slug}`}
                  className="group relative bg-white/5 backdrop-blur border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/40"
                >
                  {/* Template Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs text-white/60 border border-white/20">
                      {site.templateId}
                    </span>
                  </div>

                  {/* Site Content */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-2xl">{site.icon || "✨"}</div>
                      <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors duration-300 line-clamp-2">
                        {site.title || site.props?.title || site.slug}
                      </h3>
                    </div>
                    
                    {site.props?.subtitle && (
                      <p className="text-white/70 text-sm line-clamp-3">
                        {site.props.subtitle}
                      </p>
                    )}

                    {/* Template-specific info */}
                    {site.templateId === 'memeCoin' && site.props?.ticker && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-white/40">Ticker:</span>
                        <span className="text-emerald-400 font-bold">{site.props.ticker}</span>
                      </div>
                    )}

                    {site.templateId === 'appLanding' && site.props?.badges && (
                      <div className="flex flex-wrap gap-2">
                        {site.props.badges.slice(0, 3).map((badge: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/60">
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* View Button */}
                    <div className="pt-2">
                      <div className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">
                        View site →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
