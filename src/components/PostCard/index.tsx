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
          <div className={styles.title}>{title}</div>
          <div className={styles.category}>{category}</div>
        </div>
        <div className={styles.author}>{author}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.footerRow}>
          <div className={styles.timestamp}>{getRelativeTime(createdAt)}</div>
        </div>
      </div>
    </div>
  );
};
