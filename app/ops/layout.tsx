import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: "Operatör paneli",
  robots: { index: false, follow: false },
};

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-ink text-paper">
      <header className="border-b border-paper/15">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
          <span className="font-display text-sm uppercase tracking-[0.08em] text-paper/50">
            Playbox Ops
          </span>
          <Link
            href="/ops"
            className="font-display text-sm uppercase tracking-[0.04em] text-paper/80 transition-colors hover:text-coral"
          >
            Sıra
          </Link>
          <Link
            href="/ops/stations"
            className="font-display text-sm uppercase tracking-[0.04em] text-paper/80 transition-colors hover:text-coral"
          >
            İstasyonlar
          </Link>
          <form action={logoutAction} className="ml-auto">
            <Button type="submit" variant="outline" size="sm">
              Çıkış
            </Button>
          </form>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
