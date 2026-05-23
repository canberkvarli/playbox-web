"use client";

import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const opts: Lang[] = ["tr", "en"];

  return (
    <div className={cn("inline-flex items-center font-display text-base tracking-[0.12em]", className)}>
      {opts.map((l, i) => (
        <span key={l} className="flex items-center">
          <button
            onClick={() => setLang(l)}
            className={cn(
              "px-1.5 py-0.5 transition-colors",
              lang === l ? "text-coral" : "text-paper/40 hover:text-paper"
            )}
            aria-label={`Switch to ${l.toUpperCase()}`}
          >
            {l.toUpperCase()}
          </button>
          {i === 0 && <span className="text-paper/20">/</span>}
        </span>
      ))}
    </div>
  );
}
