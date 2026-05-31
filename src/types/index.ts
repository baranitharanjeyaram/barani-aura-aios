export interface Risk {
  id: string;
  code: string;
  title: string;
  category: "Strategic" | "Financial" | "Operational" | "Compliance" | "Cyber & IT" | "Reputational";
  department: "Finance" | "IT & Security" | "Operations" | "Legal" | "HR" | "Internal Audit";
  inherentImpact: number; // 1 to 4
  inherentLikelihood: number; // 1 to 4
  residualImpact: number; // 1 to 4
  residualLikelihood: number; // 1 to 4
  trend: "Increasing" | "Stable" | "Decreasing";
  kriStatus: "Green" | "Amber" | "Red";
  mitigatingControls: string[];
  appetiteStatus: "Within" | "Near Threshold" | "Breached";
  owner: string;
  lastAssessed: string;
}

export interface Control {
  id: string;
  code: string;
  title: string;
  riskId: string;
  type: "Preventative" | "Detective" | "Corrective";
  frequency: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Annual" | "Continuous";
  effectiveness: "Effective" | "Partially Effective" | "Ineffective";
  evidenceStatus: "Submitted" | "Pending" | "Overdue";
  evidenceDueDate: string;
  deficiencyNote?: string;
  maturityScore: number; // 1 to 5 scale
  lastTested: string;
}

export interface ComplianceObligation {
  id: string;
  code: string;
  regulation: string; // e.g., "SOX 404", "GDPR", "NIST CSF"
  title: string;
  status: "Compliant" | "Non-Compliant" | "In Progress" | "Under Review";
  completionPct: number;
  openActions: number;
  dueDate: string;
  severity: "Low" | "Medium" | "High" | "Critical";
}

export interface AuditFinding {
  id: string;
  code: string;
  auditName: string;
  findingTitle: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  recommendation: string;
  dueDate: string;
  owner: string;
}

export interface AIInsight {
  id: string;
  category: "Emerging Risk" | "Compliance Alert" | "Control Deficiency" | "Strategic Recommendation" | "Governance Concern";
  title: string;
  description: string;
  impactScore: "Low" | "Medium" | "High" | "Critical";
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
