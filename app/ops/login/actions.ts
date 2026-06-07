"use server";

import { redirect } from "next/navigation";

import { checkPassword, createOpsSession } from "@/lib/ops-session";

/**
 * Verify the submitted password (constant-time) and, on success, mint a session
 * and send the operator to /ops. On failure, bounce back to the login page with
 * a generic error flag. The password is never echoed back to the client.
 */
export async function loginAction(formData: FormData): Promise<void> {
  const pw = String(formData.get("password") ?? "");
  if (await checkPassword(pw)) {
    await createOpsSession();
    redirect("/ops");
  }
  redirect("/ops/login?e=1");
}
