"use client";

import { useI18n } from "@/lib/i18n";
import { SectionKicker } from "@/components/how-it-works";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
  const { t } = useI18n();
  return (
    <section className="relative py-28 md:py-40 px-6 border-t border-paper/5">
      <div className="mx-auto max-w-[1100px]">
        <SectionKicker>{t.faq.kicker}</SectionKicker>
        <h2 className="mt-5 font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-3xl balanced">
          {t.faq.title}
        </h2>

        <Accordion type="single" collapsible className="mt-16 border-t border-paper/10">
          {t.faq.items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
