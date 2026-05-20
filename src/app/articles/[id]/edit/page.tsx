import ArticleEditForm from "./editArticleForm";
import { createClient } from "@/libs/supabase/server";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ArticleEditPage({ params }: PageProps) {
  const { id } = await params;
  const postId = Number(id);
  const supabase = await createClient();

  // 現在のログインユーザーを取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 投稿データを取得
  const { data: existingPost, error } = await supabase.from("posts").select("*").eq("id", postId).single();

  if (error || !existingPost) {
    return <p>投稿が見つかりません。</p>;
  }

  // 所有者チェック
  if (!user || existingPost.user_id !== user.id) {
    return <p>投稿者以外は編集できません。</p>;
  }

  return <ArticleEditForm postId={postId} existingPost={existingPost} />;
}
