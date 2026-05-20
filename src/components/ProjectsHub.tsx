import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FolderGit2, Calendar, Plus, PlusCircle, CheckCircle, Sparkles, ExternalLink, Filter, Tags, X, Check } from "lucide-react";
import { Project } from "../types";
import { PROJECTS_DATA } from "../data";

export default function ProjectsHub() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<"all" | "research" | "applied" | "vision">("all");
  const [isAdding, setIsAdding] = useState(false);

  // Form states for new project
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCat, setNewCat] = useState<"research" | "applied" | "vision">("applied");
  const [newTags, setNewTags] = useState("");
  const [newContributions, setNewContributions] = useState("");
  const [metricLabel1, setMetricLabel1] = useState("");
  const [metricVal1, setMetricVal1] = useState("");
  const [metricLabel2, setMetricLabel2] = useState("");
  const [metricVal2, setMetricVal2] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("surya_custom_projects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProjects([...PROJECTS_DATA, ...parsed]);
        return;
      } catch (e) {
        // Fallback
      }
    }
    setProjects(PROJECTS_DATA);
  }, []);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSubtitle || !newDesc) return;

    const tagsArray = newTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    const contributionsArray = newContributions
      .split("\n")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const metricsArray = [];
    if (metricLabel1 && metricVal1) {
      metricsArray.push({ label: metricLabel1, value: metricVal1 });
    }
    if (metricLabel2 && metricVal2) {
      metricsArray.push({ label: metricLabel2, value: metricVal2 });
    }

    const newProj: Project = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      subtitle: newSubtitle,
      description: newDesc,
      contributions: contributionsArray.length > 0 ? contributionsArray : ["Initial setup of quantitative training graphs."],
      tags: tagsArray.length > 0 ? tagsArray : ["Python", "PyTorch"],
      metrics: metricsArray.length > 0 ? metricsArray : [{ label: "Accuracy", value: "95.2%" }],
      category: newCat,
    };

    const saved = localStorage.getItem("surya_custom_projects");
    let updatedCustom = [];
    if (saved) {
      try {
        updatedCustom = JSON.parse(saved);
      } catch (e) {}
    }
    updatedCustom.push(newProj);
    localStorage.setItem("surya_custom_projects", JSON.stringify(updatedCustom));

    setProjects([...PROJECTS_DATA, ...updatedCustom]);

    // Reset forms
    setNewTitle("");
    setNewSubtitle("");
    setNewDesc("");
    setNewTags("");
    setNewContributions("");
    setMetricLabel1("");
    setMetricVal1("");
    setMetricLabel2("");
    setMetricVal2("");
    setIsAdding(false);
  };

  const handleResetCustom = () => {
    if (window.confirm("Are you sure you want to reset custom projects?")) {
      localStorage.removeItem("surya_custom_projects");
      setProjects(PROJECTS_DATA);
    }
  };

  const filteredProjects = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#818cf8]">03 / Case Logs</p>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#fafafa] mt-1">Research & Projects</h2>
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-cyan-500 mt-4 rounded-full" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold px-4.5 py-2.5 rounded-xl text-xs hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-lg shadow-indigo-500/10"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log New Project</span>
            </button>
            {projects.length > PROJECTS_DATA.length && (
              <button
                onClick={handleResetCustom}
                className="inline-flex items-center gap-2 bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-rose-400 hover:border-rose-500/30 px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
              >
                Reset Custom
              </button>
            )}
          </div>
        </div>

        {/* Filters and Search details */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 border-b border-[#27272a]/60 mb-10 scrollbar-none">
          <Filter className="w-4 h-4 text-zinc-500 mr-2 flex-shrink-0" />
          {(["all", "research", "applied", "vision"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider cursor-pointer transition-all border whitespace-nowrap ${
                filter === cat
                  ? "bg-indigo-950/40 border-indigo-500/50 text-indigo-400 font-bold"
                  : "bg-zinc-900/10 border-[#27272a]/40 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, pIdx) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Title Bar */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-400 bg-indigo-950/40 px-2.5 py-0.5 rounded border border-indigo-900/40">
                        {p.category}
                      </span>
                      <h3 className="text-xl font-display font-extrabold text-[#fafafa] mt-2 leading-tight">{p.title}</h3>
                      <p className="text-xs text-zinc-450 font-mono mt-1">{p.subtitle}</p>
                    </div>
                    <div className="p-3 bg-[#09090b] rounded-xl border border-[#27272a] text-indigo-400">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans mb-6">{p.description}</p>

                  {/* Contributions */}
                  <div className="mb-6 space-y-2">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Methodology & Execution:</p>
                    <ul className="space-y-2">
                      {p.contributions.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed font-sans">
                          <Check className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.tags.map((tg, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-zinc-400 bg-[#09090b]/40 border border-[#27272a] px-2 py-0.5 rounded-lg">
                        #{tg}
                      </span>
                    ))}
                  </div>

                  {/* Metrics Banner */}
                  <div className="grid grid-cols-3 gap-3 bg-[#09090b]/80 p-3.5 rounded-xl border border-[#27272a]">
                    {p.metrics.map((met, idx) => (
                      <div key={idx} className="text-center leading-none border-r border-[#27272a] last:border-0 pr-1">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-500 block font-sans truncate">{met.label}</span>
                        <span className="text-xs font-mono font-bold text-indigo-400 mt-1 block truncate">{met.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal form to log new project */}
        <AnimatePresence>
          {isAdding && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.61 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAdding(false)}
                className="absolute inset-0 bg-[#09090b]"
              />

              {/* Box Form */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#18181b] border border-[#27272a] w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-2xl overflow-y-auto relative z-10 flex flex-col p-6 shadow-2xl"
              >
                <div className="flex justify-between items-center pb-4 border-b border-[#27272a] mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                    <h3 className="font-display font-extrabold text-[#fafafa] text-lg">Log New Project Case Study</h3>
                  </div>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="p-1 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateProject} className="space-y-5 flex-1 overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-400 uppercase">Project Title*</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Timeseries Forecasting Hub"
                        className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-650"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-400 uppercase">Role / Subtitle*</label>
                      <input
                        type="text"
                        required
                        value={newSubtitle}
                        onChange={(e) => setNewSubtitle(e.target.value)}
                        placeholder="e.g. Solo Developer / PyTorch implementer"
                        className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-650"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-400 uppercase">Domain Category</label>
                      <select
                        value={newCat}
                        onChange={(e) => setNewCat(e.target.value as any)}
                        className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:outline-none"
                      >
                        <option value="research">Research Paper Case</option>
                        <option value="applied">Applied AI Pipeline</option>
                        <option value="vision">Computer Vision & Segment</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-400 uppercase">Tags (Comma Separated)</label>
                      <input
                        type="text"
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                        placeholder="PyTorch, CNN, LLM"
                        className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-650"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Brief Abstract*</label>
                    <textarea
                      required
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      rows={3}
                      placeholder="Discuss the challenge, mathematical modeling, and baseline comparisons..."
                      className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-650 resize-none font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Key Contributions (One bullet per line)</label>
                    <textarea
                      value={newContributions}
                      onChange={(e) => setNewContributions(e.target.value)}
                      rows={3}
                      placeholder="Benchmarked five regression baselines.&#10;Reduced latency by 45%.&#10;Deployed models into secure enterprise endpoints."
                      className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-650 resize-none font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-mono text-zinc-400 uppercase">Key Statistics / Metrics (Up to 2)</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={metricLabel1}
                          onChange={(e) => setMetricLabel1(e.target.value)}
                          placeholder="Label (e.g. Accuracy)"
                          className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={metricVal1}
                          onChange={(e) => setMetricVal1(e.target.value)}
                          placeholder="Value (e.g. 98.4%)"
                          className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <input
                          type="text"
                          value={metricLabel2}
                          onChange={(e) => setMetricLabel2(e.target.value)}
                          placeholder="Label (e.g. Latency)"
                          className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={metricVal2}
                          onChange={(e) => setMetricVal2(e.target.value)}
                          placeholder="Value (e.g. 1.5 ms)"
                          className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#27272a] flex justify-end gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-5 py-2.5 rounded-xl border border-[#27272a] text-zinc-400 text-xs hover:text-[#fafafa] hover:bg-zinc-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold px-6 py-2.5 rounded-xl text-xs hover:scale-102 active:scale-98 cursor-pointer shadow"
                    >
                      Add Project Log
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
