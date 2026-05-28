import React, { useState } from "react";
import { Role, AUDIT_FINDINGS_REGISTRY, AuditFinding } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FolderLock, Filter, Plus, Calendar, User, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FindingsTrackerProps {
  currentRole: Role;
}

export default function FindingsTracker({ currentRole }: FindingsTrackerProps) {
  const [findings, setFindings] = useState<AuditFinding[]>(AUDIT_FINDINGS_REGISTRY);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedFinding, setSelectedFinding] = useState<AuditFinding | null>(null);
  
  // Quick actions
  const [remediationInputs, setRemediationInputs] = useState<Record<string, string>>({});
  
  const handleUpdateStatus = (id: string, newStatus: AuditFinding["status"]) => {
    setFindings(prev => prev.map(f => f.id === id ? { ...f, status: newStatus } : f));
    if (selectedFinding && selectedFinding.id === id) {
      setSelectedFinding(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const filteredFindings = findings.filter(f => {
    if (filterStatus === "ALL") return true;
    return f.status === filterStatus;
  });

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Findings List (Spans 2) */}
        <Card className="xl:col-span-2 bg-[#121826]/80 border-white/5 shadow-xl">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
                <FolderLock className="w-4 h-4 text-[#db0011]" />
                Corporate Issue & Finding Registry
              </CardTitle>
              <CardDescription className="text-[10px] text-[#94a3b8]">
                Audit universe deficiencies, management action plans, and remediation statuses
              </CardDescription>
            </div>
            
            {/* Status filters */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#94a3b8]" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#1b2235] border border-white/5 rounded text-[10px] px-2 py-1 text-white outline-none"
              >
                <option value="ALL">Status: All</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="PENDING_VALIDATION">Pending Verification</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] w-full">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-[#0b0f19]/20 font-mono text-[9px] text-[#94a3b8] uppercase tracking-wider">
                    <th className="p-3.5 pl-6">ID</th>
                    <th className="p-3.5">Finding Defect</th>
                    <th className="p-3.5">Audit Source</th>
                    <th className="p-3.5 text-center">Severity</th>
                    <th className="p-3.5">Assigned Owner</th>
                    <th className="p-3.5 pr-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[11px]">
                  {filteredFindings.map((finding) => (
                    <tr
                      key={finding.id}
                      onClick={() => setSelectedFinding(finding)}
                      className={cn(
                        "hover:bg-[#1b2235]/20 transition-colors cursor-pointer",
                        selectedFinding?.id === finding.id && "bg-[#1b2235]/40"
                      )}
                    >
                      <td className="p-3.5 pl-6 font-mono font-semibold text-[#db0011]">
                        {finding.id}
                      </td>
                      <td className="p-3.5 font-medium text-white max-w-[220px] truncate" title={finding.title}>
                        {finding.title}
                      </td>
                      <td className="p-3.5 text-slate-300 max-w-[150px] truncate" title={finding.source}>
                        {finding.source}
                      </td>
                      <td className="p-3.5 text-center">
                        <span
                          className={cn(
                            "px-1.5 py-0.2 rounded text-[9px] font-bold inline-block border",
                            finding.severity === "CRITICAL" && "bg-rose-500/10 text-rose-400 border-rose-500/20",
                            finding.severity === "HIGH" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                            finding.severity === "MEDIUM" && "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
                            finding.severity === "LOW" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          )}
                        >
                          {finding.severity}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400 truncate max-w-[120px]">
                        {finding.owner}
                      </td>
                      <td className="p-3.5 pr-6 text-right">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-[9px] font-semibold border",
                            finding.status === "CLOSED" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                            finding.status === "PENDING_VALIDATION" && "bg-blue-500/10 text-blue-400 border-blue-500/20",
                            finding.status === "IN_PROGRESS" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                            finding.status === "OPEN" && "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          )}
                        >
                          {finding.status.replace("_", " ")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Detailed Inspection & Action Panel */}
        <Card className="bg-[#121826]/80 border-white/5 shadow-xl flex flex-col justify-between">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
            <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#db0011]" />
              Issue Remediation Command
            </CardTitle>
            <CardDescription className="text-[10px] text-[#94a3b8]">
              Mitigate identified gaps, assign owners, and track sign-off audits
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col justify-between text-left">
            {selectedFinding ? (
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between">
                  <Badge className="font-mono text-[9px] bg-[#db0011]/10 text-[#db0011] border-[#db0011]/25 rounded">
                    {selectedFinding.id}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Due: {selectedFinding.dueDate}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-[#94a3b8] uppercase tracking-wider">Defect description</span>
                  <h4 className="text-xs font-semibold text-white leading-normal">
                    {selectedFinding.title}
                  </h4>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-[#94a3b8] uppercase tracking-wider">Remediation Action Plan</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {selectedFinding.remediationPlan}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#1677ff]" />
                    Assignee: <span className="text-white ml-1">{selectedFinding.owner}</span>
                  </div>
                  <div>Source: <span className="text-white">{selectedFinding.source}</span></div>
                </div>

                {/* Mitigation controls */}
                {selectedFinding.status !== "CLOSED" && (
                  <div className="pt-4 border-t border-white/5 space-y-2">
                    <span className="text-[8px] font-mono text-[#94a3b8] uppercase tracking-wider block">Remediator Actions</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedFinding.status === "OPEN" && (
                        <button
                          onClick={() => handleUpdateStatus(selectedFinding.id, "IN_PROGRESS")}
                          className="bg-[#1b2235] hover:bg-[#1b2235]/80 text-white font-medium text-[10px] px-2.5 py-1.5 rounded transition-all outline-none border border-white/5"
                        >
                          Start Remediation
                        </button>
                      )}
                      {selectedFinding.status === "IN_PROGRESS" && (
                        <button
                          onClick={() => handleUpdateStatus(selectedFinding.id, "PENDING_VALIDATION")}
                          className="bg-[#1677ff]/10 hover:bg-[#1677ff] text-[#1677ff] hover:text-white font-medium text-[10px] px-2.5 py-1.5 rounded transition-all outline-none border border-[#1677ff]/20 hover:border-transparent"
                        >
                          Submit for Audit Review
                        </button>
                      )}
                      {selectedFinding.status === "PENDING_VALIDATION" && (
                        <button
                          onClick={() => handleUpdateStatus(selectedFinding.id, "CLOSED")}
                          className="bg-emerald-500/10 hover:bg-emerald-500/90 text-emerald-400 hover:text-white font-medium text-[10px] px-2.5 py-1.5 rounded transition-all outline-none border border-emerald-500/20 hover:border-transparent"
                        >
                          Close & Sign-off Finding
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic py-16 text-center">
                Select an audit finding row on the registry list to review root causes and trigger remediation scripts
              </div>
            )}

            <div className="pt-4 border-t border-white/5 text-[9px] text-[#475569] font-mono leading-relaxed mt-4">
              Access Matrix: Level 4 clearances required to close findings. Analysts may transition items to validation phases.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
