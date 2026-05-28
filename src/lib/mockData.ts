export type Role =
  | "Super Admin"
  | "Chief Risk Officer"
  | "Internal Auditor"
  | "Compliance Manager"
  | "Executive Leadership"
  | "Department Head"
  | "Risk Analyst"
  | "Public User";

export interface RoleConfig {
  name: Role;
  title: string;
  department: string;
  clearance: string;
  allowedViews: string[];
  kpis: {
    label: string;
    value: string | number;
    change: number;
    trend: "up" | "down" | "neutral";
    description: string;
  }[];
}

export const ROLE_CONFIGS: Record<Role, RoleConfig> = {
  "Chief Risk Officer": {
    name: "Chief Risk Officer",
    title: "Chief Risk Officer",
    department: "Risk Management",
    clearance: "Level 5 (L5 - Global CRO)",
    allowedViews: ["Dashboard", "Risk Intelligence", "Internal Audit", "Compliance", "AI Analytics", "RCSA", "Findings Tracker", "Reports", "Alerts", "AI Copilot", "Settings"],
    kpis: [
      { label: "Enterprise Risk Score", value: "78.4", change: -2.1, trend: "down", description: "Consolidated risk index (target: < 70)" },
      { label: "Open High Risks", value: 14, change: 1, trend: "up", description: "Red-severity risks requiring mitigation" },
      { label: "Control Effectiveness", value: "86.2%", change: 1.5, trend: "up", description: "Average efficiency of key business controls" },
      { label: "Predictive Breach Probability", value: "12.4%", change: -4.8, trend: "down", description: "AI-modeled risk breach in 30 days" },
    ],
  },
  "Super Admin": {
    name: "Super Admin",
    title: "Global System Administrator",
    department: "IT & Information Security",
    clearance: "Level 6 (L6 - Full Control)",
    allowedViews: ["Dashboard", "Risk Intelligence", "Internal Audit", "Compliance", "AI Analytics", "RCSA", "Findings Tracker", "Reports", "Alerts", "AI Copilot", "Settings"],
    kpis: [
      { label: "Active Connections", value: "3,842", change: 12.1, trend: "up", description: "Active system tokens & sensor feeds" },
      { label: "Platform Health Index", value: "99.98%", change: 0.01, trend: "neutral", description: "Uptime of critical AI engines & db clusters" },
      { label: "AI Model Precision", value: "97.4%", change: 0.8, trend: "up", description: "F1 Score of emerging threat classifiers" },
      { label: "Policy Sync Speed", value: "25ms", change: -12.0, trend: "down", description: "Distributed ledger audit log replication latency" },
    ],
  },
  "Internal Auditor": {
    name: "Internal Auditor",
    title: "Head of Internal Audit",
    department: "Audit Services",
    clearance: "Level 4 (L4 - Audits Read/Write)",
    allowedViews: ["Dashboard", "Internal Audit", "Findings Tracker", "Reports", "Alerts", "AI Copilot"],
    kpis: [
      { label: "Audit Progress", value: "68%", change: 5.0, trend: "up", description: "FY26 Audit Plan Completion" },
      { label: "Unresolved Findings", value: 43, change: -12.0, trend: "down", description: "Open audit issues pending action plan" },
      { label: "Overdue Findings", value: 3, change: -2.0, trend: "down", description: "Findings past target remediation date" },
      { label: "Remediation Velocity", value: "18.4 Days", change: -2.5, trend: "down", description: "Avg time to close audit items" },
    ],
  },
  "Compliance Manager": {
    name: "Compliance Manager",
    title: "Director of Global Compliance",
    department: "Legal & Regulatory Affairs",
    clearance: "Level 4 (L4 - Compliance Lead)",
    allowedViews: ["Dashboard", "Compliance", "RCSA", "Findings Tracker", "Reports", "Alerts", "AI Copilot"],
    kpis: [
      { label: "Compliance Health Score", value: "94.8%", change: 0.4, trend: "up", description: "Obligation alignment index" },
      { label: "RCSA Campaign Status", value: "92%", change: 14.2, trend: "up", description: "Q2 self-assessment completion rate" },
      { label: "Policy Exceptions", value: 8, change: -1, trend: "down", description: "Active authorized compliance waivers" },
      { label: "Regulatory Alerts", value: 29, change: 4, trend: "up", description: "New regulatory changes tracked this week" },
    ],
  },
  "Executive Leadership": {
    name: "Executive Leadership",
    title: "Chief Executive Officer / Board Member",
    department: "Executive Office",
    clearance: "Level 5 (L5 - Executive Vision)",
    allowedViews: ["Dashboard", "Risk Intelligence", "AI Analytics", "Reports", "Alerts", "AI Copilot"],
    kpis: [
      { label: "AI Governance Index", value: "92.4", change: 3.2, trend: "up", description: "Board compliance & ethical AI framework score" },
      { label: "Enterprise Risk Score", value: "78.4", change: -2.1, trend: "down", description: "Consolidated enterprise risk index" },
      { label: "Global Compliance Rating", value: "A+", change: 0, trend: "neutral", description: "Overall rating from regulatory reviews" },
      { label: "Unmitigated Exposure", value: "$4.2M", change: -1.8, trend: "down", description: "AI-calculated net financial value at risk" },
    ],
  },
  "Department Head": {
    name: "Department Head",
    title: "VP of Operations (Retail/Ops)",
    department: "Global Operations",
    clearance: "Level 3 (L3 - Dept View)",
    allowedViews: ["Dashboard", "Risk Intelligence", "RCSA", "Findings Tracker", "Reports", "Alerts", "AI Copilot"],
    kpis: [
      { label: "Operations Risk Index", value: "62.1", change: 4.8, trend: "up", description: "Ops-specific aggregated risk index" },
      { label: "Control Test Pass Rate", value: "91.2%", change: -0.8, trend: "down", description: "Pass rate of automated control scripts" },
      { label: "Open Department Findings", value: 7, change: 2, trend: "up", description: "Audit items assigned to Operations" },
      { label: "Staff Training Compliancy", value: "98.4%", change: 1.2, trend: "up", description: "Required compliance training completion" },
    ],
  },
  "Risk Analyst": {
    name: "Risk Analyst",
    title: "Senior Risk Quantitative Analyst",
    department: "Risk Analytics",
    clearance: "Level 3 (L3 - Analyst Write)",
    allowedViews: ["Dashboard", "Risk Intelligence", "Compliance", "AI Analytics", "Findings Tracker", "Alerts", "AI Copilot"],
    kpis: [
      { label: "Risk Event Count", value: 142, change: -8.0, trend: "down", description: "Monitored telemetry alerts logged (30d)" },
      { label: "AI Score Accuracy", value: "94.6%", change: 1.4, trend: "up", description: "Confidence score model correlation index" },
      { label: "KRI Breach Triggers", value: 4, change: 1, trend: "up", description: "Key Risk Indicators outside safe bands" },
      { label: "Simulations Run", value: "248", change: 35.0, trend: "up", description: "Monte Carlo risk scenarios processed (7d)" },
    ],
  },
  "Public User": {
    name: "Public User",
    title: "Public Guest Observer",
    department: "Public Relations",
    clearance: "Level 1 (L1 - Public Access / Read-Only)",
    allowedViews: ["Dashboard", "AI Copilot"],
    kpis: [
      { label: "Public Trust Rating", value: "91.2%", change: 1.2, trend: "up", description: "Consumer trust & algorithmic fairness rating" },
      { label: "Regulatory Compliance Rate", value: "98.4%", change: 0.5, trend: "up", description: "Completed external governance checks" },
      { label: "Resolved Audits", value: "14", change: 3, trend: "up", description: "Mitigated risk findings closed this year" },
      { label: "Ethical AI Index", value: "95.6", change: 0.8, trend: "up", description: "Public transparency compliance index" },
    ],
  },
};

