"use client";

import React, { useState, useEffect } from "react";
import { MOCK_AUDITS } from "@/components/mockData";
import { AuditFinding } from "@/types";
import { exportToCSV } from "@/utils/export";
import {
  Award,
  Search,
  Filter,
  AlertTriangle,
  FolderOpen,
  Sparkles,
  ClipboardCheck
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

export default function AssuranceAudit() {
  const [findings, setFindings] = useState<AuditFinding[]>(MOCK_AUDITS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Stats
  const totalFindings = findings.length;
  const criticalCount = findings.filter((f) => f.severity === "Critical").length;
  const highCount = findings.filter((f) => f.severity === "High").length;
  const resolvedCount = findings.filter((f) => f.status === "Resolved" || f.status === "Closed").length;
  const openCount = findings.filter((f) => f.status === "Open" || f.status === "In Progress").length;

  // Chart Data: findings by severity
  const severityChartData = [
    { name: "Critical", value: findings.filter((f) => f.severity === "Critical").length, color: "#8E0000" },
    { name: "High", value: findings.filter((f) => f.severity === "High").length, color: "#C62828" },
    { name: "Medium", value: findings.filter((f) => f.severity === "Medium").length, color: "#F9A825" },
    { name: "Low", value: findings.filter((f) => f.severity === "Low").length, color: "#2E7D32" },
  ].filter(d => d.value > 0);

  // Filters
  const filteredFindings = findings.filter((f) => {
    const matchesSearch = f.findingTitle.toLowerCase().includes(searchTerm.toLowerCase()) || f.code.toLowerCase().includes(searchTerm.toLowerCase()) || f.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSev = selectedSeverity === "All" || f.severity === selectedSeverity;
    return matchesSearch && matchesSev;
  });

  // Action: Resolve finding
  const handleResolveFinding = (findingId: string) => {
    setFindings((prev) =>
      prev.map((f) =>
        f.id === findingId
          ? {
              ...f,
              status: f.status === "Open" ? "In Progress" : f.status === "In Progress" ? "Resolved" : "Closed"
            }
          : f
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <Award className="h-6 w-6 text-gold" />
            Assurance & Audit Intelligence
          </h2>
          <p className="text-xs text-slate-500 font-medium">Track internal audits, independent reviews, regulatory audits, and finding remediation cycles.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCSV(findings, "ARAIS_Audit_Findings_Log")}
            className="px-3.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            Export Findings Log
          </button>
        </div>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="glass-panel p-4 flex items-center justify-between bg-white">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Findings</span>
            <span className="text-2xl font-bold block mt-1 text-slate-900">{totalFindings}</span>
          </div>
          <FolderOpen className="h-5 w-5 text-slate-400" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between bg-white border-l-4 border-l-risk-critical">
          <div>
            <span className="text-[10px] text-risk-critical font-bold uppercase tracking-wider">Critical Issues</span>
            <span className="text-2xl font-bold block mt-1 text-risk-critical">{criticalCount}</span>
          </div>
          <AlertTriangle className="h-5 w-5 text-risk-critical" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between bg-white border-l-4 border-l-risk-high">
          <div>
            <span className="text-[10px] text-risk-high font-bold uppercase tracking-wider">High Severity</span>
            <span className="text-2xl font-bold block mt-1 text-risk-high">{highCount}</span>
          </div>
          <AlertTriangle className="h-5 w-5 text-risk-high" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between bg-white border-l-4 border-l-green-700">
          <div>
            <span className="text-[10px] text-green-700 font-bold uppercase tracking-wider">Remediation Rate</span>
            <span className="text-2xl font-bold block mt-1 text-green-700">
              {Math.round((resolvedCount / totalFindings) * 100)}%
            </span>
          </div>
          <ClipboardCheck className="h-5 w-5 text-green-600" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between bg-white border border-gold/15">
          <div>
            <span className="text-[10px] text-gold font-bold uppercase tracking-wider">Active Open</span>
            <span className="text-2xl font-bold block mt-1 text-gold">{openCount}</span>
          </div>
          <Award className="h-5 w-5 text-gold" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Severity Distribution Pie Chart - Col 5 */}
        <div className="lg:col-span-5 glass-panel p-6 flex flex-col justify-between bg-white">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Findings Severity Profile</h3>
            {isMounted ? (
              <div className="h-60 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {severityChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "8px" }}
                      itemStyle={{ color: "#0F172A" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "10px", color: "#334155" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-60 bg-slate-50 rounded flex items-center justify-center text-slate-400">Loading Chart...</div>
            )}
          </div>
          
          <div className="text-[10px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200 mt-4">
            <strong>Assurance Mapping Insight:</strong> 80% of open findings are centered in IT Security. Cross-functional controls should be automated to accelerate recommendations closure.
          </div>
        </div>

        {/* Audit Log / Recommendation Tracker - Col 7 */}
        <div className="lg:col-span-7 glass-panel p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Audit Findings Log</h3>
            <div className="flex items-center gap-3">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search findings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs outline-none w-32 focus:w-48 transition-all text-slate-900 font-semibold"
              />
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs outline-none text-slate-700 font-bold"
              >
                <option value="All">All Severity</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
            {filteredFindings.map((f) => {
              let sevColor = "text-green-700";
              if (f.severity === "Critical") sevColor = "text-risk-critical font-bold";
              else if (f.severity === "High") sevColor = "text-risk-high font-bold";
              else if (f.severity === "Medium") sevColor = "text-risk-medium";

              let statusColor = "bg-slate-100 text-slate-500 border border-slate-200";
              if (f.status === "Resolved") statusColor = "bg-green-50 text-green-700 border border-green-200";
              else if (f.status === "Closed") statusColor = "bg-slate-50 text-slate-400 border border-slate-200";
              else if (f.status === "In Progress") statusColor = "bg-yellow-50 text-risk-medium border border-yellow-250";
              else if (f.status === "Open") statusColor = "bg-red-50 text-risk-high border border-red-200";

              return (
                <div key={f.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-350 transition-colors flex justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{f.code} | {f.auditName}</span>
                      <span className={`text-[10px] font-bold ${sevColor}`}>{f.severity}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{f.findingTitle}</h4>
                    <p className="text-[11px] text-slate-600 leading-normal bg-white p-2 rounded border border-slate-200 mt-1 font-semibold">
                      <strong>Recommendation:</strong> {f.recommendation}
                    </p>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 font-semibold">
                      <span>Owner: {f.owner}</span>
                      <span>SLA Due Date: {f.dueDate}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-between pl-3 border-l border-slate-250 shrink-0 select-none">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${statusColor} text-center w-20`}>{f.status}</span>
                    {f.status !== "Closed" && (
                      <button
                        onClick={() => handleResolveFinding(f.id)}
                        className="text-[9px] text-gold hover:underline font-bold py-1 flex items-center gap-0.5"
                      >
                        {f.status === "Open" ? "Audit In Progress" : f.status === "In Progress" ? "Resolve Issue" : "Verify & Close"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
