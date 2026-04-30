import { Header } from "@/components/Header";
import Input from "@/components/Input";
import styles from "./styles.module.css";
import SelectBox from "@/components/SelectBox";
import Button from "@/components/Button";
import ImageUploaderPreview from "@/components/ImageUploaderPreview";

export default function ArticleEditPage() {
  return (
    <>
      <Header />
      <main className={styles.content}>
        <div className={styles.titleField}>
          <Input placeholder="タイトルを入力" type="text" size="large" />
        </div>
        <div className={styles.imageUploaderWrapper}>
          <ImageUploaderPreview />
        </div>
        <div className={styles.selectBoxWrapper}>
          <SelectBox
            label="カテゴリ"
            options={["日常", "仕事", "勉強", "美容", "趣味", "購入品", "健康", "その他"]}
            placeholder="カテゴリ選択"
          />
        </div>
        {/* TODO: TextBox コンポーネント実装後に差し替え */}
        <textarea placeholder="本文を入力してください" className={styles.textBox} aria-label="本文" />

        <div className={styles.buttonWrapper}>
          <Button label="更新" variant="success" />
          <Button label="削除" variant="danger" />
        </div>
      </main>
    </>
  );
}
