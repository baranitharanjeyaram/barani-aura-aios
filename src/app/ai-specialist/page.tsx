"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types";
import { generateAiResponse } from "@/utils/mockAi";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Terminal,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function AIRiskSpecialist() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      role: "assistant",
      content: `Hello! I am the **ARAIS AI Risk Specialist**, your virtual assurance and governance analyst. 

I can query the live risk registers, assess control metrics, explain regulatory compliance gaps, and format board summaries. 

Select one of the analytical templates below or type a custom query.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Analyze this risk.",
    "Recommend mitigating controls.",
    "Generate executive summary.",
    "Explain compliance implications.",
    "Create board-ready insights."
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAiResponse(text);
      const assistantMsg: ChatMessage = {
        id: "msg-" + (Date.now() + 1),
        role: "assistant",
        content: response.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="p-2.5 bg-yellow-50 rounded-lg text-gold border border-gold/25 shadow-gold-glow animate-pulse">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-1.5 text-slate-900">
            ARAIS AI Risk Specialist
          </h2>
          <p className="text-xs text-slate-500 font-medium">Virtual Risk Officer & Assurance Copilot. Ask queries regarding risks, controls, audit findings, and compliance.</p>
        </div>
      </div>

      {/* Main Conversation Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Preset Templates & Guidelines (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 space-y-4 bg-white">
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider pb-2 border-b border-slate-200">
              <Terminal className="h-4 w-4" />
              <span>Suggested Analyticals</span>
            </div>
            <div className="space-y-2.5">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="w-full text-left p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:text-gold hover:border-gold/30 hover:bg-white transition-all flex items-center justify-between group shadow-sm"
                >
                  <span>{p}</span>
                  <Zap className="h-3 w-3 text-slate-400 group-hover:text-gold shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5 space-y-3 bg-white">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider pb-2 border-b border-slate-200">
              <ShieldCheck className="h-4 w-4 text-gold" />
              <span>Assurance Guardrails</span>
            </div>
            <ul className="text-[11px] text-slate-500 space-y-2 font-semibold leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-gold mt-0.5">•</span>
                <span>Contextual queries feed from active risk logs, control inventories, and COSO mandates.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-gold mt-0.5">•</span>
                <span>AI insights are cross-referenced with internal audit databases in real-time.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-gold mt-0.5">•</span>
                <span>Strategic summaries are formatted according to Big Four board standards.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Chat Box Thread (Col 8) */}
        <div className="lg:col-span-8 flex flex-col justify-between glass-panel p-5 h-[560px] bg-white border-slate-200">
          
          {/* Scrollable messages container */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar">
            {messages.map((msg) => {
              const isAi = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isAi ? "self-start" : "ml-auto flex-row-reverse"}`}
                >
                  {/* Icon */}
                  <div
                    className={`h-8 w-8 rounded-full border flex items-center justify-center shrink-0 ${
                      isAi
                        ? "bg-yellow-50 border-gold/30 text-gold shadow-gold-glow"
                        : "bg-slate-100 border-slate-200 text-slate-500"
                    }`}
                  >
                    {isAi ? <Bot className="h-4.5 w-4.5" /> : <User className="h-4 w-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-lg p-3.5 text-xs relative border ${
                      isAi
                        ? "bg-slate-50 border-slate-200 text-slate-700 font-medium"
                        : "bg-gold text-white font-semibold border-gold"
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed font-sans">
                      {msg.content}
                    </div>
                    <span
                      className={`text-[8px] absolute bottom-1 right-2 block opacity-60 font-semibold ${
                        isAi ? "text-slate-400" : "text-white/80"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 max-w-[85%] self-start">
                <div className="h-8 w-8 rounded-full bg-yellow-50 border border-gold/30 text-gold flex items-center justify-center shrink-0">
                  <Bot className="h-4.5 w-4.5" />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-xs text-gold font-bold flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="h-3.5 w-3.5 text-gold animate-spin" />
                  <span>ARAIS is compiling compliance and risk indexes...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form input bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center gap-3 pt-3 border-t border-slate-200"
          >
            <input
              type="text"
              placeholder="Ask ARAIS to analyze risks, recommend controls, or explain regulations..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-gold/50 font-medium"
            />
            <button
              type="submit"
              className="p-2.5 rounded-lg bg-gold text-white hover:bg-gold-light transition-all flex items-center justify-center shadow-gold-glow"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
