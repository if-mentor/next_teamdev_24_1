import Button from "@/components/Button";
import Input from "@/components/Input";
import SelectBox from "@/components/SelectBox";
import styles from "./styles.module.css";
import TextBox from "@/components/TextBox";
import ImageUploaderPreview from "@/components/ImageUploaderPreview";
import { createPost } from "./actions";
import { createClient } from "@/libs/supabase/server";

export default async function ArticleNewPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("id, name").order("id", { ascending: true });

  return (
    <div>
      <main className={styles.wrapper}>
        <form action={createPost}>
          <div className={styles.inputWrapper}>
            <Input type="text" name="title" placeholder="タイトルを入力" size="large" />
          </div>

          <div className={styles.imageUpload}>
            <ImageUploaderPreview />
          </div>

          <div className={styles.selectWrapper}>
            <SelectBox
              label="カテゴリ"
              name="category_id"
              options={categories?.map((category) => ({ label: category.name, value: String(category.id) })) ?? []}
              placeholder="カテゴリ選択"
            />
          </div>

          <div className={styles.textWrapper}>
            <TextBox name="content" />
          </div>

          <div className={styles.buttonWrapper}>
            <Button label="投稿" type="submit" variant="success" size="medium" />
          </div>
        </form>
      </main>
    </div>
  );
}
