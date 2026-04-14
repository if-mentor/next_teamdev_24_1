import styles from "./styles.module.css";
import { CommentCardProps } from "./type";
import { dateConvert } from "@/utils/dateconvert";
import Image from "next/image";

export const CommentCard = ({ userName, userAvatarUrl, content, created_at }: CommentCardProps) => {
  const avatarSrc = userAvatarUrl || "/default_user_icon.png";
  const timeAgo = dateConvert(created_at);

  return (
    <div className={styles.commentCard}>
      <Image src={avatarSrc} alt={`${userName}'s avatar`} className={styles.avatar} width={32} height={32} />

      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.timeAgo}>{timeAgo}</span>
        </div>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
};
