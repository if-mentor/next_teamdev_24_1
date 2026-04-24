"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { SearchFormProps } from "./type";

export const SearchForm = ({
  onSearch,
  placeholder = "検索したい記事を入力してください",
  disabled = false,
}: SearchFormProps) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.searchInput}
      />
      <button onClick={handleSearch} disabled={disabled} className={styles.searchButton}>
        検索
      </button>
    </div>
  );
};
