import Image from "next/image";
import { getRelativeTime } from "../../utils/getRelativeTime";
import styles from "./styles.module.css";
import { PostCardProps } from "./type";

export const PostCard = ({ title, author, category, thumbnailUrl, content, createdAt }: PostCardProps) => {
  return (
    <div className={styles.postCard}>
      <div className={styles.thumbnail}>
        <Image src={thumbnailUrl} alt={title} fill className={styles.thumbnailImage} />
      </div>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.category}>{category}</span>
        </div>
        <div className={styles.author}>{author}</div>
        <p className={styles.content}>{content}</p>
        <div className={styles.footerRow}>
          <time className={styles.timestamp}>{getRelativeTime(createdAt)}</time>
        </div>
      </div>
    </div>
  );
};
