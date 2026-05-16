"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

export async function postComment(
  prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  const content = formData.get("content") as string;
  const postId = formData.get("post_id") as string;

  if (!content || content.length < 1 || content.length > 80) {
    return { error: "コメントは1文字以上80文字以内です" };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.from("comments").insert({
    content,
    post_id: Number(postId),
    user_id: user.id,
  });

  if (error) {
    console.error("Supabaseエラー:", error);
    return { error: "コメント投稿に失敗しました" };
  }

  revalidatePath(`/articles/${postId}`);
  return null;
}
