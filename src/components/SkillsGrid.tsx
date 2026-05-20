import React from "react";
import { motion } from "motion/react";
import { BrainCircuit, Wrench, Binary, Star } from "lucide-react";
import { SKILLS_DATA } from "../data";

export default function SkillsGrid() {
  const getIcon = (category: string) => {
    if (category.toLowerCase().includes("research") || category.toLowerCase().includes("learning")) {
      return <BrainCircuit className="w-5 h-5 text-indigo-400" />;
    }
    if (category.toLowerCase().includes("languages") || category.toLowerCase().includes("math")) {
      return <Binary className="w-5 h-5 text-cyan-400" />;
    }
    return <Wrench className="w-5 h-5 text-violet-400" />;
  };

  return (
    <section id="skills" className="py-20 bg-[#09090b]/45 border-y border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-[#818cf8]">02 / Competence Map</p>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#fafafa] mt-1">Skills & Subject Matter</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-cyan-500 mt-4 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS_DATA.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className="bg-[#18181b] border border-[#27272a] rounded-3xl p-6 backdrop-blur-sm shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Group Title */}
                <div className="flex items-center gap-3 pb-5 border-b border-[#27272a]/80 mb-6">
                  {getIcon(group.category)}
                  <h3 className="font-display font-bold text-zinc-150 text-sm md:text-base">{group.category}</h3>
                </div>

                {/* Skill List */}
                <div className="space-y-5">
                  {group.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-350 font-semibold flex items-center gap-1.5">
                          {skill.level >= 90 && <Star className="w-3 h-3 text-indigo-400 fill-indigo-400" />}
                          {skill.name}
                        </span>
                        <span className="text-zinc-500">{skill.level}%</span>
                      </div>
                      
                      {/* Gauge Base bar */}
                      <div className="h-2 bg-[#09090b] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIdx * 0.1 }}
                          className="h-full bg-gradient-to-r from-indigo-500 via-indigo-500 to-cyan-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Console Frame */}
              <div className="mt-8 font-mono text-[9px] text-zinc-500 flex justify-between items-center bg-[#09090b]/60 p-2 rounded-lg border border-[#27272a]/60 font-medium">
                <span>GRP: 0{groupIdx + 1}</span>
                <span>STATUS: COMPILED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
