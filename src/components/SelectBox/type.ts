import { SelectHTMLAttributes } from "react";

export type SelectProps = {
  label?: string;
  options: string[];
  placeholder?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;
