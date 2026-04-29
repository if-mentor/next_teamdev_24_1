"use server";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { z } from "zod";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);

const LoginSchema = z.object({
  email: z.string().min(1, "メールアドレスを入力してください").email("正しいメールアドレスを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
});

// 返ってくる型の形を定義
type LoginState = {
  error?:
    | string
    | {
        email?: string[];
        password?: string[];
      };
  success?: boolean;
} | null;

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  // FEで入力欄が入力してあるか＆型があってるかチェック
  const check = LoginSchema.safeParse({
    email,
    password,
  });

  // FEで入力が空だったり、型があってないときにエラー表示させる
  if (!check.success) {
    return { error: check.error.flatten().fieldErrors };
  }

  // Supabaseのusersと照らし合わせる処理
  const { error } = await supabase.auth.signInWithPassword({
    email: check.data.email,
    password: check.data.password,
  });

  // usersにいない、またはパスワードが違う場合
  if (error) {
    return { error: "メールアドレスまたはパスワードが正しくありません" };
  }

  // 成功したらマイページなどに飛ばす
  redirect("/");
}
