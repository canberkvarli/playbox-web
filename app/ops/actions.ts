"use server";

import { redirect } from "next/navigation";

import { clearOpsSession } from "@/lib/ops-session";

/** Clear the session cookie and return the operator to the login page. */
export async function logoutAction(): Promise<void> {
  await clearOpsSession();
  redirect("/ops/login");
}