// 1. Executive command center indicators
export const GENERAL_METRICS = {
  riskScore: 78.4,
  complianceScore: 94.8,
  aiIndex: 92.4,
  openAuditIssues: 43,
  trendScore: [
    { name: "Jan", Risk: 82, Compliance: 91, AI: 88 },
    { name: "Feb", Risk: 81, Compliance: 92, AI: 89 },
    { name: "Mar", Risk: 79, Compliance: 93, AI: 91 },
    { name: "Apr", Risk: 79, Compliance: 94, AI: 90 },
    { name: "May", Risk: 78.4, Compliance: 94.8, AI: 92.4 },
  ],
};

// 2. Real-Time Risk Monitoring Data
export interface RiskEvent {
  id: string;
  title: string;
  category: "Cybersecurity" | "Financial" | "Operational" | "Regulatory" | "Strategic";
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  probability: number; // percentage
  owner: string;
  impact: string;
  time: string;
  trend: "up" | "down" | "stable";
}

export const LIVE_RISK_FEED: RiskEvent[] = [
  {
    id: "RSK-904",
    title: "Unauthorized Access Attempts in Cloud Portal (South Asia Cluster)",
    category: "Cybersecurity",
    severity: "CRITICAL",
    probability: 94,
    owner: "Security Ops",
    impact: "Potential compromise of customer data records",
    time: "2 mins ago",
    trend: "up",
  },
  {
    id: "RSK-829",
    title: "Volatility Shift in EUR/USD Hedging Program",
    category: "Financial",
    severity: "HIGH",
    probability: 72,
    owner: "Treasury Dept",
    impact: "Unhedged FX translation exposure exceeds $1.5M threshold",
    time: "15 mins ago",
    trend: "up",
  },
  {
    id: "RSK-712",
    title: "Proposed EU AI Act Compliance Rule Updates",
    category: "Regulatory",
    severity: "HIGH",
    probability: 88,
    owner: "Compliance Legal",
    impact: "Required retraining on algorithmic bias controls",
    time: "1 hour ago",
    trend: "stable",
  },
  {
    id: "RSK-609",
    title: "Core Core-Banking Database Sync Latency Spike",
    category: "Operational",
    severity: "MEDIUM",
    probability: 45,
    owner: "IT Operations",
    impact: "Transaction log replication delays in backup node",
    time: "3 hours ago",
    trend: "down",
  },
  {
    id: "RSK-588",
    title: "Competitor M&A Announcement (APAC Market Expansion)",
    category: "Strategic",
    severity: "MEDIUM",
    probability: 60,
    owner: "Strategic Planning",
    impact: "Market share dilution in cross-border retail payment corridors",
    time: "5 hours ago",
    trend: "stable",
  },
];

