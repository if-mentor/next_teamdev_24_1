import styles from "./styles.module.css";
import { TextBoxProps } from "./type";

const TextBox = ({ placeholder = "本文を入力してください", className, ...props }: TextBoxProps) => {
  return <textarea placeholder={placeholder} className={`${styles.textBox} ${className ?? ""}`} {...props} />;
};

export default TextBox;
