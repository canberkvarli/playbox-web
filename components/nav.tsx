"use client";

import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LangToggle } from "@/components/lang-toggle";
import { cn } from "@/lib/utils";

export function Nav() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#how", label: t.nav.how },
    { href: "#sports", label: t.nav.sports },
    { href: "#partner", label: t.nav.partner },
    { href: "#app", label: t.nav.app },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-ink/85 backdrop-blur-xl border-b border-paper/5" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#" className="font-display text-2xl md:text-3xl text-coral tracking-tight">
          PLAYBOX
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-sm tracking-[0.12em] text-paper/80 hover:text-coral transition-colors"
            >
              {l.label}
            </a>
          ))}
          <LangToggle className="ml-2" />
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <LangToggle />
          <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
            <Drawer.Trigger asChild>
              <button aria-label="Open menu" className="p-2 -mr-2 text-paper">
                <Menu className="h-6 w-6" />
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm" />
              <Drawer.Content className="fixed right-0 top-0 bottom-0 z-50 w-[82%] max-w-sm bg-ink border-l border-paper/10 outline-none flex flex-col">
                <Drawer.Title className="sr-only">Menu</Drawer.Title>
                <div className="flex items-center justify-between h-16 px-6 border-b border-paper/10">
                  <span className="font-display text-2xl text-coral">PLAYBOX</span>
                  <Drawer.Close asChild>
                    <button aria-label="Close menu" className="p-2 -mr-2 text-paper">
                      <X className="h-6 w-6" />
                    </button>
                  </Drawer.Close>
                </div>
                <nav className="flex-1 flex flex-col p-6 gap-1">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-3xl tracking-tight text-paper hover:text-coral py-3 transition-colors"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
}