// Heatmap Data (5x5 Matrix)
// Impact (1 to 5) vs Likelihood (1 to 5)
export interface HeatmapItem {
  id: string;
  x: number; // Likelihood (1-5)
  y: number; // Impact (1-5)
  title: string;
  category: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}

export const RISK_HEATMAP_DATA: HeatmapItem[] = [
  { id: "1", x: 5, y: 5, title: "Cloud Infrastructure Ransomware Attack", category: "Cybersecurity", severity: "CRITICAL" },
  { id: "2", x: 4, y: 5, title: "GDPR Non-Compliance Fines", category: "Regulatory", severity: "CRITICAL" },
  { id: "3", x: 5, y: 4, title: "Third-Party Cloud Vendor Outage", category: "Operational", severity: "CRITICAL" },
  { id: "4", x: 3, y: 5, title: "FX Liquidity Pool Shortage", category: "Financial", severity: "HIGH" },
  { id: "5", x: 4, y: 4, title: "AI Model Bias/Discrimination Legal Suit", category: "Regulatory", severity: "HIGH" },
  { id: "6", x: 2, y: 5, title: "Sovereign Debt Default in EMEA Corridors", category: "Financial", severity: "HIGH" },
  { id: "7", x: 4, y: 3, title: "IT Talent Retention Crisis", category: "Strategic", severity: "MEDIUM" },
  { id: "8", x: 3, y: 3, title: "Interest Rate SWAP Curve Shift", category: "Financial", severity: "MEDIUM" },
  { id: "9", x: 5, y: 2, title: "Minor API Gateway Latency Anomalies", category: "Operational", severity: "LOW" },
  { id: "10", x: 2, y: 2, title: "Office Lease Contract Renegotiation Delay", category: "Strategic", severity: "LOW" },
];

