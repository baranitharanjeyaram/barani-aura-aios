import { MOCK_RISKS, MOCK_CONTROLS, MOCK_COMPLIANCE, MOCK_AUDITS } from "@/components/mockData";

export interface AIResponse {
  message: string;
  suggestedPrompts: string[];
}

export function generateAiResponse(prompt: string): AIResponse {
  const normalized = prompt.toLowerCase().trim();

  // Prompt: Analyze this risk (Cyber risk focus or general)
  if (normalized.includes("analyze this risk") || normalized.includes("analyze risk") || normalized.includes("rsk-cyb-001")) {
    return {
      message: `### **ARAIS Autonomous Risk Intelligence Report: Cyber & IT Risk (RSK-CYB-001)**

**Risk Identifier:** RSK-CYB-001  
**Title:** Sovereign cloud data breach and data leakage via third-party APIs  
**Risk Category:** Cyber & IT | **Current Owner:** Sarah Jenkins (CISO)  

---

#### **1. Vulnerability & Threat Vector Analysis**
* **External Threat Actor Profile:** Structured state-sponsored APT groups targeting sovereign data platforms using API injection and token forgery.
* **Internal Threat Vector:** Over-privileged developer endpoints. Leakage of cloud keys via private repositories (e.g. Git credentials mismatch).
* **Current Status:** **Breached (Risk Appetite)**. Inherent Score: **16 (Critical)** $\\rightarrow$ Residual Score: **6 (High)**. 

#### **2. Mitigating Controls Health Indicator**
* **Control CTL-CYB-101 (Zero Trust Network Access):** Verified **Effective** (Maturity Score: 4.8/5.0).
* **Control CTL-CYB-102 (API Monitoring & DLP Filters):** Currently **Ineffective (Deficient)** due to stale signature patterns on 2 core database clusters. This control gap is the primary driver of the appetite breach.

#### **3. Financial & Operational Exposure Estimate**
* **Quantitative Exposure:** \$12.4M USD (comprising SEC regulatory fine projections, legal defense liabilities, and customer SLA indemnification payouts).
* **Qualitative Damage:** Downgrade in enterprise governance confidence index; potential board-level audit investigations.

---

> [!WARNING]
> **ARAIS AI Recommendation:** Implement an automated endpoint patch for CTL-CYB-102 immediately. Just-In-Time access controls must be deployed on the sovereign database nodes to transition this risk to 'Within Appetite' limits.`,
      suggestedPrompts: [
        "Recommend mitigating controls.",
        "Explain compliance implications.",
        "Generate executive summary."
      ]
    };
  }

  // Prompt: Recommend mitigating controls
  if (normalized.includes("mitigating controls") || normalized.includes("recommend controls") || normalized.includes("mitigate")) {
    return {
      message: `### **Mitigation Architecture Recommendation**

Based on the open deficiencies in the control environment (specifically targeting **CTL-CYB-102** and **CTL-OPS-901**), the ARAIS platform has mapped the following structural mitigations matching the **COSO Framework** standards:

---

#### **Primary Recommendation: Privileged Access & API Security Gateway**
1. **Just-In-Time (JIT) Database Administration Access**
   * *Control Type:* Preventative
   * *Action:* Restrict sovereign database modifications. Implement automated approvals requiring peer validation.
   * *Target Risk:* Cyber breach (RSK-CYB-001) / Audit gap (AUD-CYB-2025-01).

2. **Automated KRI and Threat Definition Sync**
   * *Control Type:* Detective
   * *Action:* Program an hourly webhook to sync DLP threat definitions with cloud security hubs, bypassing manual updates.
   * *Target Control:* CTL-CYB-102 (currently ineffective).

#### **Secondary Recommendation: Operational HR Redundancies**
3. **Succession Planning and Cross-Training Certification**
   * *Control Type:* Preventative
   * *Action:* Deploy a learning management workflow with automated reminders for quantitative trading scripts.
   * *Target Risk:* Key Person Dependency (RSK-OPS-009).

---

> [!TIP]
> Deployed controls should be tested via continuous automated scripts rather than quarterly self-assessments to ensure real-time compliance reporting.`,
      suggestedPrompts: [
        "Analyze this risk.",
        "Create board-ready insights.",
        "Explain compliance implications."
      ]
    };
  }

  // Prompt: Generate executive summary
  if (normalized.includes("executive summary") || normalized.includes("summary") || normalized.includes("mis report")) {
    return {
      message: `### **BARANI AURA AIOS – Executive Summary & Governance Overview**
**Date:** May 31, 2026 | **Target Audience:** Board Audit & Risk Committees  

---

#### **1. Overall Risk Posture**
* **Total Risks Tracked:** ${MOCK_RISKS.length} Enterprise Risks
* **Critical/High Risks:** ${MOCK_RISKS.filter(r => r.inherentImpact >= 4).length} active critical risks (with 2 currently breaching risk appetite thresholds: **Cyber Leakage** and **Digital Asset Regulation**).
* **Risk Appetite Status:** 2 Breached, 4 Near Threshold, 4 Within Appetite.

#### **2. Control Assurance Index**
* **Total Controls Active:** ${MOCK_CONTROLS.length}
* **Effective Controls:** ${MOCK_CONTROLS.filter(c => c.effectiveness === "Effective").length} (${Math.round((MOCK_CONTROLS.filter(c => c.effectiveness === "Effective").length / MOCK_CONTROLS.length) * 100)}%)
* **Deficiencies Outstanding:** 2 Critical (DLP filter out-of-date, and Succession training overdue).
* **Evidence SLA Compliance:** 75% on time, with 2 requests currently overdue.

#### **3. Compliance & Audit Universe**
* **Regulatory Compliance Score:** ${Math.round(MOCK_COMPLIANCE.reduce((acc, curr) => acc + curr.completionPct, 0) / MOCK_COMPLIANCE.length)}% Compliant.
* **Audit Universe Findings:** ${MOCK_AUDITS.length} Open Findings. 1 Critical finding related to admin privilege escalation in sovereign databases.

---

> [!NOTE]
> **Executive Action Required:** AI analysis predicts a 15% increase in operational compliance friction if third-party risk mapping for the DORA (EU) framework is not completed by Q3 2026.`,
      suggestedPrompts: [
        "Create board-ready insights.",
        "Explain compliance implications.",
        "Recommend mitigating controls."
      ]
    };
  }

  // Prompt: Explain compliance implications
  if (normalized.includes("compliance implications") || normalized.includes("compliance") || normalized.includes("regulation")) {
    return {
      message: `### **Regulatory Compliance & Legal Risk Implications**

ARAIS has cross-referenced the current control profile with global compliance registers (including **SOX 404**, **GDPR**, and **DORA**):

---

#### **1. DORA (Digital Operational Resilience Act) - EU**
* **Status:** **Non-Compliant (45% completion)**.
* **Impact:** Immediate regulatory investigations by European Supervisory Authorities (ESAs) if third-party ICT service provider mappings are not finalized by the implementation deadline.
* **Open Actions:** 7 critical action plans currently unassigned.

#### **2. SOX 404 (Sarbanes-Oxley Act)**
* **Status:** **Compliant (100% completion)**.
* **Assurance:** Core financial reporting controls (CTL-CMP-401) are active and verified. The segregation of duties validation engine is performing daily validations.

#### **3. GDPR (General Data Protection Regulation)**
* **Status:** **In Progress (82% completion)**.
* **Vulnerability:** Consent management script audits are running, but third-party API data transfers (Risk RSK-CYB-001) present a compliance threat vector.

---

> [!CAUTION]
> A combination of an ineffective DLP control and open GDPR action plans creates a high-exposure liability bubble under Art. 83 of GDPR (fines up to 4% of annual global turnover).`,
      suggestedPrompts: [
        "Recommend mitigating controls.",
        "Analyze this risk.",
        "Generate executive summary."
      ]
    };
  }

  // Prompt: Create board-ready insights
  if (normalized.includes("board-ready insights") || normalized.includes("board") || normalized.includes("insights")) {
    return {
      message: `### **ARAIS Board-Ready Intelligence Pack**
**Classification:** STRICTLY CONFIDENTIAL – EXECUTIVE BOARD LEVEL  

---

#### **Key Decision Vectors**

1. **Strategic Shift: Digital Asset Regulation**
   * *The Issue:* The CSO's assessment for Digital Asset Regulation adapts slowly (RSK-STR-007 is at **Breached** state).
   * *Decision Matrix:* Capitalize \$2.5M to create a dedicated compliance buffer team or pause product rollout in the EU region pending regulatory clarifications.

2. **Capital Efficiency vs. Assurance Control**
   * *Control Effectiveness:* Continuous testing is at 75% health. 
   * *AI Forecast:* Re-allocating 10% of internal audit resources toward continuous control automation tools will reduce evidence submission cycle times by 40%.

3. **Emerging Operational Threat Pattern**
   * Key Person Dependency (RSK-OPS-009) is on a rising risk trend due to high turnover rates in quantitative developer positions.

---

| Metric | Current Posture | Board Target | Status |
| :--- | :--- | :--- | :--- |
| Core Compliance Score | 83% | > 95% | Amber |
| Overdue Audits / Findings | 3 Open | 0 | Red |
| Continuous Control Testing | 75% | > 90% | Amber |
| High Risk Incidents | 0 | 0 | Green |

---
*Signed by ARAIS Virtual Risk Specialist. Ready for Board PDF generation.*`,
      suggestedPrompts: [
        "Generate executive summary.",
        "Recommend mitigating controls.",
        "Analyze this risk."
      ]
    };
  }

  // Default Chatbot Response
  return {
    message: `Hello. I am the **ARAIS Virtual Risk Specialist**.

I have real-time access to the **BARANI AURA AIOS** database, which monitors:
* **${MOCK_RISKS.length}** Enterprise Risks (with 2 breaching appetite limits)
* **${MOCK_CONTROLS.length}** Continuous Controls (75% effective)
* **${MOCK_COMPLIANCE.length}** Regulatory obligations (including SOX, GDPR, DORA)
* **${MOCK_AUDITS.length}** Open Audit findings

You can ask me to perform deep analytical reasoning, recommend security policies, or summarize files. Please choose one of the preset options or type a specific risk management query:`,
    suggestedPrompts: [
      "Analyze this risk.",
      "Recommend mitigating controls.",
      "Generate executive summary.",
      "Explain compliance implications.",
      "Create board-ready insights."
    ]
  };
}
