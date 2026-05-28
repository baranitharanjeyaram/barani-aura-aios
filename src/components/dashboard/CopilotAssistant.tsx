import React, { useState, useRef, useEffect } from "react";
import { Role, ChatMessage, COPILOT_PRESETS, getCopilotResponse } from "@/lib/mockData";
import { MessageSquare, Send, Sparkles, X, Terminal, Copy, CornerDownLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CopilotAssistantProps {
  currentRole: Role;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export default function CopilotAssistant({
  currentRole,
  isOpen,
  setIsOpen,
  chatHistory,
  setChatHistory,
}: CopilotAssistantProps) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // 2. Simulate AI response after short delay
    setTimeout(() => {
      const responseText = getCopilotResponse(messageText, currentRole);
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#db0011] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(219,0,17,0.4)] hover:shadow-[0_0_30px_rgba(219,0,17,0.6)] hover:scale-105 transition-all duration-300 z-50 group border border-white/10"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative flex items-center justify-center"
            >
              <MessageSquare className="w-5.5 h-5.5" />
              <Sparkles className="w-3.5 h-3.5 absolute -top-1.5 -right-1.5 text-yellow-300 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-[420px] h-screen bg-[#121826]/95 border-l border-white/5 shadow-2xl flex flex-col z-40 backdrop-blur-lg"
          >
            {/* Copilot Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#0b0f19]/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#db0011]/15 flex items-center justify-center text-[#db0011] border border-[#db0011]/30">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-heading font-bold text-white tracking-wide">
                    Aura Risk Copilot
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping inline-block" />
                    L5 Quantitative LLM
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/5">
              <div className="p-3.5 rounded-lg bg-[#1b2235]/40 border border-white/5 text-[11px] text-[#94a3b8] space-y-2 text-left">
                <div className="flex items-center gap-1.5 font-bold text-white font-mono uppercase tracking-wide">
                  <Terminal className="w-3.5 h-3.5 text-[#db0011]" />
                  Active Security clearance
                </div>
                <p>
                  You are cleared for **{currentRole}** context. Models automatically filter results according to standard organizational governance matrices.
                </p>
              </div>

              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[85%] text-left",
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <span className="text-[9px] text-[#94a3b8] font-mono mb-1">
                    {msg.sender === "user" ? "You" : "AURA AI"} · {msg.timestamp}
                  </span>
                  <div
                    className={cn(
                      "px-4 py-3 rounded-lg text-xs leading-normal font-sans shadow-md border whitespace-pre-wrap",
                      msg.sender === "user"
                        ? "bg-[#db0011]/10 border-[#db0011]/30 text-white rounded-tr-none"
                        : "bg-[#1b2235] border-white/5 text-[#e2e8f0] rounded-tl-none font-mono"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start max-w-[80%] text-left">
                  <span className="text-[9px] text-[#94a3b8] font-mono mb-1">AURA AI is formulating analysis...</span>
                  <div className="bg-[#1b2235] border border-white/5 px-4 py-3 rounded-lg rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#db0011] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#db0011] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#db0011] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Panel */}
            {chatHistory.length < 5 && (
              <div className="px-5 py-3 border-t border-white/5 bg-[#0b0f19]/30">
                <span className="text-[9px] font-mono text-[#94a3b8] uppercase tracking-wider block mb-2 text-left">
                  Recommended Quantitative Inquiries
                </span>
                <div className="flex flex-col gap-1.5">
                  {COPILOT_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(preset)}
                      className="w-full text-left px-3 py-2 bg-[#1b2235]/40 hover:bg-[#1b2235] border border-white/5 rounded-md text-[11px] text-slate-300 hover:text-white transition-colors truncate"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-4 border-t border-white/5 bg-[#1b2235]/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="flex items-center gap-2 bg-[#0b0f19] border border-white/5 rounded-lg px-3 py-2 focus-within:border-[#db0011]/50 transition-colors"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Aura to analyze metrics, write risk updates..."
                  className="flex-1 bg-transparent text-xs text-white border-none outline-none placeholder:text-[#94a3b8] h-7"
                />
                <button
                  type="submit"
                  className="w-7 h-7 bg-[#db0011]/20 hover:bg-[#db0011] border border-[#db0011]/30 hover:border-[#db0011]/10 rounded flex items-center justify-center text-white transition-all outline-none"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[9px] text-[#475569] font-mono mt-2">
                <span>Enter sends query</span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="w-2.5 h-2.5" /> AURA Core v3
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
