"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * The signature spine: a volt-green energy ribbon that draws itself down the
 * whole page as you scroll, snaking between sections. Absolutely positioned to
 * fill the page wrapper, stretched with preserveAspectRatio="none".
 */
export function VoltRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <filter id="voltGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* faint full track */}
        <path
          d="M 82 -2 C 40 8, 12 16, 26 30 C 40 44, 90 40, 84 54 C 78 68, 14 60, 22 74 C 30 88, 74 86, 60 102"
          stroke="var(--color-slate)"
          strokeWidth="0.35"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* the volt current, drawn by scroll */}
        <motion.path
          d="M 82 -2 C 40 8, 12 16, 26 30 C 40 44, 90 40, 84 54 C 78 68, 14 60, 22 74 C 30 88, 74 86, 60 102"
          stroke="var(--color-volt)"
          strokeWidth="0.5"
          strokeLinecap="round"
          filter="url(#voltGlow)"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
