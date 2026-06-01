import React, { useState } from "react";
import { Role, AlertNotification } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BellRing, ShieldAlert, Cpu, Sparkles, Trash2, CheckCircle, Mail, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertsCenterProps {
  currentRole: Role;
  alerts: AlertNotification[];
  setAlerts: React.Dispatch<React.SetStateAction<AlertNotification[]>>;
}

export default function AlertsCenter({ currentRole, alerts, setAlerts }: AlertsCenterProps) {
  const [filterType, setFilterType] = useState<string>("ALL");
  
  // Notification toggle settings
  const [emailAlerts, setEmailAlerts] = useState<boolean>(true);
  const [smsAlerts, setSmsAlerts] = useState<boolean>(false);
  const [slackAlerts, setSlackAlerts] = useState<boolean>(true);
  const [pagerdutyAlerts, setPagerdutyAlerts] = useState<boolean>(true);

  const handleToggleRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: !a.isRead } : a));
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const filteredAlerts = alerts.filter(a => {
    if (filterType === "ALL") return true;
    return a.type === filterType;
  });

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Alerts Timeline (Spans 2) */}
        <Card className="xl:col-span-2 bg-[#121826]/80 border-white/5 shadow-xl">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
                <BellRing className="w-4 h-4 text-[#db0011]" />
                Incident & Notification Timeline
              </CardTitle>
              <CardDescription className="text-[10px] text-[#94a3b8]">
                Chronological list of anomalies, compliance alerts, and risk events
              </CardDescription>
            </div>
            
            {/* Filter buttons */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-[#1b2235] border border-white/5 rounded text-[10px] px-2 py-1 text-white outline-none"
            >
              <option value="ALL">All Alerts</option>
              <option value="CRITICAL_RISK">Critical Risks</option>
              <option value="COMPLIANCE_BREACH">Compliance Breaches</option>
              <option value="AI_ANOMALY">AI Anomalies</option>
              <option value="AUDIT_ALERT">Audit Reminders</option>
            </select>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5 max-h-[480px] overflow-y-auto">
              {filteredAlerts.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 italic">
                  No active logs match the filtered query parameters
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "p-4 hover:bg-[#1b2235]/15 transition-colors flex items-start gap-3 justify-between",
                      !alert.isRead && "bg-[#1b2235]/20 border-l-2 border-[#db0011]"
                    )}
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5">
                        {alert.type === "CRITICAL_RISK" && <ShieldAlert className="w-4 h-4 text-[#db0011]" />}
                        {alert.type === "COMPLIANCE_BREACH" && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                        {alert.type === "AI_ANOMALY" && <Cpu className="w-4 h-4 text-[#1677ff]" />}
                        {alert.type === "AUDIT_ALERT" && <CheckCircle className="w-4 h-4 text-[#10b981]" />}
                        {alert.type === "REMINDER" && <Mail className="w-4 h-4 text-slate-400" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#94a3b8]">
                            {alert.id}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {alert.title}
                          </span>
                          <span className="text-[9px] text-[#94a3b8] font-mono">
                            {alert.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                          {alert.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleRead(alert.id)}
                        className={cn(
                          "text-[9px] font-mono px-2 py-1 rounded transition-colors",
                          alert.isRead
                            ? "bg-white/5 text-[#94a3b8] hover:bg-white/10"
                            : "bg-[#db0011]/10 text-[#db0011] hover:bg-[#db0011]/20"
                        )}
                      >
                        {alert.isRead ? "Mark Unread" : "Mark Read"}
                      </button>
                      <button
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="p-1.5 rounded hover:bg-white/5 text-[#475569] hover:text-[#db0011] transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Configurations Dashboard Panel */}
        <Card className="bg-[#121826]/80 border-white/5 shadow-xl flex flex-col justify-between">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
            <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#db0011]" />
              Alert Subsystem Integrations
            </CardTitle>
            <CardDescription className="text-[10px] text-[#94a3b8]">
              Configure critical alarm channels and routing policies
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-5 text-left flex-1 flex flex-col justify-center">
            {/* Channel Email */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">Email Alerts</span>
                <span className="text-[9px] text-[#94a3b8] font-mono">Daily digest to risk management</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
                className="w-4 h-4 accent-[#db0011] cursor-pointer"
              />
            </div>

            {/* Channel SMS */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">SMS Tickers</span>
                <span className="text-[9px] text-[#94a3b8] font-mono">Critical L5 alarms only</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={() => setSmsAlerts(!smsAlerts)}
                className="w-4 h-4 accent-[#db0011] cursor-pointer"
              />
            </div>

            {/* Channel Slack */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">Slack webhook</span>
                <span className="text-[9px] text-[#94a3b8] font-mono">Real-time JSON payload sync</span>
              </div>
              <input
                type="checkbox"
                checked={slackAlerts}
                onChange={() => setSlackAlerts(!slackAlerts)}
                className="w-4 h-4 accent-[#db0011] cursor-pointer"
              />
            </div>

            {/* Channel PagerDuty */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">PagerDuty escalation</span>
                <span className="text-[9px] text-[#94a3b8] font-mono">Automatic call to CRO on-call</span>
              </div>
              <input
                type="checkbox"
                checked={pagerdutyAlerts}
                onChange={() => setPagerdutyAlerts(!pagerdutyAlerts)}
                className="w-4 h-4 accent-[#db0011] cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-white/5 text-[9px] text-[#94a3b8] font-mono leading-relaxed mt-4">
              Integrations require active API configurations in Settings. Unread incident count triggers local dashboard browser badge refreshes.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
