import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Briefcase, Calendar, MapPin, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { EDUCATION_DATA, EXPERIENCE_DATA, TESTIMONIALS_DATA } from "../data";

export default function About() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-indigo-400">01 / Biography & Career</p>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#fafafa] mt-1">Foundations & Milestones</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-cyan-500 mt-4 rounded-full mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Education Timeline */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-xl font-display font-bold text-zinc-100 flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-indigo-400" /> Academic Journey
            </h3>
            
            <div className="relative pl-6 border-l border-[#27272a] space-y-10">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx} className="relative">
                  {/* Bullet */}
                  <span className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#09090b] border-2 border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                  
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded-md border border-indigo-900/30">
                      <Calendar className="w-3 h-3" /> {edu.period}
                    </span>
                    <h4 className="text-lg font-display font-bold text-zinc-200">{edu.institution}</h4>
                    <p className="text-sm text-zinc-300 font-sans">{edu.degree}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">{edu.details}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
                      <MapPin className="w-3 h-3" /> {edu.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional / Research Experience Timeline */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-xl font-display font-bold text-zinc-100 flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-cyan-400" /> Research & Labs
            </h3>

            <div className="relative pl-6 border-l border-[#27272a] space-y-10">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <div key={idx} className="relative">
                  {/* Bullet */}
                  <span className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#09090b] border-2 border-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-900/30">
                      <Calendar className="w-3 h-3" /> {exp.period}
                    </span>
                    <h4 className="text-lg font-display font-bold text-zinc-200">{exp.role}</h4>
                    <p className="text-sm text-zinc-300 font-sans">{exp.organization}</p>
                    
                    <ul className="space-y-1.5 pl-3 list-disc text-xs text-zinc-400 leading-relaxed font-sans">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Slider Area (Explicit User Request) */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-xl">
            {/* Corner Quote Icon Accent */}
            <Quote className="absolute -top-4 -right-4 w-32 h-32 text-zinc-800/10 rotate-12 pointer-events-none" />

            <div className="text-center mb-6">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">Endorsements</p>
              <h3 className="text-lg font-display font-bold text-zinc-200">Academic & Industry Testimonials</h3>
            </div>

            <div className="relative min-h-[160px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 text-center"
                >
                  <p className="text-sm md:text-base text-zinc-300 leading-relaxed italic max-w-2xl mx-auto font-sans">
                    "{TESTIMONIALS_DATA[activeTestimonial].content}"
                  </p>
                  <div>
                    <h4 className="font-display font-bold text-indigo-400 text-sm">{TESTIMONIALS_DATA[activeTestimonial].name}</h4>
                    <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                      {TESTIMONIALS_DATA[activeTestimonial].role} — {TESTIMONIALS_DATA[activeTestimonial].organization}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Switch Toggles */}
            <div className="flex items-center justify-between mt-8 border-t border-[#27272a] pt-6">
              <div className="flex gap-1.5">
                {TESTIMONIALS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                      idx === activeTestimonial ? "bg-indigo-500 w-6" : "bg-zinc-800 hover:bg-zinc-750"
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 bg-[#09090b] border border-[#27272a] text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 rounded-lg transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 bg-[#09090b] border border-[#27272a] text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 rounded-lg transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
