import { DashboardShell } from "@/components/dashboard-shell";

export default function LayoutClient({ children }: LayoutProps<"/client">) {
  return <DashboardShell role="client">{children}</DashboardShell>;
}
