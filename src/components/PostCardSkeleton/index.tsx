import styles from "./styles.module.css";

export const PostCardSkeleton = () => {
  return (
    <div className={styles.postCard}>
      <div className={styles.thumbnail} />
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.title} />
          <div className={styles.category} />
        </div>
        <div className={styles.author} />
        <div className={styles.content} />
        <div className={styles.footerRow}>
          <div className={styles.timestamp} />
        </div>
      </div>
    </div>
  );
};
