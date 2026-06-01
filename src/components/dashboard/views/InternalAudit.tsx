import React from "react";
import { Role, AUDIT_UNIVERSE } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Calendar, UserCheck, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface InternalAuditProps {
  currentRole: Role;
}

export default function InternalAudit({ currentRole }: InternalAuditProps) {
  return (
    <div className="space-y-6 text-left">
      {/* Mini Auditing KPI summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1b2235]/40 border-white/5 p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-[#1677ff]/10 text-[#1677ff] flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-[#94a3b8] font-mono uppercase tracking-wider">Plan Completion</span>
            <span className="text-lg font-bold text-white font-mono">68%</span>
          </div>
        </Card>
        <Card className="bg-[#1b2235]/40 border-white/5 p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-[#db0011]/10 text-[#db0011] flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-[#94a3b8] font-mono uppercase tracking-wider">Active Open Findings</span>
            <span className="text-lg font-bold text-white font-mono">43</span>
          </div>
        </Card>
        <Card className="bg-[#1b2235]/40 border-white/5 p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-[#94a3b8] font-mono uppercase tracking-wider">Overdue Tasks</span>
            <span className="text-lg font-bold text-white font-mono">3</span>
          </div>
        </Card>
        <Card className="bg-[#1b2235]/40 border-white/5 p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-[#94a3b8] font-mono uppercase tracking-wider">Closure Velocity</span>
            <span className="text-lg font-bold text-white font-mono">18.4d</span>
          </div>
        </Card>
      </div>

      {/* Audit Universe Table */}
      <Card className="bg-[#121826]/80 border-white/5 shadow-xl">
        <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
          <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#db0011]" />
            Corporate Audit Universe (FY26 Plan)
          </CardTitle>
          <CardDescription className="text-[10px] text-[#94a3b8]">
            Status of active and planned internal regulatory audit engagements
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 bg-[#0b0f19]/20 font-mono text-[9px] text-[#94a3b8] uppercase tracking-wider">
                <th className="p-3.5 pl-6">ID</th>
                <th className="p-3.5">Audit Engagement Name</th>
                <th className="p-3.5">Target Business Area</th>
                <th className="p-3.5">Progress</th>
                <th className="p-3.5">Phase</th>
                <th className="p-3.5">Lead Auditor</th>
                <th className="p-3.5 text-center">Risk Rating</th>
                <th className="p-3.5 pr-6 text-right">Schedule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[11px]">
              {AUDIT_UNIVERSE.map((audit) => (
                <tr key={audit.id} className="hover:bg-[#1b2235]/25 transition-colors">
                  <td className="p-3.5 pl-6 font-mono text-slate-400">
                    {audit.id}
                  </td>
                  <td className="p-3.5 font-medium text-white max-w-[200px] truncate" title={audit.name}>
                    {audit.name}
                  </td>
                  <td className="p-3.5 text-slate-300">
                    {audit.department}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5 max-w-[120px]">
                      <div className="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#1677ff] h-full rounded-full" style={{ width: `${audit.progress}%` }} />
                      </div>
                      <span className="font-mono text-[10px] text-[#94a3b8]">
                        {audit.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-semibold border",
                        audit.status === "Completed" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                        audit.status === "Reporting" && "bg-blue-500/10 text-blue-400 border-blue-500/20",
                        audit.status === "Fieldwork" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                        audit.status === "Planning" && "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      )}
                    >
                      {audit.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400 font-medium">
                    {audit.leadAuditor}
                  </td>
                  <td className="p-3.5 text-center">
                    <span
                      className={cn(
                        "px-1.5 py-0.2 rounded text-[9px] font-bold inline-block border",
                        audit.riskRating === "Critical" && "bg-rose-500/10 text-rose-500 border-rose-500/20",
                        audit.riskRating === "High" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                        audit.riskRating === "Medium" && "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
                        audit.riskRating === "Low" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      )}
                    >
                      {audit.riskRating}
                    </span>
                  </td>
                  <td className="p-3.5 pr-6 text-right text-[#94a3b8] font-mono text-[10px]">
                    {audit.startDate} to {audit.endDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Gantt Schedule Visual Timeline */}
      <Card className="bg-[#121826]/80 border-white/5 shadow-xl">
        <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
          <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#db0011]" />
            Fiscal Year 2026 Audit Schedule Timeline
          </CardTitle>
          <CardDescription className="text-[10px] text-[#94a3b8]">
            Visual mapping of audits across calendar quarters Q1 - Q4
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-12 text-[10px] font-mono text-[#94a3b8] border-b border-white/5 pb-2">
            <div className="col-span-3 text-left">Engagement</div>
            <div className="col-span-2 text-center border-l border-white/5">Q1</div>
            <div className="col-span-2 text-center border-l border-white/5">Q2</div>
            <div className="col-span-2 text-center border-l border-white/5">Q3</div>
            <div className="col-span-2 text-center border-l border-white/5">Q4</div>
            <div className="col-span-1 border-l border-white/5" />
          </div>

          <div className="space-y-4 pt-2">
            {/* Timeline Row 1 */}
            <div className="grid grid-cols-12 items-center text-xs">
              <span className="col-span-3 text-white font-medium truncate">AI & Ethics Audit</span>
              <div className="col-span-8 bg-[#1b2235]/40 h-7 rounded-lg border border-white/5 relative overflow-hidden flex items-center">
                <div className="absolute left-[8.3%] w-[33.3%] bg-emerald-500/25 h-full border-r-2 border-emerald-500 flex items-center pl-3">
                  <span className="text-[9px] font-mono font-bold text-emerald-400">75% Done</span>
                </div>
              </div>
            </div>

            {/* Timeline Row 2 */}
            <div className="grid grid-cols-12 items-center text-xs">
              <span className="col-span-3 text-white font-medium truncate">SWIFT payment corridor</span>
              <div className="col-span-8 bg-[#1b2235]/40 h-7 rounded-lg border border-white/5 relative overflow-hidden flex items-center">
                <div className="absolute left-0 w-[25%] bg-[#1677ff]/25 h-full border-r-2 border-[#1677ff] flex items-center pl-3">
                  <span className="text-[9px] font-mono font-bold text-[#1677ff]">100% Done</span>
                </div>
              </div>
            </div>

            {/* Timeline Row 3 */}
            <div className="grid grid-cols-12 items-center text-xs">
              <span className="col-span-3 text-white font-medium truncate">GDPR compliance sweep</span>
              <div className="col-span-8 bg-[#1b2235]/40 h-7 rounded-lg border border-white/5 relative overflow-hidden flex items-center">
                <div className="absolute left-[25%] w-[41.6%] bg-amber-500/25 h-full border-r-2 border-amber-500 flex items-center pl-3">
                  <span className="text-[9px] font-mono font-bold text-amber-400">40% Fieldwork</span>
                </div>
              </div>
            </div>

            {/* Timeline Row 4 */}
            <div className="grid grid-cols-12 items-center text-xs">
              <span className="col-span-3 text-white font-medium truncate">Corporate ESG Audit</span>
              <div className="col-span-8 bg-[#1b2235]/40 h-7 rounded-lg border border-white/5 relative overflow-hidden flex items-center">
                <div className="absolute left-[41.6%] w-[33.3%] bg-[#94a3b8]/20 h-full border-r-2 border-slate-500 flex items-center pl-3">
                  <span className="text-[9px] font-mono font-bold text-slate-400">15% Planning</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
