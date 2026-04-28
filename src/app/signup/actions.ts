"use server";

import { createClient } from "@/libs/supabase/server";

type SignupErrors = {
  name?: string;
  email?: string;
  password?: string;
  form?: string;
};

export type SignupFormState = {
  errors: SignupErrors;
  values: {
    name: string;
    email: string;
  };
  success: boolean;
  message?: string;
};

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getValue = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

const getSignupFormValues = (formData: FormData): SignupFormValues => {
  return {
    name: getValue(formData, "name"),
    email: getValue(formData, "email"),
    password: getValue(formData, "password"),
  };
};

const validateSignupForm = (values: SignupFormValues) => {
  const errors: SignupErrors = {};

  if (!values.name) {
    errors.name = "名前を入力してください";
  } else if (values.name.length > 12) {
    errors.name = "名前は12文字以内で入力してください";
  }

  if (!values.email) {
    errors.email = "メールアドレスを入力してください";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "メールアドレスの形式が正しくありません";
  }

  if (!values.password) {
    errors.password = "パスワードを入力してください";
  } else if (values.password.length < 8) {
    errors.password = "パスワードは8文字以上で入力してください";
  } else if (values.password.length > 24) {
    errors.password = "パスワードは24文字以内で入力してください";
  }

  return errors;
};

const createErrorState = (values: SignupFormValues, errors: SignupErrors): SignupFormState => {
  return {
    errors,
    values: {
      name: values.name,
      email: values.email,
    },
    success: false,
  };
};

export async function signupAction(_: SignupFormState, formData: FormData): Promise<SignupFormState> {
  const values = getSignupFormValues(formData);
  const errors = validateSignupForm(values);

  if (Object.keys(errors).length > 0) {
    return createErrorState(values, errors);
  }

  const supabase = await createClient();

  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("id")
    .eq("email", values.email)
    .maybeSingle();

  if (existingUserError) {
    return createErrorState(values, {
      form: "登録済みメールアドレスの確認に失敗しました。時間をおいて再度お試しください",
    });
  }

  if (existingUser) {
    return createErrorState(values, {
      email: "このメールアドレスは既に登録されています",
    });
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        name: values.name,
      },
    },
  });

  if (authError) {
    return createErrorState(values, {
      form: "ユーザー登録に失敗しました。入力内容を確認してください",
    });
  }

  if (!authData.user || authData.user.identities?.length === 0) {
    return createErrorState(values, {
      email: "このメールアドレスは既に登録されています",
    });
  }

  const now = new Date().toISOString();
  const { error: insertUserError } = await supabase.from("users").insert({
    id: authData.user.id,
    name: values.name,
    email: values.email,
    image_path: null,
    created_at: now,
    updated_at: now,
  });

  if (insertUserError) {
    if (insertUserError.code === "23505") {
      return createErrorState(values, {
        email: "このメールアドレスは既に登録されています",
      });
    }

    return createErrorState(values, {
      form: "ユーザー情報の登録に失敗しました。時間をおいて再度お試しください",
    });
  }

  return {
    errors: {},
    values: { name: "", email: "" },
    success: true,
    message: "登録が完了しました",
  };
}
