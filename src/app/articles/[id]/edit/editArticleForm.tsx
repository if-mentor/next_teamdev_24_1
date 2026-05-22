"use client";

import { useActionState } from "react";
import { updateArticle } from "./actions";
import Input from "@/components/Input";
import SelectBox from "@/components/SelectBox";
import Button from "@/components/Button";
import ImageUploaderPreview from "@/components/ImageUploaderPreview";
import TextBox from "@/components/TextBox";
import styles from "./styles.module.css";

type ArticleEditFormProps = {
  postId: number;
  existingPost: {
    id: number;
    title: string;
    content: string;
    image_path: string | null;
    category_id: number;
    user_id: string;
  };
  categories: {
    id: number;
    name: string;
  }[];
};

type ActionState = {
  errors?: {
    title?: string;
    content?: string;
    category?: string;
    image?: string;
  };
  error?: string;
} | null;

export default function ArticleEditForm({ postId, existingPost, categories }: ArticleEditFormProps) {
  const [state, formAction] = useActionState<ActionState, FormData>(async (_prevState, formData: FormData) => {
    return await updateArticle(postId, formData);
  }, null);

  const currentImageUrl = existingPost.image_path;

  const categoryNames = categories.map((category) => category.name);

  const defaultCategory = categories.find((category) => category.id === existingPost.category_id)?.name ?? "";

  return (
    <form action={formAction}>
      <main className={styles.content}>
        <div className={styles.titleField}>
          <Input name="title" defaultValue={existingPost.title} placeholder="タイトルを入力" type="text" size="large" />
          {state?.errors?.title && <p className={styles.errorMessage}>{state.errors.title}</p>}
        </div>

        <div className={styles.imageUploaderWrapper}>
          <ImageUploaderPreview currentImagePath={currentImageUrl} error={state?.errors?.image} />
        </div>

        <div className={styles.selectBoxWrapper}>
          <SelectBox
            name="category_id"
            label="カテゴリ"
            options={categoryNames}
            placeholder="カテゴリ選択"
            defaultValue={defaultCategory}
            required
          />
          {state?.errors?.category && <p className={styles.errorMessage}>{state.errors.category}</p>}
        </div>

        <div className={styles.textBoxWrapper}>
          <TextBox name="content" defaultValue={existingPost.content} />
          {state?.errors?.content && <p className={styles.errorMessage}>{state.errors.content}</p>}
        </div>

        <div className={styles.buttonWrapper}>
          <Button type="submit" label="更新" variant="success" />
          <Button type="submit" label="削除" variant="danger" />
        </div>
      </main>
    </form>
  );
}
