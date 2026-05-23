import { SelectProps } from "./type";
import styles from "./styles.module.css";

const SelectBox = ({ label, options, placeholder, ...selectProps }: SelectProps) => {
  return (
    <>
      <label className={styles.label}>{label}</label>
      <select className={styles.select} {...selectProps}>
        <option value="">{placeholder}</option>
        {options.map((option) =>
          typeof option === "string" ? (
            <option key={option} value={option}>
              {option}
            </option>
          ) : (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ),
        )}
      </select>
    </>
  );
};

export default SelectBox;
