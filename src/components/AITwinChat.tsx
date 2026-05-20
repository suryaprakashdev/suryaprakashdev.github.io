import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, Sparkles, User, RefreshCw, ChevronRight, X, MessageSquare, CornerDownRight } from "lucide-react";
import { ChatMessage } from "../types";

const PRESET_QUESTIONS = [
  "Is Surya available for an internship?",
  "Tell me about his SLB Transformers research.",
  "What is the PulmoNet medical imaging project?",
  "Summarize his Python & ML engineering skills.",
];

export default function AITwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("surya_ai_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        role: "model",
        content: "Hi there! I am Surya's AI Twin. I'm trained on his complete technical background, research publications, and project history. Ask me anything about his qualifications, SLB internship, or availability!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("surya_ai_messages", JSON.stringify(messages));
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to consult Surya's AI Twin");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: data.text || "I processed your request, but was unable to formulate a description.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Oops! My connection is currently experiencing high log volumes. Feel free to contact Surya directly at suryaprakashnsk@outlook.com!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "model",
        content: "Reset complete! Ask me any professional question about Surya Prakash.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Floating launcher button */}
      <motion.button
        id="ai-twin-launcher"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 font-display font-semibold hover:scale-108 active:scale-95 cursor-pointer border border-[#818cf8]/40"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="hidden md:inline">Ask AI Twin</span>
      </motion.button>

      {/* Slide-over chat drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              id="chat-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.61 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#09090b]"
            />

            {/* Panel */}
            <motion.section
              id="chat-drawer"
              initial={{ x: "100%", opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg h-full bg-[#18181b] border-l border-[#27272a] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#27272a] bg-[#09090b]/55 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-zinc-200 flex items-center gap-1.5 leading-none">
                      Surya's AI Twin
                      <span className="w-2 h-2 rounded-full bg-[#818cf8] animate-pulse" />
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">GPT-Powered Candidate Proxy</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    title="Reset chat"
                    className="p-2 text-zinc-400 hover:text-indigo-400 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-zinc-400 hover:text-rose-450 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#18181b]/30">
                {messages.map((m, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.role === "model" && (
                      <div className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-800/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-zinc-800 text-zinc-100 rounded-tr-none border border-zinc-700/60"
                          : "bg-[#09090b] border border-[#27272a] text-zinc-200 rounded-tl-none"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{m.content}</div>
                      <div className="text-[10px] text-zinc-500 text-right mt-1.5">{m.timestamp}</div>
                    </div>
                    {m.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-800/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-800/50 flex items-center justify-center text-indigo-400 flex-shrink-0">
                      <Bot className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="bg-[#09090b] border border-[#27272a] max-w-[80%] rounded-2xl px-4 py-3 rounded-tl-none">
                      <div className="flex gap-1.5 items-center h-5">
                        <span className="w-2 py-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 py-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 py-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>

              {/* Suggestions Panel */}
              {messages.length < 5 && (
                <div className="p-4 bg-[#09090b]/30 border-t border-[#27272a]">
                  <p className="text-[11px] uppercase tracking-wider text-indigo-400 font-semibold mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3" /> Quick Prompts
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PRESET_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        disabled={isLoading}
                        className="text-left py-2 px-3 rounded-xl bg-[#09090b] border border-[#27272a] text-zinc-300 text-xs hover:border-indigo-500 hover:text-indigo-400 hover:bg-zinc-900 transition-all cursor-pointer disabled:opacity-50 flex items-start gap-1.5 group"
                      >
                        <CornerDownRight className="w-3 h-3 mt-0.5 text-indigo-400/50 group-hover:text-indigo-400 flex-shrink-0" />
                        <span className="line-clamp-2">{q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input section */}
              <div className="p-4 border-t border-[#27272a] bg-[#09090b]/80">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my research, papers or skills..."
                    disabled={isLoading}
                    className="flex-1 rounded-xl bg-[#18181b] border border-[#27272a]/85 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 text-sm px-4 py-3"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 rounded-xl font-semibold flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-[10px] text-zinc-500 mt-2 text-center">
                  Answer matches my verified resume with real-time semantic query generation.
                </p>
              </div>
            </motion.section>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
