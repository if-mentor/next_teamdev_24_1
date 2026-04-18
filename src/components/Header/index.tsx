"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import Button from "../Button";
import Link from "next/link";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className={styles.header}>
      {isLoggedIn ? (
        <div className={styles.buttonWrapper}>
          <Link href="/articles/new">
            <Button label="新規作成" variant="secondary" />
          </Link>
          <Button label="ログアウト" onClick={() => setIsLoggedIn(false)} />
        </div>
      ) : (
        <div className={styles.buttonWrapper}>
          <Link href="/login">
            <Button label="ログイン" variant="secondary" />
          </Link>
          <Link href="/signup">
            <Button label="新規登録" />
          </Link>
        </div>
      )}
    </header>
  );
};
