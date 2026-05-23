"use client";

import { motion } from "motion/react";
import { MagnifyingGlass, Lock, Basketball } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

const Icons = [MagnifyingGlass, Lock, Basketball];

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how" className="relative py-28 md:py-40 px-6 border-t border-paper/5">
      <div className="mx-auto max-w-[1400px]">
        <SectionKicker>{t.how.kicker}</SectionKicker>
        <h2 className="mt-5 font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-3xl balanced">
          {t.how.title}
        </h2>

        <div className="mt-20 md:mt-28 grid md:grid-cols-3 gap-12 md:gap-8">
          {t.how.steps.map((step, i) => {
            const Icon = Icons[i];
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                className="group"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-coral text-sm tracking-[0.2em]">{step.n}</span>
                  <span className="h-px flex-1 bg-paper/10" />
                </div>
                <Icon
                  weight="duotone"
                  className="mt-8 h-16 w-16 text-coral group-hover:scale-110 transition-transform duration-500"
                />
                <h3 className="mt-6 font-display text-5xl md:text-6xl text-paper">{step.t}</h3>
                <p className="mt-4 text-paper/65 text-lg leading-relaxed max-w-xs">{step.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="block h-px w-12 bg-coral" />
      <span className="font-display text-base md:text-lg tracking-[0.28em] text-coral">{children}</span>
    </div>
  );
}
