/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsGrid from "./components/SkillsGrid";
import ProjectsHub from "./components/ProjectsHub";
import BlogSection from "./components/BlogSection";
import ContactForm from "./components/ContactForm";
import AITwinChat from "./components/AITwinChat";
import { Sparkles, Terminal, Activity, ChevronUp } from "lucide-react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Fixed Elegant Glass Navbar */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-md border-slate-900 py-3 md:py-4 shadow-xl"
            : "bg-transparent border-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo Brand Title */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-slate-950 font-mono font-bold text-sm shadow-md group-hover:scale-105 active:scale-95 transition-transform">
              S
            </div>
            <span className="font-display font-extrabold text-white text-base tracking-tight hover:text-cyan-400 transition-colors">
              SP<span className="text-cyan-400">.</span>AI
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors uppercase">01. Biography</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors uppercase">02. Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors uppercase">03. Case Logs</a>
            <a href="#blog" className="hover:text-cyan-400 transition-colors uppercase">04. Knowledge Base</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors uppercase">05. Contact</a>
          </nav>

          {/* Chat Twin Action Button */}
          <div>
            <button
              onClick={() => {
                const launcher = document.getElementById("ai-twin-launcher");
                if (launcher) launcher.click();
              }}
              className="inline-flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 text-cyan-400 px-3.5 py-1.5 rounded-xl font-mono text-xs hover:border-cyan-500/30 active:scale-98 transition-all cursor-pointer shadow-lg shadow-cyan-500/5"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>AI twin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="flex-1 pt-20">
        <Hero />
        <About />
        <SkillsGrid />
        <ProjectsHub />
        <BlogSection />
        <ContactForm />
      </main>

      {/* Floating Scroll to Top Floater */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-cyan-450 p-3.5 rounded-xl border border-slate-800 shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Scroll to Top"
        >
          <ChevronUp className="w-4.5 h-4.5" />
        </button>
      )}

      {/* Embedded Real-time AI Twin Chat (Invoked globally via floaters or buttons) */}
      <AITwinChat />

      {/* Simple, Humble, Clean Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900 text-xs text-slate-500 font-mono tracking-wider overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-4.5 h-4.5 text-cyan-500 animate-[pulse_2s_infinite]" />
            <span>AI ENGINE CONNECTED • GEMINI-3.5-FLASH</span>
          </div>
          <div className="text-center sm:text-right">
            <span>© {new Date().getFullYear()} Surya Prakash • All rights reserved. </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
