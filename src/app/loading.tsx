import { PostCardSkeleton } from "@/components/PostCardSkeleton";
import styles from "./styles.module.css";

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className={styles.cardGrid}>
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    </main>
  );
}
