"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, Brain, Layers, Cpu, AlertTriangle } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from "recharts";

export default function AnalyticsCenter() {
  const [activeScenario, setActiveScenario] = useState("Baseline");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Risk Trend Chart data based on Scenario
  const getTrendData = () => {
    const baseline = [
      { month: "Jan", Inherent: 12, Residual: 5 },
      { month: "Feb", Inherent: 13, Residual: 5 },
      { month: "Mar", Inherent: 12, Residual: 4 },
      { month: "Apr", Inherent: 14, Residual: 6 },
      { month: "May", Inherent: 15, Residual: 6.5 },
    ];

    if (activeScenario === "CyberThreat") {
      return baseline.map(d => ({
        ...d,
        Inherent: d.Inherent + 4,
        Residual: d.Residual + 2.5
      }));
    }

    if (activeScenario === "Automation") {
      return baseline.map(d => ({
        ...d,
        Residual: Math.max(1.5, d.Residual - 2)
      }));
    }

    return baseline;
  };

  // 2. Compliance Forecast over next 6 months
  const getComplianceForecast = () => {
    const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
    let basePct = 83;

    return months.map((m, idx) => {
      let pct = basePct;
      if (activeScenario === "CyberThreat") {
        pct = Math.max(50, basePct - (idx + 1) * 3);
      } else if (activeScenario === "Automation") {
        pct = Math.min(100, basePct + (idx + 1) * 2.8);
      } else {
        pct = Math.min(95, basePct + (idx + 1) * 0.8);
      }
      return { month: m, ComplianceForecast: Math.round(pct) };
    });
  };

  // 3. Control Failure Probability by Department
  const getFailureProb = () => {
    const departments = [
      { name: "Finance", prob: 12 },
      { name: "IT & Security", prob: 38 },
      { name: "Operations", prob: 18 },
      { name: "Legal", prob: 8 },
      { name: "HR", prob: 28 },
    ];

    if (activeScenario === "CyberThreat") {
      return departments.map(d => ({
        ...d,
        prob: d.name === "IT & Security" ? 64 : d.prob + 8
      }));
    }

    if (activeScenario === "Automation") {
      return departments.map(d => ({
        ...d,
        prob: Math.round(d.prob * 0.3)
      }));
    }

    return departments;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <BarChart3 className="h-6 w-6 text-gold" />
            Predictive Analytics & Intelligence Center
          </h2>
          <p className="text-xs text-slate-500 font-medium">Run predictive risk modeling, forecast compliance postures, and simulate risk scenarios using AI models.</p>
        </div>
      </div>

      {/* SCENARIO SIMULATOR SELECTOR CARD */}
      <div className="glass-panel p-5 bg-white border-gold/15">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-gold" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">ARAIS Scenario Modeling Engine</h3>
        </div>
        <p className="text-xs text-slate-500 max-w-2xl leading-normal mb-4 font-semibold">
          Select a hypothetical threat scenario below to run Monte Carlo simulations. The predictive analytics graphs below will recalculate to display forecasted residual exposures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveScenario("Baseline")}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              activeScenario === "Baseline"
                ? "bg-slate-50 border-gold text-gold shadow-gold-glow"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-350"
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>1. Baseline Scenario</span>
              <Layers className="h-3.5 w-3.5 text-slate-400" />
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">Standard business operations running active controls inventory and manual audit testing workflows.</p>
          </button>

          <button
            onClick={() => setActiveScenario("CyberThreat")}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              activeScenario === "CyberThreat"
                ? "bg-red-50 border-red-500 text-red-700"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-350"
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>2. External Cyber Shift</span>
              <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">Simulate a 50% increase in state-sponsored API vulnerability scans and DDoS attacks on cloud nodes.</p>
          </button>

          <button
            onClick={() => setActiveScenario("Automation")}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              activeScenario === "Automation"
                ? "bg-green-50 border-green-550 text-green-700"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-350"
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>3. Full CCM Automation</span>
              <Cpu className="h-3.5 w-3.5 text-green-600" />
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">Automate continuous control testing via API integration, immediately patching deficient signature metrics.</p>
          </button>
        </div>
      </div>

      {/* GRAPH GRIDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Risk Trend Line chart */}
        <div className="glass-panel p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-slate-900">Projected Exposure Severity Trends</h3>
            <span className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold">
              Scenario: {activeScenario}
            </span>
          </div>
          {isMounted ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getTrendData()} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "8px" }}
                    labelStyle={{ color: "#0F172A", fontWeight: "bold" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px", color: "#334155" }} />
                  <Line type="monotone" dataKey="Inherent" stroke="#C62828" strokeWidth={2.5} name="Inherent Risk Index" />
                  <Line type="monotone" dataKey="Residual" stroke="#2E7D32" strokeWidth={2.5} name="Residual Risk Index" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 bg-slate-50 rounded flex items-center justify-center text-slate-400">Loading Chart...</div>
          )}
        </div>

        {/* Compliance Area chart */}
        <div className="glass-panel p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-slate-900">6-Month Compliance Score Forecast</h3>
            <span className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold">
              Scenario: {activeScenario}
            </span>
          </div>
          {isMounted ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getComplianceForecast()} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} domain={[40, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "8px" }}
                    labelStyle={{ color: "#0F172A", fontWeight: "bold" }}
                  />
                  <Area type="monotone" dataKey="ComplianceForecast" stroke="#C9A227" fill="rgba(201, 162, 39, 0.15)" strokeWidth={2} name="Forecast Compliance %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 bg-slate-50 rounded flex items-center justify-center text-slate-400">Loading Chart...</div>
          )}
        </div>

        {/* Failure probability bar chart */}
        <div className="glass-panel p-6 lg:col-span-2 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-slate-900">Control Failure Probability Forecast</h3>
            <span className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold">
              Scenario: {activeScenario}
            </span>
          </div>
          {isMounted ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getFailureProb()} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "8px" }}
                    labelStyle={{ color: "#0F172A", fontWeight: "bold" }}
                  />
                  <Bar dataKey="prob" fill="#C62828" radius={[4, 4, 0, 0]} name="Failure Probability %">
                    {getFailureProb().map((entry, index) => {
                      const color = entry.prob > 40 ? "#8E0000" : entry.prob > 25 ? "#C62828" : "#2E7D32";
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 bg-slate-55 rounded flex items-center justify-center text-slate-400">Loading Chart...</div>
          )}
        </div>
      </div>
    </div>
  );
}
