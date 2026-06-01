"use client";

import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import Link from "next/link";
import {
  MOCK_RISKS,
  MOCK_CONTROLS,
  MOCK_COMPLIANCE,
  MOCK_AUDITS,
  MOCK_AI_INSIGHTS
} from "@/components/mockData";
import {
  exportToCSV,
  triggerPrint
} from "@/utils/export";
import {
  Shield,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Award,
  Activity,
  Sparkles,
  TrendingUp,
  Sliders,
  FileCheck,
  ArrowRight,
  Bot
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell
} from "recharts";

export default function HomeDashboard() {
  const [selectedCell, setSelectedCell] = useState<{ impact: number; likelihood: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatches for charts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter calculations
  const totalRisks = MOCK_RISKS.length;
  const highRisks = MOCK_RISKS.filter((r) => r.residualImpact * r.residualLikelihood >= 8).length;
  const controlsMonitored = MOCK_CONTROLS.length;
  const avgCompliance = Math.round(
    MOCK_COMPLIANCE.reduce((acc, curr) => acc + curr.completionPct, 0) / MOCK_COMPLIANCE.length
  );
  const openIssues = MOCK_COMPLIANCE.reduce((acc, curr) => acc + curr.openActions, 0);
  const auditFindings = MOCK_AUDITS.length;
  const breachedKri = MOCK_RISKS.filter((r) => r.kriStatus === "Red").length;
  const aiInsights = MOCK_AI_INSIGHTS.length;

  // Chart data formatting
  const categories = ["Strategic", "Financial", "Operational", "Compliance", "Cyber & IT", "Reputational"];
  const categoryData = categories.map((cat) => {
    const count = MOCK_RISKS.filter((r) => r.category === cat).length;
    return { name: cat, count };
  });

  const inherentVsResidualData = MOCK_RISKS.slice(0, 5).map((r) => ({
    name: r.code,
    Inherent: r.inherentImpact * r.inherentLikelihood,
    Residual: r.residualImpact * r.residualLikelihood,
  }));

  const getRisksInCell = (impact: number, likelihood: number) => {
    return MOCK_RISKS.filter(
      (r) => r.inherentImpact === impact && r.inherentLikelihood === likelihood
    );
  };

  const selectedCellRisks = selectedCell
    ? getRisksInCell(selectedCell.impact, selectedCell.likelihood)
    : [];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome & Global Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            ARAIS Executive Command Center
          </h2>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Real-time monitoring, continuous assurance & intelligence operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToCSV(MOCK_RISKS, "ARAIS_Enterprise_Risk_Register")}
            className="px-4 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
          >
            Export Register (CSV)
          </button>
          <button
            onClick={triggerPrint}
            className="px-4 py-2 bg-gold text-white font-extrabold rounded text-xs hover:bg-gold-light transition-all shadow-gold-glow"
          >
            Generate Board Report (PDF)
          </button>
        </div>
      </div>

      {/* 8 KPI SCORECARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Risks */}
        <div className="glass-panel p-5 flex items-center justify-between glass-panel-hover bg-white">
          <div>
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Total Risks</span>
            <span className="text-3xl font-extrabold mt-1 block text-slate-900">{totalRisks}</span>
            <span className="text-[10px] text-slate-400 block mt-2 font-medium">Active items in register</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg text-slate-600 border border-slate-200">
            <Shield className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 2: High Risks */}
        <div className="glass-panel p-5 flex items-center justify-between glass-panel-hover bg-white border-l-4 border-l-risk-high">
          <div>
            <span className="text-xs text-risk-high font-bold block uppercase tracking-wider">High / Critical Risks</span>
            <span className="text-3xl font-extrabold mt-1 block text-risk-high">{highRisks}</span>
            <span className="text-[10px] text-slate-400 block mt-2 font-medium">Residual Risk Score &ge; 8</span>
          </div>
          <div className="p-3 bg-red-50 rounded-lg text-risk-high border border-red-200">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 3: Controls Monitored */}
        <div className="glass-panel p-5 flex items-center justify-between glass-panel-hover bg-white">
          <div>
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Controls Monitored</span>
            <span className="text-3xl font-extrabold mt-1 block text-slate-900">{controlsMonitored}</span>
            <span className="text-[10px] text-slate-400 block mt-2 font-medium">COSO aligned inventory</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg text-slate-600 border border-slate-200">
            <Sliders className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 4: Compliance Score */}
        <div className="glass-panel p-5 flex items-center justify-between glass-panel-hover bg-white border-l-4 border-l-gold">
          <div>
            <span className="text-xs text-gold font-bold block uppercase tracking-wider">Compliance Score</span>
            <span className="text-3xl font-extrabold mt-1 block text-gold">{avgCompliance}%</span>
            <span className="text-[10px] text-slate-400 block mt-2 font-medium">Obligations checklist status</span>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg text-gold border border-yellow-250">
            <FileCheck className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 5: Open Issues */}
        <div className="glass-panel p-5 flex items-center justify-between glass-panel-hover bg-white">
          <div>
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Open Actions</span>
            <span className="text-3xl font-extrabold mt-1 block text-slate-900">{openIssues}</span>
            <span className="text-[10px] text-slate-400 block mt-2 font-medium">Compliance actions pending</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg text-slate-600 border border-slate-200">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 6: Audit Findings */}
        <div className="glass-panel p-5 flex items-center justify-between glass-panel-hover bg-white">
          <div>
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Audit Findings</span>
            <span className="text-3xl font-extrabold mt-1 block text-risk-medium">{auditFindings}</span>
            <span className="text-[10px] text-slate-400 block mt-2 font-medium">Open findings across teams</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg text-slate-600 border border-slate-200">
            <Award className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 7: KRIs Breached */}
        <div className="glass-panel p-5 flex items-center justify-between glass-panel-hover bg-white">
          <div>
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">KRIs Breached</span>
            <span className="text-3xl font-extrabold mt-1 block text-risk-high">{breachedKri}</span>
            <span className="text-[10px] text-slate-400 block mt-2 font-medium">Red threshold indicators</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg text-slate-600 border border-slate-200">
            <Activity className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 8: AI Insights Generated */}
        <div className="glass-panel p-5 flex items-center justify-between glass-panel-hover bg-white border border-gold/20">
          <div>
            <span className="text-xs text-gold font-bold block uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> AI Insights
            </span>
            <span className="text-3xl font-extrabold mt-1 block text-gold">{aiInsights}</span>
            <span className="text-[10px] text-slate-400 block mt-2 font-medium">Dynamic risk predictions</span>
          </div>
          <div className="p-3 bg-yellow-50/50 rounded-lg text-gold border border-gold/20">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* RISK HEATMAP & EXECUTIVE AI INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Heatmap (Interactive Visualizer) - Col Span 7 */}
        <div className="lg:col-span-7 glass-panel p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Enterprise Inherent Risk Heatmap</h3>
                <p className="text-xs text-slate-500 font-medium">Click a cell coordinates to inspect specific matching risks.</p>
              </div>
              {selectedCell && (
                <button
                  onClick={() => setSelectedCell(null)}
                  className="text-[10px] text-gold hover:underline font-bold"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {/* Heatmap Grid */}
            <div className="grid grid-cols-5 gap-2 relative mt-4">
              <div className="flex flex-col justify-between text-right text-[10px] font-bold text-slate-500 pr-2 py-4 h-64">
                <span>4 - Constant</span>
                <span>3 - Likely</span>
                <span>2 - Possible</span>
                <span>1 - Rare</span>
              </div>

              {/* 4x4 matrix */}
              <div className="col-span-4 grid grid-cols-4 grid-rows-4 gap-2 h-64">
                {[4, 3, 2, 1].map((likelihood) =>
                  [1, 2, 3, 4].map((impact) => {
                    const cellRisks = getRisksInCell(impact, likelihood);
                    const riskCount = cellRisks.length;
                    const isSelected = selectedCell?.impact === impact && selectedCell?.likelihood === likelihood;

                    // Light-theme high contrast risk coordinates
                    let bg = "bg-green-50 text-green-700 border border-green-100";
                    if (impact * likelihood >= 12) {
                      bg = "bg-red-200 text-red-900 border border-red-300 font-extrabold";
                    } else if (impact * likelihood >= 8) {
                      bg = "bg-orange-100 text-orange-950 border border-orange-200 font-bold";
                    } else if (impact * likelihood >= 4) {
                      bg = "bg-yellow-100 text-yellow-900 border border-yellow-200";
                    }

                    return (
                      <div
                        key={`${likelihood}-${impact}`}
                        onClick={() => setSelectedCell({ impact, likelihood })}
                        className={`heatmap-cell ${bg} ${
                          isSelected ? "ring-2 ring-gold border-gold ring-offset-2 ring-offset-white" : ""
                        }`}
                      >
                        <span className="text-lg font-black">{riskCount > 0 ? riskCount : ""}</span>
                        {riskCount > 0 && <span className="text-[8px] opacity-80 font-bold uppercase mt-0.5">Item{riskCount > 1 ? "s" : ""}</span>}
                      </div>
                    );
                  })
                )}
              </div>

              <div className="col-start-2 col-span-4 grid grid-cols-4 text-center text-[10px] font-bold text-slate-500 pt-2">
                <span>1 - Minor</span>
                <span>2 - Moderate</span>
                <span>3 - Serious</span>
                <span>4 - Critical</span>
              </div>
            </div>
            <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6">
              Impact &rarr;
            </div>
          </div>

          {/* Selected Cell Risks Detail */}
          {selectedCell && (
            <div className="mt-6 border-t border-slate-200 pt-4 animate-fade-in">
              <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-3">
                Matching Risks (Impact {selectedCell.impact} &times; Likelihood {selectedCell.likelihood})
              </h4>
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {selectedCellRisks.length === 0 ? (
                  <p className="text-xs text-slate-400 italic font-medium">No risks registered at this specific coordinate.</p>
                ) : (
                  selectedCellRisks.map((r) => (
                    <div key={r.id} className="p-2.5 rounded bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-700 mr-2">{r.code}</span>
                        <span className="text-slate-900 font-semibold">{r.title}</span>
                      </div>
                      <Link
                        href="/risks"
                        className="text-[10px] text-gold hover:underline flex items-center gap-1 font-bold whitespace-nowrap"
                      >
                        Inspect <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Flagship Executive AI Insights Panel - Col Span 5 */}
        <div className="lg:col-span-5 glass-panel p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
              <Sparkles className="h-5 w-5 text-gold" />
              <h3 className="text-lg font-bold text-slate-900">Flagship Executive Insights</h3>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {MOCK_AI_INSIGHTS.map((insight) => {
                let badgeColor = "bg-slate-100 text-slate-600";
                if (insight.impactScore === "Critical") badgeColor = "bg-red-100 text-red-800 font-bold";
                else if (insight.impactScore === "High") badgeColor = "bg-orange-100 text-orange-800 font-bold";
                else if (insight.impactScore === "Medium") badgeColor = "bg-yellow-100 text-yellow-800 font-bold";

                return (
                  <div key={insight.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-350 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] bg-yellow-50 text-gold font-bold px-2 py-0.5 rounded border border-gold/20 uppercase">
                        {insight.category}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${badgeColor}`}>
                        {insight.impactScore}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1.5">{insight.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">{insight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 mt-4">
            <Link
              href="/ai-specialist"
              className="w-full flex items-center justify-between p-3 rounded-lg bg-yellow-50/50 border border-gold/30 text-xs font-bold text-gold hover:bg-yellow-50 transition-colors"
            >
              <span>Consult AI Risk Specialist on these insights</span>
              <Bot className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* RISK ANALYTICS CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Risks by Category Bar Chart */}
        <div className="glass-panel p-6 bg-white">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Risks by Category Breakdown</h3>
          {isMounted ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} allowDecimals={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "8px" }}
                    labelStyle={{ color: "#0F172A", fontWeight: "bold" }}
                    itemStyle={{ color: "#C9A227" }}
                  />
                  <Bar dataKey="count" fill="#C9A227" radius={[4, 4, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#C9A227" : "#486581"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 bg-slate-50 rounded flex items-center justify-center text-slate-400">Loading Analytics...</div>
          )}
        </div>

        {/* Risk Trend Visualizer */}
        <div className="glass-panel p-6 bg-white">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Inherent vs Residual Exposure Metrics</h3>
          {isMounted ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inherentVsResidualData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "8px" }}
                    labelStyle={{ color: "#0F172A", fontWeight: "bold" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px", color: "#334155" }} />
                  <Bar dataKey="Inherent" fill="#C62828" radius={[4, 4, 0, 0]} name="Inherent Risk Index" />
                  <Bar dataKey="Residual" fill="#2E7D32" radius={[4, 4, 0, 0]} name="Residual Risk Index" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 bg-slate-50 rounded flex items-center justify-center text-slate-400">Loading Analytics...</div>
          )}
        </div>
      </div>

      {/* CONTROLS MONITORING & COMPLIANCE SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Quick View (Span 7) */}
        <div className="lg:col-span-7 glass-panel p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Control Testing & Effectiveness Log</h3>
            <Link href="/controls" className="text-xs text-gold font-bold hover:underline flex items-center gap-1">
              View Inventory <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="pb-3">Code</th>
                  <th className="pb-3">Control Description</th>
                  <th className="pb-3 text-center">Effectiveness</th>
                  <th className="pb-3 text-center">Evidence SLA</th>
                  <th className="pb-3 text-right">Testing Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_CONTROLS.slice(0, 4).map((c) => {
                  let effBadge = "bg-green-55 text-green-700 border border-green-200 bg-green-50";
                  if (c.effectiveness === "Ineffective") effBadge = "bg-red-50 text-risk-high border border-red-200";
                  else if (c.effectiveness === "Partially Effective") effBadge = "bg-yellow-50 text-risk-medium border border-yellow-250";

                  let evBadge = "text-green-700";
                  if (c.evidenceStatus === "Overdue") evBadge = "text-risk-high font-extrabold";
                  else if (c.evidenceStatus === "Pending") evBadge = "text-risk-medium";

                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 font-bold text-slate-950">{c.code}</td>
                      <td className="py-3.5 font-medium pr-4 truncate max-w-xs">{c.title}</td>
                      <td className="py-3.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${effBadge}`}>{c.effectiveness}</span>
                      </td>
                      <td className={`py-3.5 text-center font-bold text-[10px] ${evBadge}`}>{c.evidenceStatus}</td>
                      <td className="py-3.5 text-right font-semibold text-slate-500">{c.lastTested}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Progress (Span 5) */}
        <div className="lg:col-span-5 glass-panel p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Regulatory Framework Alignment</h3>
            <Link href="/compliance" className="text-xs text-gold font-bold hover:underline flex items-center gap-1">
              Obligations Register <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {MOCK_COMPLIANCE.slice(0, 4).map((comp) => {
              let textClass = "text-green-700";
              if (comp.status === "Non-Compliant") textClass = "text-risk-high font-bold";
              else if (comp.status === "In Progress") textClass = "text-risk-medium";

              return (
                <div key={comp.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800">{comp.regulation} - <span className="text-slate-500 font-medium">{comp.title.slice(0, 30)}...</span></span>
                    <span className={textClass}>{comp.completionPct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="bg-gold h-full rounded-full transition-all duration-500"
                      style={{ width: `${comp.completionPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
=======
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
>>>>>>> 964014ce1585904be1531bd54d12f60bcd9b901b
    </div>
  );
}
