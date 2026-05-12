"use server";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function searchAction(formData: FormData) {
  console.log(formData.get("keyword"));
}
