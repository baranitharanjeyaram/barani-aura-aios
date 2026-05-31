"use client";

import React, { useState } from "react";
import { MOCK_RISKS } from "@/components/mockData";
import { Risk } from "@/types";
import { exportToCSV } from "@/utils/export";
import {
  ShieldAlert,
  Plus,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles
} from "lucide-react";

export default function EnterpriseRisks() {
  const [risks, setRisks] = useState<Risk[]>(MOCK_RISKS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedAppetite, setSelectedAppetite] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);

  // New Risk Form State
  const [newRisk, setNewRisk] = useState<Partial<Risk>>({
    code: "RSK-NEW-" + Math.floor(Math.random() * 900 + 100),
    title: "",
    category: "Operational",
    department: "Operations",
    inherentImpact: 3,
    inherentLikelihood: 3,
    residualImpact: 2,
    residualLikelihood: 2,
    trend: "Stable",
    kriStatus: "Green",
    appetiteStatus: "Within",
    owner: "Admin User",
    lastAssessed: new Date().toISOString().split("T")[0]
  });

  const categories = ["Strategic", "Financial", "Operational", "Compliance", "Cyber & IT", "Reputational"];
  const departments = ["Finance", "IT & Security", "Operations", "Legal", "HR", "Internal Audit"];

  // Filter logic
  const filteredRisks = risks.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || r.category === selectedCategory;
    const matchesDept = selectedDept === "All" || r.department === selectedDept;
    const matchesAppetite = selectedAppetite === "All" || r.appetiteStatus === selectedAppetite;
    return matchesSearch && matchesCategory && matchesDept && matchesAppetite;
  });

  const handleAddRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRisk.title) return;

    const completeRisk: Risk = {
      id: "risk-" + (risks.length + 1),
      code: newRisk.code || "RSK-GEN",
      title: newRisk.title,
      category: newRisk.category as any,
      department: newRisk.department as any,
      inherentImpact: Number(newRisk.inherentImpact) || 3,
      inherentLikelihood: Number(newRisk.inherentLikelihood) || 3,
      residualImpact: Number(newRisk.residualImpact) || 2,
      residualLikelihood: Number(newRisk.residualLikelihood) || 2,
      trend: newRisk.trend as any,
      kriStatus: newRisk.kriStatus as any,
      mitigatingControls: [],
      appetiteStatus: newRisk.appetiteStatus as any,
      owner: newRisk.owner || "Anonymous Specialist",
      lastAssessed: newRisk.lastAssessed || new Date().toISOString().split("T")[0]
    };

    setRisks([completeRisk, ...risks]);
    setShowAddForm(false);
    // Reset Form state
    setNewRisk({
      code: "RSK-NEW-" + Math.floor(Math.random() * 900 + 100),
      title: "",
      category: "Operational",
      department: "Operations",
      inherentImpact: 3,
      inherentLikelihood: 3,
      residualImpact: 2,
      residualLikelihood: 2,
      trend: "Stable",
      kriStatus: "Green",
      appetiteStatus: "Within",
      owner: "Admin User",
      lastAssessed: new Date().toISOString().split("T")[0]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <ShieldAlert className="h-6 w-6 text-gold" />
            Enterprise Risk Register
          </h2>
          <p className="text-xs text-slate-500 font-medium">Inventory and quantitative monitoring of all mapped corporate threats.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToCSV(risks, "ARAIS_Risk_Inventory")}
            className="px-3.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            Export CSV
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gold text-white font-extrabold rounded text-xs hover:bg-gold-light transition-all shadow-gold-glow"
          >
            <Plus className="h-4 w-4" />
            <span>Identify New Risk</span>
          </button>
        </div>
      </div>

      {/* FORM TO ADD NEW RISK */}
      {showAddForm && (
        <form onSubmit={handleAddRisk} className="glass-panel p-6 border border-gold/30 bg-white space-y-4 animate-fade-in">
          <div className="flex items-center gap-1.5 text-gold text-sm font-bold pb-2 border-b border-slate-200">
            <Sparkles className="h-4 w-4 text-gold" />
            <span>AI-Assisted Risk Mapping Form</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Risk Code</label>
              <input
                type="text"
                value={newRisk.code}
                onChange={(e) => setNewRisk({ ...newRisk, code: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-gold/50 outline-none text-slate-900 font-semibold"
                required
              />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Risk Title / Description</label>
              <input
                type="text"
                placeholder="Identify potential threat, impact vector and source..."
                value={newRisk.title}
                onChange={(e) => setNewRisk({ ...newRisk, title: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-gold/50 outline-none text-slate-900 font-semibold"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Category</label>
              <select
                value={newRisk.category}
                onChange={(e) => setNewRisk({ ...newRisk, category: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-gold/50 outline-none text-slate-900 font-semibold"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Department</label>
              <select
                value={newRisk.department}
                onChange={(e) => setNewRisk({ ...newRisk, department: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-gold/50 outline-none text-slate-900 font-semibold"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Risk Owner</label>
              <input
                type="text"
                value={newRisk.owner}
                onChange={(e) => setNewRisk({ ...newRisk, owner: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-gold/50 outline-none text-slate-900 font-semibold"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Inherent Score (Impact &times; Likelihood)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Imp"
                  min="1" max="4"
                  value={newRisk.inherentImpact}
                  onChange={(e) => setNewRisk({ ...newRisk, inherentImpact: Number(e.target.value) })}
                  className="w-1/2 bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-gold/50 outline-none text-slate-900 font-semibold"
                />
                <input
                  type="number"
                  placeholder="Like"
                  min="1" max="4"
                  value={newRisk.inherentLikelihood}
                  onChange={(e) => setNewRisk({ ...newRisk, inherentLikelihood: Number(e.target.value) })}
                  className="w-1/2 bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-gold/50 outline-none text-slate-900 font-semibold"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Residual Score (Impact &times; Likelihood)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Imp"
                  min="1" max="4"
                  value={newRisk.residualImpact}
                  onChange={(e) => setNewRisk({ ...newRisk, residualImpact: Number(e.target.value) })}
                  className="w-1/2 bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-gold/50 outline-none text-slate-900 font-semibold"
                />
                <input
                  type="number"
                  placeholder="Like"
                  min="1" max="4"
                  value={newRisk.residualLikelihood}
                  onChange={(e) => setNewRisk({ ...newRisk, residualLikelihood: Number(e.target.value) })}
                  className="w-1/2 bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-gold/50 outline-none text-slate-900 font-semibold"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Appetite Status</label>
              <select
                value={newRisk.appetiteStatus}
                onChange={(e) => setNewRisk({ ...newRisk, appetiteStatus: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-gold/50 outline-none text-slate-900 font-semibold"
              >
                <option value="Within">Within Appetite</option>
                <option value="Near Threshold">Near Threshold</option>
                <option value="Breached">Breached Appetite</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3.5 py-1.5 rounded text-xs border border-slate-200 text-slate-500 hover:bg-slate-55 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded text-xs bg-gold text-white font-extrabold hover:bg-gold-light transition-all"
            >
              Submit to Register
            </button>
          </div>
        </form>
      )}

      {/* FILTER CONTROL PANEL */}
      <div className="glass-panel p-5 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search code or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-gold/30"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-3 w-3 text-gold" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-gold/30 text-slate-700 font-semibold"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Department filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-3 w-3 text-gold" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-gold/30 text-slate-700 font-semibold"
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Appetite status filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-3 w-3 text-gold" />
          <select
            value={selectedAppetite}
            onChange={(e) => setSelectedAppetite(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-gold/30 text-slate-700 font-semibold"
          >
            <option value="All">All Appetite States</option>
            <option value="Within">Within Appetite</option>
            <option value="Near Threshold">Near Threshold</option>
            <option value="Breached">Breached Appetite</option>
          </select>
        </div>
      </div>

      {/* RISK TABLE */}
      <div className="glass-panel p-6 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="pb-3">Code</th>
                <th className="pb-3">Risk Title & Details</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Department</th>
                <th className="pb-3 text-center">Inherent Score</th>
                <th className="pb-3 text-center">Residual Score</th>
                <th className="pb-3 text-center">Trend</th>
                <th className="pb-3 text-center">KRI</th>
                <th className="pb-3 text-center">Appetite</th>
                <th className="pb-3 text-right">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRisks.map((r) => {
                const inherentScore = r.inherentImpact * r.inherentLikelihood;
                const residualScore = r.residualImpact * r.residualLikelihood;

                const getScoreColor = (score: number) => {
                  if (score >= 12) return "text-risk-critical font-extrabold";
                  if (score >= 8) return "text-risk-high font-bold";
                  if (score >= 4) return "text-risk-medium";
                  return "text-green-700";
                };

                let appBadge = "bg-green-50 text-green-700 border border-green-200";
                if (r.appetiteStatus === "Breached") appBadge = "bg-red-50 text-risk-high border border-red-200";
                else if (r.appetiteStatus === "Near Threshold") appBadge = "bg-yellow-50 text-risk-medium border border-yellow-250";

                let kriBadge = "bg-green-50 text-green-700";
                if (r.kriStatus === "Red") kriBadge = "bg-red-50 text-risk-high";
                else if (r.kriStatus === "Amber") kriBadge = "bg-yellow-50 text-risk-medium";

                return (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-bold text-slate-900 whitespace-nowrap">{r.code}</td>
                    <td className="py-4 font-medium pr-6 max-w-sm">
                      <div className="text-slate-900 font-semibold">{r.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Last assessed: {r.lastAssessed}</div>
                    </td>
                    <td className="py-4 font-bold text-slate-700">{r.category}</td>
                    <td className="py-4 text-slate-500 font-medium">{r.department}</td>
                    <td className={`py-4 text-center font-bold ${getScoreColor(inherentScore)}`}>
                      {inherentScore} <span className="text-[9px] text-slate-400 font-medium">({r.inherentImpact}x{r.inherentLikelihood})</span>
                    </td>
                    <td className={`py-4 text-center font-bold ${getScoreColor(residualScore)}`}>
                      {residualScore} <span className="text-[9px] text-slate-400 font-medium">({r.residualImpact}x{r.residualLikelihood})</span>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex justify-center">
                        {r.trend === "Increasing" ? (
                          <div title="Increasing exposure"><TrendingUp className="h-4.5 w-4.5 text-risk-high" /></div>
                        ) : r.trend === "Decreasing" ? (
                          <div title="Decreasing exposure"><TrendingDown className="h-4.5 w-4.5 text-green-700" /></div>
                        ) : (
                          <div title="Stable exposure"><Minus className="h-4.5 w-4.5 text-slate-400" /></div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${kriBadge}`}>{r.kriStatus}</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${appBadge}`}>{r.appetiteStatus}</span>
                    </td>
                    <td className="py-4 text-right font-semibold text-slate-700 whitespace-nowrap">{r.owner}</td>
                  </tr>
                );
              })}
              {filteredRisks.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400 italic">
                    No risk items found matching the selected search query or filter tags.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
