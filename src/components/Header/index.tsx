import { createClient } from "@/libs/supabase/server";
import { logout } from "@/app/actions";
import styles from "./styles.module.css";
import Button from "../Button";
import Link from "next/link";

export const Header = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;

  return (
    <header className={styles.header}>
      {isLoggedIn ? (
        <div className={styles.buttonWrapper}>
          <Link href="/articles/new" className={`${styles.button}  ${styles.secondaryButton} ${styles.mediumButton}`}>
            新規作成
          </Link>
          <form action={logout}>
            <Button type="submit" label="ログアウト" />
          </form>
        </div>
      ) : (
        <div className={styles.buttonWrapper}>
          <Link href="/login" className={`${styles.button}  ${styles.secondaryButton} ${styles.mediumButton}`}>
            ログイン
          </Link>
          <Link href="/signup" className={`${styles.button}  ${styles.primaryButton} ${styles.mediumButton}`}>
            新規登録
          </Link>
        </div>
      )}
    </header>
  );
};
