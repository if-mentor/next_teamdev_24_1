"use server";

import { createClient } from "@/libs/supabase/server";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export async function deleteArticle(articleId: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: article, error } = await supabase.from("posts").select("id, user_id").eq("id", articleId).single();

  if (error || !article) {
    notFound();
  }

  if (article.user_id !== user.id) {
    redirect(`/articles/${articleId}`);
  }

  const { error: deleteError } = await supabase.from("posts").delete().eq("id", articleId).eq("user_id", user.id);

  if (deleteError) {
    throw new Error("記事の削除に失敗しました");
  }

  revalidatePath("/");
  redirect("/");
}
