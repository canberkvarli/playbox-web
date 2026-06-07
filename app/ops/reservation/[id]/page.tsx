import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { opRpc } from "@/lib/supabase-admin";

import { markDisputed, resolveDispute, unquarantine } from "./actions";

export const dynamic = "force-dynamic";

type TimelineEvent = {
  at: string;
  source: string | null;
  kind: string | null;
  detail: unknown;
};

type AttentionItem = {
  id: string;
  disputed_at: string | null;
  dispute_reason: string | null;
  quarantined_at: string | null;
};

function renderDetail(detail: unknown): string {
  if (detail == null) return "";
  if (typeof detail === "string") return detail;
  try {
    return JSON.stringify(detail, null, 2);
  } catch {
    return String(detail);
  }
}

export default async function OpsReservationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [timeline, queue] = await Promise.all([
    opRpc<TimelineEvent[]>("op_dispute_timeline", { p_reservation_id: id }),
    opRpc<AttentionItem[]>("op_attention_queue"),
  ]);

  if (!timeline.ok) {
    return (
      <Card className="border-coral/40">
        <CardHeader>
          <CardTitle className="text-coral">Zaman çizelgesi yüklenemedi</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap break-words font-mono text-xs text-coral">
            {timeline.error}
          </pre>
        </CardContent>
      </Card>
    );
  }

  // Derive current dispute/quarantine flags from the attention queue (source of
  // truth). If that lookup fails we still render the timeline + the most
  // permissive action set, surfacing the lookup error inline.
  const item = queue.ok
    ? (queue.data ?? []).find((q) => q.id === id)
    : undefined;
  const isDisputed = Boolean(item?.disputed_at);
  const isQuarantined = Boolean(item?.quarantined_at);

  const events = timeline.data ?? [];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Link
          href="/ops"
          className="font-display text-xs uppercase tracking-[0.06em] text-paper/50 hover:text-coral"
        >
          ← Sıra
        </Link>
        <h1 className="font-mono text-lg text-paper">{id}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Destek işlemleri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {!queue.ok ? (
            <p className="font-mono text-xs text-coral">
              Durum okunamadı (op_attention_queue): {queue.error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {isDisputed ? <Badge variant="coral">İhtilaflı</Badge> : null}
            {isQuarantined ? <Badge variant="butter">Karantina</Badge> : null}
            {!isDisputed && !isQuarantined ? (
              <Badge variant="neutral">Bayrak yok</Badge>
            ) : null}
          </div>

          {!isDisputed ? (
            <form action={markDisputed} className="space-y-2">
              <input type="hidden" name="id" value={id} />
              <Label htmlFor="reason">İhtilaf nedeni</Label>
              <div className="flex gap-2">
                <Input
                  id="reason"
                  name="reason"
                  placeholder="Neden"
                  required
                  className="max-w-sm"
                />
                <Button type="submit" variant="coral" size="sm">
                  İhtilaflı işaretle
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-wrap gap-2">
              <form action={resolveDispute}>
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="action" value="refund" />
                <Button type="submit" variant="coral" size="sm">
                  İade et (refund)
                </Button>
              </form>
              <form action={resolveDispute}>
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="action" value="uphold" />
                <Button type="submit" variant="outline" size="sm">
                  Reddet (uphold)
                </Button>
              </form>
            </div>
          )}

          {isQuarantined ? (
            <form action={unquarantine}>
              <input type="hidden" name="id" value={id} />
              <Button type="submit" variant="outline" size="sm">
                Karantinadan çıkar
              </Button>
            </form>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zaman çizelgesi</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-paper/60">Olay yok.</p>
          ) : (
            <ol className="space-y-4">
              {events.map((ev, i) => (
                <li
                  key={`${ev.at}-${i}`}
                  className="border-l border-paper/15 pl-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-paper/60">
                      {ev.at}
                    </span>
                    {ev.source ? (
                      <Badge variant="outline">{ev.source}</Badge>
                    ) : null}
                    <span className="font-display text-xs uppercase tracking-[0.04em] text-paper/80">
                      {ev.kind ?? "—"}
                    </span>
                  </div>
                  {ev.detail != null ? (
                    <pre className="mt-2 max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded bg-ink-soft/60 p-2 font-mono text-[0.7rem] text-paper/70">
                      {renderDetail(ev.detail)}
                    </pre>
                  ) : null}
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
