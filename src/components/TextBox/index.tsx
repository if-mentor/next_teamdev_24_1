import styles from "./styles.module.css";
import { TextBoxProps } from "./type";

const TextBox = ({ placeholder = "本文を入力してください", error, ...props }: TextBoxProps) => {
  return (
    <div>
      <textarea placeholder={placeholder} className={`${styles.textBox} ${error && styles.error}`} {...props} />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default TextBox;
