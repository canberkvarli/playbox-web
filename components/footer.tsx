"use client";

import { useI18n } from "@/lib/i18n";
import { LangToggle } from "@/components/lang-toggle";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative border-t border-paper/10 px-6 py-16">
      <div className="mx-auto max-w-[1400px] grid md:grid-cols-3 gap-10 md:gap-6">
        <div className="md:col-span-2">
          <span className="font-display text-3xl text-coral">PLAYBOX</span>
          <p className="mt-4 font-serif italic text-xl text-paper/70 max-w-md balanced">{t.footer.tag}</p>
        </div>
        <div className="flex flex-col md:items-end gap-4 text-sm">
          <span className="font-display text-xs tracking-[0.2em] text-paper/50">{t.footer.contact}</span>
          <a href="mailto:hello@playbox.com.tr" className="text-paper hover:text-coral transition-colors">
            hello@playbox.com.tr
          </a>
          <LangToggle className="mt-2" />
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] mt-14 pt-6 border-t border-paper/5 flex flex-col sm:flex-row sm:justify-between gap-3 text-xs text-paper/40 font-display tracking-[0.18em]">
        <span>{t.footer.legal}</span>
        <span>MADE IN İSTANBUL</span>
      </div>
    </footer>
  );
}
