"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";
import { Kicker } from "@/components/section-kicker";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const ACCENTS = ["text-volt", "text-coral", "text-volt", "text-coral"];
const BG = ["bg-volt", "bg-coral", "bg-volt", "bg-coral"];

export function Sports() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // desktop: pin + horizontal scrub
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const scrollLen = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -scrollLen(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + scrollLen(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // parallax the giant ghost labels within each panel
      gsap.utils.toArray<HTMLElement>("[data-ghost]").forEach((el) => {
        gsap.to(el, {
          xPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + scrollLen(),
            scrub: 1,
          },
        });
      });

      return () => tween.kill();
    });

    return () => mm.revert();
  }, [t.sports.items]);

  return (
    <section id="sports" ref={sectionRef} className="relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex flex-col md:h-[100svh] md:w-max md:flex-row md:flex-nowrap"
      >
        {/* intro panel */}
        <div className="flex shrink-0 flex-col justify-center px-6 py-24 md:h-full md:w-[46vw] md:px-16 md:py-0">
          <Kicker>{t.sports.kicker}</Kicker>
          <h2 className="font-display mt-6 text-5xl leading-[0.92] text-concrete sm:text-6xl md:text-7xl">
            {t.sports.title}
          </h2>
          <p className="pretty mt-6 max-w-sm text-[15px] leading-relaxed text-muted">{t.sports.sub}</p>
          <div className="mt-10 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted md:flex">
            <span className="h-px w-10 bg-volt" />
            kaydır / scroll
          </div>
        </div>

        {/* sport panels */}
        {t.sports.items.map((s, i) => (
          <article
            key={s.name}
            className="group relative flex shrink-0 flex-col justify-center overflow-hidden border-t border-slate px-6 py-20 md:h-full md:w-[56vw] md:border-l md:border-t-0 md:px-16 md:py-0"
          >
            {/* giant ghost sport name */}
            <span
              data-ghost
              className="font-display pointer-events-none absolute -right-4 bottom-2 select-none text-[28vw] leading-none text-card md:bottom-8 md:text-[20vw]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <span className="text-5xl md:text-6xl">{s.emoji}</span>
                <span className={`font-mono text-xs uppercase tracking-widest ${ACCENTS[i]}`}>
                  0{i + 1} / 04
                </span>
              </div>
              <h3 className="font-display mt-6 text-[12vw] leading-none text-concrete sm:text-7xl md:text-[6.5rem]">
                {s.name}
              </h3>
              <p className="mt-6 text-lg text-muted">{s.gear}</p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate bg-card/60 px-4 py-2">
                <span className={`h-2 w-2 rounded-full ${BG[i]}`} />
                <span className="font-mono text-[12px] tracking-wider text-concrete/80">{s.tag}</span>
              </div>
            </div>
          </article>
        ))}

        {/* more soon panel */}
        <div className="flex shrink-0 flex-col justify-center border-t border-slate px-6 py-24 md:h-full md:w-[42vw] md:border-l md:border-t-0 md:px-16 md:py-0">
          <span className="text-5xl">✨</span>
          <p className="font-display mt-6 max-w-xs text-3xl leading-tight text-concrete sm:text-4xl">
            {t.sports.more}
          </p>
          <a
            href="#waitlist"
            className="mt-8 inline-flex w-fit rounded-full bg-volt px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-widest text-asphalt transition-shadow hover:glow-volt"
          >
            {t.nav.app}
          </a>
        </div>
      </div>
    </section>
  );
}
