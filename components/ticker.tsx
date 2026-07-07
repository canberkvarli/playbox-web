"use client";

import { useI18n } from "@/lib/i18n";

export function Ticker() {
  const { t } = useI18n();
  const words = t.ticker;
  const row = [...words, ...words, ...words, ...words];

  return (
    <div className="relative z-10 border-y border-slate bg-card/40 py-4 backdrop-blur-sm">
      <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee flex shrink-0 items-center whitespace-nowrap">
          {row.map((w, i) => (
            <Word key={i} w={w} i={i} />
          ))}
        </div>
        <div className="marquee flex shrink-0 items-center whitespace-nowrap" aria-hidden>
          {row.map((w, i) => (
            <Word key={i} w={w} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Word({ w, i }: { w: string; i: number }) {
  const isAction = ["BUL", "AÇ", "OYNA", "İADE ET", "SERİ YAP", "FIND", "OPEN", "PLAY", "RETURN", "STREAK"].includes(w);
  return (
    <span className="flex items-center gap-6 px-6 sm:gap-8 sm:px-8">
      <span
        className={`font-display text-lg tracking-wider sm:text-xl ${
          isAction ? "text-volt" : "text-concrete/85"
        }`}
      >
        {w}
      </span>
      <span className={`h-1.5 w-1.5 rounded-full ${i % 3 === 0 ? "bg-coral" : "bg-slate"}`} />
    </span>
  );
}
