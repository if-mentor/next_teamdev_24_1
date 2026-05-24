"use server";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("category_id") as string;
  const image = formData.get("image") as File;

  // バリデーション
  if (!title) throw new Error("タイトルは必須です");
  if (title.length > 40) throw new Error("タイトルは40文字以内で入力してください");
  if (!image || image.size === 0) throw new Error("画像は必須です");
  if (image.size > 5 * 1024 * 1024) throw new Error("画像は5MB以下のファイルを選択してください");
  if (!categoryId) throw new Error("カテゴリは必須です");
  if (!content) throw new Error("記事詳細は必須です");
  if (content.length < 10 || content.length > 1000)
    throw new Error("記事詳細は10文字以上1000文字以内で入力してください");

  const supabase = await createClient();

  const fileName = `${Date.now()}_${image.name}`;
  const { error: storageError } = await supabase.storage.from("teamdev").upload(`blog_image/posts/${fileName}`, image);

  if (storageError) {
    throw new Error("画像のアップロードに失敗しました");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("teamdev").getPublicUrl(`blog_image/posts/${fileName}`);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error: insertError } = await supabase.from("posts").insert({
    title,
    content,
    category_id: Number(categoryId),
    image_path: publicUrl,
    user_id: user?.id,
  });

  if (insertError) {
    throw new Error("記事の投稿に失敗しました");
  }

  redirect("/");
}
