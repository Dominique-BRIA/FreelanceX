import { DashboardShell } from "@/components/dashboard-shell";

export default function LayoutPrestataire({ children }: LayoutProps<"/prestataire">) {
  return <DashboardShell role="prestataire">{children}</DashboardShell>;
}
