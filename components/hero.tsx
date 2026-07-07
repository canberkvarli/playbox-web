"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Magnetic } from "@/components/magnetic-button";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

export function Hero() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  // mouse parallax (ambient glow only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glowX = useTransform(sx, (v) => v * -60);
  const glowY = useTransform(sy, (v) => v * -60);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-char]", {
        yPercent: 115,
        duration: 1,
        ease: "expo.out",
        stagger: 0.035,
        delay: 0.15,
      });
      gsap.from("[data-hero-fade]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.6,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, t.hero.title1, t.hero.title2]);

  function onMove(e: React.MouseEvent) {
    if (!fine) return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    my.set((e.clientY / window.innerHeight - 0.5) * 2);
  }

  const chars = (text: string, volt = false) =>
    Array.from(text).map((ch, i) => (
      <span key={`${text}-${i}`} className="inline-block overflow-hidden align-bottom">
        <span data-hero-char className={`inline-block ${volt ? "text-volt" : ""}`}>
          {ch === " " ? " " : ch}
        </span>
      </span>
    ));

  return (
    <section
      id="top"
      ref={rootRef}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-28 pb-20"
    >
      {/* court-line grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-slate) 1px, transparent 1px), linear-gradient(90deg, var(--color-slate) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 72%)",
        }}
      />
      {/* ambient glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute -left-1/4 top-1/4 h-[70vw] w-[70vw] rounded-full bg-volt/[0.07] blur-[130px]"
      />
      <motion.div
        style={{ x: glowY, y: glowX }}
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[55vw] w-[55vw] rounded-full bg-coral/[0.08] blur-[140px]"
      />

      {/* kicker */}
      <div data-hero-fade className="absolute top-24 left-1/2 flex -translate-x-1/2 items-center gap-2.5 md:top-28">
        <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-volt" />
        <span className="font-mono text-[11px] tracking-[0.35em] text-muted">{t.hero.kicker}</span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 text-center">
        <h1 className="font-display whitespace-nowrap text-[clamp(2.25rem,11.5vw,12rem)] leading-[1.08] text-concrete">
          <span className="block">{chars(t.hero.title1)}</span>
          <span className="block">{chars(t.hero.title2, true)}</span>
        </h1>

        <p
          data-hero-fade
          className="balanced mx-auto mt-9 max-w-xl text-base leading-relaxed text-muted md:mt-11 md:text-lg"
        >
          {t.hero.sub}
        </p>

        <div data-hero-fade className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Magnetic strength={0.4}>
            <a
              href="#waitlist"
              className="group flex items-center gap-2 rounded-full bg-volt px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-asphalt transition-shadow hover:glow-volt"
            >
              {t.hero.ctaApp}
              <span className="rounded-full bg-asphalt px-2 py-0.5 text-[10px] text-volt">{t.hero.soon}</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#waitlist"
              className="rounded-full border border-slate px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-concrete transition-colors hover:border-concrete"
            >
              {t.hero.ctaWaitlist}
            </a>
          </Magnetic>
        </div>

        {/* stat row */}
        <div data-hero-fade className="mt-14 flex items-center justify-center gap-6 font-mono text-muted sm:gap-10">
          {t.hero.stats.map((s, i) => (
            <Fragment key={s.label}>
              {i > 0 && <span className="h-8 w-px bg-slate" />}
              <Stat n={s.n} label={s.label} accent={i === 2} />
            </Fragment>
          ))}
        </div>
      </div>

      <a
        href="#how"
        data-hero-fade
        className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-volt"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <span className="h-8 w-px animate-pulse bg-current" />
      </a>
    </section>
  );
}

function Stat({ n, label, accent }: { n: string; label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={`font-display text-2xl leading-none sm:text-3xl ${accent ? "text-volt" : "text-concrete"}`}>{n}</span>
      <span className="whitespace-nowrap text-[10px] uppercase tracking-widest">{label}</span>
    </div>
  );
}