// 3. AI Predictive Analytics Data
export const RISK_FORECAST_12M = [
  { month: "Jun 26", Baseline: 78, Forecast: 78, UpperBound: 80, LowerBound: 76 },
  { month: "Jul 26", Baseline: 77.2, Forecast: 76.5, UpperBound: 79, LowerBound: 74 },
  { month: "Aug 26", Baseline: 76.8, Forecast: 74.2, UpperBound: 78, LowerBound: 71 },
  { month: "Sep 26", Baseline: 76.5, Forecast: 75.1, UpperBound: 81, LowerBound: 70 },
  { month: "Oct 26", Baseline: 76.0, Forecast: 73.0, UpperBound: 79, LowerBound: 68 },
  { month: "Nov 26", Baseline: 75.4, Forecast: 72.1, UpperBound: 79, LowerBound: 66 },
  { month: "Dec 26", Baseline: 75.0, Forecast: 70.4, UpperBound: 78, LowerBound: 63 },
  { month: "Jan 27", Baseline: 74.8, Forecast: 69.8, UpperBound: 78, LowerBound: 61 },
  { month: "Feb 27", Baseline: 74.2, Forecast: 68.2, UpperBound: 77, LowerBound: 59 },
  { month: "Mar 27", Baseline: 73.9, Forecast: 67.4, UpperBound: 77, LowerBound: 58 },
  { month: "Apr 27", Baseline: 73.5, Forecast: 65.1, UpperBound: 76, LowerBound: 55 },
  { month: "May 27", Baseline: 73.1, Forecast: 63.8, UpperBound: 75, LowerBound: 53 },
];

export interface AIRecommendation {
  id: string;
  riskTrigger: string;
  recommendation: string;
  confidence: number;
  impactScore: string;
  cost: "LOW" | "MEDIUM" | "HIGH";
  eta: string;
}

export const AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: "REC-101",
    riskTrigger: "Cloud API Access Spikes (Cybersecurity)",
    recommendation: "Deploy automated Zero-Trust API rate-limiting rules on Gateway endpoints and restrict non-regional proxy traffic.",
    confidence: 96.8,
    impactScore: "High (Reduces breach likelihood by 42%)",
    cost: "LOW",
    eta: "Instant via script",
  },
  {
    id: "REC-102",
    riskTrigger: "EUR/USD Currency Exposure volatility (Financial)",
    recommendation: "Implement synthetic swap derivative collars targeting lower currency boundary range of 1.065 to lock translation losses.",
    confidence: 89.2,
    impactScore: "Medium (Mitigates $750K downside risk)",
    cost: "MEDIUM",
    eta: "48 Hours",
  },
  {
    id: "REC-103",
    riskTrigger: "EU AI Act Compliance (Regulatory)",
    recommendation: "Conduct automated synthetic bias sweeps across dynamic loan approval pipelines. Inject model weight constraints.",
    confidence: 94.5,
    impactScore: "Critical (Prevents potential 4% revenue global fine)",
    cost: "HIGH",
    eta: "14 Days",
  },
];

// 4. Internal Audit Management Data
export interface AuditProject {
  id: string;
  name: string;
  department: string;
  progress: number;
  status: "Planning" | "Fieldwork" | "Reporting" | "Completed";
  leadAuditor: string;
  findingsCount: number;
  riskRating: "Critical" | "High" | "Medium" | "Low";
  startDate: string;
  endDate: string;
}

