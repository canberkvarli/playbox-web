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
    } catch {
      toast.error(s.form.error);
    } finally {
      setStatus("idle");
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="sponsors" className="relative border-y border-slate bg-card/30 py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Kicker>{s.kicker}</Kicker>
          <h2 className="font-display mt-6 text-5xl leading-[0.95] text-concrete sm:text-6xl md:text-7xl">
            {s.title}
          </h2>
          <p className="pretty mt-6 text-base leading-relaxed text-muted md:text-lg">{s.sub}</p>
        </div>

        {/* benefits */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-slate bg-slate sm:grid-cols-3">
          {s.benefits.map((b, i) => (
            <motion.div
              key={b.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 bg-asphalt p-8"
            >
              <span className="font-mono text-sm text-volt">{b.n}</span>
              <h3 className="font-display text-xl uppercase leading-[1.05] text-concrete">{b.t}</h3>
              <p className="text-sm leading-relaxed text-muted">{b.d}</p>
            </motion.div>
          ))}
        </div>

        {/* logo wall + form */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* volt logo wall */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{s.wallLabel}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-[3/2] items-center justify-center rounded-2xl border border-dashed border-slate bg-card/40 transition-colors hover:border-volt/50"
                >
                  <span className="px-3 text-center font-mono text-[10px] uppercase leading-tight tracking-widest text-muted">
                    {s.wallSoon}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* form */}
          <form onSubmit={submit} className="rounded-3xl border border-slate bg-asphalt p-7 sm:p-8">
            <h3 className="font-display text-2xl text-concrete">{s.form.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.form.sub}</p>
            <div className="mt-6 flex flex-col gap-3">
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
            <Magnetic strength={0.25} className="mt-5 block">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-volt px-6 py-3.5 font-mono text-[13px] font-bold uppercase tracking-widest text-asphalt transition-shadow hover:glow-volt disabled:opacity-60"
              >
                {status === "sending" ? s.form.sending : s.form.submit}
              </button>
            </Magnetic>
          </form>
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
