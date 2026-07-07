"use client";

import { useI18n } from "@/lib/i18n";
import { BounceMark, Wordmark } from "@/components/logo";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative border-t border-slate bg-card/30">
      {/* city banner */}
      <div className="overflow-hidden border-b border-slate py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-fast marquee flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-4 px-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              {t.footer.city}
              <span className="h-1 w-1 rounded-full bg-volt" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <div className="flex items-center gap-2.5">
              <BounceMark size={30} />
              <Wordmark className="text-concrete" />
            </div>
            <p className="pretty mt-5 max-w-xs text-sm leading-relaxed text-muted">{t.footer.tag}</p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{t.footer.contact}</span>
            <a
              href="mailto:canberkvarli@gmail.com"
              className="font-mono text-sm text-concrete/80 transition-colors hover:text-volt"
            >
              canberkvarli@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-slate pt-6 font-mono text-[11px] uppercase tracking-widest text-muted sm:flex-row sm:items-center">
          <span>{t.footer.legal}</span>
          <a href="#" className="transition-colors hover:text-concrete">
            {t.footer.kvkk}
          </a>
        </div>
      </div>
    </footer>
  );
}
