"use client";

import React, { useState, useEffect } from "react";
import { Role, ROLE_CONFIGS, SYSTEM_ALERTS_LOG, ChatMessage, getCopilotResponse } from "@/lib/mockData";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import CopilotAssistant from "@/components/dashboard/CopilotAssistant";

// Views
import CommandCenter from "@/components/dashboard/views/CommandCenter";
import RiskIntelligence from "@/components/dashboard/views/RiskIntelligence";
import InternalAudit from "@/components/dashboard/views/InternalAudit";
import ComplianceTracking from "@/components/dashboard/views/ComplianceTracking";
import FindingsTracker from "@/components/dashboard/views/FindingsTracker";
import Reports from "@/components/dashboard/views/Reports";
import AlertsCenter from "@/components/dashboard/views/AlertsCenter";
import Settings from "@/components/dashboard/views/Settings";

// Animations
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Terminal, Lock } from "lucide-react";

export default function Home() {
  const [currentRole, setCurrentRole] = useState<Role>("Chief Risk Officer");
  const [currentSection, setCurrentSection] = useState<string>("Dashboard");
  
  // Alerts state
  const [alerts, setAlerts] = useState(SYSTEM_ALERTS_LOG);
  
  // Copilot assistant state
  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Initialize chat history with first welcome message
  useEffect(() => {
    setChatHistory([
      {
        id: "msg-welcome",
        sender: "ai",
        text: getCopilotResponse("", currentRole),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  }, [currentRole]);

  // Adjust section if switched to a role that does not have access to current active section
  useEffect(() => {
    const allowed = ROLE_CONFIGS[currentRole]?.allowedViews || [];
    if (!allowed.includes(currentSection)) {
      setCurrentSection("Dashboard"); // Default fallback
    }
  }, [currentRole]);

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  const renderActiveView = () => {
    // Permission validation
    const allowedViews = ROLE_CONFIGS[currentRole]?.allowedViews || [];
    if (!allowedViews.includes(currentSection)) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
              Access Restricted
            </h3>
            <p className="text-xs text-slate-400 max-w-sm leading-normal">
              Your profile (**{currentRole}**) does not possess the required cryptographic clearance to view **{currentSection}**. Contact the Super Admin to request resource synchronization.
            </p>
          </div>
        </div>
      );
    }

    switch (currentSection) {
      case "Dashboard":
        return <CommandCenter currentRole={currentRole} setCurrentSection={setCurrentSection} />;
      case "Risk Intelligence":
        return <RiskIntelligence currentRole={currentRole} />;
      case "Internal Audit":
        return <InternalAudit currentRole={currentRole} />;
      case "Compliance":
      case "RCSA":
        return <ComplianceTracking currentRole={currentRole} />;
      case "Findings Tracker":
        return <FindingsTracker currentRole={currentRole} />;
      case "Reports":
        return <Reports currentRole={currentRole} />;
      case "Alerts":
        return <AlertsCenter currentRole={currentRole} alerts={alerts} setAlerts={setAlerts} />;
      case "Settings":
        return <Settings currentRole={currentRole} />;
      case "AI Copilot":
        // Direct to a full-screen-styled Copilot center
        return (
          <div className="bg-[#121826]/80 border border-white/5 rounded-xl p-8 text-center max-w-2xl mx-auto space-y-4">
            <ShieldAlert className="w-12 h-12 text-[#db0011] mx-auto animate-pulse" />
            <h3 className="text-sm font-heading font-semibold text-white uppercase">AI Copilot Integration Active</h3>
            <p className="text-xs text-slate-400 leading-normal">
              The Aura AI Copilot is fully integrated system-wide. Toggle the chat portal using the floating red spark button in the bottom right corner of your command dashboard.
            </p>
            <button
              onClick={() => setCopilotOpen(true)}
              className="bg-[#db0011]/15 hover:bg-[#db0011] text-[#db0011] hover:text-white border border-[#db0011]/25 hover:border-transparent font-medium text-xs px-4 py-2 rounded transition-all outline-none"
            >
              Initialize Aura Copilot
            </button>
          </div>
        );
      default:
        return <CommandCenter currentRole={currentRole} setCurrentSection={setCurrentSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0b0f19] text-white overflow-hidden font-sans relative">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#db0011]/8 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#1677ff]/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[30%] left-[25%] w-[40%] h-[40%] rounded-full bg-[#10b981]/5 blur-[120px] pointer-events-none z-0" />

      {/* Sidebar Navigation */}
      <Sidebar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      {/* Main Panel Shell */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Main Header */}
        <Header
          currentRole={currentRole}
          currentSection={currentSection}
          alerts={alerts}
          markAllRead={markAllRead}
          setCurrentSection={setCurrentSection}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection + currentRole}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Sliding Drawer AI Assistant */}
      <CopilotAssistant
        currentRole={currentRole}
        isOpen={copilotOpen}
        setIsOpen={setCopilotOpen}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
      />
    </div>
  );
}
