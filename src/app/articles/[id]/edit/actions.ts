"use server";

import { createClient } from "@/libs/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateArticle(postId: number, formData: FormData) {
  const supabase = await createClient();

  // ログインユーザーの情報取得
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      errors: {
        title: "ログインしてください",
      },
    };
  }

  // 現在のデータを取得
  const { data: existingPost, error: fetchError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !existingPost) {
    return {
      error: "記事が見つからないか、編集権限がありません",
    };
  }

  // フォームから値を取得
  const categoryNames = ["日常", "仕事", "勉強", "美容", "趣味", "購入品", "健康", "その他"];
  const categoryValue = formData.get("category_id") as string;
  const category_id = categoryNames.indexOf(categoryValue) + 1;
  const title = (formData.get("title") as string).trim();
  const content = (formData.get("content") as string).trim();
  const imageFile = formData.get("image") as File | null;

  const errors: Record<string, string> = {};

  // バリデーション
  if (title.length < 1 || title.length > 40) {
    errors.title = "タイトルは1〜40文字で入力してください";
  }

  if (content.length < 10 || content.length > 1000) {
    errors.content = "本文は10文字以上1000文字以内で入力してください";
  }

  if (category_id === -1) {
    errors.category = "カテゴリを選択してください";
  }

  // まとめて返す
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // 画像処理
  let finalImagePath = existingPost.image_path; //新しい画像
  let oldImagePathToDelete: string | null = null; //古い画像

  // 画像が選択されている場合のみアップロード
  if (imageFile && imageFile.size > 0) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (imageFile.size > MAX_FILE_SIZE) {
      return {
        errors: {
          image: "画像サイズは5MB以下にしてください",
        },
      };
    }

    // 新しい画像を Supabase Storage にアップロード
    const ext = imageFile.name.split(".").pop();
    const filePath = `blog_image/posts/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("teamdev").upload(filePath, imageFile);

    // 画像パスが存在しない場合
    if (uploadError) {
      return {
        error: "画像のアップロードに失敗しました",
      };
    }

    const { data } = await supabase.storage.from("teamdev").getPublicUrl(filePath);

    finalImagePath = data.publicUrl;

    // 古い画像削除用（URL → path変換）
    if (existingPost.image_path) {
      oldImagePathToDelete = existingPost.image_path.split("/teamdev/")[1];
    }
  }

  if (!finalImagePath) {
    return {
      error: "画像は必須です",
    };
  }

  // データを更新
  const { data: updatedPost, error: updateError } = await supabase
    .from("posts")
    .update({
      category_id,
      title,
      content,
      image_path: finalImagePath,
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId)
    .eq("user_id", user.id)
    .select();

  // 更新失敗時（0件更新も含めて判定）
  if (updateError || !updatedPost || updatedPost.length === 0) {
    return {
      error: "データの更新に失敗しました",
    };
  }

  // 古い画像の削除(DB更新が成功した後に実行）
  if (oldImagePathToDelete) {
    await supabase.storage.from("teamdev").remove([oldImagePathToDelete]);
  }

  revalidatePath(`/articles/${postId}`);
  revalidatePath("/");

  redirect(`/articles/${postId}`);
}
