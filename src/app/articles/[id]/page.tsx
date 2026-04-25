import Image from "next/image";
import { Header } from "@/components/Header";
import { CommentCard } from "@/components/CommentCard";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./styles.module.css";

const article = {
  title: "Blog Title",
  author: "Author",
  authorAvatarUrl: "/default_user_icon.png",
  thumbnailUrl: "/sample1.jpg",
  category: "Category",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
};

const comments = [
  {
    id: 1,
    userName: "ユーザー名",
    userAvatarUrl: "/default_user_icon.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    userName: "ユーザー名",
    userAvatarUrl: "/default_user_icon.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ligula nibh, interdum non enim sit amet, iaculis aliquet nunc.",
    created_at: new Date().toISOString(),
  },
];

export default function ArticleDetailPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.authorWrapper}>
              <span className={styles.authorLabel}>Author</span>
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
            <time className={styles.timestamp}>a min ago</time>
            <Button label="編集" variant="success" size="medium" />
          </div>
        </div>

        <section className={styles.commentSection}>
          <h2 className={styles.commentCount}>{comments.length}件のコメント</h2>
          <div className={styles.commentInputWrapper}>
            <Input placeholder="コメントを入力" size="large" />
            <Button label="コメント" variant="success" size="medium" />
          </div>
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
