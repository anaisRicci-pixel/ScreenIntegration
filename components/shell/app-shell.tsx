import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { DesktopSidebar } from "@/components/shell/desktop-sidebar";
import { MobileHeader } from "@/components/shell/mobile-header";
import { PageBackground } from "@/components/shell/page-background";
import { ProfileChip } from "@/components/shell/profile-chip";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh lg:h-dvh">
      <PageBackground />
      <DesktopSidebar />
      <div className="flex min-w-0 flex-1 flex-col lg:overflow-y-auto">
        <MobileHeader />
        <header className="hidden h-20 shrink-0 items-center justify-between px-8 py-3 lg:flex">
          <Link href="/" aria-label="Accueil" className="h-full outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <Logo className="h-full" priority />
          </Link>
          <ProfileChip />
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
