import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { BookOpen, Search, Calendar, Clock, Sparkles, Plus, X, Eye, Edit2, Play, Hash, ArrowLeft } from "lucide-react";
import { BlogPost } from "../types";
import { BLOGS_DATA } from "../data";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  
  // Custom blog creation states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"ai" | "engineering" | "research">("ai");
  const [tags, setTags] = useState("");
  const [editTab, setEditTab] = useState<"write" | "preview">("write");

  useEffect(() => {
    const saved = localStorage.getItem("surya_custom_blogs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBlogs([...BLOGS_DATA, ...parsed]);
        return;
      } catch (e) {
        // Fallback
      }
    }
    setBlogs(BLOGS_DATA);
  }, []);

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !excerpt) return;

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const calcReadTime = `${Math.max(1, Math.round(content.split(" ").length / 200))} min read`;

    const newPost: BlogPost = {
      id: `custom-blog-${Date.now()}`,
      title,
      excerpt,
      content,
      date: new Date().toISOString().split("T")[0],
      readTime: calcReadTime,
      author: "Surya Prakash",
      tags: tagsArray.length > 0 ? tagsArray : ["Research", "ML"],
      category,
    };

    const saved = localStorage.getItem("surya_custom_blogs");
    let updatedBlogs = [];
    if (saved) {
      try {
        updatedBlogs = JSON.parse(saved);
      } catch (e) {}
    }
    updatedBlogs.push(newPost);
    localStorage.setItem("surya_custom_blogs", JSON.stringify(updatedBlogs));

    setBlogs([...BLOGS_DATA, ...updatedBlogs]);
    
    // Reset inputs
    setTitle("");
    setExcerpt("");
    setContent("");
    setTags("");
    setIsWriting(false);
    setActiveBlog(newPost); // Instantly open the newly published blog!
  };

  const handleResetBlogs = () => {
    if (window.confirm("Are you sure you want to reset custom blog posts?")) {
      localStorage.removeItem("surya_custom_blogs");
      setBlogs(BLOGS_DATA);
    }
  };

  const searchedBlogs = blogs.filter((b) => {
    const term = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(term) ||
      b.excerpt.toLowerCase().includes(term) ||
      b.tags.some((t) => t.toLowerCase().includes(term))
    );
  });

  return (
    <section id="blog" className="py-20 bg-[#09090b]/45 border-t border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <AnimatePresence mode="wait">
          {!activeBlog ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Blog list header row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#818cf8]">04 / Knowledge Base</p>
                  <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#fafafa] mt-1">AI Logs & Publication Blog</h2>
                  <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-cyan-500 mt-4 rounded-full" />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsWriting(true)}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold px-4.5 py-2.5 rounded-xl text-xs hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-lg shadow-indigo-500/10"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Write Markdown Article</span>
                  </button>
                  {blogs.length > BLOGS_DATA.length && (
                    <button
                      onClick={handleResetBlogs}
                      className="inline-flex items-center gap-2 bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-rose-400 hover:border-rose-500/30 px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      Reset Custom Blogs
                    </button>
                  )}
                </div>
              </div>

              {/* Searching index filters */}
              <div className="relative max-w-md mb-10">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Query tags, titles or abstracts..."
                  className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-11 py-3 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 placeholder:text-zinc-500"
                />
              </div>

              {/* Blogs Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {searchedBlogs.map((b) => (
                  <article
                    key={b.id}
                    onClick={() => setActiveBlog(b)}
                    className="bg-[#18181b] border border-[#27272a] rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-[#818cf8]/40 transition-all cursor-pointer group"
                  >
                    <div>
                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-4 pb-4 border-b border-[#27272a]/80">
                        <span className="flex items-center gap-1.5 text-indigo-400 font-semibold bg-indigo-950/20 px-2.5 py-1 rounded border border-indigo-900/20">
                          {b.category.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {b.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {b.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-extrabold text-[#fafafa] leading-tight group-hover:text-indigo-400 transition-colors">
                        {b.title}
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-400 mt-3.5 leading-relaxed font-sans line-clamp-3">
                        {b.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-[#27272a]/60 flex items-center justify-between">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {b.tags.slice(0, 3).map((tg, idx) => (
                          <span key={idx} className="text-[9px] font-mono text-zinc-500 bg-[#09090b]/30 px-2 py-0.5 rounded border border-[#27272a]">
                            #{tg}
                          </span>
                        ))}
                      </div>
                      
                      <span className="text-xs font-mono font-bold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                        Read Logs <Clock className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                ))}

                {searchedBlogs.length === 0 && (
                  <div className="col-span-1 md:col-span-2 text-center p-12 bg-zinc-900/10 border border-dashed border-[#27272a] rounded-2xl">
                    <p className="text-sm text-zinc-400 font-sans">No matching research logs found. Write one using the editor!</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Active Blog Detailed Reader View */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              {/* Back actions */}
              <button
                onClick={() => setActiveBlog(null)}
                className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 hover:text-white mb-8 group bg-[#18181b] border border-[#27272a] px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Return to Feed</span>
              </button>

              <article className="space-y-8">
                {/* Header details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                    <span className="text-indigo-400 font-semibold bg-indigo-950/40 px-2.5 py-1 rounded border border-indigo-900/30">
                      {activeBlog.category.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activeBlog.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {activeBlog.readTime}</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-display font-extrabold text-[#fafafa] tracking-tight leading-tight">
                    {activeBlog.title}
                  </h1>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans italic border-l-2 border-indigo-500 pl-4">
                    {activeBlog.excerpt}
                  </p>
                </div>

                {/* Rendered markdown content block inside specialized div class for index.css overrides */}
                <div className="markdown-body border-t border-b border-[#27272a]/80 py-10">
                  <ReactMarkdown>{activeBlog.content}</ReactMarkdown>
                </div>

                {/* Author information block */}
                <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6.5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-display font-bold text-lg">
                      SP
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-zinc-200 text-sm">{activeBlog.author}</h4>
                      <p className="text-[11px] text-zinc-400 font-mono mt-0.5">Author • M.Sc. Artificial Intelligence</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeBlog.tags.map((tg, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-zinc-450 bg-[#09090b] border border-[#27272a] px-2.5 py-1 rounded-lg">
                        #{tg}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Editor to Write Markdown Article */}
        <AnimatePresence>
          {isWriting && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.61 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsWriting(false)}
                className="absolute inset-0 bg-[#09090b]"
              />

              {/* Composition Workspace Box */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#18181b] border border-[#27272a] w-full max-w-4xl h-[92vh] rounded-2xl overflow-hidden relative z-10 flex flex-col shadow-2xl"
              >
                {/* Top Action Ribbon */}
                <div className="flex justify-between items-center px-6 py-4.5 border-b border-[#27272a] bg-[#09090b]/40">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-400 animate-pulse" />
                    <h3 className="font-display font-extrabold text-[#fafafa] text-base">Write Advanced Markdown Post</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-[#09090b] border border-[#27272a] p-1 rounded-lg flex gap-1">
                      <button
                        type="button"
                        onClick={() => setEditTab("write")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold cursor-pointer transition-colors ${
                          editTab === "write" ? "bg-zinc-800 text-indigo-400" : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Editor
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditTab("preview")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold cursor-pointer transition-colors ${
                          editTab === "preview" ? "bg-zinc-800 text-indigo-400" : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" /> Raw Preview
                      </button>
                    </div>
                    <button
                      onClick={() => setIsWriting(false)}
                      className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-zinc-850 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleCreateBlog} className="flex-1 overflow-hidden flex flex-col">
                  {/* Split editor / configs workspace */}
                  <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
                    
                    {/* Input Config Form Rail */}
                    <div className="lg:col-span-4 border-r border-[#27272a] p-6 space-y-5 overflow-y-auto bg-[#09090b]/20">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-zinc-400 uppercase">Article Title*</label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g. Transformers in Medicine"
                          className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-650 font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-zinc-400 uppercase">Abstract Excerpt*</label>
                        <textarea
                          required
                          value={excerpt}
                          onChange={(e) => setExcerpt(e.target.value)}
                          rows={3}
                          placeholder="Brief diagnostic or structural summary..."
                          className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-655 resize-none font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-zinc-400 uppercase">Category</label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as any)}
                            className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:outline-none font-mono"
                          >
                            <option value="ai">AI Engineering</option>
                            <option value="research">Science Research</option>
                            <option value="engineering">MLOps Infrastructure</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-zinc-400 uppercase">Tags (comma split)</label>
                          <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="PyTorch, Calibration"
                            className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-655 font-mono"
                          />
                        </div>
                      </div>

                      {/* Cheat sheet helper */}
                      <div className="p-4 bg-[#09090b]/80 border border-[#27272a] rounded-xl text-[10.5px] leading-relaxed font-mono text-zinc-500 space-y-1.5">
                        <p className="text-indigo-400 font-bold uppercase mb-1 font-sans">Markdown Syntax Cheat:</p>
                        <p><code className="text-zinc-300">## Title</code> : Second Header</p>
                        <p><code className="text-zinc-300">**text**</code> : Bold emphasis</p>
                        <p><code className="text-zinc-300">~~strike~~</code> : Strikethrough</p>
                        <p><code className="text-zinc-300">[Anchor](url)</code> : URL tags</p>
                        <p><code className="text-zinc-300">\`\`\`python ... \`\`\`</code> : Code scopes</p>
                      </div>
                    </div>

                    {/* Editor / Live Preview Display Panel */}
                    <div className="lg:col-span-8 h-full overflow-hidden flex flex-col bg-[#09090b]/40">
                      {editTab === "write" ? (
                        <textarea
                          required
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="## Write your Markdown content here using headers, lists, and python blocks..."
                          className="flex-1 w-full h-full bg-transparent border-0 text-[#fafafa] font-mono text-xs md:text-sm p-6 focus:outline-none resize-none overflow-y-auto leading-relaxed"
                        />
                      ) : (
                        <div className="flex-1 p-6 overflow-y-auto bg-[#09090b] selection:bg-indigo-500 text-[#fafafa]">
                          {content.trim() === "" ? (
                            <p className="text-xs text-zinc-500 font-mono italic">Preview outline remains empty. Type inside the Editor tab.</p>
                          ) : (
                            <div className="markdown-body">
                              <ReactMarkdown>{content}</ReactMarkdown>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Submission Bottom Bar */}
                  <div className="px-6 py-4.5 border-t border-[#27272a] flex justify-end gap-3 bg-[#09090b]/50">
                    <button
                      type="button"
                      onClick={() => setIsWriting(false)}
                      className="px-5 py-2.5 rounded-xl border border-[#27272a] text-zinc-400 text-xs hover:text-[#fafafa] hover:bg-zinc-800 cursor-pointer"
                    >
                      Dismiss Editing
                    </button>
                    <button
                      type="submit"
                      disabled={!title || !content || !excerpt}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold px-6 py-2.5 rounded-xl text-xs hover:scale-102 active:scale-98 disabled:opacity-40 cursor-pointer transition-all shadow"
                    >
                      Publish Post Log
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
