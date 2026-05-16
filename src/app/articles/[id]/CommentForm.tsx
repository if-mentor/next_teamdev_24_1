"use client";

import { useActionState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { postComment } from "./action";
import styles from "./styles.module.css";

type Props = {
  postId: number;
};

export function CommentForm({ postId }: Props) {
  const [state, formAction] = useActionState(postComment, null);

  return (
    <form action={formAction} className={styles.commentForm}>
      <Input placeholder="コメントを入力" name="content" size="large" />
      <input type="hidden" name="post_id" value={postId} />
      {state?.error && <p className={styles.errorMessage}>{state.error}</p>}
      <Button label="コメント" variant="success" size="medium" type="submit" />
    </form>
  );
}
