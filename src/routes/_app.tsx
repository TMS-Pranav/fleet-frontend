import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Topbar } from "../components/wb/Topbar";
import { Sidebar } from "../components/wb/Sidebar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--wb-bg)]">
      <Topbar />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6">
          <div className="mx-auto max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
