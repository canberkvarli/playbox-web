"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Logo, Wordmark } from "@/components/logo";
import { LangToggle } from "@/components/lang-toggle";
import { Magnetic } from "@/components/magnetic-button";

export function Nav() {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    setHidden(y > lastY && y > 400 && !open);
    setLastY(y);
  });

  const links = [
    { href: "#how", label: t.nav.how },
    { href: "#sports", label: t.nav.sports },
    { href: "#players", label: t.nav.players },
    { href: "#sponsors", label: t.nav.sponsors },
  ];

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-colors duration-500 sm:px-5 sm:py-2.5 ${
          scrolled ? "border-slate/70 bg-asphalt/70 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <Logo />

        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-full px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-widest text-muted transition-colors hover:text-concrete"
            >
              {l.label}
              <span className="absolute inset-x-3.5 bottom-0.5 h-px origin-left scale-x-0 bg-volt transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <LangToggle />
          <div className="hidden sm:block">
            <Magnetic strength={0.4}>
              <a
                href="#waitlist"
                className="rounded-full bg-volt px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-widest text-asphalt transition-shadow hover:glow-volt"
              >
                {t.nav.app}
              </a>
            </Magnetic>
          </div>

          {/* mobile menu */}
          <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
            <Drawer.Trigger asChild>
              <button aria-label="Menu" className="-mr-1 p-2 text-concrete md:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-50 bg-asphalt/80 backdrop-blur-sm" />
              <Drawer.Content className="fixed inset-y-0 right-0 z-50 flex w-[84%] max-w-sm flex-col border-l border-slate bg-card outline-none">
                <Drawer.Title className="sr-only">Menu</Drawer.Title>
                <div className="flex h-16 items-center justify-between border-b border-slate px-6">
                  <Wordmark className="text-concrete" />
                  <Drawer.Close asChild>
                    <button aria-label="Close" className="-mr-1 p-2 text-concrete">
                      <X className="h-5 w-5" />
                    </button>
                  </Drawer.Close>
                </div>
                <nav className="flex flex-1 flex-col gap-1 p-6">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display py-3 text-3xl text-concrete transition-colors hover:text-volt"
                    >
                      {l.label}
                    </a>
                  ))}
                  <a
                    href="#waitlist"
                    onClick={() => setOpen(false)}
                    className="mt-4 rounded-full bg-volt px-5 py-3 text-center font-mono text-sm font-bold uppercase tracking-widest text-asphalt"
                  >
                    {t.nav.app}
                  </a>
                </nav>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </nav>
    </motion.header>
  );
}
