"use server";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

// ログインフォームのバリデーション定義
const LoginSchema = z.object({
  email: z.string().min(1, "メールアドレスを入力してください").email("正しいメールアドレスを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
});

// ログイン処理の返り値（エラー情報）
type LoginState = {
  error?: {
    email?: string[];
    password?: string[];
  };
} | null;

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  // 入力値のバリデーションチェック
  const check = LoginSchema.safeParse({
    email,
    password,
  });

  // バリデーションエラー時にエラー情報を返す
  if (!check.success) {
    return { error: check.error.flatten().fieldErrors };
  }

  // Supabaseでメール・パスワードの認証を行う
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: check.data.email,
    password: check.data.password,
  });

  // 認証に失敗した場合、エラーを返す
  if (error) {
    return {
      error: {
        email: ["メールアドレスまたはパスワードが正しくありません"],
        password: ["メールアドレスまたはパスワードが正しくありません"],
      },
    };
  }

  // 認証成功時はトップページへリダイレクト
  redirect("/");
}
