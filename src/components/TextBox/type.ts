import { TextareaHTMLAttributes } from "react";

export type TextBoxProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};
