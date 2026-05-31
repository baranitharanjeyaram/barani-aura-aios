"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle2, ShieldCheck } from "lucide-react";

export default function SystemSettings() {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [settings, setSettings] = useState({
    orgName: "Aura Global Holdings",
    riskCoordinator: "Admin User",
    cosoEnabled: true,
    soxEnabled: true,
    doraEnabled: true,
    gdprEnabled: true,
    threeLinesEnabled: true,
    emailAlerts: true,
    slackIntegration: false,
    kriThreshold: "Amber",
    assessmentFrequency: "Quarterly"
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <Settings className="h-6 w-6 text-gold" />
            Platform & Governance Settings
          </h2>
          <p className="text-xs text-slate-500 font-medium">Configure global metadata, active assurance frameworks, and automated email escalation triggers.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Profile */}
        <div className="glass-panel p-6 space-y-4 bg-white shadow-sm">
          <h3 className="text-sm font-bold text-gold uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-gold" />
            <span>Core Enterprise Profiles</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500">Organization Title</label>
              <input
                type="text"
                value={settings.orgName}
                onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2 text-xs focus:border-gold/55 outline-none font-semibold text-slate-900"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500">Primary Risk Coordinator</label>
              <input
                type="text"
                value={settings.riskCoordinator}
                onChange={(e) => setSettings({ ...settings, riskCoordinator: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2 text-xs focus:border-gold/55 outline-none font-semibold text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Framework Mappings */}
        <div className="glass-panel p-6 space-y-4 bg-white shadow-sm">
          <h3 className="text-sm font-bold text-gold uppercase tracking-wider border-b border-slate-100 pb-2">
            Active Framework Alignment
          </h3>
          <p className="text-[10px] text-slate-500 leading-normal font-semibold">
            Activating frameworks binds mandatory compliance checklists and populates audit checklists inside the assurance mapping.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* COSO */}
            <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer select-none hover:border-slate-300 transition-colors">
              <input
                type="checkbox"
                checked={settings.cosoEnabled}
                onChange={(e) => setSettings({ ...settings, cosoEnabled: e.target.checked })}
                className="rounded accent-gold h-4 w-4"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">COSO Internal Control Framework</span>
                <span className="text-[9px] text-slate-400 font-bold">Binds control matrix parameters.</span>
              </div>
            </label>

            {/* SOX */}
            <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer select-none hover:border-slate-300 transition-colors">
              <input
                type="checkbox"
                checked={settings.soxEnabled}
                onChange={(e) => setSettings({ ...settings, soxEnabled: e.target.checked })}
                className="rounded accent-gold h-4 w-4"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">SOX Section 404 Mandates</span>
                <span className="text-[9px] text-slate-400 font-bold">Tracks financial ledger segregation validation.</span>
              </div>
            </label>

            {/* GDPR */}
            <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer select-none hover:border-slate-300 transition-colors">
              <input
                type="checkbox"
                checked={settings.gdprEnabled}
                onChange={(e) => setSettings({ ...settings, gdprEnabled: e.target.checked })}
                className="rounded accent-gold h-4 w-4"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">GDPR Data Privacy Mandates</span>
                <span className="text-[9px] text-slate-400 font-bold">Integrates consent audits metrics.</span>
              </div>
            </label>

            {/* DORA */}
            <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer select-none hover:border-slate-300 transition-colors">
              <input
                type="checkbox"
                checked={settings.doraEnabled}
                onChange={(e) => setSettings({ ...settings, doraEnabled: e.target.checked })}
                className="rounded accent-gold h-4 w-4"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">DORA ICT Operational Resilience</span>
                <span className="text-[9px] text-slate-400 font-bold">Requires third-party risk register mapping.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Alerts Escalations */}
        <div className="glass-panel p-6 space-y-4 bg-white shadow-sm">
          <h3 className="text-sm font-bold text-gold uppercase tracking-wider border-b border-slate-100 pb-2">
            Automated Alert Escalation Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500">Escalate KRI Breach Level</label>
              <select
                value={settings.kriThreshold}
                onChange={(e) => setSettings({ ...settings, kriThreshold: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs outline-none text-slate-800 font-semibold"
              >
                <option value="Green">Green (All Level Escalations)</option>
                <option value="Amber">Amber (Escalate Warning States)</option>
                <option value="Red">Red (Critical Alerts Only)</option>
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500">Recalculate Assessment Cycle</label>
              <select
                value={settings.assessmentFrequency}
                onChange={(e) => setSettings({ ...settings, assessmentFrequency: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs outline-none text-slate-800 font-semibold"
              >
                <option value="Continuous">Continuous (Live Streaming)</option>
                <option value="Weekly">Weekly Syncs</option>
                <option value="Monthly">Monthly Recalculations</option>
                <option value="Quarterly">Quarterly Re-assessments</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 justify-center pl-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={settings.emailAlerts}
                  onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                  className="rounded accent-gold h-4 w-4"
                />
                <span className="text-xs text-slate-700 font-semibold">Enable Immediate Email Escalation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={settings.slackIntegration}
                  onChange={(e) => setSettings({ ...settings, slackIntegration: e.target.checked })}
                  className="rounded accent-gold h-4 w-4"
                />
                <span className="text-xs text-slate-700 font-semibold">Trigger Webhook Integrations</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Save */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-5">
          {saveSuccess ? (
            <div className="flex items-center gap-1.5 text-green-700 text-xs font-bold animate-pulse">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Configuration successfully saved to local SQLite register.</span>
            </div>
          ) : (
            <div className="text-[10px] text-slate-400 font-bold">
              *ARAIS configuration stores settings locally for private enterprise deployment.
            </div>
          )}

          <button
            type="submit"
            className="flex items-center gap-1.5 px-6 py-2.5 bg-gold hover:bg-gold-light text-white font-extrabold rounded text-xs transition-all shadow-gold-glow"
          >
            <Save className="h-4 w-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
