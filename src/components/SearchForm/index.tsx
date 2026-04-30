"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { SearchFormProps } from "./type";
import Button from "../Button";

export const SearchForm = ({
  searchAction,
  placeholder = "検索したい記事を入力してください",
  disabled = false,
}: SearchFormProps) => {
  const [keyword, setKeyword] = useState("");

  return (
    <form action={searchAction}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.searchInput}
        />
        <Button label="検索" disabled={disabled} />
      </div>
    </form>
  );
};
