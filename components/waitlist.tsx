"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { Magnetic } from "@/components/magnetic-button";

export function Waitlist() {
  const { t } = useI18n();
  const w = t.waitlist;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      toast.success(w.success);
      setEmail("");
    } catch {
      toast.error(w.error);
    } finally {
      setStatus("idle");
    }
  }

  return (
    <section id="waitlist" className="relative overflow-hidden py-32 md:py-44">
      {/* volt wash */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.3em] text-volt">
          <span className="h-1.5 w-1.5 rounded-full bg-volt" />
          {w.kicker}
        </div>
        <h2 className="font-display mt-6 text-6xl leading-[1.0] text-concrete sm:text-7xl md:text-8xl">
          {w.title}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base text-muted md:text-lg">{w.sub}</p>

        <form onSubmit={submit} className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={w.placeholder}
            className="flex-1 rounded-full border border-slate bg-card px-6 py-4 text-sm text-concrete outline-none transition-colors placeholder:text-muted focus:border-volt"
          />
          <Magnetic strength={0.3}>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-volt px-7 py-4 font-mono text-[13px] font-bold uppercase tracking-widest text-asphalt transition-shadow hover:glow-volt disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? w.sending : w.submit}
            </button>
          </Magnetic>
        </form>
      </div>
    </section>
  );
}
