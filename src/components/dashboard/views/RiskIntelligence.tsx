import React, { useState } from "react";
import { Role, RISK_HEATMAP_DATA, LIVE_RISK_FEED, RiskEvent } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldAlert, Grid, ListFilter, AlertCircle, TrendingUp, Info } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { cn } from "@/lib/utils";

interface RiskIntelligenceProps {
  currentRole: Role;
}

export default function RiskIntelligence({ currentRole }: RiskIntelligenceProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");
  const [selectedHeatmapItem, setSelectedHeatmapItem] = useState<any>(null);

  // Group events by category for Recharts
  const categoryData = [
    { name: "Cybersecurity", count: 2, color: "#db0011" },
    { name: "Financial", count: 3, color: "#1677ff" },
    { name: "Regulatory", count: 2, color: "#eab308" },
    { name: "Operational", count: 2, color: "#a855f7" },
    { name: "Strategic", count: 1, color: "#10b981" },
  ];

  // Filter live feed
  const filteredFeed = LIVE_RISK_FEED.filter((event) => {
    if (filterSeverity === "ALL") return true;
    return event.severity === filterSeverity;
  });

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Interactive 5x5 Risk Matrix Map (Spans 2) */}
        <Card className="xl:col-span-2 bg-[#121826]/80 border-white/5 shadow-xl">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
                  <Grid className="w-4 h-4 text-[#db0011]" />
                  Executive 5x5 Risk Grid Matrix
                </CardTitle>
                <CardDescription className="text-[10px] text-[#94a3b8]">
                  Hover or select grid nodes to review specific risk scenarios and quantitative exposures
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-[10px] text-[#db0011] border-[#db0011]/30 font-mono">
                Live Heatmap Coordinates
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* The 5x5 Grid SVG Map */}
            <div className="md:col-span-2 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[320px] aspect-square bg-[#0b0f19] border border-white/10 rounded-lg p-2 flex flex-col justify-between">
                {/* Background Heat Zones */}
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 rounded-lg overflow-hidden opacity-30">
                  {Array.from({ length: 25 }).map((_, i) => {
                    const row = Math.floor(i / 5); // 0 (Top) to 4 (Bottom) -> corresponding to Impact 5 to 1
                    const col = i % 5;             // 0 (Left) to 4 (Right) -> corresponding to Likelihood 1 to 5
                    const impactVal = 5 - row;
                    const likelihoodVal = col + 1;
                    const score = impactVal * likelihoodVal;

                    let color = "bg-emerald-500/20"; // Low (green)
                    if (score >= 15) {
                      color = "bg-rose-500/80"; // Critical (red)
                    } else if (score >= 8) {
                      color = "bg-yellow-500/60"; // Medium/High (yellow/orange)
                    }

                    return <div key={i} className={cn("border-[0.25px] border-white/5", color)} />;
                  })}
                </div>

                {/* Grid Cells plotting coordinates */}
                <div className="relative w-full h-full grid grid-cols-5 grid-rows-5">
                  {RISK_HEATMAP_DATA.map((item) => {
                    // map x (Likelihood: 1-5, col: 0-4) and y (Impact: 1-5, row: 4-0)
                    const leftPercent = ((item.x - 1) / 4) * 85 + 7.5;
                    const bottomPercent = ((item.y - 1) / 4) * 85 + 7.5;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedHeatmapItem(item)}
                        style={{
                          left: `${leftPercent}%`,
                          bottom: `${bottomPercent}%`,
                        }}
                        className={cn(
                          "absolute w-4 h-4 rounded-full border border-black shadow-lg hover:scale-125 transition-transform flex items-center justify-center cursor-pointer outline-none z-10",
                          item.severity === "CRITICAL" ? "bg-[#db0011] shadow-[0_0_8px_#db0011]" :
                          item.severity === "HIGH" ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" :
                          item.severity === "MEDIUM" ? "bg-yellow-400" : "bg-emerald-400"
                        )}
                        title={item.title}
                      >
                        <span className="text-[7px] font-bold text-black">{item.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Axis labels */}
              <div className="w-full max-w-[320px] flex justify-between px-2.5 text-[9px] font-mono text-[#94a3b8] mt-1.5">
                <span>Likelihood (Low)</span>
                <span>(High)</span>
              </div>
            </div>

            {/* Sidebar detailing selected risk */}
            <div className="flex flex-col justify-between border-l border-white/5 pl-6 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 font-bold text-white font-mono text-xs uppercase tracking-wide">
                  <Info className="w-4 h-4 text-[#1677ff]" />
                  Grid Telemetry Details
                </div>

                {selectedHeatmapItem ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="font-mono text-[9px] bg-white/5 border-white/10 text-white rounded">
                        NODE #{selectedHeatmapItem.id}
                      </Badge>
                      <Badge
                        className={cn(
                          "font-mono text-[9px] rounded",
                          selectedHeatmapItem.severity === "CRITICAL" && "bg-rose-500/20 text-rose-400 border-rose-500/30",
                          selectedHeatmapItem.severity === "HIGH" && "bg-amber-500/20 text-amber-400 border-amber-500/30",
                          selectedHeatmapItem.severity === "MEDIUM" && "bg-yellow-400/20 text-yellow-400 border-yellow-400/30",
                          selectedHeatmapItem.severity === "LOW" && "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        )}
                      >
                        {selectedHeatmapItem.severity}
                      </Badge>
                    </div>
                    <p className="text-xs font-semibold text-white leading-normal">
                      {selectedHeatmapItem.title}
                    </p>
                    <div className="text-[10px] space-y-1.5 font-mono text-[#94a3b8]">
                      <div>Category: <span className="text-white">{selectedHeatmapItem.category}</span></div>
                      <div>Likelihood (X): <span className="text-white">{selectedHeatmapItem.x} / 5</span></div>
                      <div>Impact (Y): <span className="text-white">{selectedHeatmapItem.y} / 5</span></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic py-8">
                    Select a numbered coordinate node on the matrix grid map to inspect specific risk indicators
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 text-[9px] text-[#94a3b8] font-mono leading-relaxed">
                Critical severity threshold (X * Y &ge; 15) triggers automated warnings in the board compliance center.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Category Distribution Graph */}
        <Card className="bg-[#121826]/80 border-white/5 shadow-xl flex flex-col">
          <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30">
            <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#db0011]" />
              Threat Category Counts
            </CardTitle>
            <CardDescription className="text-[10px] text-[#94a3b8]">
              Distribution of monitored risk register items
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col justify-center">
            <div className="h-[210px] w-full font-mono text-[9px]">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 10, left: 25, bottom: 0 }}>
                    <XAxis type="number" stroke="#475569" strokeWidth={0.5} tickLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#475569" strokeWidth={0.5} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#121826",
                        borderColor: "rgba(255,255,255,0.08)",
                        color: "#fff"
                      }}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={12}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[210px] w-full bg-[#1b2235]/20 animate-pulse rounded-lg" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed Table */}
      <Card className="bg-[#121826]/80 border-white/5 shadow-xl">
        <CardHeader className="pb-2 border-b border-white/5 bg-[#0b0f19]/30 flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xs font-heading font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#db0011] animate-pulse" />
              Real-time Risk Events Feed
            </CardTitle>
            <CardDescription className="text-[10px] text-[#94a3b8]">
              Live continuous monitoring system telemetry
            </CardDescription>
          </div>
          {/* Filters */}
          <div className="flex items-center gap-2">
            <ListFilter className="w-3.5 h-3.5 text-[#94a3b8]" />
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-[#1b2235] border border-white/5 rounded text-[10px] px-2 py-1 text-white outline-none"
            >
              <option value="ALL">Severity: All</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[250px] w-full">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 bg-[#0b0f19]/20 font-mono text-[9px] text-[#94a3b8] uppercase tracking-wider">
                  <th className="p-3.5 pl-6">ID</th>
                  <th className="p-3.5">Threat Event</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5 text-center">Severity</th>
                  <th className="p-3.5">Owner</th>
                  <th className="p-3.5">Impact Threshold</th>
                  <th className="p-3.5 pr-6 text-right">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[11px]">
                {filteredFeed.map((event) => (
                  <tr key={event.id} className="hover:bg-[#1b2235]/25 transition-colors">
                    <td className="p-3.5 pl-6 font-mono font-semibold text-[#db0011]">
                      {event.id}
                    </td>
                    <td className="p-3.5 font-medium text-white max-w-[250px] truncate" title={event.title}>
                      {event.title}
                    </td>
                    <td className="p-3.5 text-slate-300">
                      {event.category}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-bold inline-block border",
                          event.severity === "CRITICAL" && "bg-rose-500/10 text-rose-500 border-rose-500/20",
                          event.severity === "HIGH" && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                          event.severity === "MEDIUM" && "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
                          event.severity === "LOW" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        )}
                      >
                        {event.severity}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400">
                      {event.owner}
                    </td>
                    <td className="p-3.5 text-slate-300 max-w-[200px] truncate" title={event.impact}>
                      {event.impact}
                    </td>
                    <td className="p-3.5 pr-6 text-right text-[#94a3b8] font-mono">
                      {event.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
