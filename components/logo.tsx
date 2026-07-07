"use client";

/**
 * Playbox "Bounce" mark — a geometric ball inside the box (the locker/station).
 * Branded: dark box (no volt border), volt ball with light seams.
 * `mono` renders everything in currentColor (for faded/decorative uses).
 */
export function BounceMark({
  size = 32,
  className = "",
  mono = false,
}: {
  size?: number;
  className?: string;
  mono?: boolean;
}) {
  const boxFill = mono ? "none" : "var(--color-asphalt)";
  const boxStroke = mono ? "currentColor" : "var(--color-slate)";
  const ball = mono ? "currentColor" : "var(--color-volt)";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* box / station — dark tile, subtle frame */}
      <rect x="3" y="3" width="42" height="42" rx="11" fill={boxFill} stroke={boxStroke} strokeWidth={mono ? 3 : 2} />
      {/* ball — volt, lighter lines */}
      <circle cx="24" cy="24" r="11.5" stroke={ball} strokeWidth="2.4" />
      <path d="M12.5 24h23M24 12.5v23" stroke={ball} strokeWidth="1.9" strokeLinecap="round" />
      <path d="M15.8 15.8c3.6 3.2 3.6 13.2 0 16.4M32.2 15.8c-3.6 3.2-3.6 13.2 0 16.4" stroke={ball} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[1.05rem] leading-none tracking-[0.02em] ${className}`}>
      PLAY<span className="text-volt">BOX</span>
    </span>
  );
}

export function Logo({ className = "", markSize = 30 }: { className?: string; markSize?: number }) {
  return (
    <a href="#top" className={`group flex items-center gap-2.5 ${className}`} aria-label="Playbox">
      <BounceMark
        size={markSize}
        className="text-volt transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[-8deg]"
      />
      <Wordmark className="text-concrete" />
    </a>
  );
}
