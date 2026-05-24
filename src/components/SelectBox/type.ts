import { SelectHTMLAttributes } from "react";

export type SelectOption = {
  label: string; // ← 選択肢の表示テキスト（例：「日常」「仕事」）
  value: string; // ← 実際に送信される値（例：「6」「7」）
};

export type SelectProps = {
  label?: string; // ← SelectBoxの上に表示するラベル（例：「カテゴリ」）
  options: string[] | SelectOption[];
  placeholder?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;
