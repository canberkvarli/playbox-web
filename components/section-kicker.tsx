"use client";

import { motion } from "motion/react";

export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.3em] text-volt ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-volt" />
      {children}
    </motion.div>
  );
}
