import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { opRpc } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type AttentionItem = {
  id: string;
  user_id: string | null;
  status: string | null;
  deposit_state: string | null;
  disputed_at: string | null;
  dispute_reason: string | null;
  quarantined_at: string | null;
  settle_attempts: number | null;
  settle_last_error: string | null;
};

function shortId(id: string): string {
  return id.length > 8 ? `${id.slice(0, 8)}…` : id;
}

export default async function OpsAttentionQueuePage() {
  const r = await opRpc<AttentionItem[]>("op_attention_queue");

  if (!r.ok) {
    return (
      <Card className="border-coral/40">
        <CardHeader>
          <CardTitle className="text-coral">Sıra yüklenemedi</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap break-words font-mono text-xs text-coral">
            {r.error}
          </pre>
        </CardContent>
      </Card>
    );
  }

  const rows = r.data ?? [];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-2xl uppercase tracking-[0.04em] text-paper">
          Dikkat sırası
        </h1>
        <p className="text-sm text-paper/60">
          İhtilaflı veya karantinadaki rezervasyonlar.
        </p>
      </div>

      {rows.length === 0 ? (
        <Card>
          <CardContent className="text-paper/60">Sıra temiz.</CardContent>
        </Card>
      ) : (
        <Card className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Kullanıcı</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Depozito</TableHead>
                <TableHead>İşaretler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Link
                      href={`/ops/reservation/${row.id}`}
                      className="font-mono text-xs text-coral underline-offset-4 hover:underline"
                    >
                      {shortId(row.id)}
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {row.user_id ?? "—"}
                  </TableCell>
                  <TableCell>{row.status ?? "—"}</TableCell>
                  <TableCell>{row.deposit_state ?? "—"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      {row.disputed_at ? (
                        <Badge variant="coral">
                          İhtilaf{row.dispute_reason ? `: ${row.dispute_reason}` : ""}
                        </Badge>
                      ) : null}
                      {row.quarantined_at ? (
                        <Badge variant="butter">
                          Karantina · {row.settle_attempts ?? 0} deneme
                          {row.settle_last_error ? ` · ${row.settle_last_error}` : ""}
                        </Badge>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
