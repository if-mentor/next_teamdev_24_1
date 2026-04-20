"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import Button from "../Button";
import Link from "next/link";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className={styles.header}>
      {isLoggedIn ? (
        <div className={styles.buttonWrapper}>
          <Link href="/articles/new" className={`${styles.button}  ${styles.secondaryButton} ${styles.mediumButton}`}>
            新規作成
          </Link>
          <Button label="ログアウト" onClick={() => setIsLoggedIn(false)} />
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
