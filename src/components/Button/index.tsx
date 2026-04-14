import styles from "./styles.module.css";
import { ButtonProps } from "./type";

const Button = ({
  label,
  type = "button",
  variant = "primary",
  size = "medium",
  loading = false,
  ...rest
}: ButtonProps) => {
  return (
    <button type={type} disabled={loading} className={`${styles.button}  ${styles[variant]} ${styles[size]}`} {...rest}>
      {loading ? "Loading..." : label}
    </button>
  );
};

export default Button;
