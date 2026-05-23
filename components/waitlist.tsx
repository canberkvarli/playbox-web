"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const schema = z.object({ email: z.string().email() });
type Values = z.infer<typeof schema>;

export function Waitlist() {
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Values) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      toast.success(t.waitlist.success);
      reset();
    } catch {
      toast.error(t.waitlist.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative bg-butter text-ink px-6 py-20 md:py-28 border-t border-ink/10">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-3">
          <span className="block h-px w-10 bg-coral" />
          <span className="font-display text-sm md:text-base tracking-[0.28em] text-coral">{t.waitlist.kicker}</span>
          <span className="block h-px w-10 bg-coral" />
        </div>

        <h2 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-ink balanced">
          {t.waitlist.title}
        </h2>
        <p className="mt-4 font-serif italic text-xl md:text-2xl text-ink/70 balanced">
          {t.waitlist.sub}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            autoComplete="email"
            placeholder={t.waitlist.placeholder}
            aria-invalid={!!errors.email}
            {...register("email")}
            className="flex-1 h-14 px-5 bg-paper border border-ink/15 text-ink placeholder:text-ink/40 focus:outline-none focus:border-coral transition-colors text-base"
          />
          <button
            type="submit"
            disabled={submitting}
            className="h-14 px-7 bg-ink text-coral font-display tracking-[0.1em] text-base hover:bg-ink-soft active:scale-[0.98] disabled:opacity-60 transition-all inline-flex items-center justify-center gap-2"
          >
            {submitting ? t.waitlist.sending : t.waitlist.submit}
            {!submitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </section>
  );
}
