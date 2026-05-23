"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionKicker } from "@/components/how-it-works";
import { cn } from "@/lib/utils";

export function Sports() {
  const { t } = useI18n();
  const [emblaRef, embla] = useEmblaCarousel({ loop: false, align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    update();
    embla.on("select", update);
    embla.on("reInit", update);
  }, [embla, update]);

  return (
    <section id="sports" className="relative py-28 md:py-40 px-6 border-t border-paper/5">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <SectionKicker>{t.sports.kicker}</SectionKicker>
            <h2 className="mt-5 font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-2xl balanced">
              {t.sports.title}
            </h2>
            <p className="mt-6 text-paper/70 text-lg max-w-xl">{t.sports.sub}</p>
          </div>

          <div className="hidden md:flex gap-3">
            <ArrowBtn dir="prev" onClick={() => embla?.scrollPrev()} disabled={!canPrev} />
            <ArrowBtn dir="next" onClick={() => embla?.scrollNext()} disabled={!canNext} />
          </div>
        </div>

        <div className="mt-16 -mx-6 px-6 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {t.sports.items.map((s, i) => (
              <motion.article
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative shrink-0 w-[85%] sm:w-[55%] md:w-[42%] lg:w-[31%] aspect-[3/4] overflow-hidden group cursor-pointer"
              >
                <div className={cn(
                  "absolute inset-0 transition-transform duration-700 group-hover:scale-105",
                  i % 2 === 0 ? "bg-coral" : "bg-mauve",
                  i === t.sports.items.length - 1 && "bg-butter"
                )} />
                <div className={cn(
                  "absolute inset-0 mix-blend-overlay opacity-30",
                  "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]"
                )} />
                <div className="absolute top-7 left-7 text-7xl md:text-8xl">{s.emoji}</div>
                <div className="absolute bottom-7 left-7 right-7">
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-none text-ink">
                    {s.name}
                  </h3>
                  <p className="mt-3 font-serif italic text-base md:text-lg text-ink/75">
                    {s.gear}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowBtn({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled?: boolean }) {
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir}
      className="h-12 w-12 rounded-full border border-paper/20 text-paper hover:border-coral hover:text-coral disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