export const AUDIT_UNIVERSE: AuditProject[] = [
  {
    id: "AUD-2026-01",
    name: "AI & Algorithmic Ethics Audit",
    department: "Data Science & R&D",
    progress: 75,
    status: "Reporting",
    leadAuditor: "Sarah Jenkins (CIA)",
    findingsCount: 4,
    riskRating: "Critical",
    startDate: "2026-03-01",
    endDate: "2026-06-15",
  },
  {
    id: "AUD-2026-02",
    name: "SWIFT Payment Corridor Access Control Review",
    department: "Global Treasury",
    progress: 100,
    status: "Completed",
    leadAuditor: "Michael Chen (CISA)",
    findingsCount: 2,
    riskRating: "Critical",
    startDate: "2026-01-10",
    endDate: "2026-04-30",
  },
  {
    id: "AUD-2026-03",
    name: "GDPR Compliance in Data Lake Storage",
    department: "Data Engineering & Security",
    progress: 40,
    status: "Fieldwork",
    leadAuditor: "Sophia Patel (CISM)",
    findingsCount: 6,
    riskRating: "High",
    startDate: "2026-04-15",
    endDate: "2026-08-01",
  },
  {
    id: "AUD-2026-04",
    name: "Corporate ESG Disclosures Audit",
    department: "Investor Relations & Compliance",
    progress: 15,
    status: "Planning",
    leadAuditor: "Marcus Aurelius (CIA)",
    findingsCount: 0,
    riskRating: "Medium",
    startDate: "2026-05-20",
    endDate: "2026-10-15",
  },
  {
    id: "AUD-2026-05",
    name: "Automated Control Monitoring Integration Review",
    department: "Information Technology",
    progress: 5,
    status: "Planning",
    leadAuditor: "Eleanor Vance (CISA)",
    findingsCount: 0,
    riskRating: "Medium",
    startDate: "2026-06-01",
    endDate: "2026-11-30",
  },
];

// 5. RCSA & Compliance Data
export interface ComplianceObligation {
  id: string;
  regulation: string;
  section: string;
  description: string;
  status: "COMPLIANT" | "PARTIAL" | "NON-COMPLIANT" | "UNDER_REVIEW";
  controlOwner: string;
  testingFrequency: "Continuous" | "Monthly" | "Quarterly" | "Annual";
  effectivenessScore: number; // percentage
}

export const COMPLIANCE_OBLIGATIONS: ComplianceObligation[] = [
  {
    id: "OBL-801",
    regulation: "EU AI Act",
    section: "Article 9 (Risk Management Systems)",
    description: "Establish and run a continuous risk assessment process for high-risk AI models.",
    status: "COMPLIANT",
    controlOwner: "CRO AI Risk Team",
    testingFrequency: "Continuous",
    effectivenessScore: 92,
  },
  {
    id: "OBL-802",
    regulation: "PCI-DSS v4.0",
    section: "Requirement 6 (Secure Systems & Software)",
    description: "Enforce automated vulnerability screening on code deployment pipelines and API gateways.",
    status: "COMPLIANT",
    controlOwner: "SecOps DevSec",
    testingFrequency: "Continuous",
    effectivenessScore: 97,
  },
  {
    id: "OBL-803",
    regulation: "SOX 404",
    section: "Section 404 (Financial Control Reporting)",
    description: "Validate logical identity authorization rules over ledger journal entry changes.",
    status: "PARTIAL",
    controlOwner: "Financial Controller",
    testingFrequency: "Monthly",
    effectivenessScore: 78,
  },
  {
    id: "OBL-804",
    regulation: "GDPR",
    section: "Article 32 (Security of Processing)",
    description: "Implement structural pseudo-anonymization algorithms on database exports.",
    status: "NON-COMPLIANT",
    controlOwner: "Database Security Lead",
    testingFrequency: "Quarterly",
    effectivenessScore: 40,
  },
];

// RCSA Department campaigns status
export const RCSA_CAMPAIGNS = [
  { department: "Operations", status: "Completed", rate: 100, supervisor: "Jane Doe" },
  { department: "Treasury", status: "Completed", rate: 100, supervisor: "Frank Sterling" },
  { department: "Information Technology", status: "In-Progress", rate: 84, supervisor: "Steve Chen" },
  { department: "Marketing & Growth", status: "In-Progress", rate: 58, supervisor: "Alice Mercer" },
  { department: "Customer Support", status: "Not Started", rate: 0, supervisor: "David Vance" },
];

