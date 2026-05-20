import React from "react";
import { motion } from "motion/react";
import { Sparkles, Terminal, FileText, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO } from "../data";

export default function Hero() {
  const triggerAIChat = () => {
    // Programmatically open the AI Twin Chat drawer by clicking its launcher
    const launcher = document.getElementById("ai-twin-launcher");
    if (launcher) {
      launcher.click();
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4">
      {/* Visual Tech Background Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,211,238,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Typographical Frame */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#18181b]/90 border border-[#27272a] rounded-full px-4 py-1.5 text-xs text-indigo-400 font-mono scale-95 md:scale-100"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>M.Sc. AI Student @ CentraleSupélec</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </motion.div>
 
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-[#fafafa] leading-tight"
            >
              Surya <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Prakash</span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-2xl font-sans font-medium text-zinc-300 max-w-2xl"
            >
              Specializing in <span className="text-indigo-400 font-mono">Time-Series Forecasting</span>, Calibration, and Deep Learning Pipelines
            </motion.h2>
          </div>
 
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans"
          >
            {PERSONAL_INFO.summary}
          </motion.p>
 
          {/* Interactive Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={triggerAIChat}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-2.5 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Consort AI Twin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#projects"
              className="w-full sm:w-auto bg-[#18181b]/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-[#27272a] font-display font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Explore Research</span>
            </a>
          </motion.div>
 
          {/* Social Network Ribbons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center lg:justify-start gap-6 text-zinc-500 pt-4"
          >
            <a
              href={`https://${PERSONAL_INFO.github}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-400 transition-colors cursor-pointer"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={`https://${PERSONAL_INFO.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-400 transition-colors cursor-pointer"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
              title="Send Mail"
            >
              <Mail className="w-5 h-5" />
            </a>
            <span className="text-xs font-mono text-zinc-600">Paris, France (UTC+1)</span>
          </motion.div>
        </div>
 
        {/* Dynamic Image Container Box */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative group select-none"
          >
            {/* Holographic Glowing Frames */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-55 transition duration-1000 group-hover:duration-200 animate-tilt" />
            
            {/* Main Picture Frame */}
            <div className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border border-[#27272a] bg-[#18181b] shadow-2xl">
              {/* High precision tech elements inside picture border */}
              <div className="absolute top-2 left-2 z-20 font-mono text-[9px] text-indigo-400 bg-[#09090b]/80 border border-[#27272a] rounded px-1.5 py-0.5">
                AI_SYS.EXE [LOADED]
              </div>
              <div className="absolute bottom-2 right-2 z-20 font-mono text-[9px] text-cyan-400 bg-[#09090b]/80 border border-[#27272a] rounded px-1.5 py-0.5">
                © Surya Prakash
              </div>
 
              {/* The Profile Image - Points to surya-profile.jpg which he uploaded */}
              <img
                src="/surya-profile.jpg"
                alt="Surya Prakash Portrait"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  // Fallback beautiful styled initials vector if image isn't named surya-profile.jpg or has a loading glitch
                  (e.target as HTMLElement).style.display = 'none';
                  const container = document.getElementById('image-fallback');
                  if (container) container.style.display = 'flex';
                }}
              />
 
              {/* Dynamic Initialization Fallback Vector */}
              <div
                id="image-fallback"
                style={{ display: 'none' }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#09090b]/90 text-zinc-300 p-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-display font-black text-3xl mb-4">
                  SP
                </div>
                <h3 className="font-display font-bold">Surya Prakash</h3>
                <p className="text-xs text-zinc-500 mt-2 max-w-xs leading-normal">
                  Professional avatar image loaded. Rename your avatar to <code className="text-indigo-400">surya-profile.jpg</code> and drop it in the public folder to display your image.
                </p>
              </div>
 
              {/* Scanline light sweep */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent block pointer-events-none h-1/2 w-full animate-[pulse_3s_infinite]" />
            </div>
            
            {/* Stats Badge floating next to photo */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-[#09090b]/95 border border-[#27272a] p-3.5 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-mono text-sm font-bold">
                λ
              </div>
              <div className="leading-none">
                <span className="text-xs text-zinc-400 font-sans block">Evaluation ECE</span>
                <span className="text-sm font-mono font-bold text-white mt-1 block">3.4% [Scaled]</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
