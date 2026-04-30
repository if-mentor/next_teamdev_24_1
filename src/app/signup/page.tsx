"use client";

import Input from "@/components/Input";
import Link from "next/link";
import styles from "./styles.module.css";
import Button from "@/components/Button";
import { useActionState } from "react";
import { signupAction, type SignupFormState } from "./actions";

const initialState: SignupFormState = {
  errors: {},
  values: {
    name: "",
    email: "",
  },
  success: false,
};

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signupAction, initialState);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>新規登録</h1>
      <form action={formAction} className={styles.form} noValidate>
        <Input
          label="名前"
          type="text"
          name="name"
          placeholder="名前を入力"
          defaultValue={state.values.name}
          error={state.errors.name}
        />
        <Input
          label="メールアドレス"
          type="email"
          name="email"
          placeholder="メールアドレスを入力"
          defaultValue={state.values.email}
          error={state.errors.email}
        />
        <Input
          label="パスワード"
          type="password"
          name="password"
          placeholder="パスワードを入力"
          error={state.errors.password}
        />

        {state.errors.form && <p className={styles.errorMessage}>{state.errors.form}</p>}
        {state.success && state.message && <p className={styles.successMessage}>{state.message}</p>}

        <Button label="登録する" type="submit" variant="success" size="large" loading={isPending} />
      </form>

      <div className={styles.loginLink}>
        <span>すでにアカウントをお持ちの方は</span>
        <Link href="/login">ログイン</Link>
      </div>
    </div>
  );
}
