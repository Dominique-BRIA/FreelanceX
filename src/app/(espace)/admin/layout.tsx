import { DashboardShell } from "@/components/dashboard-shell";

export default function LayoutAdmin({ children }: LayoutProps<"/admin">) {
  return <DashboardShell role="admin">{children}</DashboardShell>;
}
