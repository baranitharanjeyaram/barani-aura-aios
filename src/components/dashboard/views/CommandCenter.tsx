import React from "react";
import { Role, ROLE_CONFIGS, GENERAL_METRICS, LIVE_RISK_FEED } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, AlertTriangle, ShieldAlert, Cpu, Sparkles, TrendingUp, Layers } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CommandCenterProps {
  currentRole: Role;
  setCurrentSection: (section: string) => void;
}

// Interactive 3D Card wrapper utilizing CSS 3D perspective transforms
export function ThreeDTiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  // Map mouse coordinate range [0, 400] to rotation angle range [-10deg, 10deg]
  const rotateX = useTransform(y, [0, 400], [10, -10]);
  const rotateY = useTransform(x, [0, 400], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    
    // Scale mouse position to range [0, 400]
    x.set(((mouseX + width / 2) / width) * 400);
    y.set(((mouseY + height / 2) / height) * 400);
  }

  function handleMouseLeave() {
    x.set(200);
    y.set(200);
  }

  return (
    <div style={{ perspective: "1000px" }} className="w-full h-full">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full h-full"
      >
        <div 
          style={{ transform: "translateZ(25px)" }}
          className="w-full h-full"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function CommandCenter({ currentRole, setCurrentSection }: CommandCenterProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const roleConfig = ROLE_CONFIGS[currentRole];
  const kpis = roleConfig.kpis || [];

  return (
    <div className="space-y-6 text-left relative z-10">
      {/* AI Assistant Executive Summary Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-[#db0011]/25 via-[#1677ff]/15 to-[#121826]/90 border border-white/10 flex items-start gap-4 shadow-[0_0_30px_rgba(22,119,255,0.08)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#db0011]/15 to-[#1677ff]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#db0011]/30 to-[#1677ff]/30 border border-white/10 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-[0_0_12px_rgba(219,0,17,0.3)]">
          <Sparkles className="w-5 h-5 animate-pulse text-yellow-300" />
        </div>
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#db0011] animate-ping" />
              Aura Copilot System Synthesis
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/25">
              Live Evaluation
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans max-w-4xl">
            Welcome, **{roleConfig.title}**. AURA models have computed a consolidated **Enterprise Risk Score of 78.4 (High)**. This rating is influenced by cyber vulnerability alerts in the South Asia corridor and algorithmic drift anomalies detected in lending validation models. Compliance Health stands stable at **94.8%**. Mitigate critical risks to drive exposure below targets.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid with 3D Tilt Effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const isUp = kpi.trend === "up";
          const isDown = kpi.trend === "down";
          
          return (
            <ThreeDTiltCard key={idx}>
              <Card className="h-full bg-gradient-to-br from-[#1b2235] to-[#121826]/90 border border-white/5 shadow-lg backdrop-blur-sm relative overflow-hidden group hover:border-[#1677ff]/30 transition-colors">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#db0011] to-[#1677ff] opacity-40 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="p-4 pb-1">
                  <CardDescription className="text-[10px] text-[#94a3b8] font-mono tracking-wider uppercase">
                    {kpi.label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-1 pb-4">
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl font-bold text-white tracking-tight font-heading">
                      {kpi.value}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono font-semibold flex items-center">
                        {isUp ? (
                          <span className="text-emerald-400 flex items-center gap-0.5">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            {kpi.change > 0 ? `+${kpi.change}` : kpi.change}%
                          </span>
                        ) : isDown ? (
                          <span className="text-rose-400 flex items-center gap-0.5">
                            <ArrowDownRight className="w-3.5 h-3.5" />
                            {kpi.change}%
                          </span>
                        ) : (
                          <span className="text-slate-400">0.0%</span>
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 line-clamp-1">
                    {kpi.description}
                  </p>
                </CardContent>
              </Card>
            </ThreeDTiltCard>
          );
        })}
      </div>

      {/* Main Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart (Span 2) */}
        <Card className="lg:col-span-2 bg-gradient-to-b from-[#1b2235]/90 to-[#121826]/90 border-white/5 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#db0011]" />
                Governance & Risk Alignment Trend
              </CardTitle>
              <CardDescription className="text-[10px] text-[#94a3b8]">
                Comparing Enterprise Risk Index against Compliance Health & AI Ethics Scores
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[280px] w-full font-mono text-[10px]">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GENERAL_METRICS.trendScore} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#db0011" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#db0011" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1677ff" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#1677ff" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#475569" strokeWidth={0.5} tickLine={false} />
                    <YAxis stroke="#475569" strokeWidth={0.5} tickLine={false} domain={[50, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#121826",
                        borderColor: "rgba(255,255,255,0.08)",
                        color: "#fff",
                        fontSize: "11px",
                        borderRadius: "6px"
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: "15px" }} />
                    <Area name="Risk Index" type="monotone" dataKey="Risk" stroke="#db0011" strokeWidth={1.5} fillOpacity={1} fill="url(#colorRisk)" />
                    <Area name="Compliance Health" type="monotone" dataKey="Compliance" stroke="#1677ff" strokeWidth={1.5} fillOpacity={1} fill="url(#colorCompliance)" />
                    <Area name="AI Ethics Governance" type="monotone" dataKey="AI" stroke="#10b981" strokeWidth={1.5} fillOpacity={1} fill="url(#colorAI)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[280px] w-full bg-[#1b2235]/20 animate-pulse rounded-lg" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Live Risk Telemetry Widget */}
        <Card className="bg-gradient-to-b from-[#1b2235]/90 to-[#121826]/90 border-white/5 shadow-xl flex flex-col">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#db0011] animate-pulse" />
                Active Incident Telemetry
              </CardTitle>
              <button
                onClick={() => setCurrentSection("Risk Intelligence")}
                className="text-[10px] text-[#1677ff] hover:underline cursor-pointer"
              >
                Expand Live Map
              </button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[300px]">
            {LIVE_RISK_FEED.slice(0, 3).map((event) => (
              <div key={event.id} className="flex gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <div className="w-7 h-7 rounded bg-rose-500/10 border border-rose-500/20 text-[#db0011] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 shadow-[0_0_8px_rgba(219,0,17,0.15)]">
                  !
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#94a3b8]">
                      {event.id}
                    </span>
                    <span className="text-[8px] px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-400 font-bold border border-rose-500/20">
                      {event.severity}
                    </span>
                  </div>
                  <p className="text-xs text-white font-medium mt-1 leading-normal truncate">
                    {event.title}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                    {event.impact}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
