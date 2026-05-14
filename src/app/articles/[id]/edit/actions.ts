"use server";

import { createClient } from "@/libs/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateArticle(postId: number, formData: FormData) {
  const supabase = await createClient();

  // ログインユーザーの情報取得
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("ログインしていません");
  }

  // 現在のデータを取得
  const { data: existingPost, error: fetchError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !existingPost) {
    throw new Error("記事が見つからないか、編集権限がありません");
  }

  // フォームから値を取得
  const category_id = Number(formData.get("category_id"));
  const title = (formData.get("title") as string).trim();
  const content = (formData.get("content") as string).trim();
  const imageFile = formData.get("image_path") as File | null;

  // バリデーション
  if (title.length < 1 || title.length > 40) {
    throw new Error("タイトルは1文字以上40文字以内で入力してください");
  }

  if (content.length < 10 || content.length > 1000) {
    throw new Error("記事詳細は10文字以上1000文字以内で入力してください");
  }

  if (!category_id) {
    throw new Error("カテゴリを選択してください");
  }

  // 新しい画像を保存する画像パス（新しい画像がなければ既存画像を使用）
  let finalImagePath = existingPost.image_path;
  // 画像が選択されている場合のみアップロード
  if (imageFile && imageFile.size > 0) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (imageFile.size > MAX_FILE_SIZE) {
      throw new Error("画像サイズは5MB以下にしてください");
    }

    // 新しい画像を Supabase Storage にアップロード
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage.from("image_path").upload(fileName, imageFile);

    // 画像パスが存在しない場合
    if (uploadError) {
      throw new Error("画像のアップロードに失敗しました");
    }

    finalImagePath = fileName;
  }

  if (!finalImagePath) {
    throw new Error("画像は必須です");
  }

  // データを更新
  const { error: updateError } = await supabase
    .from(`posts`)
    .update({
      category_id,
      title,
      content,
      image_path: finalImagePath,
      updated_at: new Date().toISOString(),
    })
    .match({ id: postId, user_id: user.id });

  // 更新失敗時
  if (updateError) throw new Error(updateError.message);

  revalidatePath(`/articles/${postId}`);
}
