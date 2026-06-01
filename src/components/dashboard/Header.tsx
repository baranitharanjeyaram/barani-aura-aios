import React from "react";
import { Role, ROLE_CONFIGS, AlertNotification } from "@/lib/mockData";
import { Bell, ShieldAlert, Cpu, Sparkles, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  currentRole: Role;
  currentSection: string;
  alerts: AlertNotification[];
  markAllRead: () => void;
  setCurrentSection: (section: string) => void;
}

export default function Header({
  currentRole,
  currentSection,
  alerts,
  markAllRead,
  setCurrentSection,
}: HeaderProps) {
  const unreadAlerts = alerts.filter((a) => !a.isRead);
  const roleConfig = ROLE_CONFIGS[currentRole];

  return (
    <header className="h-16 bg-[#121826]/60 border-b border-white/5 flex items-center justify-between px-8 backdrop-blur-md shrink-0">
      {/* Title & Section Breadcrumbs */}
      <div className="flex items-center gap-4">
        <h2 className="font-heading font-bold text-white text-lg tracking-wide uppercase">
          {currentSection}
        </h2>
        <span className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#94a3b8] uppercase">
            Viewing Context:
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#db0011]/10 text-[#db0011] border border-[#db0011]/20 font-mono">
            {roleConfig.department}
          </span>
        </div>
      </div>

      {/* Global Indicators */}
      <div className="flex items-center gap-6">
        {/* Risk Score Dial Mini Widget */}
        <div className="flex items-center gap-2.5 bg-[#0b0f19]/80 px-3.5 py-1.5 rounded-lg border border-white/5">
          <ShieldAlert className="w-4 h-4 text-[#db0011]" />
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-[#94a3b8] tracking-widest uppercase">
              Consolidated Risk
            </span>
            <span className="text-xs font-bold text-white font-mono leading-none mt-0.5">
              78.4 <span className="text-[#db0011] text-[9px] font-normal font-sans">High</span>
            </span>
          </div>
        </div>

        {/* AI Performance telemetry */}
        <div className="flex items-center gap-2.5 bg-[#0b0f19]/80 px-3.5 py-1.5 rounded-lg border border-white/5">
          <Cpu className="w-4 h-4 text-[#1677ff]" />
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-[#94a3b8] tracking-widest uppercase">
              AI Governance Index
            </span>
            <span className="text-xs font-bold text-white font-mono leading-none mt-0.5">
              92.4 <span className="text-emerald-500 text-[9px] font-normal font-sans">Stable</span>
            </span>
          </div>
        </div>

        {/* Alerts & Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative w-9 h-9 rounded-full bg-[#1b2235] border border-white/5 flex items-center justify-center text-slate-300 hover:text-white transition-all hover:bg-[#1b2235]/80 outline-none">
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#db0011] text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center animate-pulse border border-[#0b0f19]">
                {unreadAlerts.length}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[380px] bg-[#121826] border border-white/10 text-white rounded-md shadow-2xl p-0" align="end">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0b0f19]/40">
              <span className="text-xs font-bold tracking-wider uppercase font-heading">
                System Incident Feed
              </span>
              {unreadAlerts.length > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] text-[#1677ff] hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#94a3b8]">
                  No active incidents recorded
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "p-3 border-b border-white/5 hover:bg-[#1b2235]/40 transition-colors flex gap-3 text-left",
                      !alert.isRead && "bg-[#1b2235]/20 border-l-2 border-[#db0011]"
                    )}
                  >
                    <div className="mt-0.5">
                      {alert.type === "CRITICAL_RISK" || alert.type === "COMPLIANCE_BREACH" ? (
                        <div className="w-2 h-2 rounded-full bg-[#db0011]" />
                      ) : alert.type === "AI_ANOMALY" ? (
                        <div className="w-2 h-2 rounded-full bg-[#1677ff]" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-white truncate">
                          {alert.title}
                        </span>
                        <span className="text-[9px] text-[#94a3b8] font-mono shrink-0">
                          {alert.timestamp}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#94a3b8] mt-1 leading-normal line-clamp-2">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <DropdownMenuSeparator className="bg-white/5 m-0" />
            <button
              onClick={() => setCurrentSection("Alerts")}
              className="w-full text-center py-2.5 text-xs text-[#94a3b8] hover:text-white bg-[#0b0f19]/30 transition-colors hover:bg-[#0b0f19]/60 font-mono"
            >
              Open Alerts Center
            </button>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1b2235] border border-white/5 flex items-center justify-center text-slate-300">
            <User className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col text-left max-w-[120px] hidden md:flex">
            <span className="text-xs font-semibold text-white truncate">
              {roleConfig.title}
            </span>
            <span className="text-[9px] text-[#94a3b8] font-mono leading-none mt-0.5 truncate">
              {roleConfig.department}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
