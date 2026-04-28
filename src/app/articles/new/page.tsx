import Button from "@/components/Button";
import { Header } from "@/components/Header";
import Input from "@/components/Input";
import SelectBox from "@/components/SelectBox";
import styles from "./styles.module.css";
import TextBox from "@/components/TextBox";
import ImageUploaderPreview from "@/components/ImageUploaderPreview";

export default function ArticleNewPage() {
  return (
    <div>
      <Header />

      <main className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <Input type="text" name="title" placeholder="タイトルを入力" size="large" />
        </div>

        <div className={styles.imageUpload}>
          <ImageUploaderPreview />
        </div>

        <SelectBox
          options={["日常", "仕事", "勉強", "美容", "趣味", "購入品", "健康", "その他"]}
          placeholder="選択してください"
        />

        <TextBox />

        <div className={styles.buttonWrapper}>
          <Button label="投稿" variant="success" size="medium" />
        </div>
      </main>
    </div>
  );
}
