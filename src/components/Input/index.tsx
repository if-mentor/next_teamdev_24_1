"use client";

import { forwardRef } from "react";
import styles from "./styles.module.css";
import type { InputProps } from "./type";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, size = "medium", className, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          ref={ref}
          className={`${styles.input} ${styles[size]} ${error ? styles.error : ""} ${className || ""}`}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
