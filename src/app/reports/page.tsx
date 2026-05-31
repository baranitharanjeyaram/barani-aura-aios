"use client";

import React, { useState } from "react";
import {
  MOCK_RISKS,
  MOCK_CONTROLS,
  MOCK_COMPLIANCE,
  MOCK_AUDITS
} from "@/components/mockData";
import {
  exportToCSV,
  triggerPrint
} from "@/utils/export";
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileCode,
  CheckCircle,
  Clock
} from "lucide-react";

export default function ReportsCenter() {
  const [downloadingReport, setDownloadingReport] = useState<string | null>(null);

  const reportsList = [
    {
      id: "rep-01",
      title: "Risk Assessment Register",
      desc: "Detailed inventory of enterprise risks, including inherent/residual ratings, trends, and owners.",
      lastGenerated: "May 31, 2026 21:00",
      size: "24 KB",
      data: MOCK_RISKS,
      filename: "ARAIS_Risk_Assessment_Report",
    },
    {
      id: "rep-02",
      title: "Control Monitoring Log",
      desc: "Overview of controls inventory, frequency tracking, effectiveness, and evidence submission statuses.",
      lastGenerated: "May 31, 2026 21:00",
      size: "18 KB",
      data: MOCK_CONTROLS,
      filename: "ARAIS_Controls_Monitoring_Report",
    },
    {
      id: "rep-03",
      title: "Compliance Status Summary",
      desc: "Regulatory obligation checklists coverage percentages mapping SOX, GDPR, NIST, and DORA.",
      lastGenerated: "May 31, 2026 20:30",
      size: "12 KB",
      data: MOCK_COMPLIANCE,
      filename: "ARAIS_Compliance_Framework_Report",
    },
    {
      id: "rep-04",
      title: "Audit Findings & Recommendation Tracker",
      desc: "Open, resolved, and closed findings across internal audits, including SLA dates and action details.",
      lastGenerated: "May 30, 2026 14:15",
      size: "15 KB",
      data: MOCK_AUDITS,
      filename: "ARAIS_Audit_Findings_Log",
    },
    {
      id: "rep-05",
      title: "Executive MIS Brief",
      desc: "Board-level intelligence summary mapping risk trends, control failure rates, and strategic decisions.",
      lastGenerated: "May 31, 2026 22:50",
      size: "8 KB",
      data: [{ name: "ARAIS MIS Report", generated: new Date().toISOString() }],
      filename: "ARAIS_Executive_MIS_Report",
    },
    {
      id: "rep-06",
      title: "Board Reporting Pack",
      desc: "Comprehensive Governance and Compliance PDF bundle ready for submission to the audit committee.",
      lastGenerated: "May 31, 2026 22:53",
      size: "1.2 MB",
      data: null, // PDF specific
      filename: "ARAIS_Board_Reporting_Pack",
    }
  ];

  const handleDownload = (report: typeof reportsList[0], format: "csv" | "pdf" | "ppt") => {
    const key = `${report.id}-${format}`;
    setDownloadingReport(key);

    setTimeout(() => {
      if (format === "pdf") {
        triggerPrint();
      } else if (format === "csv") {
        if (report.data) {
          exportToCSV(report.data, report.filename);
        } else {
          exportToCSV(MOCK_RISKS, "ARAIS_Board_Reporting_Outline");
        }
      } else {
        const outline = [
          { Slide: "1 - Executive Summary", Content: "BARANI AURA AIOS (ARAIS) Board Summary" },
          { Slide: "2 - Risk Registry", Content: `${MOCK_RISKS.length} active risks. 2 breached.` },
          { Slide: "3 - Controls", Content: `Assurance rate is at ${MOCK_CONTROLS.filter(c => c.effectiveness === "Effective").length} / ${MOCK_CONTROLS.length} effective.` },
        ];
        exportToCSV(outline, `${report.filename}_PPT_Outline`);
      }
      setDownloadingReport(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <Download className="h-6 w-6 text-gold" />
            ARAIS Reports Center
          </h2>
          <p className="text-xs text-slate-500 font-medium">Download executive reports, audits summaries, compliance packs, and spreadsheets.</p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportsList.map((report) => (
          <div
            key={report.id}
            className="glass-panel p-5 flex flex-col justify-between space-y-4 hover:border-gold/30 transition-colors bg-white shadow-sm"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{report.title}</h3>
                <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">
                  {report.size}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-normal font-semibold">{report.desc}</p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-3 font-semibold">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 animate-pulse" />
                Last Generated: {report.lastGenerated}
              </span>
              <span className="flex items-center gap-0.5 text-green-700 font-extrabold uppercase">
                <CheckCircle className="h-3 w-3 text-green-600" /> Ready
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleDownload(report, "pdf")}
                disabled={downloadingReport !== null}
                className="flex items-center justify-center gap-1 py-2 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-700 font-bold hover:text-gold hover:border-gold/30 hover:bg-white transition-all shadow-sm"
              >
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                <span>PDF Format</span>
              </button>

              <button
                onClick={() => handleDownload(report, "csv")}
                disabled={downloadingReport !== null}
                className="flex items-center justify-center gap-1 py-2 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-700 font-bold hover:text-gold hover:border-gold/30 hover:bg-white transition-all shadow-sm"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-slate-500" />
                <span>Excel (CSV)</span>
              </button>

              <button
                onClick={() => handleDownload(report, "ppt")}
                disabled={downloadingReport !== null}
                className="flex items-center justify-center gap-1 py-2 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-700 font-bold hover:text-gold hover:border-gold/30 hover:bg-white transition-all shadow-sm"
              >
                <FileCode className="h-3.5 w-3.5 text-slate-500" />
                <span>PPT Outline</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
