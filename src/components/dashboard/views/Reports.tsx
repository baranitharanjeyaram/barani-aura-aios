import React, { useState } from "react";
import { Role, ROLE_CONFIGS, GENERAL_METRICS } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Cpu, Sparkles, Download, Check, RefreshCcw, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportsProps {
  currentRole: Role;
}

export default function Reports({ currentRole }: ReportsProps) {
  const [reportType, setReportType] = useState<string>("QUARTERLY_RISK");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setGeneratedContent(null);
    
    setTimeout(() => {
      setIsGenerating(false);
      
      if (reportType === "QUARTERLY_RISK") {
        setGeneratedContent(`========================================================================
BARANI AURA AIOS — EXECUTIVE BOARD RISK REPORT SUMMARY (Q2 FY26)
========================================================================
GENERATED VIA: Aura Engine v3.4 [Role Context: ${currentRole}]
DATE OF SYNTHESIS: May 28, 2026

1. SYSTEM COMPENDIUM
------------------------------------------------------------------------
* Consolidated Risk Index: 78.4 (Alert Rating: AMBER / HIGH RISK)
* Compliance Health Index: 94.8% (Target: > 95.0%)
* AI Governance Index: 92.4 (F1 Optimization Model Stable)

2. CORE THREATS IDENTIFIED
------------------------------------------------------------------------
* RSK-904: Cloud Portal Authorization Volatility in South Asia Cluster. 
  Model estimation shows 84% exposure without active security collars.
* RSK-829: EUR/USD translation hedge swings exceed $1.5M exposure caps.
* FND-001: Lending eligibility algorithm bias (model drift at 5.2%).

3. REGULATORY COMPLIANCE STANDING
------------------------------------------------------------------------
* PCI-DSS v4.0 (Secure Pipelines): COMPLIANT (97% Effectiveness)
* EU AI Act Article 9 (AI Risk Matrices): COMPLIANT (92% Effectiveness)
* GDPR Article 32 (PII Lake Anonymization): NON-COMPLIANT (40% Effectiveness)

4. REMEDIATION DIRECTION
------------------------------------------------------------------------
AI models recommend immediate deployment of AWS Secrets Manager key salt 
rotation on staging databases and currency swap collar hedge derivatives.
Remediation backlog velocity remains stable at 18.4 days average close.

========================================================================
* Confidential. Distributed to Audit & Board Risk Committees *`);
      } else if (reportType === "AUDIT_SUMMARY") {
        setGeneratedContent(`========================================================================
BARANI AURA AIOS — INTERNAL AUDIT REGISTER REPORT SUMMARY
========================================================================
GENERATED VIA: Aura Engine v3.4 [Role Context: ${currentRole}]
DATE OF SYNTHESIS: May 28, 2026

1. AUDIT UNIVERSE OVERVIEW (FY26 Plan)
------------------------------------------------------------------------
* Total Engagements: 5
* Engagements Completed: 1 (SWIFT Payment Access Review)
* Engagements in Reporting: 1 (AI & Algorithmic Ethics Audit)
* Engagements in Fieldwork: 1 (GDPR Data Lake Storage Review)
* Engagements in Planning: 2 (ESG Disclosures, Automated Controls)

2. ISSUES SUMMARY
------------------------------------------------------------------------
* Active Defect Findings: 43 Open Items
* Critical/High Gaps: 2 Critical, 1 High
* Overdue Remediation Tasks: 3 Items

3. INDIVIDUAL DEFECT INVENTORY
------------------------------------------------------------------------
* FND-001: Algorithmic Lending Bias (Data Science, In-Progress, Due June 30)
* FND-002: Staging Database shared root keys (IT, Pending verification)
* FND-003: Unencrypted PII storage (Data Engineering, Open, Due July 5)
* FND-004: Lack of Dual-Auth swappers (Treasury, Open, Due Aug 15)

========================================================================
* Confidential. Distributed to Audit & Board Risk Committees *`);
      } else {
        setGeneratedContent(`========================================================================
BARANI AURA AIOS — COMPLIANCE ASSURANCE OBLIGATIONS REPORT
========================================================================
GENERATED VIA: Aura Engine v3.4 [Role Context: ${currentRole}]
DATE OF SYNTHESIS: May 28, 2026

1. COMPLIANCE METRICS
------------------------------------------------------------------------
* Overall Obligations Compliant: 2 of 4 (50%)
* Partially Compliant: 1 (SOX 404 - 78% effective)
* Non-Compliant: 1 (GDPR Article 32 - 40% effective)

2. CORE FINDINGS
------------------------------------------------------------------------
GDPR Article 32 requires structural pseudonymization across database 
exports. Lack of automated scrubbing rules represents primary breach threat 
profile in the Data Engineering lake corridors.

3. CORRECTION SCHEDULE
------------------------------------------------------------------------
* Deploy automated file scrubbing loops for export directories (FND-003)
* Upgrade SOX identity checks for ledger journals (OBL-803)

========================================================================
* Confidential. Distributed to Audit & Board Risk Committees *`);
      }
    }, 1500);
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <Card className="bg-[#121826]/80 border-white/5 shadow-xl flex flex-col justify-between">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
            <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#db0011]" />
              AI Automated Executive Report Generator
            </CardTitle>
            <CardDescription className="text-[10px] text-[#94a3b8]">
              Automate board deck summaries using natural language synthesis models
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-5 text-left flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Select Report Type */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-[#94a3b8] uppercase tracking-wider">Report Template</span>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full bg-[#1b2235] border border-white/5 rounded text-xs px-3 py-2.5 text-white outline-none"
                >
                  <option value="QUARTERLY_RISK">Quarterly Executive Risk Summary</option>
                  <option value="AUDIT_SUMMARY">Audit Program & Finding Digest</option>
                  <option value="COMPLIANCE_MATRIX">RCSA & Regulatory Obligation Status</option>
                </select>
              </div>

              {/* Scope Detail Box */}
              <div className="p-3 bg-[#0b0f19]/50 rounded-lg border border-white/5 space-y-1 text-[10px] font-mono text-[#94a3b8]">
                <div>Audience: <span className="text-white">Audit & Board Risk Committee</span></div>
                <div>Format: <span className="text-white">Structured Board Digest</span></div>
                <div>Estimated generation time: <span className="text-white">~1.5 seconds</span></div>
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full py-2.5 bg-[#db0011]/10 hover:bg-[#db0011] text-[#db0011] hover:text-white font-medium text-xs rounded transition-all outline-none border border-[#db0011]/30 hover:border-transparent flex items-center justify-center gap-2 mt-4"
            >
              {isGenerating ? (
                <>
                  <RefreshCcw className="w-3.5 h-3.5 animate-spin" /> Formulating analysis...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" /> Compile Executive Report
                </>
              )}
            </button>
          </CardContent>
        </Card>

        {/* Generated Report output Panel (Spans 2) */}
        <Card className="lg:col-span-2 bg-[#121826]/80 border-white/5 shadow-xl min-h-[350px] flex flex-col">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#db0011]" />
              Synthesized Document Output
            </CardTitle>
            {generatedContent && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="text-[10px] text-[#94a3b8] hover:text-white flex items-center gap-1 bg-[#1b2235] px-2.5 py-1.5 rounded border border-white/5"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      Copy Markdown
                    </>
                  )}
                </button>
                <button className="text-[10px] text-white flex items-center gap-1 bg-[#db0011]/20 hover:bg-[#db0011] px-2.5 py-1.5 rounded border border-[#db0011]/30 transition-colors">
                  <Download className="w-3 h-3" /> PDF Export
                </button>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1 p-4 bg-[#0b0f19]/40 flex flex-col justify-center">
            {generatedContent ? (
              <pre className="font-mono text-[10px] text-[#e2e8f0] leading-relaxed whitespace-pre overflow-x-auto text-left flex-1 p-3 bg-[#0b0f19]/70 rounded border border-white/5">
                {generatedContent}
              </pre>
            ) : isGenerating ? (
              <div className="flex flex-col items-center gap-3 py-16">
                <RefreshCcw className="w-8 h-8 text-[#db0011] animate-spin" />
                <span className="text-xs font-mono text-[#94a3b8]">AURA cognitive clusters are scanning metrics, risk feed and database files...</span>
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic py-16 text-center">
                Configure parameters and press "Compile Executive Report" to synthesize board-ready governance documents
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
