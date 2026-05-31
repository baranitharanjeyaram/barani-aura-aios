"use client";

import React, { useState } from "react";
import { MOCK_COMPLIANCE } from "@/components/mockData";
import { ComplianceObligation } from "@/types";
import { exportToCSV } from "@/utils/export";
import {
  FileCheck,
  Search,
  Filter,
  CheckSquare,
  Square,
  AlertOctagon,
  Sparkles
} from "lucide-react";

export default function ComplianceMonitoring() {
  const [obligations, setObligations] = useState<ComplianceObligation[]>(MOCK_COMPLIANCE);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Mock pending action items mapping
  const [pendingActions, setPendingActions] = useState([
    { id: "act-01", regId: "comp-002", title: "Complete API data residency audit logs", resolved: false },
    { id: "act-02", regId: "comp-002", title: "Establish right-to-be-forgotten webhook trigger", resolved: false },
    { id: "act-03", regId: "comp-003", title: "Configure secondary VPC firewalls", resolved: false },
    { id: "act-04", regId: "comp-005", title: "Establish DORA third-party software registry", resolved: false },
    { id: "act-05", regId: "comp-005", title: "Review ICT vulnerability scanning metrics", resolved: false },
    { id: "act-06", regId: "comp-006", title: "Perform annual information security training audit", resolved: false },
  ]);

  // Overall compliance score calculation
  const totalObligations = obligations.length;
  const compliantCount = obligations.filter((o) => o.status === "Compliant").length;
  const overallScore = Math.round(
    obligations.reduce((acc, curr) => acc + curr.completionPct, 0) / totalObligations
  );

  // Filters
  const filteredObligations = obligations.filter((o) => {
    const matchesSearch = o.regulation.toLowerCase().includes(searchTerm.toLowerCase()) || o.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Action checklist resolution simulation
  const handleResolveAction = (actionId: string, regId: string) => {
    let isNowResolved = false;
    const updatedActions = pendingActions.map((act) => {
      if (act.id === actionId) {
        isNowResolved = !act.resolved;
        return { ...act, resolved: isNowResolved };
      }
      return act;
    });
    setPendingActions(updatedActions);

    setObligations((prev) =>
      prev.map((o) => {
        if (o.id === regId) {
          const modifier = isNowResolved ? 1 : -1;
          const openModifier = isNowResolved ? -1 : 1;
          const nextPct = Math.min(100, Math.max(0, o.completionPct + modifier * 10));
          const nextActions = Math.max(0, o.openActions + openModifier);
          
          let nextStatus = o.status;
          if (nextPct === 100) nextStatus = "Compliant";
          else if (nextPct > 50) nextStatus = "In Progress";
          else nextStatus = "Non-Compliant";

          return {
            ...o,
            completionPct: nextPct,
            openActions: nextActions,
            status: nextStatus
          };
        }
        return o;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <FileCheck className="h-6 w-6 text-gold" />
            Regulatory Compliance Operations
          </h2>
          <p className="text-xs text-slate-500 font-medium">Manage statutory mandates, framework mappings, and remediation action items.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCSV(obligations, "ARAIS_Regulatory_Obligations")}
            className="px-3.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            Export Compliance Data
          </button>
        </div>
      </div>

      {/* Compliance Overview section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Compliance Dashboard Dial - Col 4 */}
        <div className="lg:col-span-4 glass-panel p-6 flex flex-col items-center justify-between text-center bg-white">
          <div className="w-full">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Overall Compliance Posture</h3>
            
            {/* SVG Arc Progress Dial */}
            <div className="relative h-44 w-44 mx-auto flex items-center justify-center">
              <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-100 fill-none"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-gold fill-none transition-all duration-1000"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - overallScore / 100)}`}
                />
              </svg>
              <div>
                <span className="text-4xl font-extrabold text-slate-900">{overallScore}%</span>
                <span className="text-[10px] text-slate-400 block mt-1 uppercase font-bold">Compliant</span>
              </div>
            </div>
          </div>

          <div className="w-full mt-4 border-t border-slate-100 pt-4 flex justify-around text-xs font-semibold">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Mandates</span>
              <span className="text-slate-900 text-lg font-black">{totalObligations}</span>
            </div>
            <div className="border-l border-slate-200 h-8" />
            <div>
              <span className="text-green-700 block text-[10px] uppercase font-bold">Healthy</span>
              <span className="text-green-700 text-lg font-black">{compliantCount}</span>
            </div>
            <div className="border-l border-slate-200 h-8" />
            <div>
              <span className="text-risk-high block text-[10px] uppercase font-bold">Deficient</span>
              <span className="text-risk-high text-lg font-black">{totalObligations - compliantCount}</span>
            </div>
          </div>
        </div>

        {/* Pending Action Plans - Col 8 */}
        <div className="lg:col-span-8 glass-panel p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-gold animate-pulse" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Remediation Action Plans</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-bold">Click items to complete action plan</span>
            </div>

            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {pendingActions.map((act) => {
                const parentObl = obligations.find((o) => o.id === act.regId);
                return (
                  <div
                    key={act.id}
                    onClick={() => handleResolveAction(act.id, act.regId)}
                    className={`p-3 rounded-lg border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                      act.resolved
                        ? "bg-slate-50 border-slate-100 text-slate-400 opacity-60"
                        : "bg-slate-50 border-slate-200 hover:border-gold/30 text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {act.resolved ? (
                        <CheckSquare className="h-4.5 w-4.5 text-green-700 shrink-0" />
                      ) : (
                        <Square className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                      )}
                      <div>
                        <p className={`text-xs font-bold ${act.resolved ? "line-through text-slate-400" : "text-slate-900"}`}>
                          {act.title}
                        </p>
                        <span className="text-[9px] text-gold uppercase font-extrabold mt-0.5 block">
                          Scope: {parentObl?.regulation || "Global Mandate"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">
                      {act.resolved ? "Resolved" : "Action Pending"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-4 bg-slate-50 p-2.5 rounded border border-slate-200 font-medium">
            <AlertOctagon className="h-4 w-4 text-gold shrink-0" />
            <span>Resolving action plans will immediately feed evidence indicators and increment framework completion scores.</span>
          </div>
        </div>
      </div>

      {/* Obligations Grid */}
      <div className="glass-panel p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900">Regulatory Obligations & Framework Mapping</h3>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Filter obligations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded pl-9 pr-3 py-1.5 text-xs outline-none text-slate-900 font-semibold"
              />
            </div>
            
            {/* Status Select */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none text-slate-700 font-bold"
            >
              <option value="All">All Compliance States</option>
              <option value="Compliant">Compliant</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Non-Compliant">Non-Compliant</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredObligations.map((o) => {
            let statusColor = "bg-green-50 text-green-700 border border-green-200";
            if (o.status === "Non-Compliant") statusColor = "bg-red-50 text-risk-high border border-red-200";
            else if (o.status === "In Progress") statusColor = "bg-yellow-50 text-risk-medium border border-yellow-250";
            else if (o.status === "Under Review") statusColor = "bg-slate-100 text-slate-700 border border-slate-300";

            return (
              <div key={o.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-350 transition-colors flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-extrabold text-gold tracking-widest uppercase block">{o.regulation}</span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{o.title}</h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${statusColor}`}>{o.status}</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-bold">Framework Checklist Coverage</span>
                    <span className="text-slate-900 font-extrabold">{o.completionPct}%</span>
                  </div>
                  <div className="w-full bg-slate-150 h-1.5 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-gold h-full rounded-full transition-all duration-500" style={{ width: `${o.completionPct}%` }} />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] border-t border-slate-200/80 pt-3">
                  <span className="text-slate-400 font-bold uppercase">SLA Due Date: {o.dueDate}</span>
                  <span className="text-slate-600 font-extrabold bg-slate-200 px-2 py-0.5 rounded">
                    {o.openActions} Actions Pending
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
