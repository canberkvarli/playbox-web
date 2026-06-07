import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginAction } from "./actions";

export const metadata: Metadata = {
  title: "Operatör girişi",
  robots: { index: false, follow: false },
};

export default async function OpsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  const { e } = await searchParams;
  const hasError = e === "1";

  return (
    <main className="flex min-h-dvh items-center justify-center bg-paper px-6 text-ink">
      <form
        action={loginAction}
        className="w-full max-w-sm space-y-8 rounded-lg bg-paper p-2"
      >
        <div className="space-y-2">
          <h1 className="font-display text-2xl uppercase tracking-[0.04em] text-ink">
            Operatör girişi
          </h1>
          <p className="text-sm text-ink/60">
            Bu alan yalnızca yetkili operatörler içindir.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Parola</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
          />
        </div>

        {hasError ? (
          <p role="alert" className="text-sm text-coral">
            Hatalı parola. Tekrar deneyin.
          </p>
        ) : null}

        <Button type="submit" variant="ink" size="default" className="w-full">
          Giriş yap
        </Button>
      </form>
    </main>
  );
}
