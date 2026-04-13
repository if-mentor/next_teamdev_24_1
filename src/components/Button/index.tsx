import styles from "./styles.module.css";
import { ButtonProps } from "./type";

const Button = ({
  label,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
  loading = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.button}  ${styles[variant]} ${styles[size]}`}
      {...rest}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};

export default Button;
