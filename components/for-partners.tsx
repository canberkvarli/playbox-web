"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { PartnerForm } from "@/components/partner-form";

export function ForPartners() {
  const { t } = useI18n();

  return (
    <section id="partner" className="relative py-28 md:py-40 px-6 bg-butter text-ink">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-4">
          <span className="block h-px w-12 bg-coral" />
          <span className="font-display text-base md:text-lg tracking-[0.28em] text-coral">{t.partners.kicker}</span>
        </div>

        <h2 className="mt-5 font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] text-ink max-w-5xl balanced">
          {t.partners.title}
        </h2>
        <p className="mt-8 font-serif italic text-2xl md:text-3xl text-ink/70 max-w-2xl balanced">
          {t.partners.sub}
        </p>

        <div className="mt-20 grid md:grid-cols-3 gap-10 md:gap-6">
          {t.partners.benefits.map((b, i) => (
            <motion.div
              key={b.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative pt-6 border-t border-ink/15"
            >
              <span className="absolute top-0 left-0 -translate-y-1/2 bg-butter px-3 font-display text-xs tracking-[0.2em] text-coral">
                0{i + 1}
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-ink">{b.t}</h3>
              <p className="mt-4 text-ink/70 text-lg leading-relaxed">{b.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 md:mt-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h3 className="font-serif text-4xl md:text-5xl text-ink balanced">{t.partners.form.title}</h3>
            <p className="mt-4 text-ink/70 text-lg max-w-md">{t.partners.form.sub}</p>
            <p className="mt-10 font-display text-sm tracking-[0.2em] text-ink/60">
              canberkvarli@gmail.com
            </p>
          </div>
          <PartnerForm />
        </div>
      </div>
    </section>
  );
}
