import Link from "next/link";
import Button from "../Button";
import styles from "./styles.module.css";
import Input from "../Input";

export default function LoginForm() {
  return (
    <form className={styles.form}>
      <h2 className={styles.title}>ログイン</h2>

      <div className={styles.emailField}>
        <Input label="メールアドレス" type="email" name="email" placeholder="メールアドレスを入力" />
      </div>

      <div className={styles.passwordField}>
        <Input label="パスワード" type="password" name="password" placeholder="パスワード" />
      </div>

      <div>
        <Button label="ログイン" variant="success" size="large" />

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
