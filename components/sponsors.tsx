"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { Kicker } from "@/components/section-kicker";
import { Magnetic } from "@/components/magnetic-button";

export function Sponsors() {
  const { t } = useI18n();
  const s = t.sponsors;
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success(s.form.success);
      setForm({ name: "", company: "", email: "", message: "" });
      setDone(true);
    } catch {
      toast.error(s.form.error);
    } finally {
      setStatus("idle");
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="sponsors" className="relative border-y border-slate bg-card/30 py-28 md:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* pitch + benefits + wall */}
          <div>
            <Kicker>{s.kicker}</Kicker>
            <h2 className="font-display mt-6 text-[clamp(2.5rem,10.5vw,6rem)] leading-[1.02] text-concrete">
              {s.title}
            </h2>
            <p className="pretty mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{s.sub}</p>

            {/* benefit ledger */}
            <div className="mt-14 border-t border-slate">
              {s.benefits.map((b, i) => (
                <motion.div
                  key={b.n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-slate py-5"
                >
                  <span className="font-mono text-xs text-volt">{b.n}</span>
                  <h3 className="font-display text-2xl uppercase leading-none text-concrete transition-colors group-hover:text-volt sm:text-3xl">
                    {b.t}
                  </h3>
                  <p className="ml-auto text-sm text-muted sm:text-right">{b.d}</p>
                </motion.div>
              ))}
            </div>

            {/* logo slots */}
            <div className="mt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{s.wallLabel}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-slate bg-card/40 transition-colors hover:border-volt/50"
                  >
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* form */}
          <div className="self-start lg:sticky lg:top-28">
          {done ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-volt/40 bg-volt/10 p-10 text-center">
              <span className="text-4xl">⚡</span>
              <p className="font-display text-2xl text-concrete">{s.form.success}</p>
            </div>
          ) : (
          <form onSubmit={submit} className="rounded-3xl border border-slate bg-asphalt p-7 sm:p-9">
            <h3 className="font-display text-3xl text-concrete">{s.form.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.form.sub}</p>
            <div className="mt-7 flex flex-col gap-3">
              <Field placeholder={s.form.name} value={form.name} onChange={set("name")} required minLength={2} />
              <Field placeholder={s.form.company} value={form.company} onChange={set("company")} required />
              <Field placeholder={s.form.email} value={form.email} onChange={set("email")} type="email" required />
              <textarea
                placeholder={s.form.message}
                value={form.message}
                onChange={set("message")}
                rows={3}
                maxLength={500}
                className="w-full resize-none rounded-xl border border-slate bg-card px-4 py-3 text-sm text-concrete outline-none transition-colors placeholder:text-muted focus:border-volt"
              />
            </div>
            <Magnetic strength={0.25} className="mt-6 block">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-volt px-6 py-4 font-mono text-[13px] font-bold uppercase tracking-widest text-asphalt transition-shadow hover:glow-volt disabled:opacity-60"
              >
                {status === "sending" ? s.form.sending : s.form.submit}
              </button>
            </Magnetic>
          </form>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-slate bg-card px-4 py-3 text-sm text-concrete outline-none transition-colors placeholder:text-muted focus:border-volt"
    />
  );
}
