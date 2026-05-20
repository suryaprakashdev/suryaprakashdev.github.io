import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MapPin, Mail, Phone, CheckCircle, Sparkles, MessageSquare, Terminal, X, Trash2 } from "lucide-react";
import { ContactMessage } from "../types";
import { PERSONAL_INFO } from "../data";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("surya_guestbook_messages");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    const newMsg: ContactMessage = {
      id: `contact-${Date.now()}`,
      name,
      email,
      subject: subject || "No Subject",
      message,
      timestamp: new Date().toLocaleString(),
    };

    setTimeout(() => {
      const updated = [newMsg, ...messages];
      setMessages(updated);
      localStorage.setItem("surya_guestbook_messages", JSON.stringify(updated));

      // Automated AI Twin response
      const autoResponse = `Thank you so much for reaching out, ${name}! My AI Twin has logged your interest. I will review your contact details and get back to you soon. In the meantime, feel free to try my interactive AI Twin chatbot drawer at the bottom-right!`;
      setSuccessMsg(autoResponse);

      // Reset inputs
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleClearMessages = () => {
    if (window.confirm("Do you want to clear your local message history?")) {
      localStorage.removeItem("surya_guestbook_messages");
      setMessages([]);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#09090b] border-t border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-[#818cf8]">05 / Engagement</p>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#fafafa] mt-1">Contact & Guestbook</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-cyan-500 mt-4 rounded-full mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details & Info Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#18181b] border border-[#27272a] rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
              <h3 className="font-display font-bold text-[#fafafa] text-lg mb-6">Reach Out Directly</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 block">Personal Email</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-sans font-medium text-zinc-200 hover:text-[#818cf8] transition-all">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 block">Mobile Call / Telegram</span>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm font-sans font-medium text-zinc-200 hover:text-cyan-400 transition-all">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 block">Current Location</span>
                    <span className="text-sm font-sans font-medium text-zinc-200 block">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Shell Terminal Frame */}
            <div className="bg-[#09090b] border border-[#27272a] p-5 rounded-2xl font-mono text-xs text-zinc-500 space-y-2 relative overflow-hidden shadow-inner">
              <div className="flex items-center gap-1.5 pb-2 border-b border-[#27272a] mb-3 text-[10px] text-zinc-650">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI_AGENT_SHELL: ONLINE</span>
              </div>
              <p className="text-indigo-400/90">&gt; suryaprakash --status</p>
              <p className="text-zinc-400">CentraleSupélec AI Candidate active.</p>
              <p className="text-zinc-500">&gt; suryaprakash --timeline</p>
              <p className="text-zinc-400">Seeking machine learning end-of-studies internships starting mid-2026. (6 months duration)</p>
            </div>
          </div>

          {/* Form and Messages Area */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#18181b] border border-[#27272a] rounded-3xl p-6 md:p-8 backdrop-blur-md">
              <h3 className="font-display font-bold text-[#fafafa] text-lg mb-6">Dispatch a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Your Name*</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Jennifer Miller"
                      className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-650"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Email Address*</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jennifer@organization.com"
                      className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-655"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Research Collaboration / Internship Interview"
                    className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-650"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Message Area*</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Type your message notes..."
                    className="w-full bg-[#09090b] border border-[#27272a]/80 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-[#fafafa] focus:outline-none placeholder:text-zinc-650 resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !name || !email || !message}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-99 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering Logs...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* AI Confirmation modal */}
            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-indigo-950/45 border border-indigo-500/30 p-5 rounded-2xl flex items-start gap-4 shadow-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-[#09090b] border border-[#27272a] flex items-center justify-center text-indigo-400 flex-shrink-0">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="space-y-2 flex-1 relative">
                    <button
                      onClick={() => setSuccessMsg(null)}
                      className="absolute -top-1 right-0 text-zinc-400 hover:text-indigo-400 rounded cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <h4 className="font-display font-bold text-[#fafafa] text-sm flex items-center gap-1.5 leading-none">
                      AI Twin Acknowledgment
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans pr-4">{successMsg}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dynamic Local Message Guestbook */}
            {messages.length > 0 && (
              <div className="bg-[#18181b] border border-[#27272a] rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl space-y-4">
                <div className="flex justify-between items-center border-b border-[#27272a] pb-3">
                  <h3 className="font-display font-bold text-[#fafafa] text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-400" /> Guestbook entries ({messages.length})
                  </h3>
                  <button
                    onClick={handleClearMessages}
                    title="Clear history"
                    className="p-1 text-zinc-500 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-4 pr-1 animate-fadeIn">
                  {messages.map((m) => (
                    <div key={m.id} className="bg-[#09090b] border border-[#27272a] p-4 rounded-xl space-y-2 animate-fadeIn">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h4 className="font-display font-bold text-zinc-200 text-xs">{m.name}</h4>
                          <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">{m.email}</span>
                        </div>
                        <span className="text-[9px] text-zinc-500 font-mono">{m.timestamp}</span>
                      </div>
                      <p className="text-[11px] font-mono text-[#818cf8]">{m.subject}</p>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed whitespace-pre-wrap">{m.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
