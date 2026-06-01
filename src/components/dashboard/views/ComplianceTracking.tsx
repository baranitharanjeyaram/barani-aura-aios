import React from "react";
import { Role, COMPLIANCE_OBLIGATIONS, RCSA_CAMPAIGNS } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Users } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { cn } from "@/lib/utils";

interface ComplianceTrackingProps {
  currentRole: Role;
}

export default function ComplianceTracking({ currentRole }: ComplianceTrackingProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  // Mock control effectiveness data by categories
  const radarData = [
    { subject: "Identity Auth", A: 97, B: 90, fullMark: 100 },
    { subject: "Algorithmic Ethics", A: 92, B: 85, fullMark: 100 },
    { subject: "Vulnerability Scans", A: 95, B: 95, fullMark: 100 },
    { subject: "Data Encryption", A: 40, B: 80, fullMark: 100 },
    { subject: "Multi-Sig Treasury", A: 78, B: 85, fullMark: 100 },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Compliance Obligations List (Spans 2) */}
        <Card className="xl:col-span-2 bg-[#121826]/80 border-white/5 shadow-xl">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#db0011]" />
                  Active Regulatory Alignment Matrix
                </CardTitle>
                <CardDescription className="text-[10px] text-[#94a3b8]">
                  Assessment of legal regulatory requirements and operational controls
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-[10px] text-[#1677ff] border-[#1677ff]/30 font-mono">
                Updated FY26 Q2
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {COMPLIANCE_OBLIGATIONS.map((ob) => (
                <div key={ob.id} className="p-4 hover:bg-[#1b2235]/15 transition-colors flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-1.5 text-left md:max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#1677ff] font-bold">
                        {ob.id}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {ob.regulation} · {ob.section}
                      </span>
                      <span className="text-[9px] text-[#94a3b8] font-mono">
                        ({ob.testingFrequency} Testing)
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {ob.description}
                    </p>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Control Owner: <span className="text-white">{ob.controlOwner}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-4">
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-bold border flex items-center gap-1",
                          ob.status === "COMPLIANT" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                          ob.status === "PARTIAL" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                          ob.status === "NON-COMPLIANT" && "bg-rose-500/10 text-rose-500 border-rose-500/20",
                          ob.status === "UNDER_REVIEW" && "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        )}
                      >
                        {ob.status === "COMPLIANT" && <CheckCircle2 className="w-3 h-3" />}
                        {ob.status === "PARTIAL" && <AlertTriangle className="w-3 h-3" />}
                        {ob.status === "NON-COMPLIANT" && <XCircle className="w-3 h-3" />}
                        {ob.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#94a3b8]">
                        Effectiveness: <span className="text-white font-bold">{ob.effectivenessScore}%</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Control Testing Radar Chart */}
        <Card className="bg-[#121826]/80 border-white/5 shadow-xl flex flex-col justify-between">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
            <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#db0011]" />
              Control Testing Effectiveness
            </CardTitle>
            <CardDescription className="text-[10px] text-[#94a3b8]">
              Automated pass rating vs peer enterprise threshold benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col justify-center">
            <div className="h-[210px] w-full font-mono text-[9px] flex items-center justify-center">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                    <PolarRadiusAxis stroke="rgba(255,255,255,0.1)" domain={[0, 100]} />
                    <Radar name="Active Audits" dataKey="A" stroke="#db0011" fill="#db0011" fillOpacity={0.25} />
                    <Radar name="Org Benchmark" dataKey="B" stroke="#1677ff" fill="#1677ff" fillOpacity={0.05} />
                    <Legend wrapperStyle={{ fontSize: "9px" }} />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[210px] w-full bg-[#1b2235]/20 animate-pulse rounded-lg" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RCSA Campaign Progress */}
      <Card className="bg-[#121826]/80 border-white/5 shadow-xl">
        <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
          <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <Users className="w-4 h-4 text-[#db0011]" />
            Risk & Control Self-Assessment (RCSA) Campaigns
          </CardTitle>
          <CardDescription className="text-[10px] text-[#94a3b8]">
            Compliance assessments completed by department coordinators
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 bg-[#0b0f19]/20 font-mono text-[9px] text-[#94a3b8] uppercase tracking-wider">
                <th className="p-3.5 pl-6">Department Scope</th>
                <th className="p-3.5">Assigned Coordinator</th>
                <th className="p-3.5">Campaign Progress</th>
                <th className="p-3.5 pr-6 text-right">RCSA Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[11px]">
              {RCSA_CAMPAIGNS.map((cam, idx) => (
                <tr key={idx} className="hover:bg-[#1b2235]/25 transition-colors">
                  <td className="p-3.5 pl-6 font-medium text-white">
                    {cam.department}
                  </td>
                  <td className="p-3.5 text-slate-400">
                    {cam.supervisor}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5 max-w-[200px]">
                      <div className="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            cam.rate === 100 ? "bg-emerald-500" : "bg-[#1677ff]"
                          )}
                          style={{ width: `${cam.rate}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-[#94a3b8]">
                        {cam.rate}%
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 pr-6 text-right">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-semibold border",
                        cam.status === "Completed" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                        cam.status === "In-Progress" && "bg-blue-500/10 text-blue-400 border-blue-500/20",
                        cam.status === "Not Started" && "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      )}
                    >
                      {cam.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
