import Image from "next/image";
import { Header } from "@/components/Header";
import { CommentCard } from "@/components/CommentCard";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateconvert";
import { dummyArticle as article, dummyComments as comments } from "@/dummy/articleDetail";
import Link from "next/link";

export default function ArticleDetailPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.authorWrapper}>
              <span className={styles.authorLabel}>{article.author}</span>
              <Image
                src={article.authorAvatarUrl}
                alt={article.author}
                width={32}
                height={32}
                className={styles.avatar}
              />
            </div>
          </div>
          <div className={styles.thumbnail}>
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              fill
              sizes="720px"
              className={styles.thumbnailImage}
            />
          </div>
          <span className={styles.category}>{article.category}</span>
          <p className={styles.content}>{article.content}</p>
          <div className={styles.footer}>
            <time className={styles.timestamp}>{dateConvert(article.created_at)}</time>
            {/* バックエンド実装時に article.id に変更 */}
            <Link href={`/articles/1/edit`}>
              <Button label="編集" variant="success" size="medium" />
            </Link>
          </div>
        </div>

        <section className={styles.commentSection}>
          <h2 className={styles.commentCount}>{comments.length}件のコメント</h2>
          <form className={styles.commentInputWrapper}>
            <Input placeholder="コメントを入力" size="large" />
            <Button label="コメント" variant="success" size="medium" />
          </form>
          <div className={styles.commentList}>
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                userName={comment.userName}
                userAvatarUrl={comment.userAvatarUrl}
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
