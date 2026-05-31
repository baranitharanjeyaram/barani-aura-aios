"use client";

import React, { useState } from "react";
import { MOCK_CONTROLS } from "@/components/mockData";
import { Control } from "@/types";
import { exportToCSV } from "@/utils/export";
import {
  Sliders,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileUp,
  Search,
  Filter,
  Sparkles,
  Calendar
} from "lucide-react";

export default function ControlsMonitoring() {
  const [controls, setControls] = useState<Control[]>(MOCK_CONTROLS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEffectiveness, setSelectedEffectiveness] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [uploadingControl, setUploadingControl] = useState<string | null>(null);

  // Statistics
  const total = controls.length;
  const effective = controls.filter((c) => c.effectiveness === "Effective").length;
  const partially = controls.filter((c) => c.effectiveness === "Partially Effective").length;
  const ineffective = controls.filter((c) => c.effectiveness === "Ineffective").length;
  const overdueEvidence = controls.filter((c) => c.evidenceStatus === "Overdue").length;

  // Filter
  const filteredControls = controls.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEff = selectedEffectiveness === "All" || c.effectiveness === selectedEffectiveness;
    const matchesType = selectedType === "All" || c.type === selectedType;
    return matchesSearch && matchesEff && matchesType;
  });

  // Simulating Evidence submission
  const handleUploadEvidence = (controlId: string) => {
    setUploadingControl(controlId);
    setTimeout(() => {
      setControls((prev) =>
        prev.map((c) =>
          c.id === controlId
            ? {
                ...c,
                evidenceStatus: "Submitted",
                effectiveness: "Effective",
                deficiencyNote: undefined,
                maturityScore: Math.min(5, c.maturityScore + 0.5),
                lastTested: new Date().toISOString().split("T")[0]
              }
            : c
        )
      );
      setUploadingControl(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <Sliders className="h-6 w-6 text-gold" />
            Continuous Control Monitoring (CCM)
          </h2>
          <p className="text-xs text-slate-500 font-medium">Continuous auditing, control testing logs, and automated evidence management.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCSV(controls, "ARAIS_Control_Inventory")}
            className="px-3.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            Export Inventory
          </button>
        </div>
      </div>

      {/* Control Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="glass-panel p-4 flex items-center justify-between bg-white">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Controls</span>
            <span className="text-2xl font-bold block mt-1 text-slate-900">{total}</span>
          </div>
          <Sliders className="h-5 w-5 text-slate-400" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between bg-white border-l-4 border-l-risk-low">
          <div>
            <span className="text-[10px] text-green-700 font-bold uppercase tracking-wider">Effective</span>
            <span className="text-2xl font-bold block mt-1 text-green-755">{effective}</span>
          </div>
          <CheckCircle className="h-5 w-5 text-green-600" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between bg-white border-l-4 border-l-risk-medium">
          <div>
            <span className="text-[10px] text-risk-medium font-bold uppercase tracking-wider">Partially Effective</span>
            <span className="text-2xl font-bold block mt-1 text-risk-medium">{partially}</span>
          </div>
          <AlertTriangle className="h-5 w-5 text-risk-medium" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between bg-white border-l-4 border-l-risk-high">
          <div>
            <span className="text-[10px] text-risk-high font-bold uppercase tracking-wider">Ineffective</span>
            <span className="text-2xl font-bold block mt-1 text-risk-high">{ineffective}</span>
          </div>
          <XCircle className="h-5 w-5 text-risk-high" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between bg-white border border-gold/15">
          <div>
            <span className="text-[10px] text-gold font-bold uppercase tracking-wider">Evidence SLA Overdue</span>
            <span className="text-2xl font-bold block mt-1 text-gold">{overdueEvidence}</span>
          </div>
          <Calendar className="h-5 w-5 text-gold" />
        </div>
      </div>

      {/* Search & Filters */}
      <div className="glass-panel p-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search control code, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-55 border border-slate-200 rounded pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-gold/30"
          />
        </div>

        {/* Effectiveness */}
        <div className="flex items-center gap-2">
          <Filter className="h-3 w-3 text-gold" />
          <select
            value={selectedEffectiveness}
            onChange={(e) => setSelectedEffectiveness(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none text-slate-700 font-bold"
          >
            <option value="All">All Effectiveness States</option>
            <option value="Effective">Effective</option>
            <option value="Partially Effective">Partially Effective</option>
            <option value="Ineffective">Ineffective</option>
          </select>
        </div>

        {/* Control Type */}
        <div className="flex items-center gap-2">
          <Filter className="h-3 w-3 text-gold" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none text-slate-700 font-bold"
          >
            <option value="All">All Control Types</option>
            <option value="Preventative">Preventative</option>
            <option value="Detective">Detective</option>
            <option value="Corrective">Corrective</option>
          </select>
        </div>
      </div>

      {/* Inventory table */}
      <div className="glass-panel p-6 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="pb-3">Code</th>
                <th className="pb-3">Control Title</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Frequency</th>
                <th className="pb-3 text-center">Effectiveness</th>
                <th className="pb-3 text-center">Maturity</th>
                <th className="pb-3 text-center">Evidence SLA</th>
                <th className="pb-3 text-center">Last Tested</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredControls.map((c) => {
                let effBadge = "bg-green-50 text-green-700 border border-green-200";
                if (c.effectiveness === "Ineffective") effBadge = "bg-red-50 text-risk-high border border-red-200";
                else if (c.effectiveness === "Partially Effective") effBadge = "bg-yellow-50 text-risk-medium border border-yellow-250";

                let evBadge = "text-green-700";
                if (c.evidenceStatus === "Overdue") evBadge = "text-risk-high font-extrabold";
                else if (c.evidenceStatus === "Pending") evBadge = "text-risk-medium";

                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-bold text-slate-900 whitespace-nowrap">{c.code}</td>
                    <td className="py-4 font-medium pr-6 max-w-sm">
                      <div className="text-slate-900 font-semibold">{c.title}</div>
                      {c.deficiencyNote && (
                        <div className="text-[10px] text-risk-high mt-1 bg-red-50 border border-red-200 px-2 py-1 rounded font-semibold">
                          <strong>Deficiency:</strong> {c.deficiencyNote}
                        </div>
                      )}
                    </td>
                    <td className="py-4 font-bold text-slate-700">{c.type}</td>
                    <td className="py-4 text-slate-500 font-medium">{c.frequency}</td>
                    <td className="py-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${effBadge}`}>{c.effectiveness}</span>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                          <div className="bg-gold h-full" style={{ width: `${(c.maturityScore / 5) * 100}%` }} />
                        </div>
                        <span className="font-bold text-[10px] text-slate-700">{c.maturityScore.toFixed(1)}/5.0</span>
                      </div>
                    </td>
                    <td className={`py-4 text-center font-bold text-[10px] ${evBadge}`}>
                      <div>{c.evidenceStatus}</div>
                      <div className="text-[9px] text-slate-400 font-bold mt-0.5">Due: {c.evidenceDueDate}</div>
                    </td>
                    <td className="py-4 text-center text-slate-500 font-medium">{c.lastTested}</td>
                    <td className="py-4 text-right font-medium">
                      {c.evidenceStatus !== "Submitted" ? (
                        <button
                          onClick={() => handleUploadEvidence(c.id)}
                          disabled={uploadingControl !== null}
                          className="flex items-center gap-1 px-3 py-1 bg-yellow-50 border border-gold/30 rounded text-[10px] text-gold font-extrabold hover:bg-gold hover:text-white transition-all shadow-sm"
                        >
                          <FileUp className="h-3 w-3" />
                          <span>{uploadingControl === c.id ? "Syncing..." : "Submit SLA"}</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Compliant</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
