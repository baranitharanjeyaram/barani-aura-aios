import type { Metadata } from "next";
<<<<<<< HEAD
import "@/styles/globals.css";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata: Metadata = {
  title: "BARANI AURA AIOS | Enterprise Risk & Assurance Command Center",
  description: "Autonomous Risk & Assurance Intelligence System (ARAIS) providing Continuous Monitoring, Continuous Assurance, and Continuous Intelligence.",
=======
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "BARANI AURA AIOS — Enterprise Intelligence Dashboard System",
  description: "Intelligent Risk. Predictive Governance. AI-Powered Enterprise Command Center.",
>>>>>>> 964014ce1585904be1531bd54d12f60bcd9b901b
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en">
      <body>
        <DashboardLayout>
          {children}
        </DashboardLayout>
=======
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className="min-h-screen bg-[#0b0f19] text-white antialiased">
        <TooltipProvider>
          {children}
        </TooltipProvider>
>>>>>>> 964014ce1585904be1531bd54d12f60bcd9b901b
      </body>
    </html>
  );
}
