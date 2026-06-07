"use server";

import { revalidatePath } from "next/cache";

import { assertOpsSession } from "@/lib/ops-session";
import { opRpc } from "@/lib/supabase-admin";

const ADMIN = "ops-console";

/** Raised when an op_* RPC fails, so the failure surfaces instead of being swallowed. */
class OpActionError extends Error {}

function revalidate(id: string): void {
  revalidatePath(`/ops/reservation/${id}`);
  revalidatePath("/ops");
}

/** Flag a reservation as disputed with an operator-supplied reason. */
export async function markDisputed(formData: FormData): Promise<void> {
  await assertOpsSession();
  const id = String(formData.get("id") ?? "");
  const reason = String(formData.get("reason") ?? "");
  if (!id) throw new OpActionError("markDisputed: missing reservation id");

  const r = await opRpc("op_mark_disputed", {
    p_reservation_id: id,
    p_reason: reason,
    p_admin: ADMIN,
  });
  if (!r.ok) throw new OpActionError(`op_mark_disputed failed: ${r.error}`);

  revalidate(id);
}

/** Resolve an open dispute by refunding or upholding. */
export async function resolveDispute(formData: FormData): Promise<void> {
  await assertOpsSession();
  const id = String(formData.get("id") ?? "");
  const action = String(formData.get("action") ?? "");
  if (!id) throw new OpActionError("resolveDispute: missing reservation id");
  if (action !== "refund" && action !== "uphold") {
    throw new OpActionError(`resolveDispute: invalid action ${action}`);
  }

  const r = await opRpc("op_resolve_dispute", {
    p_reservation_id: id,
    p_action: action,
    p_admin: ADMIN,
  });
  if (!r.ok) throw new OpActionError(`op_resolve_dispute failed: ${r.error}`);

  revalidate(id);
}

/** Release a quarantined reservation back into normal settlement. */
export async function unquarantine(formData: FormData): Promise<void> {
  await assertOpsSession();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new OpActionError("unquarantine: missing reservation id");

  const r = await opRpc("op_unquarantine", {
    p_reservation_id: id,
    p_admin: ADMIN,
  });
  if (!r.ok) throw new OpActionError(`op_unquarantine failed: ${r.error}`);

  revalidate(id);
}
