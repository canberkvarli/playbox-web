"use client";

import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const opts: Lang[] = ["tr", "en"];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-slate/80 bg-card/60 p-0.5 font-mono text-[11px] font-medium backdrop-blur-md",
        className
      )}
    >
      {opts.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            "rounded-full px-2.5 py-1 tracking-widest transition-colors duration-300",
            lang === l ? "bg-volt text-asphalt" : "text-muted hover:text-concrete"
          )}
          aria-label={`Switch to ${l.toUpperCase()}`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
