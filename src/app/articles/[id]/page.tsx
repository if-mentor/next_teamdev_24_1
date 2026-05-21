import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { CommentCard } from "@/components/CommentCard";
import Button from "@/components/Button";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateconvert";
import Link from "next/link";
import { deleteArticle } from "./actions";
import { CommentForm } from "@/components/CommentForm";

type ArticleDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      content,
      image_path,
      created_at,
      user_id,
      categories(name),
      users(name, image_path)`,
    )
    .eq("id", Number(id))
    .single();

  if (error || !article) {
    notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthor = user?.id === article.user_id;

  const { data: comments, error: commentsError } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      created_at,
      users(name, image_path)`,
    )
    .eq("post_id", Number(id))
    .order("created_at", { ascending: false });

  if (commentsError) {
    console.error("コメント取得に失敗しました:", commentsError.message);
  }
  return (
    <>
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.authorWrapper}>
              <span className={styles.authorLabel}>{article.users.name}</span>
              <Image
                src={article.users.image_path || "/default_user_icon.png"}
                alt={article.users.name}
                width={32}
                height={32}
                className={styles.avatar}
              />
            </div>
          </div>
          <div className={styles.thumbnail}>
            <Image src={article.image_path} alt={article.title} fill sizes="720px" className={styles.thumbnailImage} />
          </div>
          <span className={styles.category}>{article.categories.name}</span>
          <p className={styles.content}>{article.content}</p>
          <div className={styles.footer}>
            <time className={styles.timestamp}>{dateConvert(article.created_at)}</time>
            {isAuthor && (
              <div className={styles.actionButtons}>
                <Link href={`/articles/${article.id}/edit`}>
                  <Button label="編集" variant="success" size="medium" />
                </Link>

                <form action={deleteArticle.bind(null, article.id)}>
                  <Button type="submit" label="削除" variant="danger" size="medium" />
                </form>
              </div>
            )}
          </div>
        </div>

        <section className={styles.commentSection}>
          <h2 className={styles.commentCount}>{comments?.length || 0}件のコメント</h2>
          <CommentForm postId={article.id} />
          <div className={styles.commentList}>
            {comments?.map((comment) => (
              <CommentCard
                key={comment.id}
                userName={comment.users.name}
                userAvatarUrl={comment.users.image_path || "/default_user_icon.png"}
                content={comment.content}
                created_at={comment.created_at}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
