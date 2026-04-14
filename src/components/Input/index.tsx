import styles from "./styles.module.css";
import type { InputProps } from "./type";

const Input = ({ label, error, size = "medium", ...props }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={`${styles.input} ${styles[size]} ${error ? styles.error : ""}`} {...props} />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;
