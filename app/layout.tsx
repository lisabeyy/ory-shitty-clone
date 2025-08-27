import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt → Site Generator",
  description: "Clone of ORYnth-style generator with cleaner templates",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
        <div className="container mx-auto px-6 py-10">{children}</div>
      </body>
    </html>
  );
}