// 6. Findings Tracker Data
export interface AuditFinding {
  id: string;
  title: string;
  source: string; // e.g. "AI & Ethics Audit"
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  department: string;
  owner: string;
  dueDate: string;
  status: "OPEN" | "IN_PROGRESS" | "PENDING_VALIDATION" | "CLOSED";
  remediationPlan: string;
}

export const AUDIT_FINDINGS_REGISTRY: AuditFinding[] = [
  {
    id: "FND-001",
    title: "Algorithmic Bias in Dynamic Lending Model (Q2 Draft)",
    source: "AI & Algorithmic Ethics Audit",
    severity: "CRITICAL",
    department: "Data Science & R&D",
    owner: "Dr. Aris Thorne",
    dueDate: "2026-06-30",
    status: "IN_PROGRESS",
    remediationPlan: "Rewrite risk weight layers and retrain classification logic to balance demographic parity constraints.",
  },
  {
    id: "FND-002",
    title: "Shared Root Keys across Staging API Databases",
    source: "PCI-DSS v4.0 Audit Log",
    severity: "HIGH",
    department: "Information Technology",
    owner: "Janice Miller",
    dueDate: "2026-05-15",
    status: "PENDING_VALIDATION",
    remediationPlan: "Implement AWS Secrets Manager dynamically fetching JWT secrets with 12-hour rotated salts.",
  },
  {
    id: "FND-003",
    title: "Unencrypted PII Data in Temp CSV Storage Logs",
    source: "GDPR Internal Sweep",
    severity: "CRITICAL",
    department: "Data Engineering & Security",
    owner: "Bob Vance",
    dueDate: "2026-07-05",
    status: "OPEN",
    remediationPlan: "Install automated file scrubbing hooks deleting export logs older than 60 minutes.",
  },
  {
    id: "FND-004",
    title: "Lack of Dual-Authorization for Treasury Swaps above $5M",
    source: "SWIFT Access Audit",
    severity: "MEDIUM",
    department: "Global Treasury",
    owner: "Frank Sterling",
    dueDate: "2026-08-15",
    status: "OPEN",
    remediationPlan: "Enforce multi-sig approval routines in custom ERP workflow configs.",
  },
  {
    id: "FND-005",
    title: "Outdated Cyber Insurance Exposure Matrix Validation",
    source: "Ops Self-Assessment",
    severity: "LOW",
    department: "Risk Management",
    owner: "Mark Cro",
    dueDate: "2026-09-30",
    status: "CLOSED",
    remediationPlan: "Updated insurance policy tables and aligned with reinsurer liability limits (completed 2026-05-01).",
  },
];

// 7. System-wide live alerts center logs
export interface AlertNotification {
  id: string;
  type: "CRITICAL_RISK" | "COMPLIANCE_BREACH" | "AI_ANOMALY" | "AUDIT_ALERT" | "REMINDER";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const SYSTEM_ALERTS_LOG: AlertNotification[] = [
  {
    id: "ALT-001",
    type: "AI_ANOMALY",
    title: "Algorithmic Drift Detected",
    message: "Lending eligibility index model variance shifted > 5% in past 2 hours. Potential bias drift.",
    timestamp: "10:45 AM",
    isRead: false,
  },
  {
    id: "ALT-002",
    type: "CRITICAL_RISK",
    title: "API Breach Threshold Triggered",
    message: "South Asia Gateway logs show unauthorized user tokens calling /admin root paths.",
    timestamp: "10:41 AM",
    isRead: false,
  },
  {
    id: "ALT-003",
    type: "COMPLIANCE_BREACH",
    title: "GDPR Compliance Breach Alert",
    message: "Telemetry detected unencrypted plain-text customer profiles exported to unverified Azure Bucket.",
    timestamp: "09:12 AM",
    isRead: true,
  },
  {
    id: "ALT-004",
    type: "AUDIT_ALERT",
    title: "Audit Finding Response Required",
    message: "FND-001 remediation deadline is in 30 days. No mitigation approval submitted.",
    timestamp: "Yesterday",
    isRead: true,
  },
  {
    id: "ALT-005",
    type: "REMINDER",
    title: "RCSA Deadline Looming",
    message: "Information Technology self-assessment completion is currently 84% (Due: June 1st).",
    timestamp: "2 days ago",
    isRead: true,
  },
];

// 8. AI Copilot preset queries and automated chat responders
export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; actionId: string }[];
}

