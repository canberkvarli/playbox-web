"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { LangToggle } from "@/components/lang-toggle";
import { BounceMark, Wordmark } from "@/components/logo";
import { legalDocs, type LegalDocKey } from "@/lib/legal-content";

const docLinks: { key: LegalDocKey; href: string }[] = [
  { key: "kvkk", href: "/kvkk" },
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
];

export function LegalPage({ doc }: { doc: LegalDocKey }) {
  const { lang, t } = useI18n();
  const content = legalDocs[doc][lang];

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate bg-asphalt/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <BounceMark size={26} />
            <Wordmark className="text-concrete" />
          </Link>
          <LangToggle />
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-10 flex flex-wrap gap-2">
          {docLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={
                "rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors " +
                (key === doc
                  ? "border-volt bg-volt text-asphalt"
                  : "border-slate text-muted hover:text-concrete")
              }
            >
              {legalDocs[key][lang].title}
            </Link>
          ))}
        </nav>

        <h1 className="text-3xl font-bold uppercase tracking-tight text-concrete sm:text-4xl">
          {content.title}
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted">
          {content.updated}
        </p>
        <p className="pretty mt-8 leading-relaxed text-concrete/80">{content.intro}</p>

        {content.sections.map((section) => {
          // render body sequentially, grouping consecutive "- " lines into lists
          const blocks: ({ type: "p"; text: string } | { type: "ul"; items: string[] })[] = [];
          for (const line of section.body) {
            if (line.startsWith("- ")) {
              const last = blocks[blocks.length - 1];
              if (last?.type === "ul") last.items.push(line.slice(2));
              else blocks.push({ type: "ul", items: [line.slice(2)] });
            } else {
              blocks.push({ type: "p", text: line });
            }
          }

          return (
            <section key={section.h} className="mt-10">
              <h2 className="text-lg font-bold uppercase tracking-tight text-concrete">
                {section.h}
              </h2>
              {blocks.map((block, i) =>
                block.type === "p" ? (
                  <p key={i} className="pretty mt-3 text-sm leading-relaxed text-concrete/70">
                    {block.text}
                  </p>
                ) : (
                  <ul key={i} className="mt-3 space-y-2">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-concrete/70"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-volt" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              )}
            </section>
          );
        })}

        <footer className="mt-16 border-t border-slate pt-6 font-mono text-[11px] uppercase tracking-widest text-muted">
          {t.footer.legal}
        </footer>
      </article>
    </main>
  );
}
