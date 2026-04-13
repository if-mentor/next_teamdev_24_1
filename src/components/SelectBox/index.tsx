import { SelectProps } from "./type";
import styles from "./styles.module.css";

const SelectBox = ({ label, options, placeholder, ...selectProps }: SelectProps) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <select className={styles.select} {...selectProps}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
