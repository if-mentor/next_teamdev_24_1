import Button from "@/components/Button";
import { Header } from "@/components/Header";
import Input from "@/components/Input";
import SelectBox from "@/components/SelectBox";
import styles from "./styles.module.css";

export default function ArticleNewPage() {
  return (
    <div className={styles.wrapper}>
      <Header />

      <main>
        <div className={styles.inputWrapper}>
          <Input type="text" name="title" placeholder="タイトルを入力" size="large" />
        </div>

        <div className={styles.imageUpload}>
          <span>後ほど画像アップロードコンポーネントを挿入する</span>
        </div>

        <SelectBox
          options={["日常", "仕事", "勉強", "美容", "趣味", "購入品", "健康", "その他"]}
          placeholder="選択してください"
        />

        <textarea placeholder="本文を入力してください" className={styles.textBox} />

        <div className={styles.buttonWrapper}>
          <Button label="投稿" variant="success" size="medium" />
        </div>
      </main>
    </div>
  );
}
