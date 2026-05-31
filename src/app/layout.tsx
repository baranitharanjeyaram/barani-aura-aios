import type { Metadata } from "next";
import "@/styles/globals.css";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata: Metadata = {
  title: "BARANI AURA AIOS | Enterprise Risk & Assurance Command Center",
  description: "Autonomous Risk & Assurance Intelligence System (ARAIS) providing Continuous Monitoring, Continuous Assurance, and Continuous Intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
