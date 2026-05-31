"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldAlert,
  Sliders,
  FileCheck,
  Award,
  Briefcase,
  Bot,
  BarChart3,
  Download,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Sparkles,
  ArrowRightLeft,
  Menu,
  X
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [org, setOrg] = useState("Aura Global Holdings");
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Enterprise Risks", path: "/risks", icon: ShieldAlert },
    { name: "Controls", path: "/controls", icon: Sliders },
    { name: "Compliance", path: "/compliance", icon: FileCheck },
    { name: "Assurance", path: "/assurance", icon: Award },
    { name: "Executive MIS", path: "/executive-mis", icon: Briefcase },
    { name: "AI Risk Specialist", path: "/ai-specialist", icon: Bot, highlight: true },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Reports", path: "/reports", icon: Download },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const notifications = [
    { id: 1, text: "Risk Appetite breached for Sovereign Cloud Data Breach", time: "2 hours ago", critical: true },
    { id: 2, text: "Control testing failed for DLP pattern filters", time: "1 day ago", critical: true },
    { id: 3, text: "SEC Compliance check completed. Score: 100%", time: "3 days ago", critical: false },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F1EC] text-slate-900 overflow-x-hidden font-sans">
      {/* MOBILE OVERLAY BACKDROP */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* LEFT NAVIGATION MENU (SIDEBAR) - DEEP NAVY */}
      <aside
        className={`w-72 fixed inset-y-0 left-0 bg-[#0A2540] text-white border-r border-slate-900/60 flex flex-col justify-between z-50 transition-all duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo Area */}
          <div className="p-6 border-b border-slate-950/20 bg-black/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-gold to-gold-dark rounded-md text-deepnavy shadow-gold-glow">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-wider text-white">
                  BARANI <span className="text-gold">AURA</span>
                </h1>
                <p className="text-[10px] tracking-widest text-silvergray font-semibold">AIOS (ARAIS)</p>
              </div>
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-1 max-h-[calc(100vh-230px)] overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-slate-800/60 text-gold border-l-2 border-gold shadow-gold-glow"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/20"
                  } ${item.highlight ? "border border-gold/30 bg-gold/5" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? "text-gold" : "text-slate-400 group-hover:text-gold"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.highlight && (
                    <span className="text-[9px] bg-gold text-deepnavy font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 animate-pulse">
                      AI Active
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Signature */}
        <div className="p-5 border-t border-slate-900/60 bg-black/10">
          <div className="p-3.5 rounded-lg bg-slate-900/40 border border-gold/15">
            <h4 className="text-xs font-bold text-gold tracking-wide mb-1">BARANI AURA AIOS</h4>
            <p className="text-[10px] text-slate-300 leading-relaxed mb-2 font-medium">
              Continuous Monitoring. Continuous Assurance. Continuous Intelligence.
            </p>
            <div className="text-[8px] text-gold/80 italic leading-snug border-t border-slate-900/30 pt-2 font-medium">
              "Connecting Risks, Controls, Compliance and Decisions Through AI."
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT CONTENT WORKSPACE */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen w-full">
        {/* TOP NAVIGATION BAR - MIDNIGHT BLUE */}
        <header className="h-16 border-b border-slate-950/20 bg-[#102A43] text-white sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 gap-4 shadow-md">
          
          {/* Left: Mobile Toggle & Search & Org Select */}
          <div className="flex items-center gap-4 sm:gap-6 flex-1 max-w-xl">
            {/* Hamburger Button (Mobile Only) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Org Selector */}
            <div className="relative hidden md:block shrink-0">
              <button
                onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900/60 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <ArrowRightLeft className="h-3 w-3 text-gold" />
                <span>{org}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
              {showOrgDropdown && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-midnight border border-slate-800 rounded shadow-premium-shadow z-50 p-1">
                  {["Aura Global Holdings", "Aura APAC Division", "Aura EU Operations", "Aura North America Inc."].map((o) => (
                    <button
                      key={o}
                      onClick={() => {
                        setOrg(o);
                        setShowOrgDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs rounded hover:bg-slate-850 hover:text-gold transition-colors"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Global Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search database..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-md py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-gold/55 focus:ring-1 focus:ring-gold/30 transition-all"
              />
            </div>
          </div>

          {/* Right: AI Shortcut, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* AI Assistant Access */}
            <Link
              href="/ai-specialist"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/40 text-xs text-gold font-bold hover:from-gold/30 hover:to-gold/10 transition-all shadow-gold-glow animate-pulse"
              title="Ask ARAIS"
            >
              <Bot className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ask ARAIS</span>
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors relative"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-risk-high animate-ping" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-risk-high" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-midnight border border-slate-800 rounded-lg shadow-premium-shadow z-50 p-2">
                  <div className="px-3 py-2 border-b border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-white">System Notifications</span>
                    <span className="text-[10px] text-gold cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="divide-y divide-slate-800">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-3 hover:bg-slate-800/30 transition-colors">
                        <p className={`text-xs ${notif.critical ? "text-risk-medium font-medium" : "text-slate-300"}`}>
                          {notif.text}
                        </p>
                        <span className="text-[9px] text-slate-500 block mt-1">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 border-l border-slate-800 pl-2 sm:pl-4">
              <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-gold font-bold text-xs shrink-0">
                A
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-white leading-tight">Admin User</p>
                <p className="text-[9px] text-slate-400 leading-none">Risk Specialist</p>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY WORKSPACE - WARM OFF-WHITE BACKGROUND */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-[#F4F1EC]">
          {children}
        </main>
      </div>
    </div>
  );
}
