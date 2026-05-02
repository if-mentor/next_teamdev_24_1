"use client";

import Link from "next/link";
import Button from "../Button";
import styles from "./styles.module.css";
import Input from "../Input";
import { login } from "@/app/login/actions";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, formAction] = useActionState(login, null);

  return (
    <form className={styles.form} action={formAction}>
      <h2 className={styles.title}>ログイン</h2>

      <div className={styles.emailField}>
        <Input
          label="メールアドレス"
          type="email"
          name="email"
          placeholder="メールアドレスを入力"
          error={state?.error?.email?.[0]}
        />
      </div>

      <div className={styles.passwordField}>
        <Input
          label="パスワード"
          type="password"
          name="password"
          placeholder="パスワード"
          error={state?.error?.password?.[0]}
        />
      </div>

      <div>
        <Button type="submit" label="ログイン" variant="success" size="large" />

        <p className={styles.helperText}>
          アカウントをお持ちでない方は
          <Link href="/signup" className={styles.signupLink}>
            新規登録
          </Link>
        </p>
      </div>
    </form>
  );
}
