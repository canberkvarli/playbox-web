"use client";

import { motion } from "motion/react";
import { Apple, Check, Smartphone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionKicker } from "@/components/how-it-works";

export function ForPlayers() {
  const { t } = useI18n();

  return (
    <section id="app" className="relative py-28 md:py-40 px-6 border-t border-paper/5 overflow-hidden">
      <div className="mx-auto max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <PhoneMockup />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <SectionKicker>{t.players.kicker}</SectionKicker>
          <h2 className="mt-5 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] balanced">
            {t.players.title}
          </h2>
          <p className="mt-6 text-lg text-paper/70 leading-relaxed max-w-lg">{t.players.sub}</p>

          <ul className="mt-10 space-y-4 max-w-md">
            {t.players.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-coral mt-1 shrink-0" strokeWidth={2.5} />
                <span className="text-paper/85">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <StoreBadge icon={<Apple className="h-5 w-5" />} label={t.players.ios} soon={t.players.soon} />
            <StoreBadge icon={<Smartphone className="h-5 w-5" />} label={t.players.android} soon={t.players.soon} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StoreBadge({ icon, label, soon }: { icon: React.ReactNode; label: string; soon: string }) {
  return (
    <div className="relative inline-flex items-center gap-3 h-14 px-5 border border-paper/20 text-paper/60 cursor-not-allowed">
      {icon}
      <div className="flex flex-col text-left">
        <span className="text-[10px] tracking-[0.2em] font-display text-paper/40">{soon}</span>
        <span className="font-display text-base leading-none">{label}</span>
      </div>
    </div>
  );
}

function PhoneMockup() {
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative mx-auto w-full max-w-[340px]"
    >
      <div className="absolute -inset-8 bg-coral/20 blur-3xl rounded-full" />
      <div className="relative bg-ink-soft border-[10px] border-ink-soft rounded-[44px] shadow-2xl overflow-hidden aspect-[9/19.5]">
        <div className="absolute top-0 inset-x-0 h-7 bg-ink-soft z-10 flex items-center justify-center">
          <div className="w-24 h-5 bg-ink rounded-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink-soft to-mauve/30 flex flex-col">
          <div className="flex-1 flex flex-col justify-end p-8 pb-12">
            <span className="font-display text-xs tracking-[0.25em] text-coral">{t.hero.kicker}</span>
            <h3 className="mt-3 font-display text-5xl text-paper leading-none">
              {t.hero.title1}
              <br />
              <span className="text-coral">{t.hero.title2.split(" ").pop()}</span>
            </h3>
            <div className="mt-8 h-12 rounded-full bg-coral flex items-center justify-center">
              <span className="font-display text-base text-ink tracking-wider">OYNA</span>
            </div>
            <div className="mt-3 h-12 rounded-full border border-paper/20 flex items-center justify-center">
              <span className="font-display text-base text-paper tracking-wider">İSTASYON BUL</span>
            </div>
          </div>
          <div className="px-8 pb-8">
            <div className="flex justify-between text-paper/40 font-display text-[10px] tracking-wider">
              <span>● BAĞLI</span>
              <span>SERİ · 7 GÜN</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
