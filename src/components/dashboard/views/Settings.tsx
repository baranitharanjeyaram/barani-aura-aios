import React, { useState } from "react";
import { Role, ROLE_CONFIGS } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Cpu, Sparkles, Check, Database, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsProps {
  currentRole: Role;
}

export default function Settings({ currentRole }: SettingsProps) {
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<string>("gpt-4o-risk-v2.1");
  const [vectorDim, setVectorDim] = useState<number>(1536);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const sectionsList = [
    "Dashboard",
    "Risk Intelligence",
    "Internal Audit",
    "Compliance",
    "AI Analytics",
    "RCSA",
    "Findings Tracker",
    "Reports",
    "Alerts",
    "AI Copilot",
    "Settings",
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* RBAC Permission Matrix (Spans 2) */}
        <Card className="xl:col-span-2 bg-[#121826]/80 border-white/5 shadow-xl">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
            <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#db0011]" />
              Role-Based Access Control (RBAC) Grid Matrix
            </CardTitle>
            <CardDescription className="text-[10px] text-[#94a3b8]">
              Authorized viewing context permissions by active security clearance profiles
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5 bg-[#0b0f19]/20 font-mono text-[9px] text-[#94a3b8] uppercase tracking-wider">
                  <th className="p-3.5 pl-6">Access Profile</th>
                  {sectionsList.map((sec) => (
                    <th key={sec} className="p-3.5 text-center text-[8px] font-mono whitespace-nowrap">
                      {sec}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[11px]">
                {Object.values(ROLE_CONFIGS).map((role) => (
                  <tr
                    key={role.name}
                    className={cn(
                      "hover:bg-[#1b2235]/15 transition-colors",
                      currentRole === role.name && "bg-[#1b2235]/30"
                    )}
                  >
                    <td className="p-3.5 pl-6 font-semibold text-white truncate max-w-[150px]">
                      {role.name}
                    </td>
                    {sectionsList.map((sec) => {
                      const hasAccess = role.allowedViews.includes(sec);
                      return (
                        <td key={sec} className="p-3.5 text-center">
                          <span
                            className={cn(
                              "w-2 h-2 rounded-full inline-block",
                              hasAccess ? "bg-emerald-500 shadow-[0_0_6px_#10b981]" : "bg-white/10"
                            )}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Cognitive Model Configs */}
        <Card className="bg-[#121826]/80 border-white/5 shadow-xl flex flex-col justify-between">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
            <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#db0011]" />
              AI Cognitive Core Configurations
            </CardTitle>
            <CardDescription className="text-[10px] text-[#94a3b8]">
              Manage embeddings, models, and weights tuning limits
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-5 text-left flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {/* LLM Model select */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-[#94a3b8] uppercase tracking-wider block">Target LLM Core</span>
                <select
                  value={activeModel}
                  onChange={(e) => setActiveModel(e.target.value)}
                  className="w-full bg-[#1b2235] border border-white/5 rounded text-xs px-3 py-2 text-white outline-none"
                >
                  <option value="gpt-4o-risk-v2.1">GPT-4o-risk (v2.1)</option>
                  <option value="claude-3.5-audit-sonnet">Claude 3.5 Sonnet Audit</option>
                  <option value="llama-3.1-70b-quant">Llama 3.1 70B (Quantized)</option>
                </select>
              </div>

              {/* Vector Database config */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-[#94a3b8] uppercase tracking-wider block">Vector Dimensions</span>
                <select
                  value={vectorDim}
                  onChange={(e) => setVectorDim(Number(e.target.value))}
                  className="w-full bg-[#1b2235] border border-white/5 rounded text-xs px-3 py-2 text-white outline-none"
                >
                  <option value={1536}>1536 Dimensions (text-embedding-3-small)</option>
                  <option value={3072}>3072 Dimensions (text-embedding-3-large)</option>
                  <option value={768}>768 Dimensions (Cohere-v3-multi)</option>
                </select>
              </div>

              {/* Temperature slider mockup */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[9px] font-mono text-[#94a3b8] uppercase tracking-wider">
                  <span>Creativity Temp</span>
                  <span className="text-[#db0011]">0.15 (Strict)</span>
                </div>
                <div className="bg-[#1b2235] border border-white/5 rounded p-2 text-center text-xs font-bold text-white font-mono">
                  Strict Governance Mode
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saveSuccess}
              className={cn(
                "w-full py-2.5 rounded font-medium text-xs transition-all outline-none border flex items-center justify-center gap-2 mt-4",
                saveSuccess
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-[#db0011]/10 hover:bg-[#db0011] text-[#db0011] hover:text-white border-[#db0011]/30 hover:border-transparent"
              )}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Configurations Saved
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Save Configurations
                </>
              )}
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
