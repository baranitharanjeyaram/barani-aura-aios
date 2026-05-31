"use client";

import React, { useState } from "react";
import { MOCK_RISKS, MOCK_CONTROLS, MOCK_COMPLIANCE, MOCK_AUDITS } from "@/components/mockData";
import { generateAiResponse } from "@/utils/mockAi";
import { triggerPrint } from "@/utils/export";
import {
  Briefcase,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Download,
  AlertTriangle,
  TrendingDown,
  Building,
  FileBadge
} from "lucide-react";

export default function ExecutiveMIS() {
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      const response = generateAiResponse("board-ready insights");
      setGeneratedReport(response.message);
      setGenerating(false);
    }, 2000);
  };

  // Strategic KPI indicators
  const totalRisksCount = MOCK_RISKS.length;
  const averageMaturity = (
    MOCK_CONTROLS.reduce((acc, curr) => acc + curr.maturityScore, 0) / MOCK_CONTROLS.length
  ).toFixed(2);
  const compliantPercent = Math.round(
    MOCK_COMPLIANCE.reduce((acc, curr) => acc + curr.completionPct, 0) / MOCK_COMPLIANCE.length
  );

  const strategicRecommendations = [
    {
      id: "rec-01",
      title: "Establish automated SOC-3 sovereign cloud API token checks",
      driver: "Driven by RSK-CYB-001 (Sovereign cloud breach - Breached status)",
      remediation: "Integrate continuous IAM validation inside the Kubernetes ingress controller.",
      cost: "Medium",
      timeline: "Q3 2026",
    },
    {
      id: "rec-02",
      title: "Bloomberg Terminal yield curve API automation",
      driver: "Driven by AUD-FIN-2026-02 (Treasury Interest Rate audit finding)",
      remediation: "Deploy Python extraction script pointing to treasury API end-point.",
      cost: "Low",
      timeline: "Q2 2026",
    },
    {
      id: "rec-03",
      title: "DORA Framework third-party vendor risk ledger setup",
      driver: "Driven by REG-DORA-ICT (45% compliance completion rate)",
      remediation: "Onboard standard cloud compliance software vendor assessment scripts.",
      cost: "High",
      timeline: "Q4 2026",
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <Briefcase className="h-6 w-6 text-gold" />
            Executive MIS Center
          </h2>
          <p className="text-xs text-slate-500 font-medium">Board-level reporting, strategic governance indicator indices, and AI-compiled summaries.</p>
        </div>
        <div className="flex items-center gap-2">
          {generatedReport && (
            <button
              onClick={triggerPrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Print Board Pack (PDF)</span>
            </button>
          )}
        </div>
      </div>

      {/* Strategic Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 bg-white">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Board Risk Appetite</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-extrabold text-risk-high">2 Breached</span>
            <TrendingUp className="h-4.5 w-4.5 text-risk-high" />
          </div>
          <p className="text-[9px] text-slate-400 mt-2 font-medium">Cyber API Leakage & Digital Asset Regulation.</p>
        </div>
        <div className="glass-panel p-5 bg-white">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Control Assurance Index</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-extrabold text-green-700">{averageMaturity} / 5.0</span>
            <CheckCircle className="h-4.5 w-4.5 text-green-600" />
          </div>
          <p className="text-[9px] text-slate-400 mt-2 font-medium">Average control maturity score across 8 controls.</p>
        </div>
        <div className="glass-panel p-5 bg-white">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Regulatory Compliance %</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-extrabold text-gold">{compliantPercent}%</span>
            <FileBadge className="h-4.5 w-4.5 text-gold" />
          </div>
          <p className="text-[9px] text-slate-400 mt-2 font-medium">Weighted coverage score across global mandates.</p>
        </div>
        <div className="glass-panel p-5 bg-white">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Audit universe finding closure</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-extrabold text-slate-700">40% Resolved</span>
            <TrendingDown className="h-4.5 w-4.5 text-risk-high" />
          </div>
          <p className="text-[9px] text-slate-400 mt-2 font-medium">2 Closed, 1 Resolved, 2 Open Findings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: AI Board Report Compiler (Col 7) */}
        <div className="lg:col-span-7 glass-panel p-6 flex flex-col justify-between min-h-[450px] bg-white">
          <div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-gold animate-pulse" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">AI Executive Briefing Compiler</h3>
              </div>
              {generatedReport && (
                <button
                  onClick={() => setGeneratedReport(null)}
                  className="text-[10px] text-slate-400 hover:underline font-bold"
                >
                  Reset
                </button>
              )}
            </div>

            {generating ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full border-2 border-gold/20 border-t-2 border-t-gold animate-spin" />
                <p className="text-xs text-gold font-extrabold animate-pulse">Aggregating Risk registers, Controls validation testing, and compliance matrices...</p>
              </div>
            ) : generatedReport ? (
              <div className="p-4 rounded bg-slate-50 border border-slate-200 prose prose-slate max-h-96 overflow-y-auto text-xs font-semibold leading-relaxed">
                <div className="whitespace-pre-line text-slate-700 font-sans">
                  {generatedReport}
                </div>
              </div>
            ) : (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-gold border border-slate-200">
                  <Briefcase className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Generate Custom Board Intelligence Report</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-normal font-medium">
                    This triggers ARAIS to query current risk levels, evidence logs, compliance percentages, and compile a board-ready report.
                  </p>
                </div>
              </div>
            )}
          </div>

          {!generatedReport && !generating && (
            <button
              onClick={handleGenerateReport}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gold text-white font-extrabold text-xs hover:bg-gold-light transition-colors shadow-gold-glow"
            >
              <Sparkles className="h-4 w-4" />
              <span>Compile Executive MIS Briefing</span>
            </button>
          )}
        </div>

        {/* Right: Board Strategic Decisions Matrix (Col 5) */}
        <div className="lg:col-span-5 glass-panel p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
              <Building className="h-4.5 w-4.5 text-gold" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Strategic Recommendations Matrix</h3>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {strategicRecommendations.map((rec) => (
                <div key={rec.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex justify-between text-[9px] font-bold text-gold uppercase mb-1">
                    <span>{rec.timeline} Deadline</span>
                    <span>Cost Impact: {rec.cost}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1.5 leading-snug">{rec.title}</h4>
                  <p className="text-[10px] text-slate-600 leading-normal font-semibold">{rec.remediation}</p>
                  <div className="text-[9px] text-risk-medium italic font-bold mt-2 border-t border-slate-200 pt-1.5">
                    {rec.driver}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-4 mt-4 font-bold">
            Recommendations represent board decisions suggested by ARAIS predictive models to close major governance gaps.
          </div>
        </div>
      </div>
    </div>
  );
}
