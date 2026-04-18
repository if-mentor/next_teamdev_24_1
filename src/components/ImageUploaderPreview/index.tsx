/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import type { ImageUploaderPreviewProps } from "./type";

export const ImageUploaderPreview = ({
  accept = "image/png,image/jpeg",
  size = 5,
  disabled = false,
  error,
}: ImageUploaderPreviewProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [internalError, setInternalError] = useState("");

  const processFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setInternalError("画像ファイルを選択してください。");
      return;
    }

    if (file.size > size * 1024 * 1024) {
      setInternalError(`ファイルサイズは ${size}MB 以下にしてください。`);
      return;
    }

    setInternalError("");
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className={styles.wrapper}>
      <label className={`${styles.uploader} ${disabled ? styles.disabled : ""}`}>
        <input type="file" accept={accept} disabled={disabled} onChange={processFile} className={styles.input} />

        {previewUrl ? (
          <img src={previewUrl} alt="プレビュー" className={styles.previewImage} />
        ) : (
          <div className={styles.uploadButton}>画像アップロード</div>
        )}
      </label>

      {(error || internalError) && <p className={styles.errorMessage}>{error || internalError}</p>}
    </div>
  );
};
