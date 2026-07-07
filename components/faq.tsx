"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Kicker } from "@/components/section-kicker";

export function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-4xl px-6 py-28 md:py-36">
      <div className="text-center">
        <div className="flex justify-center">
          <Kicker>{t.faq.kicker}</Kicker>
        </div>
        <h2 className="font-display mt-6 text-4xl leading-[0.95] text-concrete sm:text-5xl">{t.faq.title}</h2>
      </div>

      <div className="mt-14 flex flex-col">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-t border-slate last:border-b">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
              >
                <span
                  className={`font-display text-lg uppercase tracking-wide transition-colors sm:text-xl ${
                    isOpen ? "text-volt" : "text-concrete"
                  }`}
                >
                  {item.q}
                </span>
                <Plus
                  className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                    isOpen ? "rotate-45 text-volt" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pretty max-w-2xl pb-6 text-[15px] leading-relaxed text-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
