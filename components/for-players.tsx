"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Kicker } from "@/components/section-kicker";
import { BounceMark } from "@/components/logo";

export function ForPlayers() {
  const { t } = useI18n();

  return (
    <section id="players" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
        {/* copy */}
        <div>
          <Kicker>{t.players.kicker}</Kicker>
          <h2 className="font-display mt-6 text-5xl leading-[1.02] text-concrete sm:text-6xl">
            {t.players.title}
          </h2>
          <p className="pretty mt-6 max-w-md text-[15px] leading-relaxed text-muted">{t.players.sub}</p>

          <ul className="mt-10 flex flex-col gap-5">
            {t.players.features.map((f, i) => (
              <motion.li
                key={f.t}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-volt" />
                <div>
                  <p className="font-display text-lg uppercase tracking-wide text-concrete">{f.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{f.d}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <StoreButton label={t.players.ios} sub={t.players.soon} />
            <StoreButton label={t.players.android} sub={t.players.soon} />
          </div>
        </div>

        {/* app card mock */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -3 }}
          whileInView={{ opacity: 1, y: 0, rotate: -3 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[300px]"
        >
          <div className="relative rounded-[2.2rem] border border-slate bg-card p-5 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between">
              <BounceMark size={26} className="text-volt" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">aktif seans</span>
            </div>
            <div className="mt-6 rounded-2xl bg-asphalt p-5">
              <span className="font-mono text-[11px] tracking-wider text-muted">IST-KADIKOY-07</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl">🏀</span>
                <span className="font-display text-3xl text-concrete">BASKETBOL</span>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">süre</p>
                  <p className="font-mono text-4xl text-volt">12:48</p>
                </div>
                <span className="rounded-full bg-volt px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-asphalt">
                  iade et
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate px-4 py-3">
              <span className="font-mono text-[11px] tracking-wider text-concrete/80">🔥 seri</span>
              <span className="font-mono text-sm text-coral">7 gün</span>
            </div>
          </div>
          {/* glow — radial gradient (smoother than a blurred solid) */}
          <div
            className="absolute -inset-12 -z-10"
            style={{ background: "radial-gradient(closest-side, rgba(214,251,60,0.13), transparent 72%)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function StoreButton({ label, sub }: { label: string; sub: string }) {
  return (
    <span className="flex items-center gap-3 rounded-2xl border border-slate bg-card px-5 py-3">
      <span className="font-display text-base text-concrete">{label}</span>
      <span className="rounded-full bg-slate px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted">
        {sub}
      </span>
    </span>
  );
}
