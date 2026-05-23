"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic-button";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-char]", {
        y: "100%",
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.04,
        delay: 0.15,
      });
      gsap.from("[data-hero-fade]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.7,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [t.hero.title1, t.hero.title2]);

  const splitChars = (text: string) =>
    Array.from(text).map((ch, i) => (
      <span key={`${text}-${i}`} className="inline-block overflow-hidden align-bottom">
        <span data-hero-char className="inline-block">
          {ch === " " ? " " : ch}
        </span>
      </span>
    ));

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-coral/25 blur-[120px] breathe" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-mauve/20 blur-[140px] breathe" style={{ animationDelay: "-7s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#1a1f3a_85%)]" />
      </div>

      <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 flex items-center gap-3" data-hero-fade>
        <span className="block w-2 h-2 rounded-full bg-coral animate-pulse" />
        <span className="font-display text-xs tracking-[0.3em] text-paper/60">{t.hero.kicker}</span>
      </div>

      <div className="relative z-10 px-6 text-center max-w-[1500px] mx-auto">
        <h1 className="font-display text-paper leading-[0.85] text-[18vw] md:text-[15vw] lg:text-[13rem] xl:text-[16rem]">
          <span className="block">{splitChars(t.hero.title1)}</span>
          <span className="block">
            {splitChars(t.hero.title2.split(" ")[0])}{" "}
            <span className="text-coral">{splitChars(t.hero.title2.split(" ").slice(1).join(" "))}</span>
          </span>
        </h1>

        <p
          data-hero-fade
          className="mt-10 md:mt-14 max-w-2xl mx-auto font-serif italic text-xl md:text-2xl lg:text-3xl text-paper/85 leading-snug balanced"
        >
          {t.hero.sub}
        </p>

        <div data-hero-fade className="mt-12 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Magnetic>
            <Button asChild size="xl" variant="coral">
              <a href="#app">{t.hero.ctaApp}</a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="xl" variant="outline">
              <a href="#partner">{t.hero.ctaPartner}</a>
            </Button>
          </Magnetic>
        </div>
      </div>

      <a
        href="#how"
        data-hero-fade
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-paper/60 hover:text-coral transition-colors group"
      >
        <span className="font-display text-[10px] tracking-[0.3em]">{t.hero.scroll}</span>
        <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
      </a>
    </section>
  );
}
