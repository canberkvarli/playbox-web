"use client";

import { useEffect, useRef, useState } from "react";
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
  // horizontal reel only when there's room AND motion is welcome; otherwise stack (always readable)
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const on = () => setHorizontal(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (!horizontal) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const scrollLen = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
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
      gsap.utils.toArray<HTMLElement>("[data-ghost]").forEach((el) => {
        gsap.to(el, {
          xPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: () => "+=" + scrollLen(), scrub: 1 },
        });
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    return () => ctx.revert();
  }, [horizontal, t.sports.items]);

  const md = (cls: string) => (horizontal ? " " + cls : "");

  return (
    <section id="sports" ref={sectionRef} className="relative overflow-hidden">
      <div ref={trackRef} className={"flex flex-col" + md("md:h-[100svh] md:flex-row md:flex-nowrap")}>
        {/* intro panel — holds the full screen first (grace to read it) */}
        <div className={"flex shrink-0 flex-col justify-center px-6 py-24" + md("md:h-full md:w-screen md:px-24 md:py-0")}>
          <Kicker>{t.sports.kicker}</Kicker>
          <h2 className="font-display mt-6 text-5xl leading-[1.0] text-concrete sm:text-6xl md:text-7xl">
            {t.sports.title}
          </h2>
          <p className="pretty mt-6 max-w-sm text-[15px] leading-relaxed text-muted">{t.sports.sub}</p>
          {horizontal && (
            <div className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-volt">
              <span className="h-px w-10 bg-volt" />
              kaydır → oyunları gör
            </div>
          )}
        </div>

        {/* sport panels */}
        {t.sports.items.map((s, i) => (
          <article
            key={s.name}
            className={
              "group relative flex shrink-0 flex-col justify-center overflow-hidden border-t border-slate px-6 py-20" +
              md("md:h-full md:w-[62vw] md:border-l md:border-t-0 md:px-16 md:py-0")
            }
          >
            <span
              data-ghost
              className="font-display pointer-events-none absolute -right-4 bottom-2 select-none text-[26vw] leading-none text-card md:bottom-8 md:text-[18vw]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <span className="text-5xl md:text-6xl">{s.emoji}</span>
                <span className={`font-mono text-xs uppercase tracking-widest ${ACCENTS[i]}`}>0{i + 1} / 04</span>
              </div>
              <h3 className="font-display mt-6 text-[10vw] leading-none text-concrete md:text-[6vw]">{s.name}</h3>
              <p className="mt-6 text-lg text-muted">{s.gear}</p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate bg-card/60 px-4 py-2">
                <span className={`h-2 w-2 rounded-full ${BG[i]}`} />
                <span className="font-mono text-[12px] tracking-wider text-concrete/80">{s.tag}</span>
              </div>
            </div>
          </article>
        ))}

        {/* more soon panel — wide so it lingers on the last swipe */}
        <div
          className={
            "flex shrink-0 flex-col justify-center border-t border-slate px-6 py-24" +
            md("md:h-full md:w-[82vw] md:border-l md:border-t-0 md:px-24 md:py-0")
          }
        >
          <span className="text-6xl">✨</span>
          <p className="font-display mt-6 max-w-xl text-4xl leading-[1.05] text-concrete sm:text-5xl">{t.sports.more}</p>
          <a
            href="#waitlist"
            className="mt-9 inline-flex w-fit rounded-full bg-volt px-7 py-3.5 font-mono text-[13px] font-bold uppercase tracking-widest text-asphalt transition-shadow hover:glow-volt"
          >
            {t.nav.app}
          </a>
        </div>
        {/* trailing runway so the last panel settles before the pin releases */}
        {horizontal && <div className="shrink-0 md:h-full md:w-[12vw]" aria-hidden />}
      </div>
    </section>
  );
}