export const COPILOT_PRESETS = [
  "Explain lending model bias drift (ALT-001)",
  "Summarize AI & Ethics audit findings",
  "Generate risk executive report summary",
  "How is global compliance health score computed?",
];

export const getCopilotResponse = (message: string, currentRole: Role): string => {
  const normalized = message.toLowerCase();
  
  if (normalized.includes("bias") || normalized.includes("alt-001") || normalized.includes("drift")) {
    return `[AI Engine Evaluation]
Drift Anomaly detected in **Lending eligibility model** (v2.4-retail):
- **Core issue**: The scoring weights for demographic index shifts drifted outside the safe bounds by **5.2%**.
- **Impact**: Potential skew on approvals in low-income bands.
- **Recommended Action**: Restrict model execution variance threshold to **0.02** and trigger automated shadow pipeline retraining.
- **Approval status**: Pending authorization from CRO/Super Admin.`;
  }
  
  if (normalized.includes("audit") || normalized.includes("fnd") || normalized.includes("findings")) {
    return `[AI Internal Audit Analysis]
There are currently **4 open major findings** in the registry. 
- **Critical (FND-001)**: Bias in Dynamic Lending Model (assigned to Dr. Thorne, due in 30 days, in progress).
- **High (FND-002)**: Database Root Keys staging (assigned to J. Miller, pending verification).
- **Critical (FND-003)**: GDPR Lake PII leaks (assigned to B. Vance, open).
- **Medium (FND-004)**: SWIFT treasury limits (assigned to F. Sterling, open).

Would you like me to compile a draft remediation follow-up letter for the CRO?`;
  }
  
  if (normalized.includes("report") || normalized.includes("summary") || normalized.includes("executive")) {
    return `[AI Report Synthesis]
**Executive Risk Summary (FY26 Q2 Draft)**
- **Consolidated Risk Rating**: 78.4 (Amber/High Risk) - due to cloud infrastructure and model governance risks.
- **Compliance Health Rating**: 94.8% Compliant (A+ rating).
- **Critical items**: Cybersecurity attempts South Asia (mitigated), Database Sync Latency (restored).
- **Remediation velocity**: Decreasing average backlog closing from 21 days to 18.4 days.

*Generated automatically for Role: ${currentRole}. Ready for board export.*`;
  }
  
  if (normalized.includes("health") || normalized.includes("compliance")) {
    return `[AI Governance Engine]
The **Global Compliance Health Score (94.8%)** aggregates status indicators from active regulations:
- **EU AI Act Article 9**: 92% effectiveness (Compliant)
- **PCI-DSS v4.0 Requirement 6**: 97% effectiveness (Compliant)
- **SOX 404**: 78% effectiveness (Partially Compliant)
- **GDPR Article 32**: 40% effectiveness (Non-Compliant)

Formula: \`Sum(Weight_i * EffectivenessScore_i) / Sum(Weights)\`. GDPR holds the highest weight coefficient (1.5x) in EU corridors.`;
  }

  return `I am the Aura Enterprise Copilot. Based on your current access clearance (**${currentRole}**), I can retrieve real-time data feeds, explain governance anomalies, and compile automated compliance reports.

Try asking:
- "Summarize AI & Ethics audit findings"
- "Explain lending model bias drift (ALT-001)"
- "Generate risk executive report summary"`;
};
