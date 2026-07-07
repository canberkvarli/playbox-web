"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Kicker } from "@/components/section-kicker";

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="grid gap-14 md:grid-cols-[0.9fr_1.4fr] md:gap-20">
        {/* sticky heading */}
        <div className="md:sticky md:top-32 md:h-fit">
          <Kicker>{t.how.kicker}</Kicker>
          <h2 className="font-display mt-6 text-4xl leading-[1.02] text-concrete sm:text-5xl">
            {t.how.title}
          </h2>
        </div>

        {/* steps */}
        <ol className="flex flex-col">
          {t.how.steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-[auto_1fr] items-start gap-5 border-t border-slate py-8 first:border-t-0 first:pt-0 sm:gap-8"
            >
              <span className="font-mono text-sm text-volt">{s.n}</span>
              <div>
                <h3 className="font-display text-3xl text-concrete transition-colors duration-300 group-hover:text-volt sm:text-4xl">
                  {s.t}
                </h3>
                <p className="pretty mt-3 max-w-md text-[15px] leading-relaxed text-muted">{s.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
