"use client";

import Input from "@/components/Input";
import Link from "next/link";
import styles from "./styles.module.css";

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>新規登録</h1>

      <form className={styles.form}>
        <Input label="名前" type="text" placeholder="名前を入力" />

        <Input label="メールアドレス" type="email" placeholder="メールアドレスを入力" />

        <Input label="パスワード" type="password" placeholder="パスワードを入力" />

        <button type="submit" className={styles.button}>
          登録する
        </button>
      </form>

      <div className={styles.loginLink}>
        <span>すでにアカウントをお持ちの方は</span>
        <Link href="/login">ログイン</Link>
      </div>
    </div>
  );
}
