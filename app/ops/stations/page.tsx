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

type StationHealth = {
  station_id: string;
  fw_version: string | null;
  battery_pct: number | null;
  battery_mv: number | null;
  last_seen_at: string | null;
  seq_drift: number | null;
  battery_low: boolean | null;
  stale: boolean | null;
};

export default async function OpsStationsPage() {
  const r = await opRpc<StationHealth[]>("op_station_health");

  if (!r.ok) {
    return (
      <Card className="border-coral/40">
        <CardHeader>
          <CardTitle className="text-coral">İstasyonlar yüklenemedi</CardTitle>
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
          İstasyon sağlığı
        </h1>
        <p className="text-sm text-paper/60">
          Cihaz başına firmware, pil ve son görülme durumu.
        </p>
      </div>

      {rows.length === 0 ? (
        <Card>
          <CardContent className="text-paper/60">
            Kayıtlı istasyon yok.
          </CardContent>
        </Card>
      ) : (
        <Card className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İstasyon</TableHead>
                <TableHead>FW</TableHead>
                <TableHead>Pil</TableHead>
                <TableHead>Son görülme</TableHead>
                <TableHead>Seq drift</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.station_id}>
                  <TableCell className="font-mono text-xs">
                    {row.station_id}
                  </TableCell>
                  <TableCell>{row.fw_version ?? "—"}</TableCell>
                  <TableCell>
                    {row.battery_low ? (
                      <Badge variant="danger">
                        {row.battery_pct ?? "?"}% düşük
                      </Badge>
                    ) : (
                      <span>{row.battery_pct ?? "?"}%</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs text-paper/70">
                        {row.last_seen_at ?? "—"}
                      </span>
                      {row.stale ? <Badge variant="coral">stale</Badge> : null}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {row.seq_drift ?? "—"}
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
