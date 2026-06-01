import React from "react";
import { Role, ROLE_CONFIGS } from "@/lib/mockData";
import {
  Shield,
  Activity,
  Layers,
  FileSpreadsheet,
  Cpu,
  CheckSquare,
  AlertTriangle,
  FolderLock,
  ChevronDown,
  Settings as SettingsIcon,
  MessageSquare,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

export const SECTIONS = [
  { name: "Dashboard", icon: Activity },
  { name: "Risk Intelligence", icon: Shield },
  { name: "Internal Audit", icon: Layers },
  { name: "Compliance", icon: FileSpreadsheet },
  { name: "AI Analytics", icon: Cpu },
  { name: "RCSA", icon: CheckSquare },
  { name: "Findings Tracker", icon: FolderLock },
  { name: "Reports", icon: Terminal },
  { name: "Alerts", icon: AlertTriangle },
  { name: "AI Copilot", icon: MessageSquare },
  { name: "Settings", icon: SettingsIcon },
];

export default function Sidebar({
  currentRole,
  setCurrentRole,
  currentSection,
  setCurrentSection,
}: SidebarProps) {
  const allowedViews = ROLE_CONFIGS[currentRole]?.allowedViews || [];
  const [roleSelectorOpen, setRoleSelectorOpen] = React.useState(false);

  return (
    <aside className="w-72 bg-[#121826]/90 border-r border-white/5 flex flex-col h-screen overflow-hidden backdrop-blur-md shrink-0 z-20">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-[#0b0f19]/40">
        <div className="w-10 h-10 rounded-lg bg-[#db0011] flex items-center justify-center font-heading font-extrabold text-lg text-white shadow-[0_0_15px_rgba(219,0,17,0.4)]">
          BA
        </div>
        <div className="flex flex-col">
          <span className="font-heading font-bold text-white tracking-wider text-base">
            BARANI AURA
          </span>
          <span className="text-[10px] text-[#94a3b8] font-mono tracking-widest uppercase">
            AI Operating System
          </span>
        </div>
      </div>

      {/* Role Selector Panel (Custom Dropdown) */}
      <div className="p-4 border-b border-white/5 bg-[#1b2235]/40 relative">
        <span className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider block mb-1">
          Access Clearance Identity
        </span>
        
        <button
          onClick={() => setRoleSelectorOpen(!roleSelectorOpen)}
          className="w-full flex items-center justify-between px-3 py-2 bg-[#1b2235]/60 hover:bg-[#1b2235] border border-white/5 rounded-md text-xs font-medium text-white transition-all outline-none cursor-pointer"
        >
          <span className="truncate">{currentRole}</span>
          <ChevronDown className={cn("w-4 h-4 text-[#94a3b8] transition-transform duration-200", roleSelectorOpen && "rotate-180")} />
        </button>

        {roleSelectorOpen && (
          <div className="absolute left-4 right-4 mt-1 bg-[#121826] border border-white/10 text-white rounded-md shadow-2xl z-50 p-1 space-y-0.5 max-h-[220px] overflow-y-auto">
            <div className="text-[9px] text-[#94a3b8] font-mono px-2.5 py-1 border-b border-white/5 mb-1 uppercase tracking-wider">
              Switch Command View
            </div>
            {Object.keys(ROLE_CONFIGS).map((roleName) => (
              <button
                key={roleName}
                onClick={() => {
                  setCurrentRole(roleName as Role);
                  setRoleSelectorOpen(false);
                }}
                className={cn(
                  "w-full text-left text-xs px-2.5 py-2 hover:bg-[#db0011]/15 hover:text-white cursor-pointer rounded transition-colors block outline-none border-none",
                  currentRole === roleName && "bg-[#db0011]/10 text-[#db0011] font-semibold"
                )}
              >
                {roleName}
              </button>
            ))}
          </div>
        )}

        <span className="text-[9px] text-[#94a3b8] font-mono mt-1.5 block truncate">
          Clearance: {ROLE_CONFIGS[currentRole].clearance}
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-white/5">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isAllowed = allowedViews.includes(section.name);
          const isActive = currentSection === section.name;

          return (
            <button
              key={section.name}
              disabled={!isAllowed}
              onClick={() => setCurrentSection(section.name)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 outline-none text-left relative cursor-pointer",
                isActive
                  ? "bg-[#1b2235] text-white shadow-inner border-l-2 border-[#db0011]"
                  : "text-[#94a3b8] hover:bg-[#1b2235]/40 hover:text-white",
                !isAllowed && "opacity-35 cursor-not-allowed hover:bg-transparent hover:text-[#94a3b8]"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4",
                    isActive ? "text-[#db0011]" : "text-[#94a3b8]",
                    !isAllowed && "text-[#475569]"
                  )}
                />
                <span className="truncate">{section.name}</span>
              </div>
              {!isAllowed && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 font-mono scale-90">
                  Locked
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Telemetry Footer */}
      <div className="p-4 border-t border-white/5 bg-[#0b0f19]/30 flex flex-col gap-1.5 font-mono text-[9px] text-[#94a3b8]">
        <div className="flex items-center justify-between">
          <span>SYSTEM RUNTIME</span>
          <span className="text-white">v3.5.2-LIVE</span>
        </div>
        <div className="flex items-center justify-between">
          <span>AI COGNITIVE SHIELD</span>
          <span className="text-emerald-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            ACTIVE
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>LEDGER LOG STATE</span>
          <span className="text-white">SYNCED</span>
        </div>
      </div>
    </aside>
  );
}
