import React, { useState } from "react";
import { Role, RISK_FORECAST_12M, AI_RECOMMENDATIONS } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Sparkles, TrendingDown, Check, Play } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { cn } from "@/lib/utils";

interface AIAnalyticsProps {
  currentRole: Role;
}

export default function AIAnalytics({ currentRole }: AIAnalyticsProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [mitigationFactor, setMitigationFactor] = useState<number>(50); // 0 to 100
  const [executedActions, setExecutedActions] = useState<Record<string, boolean>>({});

  // Dynamic simulation logic
  // As mitigationFactor goes up, the forecast should drop more significantly
  const simulatedForecast = RISK_FORECAST_12M.map((data, index) => {
    // multiplier starts at 1 and drops as mitigationFactor increases, scaled by index
    const effectScale = (mitigationFactor / 50) * 0.1 * index;
    const simulatedVal = Math.max(
      45,
      Math.round((data.Forecast - effectScale * 4) * 10) / 10
    );
    const simulatedLower = Math.max(
      35,
      Math.round((data.LowerBound - effectScale * 6) * 10) / 10
    );
    // Upper bound decreases as control improves
    const simulatedUpper = Math.max(
      50,
      Math.round((data.UpperBound - effectScale * 2.5) * 10) / 10
    );

    return {
      ...data,
      Forecast: simulatedVal,
      LowerBound: simulatedLower,
      UpperBound: simulatedUpper,
    };
  });

  const handleExecute = (id: string) => {
    setExecutedActions((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6 text-left">
      {/* Simulation Dashboard Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Forecast Graph (Spans 2) */}
        <Card className="xl:col-span-2 bg-[#121826]/80 border-white/5 shadow-xl">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#db0011]" />
                Predictive Risk Mitigation Forecasting Model
              </CardTitle>
              <CardDescription className="text-[10px] text-[#94a3b8]">
                Monte Carlo projection mapping next 12 months with dynamic parameter tuning
              </CardDescription>
            </div>
            {/* Mitigation Budget Slider */}
            <div className="flex items-center gap-3 bg-[#1b2235]/60 px-4 py-2 rounded-lg border border-white/5">
              <span className="text-[9px] font-mono text-[#94a3b8] uppercase tracking-wider">
                Mitigation Effort:
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={mitigationFactor}
                onChange={(e) => setMitigationFactor(Number(e.target.value))}
                className="w-24 accent-[#db0011] cursor-pointer"
              />
              <span className="text-xs font-bold text-[#db0011] font-mono w-8 text-right">
                {mitigationFactor}%
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[280px] w-full font-mono text-[10px]">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={simulatedForecast} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUncertainty" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1677ff" stopOpacity={0.08} />
                        <stop offset="95%" stopColor="#1677ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#475569" strokeWidth={0.5} tickLine={false} />
                    <YAxis stroke="#475569" strokeWidth={0.5} tickLine={false} domain={[40, 90]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#121826",
                        borderColor: "rgba(255,255,255,0.08)",
                        color: "#fff"
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: "15px" }} />
                    {/* Uncertainty Bounds */}
                    <Area
                      name="Uncertainty Range"
                      type="monotone"
                      dataKey="UpperBound"
                      stroke="none"
                      fill="url(#colorUncertainty)"
                    />
                    <Area
                      name=""
                      type="monotone"
                      dataKey="LowerBound"
                      stroke="none"
                      fill="#121826"
                      fillOpacity={1}
                    />
                    {/* Lines */}
                    <Line name="Current Baseline (Unmitigated)" type="monotone" dataKey="Baseline" stroke="#64748b" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                    <Line name="AI Simulated Forecast" type="monotone" dataKey="Forecast" stroke="#db0011" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[280px] w-full bg-[#1b2235]/20 animate-pulse rounded-lg" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Probability Model Card */}
        <Card className="bg-[#121826]/80 border-white/5 shadow-xl flex flex-col justify-between">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
            <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#db0011]" />
              Threat Anomaly Predictor
            </CardTitle>
            <CardDescription className="text-[10px] text-[#94a3b8]">
              Automated vector regressions on systemic indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6 flex-1 flex flex-col justify-center">
            {/* Predictor 1 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-300 uppercase">
                  GDPR Database Leak Chance
                </span>
                <Badge variant="outline" className="text-[10px] text-rose-500 border-rose-500/20 font-mono bg-rose-500/5">
                  High Risk
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: "84%" }} />
                </div>
                <span className="text-xs font-bold text-white font-mono w-10 text-right">
                  84%
                </span>
              </div>
              <p className="text-[9px] text-slate-400 font-mono">
                Trigger: GDPR Article 32 score currently 40% (Non-compliant).
              </p>
            </div>

            {/* Predictor 2 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-300 uppercase">
                  Lending algorithm bias risk
                </span>
                <Badge variant="outline" className="text-[10px] text-amber-500 border-amber-500/20 font-mono bg-amber-500/5">
                  Amber Alert
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "68%" }} />
                </div>
                <span className="text-xs font-bold text-white font-mono w-10 text-right">
                  68%
                </span>
              </div>
              <p className="text-[9px] text-slate-400 font-mono">
                Trigger: Model drift coefficient shifted to 5.2%.
              </p>
            </div>

            {/* Predictor 3 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-300 uppercase">
                  Core database Sync Outage
                </span>
                <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/20 font-mono bg-emerald-500/5">
                  Low Risk
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "12%" }} />
                </div>
                <span className="text-xs font-bold text-white font-mono w-10 text-right">
                  12%
                </span>
              </div>
              <p className="text-[9px] text-slate-400 font-mono">
                Trigger: Multi-node replication synced at 99.98% efficiency.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendation Engine */}
      <Card className="bg-[#121826]/80 border-white/5 shadow-xl">
        <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
          <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-[#db0011]" />
            AI-Generated Mitigation Action Cards
          </CardTitle>
          <CardDescription className="text-[10px] text-[#94a3b8]">
            Automated recommendations to reduce forecasted exposure scores
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          {AI_RECOMMENDATIONS.map((rec) => {
            const isExecuted = executedActions[rec.id];

            return (
              <div
                key={rec.id}
                className={cn(
                  "p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4",
                  isExecuted
                    ? "bg-[#0b0f19]/40 border-white/5 opacity-60"
                    : "bg-[#1b2235]/40 border-white/5 hover:border-white/10"
                )}
              >
                <div className="space-y-2 text-left md:max-w-3xl">
                  <div className="flex items-center gap-2.5">
                    <Badge className="font-mono text-[9px] bg-[#db0011]/15 text-[#db0011] border-[#db0011]/20 rounded">
                      {rec.id}
                    </Badge>
                    <span className="text-xs font-bold text-white">
                      Trigger: {rec.riskTrigger}
                    </span>
                    <Badge variant="outline" className="text-[9px] text-[#1677ff] border-[#1677ff]/30 font-mono">
                      Conf: {rec.confidence}%
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rec.recommendation}
                  </p>
                  <div className="flex gap-4 text-[9px] text-[#94a3b8] font-mono">
                    <div>Mitigation Impact: <span className="text-white">{rec.impactScore}</span></div>
                    <div>Resource Cost: <span className="text-white">{rec.cost}</span></div>
                    <div>ETA: <span className="text-white">{rec.eta}</span></div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <button
                    disabled={isExecuted}
                    onClick={() => handleExecute(rec.id)}
                    className={cn(
                      "text-xs px-3.5 py-1.5 rounded font-medium flex items-center gap-1.5 transition-all outline-none border",
                      isExecuted
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 cursor-default"
                        : "bg-[#db0011]/10 hover:bg-[#db0011] text-[#db0011] hover:text-white border-[#db0011]/20 hover:border-transparent active:scale-95"
                    )}
                  >
                    {isExecuted ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Executed
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" /> Deploy Mitigation
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
