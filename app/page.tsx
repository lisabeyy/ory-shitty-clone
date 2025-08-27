'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('Create a landing page for a playful meme coin called ORY');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string| null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true); setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      window.location.href = `/website/${json.slug}`;
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">Prompt → Site Generator</h1>
      <p className="text-white/70 mb-6">Generate a site from a natural-language prompt. Outputs a static React/Tailwind template at a unique slug.</p>
      <form onSubmit={onSubmit} className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-4">
        <textarea
          className="w-full h-32 bg-black/30 rounded-xl p-3 outline-none border border-white/10"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <button disabled={creating} className="px-6 py-3 rounded-xl font-semibold bg-indigo-600/90 hover:bg-indigo-600 disabled:opacity-50">
          {creating ? 'Generating…' : 'Generate'}
        </button>
        {error && <div className="text-rose-400">{error}</div>}
      </form>
      <div className="mt-8 text-white/60 text-sm">
        <p>Tip: try prompts like <em>"Create a minimalist docs page for a privacy-first wallet"</em> or <em>"Bright landing for a playful meme coin called ORY with $ORY ticker"</em>.</p>
      </div>
    </div>
  );
}
